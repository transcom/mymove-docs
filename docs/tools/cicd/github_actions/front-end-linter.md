# Front End Linter

## Configuration

The front end linters are configured to run based off of [`front-end-linter.yml`](https://github.com/transcom/mymove/blob/main/.github/workflows/front-end-linter.yml). Those linters are configured inside of [`.eslint.rc`](https://github.com/transcom/mymove/blob/main/.eslintrc.js) and [`.eslintignore`](https://github.com/transcom/mymove/blob/main/.eslintignore).

## Purpose

This GitHub Action checks the frontend code to assure that it is adhering to the rules outlined inside of `.eslintrc.js`. These rules help flag possible bugs and stylistic errors.

## Additional Notes

While most of the rules are pulled from other packages, a few rules are custom written. Most notable of these is the [`ato/no-unapproved-annotation`](https://github.com/transcom/mymove/blob/main/eslint-plugin-ato/no-unapproved-annotation.js) rule, which relates to the static analysis workflow.
Further information on static analysis can be found in our [Guides to Static Analysis](https://dp3.atlassian.net/wiki/spaces/MT/pages/1921384494/Static+Analysis)
