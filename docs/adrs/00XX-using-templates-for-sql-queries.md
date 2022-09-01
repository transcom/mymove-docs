---
title: 00XX Using Templates for SQL Queries
description: |
  Decision outcome: Establish a pattern for SQL query template artifacts
---

# Using Templates for SQL Queries

**User Story:** *[MB-12577](https://dp3.atlassian.net/browse/MB-12577)* :lock:

## Background
<!-- Finish filling this out -->

## Decision drivers
<!-- Finish filling this out -->

## Considered Alternatives

> **bold denotes chosen**

* *Do nothing*
* *Utilize a SQL Template Engine*
* *Build out our own SQL Templating architecture*

## Decision Outcome

<!-- * Chosen Alternative:  -->



## Pros and Cons of the Alternatives

### *Do nothing*

* `+` *There's no work to be done so teams can focus on other work.*
* `-` *Existing SQL is embedded in Go files as strings*
  * `-` The current approach to SQL queries means that we cannot benefit
  from linting, checking, or potentially useful IDE visualization when formatting
  queries
  * `-` Long queries become more and more difficult to maintain

### *Utilize a SQL Template Engine*

* `+` *Simple setup.*
* `+` *The level of effort necessary to initiate refactor is low.*
* `+` *The syntax is simple and easy to learn.*
  * `+` Ongoing SQL work should be more consistent, and have positive impacts
  for onboarding efforts.
* `-` *The most readily applicable templating engine may not be consistently maintained/supported.*
  * `-` [Go SQL Templates](https://github.com/Davmuz/gqt) most recent commit was 6 years ago

### *Build out our own SQL Templating architecture*

* `+` *Allows engineering team to take ownership of the templating design.*
* `-` *Additional effort to build out initially*
  * `+` Once established, future SQL query work following thedetermined pattern should
  be more consistent, and have positive impacts for onboarding efforts.
