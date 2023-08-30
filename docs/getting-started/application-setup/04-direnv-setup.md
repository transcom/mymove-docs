# Direnv Setup

Now that you have the required dependencies installed (using [Homebrew](/docs/getting-started/application-setup/03-project-setup-homebrew-vs-nix/01-setup-homebrew.md) or [Nix](/docs/getting-started/application-setup/03-project-setup-homebrew-vs-nix/02-setup-nix.md)), it’s time to set up [direnv](https://direnv.net/), a tool we use to manage local environment variables.

Run the following command from the `mymove` directory:

```bash
direnv allow
```

This will load up the `.envrc` file. It should complain that you have missing variables. We’ll fix that next.

To fix the missing variables issue, run the following command to let `direnv` get secret values with `chamber` (which was installed when you ran `make prereqs` from the previous step):

```bash
cp .envrc.chamber.template .envrc.chamber
```

:::note
For users of the `fish` shell, replace `direnv allow` with `direnv export fish | source`.
:::

## Troubleshooting direnv and chamber

Make sure you have the latest version of Chamber that supports the `env` command option. You may run into the following error if the version of Chamber you have installed does not support `env`. The error presents itself because of the `chamber` commands that `direnv` runs as part of the `.envrc.*` files shown above.

```bash
~ % cd mymove
direnv: loading .envrc.chamber
Error: unknown command "env" for "chamber"
Run 'chamber --help' for usage.
```

## Optional: Helpful variables for `.envrc.local`

- Increase concurrency of `golangci-lint`; defaults to 6 on dev machines and to 1 in CircleCI:

    ```bash
    export GOLANGCI_LINT_CONCURRENCY=8
    ```

- Enable go code debugging in [GoLand](https://www.jetbrains.com/go/promo/):

    ```bash
    export GOLAND=1
    ```

- Silence SQL logs locally; we default this to be true in `.envrc`:

    ```bash
    export DB_DEBUG=0
    ```
