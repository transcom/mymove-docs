## TOC

<!-- toc -->

- [Introduction](#introduction)
- [When to Use](#when-to-use)
- [How to Use](#how-to-use)
- [EagerPreload Bugs and Workarounds](#eagerpreload-bugs-and-workarounds)
  * [Foreign keys as pointers](#foreign-keys-as-pointers)
  * [Foreign keys named differently from the related table](#foreign-keys-named-differently-from-the-related-table)
  * [Associations with 3+ path elements where the first 2 path elements match](#associations-with-3-path-elements-where-the-first-2-path-elements-match)

<!-- tocstop -->

## Introduction

We use [Pop](https://github.com/gobuffalo/pop) as our ORM
([object-relational mapping](https://en.wikipedia.org/wiki/Object–relational_mapping)) tool
for querying the database. Pop provides the ability to eagerly fetch associations via its
[Eager method](https://gobuffalo.io/en/docs/db/relations#eager-mode).
However, the `Eager` method is subject to the ["n+1" problem](database#excessive-queries-eg-n1-problem)
where each association is loaded via a separate query.  For Pop queries that
return records in which each has an eagerly-loaded tree of associated data, the amount of
SQL queries executed as a result can be substantial.

Starting with version 5.1, Pop has the ability to minimize the "n+1" problem via
a new [EagerPreload method](https://gobuffalo.io/en/docs/db/relations#eagerpreload-mode).
Using `EagerPreload`, Pop fetches the requested associations across
all parent records rather than doing one at a time. This reduces the number of connections made
to the database at the expense of doing more computation on the Go side.  In many
situations, this can be a reasonable tradeoff that provides better overall performance.

## When to Use

If you use `Eager` in a query, you should also try `EagerPreload` and note the difference in
the number of generated queries (which should show in the log by default in development mode).
Compare performance of both `Eager` and `EagerPreload` with representative data.

In most cases, `EagerPreload` should outperform `Eager`.  Although there is
[an option](https://gobuffalo.io/en/docs/db/relations#loading-associations) to turn
`EagerPreload` on by default, there are some issues in Pop's implementation at the moment that could
lead to subtle bugs in MilMove
([example1](https://github.com/gobuffalo/pop/issues/547), [example2](https://github.com/gobuffalo/pop/issues/603)).
In some cases, associations that loaded with `Eager` are not loading with `EagerPreload` -- this may not cause a
failure, but rather result in missing data returned from an endpoint, for instance.  For now, we should
consider using and testing `EagerPreload` on a case-by-case basis until we feel more confident in Pop's
implementation. 

## How to Use

Generally speaking, you should be able to take an `Eager` call like so:

```go
err := db.Q().Eager(
    "PaymentRequests.PaymentServiceItems.PaymentServiceItemParams.ServiceItemParamKey",
    "MTOServiceItems.ReService",
    "MTOShipments.DestinationAddress",
    "Orders.NewDutyStation.Address",
).All(&moveTaskOrders)
```

and just replace it with an `EagerPreload` call instead:

```go
err := db.Q().EagerPreload(
    "PaymentRequests.PaymentServiceItems.PaymentServiceItemParams.ServiceItemParamKey",
    "MTOServiceItems.ReService",
    "MTOShipments.DestinationAddress",
    "Orders.NewDutyStation.Address",
).All(&moveTaskOrders)
```

In theory, the resulting slice in `moveTaskOrders` should be identical in both cases.  In practice,
you should always verify that is indeed the case due to bugs we've run into in Pop as noted above.

## EagerPreload Bugs and Workarounds

Below are some of the issues we have found so far in using `EagerPreload`:

### Foreign keys as pointers

We often represent a nullable foreign key (a
[belongs_to](https://gobuffalo.io/en/docs/db/relations/#available-struct-tags) relationship in Pop terms)
as a pointer.  For example:

```go
type MTOShipment struct {
    ID              uuid.UUID  `db:"id"`
    // ...
    PickupAddress   *Address   `belongs_to:"addresses"`
    PickupAddressID *uuid.UUID `db:"pickup_address_id"`
    // ...
}
```

Doing an `EagerPreload` on `PickupAddress` will not load the association currently,
but it will with `Eager`.
We think we have identified the issue in Pop and have submitted a
[PR to fix it](https://github.com/gobuffalo/pop/pull/602).  Until that is merged and released
_(update: it got released in Pop 5.3.2)_, however,
a workaround is to use gobuffalo's [nulls package](https://github.com/gobuffalo/nulls) (specifically,
a `nulls.UUID` in this case) instead of a pointer for the `PickupAddressID` field (note that `PickupAddress`
can remain a `*Address`, however).  You can see
examples of how this is used in [Pop's documentation](https://gobuffalo.io/en/docs/db/models#nulls-handling).
In general, if you use the `nulls` variants rather than pointers for optional fields, the `EagerPreload`
correctly loads the assocation.
Note that moving to `nulls` instead of pointers will usually require changing most usages of the field in
question since it is a different type (although it's a pretty straightforward change in most cases).

### Foreign keys named differently from the related table

Consider this example model:

```go
type Order struct {
    ID               uuid.UUID   `json:"id" db:"id"`
    // ...
    NewDutyStationID uuid.UUID   `json:"new_duty_station_id" db:"new_duty_station_id"`
    NewDutyStation   DutyStation `belongs_to:"duty_stations"`
    // ...
}
```

Note that the foreign key is named `NewDutyStationID` but it references a `DutyStation` model.  Depending on
what other associations are on the model, this can cause Pop to fail to load the `NewDutyStation` association
in cases where `Eager` worked fine.  We have developed a test case and
[filed an issue](https://github.com/gobuffalo/pop/issues/603)
with Pop about this -- refer to the issue for an example that fails.

As a workaround, try putting a `fk_id` struct tag on the association field like so:

```go
type Order struct {
    ID               uuid.UUID   `json:"id" db:"id"`
    // ...
    NewDutyStationID uuid.UUID   `json:"new_duty_station_id" db:"new_duty_station_id"`
    NewDutyStation   DutyStation `belongs_to:"duty_stations" fk_id:"new_duty_station_id"`
    // ...
}
```

This appears to cause the association to load because it forces Pop to use the explicit foreign key column name
rather than deducing it from the struct's field name (Pop didn't seem to need this `fk_id` with `Eager`).

### Associations with 3+ path elements where the first 2 path elements match

Suppose you try to do an `EagerPreload` that looks like this:

```go
err := db.Q().EagerPreload(
    "Orders.OriginDutyStation.Address",
    "Orders.OriginDutyStation.TransportationOffice",
).All(&moveTaskOrders)
```

What seems to be happening in this case is that the last association *only* -- `TransportationOffice` in this case --
will be populated.  The `Address` will be left as either a zero-valued struct or a nil depending on whether the
field is a pointer or not.  It appears this only occurs when you have a long association path where the first two
path elements match.  We have developed a test case and
[filed an issue](https://github.com/gobuffalo/pop/issues/626)
with Pop about this.  Please refer to the issue for more details.

One workaround is to remove one of the associations from the `EagerPreload` and include it separately by
iterating over the results and doing a `Load` on the missing association each time through the loop.
That's not as efficient as `EagerPreload` of course, but it will at least populate the models correctly.
