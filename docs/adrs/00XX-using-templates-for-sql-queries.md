---
title: 00XX Use Templates for SQL Queries
description: |
  Decision outcome: Establish a pattern for SQL query template artifacts
---

# Use Templates for SQL Queries

**User Story:** *[MB-12577](https://dp3.atlassian.net/browse/MB-12577)* :lock:

## Problem Statement
The Go method which fetches a move's data change history contains a very large SQL query in which it sets up the data that is being tracked by the database triggers whenever data changes in tables. 
The problem with such a large SQL statement in Go code is that it is essentially a string with no SQL linting or checking. This also means that developers lose the benefit of potential syntax highlighting when writing SQL queries.

## Decision Drivers
#### Do not ~~try to reinvent the wheel~~ circumvent Pop - [ADR 0001](docs/adrs/0001-go-orm.md)

While evaluating potential options and opportunities, one key consideration is how the chosen approach will work with the existing ORM architecture [(Pop)](https://github.com/gobuffalo/pop).

In order to achieve the best return value with the least effort, the chosen approach should not require excessive refactoring or removal of the Pop ORM pattern if at all possible.

## Considered Alternatives

> **bold denotes chosen**

* *Do nothing*
* *Utilize a SQL Template Engine*
* *Build out our own SQL Templating architecture*
* **A hybrid approach using an external library with some tweaks of our own**

## Decision Outcome

<!-- * Chosen Alternative:  -->
* Chosen Alternative: *A hybrid approach using an external library with some tweaks of our own*
* Positive Outcomes: We will have a SQL templating pattern that is easy to implement without requiring major refactor, provides us with linting opportunities and better code visualization, and may be very useful in the future if we end up implementing additional complex queries.
* Consequences: If this new templating is not utilized elsewhere we will likely continue defaulting to writing SQL queries as strings in the Go code, which is our current pattern.

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
* `+` *The syntax is simple and easy to learn.*
  * `+` Ongoing SQL work should be more consistent, and have positive impacts
  for onboarding efforts.
* `-` *The most readily applicable templating engine may not be consistently maintained/supported.*
  * `-` [Go SQL Templates](https://github.com/Davmuz/gqt) most recent commit was 6 years ago

### *Build out our own SQL Templating architecture*

* `+` *Allows engineering team to take ownership of the templating design.*
* `-` *Additional effort to build out initially*
  * `+` Once established, future SQL query work following the determined pattern should
  be more consistent, and have positive impacts for onboarding efforts.

### *A hybrid approach using an external library with some tweaks of our own*

* `+` *Simple setup.* 
* `+` *The level of effort necessary to initiate refactor is low.*
* `+` *The syntax is simple and easy to learn.*
  * `+` Ongoing SQL work should be more consistent, and have positive impacts
  for onboarding efforts.
* `+` *Allows engineering team to take ownership of the templating design.*
* `+` *Significantly less effort to build out initially than completely designing our own*
  * `+` Once established, future SQL query work following the determined pattern should
  be more consistent, and have positive impacts for onboarding efforts.
