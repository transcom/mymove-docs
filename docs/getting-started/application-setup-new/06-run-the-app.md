# Run the App

## Run the App as a Service Member

We’re almost there! Just follow these last steps, and you’ll be having `mymove` running locally on your machine as a service member:

1. Make sure Docker is up and running.
2. Run the backend server:

```bash
make server_run
```

This command also ensures the database is up and running and that the latest migrations are applied.

3. Run the frontend client in a separate terminal tab:

```bash
make client_run
```

This will ensure the frontend dependencies are installed and will automatically open the app in the browser at `milmovelocal:3000`.

Once the app opens, select “Local Sign In” to easily create a new user or login as an existing user, without having to create a [Login.gov](http://Login.gov) account (which is how you’d normally sign in on non-dev environments).

That’s it! Congrats, you now have `mymove` running locally 🎉

![app as service member](/img/run_app/app_service_member.png)

## Run the App as an Admin

In the previous step, you were able to open the `mymove` app and login as a service member.

Run the following command to open the local admin view at `adminlocal:3000`, which lets you do things like create new office users, service members, moves, and orders.

```bash
make admin_client_run
```

![app as admin](/img/run_app/app_admin.png)

## Run the App as an Office Worker

Now that you can login as a service member and an admin, let's login locally as an office worker.

First, ensure that you have a test account which can log into the office site. To load test data, run:

```bash
make db_dev_e2e_populate
```

Then run the following command to open the local office view at `officelocal:3000`:

```bash
make office_client_run
```

Log into “Local Sign In” and either select a pre-made user or create a new one.

![app as office worker](/img/run_app/app_office_worker.png)
