---
title: '0077 Eject the application from Create React App'
description: |
  Decision outcome: To be decided
---

# Eject the Create React App configuration

<!-- **User Story:** *[ticket/issue-number]* -->

## Background

In the previous [ADR 0072 Using React-App-Rewired][adr-0072], the decision of
ejecting the React application was proposed as an alternative to leveraging
_React-App-Rewired_. _React-App-Rewired_ has been lightly maintained since
_Create-React-App_ version 2.0. It is also stated in the _React-App-Rewired_
repository that with the use of the library, the configurations are now owned by
the team that leverages the tool. In other words, the MilMove React application
has technically been ejected since ADR 0072 has been implemented in the
repository.

[adr-0072]: ./0072-using-react-app-rewired.md

The main reason to consider this again is that it was discovered on back on the
13th of May 2022 that the _React-Scripts_, which _Create-React-App_ provides,
does not call `compiler.close` which prevents the Webpack cache from being
saved. This means that even without changes being made to the `src/` directory
the `make client_build` command will always compile the application every time.
This prevents the CI system from saving artifacts from previous builds and means
that the CI system compiles the client code on every time regardless of changes
made to that single component of the MilMove system.

As pointed out in DP3 Slack 🔒, there's a significant speed up in Client
compilation times in CI when the Webpack cache is enabled. According to
Webpack's own documentation on this, the file system cache should be enabled for
CI/CD systems.

[🔒 DP3 Slack, discussing compile times of ~15 seconds](https://ustcdp3.slack.com/archives/CTQQJD3G8/p1672775265604429)

[➡️  Webpack: Setup cache in CI/CD system](https://webpack.js.org/configuration/cache/#setup-cache-in-cicd-system)

There is also evidence from the _Create-React-App_ repository that is has been
only volunteer supported since the 6th of July 2021 according to one of the
original co-authors of the library. This means that the future of
_Create-React-App_ is certainly unknown for our project. Since,
_Create-React-App_ is only a set of useful configurations for working with a
React application, we are again presented with evidence that we should manage
the configuration for our MilMove React application ourselves.

[ ➡️  _Create-React-App_ does not have a regular maintainer](https://github.com/facebook/create-react-app/issues/11180#issuecomment-874748552)

## Decision drivers

There are a number of decision drivers here to determine how we consider how to
approach this work. The first driver is the fact that we've been using
_React-App-Rewired_ now for seven months with a lot of success. This means that
we've been effectively _owning our configuration files_ as it was stated in the
_React-App-Rewired_ repository. The second driver is that we are noticing

## Considered Alternatives

* *Do nothing, keep using React-App-Rewired to dynamically patch configurations*
* *Eject the __Create-React-App__ configuration*

## Decision Outcome

* Chosen Alternative: *[alternative 1]*
* *[justification. e.g., only alternative, which meets KO criterion decision driver | which resolves force | ... | comes out best (see below)]*
* *[consequences. e.g., negative impact on quality attribute, follow-up decisions required, ...]* <!-- optional -->

## Pros and Cons of the Alternatives <!-- optional -->

### *[alternative 1]*

* `+` *[argument 1 pro]*
* `+` *[argument 2 pro]*
* `-` *[argument 1 con]*
* *[...]* <!-- numbers of pros and cons can vary -->

### *[alternative 2]*

* `+` *[argument 1 pro]*
* `+` *[argument 2 pro]*
* `-` *[argument 1 con]*
* *[...]* <!-- numbers of pros and cons can vary -->

### *[alternative 3]*

* `+` *[argument 1 pro]*
* `+` *[argument 2 pro]*
* `-` *[argument 1 con]*
* *[...]* <!-- numbers of pros and cons can vary -->
