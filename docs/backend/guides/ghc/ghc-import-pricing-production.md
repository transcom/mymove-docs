---
sidebar_position: 8
---
# How data will be imported into production

:::caution Fix broken links

References to bad links.

:::

## Problem

[JIRA MB-1287](https://dp3.atlassian.net/browse/MB-1287)
We currently have a way to parse and import pricing information for the local dev database, we now need a way to import
pricing information into the production environment.

While the [story](https://dp3.atlassian.net/browse/MB-1287) as written emphasizes Solution 1 as a preferred solution  to achieve a production import, team infra
brought up a second option and accompanying considerations that should be weighed. Solution 2 will require some
collaboration and knowledge sharing about AWS infrastructure.

## Proposed Solution (Solution 1: Create a Secure Migration Script)
**JIRA STORIES**
* https://dp3.atlassian.net/browse/MB-2262
* https://dp3.atlassian.net/browse/MB-2300
* https://dp3.atlassian.net/browse/MB-2301

We’ve decided to proceed with using the secure migration route to get data into production.

In addition, future stories are to be planned to plan on automating more of the process, and incorporating
recommendations around creating a ECS scheduled task as an alternative to running a secure migration:

1. Versioning the table: we need a way to roll back the tables, potentially tied to the contract code of the upload.
    1. Write a design and research story to explore how we can version tables
    1. Write a story for implementing the solution above
1. Story to write and execute the scheduled task.

### Step 1:

Create a Go script that runs a pg-dump and generates a secure migration

Create a pg_dump from a script

Include a command from within a script to dump the contents of the table for use
in the migration. This would be written in Go rather than in psql. How this
might look can be found in the following examples [Go
Playground](https://play.golang.org/p/YxoXuET1XK) and [StackOverflow
Example](https://stackoverflow.com/questions/57089144/write-file-from-exec-command)

As reference the pg_dump in the terminal looks like:
```shell
pg_dump -h localhost -U postgres -W dev_db -t re_* --data-only -T re_services* --data-only > table_name_dump.pgsql
```

It includes parameters to dump several tables (`-t -T`) , using a [postgres pattern](https://www.postgresql.org/docs/current/app-psql.html#APP-PSQL-PATTERNS)
pointing to all tables that start with ‘re_’ and then exclude ‘re_services’, our solution written in Go should include these patterns.

**Pg_dump the golang way (include in the script)**

```go
cmd := exec.Command(
    "pg_dump",
    “-h”+DbHost,
    “-U"+DbUserName,
    DbName,
)

// Open the output file
outfile, err := os.Create(DbName + ".gz")
if err != nil {
    log.Fatal(err)
}
defer outfile.Close()

// Send stdout to the outfile. cmd.Stdout will take any io.Writer.
cmd.Stdout = outfile

// Start the command
If err cmd.Start(); err != nil {
    log.Fatal(err)
}

log.Print(“Waiting for command to finish…”)

// Wait for the command to finish.
If err = cmd.Wait(); err != nil {
    log.Fatal(err)
}
```

**Write script to generate a secure migration**

We’re following the route that involves writing a script, and we can model it after the following lines in the
[cac-migration script](https://github.com/transcom/mymove/blob/107872f9f6e7739f6b5d5efe988357b8fbe67192/cmd/milmove/gen_certs_migration.go#L199-L217).
From within the script, we will prompt the user to upload the migration to s3 as explained in [step 8](/docs/backend/setup/database-migrations.md#creating-secure-migrations)

```
log.Print(“Upload the migration to S3 with:upload-secure-migration <production_migration_file>”)
```
The command gets defined in `cmd/milmove/main.go` and list it
in [Creating a Migration](/docs/backend/setup/database-migrations.md#creating-migrations)

### Step 2:
Run the pricing parser and spot check results. Generate the migration for production.

**Run Importer**
```shell
rm bin/ghc-pricing-parser
make bin/ghc-pricing-parser
make db_dev_reset db_dev_migrate
ghc-pricing-parser --filename real_data_file_name.xlsx --contract-code TEST
```
After running the importer, verify the data https://github.com/transcom/mymove/blob/6f36e1fc63689c9852d8c6852340b4e61f4be6cf/docs/data/ghc-pricing-import.md#verifying-the-data

### Step 3:
Run the script defined in step 1, first in Experimental then Production.

### Solution 1 Pros and Cons

**Pros:**
* Handling human error: Developers on A-Team expressed concerns around solutions that put off identifying and addressing human errors that occur from the initial data import. For example, in the past developers have been able to catch missing and duplicate rows in spreadsheets received from USTC. Solutions that don’t put a human eye on the problem earlier in the process (i.e. during a local import) forego the opportunity to debug on the local level and push the problem solving to a more complicated space, production data.
* The Presence of UUIDs is incredibly helpful: By running a secure migration, we can debug and resolve errors by targeting corrective migrations to the records that is the source of the problem. The most direct source of this information is the unique key: UUID that is visible to us locally. Because there is no visibility with production data, we wouldn’t be able to leverage this.
* These migrations potentially will run so infrequently (< 1x per year) maintaining this as a manual developer task would likely be the best route.

**Cons:**
* A possible source of push back is the history of large migrations, and the persistence of inflated tables that past migrations attached to our production builds. Under the HHG system, tables of 1.5 million records were being created and slowed down production builds several orders of magnitude.
* Secure migrations are not free, while this data isn’t as large as the 1.5 million records we imported in the past, It is still going to add to the download that slows production builds.

## Other Options Considered

### Solution 2: Set up an ECS AWS Scheduled Task
Build an ECS scheduled task that grabs XLSX data from S3 buckets, parses and
runs a pg-dump and loads it asynchronously into the DB. This should automate
many steps a developer would do by hand, and if designed well, can allow a
developer to spot check the results of the parser, run the task locally before
data makes it into the Production environment.

:::info Interested in creating an ECS task from scratch?
Read our Confluence documentation on [How To Create a ECS Scheduled Task](https://dp3.atlassian.net/l/cp/merdf22s).
:::

A scheduled task runs daily, and turns off if there are no actions to take.
When the data changes (in our case for example, a new `xlsx` data set gets
uploaded) then the scheduled task should run. Our task is to design a way that
this process maintains debugging transparency and automation.

Thoughts: it’s supposedly not too difficult to automate some of the steps  and this path does allow for a human eye on the data before its moved into the production database

**`cmd/milmove-tasks`**: This directory should house two tasks that will 1. Run
the GHC pricing parser, and possibly output a text file that displays the
results of the import 2. A task to connect and import the data into the
database.

**Makefile**: where we’ll point to the scheduled tasks created in the
`cmd/milmove-tasks` directory. Make sure the target is named similar to the
scheduled task function you created.

#### Solution 2 Pros and Cons

**Pros:**
* Best option for avoiding the creation of enormous migrations that have historically caused production builds to take 10+ minutes
* This option allows us to separate out some load so we aren’t adding data that devs are downloading for production migrations.

**Cons:**
* We wont be able to use UUIDs to identify and target errors in the data import,
  since UUIDs are not visible in production data, and they are regenerated for
  all environments (prod UUIDs are different from dev-local or staging)
* This solution will take extra work to be designed in a way that allows for
  transparency around errors present in the `xlsx` imports, errors in the parser,
  and anything that can cause a failed database import.

## Reference
* [Original GDoc for this work](https://docs.google.com/document/d/1QVwY5uobUpz87WEeAXSnIXG0NE1o4YnFW0Lf7PnMqO0/edit#). This was quickly copied and leaving this here to double-check, if needed.
