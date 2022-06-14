---
sidebar_position: 1
---
# Overview

## What is a Service Object?

The MilMove backend is _loosely_ designed with this
[3-layer structure](https://docs.google.com/presentation/d/1kVQzrYWY0AnYyPbiqfuFv8Fh_7IwwIFv3XKRxZI44Hs/edit#slide=id.p):

1. **Presentation layer.** - Our endpoint handlers that perform type conversions and connect user requests to 
   business logic functions.
2. **Business logic layer.** - Code that implements MilMove's business logic.
3. **Data access layer.** - Code that directly interacts with and manipulates the database.

The `services` package is a combination of the bottom two layers, **business logic** and **data access**. It is 
located within the [`mymove` `./pkg/services`](https://github.com/transcom/mymove/tree/master/pkg/services) directory.

Our "service objects," as we call them (this is MilMove-specific terminology), are the structs/functions within this 
package that implement our business logic. We have a few different kinds of service objects:

- data type: These are the service objects that are tied to a specific model, e.g. logic related to the `Reweigh` 
  model is in the `pkg/services/reweigh` service.
- orchestrators: These are service objects that help manage other service objects that are closely related, e.g. the 
  logic that manages `MTOShipment` and `PPMShipment` service objects lives in `pkg/services/orchestrators/shipment`
- utility: These are service objects that help us out across the code base, e.g. query tools are in the 
  `pkg/services/query` service.

Service objects allow for better unit testing, re-usability, and organization of code in the MilMove project. We have
also developed clear patterns for [creating](#creating-service-objects) and [using](#using-service-objects) this 
structure.

## ADRs

We have two decision records related to service objects:

- [Service Object Layer ADR](https://github.com/transcom/mymove/blob/master/docs/adr/0033-service-object-layer.md) 
  is the one that began our use of service objects.
- [Use orchestrator service objects ADR](https://github.com/transcom/mymove/blob/master/docs/adr/0069-use-orchestrator-service-objects.md)
  is where we defined a new type of service object to help manage interactions between closely related service objects.

## Key features

A well-defined service object is:

- Reusable and modular
- Not related to or affected by our API design

Specific types of service objects have additional constraints:

- data type service objects should be:
  - Concerned primarily with one data object
    - They may use other service objects to perform actions on other data objects, but you should also consider if 
      it should use that other service object directly, or if it would be better to use a service object orchestrator.
- orchestrator service objects should:
  - Not repeat validation that the service objects they use will have. The main validation that should be done at 
    this level should be for things that the orchestrator needs in order to function.

Service objects should expose clear and self-explanatory public functions. Niche utilities and business logic should be 
in private functions within the service object's package.

## Detailed Docs

For ease of reading, the docs on service objects are broken down a bit based on what you're trying to do/understand.

:::caution
There are several service objects that don't fully match what is stated in these docs. That is usually because the
patterns outlined in the docs were established after many of these service objects existed, and we didn't go back and
change existing service objects to match. It has also happened from accidentally following the wrong example for
what to look at. If you are adding a new service object, follow the patterns outlined here. If you are editing a
service object and have a bit of extra time, try updating the service object you're changing to follow the patterns
here.
:::

* [Getting Started](./getting-started) 
* [Structure](./structure)
* [Set up service subpackage and interface](./set-up-service-subpackage-and-interface)
* [Set up validation pattern](./validation)

:::caution Content below is being moved
The stuff below is being converted to the new format outlined in the links above. As it gets covered in the new 
pages, I'll remove the corresponding sections below. 
:::

## Creating Service Objects


#### Implementation

**Step #1** involves a query on the database using our ORM, [Pop](https://gobuffalo.io/en/docs/db/getting-started).

```go
// Set up an empty model to receive any data found by Pop
mtoShipment := &models.MTOShipment{}
// Find the shipment using the ShipmentID provided in our reweigh input
err := appCtx.DB().Find(mtoShipment, reweigh.ShipmentID)
if err != nil {
    // Return our standard NotFoundError type if there's an error
    return nil, services.NewNotFoundError(reweigh.ShipmentID, "while looking for MTOShipment")
}
```

:::info
Now that the function is filled out, you'll want to refactor it by extracting each logical step into a separate, 
smaller, and well-named private function. We should strive to keep all functions as small as possible for readability.

[ApproveOrRejectServiceItem](https://github.com/transcom/mymove/blob/master/pkg/services/mto_service_item/mto_service_item_updater.go#L44-L123)
is a good example of a function that performs a lot of actions, and each one is encapsulated in a separate function.
:::

## Using Service Objects

Service objects are often used in other services, but they're most commonly used by our handler functions. Handlers are
the **presentation layer** of our backend, and they correspond to API endpoints.

In either case, they will be used in much the same way. Service objects are often (although not necessarily) defined as
a dependency in a struct:

```go {4}
// CreateReweighHandler is the handler for the API endpoint to create a reweigh
type CreateReweighHandler struct {
	handlers.HandlerConfig
	creator services.ReweighCreator // our service object
}
```

When that struct is being instantiated, they are created using their `New<MyServiceObject>` function:

```go {4}
// Create an instance of CreateReweighHandler and assign it to our generated Swagger Go code
sampleAPI.MtoShipmentCreateReweighHandler = CreateReweighHandler{
    ctx,
    reweigh.NewReweighCreator(), // instantiating our service object
}
```

And finally, once the service object is instantiated, it will be used by calling the function defined in the interface 
type:

```go
// Call the service object using the creator set in our handler struct (h, defined above)
createdReweigh, err := h.creator.CreateReweigh(appCtx, newReweigh)
```

### Examples

- [CreateUpload](https://github.com/transcom/mymove/blob/master/pkg/services/upload/upload_creator.go)
- [CreateExcessWeightUpload](https://github.com/transcom/mymove/blob/master/pkg/services/move/excess_weight_uploader.go) - calls `CreateUpload`


## Testing Service Objects

[//]: # (Testing the service object you wrote will be a typical exercise in writing unit tests in Go. Look at examples for )

[//]: # (guidance here.)

[//]: # ()
[//]: # (When service objects are dependencies, we want to be able to mock those out in our unit tests. To generate the mock )

[//]: # (types, add this line to your top-level Go file in the `services` package:)

[//]: # ()
[//]: # (```go title="./pkg/services/reweigh.go" {9})

[//]: # (package services)

[//]: # ()
[//]: # (import &#40;)

[//]: # (	"github.com/transcom/mymove/pkg/appcontext")

[//]: # (	"github.com/transcom/mymove/pkg/models")

[//]: # (&#41;)

[//]: # ()
[//]: # (// ReweighCreator creates a reweigh)

[//]: # (//go:generate mockery --name ReweighCreator --disable-version-string)

[//]: # (type ReweighCreator interface {)

[//]: # (	CreateReweighCheck&#40;appCtx appcontext.AppContext, reweigh *models.Reweigh&#41; &#40;*models.Reweigh, error&#41;)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (This enables the the Go `mockery` tool to generate the mock type automatically. To trigger the generation, run )

[//]: # (`make mocks_generate`.)

When you use the mock type, you need to know two things:

1. What you expect to receive as input.
2. What you expect to receive as output.

:::danger Pointers in Mocks
These should be defined as exactly as possible to preserve the integrity of your test. If you have to include pointer 
input, you must _always_ use copies of the pointer and **_never, ever use that specific pointer again_**. Otherwise, 
you could unknowingly change the input you expect and your test would be compromised.

**If you are unsure about the inputs/returns for a mock, you should not use a mock.**
:::

```go title="Example test mock"
reweigh := testdatagen.MakeDefaultReweigh(suite.DB())
reweighCopy := *reweigh // make sure the copy is a value, not a pointer

updater := &mocks.ReweighUpdater{}
updater.On("UpdateReweigh",
    mock.AnythingOfType("appcontext.AppContext"), // you can include as many input parameters
    mock.AnythingOfType("*models.Reweigh")        // as you need
).Return(reweighCopy, nil)
```

Note that this calls the generated mock function, _not_ the original.

:::tip More mocking
Use `MockedInterface.On()` to mock a method. Use `MockedInterface.AssertExpectations()` to validate expectations, such
as parameter type and number of times the method was called.

See [testify's docs](https://godoc.org/github.com/stretchr/testify/mock#Call.On) for more information.
:::

## Resources

* [3 Layer Application Structure](https://docs.google.com/presentation/d/1kVQzrYWY0AnYyPbiqfuFv8Fh_7IwwIFv3XKRxZI44Hs/edit#slide=id.p)
* [Go by Example: Interfaces](https://gobyexample.com/interfaces)
