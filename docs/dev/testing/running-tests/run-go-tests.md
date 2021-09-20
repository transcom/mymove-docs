# How To Run Go Tests

## Run All Go Tests

```console
$ make server_test
```

## Run Specific Tests

All of the commands in this section assume that `test_db` is setup properly. This can be done using:

```console
$ make db_test_reset && make db_test_migrate
```

### Run Acceptance Tests

If you're adding a feature that requires new or modified configuration, it's a good idea to run acceptance tests against our environments before you merge into master.  You can run acceptance tests against an environment with:

```console
$ TEST_ACC_ENV=experimental make acceptance_test
```

This command will first load the variables from the `config/env/*.env` file and then run `chamber exec` to pull the environments from AWS.  You can run acceptance tests for the database connection, DOD certificates, and Honeycomb through environment variables with `TEST_ACC_INIT_DATABASE=1` and `TEST_ACC_DOD_CERTIFICATES=1`, respectively.

For example to run acceptance tests against staging, including DOD certificate parsing, use:

```console
$ TEST_ACC_ENV=staging TEST_ACC_DOD_CERTIFICATES=1 make acceptance_test
```

### Run All Tests in a Single Package

```console
$ go test ./pkg/handlers/internalapi/
```

### Run Tests with Names Matching a String

The following will run any Testify tests that have a name matching `Test_Name` in the `handlers/internalapi` package:

```console
$ go test ./pkg/handlers/internalapi/ -testify.m Test_Name
```

### Run Subtest with Names Matching a String

Subtests often have non alpha numeric characters in the name, which testify translates to underscore. You can see the name of the test by running all of the tests like above, but with the verbose flag.

```console
$ go test -v ./pkg/handlers/internalapi/ -testify.m Test_name
```

Then you can run the single subtest with:

```console
$ go test -count=1 -v -run 'Test_suite_name/Test_name/sub_test_name' ./pkg/handlers/ghcapi 
```

## Run Tests when a File Changes

You'll need to install [ripgrep](https://github.com/BurntSushi/ripgrep) and [entr](http://www.entrproject.org/) (`brew install ripgrep entr`):

```console
$ rg -t go --files | entr -c $YOUR_TEST_COMMAND
```

Here is an example that will run all model tests when any Go file in the project is changed:

```console
$ rg -t go --files | entr -c go test ./pkg/models
```

There is generally no need to be any more specific than `rg -t go`, as watching all `.go` files is plenty fast enough.

## Run Tests with Coverage Report
Go has a built-in test coverage tool. You can generate test coverage reports at any level outlined above.

### Simple Coverage Report

```console
$ go test ./pkg/handlers/internalapi -cover
```

You will see a result similar to the following, showing the amount of code coverage your tests produce:
```console
ok  	github.com/transcom/mymove/pkg/handlers/internalapi	72.020s	coverage: 73.5% of statements
```

### Detailed Coverage Report
You can view line-by-line coverage in the browser using the following commands:

```console
$ go test ./pkg/handlers/internalapi -coverprofile=coverage.out
$ go tool cover -html=coverage.out

```

A browser window will automatically open. You can navigate files via dropdown in the top left corner.
