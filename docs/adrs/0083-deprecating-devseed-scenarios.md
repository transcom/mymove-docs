---
title: '0083 Deprecating `devseed` Scenarios'
description: |
  A description for ADR 0083
---

# _Deprecating `devseed` Scenarios and use `testharness` Scenarios instead_

## Background

When working with or testing our system, it can be helpful to have sample data
in the system that gives you good starting points for different steps in the process
and/or seeing different features in action. There are currently two ways to create
moves programmatically in the MilMove system. One way is the `devseed` data and the
other is the `testharness` data. This ADR examines benefits of each method for
generating test data in the MilMove system.

The main driving force behind this decision is to provide clarity to the Truss
engineering team on which method to use when generating Move Data in the MilMove system.

### Ways to create test data in MilMove

The `devseed` data is only used by humans for creating pre-determined users and moves
one-time in the system. These moves are hard-coded and cannot be regenerated
without a new ephemeral deployment or a new `make db_dev_e2e_populate` command.
This way of generating data requires engineering involvement and has no
browser-UI component for generating duplicate Move Data. This data was
originally used by Cypress end-to-end tests which were removed after being
refactored into Playwright tests.

The `testharness` data is used by Playwright and can also be used by humans when
**Local sign on** is enabled for an environment. These moves are not hard-coded
and can be generated within the browser under `/testharness/list` after a
deployment to ephemeral or locally during development. These moves can be
generated as many times as needed by the developer/user within the browser.
Since this Move Data is also used with Playwright tests, an added benefit is
that the generated `testharness` data can be used for both development and
end-to-end testing.

Ephemeral deployments run all `devseed` scenarios and the time needed to complete
an ephemeral deployment increases with every scenario we add. Currently, `devseed`
scenarios contain Moves that Trussels are accustomed to, e.g. `PENDNG`, `SITUP1`, `REWEI`, etc.
When using `testharness` data these scenarios and Move Codes are generated dynamically so,
Trussels would need to know the context of the Move Data that they are setting up.
Without `devseed` scenarios, Trussels will no longer be able to rely on reusable
Move Locator Codes in local development or ephemeral deployments.

### Current state of documentation related to creating test data

Our current documentation portal contains references to both `testharness` and
`devseed` data. If we were to pick one strategy going forward, we would have to
update our documentation in a number of places.

[=> Search results for devseed](https://transcom.github.io/mymove-docs/search?q=devseed)

There's also documentation related to `make db_dev_e2e_populate` which uses the
`devseed` data as well. This documentation would need to be updated and possibly
removed. Currently there is no equivalent of `make db_dev_e2e_populate` for the
`testharness` data as the creation of Move Data with `testharness` is entirely
browser-UI based at this time. Along with documentation, we'll need to remove
any Make commands and custom scripts referencing the `generate-test-data`
command as well. It's possible to that `generate-test-data` could be used in the
future if needed.

## Considered Alternatives

- _Do nothing_
- _Deprecate `devseed` scenarios and provide team-wide guidance on exclusively
  using `testharness` scenarios_
- _Deprecate and delete `devseed` scenarios (and related files in
  `pkg/testdatagen/scenario`) after 90 days_

## Decision Outcome

Deprecate and delete `devseed` scenarios (and related files in
`pkg/testdatagen/scenario`) after 90 days on 8th of November, 2023. This will
give us a singular way to create test data and remove the overhead of
maintaining `devseed` data.

Because of the 90 day timeline, Truss engineering will have plenty of time to
work towards deleting the `devseed` scenario data and properly communicate it
out to other practices. We will also be able to test things like deleting the
scenarios from ephemeral deployments on a more relaxed timeline.

In the meantime, we will also create a new `DangerJS` CI check which will warn
committers that the `devseed` scenario data is deprecated and display a link
back to this ADR. We will also add deprecation warnings across the various
commands that execute `devseed` scenario data that link back to this ADR and
display a warning message.

:::tip

Use the text below as inspiration for the deprecation message across our various
automation tooling using `devseed` scenario data.

> The `devseed` scenario data has been deprecated. Please see ADR 0083,
> https://transcom.github.io/mymove-docs/docs/adrs/deprecating-devseed-scenarios

:::

This alternative comes with a risk of ownership since it will be implemented
during a 90 day period.

## Pros and Cons of the Alternatives

### _Do nothing_

- `+` _No extra work involved._
- `-` _The `devseed` scenarios are no longer used in automated testing. This can
  lead to confusing scenarios or overused scenarios when working locally._
- `-` _Teams will remain unsure about whether to use `devseed` or `testharness`
  data. This could lead to some confusion or duplicated work._
- `-` _Teams may duplicate work as `testharness` data is required for Playwright
  tests._

### _Deprecate `devseed` scenarios and provide team-wide guidance on exclusively using `testharness` scenarios_

- `+` _Teams will be able to focus on data creation using `testharness` data._
- `+` _Teams will have `testharness` data for Playwright tests that have been
  used during the development of features._
- `+` _Teams will be able to create duplicate moves without having to repopulate
  the database._
- `-` _This will change the way we create Move Data. With the `testharness` method,
  individual moves will need to be created manually._
- `-` _Communication overhead of reminding teams to transition to `testharness` from `devseed`._
- `-` _`Devseed` can be used to batch-create scenarios with multiple related moves, but `testharness` currently only supports creation of individual moves_
- `-` _Teams would still have to maintain `devseed` data_

### _Deprecate and delete `devseed` scenarios (and related files in `pkg/testdatagen/scenario`) after 90 days_

Most of the pro and cons from option 2 apply. Deleting the `devseed` data also adds the following considerations:

- `+` _90 days is enough time to properly acclimate to the new changes_
- `+` _Teams would not have to maintain `devseed` data._
- `+` _There would be a singular way to create test data._
- `-` _During and after the 90 day period, there will need to be a way for
  Trussels to track this work._
- `-` _More work involved in implementing the ADR e.g. removing code,
  documentation updates, etc._
- `-` _Teams would have to adjust to using the new `testharness` scenarios,
  rather than relying on existing move codes for testing_
- `-` _Teams that rely on old `devseed` scenarios would need to train_
- `-` _Not all move scenarios or users are currently in `testharness`, so Truss
  engineers may need to recreate some of the more commonly used/expected moves
  using `testharness`_
