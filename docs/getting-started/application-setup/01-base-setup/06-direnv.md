# Direnv

For managing local environment variables, we're using [direnv](https://direnv.net/).

1. Run

   ```shell
   direnv allow
   ```

   1. This will load up the `.envrc` file. It should complain that you have missing variables. We'll fix that next.

To fix the missing variables issue, you can do one of the following things:

- Let `direnv` get secret values with `chamber`. To enable this, run:

  ```shell
  cp .envrc.chamber.template .envrc.chamber
  ```

  :::note
  that this method does not work for users of the `fish` shell unless you replace `direnv allow` with

  ```shell
  direnv export fish | source
  ```

  :::

  :::note
  if you have a very poor internet connection, this method may be problematic to you.
  :::

- An alternative is to add a `.envrc.local` file. Then run:

  ```shell
  DISABLE_AWS_VAULT_WRAPPER=1 AWS_REGION=us-gov-west-1 aws-vault exec transcom-gov-dev -- chamber env app-devlocal >> .envrc.local
  ```

- If you don't have access to `chamber`, you can also run

  ```shell
  touch .envrc.local
  ```

  then add any values that the output from `direnv` asks you to define.

## Helpful variables for `.envrc.local`

- Increase concurrency of `golangci-lint`; defaults to 6 on dev machines and to 1 in CircleCI.

  ```shell
  export GOLANGCI_LINT_CONCURRENCY=8
  ```

- Enable go code debugging in goland

  ```shell
  export GOLAND=1
  ```

- Silence SQL logs locally; we default this to be true in `.envrc`

  ```shell
  export DB_DEBUG=0
  ```

## Troubleshooting direnv & chamber

Make sure you have the latest version of Chamber that supports the `env` command
option. You may run into the following error if the version of Chamber you have
installed does not support `env`. The error presents itself because of the
`chamber` commands that `direnv` runs as part of the `.envrc.*` files shown
above.

```shell
>_ cd mymove
direnv: loading .envrc.chamber
Error: unknown command "env" for "chamber"
Run 'chamber --help' for usage.
```
