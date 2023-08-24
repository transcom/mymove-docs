# Run the app

**If this is your very first time setting up this project, you'll need to launch Docker first, follow the prompts to allow macOS to open it, and agree to Docker's terms of service.**

You might also need to launch Docker if you restarted your computer and you configured Docker to not automatically launch after a restart.

Once Docker is up and running, the following commands will get `mymove` running on your machine.

1. Run the backend server

   ```shell
   make server_run
   ```

   This command also ensures the database is up and running and that the
   latest migrations are applied. See [Setup: Database](/docs/getting-started/application-setup/04-database.md) and
   [Setup: Server](/docs/getting-started/application-setup/05-run-the-app/01-server.md) for more details.

1. Run the frontend client **in a separate terminal tab**

   ```shell
   make client_run
   ```

   This will ensure the frontend dependencies are installed and will
   automatically launch the browser and open the app at milmovelocal:3000.
   See [Setup: MilMove Local Client](/docs/getting-started/application-setup/05-run-the-app/02-milmove-local-client.md) for more details.
