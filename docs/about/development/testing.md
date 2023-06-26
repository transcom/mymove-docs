# Testing

There are a few handy targets in the Makefile to help you run tests:

- `make client_test`: Run front-end testing suites.
- `make server_test`: Run back-end testing suites. [Additional info for running go tests](https://transcom.github.io/mymove-docs/docs/dev/testing/running-tests/run-go-tests)
- `make e2e_test`: Run end-to-end testing suite. [Additional info for running E2E tests](https://transcom.github.io/mymove-docs/docs/dev/testing/running-tests/run-e2e-tests)
  - Note: this will not necessarily reflect the same results as in the CI
    environment, run with caution. One is your `.envrc` is going to
    populate your dev environment with a bunch of values that `make e2e_test_docker`
    won't have.
- `make e2e_test_docker`: Run e2e testing suite in the same docker container as is run in CircleCI.
  - Note: this runs with a full clean/rebuild, so it is not great for fast iteration.
    Use `make e2e_test` to pick individual tests from the Cypress UI.
- `make test`: Run e2e, client- and server-side testing suites.
- `yarn playwright test`: Runs the playwright tests against the dec server and useful for inspecting individual e2e tests when debugging.
 - Note: You must already have the servers running for this to work!
** Deprecated: Cypress tests **
- `yarn test:e2e`: Useful for debugging. This opens the cypress test runner
  against your already running dev servers and inspect/run individual e2e tests.
  

## Troubleshooting tips -- integration / e2e tests

When running locally, you may find that retries or successive runs have unexpected failures. Some of the integration tests are written with the assumption that they will only be run against a clean DB. If you're working with one of these and don't have time to fix them to properly set up and clean up their state, you can use this command to reset your local dev db before opening the test runner. Note that if you choose not to fix the offending test(s), you'll have to repeatedly close the test runner to re-clean the the DB. You won't be able to take advantage of Cypress's hot reloading!

If you suspect memory issues, you can further inspect this with the commands:

- `yarn test:e2e-debug`, which runs `yarn test:e2e` with DEBUG stats
- `yarn test:e2e-debug-clean`, which runs `yarn test:e2e-clean` with DEBUG stats
