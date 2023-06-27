---
sidebar_position: 6
---

# How to run Go tests

:::info Having trouble setting this up?

Ask in [DP3 Slack #g-database 🔒][slack-dp3-g-database] for help with these
commands.

[slack-dp3-g-database]: https://ustcdp3.slack.com/archives/CSGDM3NUW

:::

## Run All Go Tests

```shell title="Running all the server tests"
make server_test
```

## Run Specific Tests

All of the commands in this section assume that `test_db` is setup properly.
Properly here is defined as having your Test database running in Docker, having
the Test database migrated, and seeded with `DevSeed` data.

```shell title="Resetting and migrating the test database"
make db_test_reset db_test_migrate
```

### Run All Tests in a Single Package

```shell
go test ./pkg/handlers/internalapi/
```

### Run Tests with Names Matching a String

The following will run any Testify tests that have a name matching `Test_Name` in the `handlers/internalapi` package:

```shell
go test ./pkg/handlers/internalapi/ -testify.m Test_Name
```

### Run Subtest with Names Matching a String

Sub-tests often have non alpha numeric characters in the name, which testify
translates to underscore. You can see the name of the test by running all of the
tests like above, but with the verbose flag.

```shell
go test -v ./pkg/handlers/internalapi/ -testify.m Test_name
```

Then you can run the single subtest with:

```shell
go test -count=1 -v -run 'Test_suite_name/Test_name/sub_test_name' ./pkg/handlers/ghcapi
```

## Run Tests when a File Changes

You'll need to install [`ripgrep`](https://github.com/BurntSushi/ripgrep) and
[`entr`](http://www.entrproject.org/) (`brew install ripgrep entr`):

```shell
rg -t go --files | entr -c $YOUR_TEST_COMMAND
```

Here is an example that will run all model tests when any Go file in the project is changed:

```shell
rg -t go --files | entr -c go test ./pkg/models
```

There is generally no need to be any more specific than `rg -t go`, as watching all `.go` files is plenty fast enough.

## Run Tests with Coverage Report

Go has a built-in test coverage tool. You can generate test coverage reports at any level outlined above.

### Simple Coverage Report

```shell
go test ./pkg/handlers/internalapi -cover
```

You will see a result similar to the following, showing the amount of code coverage your tests produce:

```console
ok  	github.com/transcom/mymove/pkg/handlers/internalapi	72.020s	coverage: 73.5% of statements
```

### Detailed Coverage Report

You can view line-by-line coverage in the browser using the following commands:

```shell
go test ./pkg/handlers/internalapi -coverprofile=coverage.out && \
go tool cover -html=coverage.out
```

A browser window will automatically open. You can navigate files via dropdown in the top left corner.
