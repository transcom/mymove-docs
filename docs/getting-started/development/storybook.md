# Storybook

We use [Storybook](https://storybook.js.org) for reviewing our
component library. The current components are deployed to
[https://storybook.dp3.us](https://storybook.dp3.us) after each build
of the main branch.

Each PR saves storybook as an artifact in CircleCI. Find the
`build_storybook` task and then go to the "ARTIFACTS" tab. Find the
link to `storybook/index.html` and click on it.
