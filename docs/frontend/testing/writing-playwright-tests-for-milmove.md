---
sidebar_position: 9
---

# Writing Playwright Tests for MilMove

This guide covers how MilMove writes tests for Playwright. You should
probably familarize yourself with the [Playwright docs on writing
tests](https://playwright.dev/docs/writing-tests). Some of the best
practices below merely reinforces information from that doc.

You can almost certainly use some of the knowledge from [Writing Tests using React Testing Library and Jest](writing-tests-using-react-testing-library-and-jest.md).

## Best Practices / Things to Know

### No seed data

Unlike our old cypress testing strategy of running a command to load
seed data with hard coded ids that tests can reference, with
Playwright, if a test needs test data in the database, it should create
it using the testharness in the support api. See below for more
details.

You should be able to run any Playwright test after a `make
db_dev_reset db_dev_migrate` or after `make db_dev_truncate`.

### Always (always!) ensure your test runs independently

When adding a test, you should ensure it can run on its own without
any other test. Never have one test depend on another test having run.
That's how we get flaky tests!

### Test data growth can (eventually) cause test failures

The majority of the time, Playwright tests will be run on an empty
database. If you are developing locally and run the tests many times,
each test run will create its own data, causing more and more entries
(e.g. moves) in the database. Having many moves in the database may
cause some tests to fail because they are expecting their newly
created data to show up on the first page of a paginated result, but
the data the test is looking for may instead be on the second or third
page of results.

While it's not ideal for tests to depend on that behavior, sometimes
the effort to make the test more robust is not worth the gain.

If you start getting failures for tests that used to pass, try `make
db_dev_truncate`.

### Use Playwright fixtures

To quote from the [Playwright documentation on
fixtures](https://playwright.dev/docs/test-fixtures)

> Playwright Test is based on the concept of test fixtures. Test
> fixtures are used to establish environment for each test, giving the
> test everything it needs and nothing else. Test fixtures are
> isolated between tests.

We put all of our fixtures in `playwright/tests/utils`. If you find
you have a common helper function that you want to reuse, please
consider adding it to a fixture in that directory. That allows others
to more easily discover and reuse your helper.

### Wait for the page to load

After performing an action which results in data on the page changing,
use async assertions (see below) to wait for the page to be in the
appropriate state. As much as possible, avoid tying your test to
implementation details about the [network
events](https://playwright.dev/docs/network#network-events) and
instead use async assertions (see below) to wait until the data you
need is visible on the page before proceeding.

See more at the [Playwright docs for navigation](https://playwright.dev/docs/navigations)

### Prefer user-facing attributes instead of css selectors 

Quoting from the [Playwright docs on
locators](https://playwright.dev/docs/locators#locating-elements)

> Playwright comes with multiple built-in locators. To make tests
> resilient, we recommend prioritizing user-facing attributes and
> explicit contracts such as page.getByRole().

### Avoid force clicking at (almost) all costs

Force clicking bypasses the
[actionability](https://playwright.dev/docs/actionability) checks and
increases the chances of flaky tests.

Instead of using a locator for the `input`, try clicking on the
associated text or parent element. The experience with Playwright so
far on MilMove is that if you need to force click, it's probably a
smell that there's something wrong with how the page is working (e.g.
a component with a label of the empty string instead of
`&nbsp;` ).

### Use async assertions

This is referenced in the [Playwright assertions
docs](https://playwright.dev/docs/writing-tests#assertions) and will
be expounded upon here.

Instead of doing
```javascript
  const editCount = await page.getByText('Edit').count();
  expect(editCount).toEqual(2);
```
Use the async assertions which will wait until the condition is met,
which makes tests much less flaky!
```javascript
  await expect(page.getByText('Edit')).toHaveCount(2);
```
### Accessing Traces in CircleCI

We run Playwright in [CircleCI using parallelism so the job completes
faster](https://circleci.com/docs/parallelism-faster-jobs/). This
means that if there is a test failure, you need to figure out which
parallel run failed. That run will be red in CircleCI. You can then go
to the `Artifacts` tab and then find the artifacts for that run.

Unfortunately, [Playwright traces do not load in
CircleCI](https://github.com/microsoft/playwright/issues/18108). We
have two workarounds.

#### Complete Archive

The first is that we zip up the entire playwright run (for that
particular parallel run) in `complete-playwright-report.zip`. Download
that zip file and unzip it (unless you are using Safari, which will unzip
it for you automatically). Then you can [view the report](https://playwright.dev/docs/ci-intro#viewing-the-html-report).

```shell
yarn playwright show-report path/to/report-folder
```

#### Individual Trace

The complete report is a bit large, so you could also download the
trace for just a failing run and view that.

```shell
yarn playwright show-trace path/to/trace.zip
```

Please note that if you use Safari to download the trace file, it will
automatically unzip it for you, which then confuses Playwright.
Download it with another browser like Chrome or zip it back up

```shell
(cd ~/Downloads && zip -r trace.zip randomhextracegoeshere) && playwright show-trace ~/Downloads/trace.zip
```

### Playwright Workers

By default [Playwright runs tests in
parallel](https://playwright.dev/docs/test-parallel#worker-processes).
On you local dev machine, it guesses how many workers to use based on
your CPU. It shows that at the beginning of the run, with something
like `Running 16 tests using 5 workers`.

If you find you are having test failures locally, try [limiting
workers](https://playwright.dev/docs/test-parallel#limit-workers) by
using the `--workers` flag.

## Testharness in the Support API

To make it easy for a test to create the data it needs on demand, a
testharness in the support API has been created on the backend. The
`utils/testharness.js` has all of the methods.

If you need to create a new method, make sure you do not hard code
object IDs so that the same test can be run in the same database
multiple times in a row without error.

### Adding a new testharness endpoint

Ideally you would be re-using/creating a function like we have in
[testdatagen/scenario/shared.go](https://github.com/transcom/mymove/blob/main/pkg/testdatagen/scenario/shared.go).
Again, make sure any objects you build do not have hardcoded IDs so
that multiple instances can be created.

1. Add a new function in the [testdatagen/testharness
   package](https://github.com/transcom/mymove/tree/cf5ad992f2f3a833651d79efc49d92dc6b018d8d/pkg/testdatagen/testharness)
1. Add a new entry to the [actionDispatcher
   map](https://github.com/transcom/mymove/blob/cf5ad992f2f3a833651d79efc49d92dc6b018d8d/pkg/testdatagen/testharness/dispatch.go#L15)
   calling your new function
1. Add a new function to [testharness.js](https://github.com/transcom/mymove/blob/cf5ad992f2f3a833651d79efc49d92dc6b018d8d/playwright/tests/utils/testharness.js)

### How the testharness works in the backend

If devlocal auth is enabled (`DEVLOCAL_AUTH=true`), the [testharness
handler is added under path
`/testharness`](https://github.com/transcom/mymove/blob/8fd35682409c0b4fc8ab14b9a8b6db957e1efb2d/pkg/handlers/routing/routing_init.go#L403-L408).
Note that the testharness is unauthenticated so that e.g. users can be
created. 

The [testharness handler calls
testharness.Dispatch](https://github.com/transcom/mymove/blob/cf5ad992f2f3a833651d79efc49d92dc6b018d8d/pkg/handlers/testharnessapi/api.go#L32)

Then the dispatcher uses the `actionDispatcher` map as described
above.
