---
sidebar_position: 4
---

# How to Migrate the Database

If you need to change the database schema, you'll need to write a migration. These are the general steps you'll need to follow:

1. [Generate a new migration file](#Creating-Migrations)
2. [Add the new SQL to the generated file](#writing-migrations)
3. [Set up your database](#Setup)
4. [Run the migrations](#Running-Migrations)
5. [Rollback migrations locally](#Rollback-Migrations-Locally)
6. Test your new migration

After your testing, if you find that you need to change your migration, you'll need to reset your DB (`make db_<env>_reset`) and rerun the migrations to make sure your updates are reflected in the local DB instance. 

Once you have completed your testing, push your changes up for review! You'll need a review from someone in the DB reviewers group, and if it's a secure migration, you'll need to test your changes on Experimental. Read [[these instructions|deploy-to-experimental]] to learn about deploying to Experimental.

<!-- markdownlint-disable MD029 MD038 -->

## Understanding Migrations

Database migrations are SQL scripts that modify the state of the database (ie, the database schema). They are how we add and modify tables, columns, indexes, comments, and other aspects of our database. We also have migrations that insert constant data into our tables so that we will always have access to certain data values/records. 

These scripts are not living files like the rest of our source code. You can think of them as snapshots of the state of the DB over time. **In general, we should not update old migration files.** If you need to change something added in the past, create a new migration that overrides the old one instead. 

The MilMove migration files are located in the `migrations/app` directory. There are two subdirectories:

- `/schema`: the migrations that define the schema for our DB. This is most likely where you'll be working.
- `/secure`: these migrations are adding or modifying sensitive data in the DB. CAC credentials, for example, will be in this directory. You will need to follow special instructions if you are working with these files. 

The `migrations_manifest.txt` file contains a list of all of the migrations in both `schema` and `secure`. This file is what tells the database which scripts to run when we call the `migrate` command. It will be updated automatically as part of the process of generating a new migration - you will likely never need to make manual updates to this file.

## Setup

Before running any of the commands listed here locally, make sure the DB is up and running:

```console
make db_dev_run
```

and/or

```console
make db_test_run
```

To reset the database, use:

```console
make db_dev_reset
make db_test_reset
```

These commands will tear down the existing instance of the database and rebuild a new version. This is useful when you're testing new migrations and you don't want to go through the pain of reverting and reapplying a migration whenever you make an update. Instead, you can start fresh and apply the updated migrations from scratch.

## Creating Migrations

To generate a new migration file, use: 

```sh
milmove gen migration -n <migration_name>
``` 

where `<migration_name>` is a brief description of the action being performed. The name must be in snake case, such as `add_status_to_moves`. This will create a placeholder migration and add it to the manifest.

### `milmove gen` command

There are other subcommands for `milmove gen` that you can leverage to generate models and migrations. To see a list of available subcommands,
run `milmove gen`. To run a specific subcommand, use the syntax `milmove gen <subcommand>`. The subcommands include:

- `migration`: creates a generic migration for you to populate. **This is most likely the one you want to use.**
- `disable-user-migration`: creates a migration for disabling a user given their e-mail address.
- `duty-stations-migration`: creates a migration to update duty stations given a CSV of duty station data.
- `certs-migration`: creates a migration to add a certificate for access to electronic orders and the prime api.

_NOTE: We **don't** use `down-migrations` to revert changes to the schema; any problems are to be fixed by a follow-up migration._

You can also run `update-migrations-manifest` to update the `migrations_manifest.txt` file. This is only necessary if you manually create a new migration file instead of using `milmove gen migration` to generate a new file. There's really no reason to manually create a file; just use `milmove gen`. 

### Writing migrations

When you are writing the code for your new migration, there are a few things you should keep in mind:

* **Please use SQL.** There are old instructions about using `fizz` to write migrations instead - **do not do this.**

* You must manually define all primary keys and indexes. There is nothing in Pop or SQL that will automatically make these for you. Failure to do so may break tools or lead to inefficiencies in the API implementations.

* [Avoid using `uuid_generate_v4()`](#why-we-avoid-uuid_generate_v4). Instead, please generate a valid UUID4 value using one of the following methods:
    * Get a valid UUID4 from [the Online UUID Generator](https://www.uuidgenerator.net/)
    * Use `python -c 'import uuid; print(str(uuid.uuid4()))'`
    * Use `brew install uuidgen; uuidgen`
   
    Never use the same UUID more than once. It should be unique across the whole database. 

* Follow best practices for ensuring [Zero-Downtime Deploys](#zero-downtime-migrations). Your migrations should create a database state that is compatible with the current version of the application code _and_ the new version of the application code.

### Adding a new table

If you are creating a new table, first generate a new migration file. When creating the SQL you may write the migration like this:

```sql
create table new_table
(
    id uuid
        constraint new_table_pkey primary key,
    column1 text not null,
    column2 text,
    created_at timestamp not null,
    updated_at timestamp not null
);
```

Then create a new models file in `pkg/models/` named after your new table. For this example, that would be `new_table.go`. The contents will look like:

```go
package models

import (
  "time"

  "github.com/gobuffalo/pop"
  "github.com/gobuffalo/validate"
  "github.com/gobuffalo/validate/validators"
  "github.com/gofrs/uuid"
)

// NewTable represents a new table
type NewTable struct {
  ID        uuid.UUID `json:"id" db:"id"`
  Column1   string    `json:"column1" db:"column1"`
  Column2   *string   `json:"column2" db:"colunn2"`
  CreatedAt time.Time `json:"created_at" db:"created_at"`
  UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// NewTables is not required by pop and may be deleted
type NewTables []NewTable

// Validate gets run every time you call a "pop.Validate*" (pop.ValidateAndSave, pop.ValidateAndCreate, pop.ValidateAndUpdate) method.
// This method is not required and may be deleted.
func (r *NewTable) Validate(tx *pop.Connection) (*validate.Errors, error) {
  return validate.Validate(
    &validators.StringIsPresent{Field: r.Column1, Name: "Column1"},
  ), nil
}
```

Now you will want to run the migration to test it out with `make db_dev_migrate` before making your PR.

## Running Migrations

Migrations are run by the `milmove migrate` command. This allows us to leverage different authentication methods for migrations in development and in production using the same code. To migrate you should use a command based on your DB:

- `make db_dev_migrate`
- `make db_test_migrate`
- `make db_deployed_migrations_migrate`

The reason to use a `make` target is because it will correctly set the migration flag variables and target the correct database with environment variables.

## Rollback Migrations Locally
In the event that you need to make an edit to a migration that you have just created prior to merging it into the main branch, 
you can undo the migration and add it back in after making your edits. To do this, follow these steps:

1. In the migrations manifest delete the line with your migration locally.
1. Rerun the migrations using: `make db_dev_reset db_dev_migrate` 
1. To add your updated migration again, re-add the file name to the manifest 
1. Run `make db_dev_migrate`

## Secure Migrations

> ❗️ **Before adding SSNs or other PII, please consult with Infra.**

We are piggy-backing on the migration system for importing static datasets. This approach causes problems if the data isn't public, as all of the migrations are in this open source repository. To address this, we have what are called "secure migrations."

### Creating Secure Migrations

1. Set up a local `deployed_migrations` database by running:
    ```shell
    make run_prd_migrations
    ```
    This will help you test the migration you are creating later.

1. Generate new migration files with `generate-secure-migration <migration_name>`. This creates two migration files:
   - a file in `migrations/app/secure` with no secret data. This one will be used to set up the dev db
   - a file in `tmp` which will be uploaded to S3 and contain sensitive data

1. Edit the production migration first, and put whatever sensitive data in it that you need to.
1. Copy the production migration into the local test migration.
1. Scrub the test migration of sensitive data, but use it to test the gist of the production migration operation.
1. Test the local secure migration by running:
    ```shell
    make db_dev_migrate
    ```
    You should see it run your new secure migration (with non-sensitive data).

1. Then verify the secure migration with sensitive data works by running:
    ```shell
    psql-deployed-migrations< tmp/$NAME_OF_YOUR_SECURE_MIGRATION
    ```
    This will load the sensitive data into the local `deployed_migrations` database.
    1. **NOTE:** This is not going to wrap the migration in a transaction. If it fails partway through, you'll need to clean it up or start fresh. If you do want to start fresh, you can:
        1. Comment out your secure migration in `migrations/app/migrations_manifest.txt`. Add a `# ` in front of it to comment it out.
        1. Then run:
            ```shell
            make run_prd_migrations
            ```
        1. Now you can re-run the `psql` line that is posted above.

1. If you are wanting to run a secure migration for a specific non-production environment, then [**skip to the next section**](#Secure-Migrations-for-One-Environment). Otherwise,
1. Upload the migration to S3 with:
    ```shell
    upload-secure-migration <production_migration_file>
    ```
    **NOTE:** For a single environment see [the next section](#Secure-Migrations-for-One-Environment).
1. Verify that the upload worked and the migration can be applied successfully by running:
    ```shell
    make run_prd_migrations
    ```
    1. If not, you can make changes and re-upload. It will overwrite the old files.
1. Once the migration is working properly, **delete the secure migration from your `tmp` directory** if you didn't delete it when the upload script prompted you in a previous step.
1. Open a pull request!
1. When the pull request merges, the production migrations will be run on Staging and Prod.

### Secure Migrations for One Environment

To run a secure migration on ONLY staging (or other chosen environment), upload the migration only to the S3 environment and blank files to the others. 

1. Similar to the "Upload the migration" step above, run `ENVIRONMENTS="stg" upload-secure-migration <production_migration_file>` where `ENVIRONMENTS` is a quoted list of all the environments you wish to upload to. The default is `"exp stg prd"` but you can just do staging and production with `ENVIRONMENTS="stg prd"`

1. Check that it is listed in the S3 staging secure-migrations folder. For GovCloud account that would be `DISABLE_AWS_VAULT_WRAPPER=1 AWS_PROFILE=transcom-gov-id AWS_REGION=us-gov-west-1 aws-vault exec transcom-gov-milmove-stg -- aws s3 ls s3://transcom-gov-milmove-stg-app-us-gov-west-1/secure-migrations/`.

1. Check that it is NOT listed in the S3 production folder. GovCloud: `DISABLE_AWS_VAULT_WRAPPER=1 AWS_PROFILE=transcom-gov-id AWS_REGION=us-gov-west-1 aws-vault exec transcom-gov-milmove-stg -- aws s3 ls s3://transcom-gov-milmove-prd-app-us-gov-west-1/secure-migrations/`.

1. Now upload empty files of the same name to the prd and exp environments: `ENVIRONMENTS="exp prd" upload-secure-migration <empty_migration_file_with_same_name>`

1. To verify upload and that the migration can be applied use the make target corresponding to your environment:
    - `make run_prd_migrations`
    - `make run_stg_migrations`
    - `make run_exp_migrations`

### How Secure Migrations Work

When migrations are run the `$MIGRATION_MANIFEST` will be checked against files inside the paths listed in
`$MIGRATION_PATH` (a semicolon separated list of local `file://` or AWS S3 `s3://` paths). The migration code
will then run each migration listed in the manifest in order of the Version (which is typically a time stamp
at the front of a file).

- Look at `$MIGRATION_MANIFEST` to determine list of migrations to run (anything not listed will not be run, anything listed but missing will throw an error)
- Look at `$MIGRATION_PATH` to find files locally or in AWS S3. See the `Makefile` for examples.
- If the file is to be found on S3, it is streamed directly into memory instead of downloading.
- If it is to be found locally, the script looks for it in the listed path.

There is an example of local secure migrations [in the repo](https://github.com/transcom/mymove/blob/master/migrations/app/secure).

### Downloading Secure Migrations

**NOTE:** Be careful with downloading secure migrations. They often contain sensitive input and should be treated with care. When you are done with these secure migrations please delete them from your computer.

You may need to download and inspect secure migrations. Or perhaps you need to correct a file you uploaded by mistake. Here is how you download the secure migrations:

- Download the migration to S3 with: `download-secure-migration <production_migration_file>`. You can also use the `ENVIRONMENTS` environment variable to specify one or more than one environment (exp, stg, prd).
- This will put files in `./tmp/secure_migrations/${environment}`.

You can now inspect or modify and re-upload those files as needed. Running the script will look like this:

```bash
download-secure-migration 20200911161101_secure_migration.up.sql

Downloading from: exp
download: s3://transcom-gov-milmove-exp-app-us-gov-west-1/secure-migrations/20200911161101_secure_migration.up.sql to ./tmp/secure_migrations/exp/20200911161101_secure_migration.up.sql
Downloading from: stg
download: s3://transcom-gov-milmove-stg-app-us-gov-west-1/secure-migrations/20200911161101_secure_migration.up.sql to ./tmp/secure_migrations/stg/20200911161101_secure_migration.up.sql
Downloading from: prd
.download: s3://transcom-gov-milmove-prd-app-us-gov-west-1/secure-migrations/20200911161101_secure_migration.up.sql to ./tmp/secure_migrations/prd/20200911161101_secure_migration.up.sql

Files have been downloaded to these locations:

./tmp/secure_migrations/prd/20200911161101_secure_migration.up.sql
./tmp/secure_migrations/exp/20200911161101_secure_migration.up.sql
./tmp/secure_migrations/stg/20200911161101_secure_migration.up.sql

Please remember to 'rm -rf ./tmp/secure_migrations' when you are finished working
```

## Notes

### Why we avoid `uuid_generate_v4()`

We avoid the use of `uuid_generate_v4()` for scripts that add data to the database (especially generating primary keys) because:

- It make running migrations multiple times end up with different results.
- It makes it hard to use primary keys generated this way as foreign keys in other migrations.
- It raises the remote possibility that a migration works in one system and fails in another.
- With specific UUIDs we were able to track down users in each system. When using `uuid_generate_v4()`, we have no way of telling what UUID people were assigned on remote machines so we lose the ability to identify them locally.

For more details see this [slack thread](https://ustcdp3.slack.com/archives/CP6PTUPQF/p1559840327095700)

### Zero-Downtime Migrations

As a good practice, all of our migrations should create a database state that works both with the current version of the application code _and_ the new version of the application code. This allows us to run migrations before the new app code is live without creating downtime for our users. More in-depth list of migrations that might cause issues are outlined in our [google drive](https://docs.google.com/document/d/1q-Ho5NINRPpsHQI-DjmLrDlzHsBh-hUc).

[strong-migrations](https://github.com/ankane/strong_migrations) is another great resource with detailed documentation and an exhaustive list of dangerous operations. The code examples are for Rails, but the same principles apply.

Eg: If we need to rename a column, doing a traditional rename would cause the app to fail if the database changes went live before the new application code (pointing to the new column name) went live. Instead, this should be done in [six steps[(https://github.com/ankane/strong_migrations#renaming-a-column), where each step gets deployed separately:

1. Create a new column
2. Write to both columns
3. Backfill data from the old column to the new column
4. Move reads from the old column to the new column
5. Stop writing to the old column
6. Drop the old column

Similarly, if a column needs to be dropped, we should deprecate the column in one pull request and then actually remove it in a follow-up pull request. Deprecation can be done by renaming the column to `deprecated_column_name`. This process has an added side affect of helping us keep our migrations reversible, since columns can always be re-added, but getting old data back into those columns is a more difficult process.
