---
sidebar_position: 4
---
# Local Load Test Setup

This will cover local setup necessary to run `locust` locally. The instructions vary depending on which server you are
targeting.

## Setup To Run Against A Local MyMove Server

### Local MyMove Server

You will need to check out and set up the [MilMove](https://github.com/transcom/mymove) project.

Follow the setup instructions in the `mymove` README, all the way through running the local server (`make server_run`).
You don't need to run the user interface in order to run load tests (so you can skip the `make client_run` step), unless
you would like to be able to log in and look at data using the `mymove` UI.

### Local Server Data

Our goal is to eventually have all the data we need set up by the load tests, but until that's done, you should populate
the `mymove` server with data using this command (in the `mymove` repo directory):

```shell
make db_dev_e2e_populate  ## populates the development database with test data
```

## Setup To Run Against The Load Test Environment MyMove Server

To load test against the API in the load test environment, you will need to install and set up `direnv`, `chamber`, and
`aws-vault`. If you have already set up these tools in order to run the `mymove` project, you do not need to repeat 
these steps. Otherwise, please follow the instructions in the `mymove` repo to complete this setup:

* [Setup: AWS Services](https://github.com/transcom/mymove#setup-aws-services-optional)
* [Setup: `direnv` and `chamber`](https://github.com/transcom/mymove#setup-direnv)

Now in the load test repo, run the following:

```shell
cp .envrc.chamber.template .envrc.chamber
```

```shell
direnv allow
```

Once you have loaded the secrets from `chamber`, which will include the `dp3` certificate and private key, you may run 
your load tests using `dp3` as the host value.