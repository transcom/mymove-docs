---
sidebar_position: 2
---

# What is Dependabot

[Dependabot](https://dependabot.com) is used to monitor the repository dependencies and update them with automatic
pull requests against the `master` branch in the repo. Engineers then merge the Dependabot pull requests into master, or close with a note on why the update cannot be merged.

# Dependency Updates
Dependabot will automatically create pull requests. Open Dependabot pull requests can be quickly found [here](https://github.com/transcom/mymove/pulls?q=is%3Apr+is%3Aopen+label%3Adependencies). **Dependency updates must be handled (reviewed & merged or closed with explanation) within seven days of the opened pull request.**

The description of the PR includes the `Release Notes`, `Changelog`, and individual `Commits`. Before taking any action, one should quickly scan the `Release Notes` for any obvious conflicts with how we're using the library/dependency.

Builds that are passing, and show no potential conflicts can be merged. After merging, monitor the master build to make sure it passes and there are no issues. If there are issues with the build caused from the dependency update, the PR should be reverted with an explanation of why the dependency was not merged.

If a Dependabot pull request shows a build a failure, you will need to take some additional steps. Often times the failure is an intermittent failure unrelated to the dependency update. Rerunning the build will often resolve these failures. In instances where the dependency update appears to be the cause of the failure, further investigation is required. The `Release Notes` or `Changelog` may show a change that is causing a conflict with how we are using the dependency or there may be a peer dependency that is out of date. Each case is different, but engineers should attempt to resolve the failure if possible. In cases where the update to the dependency results in that version being unusable with our application, the pull request can be closed with an explanation.

# Dependency Workflow
MilMove engineering teams rotate responsibility for managing dependency updates. Currently a team will manage dependencies for one Slice, before passing on to the next team. The team responsible for dependency updates should add a chore to their sprint board in Jira. If a new update requires making changes to the codebase, this should be captured with a Jira story. The team should work with their PO to decide if they can complete the work within the current sprint or schedule it for the next one.

In a case where a team is rolling off dependency updates, but has identified dependency changes that cannot be completed in the current Slice, the two teams involved in the transition will need to coordinate the work. The team rotating off should have already created the story for the work needed to be done to resolve the dependency failure. This story should be passed on to the team rotating on, so they can pull it in to their sprint. The team rotating off should provide the necessary context to enable the team rotating on to properly understand the technical work that needs to be done. This should happen before the subsequent sprint planning.

# Note on major updates
For most minor updates (ex: `aws-sdk-go 1.35.25 -> 1.35.27` or `swagger-client 3.11.1 -> 3.12.0` ) a review of the `Release Notes` should provide enough information on whether to move ahead with merging the dependency update. However, for major updates (ex: `@storybook/react 5.3.19 -> 6.0.28`) it would be best practice to have an engineer actively working with that dependency to review the update and give approval before merging. This would provide a chance for people with the most context to identify potential breaking changes and what steps they might need to take before, or as part of the upgrade.

If necessary, a Jira story should be created and planned for by the team that is best positioned to complete any work needed to meet the requirements of a major update.

# Dependabot Limitations
Dependabot cannot be relied upon to capture updates for every app dependency. Certain updates, such as updates to Go, will not come through Dependabot. Identifying these dependencies and the process for making such updates is still being discussed, and will be documented when known.
