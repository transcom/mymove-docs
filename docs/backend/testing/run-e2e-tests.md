---
sidebar_position: 5
---

# How to run end to end (Cypress) tests

Cypress tests run using the client-side code. This guide shows you how to run
the Cypress test suite either as Docker container, as a command-line tool
locally, or using the Cypress UI. When running within these tests, make sure you
build the client locally in order to ensure that the latest client code is what
Cypress is testing against.

```sh
make client_build
```

After completing the previous command, you should be able to run the commands
before and utilize the same client-side code to test. If you make any changes
within the `src/` directory, you will need to rebuild the client-side code. The
same is not true for the back-end work as that work is reloaded every time the
Cypress tests are started.

## Using the Cypress UI

The fastest way to run end to end tests is with the following command, which will open the
Cypress UI, from which you can choose to run all integration specs (there should be a link in
the top right that says something like "Run 25 integration specs"), or click on individual ones.

```sh
make e2e_test
```

This command truncates most tables in the test DB (which is much faster than destroying it, running it again,
and running all the migrations), then populates the DB from the data in the
`/pkg/testdatagen/scenario/e2ebasic.go` script, and then launches Cypress UI.

Sometimes, a new recently-merged migration might prevent the script from running.
In that case, or if something else seems wrong with the test DB, you can set everything
up from scratch:

```sh
make e2e_test_fresh
```

If you have already run tests in the current database, and you want to keep Cypress open
to run the tests again, you can empty and refill the test DB with this command:

```sh
make db_e2e_up
```

## In Docker

If you instead would like to run all the tests in the terminal, use the following command:

```sh
make e2e_test_docker
```

To run just the office tests:

```sh
SPECS=cypress/integration/office/**/* make e2e_test_docker
```

## Run Specific Tests in a File

```sh
yarn cypress run --spec cypress/integration/path/to/file.jsx
```

## Automated tests artifacts from continuous integration

:::note Artifacts overview call-out
Please note that the Artifacts overview is the main area that's important to
read.
:::

Currently we use CircleCI to store artifacts of failed Cypress tests. These are
available to Trussels with access to the repository using the CircleCI UI.
[Please see the official CirclCI documentation around storing build
artifacts][docs-circleci-artifacts]. Artifacts are only stored on failed
Integration Tests that run in CI. This is defined in our `.circleci/config.yml`
file in the project under the `e2e_tests_cypress:` stanza. [Here's a link to an
example][gh-circleci-e2e_tests_cypress].

[docs-circleci-artifacts]: https://circleci.com/docs/artifacts#artifacts-overview
[gh-circleci-e2e_tests_cypress]: https://github.com/transcom/mymove/blob/35630d2f7e94371393860dfd63f9b6d49eededdb/.circleci/config.yml#L567-L633
