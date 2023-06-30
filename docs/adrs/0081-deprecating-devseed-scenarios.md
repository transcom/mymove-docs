---
title: "0081 Deprecating `devseed` Scenarios"
description: |
  A description for ADR 0081
---

# _Deprecating `devseed` Scenarios and use `testharness` Scenarios instead_

<!-- **User Story:** _[ticket/issue-number]_ optional -->

## Background

_There are two ways to create moves programmatically in the MilMove system. One
of these ways must be deprecated. This ADR examines the why and the benefits of
using the new way._

_The main driving force behind this decision is that `testharness` scenarios are
used in end-to-end testing with Playwright while `devseed` scenarios are only
used by humans at this point and it is more difficult to know if `devseed` data
is broken._ <!-- optional -->

## Considered Alternatives

- _Do nothing_
- _Deprecate `devseed` scenarios and remove them from documentation & codebase_
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
