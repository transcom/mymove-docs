# Server

This step installs dependencies, then builds and runs the server using `gin`, which is a hot reloading go server.
It will listen on port `8080` and will rebuild the actual server any time a go file changes.

```shell
make server_run
```

To have hot reloading of the entire application (at least for the customer side), pair the above with

```shell
make client_run
```

In rare cases, you may want to run the server standalone, in which case you can run

```shell
make server_run_standalone
```

This will build both the client and the server and this invocation can be relied upon to be serving the client JS on
its own rather than relying on webpack doing so. You can run this without running `make client_run` and the whole app
should work.

## Server Dependencies

Dependencies are managed by [go modules](https://github.com/golang/go/wiki/Modules). New dependencies are automatically
detected in import statements and added to `go.mod` when you run

```shell
go build
```

or

```shell
go run
```

You can also manually edit `go.mod` as needed.

If you need to add a Go-based tool dependency that is otherwise not imported by our code, import it in
`pkg/tools/tools.go`.

After importing _any_ go dependency it's a good practice to run

```shell
go mod tidy
```

which prunes unused dependencies and calculates dependency requirements for all possible system architectures.
