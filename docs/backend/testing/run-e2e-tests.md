---
sidebar_position: 5
---

# How to run end to end (Cypress) tests

## Using the Cypress UI

The fastest way to run end to end tests is with the following command, which will open the
Cypress UI, from which you can choose to run all integration specs (there should be a link in
the top right that says something like "Run 25 integration specs"), or click on individual ones.

```sh
make e2e_test
```

This command truncates most tables in the test DB (which is much faster than destroying it, running it again,
and running all the migrations), then populates the DB from the data in the
`/pkg/testdatagen/scenario/e2ebasic.go` script, and then launches Cypress.

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
