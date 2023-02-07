# Test Data Generator

When creating new features, it is helpful to have sample data for the feature to interact with. The TSP Award Queue is an example of that--it matches shipments to TSPs, and it's hard to tell if it's working without some shipments and TSPs in the database!

- `make bin/generate-test-data` will build the fake data generator binary
- `bin/generate-test-data --named-scenario="dev_seed"` will populate the development database with a handful of users in various stages of progress along the flow. The emails are named accordingly (see [`devseed.go`](https://github.com/transcom/mymove/blob/main/pkg/testdatagen/scenario/devseed.go)). Alternatively, run `make db_dev_e2e_populate` to reset your db and populate it.
- `bin/generate-test-data` will run binary and create a preconfigured set of test data. To determine the data scenario you'd like to use, check out scenarios in the `testdatagen` package. Each scenario contains a description of what data will be created when the scenario is run. Pass the scenario in as a flag to the generate-test-data function. A sample command: `./bin/generate-test-data --scenario=2`.

There is also a package (`/pkg/testdatagen`) that can be imported to create arbitrary test data. This could be used in tests, so as not to duplicate functionality.

Currently, scenarios have the following numbers:

- `--scenario=1` for Award Queue Scenario 1
- `--scenario=2` for Award Queue Scenario 2
- `--scenario=3` for Duty Station Scenario
- `--scenario=4` for PPM or PPM SIT Estimate Scenario (can also use Rate Engine Scenarios for Estimates)
- `--scenario=5` for Rate Engine Scenario 1
- `--scenario=6` for Rate Engine Scenario 2
- `--scenario=7` for TSP test data
