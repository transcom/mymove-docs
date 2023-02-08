---
id: github_actions
slug: /tools/cicd/github_actions
---
# GitHub Actions

MilMove uses [GitHub Actions](https://dp3.atlassian.net/wiki/spaces/MT/pages/1250197576/ADR-0029+Replace+CircleCI+SaaS+with+GitHub+Actions) rated at IL6+ as of March 31, 2021.

A set of [GitHub actions/workflows](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) are defined [in MilMove](https://github.com/transcom/mymove/tree/main/.github/workflows).
As part of the [MilMove deployment](https://dp3.atlassian.net/wiki/spaces/MT/pages/1467252884/Deployment) process, when a developer pushes their code to their GitHub branch, automated tests are run and must pass all the necessary checks 
before the developer is allowed to merge their code to the main branch.
