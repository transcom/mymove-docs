# Prime API

The API that the Prime will use is authenticated via mutual TSL so there are a few things you need to do to interact
with it in a local environment.

1. Make sure that the `primelocal` alias is setup for localhost
   1. Check your `/etc/hosts` file for an entry for `primelocal`.
2. Run

   ```shell
   make server_run
   ```

3. Access the Prime API using the devlocal-mtls certs. There is a script that shows you how to do this with curl
   at `./scripts/prime-api`. For instance to call the `move-task-orders` endpoint, run

   ```shell
   ./scripts/prime-api move-task-orders
   ```
