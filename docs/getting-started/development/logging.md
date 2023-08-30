# Logging

We are using [zap](https://github.com/uber-go/zap) as a logger in this project. We currently rely on its built-in `NewDevelopment()` and `NewProduction()` default configs, which are enabled in any of the executable packages that live in `cmd`.

This means that logging _is not_ set up from within models or other packages unless the files in `cmd` are also being loaded. _If you attempt to call `zap.L()` or `zap.S()` without a configured logger, nothing will appear on the screen._

If you need to see some output during the development process (say, for debugging purposes), it is best to use the standard lib `fmt` package to print to the screen. You will also need to pass `-v` to `go test` so that it prints all output, even from passing tests. The simplest way to do this is to run `go test` yourself by passing it which files to run, e.g. `go test pkg/models/* -v`.

## Log files

In development mode, logs from the `milmove` process are written to `logs/dev.log`.
