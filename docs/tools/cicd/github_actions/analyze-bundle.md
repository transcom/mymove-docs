# Analyze Bundle

## Configuration

[`analyze-bundle.yml`](https://github.com/transcom/mymove/blob/main/.github/workflows/analyze-bundle.yml)

## Purpose

The `analyze-budnle` GitHub Action is used to compare the bundle size between the pull request branch that this action is run on and the main branch.

## Additional Notes

When this job completes, it posts a comment inside the pull request with the difference in size btween the two bundles.
