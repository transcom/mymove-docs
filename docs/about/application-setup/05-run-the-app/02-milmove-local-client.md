# MilMove Local Client

Commands in this section:

```shell
make client_build
```

and

```shell
make client_run
```

These will start the webpack dev server, serving the frontend on port 3000. If paired with

```shell
make server_run
```

then the whole app will work, the webpack dev server proxies all API calls through to the server.

If both the server and client are running, you should be able to view the Swagger UI at
<http://milmovelocal:3000/swagger-ui/internal.html>. If it does not, try running

```shell
make client_build
```

(this only needs to be run the first time).

Dependencies are managed by `yarn`. To add a new dependency, use

```shell
yarn add
```
