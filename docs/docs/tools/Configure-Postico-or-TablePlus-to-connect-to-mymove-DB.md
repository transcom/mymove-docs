If you prefer to use an app to view and update the DB, [Postico](https://eggerapps.at/postico/) and [TablePlus](https://www.tableplus.io/) are popular options.

## Postico
- Cost: $40
- Free trial limitations:
  - At most 5 connection favorites
  - Only a single window per connection
  - Table filters are disabled
  - There is no time limit — use the trial as long as you want!

### Connect to mymove using Postico

1. Make sure the dev DB is up and running: `make server_run`
1. Launch Postico. It should prompt you for connection details.
2. Use the following settings:
  - Nickname: `mymove`
  - Host: `localhost`
  - Port: `5432`
  - User: `postgres`
  - Password: `mysecretpassword`
  - Database: `dev_db`
3. Click Connect. You should now be able to see all the tables.

## TablePlus
- Cost: $59
- Free trial limitations: 
  - 2 opened tabs
  - 2 opened windows
  - 2 advanced filters at a time