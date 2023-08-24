---
id: database
---

# Database

You will need to setup a local database before you can begin working on the local server / client. Docker will need to
be running for any of this to work.

1. Creates a PostgreSQL docker container for dev, if it doesn't exist already, and starts/runs it.

   ```shell
   make db_dev_run
   ```

1. Runs all existing database migrations for dev database, which does things like creating table structures, etc.
   You will run this command again anytime you add new migrations to the app (see below for more).

   ```shell
   make db_dev_migrate
   ```

You can validate that your dev database is running by running

```shell
psql-dev
```

This puts you in a PostgreSQL shell. To show all the tables, type

```shell
\dt
```

If you want to exit out of the PostgreSQL shell, type

```shell
\q
```

If you are stuck on this step you may need to see the section on Troubleshooting.
