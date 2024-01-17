# Database

:::caution
Read [Querying the Database Safely](https://transcom.github.io/mymove-docs/docs/dev/contributing/backend/Backend-Programming-Guide/#querying-the-database-safely) to prevent SQL injections!
:::

A few commands exist for starting and stopping the DB docker container:

- `make db_run`: Starts the DB docker container if one doesn't already exist
- `make db_destroy`: Stops and removes the DB docker container

## Dev DB Commands

There are a few handy targets in the Makefile to help you interact with the dev
database. During your day-to-day, the only one you will typically need regularly
is `make db_dev_e2e_populate`. The others are for reference, or if something
goes wrong.

- `make db_dev_e2e_populate`: Populates the dev DB with data to facilitate
  verification of your work when using the app locally. It seeds the DB with various
  service members at different stages of the onboarding process, various office
  users, moves, payment requests, etc. The data is defined in the `devseed.go` file.
- `make db_dev_run`: Initializes a new database if it does not exist and runs it,
  or starts the previously initialized Docker container if it has been stopped.
  You typically only need this after a computer restart, or if you manually quit
  Docker or otherwise stopped the DB.
- `make db_dev_create`: Waits to connect to the DB and will create a DB if one
  doesn't already exist (this is automatically run as part of `db_dev_run`).
- `make db_dev_fresh`: Destroys your database container, runs the DB, and
  applies the migrations. Useful if you want to start from scratch when the DB is
  not working properly. This runs `db_dev_reset` and `db_dev_migrate`.
- `make db_dev_migrate_standalone`: Applies database migrations against your
  running database container but will not check for server dependencies first.

## Test DB Commands

These commands are available for the Test DB. You will rarely need to use these
individually since the commands to run tests already set up the test DB properly.
One exception is `make db_test_run`, which you'll need to run after restarting
your computer.

- `make db_test_run`
- `make db_test_create`
- `make db_test_reset`
- `make db_test_migrate`
- `make db_test_migrate_standalone`
- `make db_test_e2e_backup`
- `make db_test_e2e_restore`
- `make db_test_e2e_cleanup`

The test DB commands all talk to the DB over localhost. But in a docker-only environment (like CircleCI) you may not be able to use those commands, which is why `*_docker` versions exist for all of them:

- `make db_test_run_docker`
- `make db_test_create_docker`
- `make db_test_reset_docker`
- `make db_test_migrate_docker`

## Migrations

To add new regular and/or secure migrations, see the [database development guide](https://transcom.github.io/mymove-docs/docs/dev/contributing/database/Database-Migrations)

Running migrations in local development:

Use `make db_dev_migrate` to run migrations against your local dev environment.

Running migrations on Staging / Production:

Migrations are run automatically by CircleCI as part of the standard deploy process.

1. CircleCI builds and registers a container.
1. CircleCI deploys this container to ECS and runs it as a one-off 'task'.
1. The container downloads and execute migrations against the environment's database.
1. If migrations fail, CircleCI fails the deploy.
1. If migrations pass, CircleCI continues with the deploy.
