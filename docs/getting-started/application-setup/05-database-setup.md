# Database Setup

Run the following command to create and start a local PostgreSQL Docker container called `milmove-db-dev`, if it doesn’t exist already:

```bash
make db_dev_run
```

Next, run the following command to execute all existing database migrations for the dev database. You will run this command again anytime you add new migrations to the app:

```bash
make db_dev_migrate
```

Validate that your dev database is running:

```bash
psql-dev
```

This puts you in a PostgreSQL shell (`psql`). Here are some additional helpful commands you can run in `psql`:

| Command | Description |
| --- | --- |
| `\dt` | Shows all tables |
| `\d <table_name>` | Describes a specific table |
| `\q` | Exits `psql` shell |

## Troubleshooting Database Setup

If you're unable to connect to the database, make sure that the version of PostgreSQL installed locally is the same version used in Docker (check the [`DB_DOCKER_CONTAINER_IMAGE` variable in the Makefile](https://github.com/transcom/mymove/blob/main/Makefile#L7)).
