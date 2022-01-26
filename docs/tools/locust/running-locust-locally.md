---
sidebar_position: 3
---
# Running Locust Locally

This section covers running `locust` locally, whether pointing at a local `mymove` server or the load test environment 
`mymove` server. We specify which we want to point at by defining the `host`. So if you want to run against the local
`mymove` server, you'll use `local`, while the load test env will use the `dp3` value. You can define the host either in
the UI in the appropriate field, or via the command line using the `--host` option, e.g. `--host local`.

You can invoke the `locust` command directly to run the load tests (either , or you can use some presets we
have defined in the `Makefile`.

## Setup

Follow the instructions in [Local Load Test Setup](./local-load-test-setup).

## Locust CLI

If you want more control over the parameters for a load test, you will need to invoke the `locust` command directly.
This will look something like:

```sh
locust -f <path_to_locustfile>.py --host <local/dp3>
```

Ex:

```sh
locust -f locustfiles/prime.py --host local
```

### Running Without The Web UI

To run the load tests without the web interface you will need to specify a few things that would otherwise have been 
input via the interface.

* Add the `--headless` tag to turn off the UI.
* Add the `-u` (or `--users`) option to specify the total number of users.
  * :::info
    Note that this option can also be used when running with the web UI and will serve as a starting value.
    :::
* Add the `-r` (or `--spawn-rate`) option to specify the number of users that should be added per
  second.
  * :::info
    Note that this option can also be used when running with the web UI and will serve as a starting value.
    :::
* Add the `-t` (or `--run-time`) option to specify how long the tests should run for, e.g. (300s,
  20m, 3h, 1h30m, etc.)

### Running With Tags

There are other options that can be useful such as:

* `-T` (or `--tags`) to specify which load tests to run based on their tags.
    * You can see a load test's tag by looking at the task definition and looking for `@tag("myTag")`
        * So in this case you would use `-T myTag`
* `-E` (or `--exclude-tags`) to specify which load tests to exclude based on their tags.

### Examples

The command will also take a list (or single one) of `User` classes at the end.

So a full command could look like:

* Running a subset of the prime load tests, with only the prime user, and without the UI:

    ```shell
    locust -f locustfiles/prime.py --host local --headless -u 1000 -r 50 -t 30s -T listMoves PrimeUser
    ```

* Starting the locust web UI with the host, number of users, and spawn rate pre-set for office load tests:

    ```shell
    locust -f locustfiles/office.py --host local -u 100 -r 2
    ```

### Resources

* You can see more information on the [locust running without the web UI docs](https://docs.locust.io/en/stable/running-without-web-ui.html#running-without-web-ui).
* For more CLI config options, refer to the [locust configuration docs](https://docs.locust.io/en/stable/configuration.html).

### Workflow Tags

There are several workflows defined as tags, so you can use those tags in the `locust` command as shown above. Listed
below are the available workflows tags to test.

Prime API Workflow Tags

* `hhgMove`
    * This workflow simulates how an HHG move would flow through the PrimeAPI. This workflow
      utilizes both PrimeAPI and SupportAPI tasks.
* `createMTOShipmentWorkflow`
    * This work flow tests the PrimeAPI create_mto_shipment endpoint. It creates or selects an
      existing move, then creates shipments on the selected move.

## Running Preset Load Tests

Default commands for each `locustfile` are available in the Makefile to make rerunning common preset tests easier. These
all use the UI and default to the `local` host (but the host can be changed in the UI). These commands include:

* Prime and Support API load tests - runs the load tests for `locustfiles/prime.py`:

  ```shell
  make load_test_prime
  ```

* Office/GHC API load tests - runs the load tests for `locustfiles/office.py`

  ```shell
  make load_test_office
  ```

* Customer/Internal API load tests - runs load tests for `locustfiles/milmove.py`

  ```shell
  make load_test_milmove
  ```

Each of these commands opens the Locust interface for initiating and monitoring the tests, set to 
<http://localhost:8089>. Using this interface, you can set the number of users to simulate, their spawn rate, and the 
host to target. Then start and stop the test at will.
