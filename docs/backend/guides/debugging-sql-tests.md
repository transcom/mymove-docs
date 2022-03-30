---
sidebar_position: 22
---

# Debugging SQL Tests

## Overview

Sometimes, when refactoring or changing code, you get an unexpected
sql error, like `sql: transaction has already been committed or rolled
back`. Below is one technique for figuring out what is going on.

## Database Setup

Each of our tests should run in a transaction, which means trying to
figure out the state of the database after the tests finish is hard
since it is reset. Each package runs its tests in a clone of the
database.

After you run `make server_test_setup`, you should see a docker
container running with the name `milmove-db-test`

```
$ docker docker ps -f name=milmove-db-test
```

You can connect to that docker container and see the databases.
Something like

```
$ docker exec -it milmove-db-test psql -U postgres -l
                                 List of databases
   Name    |  Owner   | Encoding |  Collate   |   Ctype    |   Access privileges
-----------+----------+----------+------------+------------+-----------------------
 postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 |
 template0 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
           |          |          |            |            | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
           |          |          |            |            | postgres=CTc/postgres
 test_db   | postgres | UTF8     | en_US.utf8 | en_US.utf8 |
(4 rows)
```

The `test_db` is the template database. Now, run your failing test
(and only your failing test).

Something like

```
$ go test ./pkg/handlers/internalapi/ -testify.m TestCancelMoveHandler
ok  	github.com/transcom/mymove/pkg/handlers/internalapi	0.929s
```

Now look at your databases again

```
docker exec -it milmove-db-test psql -U postgres -l
                                 List of databases
   Name    |  Owner   | Encoding |  Collate   |   Ctype    |   Access privileges
-----------+----------+----------+------------+------------+-----------------------
 postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 |
 template0 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
           |          |          |            |            | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
           |          |          |            |            | postgres=CTc/postgres
 test_db   | postgres | UTF8     | en_US.utf8 | en_US.utf8 |
 test_db_1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 |
(5 rows)
```

Note the `test_db_1` database, which is a clone of the pristine
`test_db` instance and is what is used for your test.

## Log All SQL Statements

Now, we are going to tell postgres to log every single SQL statement:

```
docker exec -it milmove-db-test psql -U postgres \
  -c "ALTER DATABASE test_db_1 SET log_statement = 'all'"
```

In one terminal window, let's watch the logs

```
$ docker logs -f milmove-db-test
...
2022-03-30 19:35:05.603 UTC [149] STATEMENT:  ALTER DATABASE test_db_1 SET log_statment = 'all'
```

Ok! Now we can run our test again (in another terminal window)

```
$ go test ./pkg/handlers/internalapi/ -testify.m TestCancelMoveHandler
ok  	github.com/transcom/mymove/pkg/handlers/internalapi	0.929s
```

You can see every single SQL statement!

If you want to try and figure out which SQL statement is being called
where, add something like ...

```go
    _, err = appCtx.DB().Store.Exec("SET LOCAL drew.foo = 'after function foo'")
	if err != nil {
      // return the error, abort, or something
      return err
    }
```

Now you can run your test again and look for that in the logs.

