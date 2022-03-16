---
sidebar_position: 3
---

# How to Test the Prime API

> ❗ For the most up-to-date information about the Prime API, please visit https://github.com/transcom/prime_api_deliverable/wiki. The Prime API Deliverable wiki is the client-facing documentation and will be your best resource for understanding how to use this API. This article is a stub that has been kept to preserve some of the old information that might be useful for current MilMove developers.

## Getting Started

The docker instructions are useful to external users. Internal users, with the dev environment set up, can skip straight to [Testing Locally](#testing-locally) or [Testing on Staging or Experimental](#testing-on-staging-or-experimental).

Those do not have a local dev environment can use the docker instead. Follow [these instructions](https://github.com/transcom/prime_api_deliverable/wiki/Getting-Started) to set up the Prime API for testing.

### Running the Prime Docker

Once you have completed the set up instructions, you can run the Prime Docker:

```bash
make run_prime_docker
```

Once you have completed your testing, remember to shut down the server:

```bash
make docker_compose_down
```

### Accessing Web Applications

To access the the MilMove, Office, and Prime local domains during testing, you may also want to modify your `/etc/hosts` file to contain the following:

```
  echo "127.0.0.1 primelocal" | sudo tee -a /etc/hosts
  echo "127.0.0.1 officelocal" | sudo tee -a /etc/hosts
  echo "127.0.0.1 milmovelocal" | sudo tee -a /etc/hosts
```

Once you have modified the hosts file, and while the Prime docker container is running, you should be able to access the different web applications:

* [MilMove](http://milmovelocal:4000/)
* [Office](http://officelocal:4000/)

After the page loads in for either url, on the top right, you should be able to see a link for "Local Sign-In". This will show a list of users you can log in as. On the MilMove side, this will allow you to test as a service member at different stages within a move. Within the Office app, these different users represent different office user roles.

## Testing Locally

You must have data generated within your database and have the server running.

* If you are using the Prime Docker via `make run_prime_docker`, this has already been done for you.
* If you are not, please generate the data through `make db_dev_e2e_populate && server_run`.

To interact with the Prime API, we will use a CLI utility called `prime-api-client`. To get command line help:

* `go run ./cmd/prime-api-client --help` to see a list of all subcommands and common arguments/flags
* `go run ./cmd/prime-api-client <subcommand> --help` to see a list of specific arguments/flags for a subcommand

To run a command:

```bash
go run ./cmd/prime-api-client --insecure <subcommand> <additional_flags> | jq
```

## Testing on Staging or Experimental

You will first have to complete [these steps](https://github.com/transcom/mymove/wiki/use-mtls-with-cac) to create CAC access.

Additionally, those changes must be deployed to each environment. Merging to master will deploy to staging. But you need to explicitly deploy to experimental to get access there, otherwise you won't have access.

### DoD Certificates

You will need to download the DoD certificates to be able to access the Prime API in the deployed environments. Steps:

1. Go to this [military CAC website](https://militarycac.com/macnotes.htm#which_exact_CAC).
1. If you are a Safari or Chrome user, skip to step 5.
1. If you are a Firefox user, skip to step 5a.
1. Download the required files.
1. Confirm in Keychain on your Mac that you have all the certificates.
1. There will likely be a few certs that your Mac won't trust. You will need to manually enable `Always Trust` for these certificates.

### Running a Command

If testing on staging, run a command with the `api.stg.move.mil` hostname:

```bash
go run ./cmd/prime-api-client --cac --hostname api.stg.move.mil --port 443 <subcommand> | jq
```

If testing on experimental, run a command with the `api.exp.move.mil` hostname instead:

```bash
go run ./cmd/prime-api-client --cac --hostname api.exp.move.mil --port 443 <subcommand> | jq
```

You will be prompted to enter your CAC pin. This will be the same pin you created when picking up your CAC.

If you have trouble, you can [[troubleshoot CAC issues here|Troubleshoot-CAC-Reader-Issues]]

## Tips and Tricks

You've seen this at the beginning of each command:

```bash
go run ./cmd/prime-api-client
```

You can shorten it by doing the following:

```bash
rm -f bin/prime-api-client
make bin/prime-api-client
```

Then every time you see `go run ./cmd/prime-api-client`, you can replace it with simply `prime-api-client`. For example:

```bash
prime-api-client --insecure <subcommand>
```

### Using `curl`

You can also use `scripts/prime-api` to hit an endpoint in the Prime API. To do so, first save a JSON file with the body for the request, and then enter a command with the format:

```bash
prime-api <endpoint_path> <method> <filename.json>
```

For example:

```bash
prime-api payment-requests POST data.json
```

Note that this method for accessing the API is not actively being supported and may be less reliable than others (Postman or the Prime API Client CLI).

## References
* [Acceptance testing payment requests](/docs/backend/testing/acceptance-testing-payment-requests)
