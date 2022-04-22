---
sidebar_position: 9
---

# Running server tests inside a transaction

When our tests run, we often need to clear the database between tests so we can have a clean slate.

In our old coding pattern, this wasn't enforced so there were lots of dependencies between tests, which is not a good pattern. Tests should be isolated from each other.

If we did clear the database, we were using `TruncateAll()` to delete all records in the database, which is slow.

For those reasons, as of June 2021, we have a new coding pattern that will use [transactions](https://www.geeksforgeeks.org/postgresql-transactions/) to clear the database between tests and manage database connections in a more optimized fashion.

Read more for [background](#background) on this.

## How to update a test to the new pattern

First let's look at the old pattern. The subtests often relied on db records that were created in the  `TEST SETUP` section. Sometimes, a later subtest would even rely on a change from an earlier subtest.

**Old pattern:**

```golang
func (suite *MTOShipmentServiceSuite) TestMTOShipmentUpdater() {

    // TEST SETUP
    // Set up mocked objects and other local (non-db) variables
    // Prepare the database with testdatagen and suite.DB() calls

    suite.T().Run("Subtest 1", func(t *testing.T) {
        // Run Test
        // Check errors
    })

    suite.T().Run("Subtest 2", func(t *testing.T) {
        // Run Test
        // Check errors
    })  
```

In our new pattern, the database will be cleaned for each subtest. So we can't rely on any db records changed in the `TEST SETUP` section, or any db records changed in previous subtests. We need to put all that setup into a function, called `setupTestData` here, and call that in each subtest.

**New Pattern**:

```golang
func (suite *MTOShipmentServiceSuite) TestMTOShipmentUpdater() {

    // TEST SETUP
    // Set up mocked objects and other local (non-db) variables
    
    // MOVE DB SETUP TO A FUNCTION
    setupTestData := func() {  
        // Prepare the database with testdatagen and suite.DB() calls
    }

    suite.Run("Subtest 1", func() {
        setupTestData()    // <-- Call the DB setup function
        // Run Test
        // Check errors
    }

    suite.Run("Subtest 2", func() {
        setupTestData()  
        // Run Test
        // Check errors
    }

```

### What's different

:::note View in PR
You can see these [changes in a PR](https://github.com/transcom/mymove/pull/6650/commits/3baaff02ffa8ca745ffb9c75422a1598180635ec#diff-a9eeef9ef97657c461ec7c76226f6c6f5dd03b4938217e4ed0de9bbbfe161815) if you prefer.
:::

Follow these directions

1. The function declaration for the main test needs to be simplified.

   * `suite.T().Run` → `suite.Run`
   * `func(t *testing.T)` → `func()`

   From:

   ```golang
    suite.T().Run("Subtest 1", func(t *testing.T) {
   ```

   To:

   ```golang
    suite.Run("Subtest 1", func() {
   ```

2. All DB setup should be moved to a function that is called in each subtest. There are more than one ways of achieving this, the following is just one example.

   ```golang
    // MOVE DB SETUP TO A FUNCTION
    setupTestData := func() {  
        // Prepare the database with testdatagen and suite.DB() calls
    }

    suite.Run("Subtest 1", func() {
        setupTestData()    // <-- Call the DB setup function
        // Run Test
        // Check errors
    }
   ```

3. Remove any calls to `suite.TruncateAll()` in the tests.
4. Replace `suite.T().Fatalf` with `suite.Fail`.
5. Remove `testing` from the imports at the top of the file.
6. Run all tests in the package.

## How to update the package to the new pattern

Hopefully the package  you are working on has already been updated to use the new pattern.

### **Check if packate has been updated**

To check, navigate to the file that sets up testing for the package, usually it is located at `<path_to_package>/api_test.go`

For example, for the ghcapi package, the file is in `pkg/handlers/ghcapi/api_test.go`.

Search for the new option `testingsuite.WithPerTestTransaction()`.

If it does not exist in the file, you should update the package.

### **Update the package to use the faster testing setup**

You need to make two changes to this file.

1. Update the package testing suite to use the new option - which is called `testingsuite.WithPerTestTransaction()`

![Fix package to use transaction option](/img/transactions/txn-update-package-option.png)

2. Remove calls to `TruncateAll()`. `TruncateAll` empties the database and we no longer have to do this since we use the magic of transactions.

    You can also remove the function SetupTest if all it did was call `TruncateAll()` and `suite.FatalNoError(err)`

![Remove TruncateAll](/img/transactions/txn-delete-setuptest.jpg)

3. Update the tests to remove `TruncateAll()`

   Now's a good time to remove all calls to `TruncateAll()` from the tests in this package too!

![Remove TruncateAll from tests](/img/transactions/txn-truncate-all.jpg)

4. Run the tests and see if any fail. If none fail, then you are done! If tests fail, read below to fix them.

**Done! The package is now setup for faster tests. Thank you.**

## Troubleshooting

### My tests started failing after making these changes

If you use `Suite.Run`:

* This could be because each subtest is sharing DB setup. Check that you have extracted **all the shared db setup** into a separate function, and call that function at the beginning of each subtest.

    Look at the diff of `pkg/handlers/ghcapi/orders_test.go` in [this example](https://github.com/transcom/mymove/pull/6650/commits/3baaff02ffa8ca745ffb9c75422a1598180635ec#diff-7ed9d49b328573d1e4b4c17ef8455b68ba22cedf910612f033634107ba60688a).

* If the shared setup was already in a separate function, it could just be a matter of calling the setup function at the beginning of each subtest. [Here's an example](https://github.com/transcom/mymove/pull/6650/commits/dc6d5805a104d10463a7fd5382d43a598b6626a8).

* If you've properly extracted the DB setup, it's possible a subtest was depending on the previous subtest. This is not a good pattern, try to unwind that dependency. Each test should pass in isolation from each other.

* Remove any calls to `suite.TruncateAll()` in the tests. Here's an example of [how the models tests were converted to use transactions](https://github.com/transcom/mymove/pull/6650/commits/3378f4c932d35f1cce58888d3a4f617af53df2d1).
* Replace `suite.T().Fatalf` with `suite.Fail`.
  
* If the issue is related to appContext, make sure to get the correct appContext inside the subtest using `suite.AppContextForTest()`.

* If you were using `t` from the passed in `t *testing.T`, use `suite.T()` instead.

### I can't extract the db setup into a function, should I undo everything?

Sometimes, it's too much of refactor to pull out all the setup and figure out how tests depend on each other. This is not a great situation, and this is a reason why tests shouldn't depend on each other.

However, if you still want to keep some of the transactional performance benefits, you can use an alternate `Run` function called `RunWithRollback`. This is a **less ideal pattern** for the following reasons:

* It doesn't actually use the newer txdb transactions
* You cannot use this if the underlying code under test uses transactions.
* If someone later changes the underlying code to use transactions, they will have to do the work to fully switch to `suite.Run`, the preferred pattern. This creates a deterrent to using transactions in the codebase, and we don't want to deter that.
* It doesn't rollback each subtest, it only rolls back after each test, so tests can still depend on each other.

However **if you absolutely must** use `RunWithRollback`, the process is easy. Just change the `suite.Run` calls to `suite.RunWithRollback`.

## Background

In June 2021, we introduced the [go-txdb](https://github.com/DATA-DOG/go-txdb) tool to allow us to run tests within a transaction, and then roll back the transaction after the test. This allows each test to start with a clean DB state, and is much faster than truncating the DB, which is how we've been resetting the DB all this time. Here is the PR that introduced transactions in tests: <https://github.com/transcom/mymove/pull/6650>

The original PR was designed in a non-breaking way such that existing tests that still use truncation can continue to run. The idea was to make the transaction feature opt-in, and incrementally update each package to use transactions. The PR updated several packages to give examples of what it takes to start using transactions. Follow the steps below to convert more packages.

:::note About running tests in code editor or IDE
Before you start running tests in Goland or other editor, make sure to run `make
server_test_setup` first.
:::

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
