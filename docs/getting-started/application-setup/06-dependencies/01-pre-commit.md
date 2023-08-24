# Pre-Commit

Part of the `pre-commit` setup run by the `make deps` or `make deps_nix` commands.
They in turn run

```shell
pre-commit install
```

to install a pre-commit hook into `./git/hooks/pre-commit`. This must be done so
that the hook will check files you are about to commit to the repository.

Next it installs the `pre-commit` hook libraries with

```shell
pre-commit install-hooks
```

If you ever want to run the `pre-commit` hooks for all files, you can run

```shell
pre-commit run -a
```

though before you can do that, you'll need to have installed the `javascript` dependencies and generated some `golang`
code from Swagger files. Once you've finished setting up your project locally, you should be good to go. If you want
to skip ahead and be able to run `pre-commit` checks since now, you can run

```shell
make pre_commit_tests
```

or

```shell
make server_generate client_deps && pre-commit run -a
```

## Troubleshooting pre-commit issues

[Troubleshoot Precommit Hook Failures](/docs/backend/guides/troubleshoot-precommit-hook-failures.md)
