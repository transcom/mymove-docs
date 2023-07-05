---
title: "0081 Deprecating `devseed` Scenarios"
description: |
  A description for ADR 0081
---

# _Deprecating `devseed` Scenarios and use `testharness` Scenarios instead_

<!-- **User Story:** _[ticket/issue-number]_ optional -->

## Background

There are currently two ways to create moves programmatically in the MilMove
system. One way is the `devseed` data and the other is the `testharness` data.
This ADR examines benefits of each method for generating test data in the
MilMove system.

The main driving force behind this decision is to provide clarify for the Truss
engineering team to have one-way of generating move data in the MilMove system
without having to create both `devseed` data and `testharness` data.

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
testing the `testharness` data generation can be done programmatically as part
of the end-to-end testing.

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
- _Update `devseed` scenarios and use them in tandem with `testharness`
  scenarios_

## Decision Outcome

- Chosen Alternative: _[alternative 1]_
- _[justification. e.g., only alternative, which meets KO criterion decision driver | which resolves force | ... | comes out best (see below)]_
- _[consequences. e.g., negative impact on quality attribute, follow-up decisions required, ...]_ <!-- optional -->

## Pros and Cons of the Alternatives <!-- optional -->

### _Do nothing_

- `+` _[argument 1 pro]_
- `+` _[argument 2 pro]_
- `-` _[argument 1 con]_
- _[...]_ <!-- numbers of pros and cons can vary -->

### _Deprecate `devseed` scenarios and remove them from documentation & codebase_

- `+` _[argument 1 pro]_
- `+` _[argument 2 pro]_
- `-` _[argument 1 con]_
- _[...]_ <!-- numbers of pros and cons can vary -->

### _Update `devseed` scenarios and use them in tandem with `testharness` scenarios_

- `+` _[argument 1 pro]_
- `+` _[argument 2 pro]_
- `-` _[argument 1 con]_
- _[...]_ <!-- numbers of pros and cons can vary -->
