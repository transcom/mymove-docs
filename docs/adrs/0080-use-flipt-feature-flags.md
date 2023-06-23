---
title: 0078 Use Flipt for Feature Flags
description: Feature Flags enable CI/CD and roll-forward recovery. The question isn't "why?", but "how?"
---

# Flipt Feature Flags to enable CI/CD and roll-forward recovery

**User Story:** MB-13752

Why do this?

In production, USTC is going to expect very fast turnaround on some changes (hopefully mostly bugs). As they also have a long list of features to be added after go-live, it is likely that an incomplete feature will be committed when a fix is needed, and completing that feature would add an unacceptable delay to shipping the fix.

There are a few different approaches to solving this problem, depending on which decade you’re in. During the 2020s, the industry generally uses feature flags, so that is the type of solution considered here.
The other thing that feature flags allow, that would be very difficult otherwise, is segmenting the user base. Say for example that several months after we are live, we need to stop using login.gov and start using Okta. We could pick a date, and after that date require everyone to just set up a new login to get to their existing data. This would be inconsiderate at least, and a less-than-delightful user experience for people who happen to be in the middle of moving their entire family across the country on that date. Instead of that very bad scenario, we can use feature flags to have both login methods enabled at the same time, and select which one to use depending on the user. New users approaching the system can be directed to Okta, while existing users can continue to use login.gov. After all of the login.gov users have completed their moves, the feature can be turned off, and then later removed if needed. This approach can be used for any change, as needed.

The chosen solution:

* Should not disrupt the existing engineering workflow without good reason
* Be respectful of budgetary concerns
* Improve our ability to deliver code
* Solve all of the problem scenarios below
* Minimize impact on the already tight Milestone 1 schedule


Problem Statement

The MilMove project has multiple teams pushing code to shared repositories. All teams are currently using the same branch in each repo: main. This is very efficient pre-production, because all teams see each others' changes quickly. When we go to production (and maybe even a little before), this breaks down. A couple of example scenarios will illustrate this:

Scenario 1: The Bug vs. The Incomplete Feature

While one of our teams is part-way through an epic that adds a new feature, a critical bug is reported. A fix for the bug is quickly found and committed. But if we deploy code from the main branch at that point, half of the new feature will also be included, since it was already committed. Releasing half of a feature to production is generally frowned upon.

Scenario 2: Changing Authentication

After we have been live for several months, the customer requires us to move from using login.gov to authenticate users to Okta. Writing and testing the code is no problem. But when we deploy it, every user now has to set up a new authentication account. Many of those users will be in the middle of moving to their next duty station when we spring this on them. Users are constantly moving, there will not be a break in the schedule where we can do the changeover.

Scenario 3: Prime Freeze

For 30 days before we go live, the Prime (HSA) requires a code freeze for testing. We do not want to stop deploying for 30 days, and we really don't want to stop development for 30 days. Feature flags would allow us to build (and maybe even deploy) code during the freeze and remain productive.

## Considered Alternatives

* Option #0: Do Nothing. Stay the course, don't make any changes, figure out what to do when problems arise
* Option #1: LaunchDarkly: This is the industry standard feature flag platform.
* Option #2: Unleash: Open source, can be self-hosted
* Option #3: AWS AppConfig: we're already using lots of AWS, what's a little more?
* Option #4: Flipt: Open source, self hosted, supports file based config

## Decision Outcome

Chosen Alternative: Option #4: Flipt

LaunchDarkly is the industry standard, but there is no room for it in the budget. Unleash has similar features to AWS AppConfig, but requires more setup and maintenance effort when self-hosted (e.g. it requires a PostgreSQL database). AWS AppConfig is really a thin shim over config files and doesn't provide much in the way of helping us manage feature groupings.

Flipt provides a [filesystem backend](https://www.flipt.io/docs/experimental/filesystem-backends) which would allow a way for us to manage our feature flags using a [gitops](https://about.gitlab.com/topics/gitops/) style process. We can test out our flag configuration in separate environments (e.g. experimental, demo, staging) before rolling out to production. It also allows us to deploy the Flipt service without requiring another stateful system (e.g. no database).

We will have a couple of different options for how we deploy flipt. Examining the options for how flipt is deployed may be its own ADR.

## Pros and Cons of the Alternatives

### Option #0: Do Nothing
* '+' No change to App Eng workflow
* '+' No additional setup for Platform Team
* '-' We will at some point ship the wrong code
* '-' Will break API versioning required by Prime


### Option #1: LaunchDarkly
* '+' Industry standard
* '+' Feature Rich
* '-' Expensive. No room in ODC budget
* '-' Might not be allowed (It is FedRAMP moderate, not IL4)
* '-' Unknown if Platform Team will need to be involved


### Option #2: Unleash
* '+' Open Source
* '+' Can be self-hosted
* '-' Adds another thing for Platform to do before Milestone 1
* '-' Open source version may be limited
* '-' Somewhat complicated deployment model


### Option #3: AWS AppConfig
* '+' Not a lot of additional setup, App Eng already used to getting other configuration information from AWS
* '+' Very little Platform setup, AppEng already has limited access to AWS console
* '+' Cost is rolled into existing AWS ODC, no separate approval
* '-' Unknown cost
* '-' Very low level

### Option #4: Flipt
* '+' Provides flexibility to enable feature flags to groups of users in almost any configuration we could imagine
* '+' Open Source
* '+' Self hosted option is easy-ish to deploy
* '+' Gitops style, audited feature flag management
* '-' Additional service to deploy
