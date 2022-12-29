---
title: "9999 Convert integration tests to Playwright"
---

# Convert integration tests to Playwright

As of the end of 2022, MilMove has been using [Cypress](https://www.cypress.io/) as its integration test framework for several years (long enough that the original decision to use Cypress instead of other technologies was not captured in an ADR). Our suite of integration tests, which has been built up by developers over the life of the project, run as a part of every build in our continuous integration process and ideally will verify that our browser and server code are working together correctly. Many user stories and epics will include making additions to our suite of integration tests as part of the acceptance criteria.

Unfortunately, several of our existing integration tests experience sporadic failures when run by CI. At the current time, it seems like 3-5% of CI builds experience a failure that resolves itself if immediately re-run. Several efforts have been undertaken to resolve, or at least reduce, the level of test "flakiness" over the past two years, which have only seen temporary success. The limiting reagent has been primarily our lack of in-house experience with implementing Cypress best practices and resolving race conditions, given a low level of information provided by the output of the (sporadically) failing Cypress tests.

Like other third-party code libraries, Cypress recieves periodic version updates from its maintainers, in order to improve performance and/or implement bug fixes; these updates may include security fixes. For the past year, our project has been stuck with using version 8.5.0 (released in [September 2021](https://docs.cypress.io/guides/references/changelog#8-5-0)), as using any further versions in our project caused an elevated rate of test flakiness, to the point where it would functionally hinder or block development.

In July 2022, an effort was undertaken to [upgrade the version of Cypress to 10.3.1](https://github.com/transcom/mymove/pull/8934), which was the current version at the time. It was discovered that, with the upgrade to version 10, a non-trivial amount of file renaming and restructuring work would need to be performed; once that was completed, [the rate of test failures increased significantly](https://docs.google.com/spreadsheets/d/1AsBB8_EkQ1ltqM2a4zfdDs4EvTfqdN76slUrdXeH5LA/edit#gid=0). Several existing and currently passing tests were now failing on each execution, with others now failing at an incidence rate of 10-20% when run as a part of our CI process. This was investigated, but ultimately set aside in the interest of feature development work.

In December 2022, a renewed effort was undertaken to [upgrade the version of Cypress to 12.0.2](https://github.com/transcom/mymove/pull/9737), which was now the current version. The same file renaming and restructuring work needed to be performed; once finished, [the rate of test failures skyrocketed](https://docs.google.com/spreadsheets/d/1P2qvEZqdW9Wyg5McYAe7GNt64abSKjSU3pFhIsJneZE/edit#gid=1060625568). The number of both consistently failing and sporadically failing tests had approximately doubled from the effort six months earlier, and now affected at least half of all integration tests in our existing suite.

The widely accepted explanation for all of the sporadic test failures (and a significant portion of the consistent failures) is that our integration test code has been written in a way that creates race conditions that are experienced when executed; it's likely that the upgraded version of the Cypress library contains a faster runtime that exposes those race conditions to a higher degree. As the code within our test suite has evolved over a long period and many contributors to it are no longer on the project, the chances of understanding _why_ it was written in the way it was seems impossible.

## Considered Alternatives

- Continue using existing version of Cypress
- Upgrade to current version of Cypress
- Convert integration tests to Playwright, gradually
- **Convert integration tests to Playwright, all at once**

## Decision Outcome

First, we've decided that the current situation with using a long out-of-date version of Cypress is untenable. While it still maintains some functionality -- it has caught legitimate errors that in pull requests would have otherwise been merged into the `main` branch of the code base -- the existing level of flakiness is not something we should accept. Additionally, there are a broad range of developers on the project touching this code, and very little concept of standards or best practices; it can reasonably be assumed that the rate of sporadic and consistent test failures will increase, as will the rate of false negative tests that don't actually cover what we believe it does. Finally, being stuck on an outmoded piece of code makes us functionally incapable of any security fixes; the longer we go in this state, the more painful any forced update will eventually be.

Give that, if we are going to need to re-write a significant portion (if not all) of our integration test code base, it makes sense at this juncture to evaluate other tools that may be a better fit for our application and needs. [Playwright](https://playwright.dev/) is a well-supported integration test library that's seeing rapid community adoption.

Comparable to Cypress in aim, Playwright has the benefit of improved tooling around automatic test generation (increasing developer velocity), as well as much stronger, interactive reporting of errors as opposed to Cypress' video output. Unlike Cypress, the interface of code written for Playwright is similar to that of React Testing Library, which we're already using for our front end unit tests. The compile-time and runtime for Playwright tests, especially locally, is also improved over the Cypress baseline, providing a significantly shorter feedback loop that allows for better developer iteration.

One final consideration is around the timeframe of changing over to any new tool. We have multiple efforts nominally underway, but functionally stalled, that would gradually let us change our way of working from one library or technique to another. We want to avoid another iteration of this pattern, and while we are cognizant of the risks and communication costs of any sort of cutover, we will seek to convert all existing Cypress-based integration tests to Playwright at once, immediately removing our dependence on the older tool.

(It's worth noting that we've started a preliminary, experimental effort in to convert a subset of our Cypress-based integration test code base into Playwright using the improved tooling that's available to us. The results have been promising, both in terms of completeness and speed of development.)

## Pros and Cons of the Alternatives

### _Continue using existing version of Cypress_

- `+` The existing setup does actually serve our purposes, catching legitimate errors introduced as part of pull requests before they're merged into the main branch
- `+` No significant changes to how integration tests are written, eliding the need for developer education
- `-` It's still literally broken 3-5% of the time and the cause of developer headaches across the project
- `-` No ability to upgrade if there's a major security fix
- `-` The longer we stay on the existing version, the more painful any potential future upgrade that we might be compelled to make becomes

### _Upgrade to current version of Cypress_

- `+` Some portion of the existing integration test code can be maintained
- `+` Potentially minimizes the amount of developer education needed after the upgrade, since we're used to Cypress
- `-` Will require significant investigation into the cause(s) of the flaky integration tests
- `-` We don't have any Cypress experts on the project, and best practice documentation for Cypress is scattered and often outmoded
- `-` An unknown amount (but probably "lots") of the existing integration test code base will need to be significantly changed or entirely rewritten
- `-` No straightforward way to do a gradual upgrade of existing integration tests

### _Convert integration tests to Playwright..._

- `+` Well-supported and well-resourced technology, gaining rapid community adoption
- `+` Interface is similar to what we're already using for unit tests, limiting the steepness of the learning curve
- `+` Reporting of results is more useful than Cypress
- `+` Code generation tool allows for tests to be written rapidly
- `+` Playwright build and runtime is much quicker than any version of Cypress
- `-` All integration tests will need to be re-written
- `-` It's unlikely, but the flakiness of our integration test results may be implicitly caused by our application, independent of the library they're written for

#### _...gradually_

- `+` Integration tests can be ported over gradually, and can be assigned broadly
- `+` No need for partial code freezes
- `-` We have multiple gradual code conversion efforts that have stalled, forcing us to maintain two simultaneous ways of working in perpetuity (for example, [changing from Enzyme to RTL](https://transcom.github.io/mymove-docs/docs/frontend/testing/writing-frontend-tests-enzyme-and-react-testing-library#on-moving-from-enzyme-to-rtl), and [migrating front end code into linter control](https://transcom.github.io/mymove-docs/docs/adrs/frontend-file-org))
- `-` Working with code covered by unconverted integration tests may shift some unpredictable costs onto teams during slice planning

#### _...all at once_

- `+` It just gets done
- `+` Playwright code generation tooling makes conversion surprisingly quick and painless
- `+` Provides opportunity for coordinated developer education
- `-` Creates **need** for coordinated developer education
- `-` Will require project-wide communication around a partial code freeze
- `-` Will require project-wide developer support
- `-` Integration with CI must be nailed on, or else we're replacing one cause of developer unhappiness with another
