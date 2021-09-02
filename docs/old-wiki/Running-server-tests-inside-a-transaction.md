## Background
In June 2021, we introduced the [go-txdb](https://github.com/DATA-DOG/go-txdb) tool to allow us to run tests within a transaction, and then roll back the transaction after the test. This allows each test to start with a clean DB state, and is much faster than truncating the DB, which is how we've been resetting the DB all this time. Here is the PR that introduced transactions in tests: https://github.com/transcom/mymove/pull/6650

The original PR was designed in a non-breaking way such that existing tests that still use truncation can continue to run. The idea was to make the transaction feature opt-in, and incrementally update each package to use transactions. The PR updated several packages to give examples of what it takes to start using transactions. Follow the steps below to convert more packages.

## Note about running tests in code editor or IDE
Before you start running tests in Goland or other editor, make sure to run `make server_test_setup` first.

## How to convert a package to use transactions
1. Go to your package's top-level `*_test.go` file. It's the one that defines a `SetupTest()` function. For example, for the `ghcapi` package, the file is in `pkg/handlers/ghcapi/api_test.go`.
2. Remove any calls to `TruncateAll` in the the `SetupTest()` function. If that's the only thing in that function, you can remove `SetupTest()`.
3. Remove any calls to `suite.TruncateAll()` in the package's tests.
3. In the function that defines the test suite (it's usually the last function, and its name starts with `Test` and ends with `Suite`, such as `TestHandlerSuite`), add `, testingsuite.WithPerTestTransaction()` after `testingsuite.CurrentPackage()`. For example:

```golang
hs := &HandlerSuite{
    BaseHandlerTestSuite: handlers.NewBaseHandlerTestSuite(
        logger, 
        notifications.NewStubNotificationSender("adminlocal", logger), 
        testingsuite.CurrentPackage(), 
        testingsuite.WithPerTestTransaction(),
    ),
}
```
Here's an [example commit that converts the ghcapi package](https://github.com/transcom/mymove/pull/6650/commits/ab1e72fbd559b73dc7a9089c0d5d5d12d4f83ba2).

4. Run the tests and see if any fail. If none fail, then you are done! If tests fail, read on to fix them.

## suite.Run vs suite.RunWithRollback
We have two ways you can run tests, `suite.Run` and `suite.RunWithRollback`. Each has a use case, so you need to make sure you use the correct one.

### suite.Run
* If the code you are testing is using transactions, this is the one you need to use.

### suite.RunWithRollback
* This can only be used if per test transactions are turned on.
* This will roll back changes after each test. This means you can reuse data that was set up in the main test in each of the subtests.

## How to fix failing tests after turning on transactions
* If the tests are using `suite.T().Run("some test description", func(t *testing.T)`, replace all instances of `suite.T().Run` with `suite.RunWithRollback` and all instances of `func(t *testing.T)` with `func()`. You'll also need to remove the `testing` package from the `import` statement.
    * If the tests fail, it's most likely because the code under test uses transactions. In this case, you'll want to use `suite.Run`, and in some cases, that's enough to get the tests to pass. 
    * If not, it could be because each subtest is sharing DB setup. In that case, extract the shared setup into a separate function, and call that function at the beginning of each subtest. Look at the diff of `pkg/handlers/ghcapi/orders_test.go` in [this example](https://github.com/transcom/mymove/pull/6650/commits/ab1e72fbd559b73dc7a9089c0d5d5d12d4f83ba2).
    * If the shared setup was already in a separate function, it should just be a matter of calling the setup function at the beginning of each subtest. [Here's an example](https://github.com/transcom/mymove/pull/6650/commits/dc6d5805a104d10463a7fd5382d43a598b6626a8).
* Remove any calls to `suite.TruncateAll()` in the tests. Here's an example of [how the models tests were converted to use transactions](https://github.com/transcom/mymove/pull/6650/commits/ecefc78ef874644f9191d3a70aacb573bed63567).
* Replace `suite.T().Fatalf` with `suite.Fail`

In a few cases, running inside transactions have exposed that the tests were not actually running in isolation from each other and so the test wasn't actually testing what it thought it was. In those cases you may find latent bugs that need to be fixed or tests that need to be rethought so they really test the right thing.

### Why data setup has to be repeated within each subtest
In `pkg/testingsuite/pop_suite.go`, we created our own `Run` function that overrides the default testify `suite.Run` to ensure that the test DB is torn down for per-transaction tests.

It would be nice if subtests could start a new transaction inside
the current connection so they could reuse db setup between
subtests. Unfortunately, because `database/sql` and `pop` do not
support nested transactions, this gets complicated and hairy
quickly. When testing that approach, connections wouldn't get
closed and cause other tests to hang or subtests would report
incorrect errors about transactions already being closed.

And so, if per test transaction is enabled, each subtest gets a new
connection. This means subtests are really just like main tests,
but subtests are a helpful way to group tests together, which can
be useful. Therefore, shared setup has to be moved to a function that can be run once
per subtest. In testing this approach, it was still faster with per test
transactions than the old way of cloning a DB per package.

In addition to the `suite.Run` function, we also have `suite.RunWithRollback` that could eliminate the need for calling the setup function within each subtest. This is the case if the code under test does not use transactions. If the code under test starts its own transaction, then `suite.Run` should be used.

## Updating/adding to existing tests that use transactions
Make a note of how the tests are set up, and follow the existing patterns, such as using `suite.Run` or `suite.RunWithRollback`, and calling the shared DB setup function within each new subtest you add, where applicable. 

If you modify the code under test such that it now starts using transactions, and if the existing tests were using `suite.RunWithRollback`, you'll need to update the tests to use `suite.Run`.
