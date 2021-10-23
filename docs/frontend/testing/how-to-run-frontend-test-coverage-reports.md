---
sidebar_position: 2
---

# [WIP] How to run Frontend test coverage reports

By using Create React App, we have built-in coverage report testing for Jest (either Enzyme or React Testing Library). It's generated with tools called [Istanbul](https://istanbul.js.org/) and [lcov](http://ltp.sourceforge.net/coverage/lcov.php), which we also leverage for our Cypress integration tests coverage reports.

Currently, CircleCI is configured to run a Jest coverage report automatically as part of our build process.

## Getting started
To run either Jest or Cypress tests locally, the first step is to get your local server up and running. It doesn't matter which client is running.

```
make server_run
make office_client_run
make db_e2e_up
```

## Running a coverage report for unit tests
To create a report for the unit tests, run:
```
yarn test:coverage
```

Once the tests are completed, you have two options for viewing the reports, with different benefits.

The first is in your terminal. You'll see the report in a plain text table with a basic summary of information. 

The second option is a navigable GUI report with line by line coverage details. To view this, navigate to the `coverage/lcov-report` folder of your local MilMove project folder and open the `index.html` file in your browser.

This option allows you to view more detailed information and see inline context for uncovered or undercovered lines of code. 

The GUI option does need to be manually refreshed after each report run.


## Running a coverage report for integration tests
**Note: This functionality is dependent on our Cypress tests successfully running locally.**

To create a report for the integration tests in headless mode run:
```
yarn cypress:run-headless
```

To create a report for the integration tests in browser mode run:
```
yarn cypress:run
```
Then run all tests. You will see some coverage information in the browser mode test interface.



## [WIP] Running a combined report of both unit and integration tests

To create a report that covers all tests run:
```
yarn report:combined
```
