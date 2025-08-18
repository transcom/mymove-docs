---
sidebar_position: 1
---

# 508 compliance

## Implementation
[E-05764](https://www13.v1host.com/USTRANSCOM38/assetdetail.v1?number=E-05764) added the enforcement of 508 compliance on all tests. This was accomplished by wrapping Playwright and Jest tests in axe DOM scans.

## Baseline
To prevent hard blockage of tasks, existing Jest and Playwright axe findings were saved to root MilMove under the `__a11y_baseline__` folder. This is set by doing one of the two following options:

1. Baselining the full app via `make client_test_update_baseline` (Jest only)
2. Or manually setting your environment variable `A11Y_MODE=update-baseline` and running specific tests
   1. This is the method used to baseline Playwright due to ongoing flakiness. After setting this environment variable, the Playwright baseline can be set by any desired method of running all Playwright tests within MilMove. The same goes for Jest.

## Environment variables

The Playwright and Jest 508 wrappers will use environment variables to determine how to operate. The environment variables are as follows:
 * `strict` - fails on any violations.
 * `baseline` - compares against a committed baseline.
 * `update-baseline` - updates that baseline.
 * `disabled` - skips checks.

By default, development machines use strict and the pipeline uses baseline. The remaining variables are used at discretion of the developer.

## Wrappers

See [Playwright 508 considerations](../../frontend/testing/writing-playwright-tests-for-milmove.md#508-considerations) and [Jest 508 considerations](../../frontend/testing/writing-tests-using-react-testing-library-and-jest.md#508-considerations).

### Additional references
- [Playwright axe-core package](https://www.npmjs.com/package/@axe-core/playwright)
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing)
- [Jest axe-core package](https://www.npmjs.com/package/jest-axe)
