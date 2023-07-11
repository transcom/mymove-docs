---
title: "0081 Deprecating `devseed` Scenarios"
description: |
  A description for ADR 0081
---

# _Deprecating `devseed` Scenarios and use `testharness` Scenarios instead_

<!-- **User Story:** _[ticket/issue-number]_ optional -->

## Background

When working with or testing our system, it can be helpful to have sample data
in the system that gives you good starting points for different steps in the process
and/or seeing different features in action. There are currently two ways to create
moves programmatically in the MilMove system. One way is the `devseed` data and the
other is the `testharness` data. This ADR examines benefits of each method for
generating test data in the MilMove system.

The main driving force behind this decision is to provide clarity to the Truss
engineering team on which method to use when generating move data in the MilMove system.

### Ways to create test data in MilMove

The `devseed` data is only used by humans for creating pre-determined moves
one-time in the system. These moves are hard-coded and cannot be regenerated
without a new ephemeral deployment or a new `make db_dev_e2e_populate` command.
This way of generating data requires engineering involvement and has no
browser-UI component for generating duplicate move data. This data was
originally used Cypress end-to-end tests which were removed after being
refactored into Playwright tests.

The `testharness` data is used by Playwright and can also be used by humans when
**Local sign on** is enabled for an environment. These moves are not hard-coded
and can be generated within the browser under `/testharness/list` after a
deployment to ephemeral or locally during development. These moves can be
generated as many times as needed by the developer/user within the browser.
Since this move data is also used with Playwright tests, an added benefit is
that the generated `testharness` data can be used for both development and
end-to-end testing.

### Current state of documentation related to test data

Our current documentation portal contains references to both `testharness` and
`devseed` data. If we were to pick one strategy going forward, we would have to
update our documentation in a number of places.

[=> Search results for devseed](https://transcom.github.io/mymove-docs/search?q=devseed)

There's also documentation related to `make db_dev_e2e_populate` which uses the
`devseed` data as well. This documentation would need to be updated and possibly
removed. Currently there is no equivalent of `make db_dev_e2e_populate` for the
`testharness` data as the creation of move data with `testharness` is entirely
browser-UI based at this time.

## Considered Alternatives

- _Do nothing_
- _Deprecate `devseed` scenarios and provide team-wide guidance on exclusively
  using `testharness` scenarios_
- _Deprecate and delete `deveseed` scenarios_

## Decision Outcome

> to be decided

<!--
- Chosen Alternative: _[alternative 1]_
- _[justification. e.g., only alternative, which meets KO criterion decision driver | which resolves force | ... | comes out best (see below)]_
 optional -->

## Pros and Cons of the Alternatives <!-- optional -->

### _Do nothing_

- `+` _No extra work involved._
- `-` _Teams will remain unsure about whether to use `devseed` or `testharness`
  data._
- `-` _Teams may duplicate work as `testharness` data is required for Playwright
  tests._

### _Deprecate `devseed` scenarios and provide team-wide guidance on exclusively using `testharness` scenarios_

- `+` _Teams will be able to focus on data creation using `testharness` data._
- `+` _Teams will have `testharness` data for Playwright tests that have been
  used during the development of features._
- `+` _Removing `devseed` scenarios may drastically improve the deployment of ephemeral deploys._
- `-` _Teams will need to over-communicate `testharness` data creation over
  `devseed` data creation._
- `-` _Using `testharness` data can slow us down because currently it only
  creates individual moves rather than subscenarios like `devseed` data which
  can create multiple moves tied to an Epic._
  - `?` _This will change the way we create move data. With `testharness` data
    will need to be created manually._
  - `?` _Teams will be able to create more specific move data faster._

### _Deprecate and delete `deveseed` scenarios_

- `+` _Teams will be able to focus on data creation using `testharness` data._
- `+` _Teams will have `testharness` data for Playwright tests that have been
  used during the development of features._
- `+` _Removing `devseed` scenarios may drastically improve the deployment of ephemeral deploys._
- `-` _More work involved in implementing the ADR._
- _[...]_ <!-- numbers of pros and cons can vary -->
