---
sidebar_position: 4
---

# How to Migrate the Database

If you need to change the database schema, you'll need to write a migration. These are the general steps you'll need to follow:

1. [Generate a new migration file](#creating-Migrations)
1. [Add the new SQL to the generated file](#writing-migrations)
1. [Set up your database](#setup)
1. [Run the migrations](#running-migrations)
1. [Update migrations locally](#update-migrations-locally)
1. Test your new migration

After your testing, if you find that you need to change your migration, you'll need to reset your DB (`make db_<env>_reset`) and rerun the migrations to make sure your updates are reflected in the local DB instance. 

Once you have completed your testing, push your changes up for review! You'll need a review from someone in the DB reviewers group, and if it's a secure migration, you'll need to test your changes on Experimental. Read [these instructions](https://dp3.atlassian.net/l/c/5G1P0dX0) to learn about deploying to Experimental.

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

This section covers what it's like to add a new table, though some information is helpful when editing existing 
tables/models as well.

For the examples in this section, we'll be adding a new model called `Pet`, with a corresponding table called `pets`.

:::note Table Name vs Model Name

Notice how the model name is singular, while the table name is pluralized. This is a convention of `Pop`, our ORM.
See the [conventions Pop follows](https://www.gobuffalo.io/en/docs/db/getting-started) for more info.

:::

1. [Generate a new migration file](#creating-migrations).
1. Open the generated SQL file and add the logic to create your table. When creating the SQL you may write the 
   migration like this:

    ```sql
    CREATE TYPE pet_type AS enum (
        'CAT',
        'DOG',
        'FISH',
        'GUINEA PIG',
        'HAMSTER',
        'OTHER',
        'RAT',
        'SNAKE',
        'TURTLE'
        );
    
    CREATE TABLE pets
    (
        id uuid PRIMARY KEY NOT NULL,
        created_at timestamp NOT NULL,
        updated_at timestamp NOT NULL,
        type pet_type NOT NULL,
        name text NOT NULL,
        birthday date,
        gotcha_day date,
        bio text,
        weight int
    );
    
    COMMENT on TABLE pets IS 'Store pets and their details.';
    COMMENT on COLUMN pets.type IS 'The type of pet this is. There are child models for certain types to hold more information specific to that type.';
    COMMENT on COLUMN pets.name IS 'The official name of a pet...nicknames might need their own table...';
    COMMENT on COLUMN pets.birthday IS 'Date the pet was born.';
    COMMENT on COLUMN pets.gotcha_day IS 'Date the pet was adopted. May be same as birthday.';
    COMMENT on COLUMN pets.bio IS 'Big text field for owners to tell you everything about their pet.';
    COMMENT on COLUMN pets.weight IS 'Current weight of the pet, or at least what they weighed the last time they let you weigh them.';
    ```

    Some things to note:

    1. The SQL keywords don't need to be capitalized, but it can be nice to differentiate some of them from certain 
       things like the field names or types.
    1. We create a `pet_type` `enum` to state the specific values that are allowed for our `pets.type` field. We'll see 
       in a bit how this maps to custom types in the model. 
    1. We want to add comments for the table itself and every column other than the `id`, `created_at`, and `updated_at`
       fields. This makes it easier for future folks to understand what the columns were meant for.
    1. You might see some migrations use `varchar` instead of `text`. It's the same thing in the end, see
       [Postgresql Character Types](https://www.postgresqltutorial.com/postgresql-char-varchar-text/) for more info.
    
1. Now you can create a new file in `pkg/models/` named after your new model. So for this, we'll have a new file 
    `pkg/models/pet.go` that will look something like this:

    ```go title="pkg/models/pet.go"
    package models
    
    import (
        "time"
		
        "github.com/gofrs/uuid"
    
        "github.com/transcom/mymove/pkg/unit"
    )
    
    type PetType string
    
    const (
        // PetTypeCat captures the enum value "CAT"
        PetTypeCat PetType = "CAT"
        // PetTypeDog captures the enum value "DOG"
        PetTypeDog PetType = "DOG"
        // PetTypeFish captures the enum value "FISH"
        PetTypeFish PetType = "FISH"
        // PetTypeGuineaPig captures the enum value "GUINEA_PIG"
        PetTypeGuineaPig PetType = "GUINEA_PIG"
        // PetTypeHamster captures the enum value "HAMSTER"
        PetTypeHamster PetType = "HAMSTER"
        // PetTypeOther captures the enum value "OTHER"
        PetTypeOther PetType = "OTHER"
        // PetTypeRat captures the enum value "RAT"
        PetTypeRat PetType = "RAT"
        // PetTypeSnake captures the enum value "SNAKE"
        PetTypeSnake PetType = "SNAKE"
        // PetTypeTurtle captures the enum value "TURTLE"
        PetTypeTurtle PetType = "TURTLE"
    )
    
    // Pet contains all the information relevant to a pet...
    type Pet struct {
        ID        uuid.UUID   `json:"id" db:"id"`
        CreatedAt time.Time   `json:"created_at" db:"created_at"`
        UpdatedAt time.Time   `json:"updated_at" db:"updated_at"`
        Type      PetType     `json:"type" db:"type"`
        Name      string      `json:"name" db:"name"`
        Birthday  *time.Time  `json:"birthday" db:"birthday"`
        GotchaDay *time.Time  `json:"gotcha_day" db:"gotcha_day"`
        Bio       *string     `json:"bio" db:"bio"`
        Weight    *unit.Pound `json:"weight" db:"weight"`
    }
   
    // TableName overrides the table name used by Pop.
    func (p Pet) TableName() string {
        return "pets"
    }
    
    // Pets is a list of Pets
    type Pets []Pet
    ```

   Some things to note:
    1. The field names here are pascal case, while in the struct tags, we use the snake case version. 
    1. Notice how we used `string` for `Name`, while we used `*string` for `Bio`. We have a loose convention around
       using pointers for optional (nullable) fields, and the concrete type for required fields.
        1. One important thing to note here is that this will affect patch requests if you want the API caller to be 
           able to make a request without passing in all the non-nullable fields each time. Some options which we use 
           for existing models:
            1. Make the field a pointer on the model. This means you will need to have validation somewhere though to
               ensure that we save a valid value to the DB in the end.
            1. Follow a pattern similar to the
               [PPM shipment updater](https://github.com/transcom/mymove/blob/088b87605f19b18b022ff718fcbd5eb8f6962585/pkg/services/ppmshipment/ppm_shipment_updater.go#L44-L49)
               which merges the new and old shipment _before_ validating the shipment.
    1. We define the plural `type`, `Pets` under the main struct as a slice of the type.
       1. You might see some models that don't follow this pattern, but generally we prefer to follow it so if you are
          adding a new table it's best to stick with this pattern.
    1. We define a custom `string` `type`, `PetType`, that constrains the valid values for `Pet.Type`. This maps to 
       the enum we created in the `sql` migration.
    
1. Now you will want to run the migration to test it out with `make db_dev_migrate`.

#### Example of Relationships

To showcase an example of a table with relationships, we can look at what it would look like to add a model `Cat` 
with corresponding table `cats`. This will be a child of the `Pet` model, so we'll use the corresponding field type 
and attributes. The steps for creating the table and model are the same as in the previous section so we'll just 
focus on what the files would look like in the end:

```sql
CREATE TABLE cats
(
    id uuid PRIMARY KEY NOT NULL,
    pet_id uuid NOT NULL
        CONSTRAINT cats_pets_id_fkey
        REFERENCES pets,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    likes_catnip bool,
    favorite_catnip_brand text,
    favorite_cat_scratcher_type text
);

COMMENT on TABLE cats IS 'Store cats and their details.';
COMMENT on COLUMN cats.likes_catnip IS 'Indicates whether the cat likes catnip or not.';
COMMENT on COLUMN cats.favorite_catnip_brand IS 'If the cat does like catnip, this will store the name of their favorite brand';
COMMENT on COLUMN cats.favorite_cat_scratcher_type IS 'Favorite type of cat scratcher, e.g. floor, wall, tower, etc.';
```

Things to note:

* We define the relationship between the two tables using the field `pet_id`
* `pet_id` has a type of `uuid` and is not nullable because for this relationship, we expect there to exist a row in 
  `pets` for every row in `cats`
* The `CONSTRAINT` name is something you choose. Name it something that quickly indicates what it is for, e.g. which 
  two tables are involved. 
* You point `pet_id` at the table it references, in our case, `pets`

```go title="pkg/models/cat.go"
package models

import (
    "time"

    "github.com/gofrs/uuid"
)

// Cat contains all the information relevant to a cat...
type Cat struct {
    ID                       uuid.UUID `json:"id" db:"id"`
    PetID                    uuid.UUID `json:"pet_id" db:"pet_id"`
    Pet                      Pet       `belongs_to:"pets" fk_id:"pet_id"`
    CreatedAt                time.Time `json:"created_at" db:"created_at"`
    UpdatedAt                time.Time `json:"updated_at" db:"updated_at"`
    LikesCatnip              *bool     `json:"likes_catnip" db:"likes_catnip"`
    FavoriteCatnipBrand      *string   `json:"favorite_catnip_brand" db:"favorite_catnip_brand"`
    FavoriteCatScratcherType *string   `json:"favorite_cat_scratcher_type" db:"favorite_cat_scratcher_type"`
}

// TableName overrides the table name used by Pop.
func (c Cat) TableName() string {
    return "cats"
}

// Cats is a list of Cats
type Cats []Cat
```

Things to note:

* We have the `PetID` that corresponds to the `pet_id` field we defined in the migration.
* We have a separate field, `Pet`, that will store the data for the related model. 
  * So for example, if you want access to the name of the pet, and you have an instance of a `Cat`, `originalCat`, 
    then you could access the name using `originalCat.Pet.Name`
  * This field doesn't have a corresponding field on the table or in the migration. It is something that is entirely 
    for ease of access and something which `Pop` (our ORM) understands. Note that this field being here doesn't mean 
    the data is automatically loaded whenever you fetch a `cat` row from the database; your query will need to do 
    the necessary joins to get the related record back.
  * In the `struct` tags, we define that this field belongs to the `pets` table and that the `fk_id` (foreign key ID)
    is the `pet_id` field on the `cats` table.

We'll also want to update our `Pet` model to point back at our `Cat` model:

```go title="pkg/models/pet.go" {24}
package models

import (
    "time"

    "github.com/gofrs/uuid"

    "github.com/transcom/mymove/pkg/unit"
)

// PetType omitted for brevity

// Pet contains all the information relevant to a pet...
type Pet struct {
    ID        uuid.UUID   `json:"id" db:"id"`
    CreatedAt time.Time   `json:"created_at" db:"created_at"`
    UpdatedAt time.Time   `json:"updated_at" db:"updated_at"`
    Type      PetType     `json:"type" db:"type"`
    Name      string      `json:"name" db:"name"`
    Birthday  *time.Time  `json:"birthday" db:"birthday"`
    GotchaDay *time.Time  `json:"gotcha_day" db:"gotcha_day"`
    Bio       *string     `json:"bio" db:"bio"`
    Weight    *unit.Pound `json:"weight" db:"weight"`
    Cat       *Cat        `has_one:"cats" fk_id:"pet_id"`
}

// TableName overrides the table name used by Pop.
func (p Pet) TableName() string {
    return "pets"
}

// Pets is a list of Pets
type Pets []Pet
```

Note that this is similar to the `Pet` field on the `Cat` model in that it is purely a nice feature that `Pop` lets 
us use to more easily go across relationships.

#### TableName method

[Pop's `TableName` method](https://gobuffalo.io/documentation/database/models/#using-a-custom-table-name) above is
technically optional. If you don't include it, Pop will attempt to guess the table  name by parsing the model's name
into words separated by underscores and then making that plural. However, in practice we've found that algorithm does
not work the way we would like with acronyms (like `PPMShipment`) or with some  attempts at pluralization (since
pluralization can be complicated). So, we require a `TableName` method on quite a few models. Rather than put
`TableName` on selected models and rely on Pop's automatic table name determination for the others, we now include
`TableName` on *all* models for consistency and resiliency to future changes in the table name algorithm.

Also, note this about the `TableName` method per
[Pop's documentation](https://gobuffalo.io/documentation/database/models/#using-a-custom-table-name):
>It is recommended to use a value receiver over a pointer receiver if the struct is used as a value anywhere in the code.

We have run into problems using a pointer receiver for `TableName`, perhpas due to the fact that Pop often treats
models internally as type `interface{}` in its algorithms, and an
[interface doesn't play well with pointer receivers](https://stackoverflow.com/questions/40823315/x-does-not-implement-y-method-has-a-pointer-receiver).

## Running Migrations

Migrations are run by the `milmove migrate` command. This allows us to leverage different authentication methods for migrations in development and in production using the same code. To migrate you should use a command based on your DB:

- `make db_dev_migrate`
- `make db_test_migrate`
- `make db_deployed_migrations_migrate`

The reason to use a `make` target is because it will correctly set the migration flag variables and target the correct database with environment variables.

## Update Migrations Locally

In the event that you need to make an edit to a migration that you have just created prior to merging it into the main branch, 
you can update the migration with your edits and rerun it using: 

```sh
make db_dev_reset db_dev_migrate
``` 

This command will reset the database and re-add all migrations, including your updated one. Double check that you see 
the database changes after making your edits and running the `make` commands. 

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

1. Edit the production migration (`tmp/<migration_name>`) first, and put whatever sensitive data in it that you need to.
1. Copy the production migration into the local test migration (`migrations/app/secure/<migration_name>`).
1. Scrub the test migration of sensitive data, but use it to test the gist of the production migration operation.
1. Test the local secure migration by running:
    ```shell
    make db_dev_migrate
    ```
    You should see it run your new secure migration (with non-sensitive data).

1. Then verify the secure migration with sensitive data works by running:
    ```shell
    psql-deployed-migrations< tmp/<migration_name>
    ```
    Use the full filename for the `<migration_name` above, including the prepending time stamp and file extensions.
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

1. Similar to the "Upload the migration" step above, run `ENVIRONMENTS="stg" upload-secure-migration tmp/<production_migration_file>` where `ENVIRONMENTS` is a quoted list of all the environments you wish to upload to. The default is `"demo exp stg prd loadtest"` but you can just do staging and production with `ENVIRONMENTS="stg prd"`. You will be asked if you're ready to upload your new migration and can enter `y`. You will then be prompted to delete your `tmp/<production_migration_file>` and should do so.

1. Check that it is listed in the S3 staging secure-migrations folder. For GovCloud account that would be `DISABLE_AWS_VAULT_WRAPPER=1 AWS_PROFILE=transcom-gov-id AWS_REGION=us-gov-west-1 aws-vault exec transcom-gov-milmove-stg -- aws s3 ls s3://transcom-gov-milmove-stg-app-us-gov-west-1/secure-migrations/`.

1. Check that it is NOT listed in the S3 production folder. GovCloud: `DISABLE_AWS_VAULT_WRAPPER=1 AWS_PROFILE=transcom-gov-id AWS_REGION=us-gov-west-1 aws-vault exec transcom-gov-milmove-prd -- aws s3 ls s3://transcom-gov-milmove-prd-app-us-gov-west-1/secure-migrations/`.

1. Create an empty file of the same name as your migration and upload that file to the prd, exp, demo, and loadtest environments: `ENVIRONMENTS="exp prd demo loadtest" upload-secure-migration <empty_migration_file_with_same_name>`. You can delete that file when you are finished.

1. To verify upload and that the migration can be applied use the make target corresponding to your environment:
    - `make run_prd_migrations`
    - `make run_stg_migrations`
    - `make run_exp_migrations`
    - `make run_demo_migrations`
    - `make run_loadtest_migrations`

### How Secure Migrations Work

When migrations are run the `$MIGRATION_MANIFEST` will be checked against files inside the paths listed in
`$MIGRATION_PATH` (a semicolon separated list of local `file://` or AWS S3 `s3://` paths). The migration code
will then run each migration listed in the manifest in order of the Version (which is typically a time stamp
at the front of a file).

- Look at `$MIGRATION_MANIFEST` to determine list of migrations to run (anything not listed will not be run, anything listed but missing will throw an error)
- Look at `$MIGRATION_PATH` to find files locally or in AWS S3. See the `Makefile` for examples.
- If the file is to be found on S3, it is streamed directly into memory instead of downloading.
- If it is to be found locally, the script looks for it in the listed path.

There is an example of local secure migrations [in the repo](https://github.com/transcom/mymove/blob/main/migrations/app/secure).

### Downloading Secure Migrations

**NOTE:** Be careful with downloading secure migrations. They often contain sensitive input and should be treated with care. When you are done with these secure migrations please delete them from your computer.

You may need to download and inspect secure migrations. Or perhaps you need to correct a file you uploaded by mistake. Here is how you download the secure migrations:

- Download the migration to S3 with: `download-secure-migration <production_migration_file>`. You can also use the `ENVIRONMENTS` environment variable to specify one or more than one environment (exp, stg, prd, demo, loadtest).
- This will put files in `./tmp/secure_migrations/${environment}`.

You can now inspect or modify and re-upload those files as needed. Running the script will look like this:

```bash
ENVIRONMENTS="exp stg prd demo loadtest" download-secure-migration 20200911161101_secure_migration.up.sql

Downloading from: exp
download: s3://transcom-gov-milmove-exp-app-us-gov-west-1/secure-migrations/20200911161101_secure_migration.up.sql to ./tmp/secure_migrations/exp/20200911161101_secure_migration.up.sql
Downloading from: stg
download: s3://transcom-gov-milmove-stg-app-us-gov-west-1/secure-migrations/20200911161101_secure_migration.up.sql to ./tmp/secure_migrations/stg/20200911161101_secure_migration.up.sql
Downloading from: prd
.download: s3://transcom-gov-milmove-prd-app-us-gov-west-1/secure-migrations/20200911161101_secure_migration.up.sql to ./tmp/secure_migrations/prd/20200911161101_secure_migration.up.sql
Downloading from: demo
.download: s3://transcom-gov-milmove-demo-app-us-gov-west-1/secure-migrations/20200911161101_secure_migration.up.sql to ./tmp/secure_migrations/demo/20200911161101_secure_migration.up.sql
Downloading from: loadtest
.download: s3://transcom-gov-milmove-loadtest-app-us-gov-west-1/secure-migrations/20200911161101_secure_migration.up.sql to ./tmp/secure_migrations/loadtest/20200911161101_secure_migration.up.sql

Files have been downloaded to these locations:

./tmp/secure_migrations/prd/20200911161101_secure_migration.up.sql
./tmp/secure_migrations/exp/20200911161101_secure_migration.up.sql
./tmp/secure_migrations/stg/20200911161101_secure_migration.up.sql
./tmp/secure_migrations/demo/20200911161101_secure_migration.up.sql
./tmp/secure_migrations/loadtest/20200911161101_secure_migration.up.sql

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
1. Write to both columns
1. Backfill data from the old column to the new column
1. Move reads from the old column to the new column
1. Stop writing to the old column
1. Drop the old column

Similarly, if a column needs to be dropped, we should deprecate the column in one pull request and then actually remove it in a follow-up pull request. Deprecation can be done by renaming the column to `deprecated_column_name`. This process has an added side affect of helping us keep our migrations reversible, since columns can always be re-added, but getting old data back into those columns is a more difficult process.
