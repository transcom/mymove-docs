# Troubleshooting

- Random problems may arise if you have old Docker containers running. Run `docker ps` and if you see containers unrelated to our app, consider stopping them.
- If you're having trouble accessing the API docs or the server is otherwise misbehaving, try stopping the server, running `make client_build`, and then running `make client_run` and `make server_run`.

## Postgres Issues

If you have problems connecting to PostgreSQL, or running related scripts, make sure you aren't already running a PostgreSQL daemon. You may see errors like:

```text
Migrator: problem creating schema migrations: couldn't start a new transaction: could not create new transaction: pq: role "postgres" does not exist
```

or

```text
Migrator: problem creating schema migrations: couldn't start a new transaction: could not create new transaction: pq: database "dev_db" does not exist
```

You can check this by typing `ps aux | grep postgres` or `brew services list` and looking for existing processes. In the case of homebrew you can run `brew services stop postgresql` to stop the service and prevent it from running at startup.

## Development Machine Timezone Issues

If you are experiencing problems like redux forms that are 'dirty' when they shouldn't be on your local environment, it may be due to a mismatch
of your local dev machine's timezone and the assumption of UTC made by the local database. A detailed example of this sort of issue can be found in
[this story](https://www.pivotaltracker.com/n/projects/2136865/stories/160975609). A workaround for this is to set the TZ environment variable
in Mac OS for the context of your running app. This can be done by adding the following to `.envrc.local`:

```bash
export TZ="UTC"
```

Doing so will set the timezone environment variable to UTC utilizing the same localized context as your other `.envrc.local` settings.

## Linters & Pre-commit Hooks

We use a number of linters for formatting, security and error checking. Please see the [pre-commit documentation](https://transcom.github.io/mymove-docs/docs/dev/contributing/code-analysis/run-pre-commit-hooks) for a list of linters and troubleshooting tips.
