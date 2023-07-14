# Office Local client

1. Ensure that you have a test account which can log into the office site. To load test data, run:

   ```shell
   make db_dev_e2e_populate
   ```

1. Run

   ```shell
   make office_client_run
   ```

1. Log into "Local Sign In" and either select a pre-made user or use the button to create a new user
