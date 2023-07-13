# Test Coverage Reports
## What are test coverage reports?

Test coverage reports indicate the percentage of segments of code in the codebase that have tests written about them.

On MilMove, test coverage is calculated for both the client and the server.

On the client, testable code in the `src/` directory is checked against all tests present there. End-to-end tests using Playwright are not considered in calculating client test coverage.

On the server, test coverage is calculated using the tests in the main Go package, in `pkg/`.

## Running test coverage reports

### CircleCI
Coverage tests are run automatically on CircleCI as part of the CI pipeline. This occurs whenever pull requests are created and on any subsequent commit to the given branch.

Since the test coverage commands have dependencies on `client_test` and `server_test` respectively, the results of the coverage tests do not appear as GitHub checks until those checks have completed. Once they do, CircleCI will report the result back to GitHub checks.
### Client locally
To run client test coverage locally,
```
make client_test_coverage
```

### Server locally
To run server test coverage locally,
```
make server_test_coverage
```


## Accessing and reviewing coverage reports

Both client and server test coverage checks generate coverage reports. If checks fail due to coverage dropping from the baseline, accessing the respective reports can provide context and help improve coverage where needed.

A comment will be added to the GitHub PR with a link to the coverage report.

Locally, reports are available in the `mymove` directory at their respective paths.

### Client reports

Client coverage reports provide an overview of coverage per directory, and provide a means to drill down to details of individual files and view coverage per expression.

An HTML version of the client coverage report is stored at `coverage/lcov-report/index.html`.

#### Overview:
![Client coverage overview](/img/cicd/client_coverage_overview.png)

#### Details:
![Client coverage details](/img/cicd/client_coverage_details.png)

### Server reports

Server coverage reports provide details of coverage on a per file basis, and analyze coverage per block.

An HTML version of the server coverage report is stored at `tmp/test-results/gotests/app/go-coverage.html`.

#### Report
![Server coverage report](/img/cicd/server_coverage_report.png)

## What to do if test coverage checks fail

There are several reasons that code coverage might decrease, as documented in [ADR 0079](https://transcom.github.io/mymove-docs/docs/adrs/develop-strategy-for-ensuring-code-test-coverage/#scenarios-that-result-in-a-test-coverage-decrease). What to do about them depends on the scenario(s) that are causing loss of coverage. Below are approaches to coverage check failures.

### Merge or rebase from main

A common cause of failure is simply that the branch is out of date. Rebase or merge from main and try again.

### Write tests

Often, changes to the codebase should be tested. If coverage checks are failing and there is no good reason for coverage to decrease, write tests for your code.

### "The Happo Approach"

If your changes include scenario(s) where code coverage does not need to increase -- deleting better-covered code than the baseline, or adding code that may not need to be tested -- coverage checks can be ignored, at the PR reviewer's discretion. This is referred to as "the Happo approach," since the check is optional and a reviewer can decide to approve the PR even with the check failing, like the Happo checks.
