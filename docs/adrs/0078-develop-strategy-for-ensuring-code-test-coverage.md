---
title: 0078 Develop strategy for ensuring code test coverage
description: |
  Decision outcome: The Happo Approach
---

# Develop strategy for ensuring code test coverage

**User Story:** *[MB-16176](https://dp3.atlassian.net/browse/MB-16176)* :lock:

## Problem Statement

Our current system of maintaining test coverage involves measuring the current total test coverage and ensuring that any given PR does not decrease the total coverage.
This strategy has obvious benefits in helping to support a high test coverage, but it can also introduce unnecessary roadblocks in the PR workflow. To understand this, it's helpful to understand the scenarios that might result in a decrease in total coverage.


### Scenarios that result in a test coverage decrease
1. **Removal of code that is _more_ tested than the total coverage.** If the total coverage is 77.0% and a block of code that is tested at 100% is deleted, the average coverage goes down.
2. **Addition of code that is _less_ tested than the total coverage and _should be tested more_.** This is the scenario that we want to address with our code coverage strategy.
3. **Addition of code that is _less_ tested than the total coverage and _doesn't need to be tested more_.** The difference between this scenario and scenario 2 can be subjective, but one can imagine a scenario in which a Go database model is created and doesn't require any tests.

Our current strategy of never allowing the total coverage to decrease attempts to address scenario 2, but it also unfairly flags scenarios 1 and 3. We also have the option to manually reset the test coverage floor, but determining whether that is appropriate (i.e. discerning which scenario is applicable to a given PR) can be difficult and time-consuming. Furthermore, any combination of the three scenarios can be applicable to a given PR -- it doesn't have to be just one -- which can make it extra difficult to decide whether a coverage decrease is legitimate.

## Test Coverage Objectives
To improve upon the current coverage strategy and address the scenarios above, we propose that our coverage strategy aims to address the following objectives:
- Reduce the amount of new and updated code that is not tested enough (scenario 2)
- Provide folks with the flexibility to easily override strict coverage enforcement in scenarios that don't require it
- Provide folks with easier access to context that allows them to distinguish between less-tested code that should be tested more (scenario 2) and less-tested code that doesn't need to be tested more (scenario 3)
- Address the above objectives with little effort

## Considered Options

* *Do nothing*
* *The Happo Approach*

## Decision Outcome

<!-- * Chosen Option:  -->
Chosen Option: *The Happo Approach*

Our approach to Happo changes is currently the following: the Happo PR check is not a required check, but it reports failures and includes an easily-accessible link on the PR to Happo diffs which provide context around visual changes. Something similar could be implemented for code coverage checks with the following steps:
1. Make the code coverage checks optional so that failures do not block a PR
2. Generate a link automatically on the PR (perhaps through a comment) that provides more context behind the failure (including, but not limited to, the go-coverage.html artifact generated in circle-ci)

* `+` *Low-medium effort*
* `+` *Provides a way to maintain high test coverage*
* `+` *Does not unnecessarily block PRs*
* `+` *Provides easily-accessible context behind coverage decreases, at least with server coverage*
* `-` *Requires a cultural enforcement of coverage maintenance*

## Pros and Cons of the Alternatives

### *Do nothing*

Continue blocking PRs that decrease test coverage.

* `+` *No implementation effort*
* `+` *Provides a way to maintain high test coverage with stricter enforcement*
* `+` *Provides a way to override failures with a commit*
* `-` *Blocks PRs unnecessarily*
* `-` *Difficult to determine whether failures are legitimate*
