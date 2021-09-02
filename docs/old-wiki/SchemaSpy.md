SchemaSpy is a tool that generates a visual representation of the database as a webpage you can navigate.

It makes it easier to view and understand the tables and fields and view their descriptions and relationships.

## What's In SchemaSpy

You can see descriptions of each table and field in the `Tables` tab. Here's an example of the `users` table. You can see the comments folder with a meaningful description of the field.

![sample image of users table in schemaspy](/img/schemaspy/users-schemaspy.png)

You can also see a diagram of the whole database model in the `Relationships` tab. This shows you how the tables are connection to each other in terms of foreign keys.

![sample image of db diagram](/img/schemaspy/diagram-schemaspy.png)

### What SchemaSpy Isn't

SchemaSpy does not let you edit anything about the database. It is not a database schema editor.

SchemaSpy also does not show you any data that's in the tables. It shows you the structure but not the contents of the database. So it's not mean to view or update any records.

## How to generate SchemaSpy

SchemaSpy is run as a command-line tool that generates a website.

- Checkout the MilMove [source repo](https://github.com/transcom/mymove) on your computer.
- Run `make schemaspy` to generate the html website.

   You should see the test database get reset and migrated again to ensure we have an up-to-date database from which to generate the SchemaSpy website.

   Finally you should see the following message:

   ```
   Schemaspy output can be found in ./tmp/schemaspy
   ```

- Navigate to the directory indicated above.

   Type `open index.html` and the SchemaSpy application should start running in your browser.

## How to view a pre-generated SchemaSpy

If you can't checkout the repo, you can view a pre-generated version that we have saved into google drive.

- Head to this [folder in Google drive](https://drive.google.com/drive/folders/1LNu-oqXZf748pK9iPP3xwS1GKSnu-t1G) to find the pre-generated zips.
- Download the most recent SchemaSpy ZIP file, with a title like `schemaspy_20210218.zip`.

- Unzip the file on your computer.

- Open the `schemaspy` directory that results from this in Finder.

- Find and double click `index.html`.

- Tada! 🎉 Your web browser should open up and the SchemaSpy application will be running in it!
