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
repository that with the use of the library the configurations are now owned by
the team that leverages the tool. In other words, the MilMove React application
has technically been ejected since ADR 0072 has been implemented in the
repository.

[adr-0072]: ./0072-using-react-app-rewired.md

The main reason to consider this again is that it was discovered on back on the
13th of May 2022 that the _React-Scripts_, which _Create-React-App_ provides,
does not call `compiler.close` which prevents the *webpack* cache from being
saved. This means that the `make client_build` command will always compile the
application every time, even without changes being made to the `src/` directory.
Not having the *webpack* cache being saved prevents the CI system from saving artifacts from previous builds and means
that the CI system compiles the client code on every time regardless of changes
made to that single component of the MilMove system.

As pointed out in DP3 Slack 🔒, there's a significant speed up in Client
compilation times in CI when the *webpack* cache is enabled. According to
*webpack*'s own documentation on this, the file system cache should be enabled
for CI/CD systems.

[🔒 DP3 Slack, discussing compile times of ~15 seconds when there are no Client app changes.](https://ustcdp3.slack.com/archives/CTQQJD3G8/p1672775265604429)

[➡️  *webpack*: Setup cache in CI/CD system](https://webpack.js.org/configuration/cache/#setup-cache-in-cicd-system)

There is also evidence from the _Create-React-App_ repository that is has been
volunteer-supported since the 6th of July 2021 according to one of the original
co-authors of the library. This means that the future of _Create-React-App_ is
unknown for our project. Since, _Create-React-App_ is only a set of useful
configurations for working with a React application, we are again presented with
evidence that we should manage the configuration for our MilMove React
application ourselves. The original co-creator even states that it might not be
the best tool to get started with React apps today nor does it have a regular
maintainer. _Create-React-App_ is not considered the best tool for production
React apps since the co-authors message.

[ ➡️  _Create-React-App_: Message from Dan A. co-author](https://github.com/facebook/create-react-app/issues/11180#issuecomment-874748552)

## Decision drivers

There are a number of decision drivers here to determine how we consider how to
approach this work. The first driver is the fact that we've been using
_React-App-Rewired_ now for seven months with a lot of success. This means that
we've been effectively _owning our configuration files_ as it was stated in the
_React-App-Rewired_ repository. The second driver is that we are noticing there
are some production optimizations that our MilMove team would like to do to our
building of the client code in CI.

These two drivers may be enough to help the MilMove engineering team make a
decision here.

## Considered Alternatives

* *Do nothing, keep using React-App-Rewired to dynamically patch configurations*
* *Eject the __Create-React-App__ configuration*

## Decision Outcome

:::info
This ADR has not been decided on yet. Once it has been reviewed by the MilMove
engineer practice, it will have a decision outcome written in this section.
:::

## Pros and Cons of the Alternatives

### *Do nothing, keep using React-App-Rewired to dynamically patch configurations*

* `+` *Our 0072 ADR covers situations where we can dynamically patch
  configurations*
* `+` *We continue benefiting from minor _Create-React-App_ updates, __if they
  occur__*
* `-` *We remain in the _Create-React-App_ ecosystem for longer than recommended
  by the co-author.*

### *Eject the __Create-React-App__ configuration*

* `+` *Reduces the dependency on **Create-React-App**.*
* `+` *Allows engineering team to take ownership of the configuration for the
  client application.*
* `-` *No wide-support from engineering team to maintain the build toolchain.*
  * `+` Without wide-support from engineering, the lack of configuration is a safer
  space to exist in for the project regardless of the benefits or
  responsibilities to leverage the build toolchain manually.
* `+` *Removes the reliance on **Create-React-App** and **React-Scripts** to
  incorporate security fixes which do not have much larger teams dedicated to
  this.*
* `+` *Breaks out of the update cycle for **Create-React-App** and
  **React-Scripts**.*
  * `-` The update cycle of **Create-React-App** and **React-Scripts** is one that
  is owned by their upstream development team. This cycle is a benefit to the
  MilMove engineering team as there are less dependencies that need to be
  managed by us.
