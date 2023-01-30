:::info
This is the migrated root README from the Transcom mymove repo. This is a living document that is being worked on.
:::

## Overview

Please check the [MilMove Development Documentation](https://transcom.github.io/mymove-docs/docs) for details on the project itself.

## Login.gov

You'll need accounts for login.gov and the login.gov sandbox. These will
require two-factor authentication, so have your second factor (one of: phone,
authentication app, security key, CAC) on hand. To create an account at
login.gov, use your regular `truss.works` email and follow [the official
instructions](https://login.gov/help/creating-an-account/how-to-create-an-account/).
To create an account in the sandbox, follow the same instructions, but [in the
sandbox server](https://idp.int.identitysandbox.gov/sign_up/enter_email). Do
_not_ use your regular email address in the sandbox.

### Creating alternative users with the same email address

You can use the plus sign `+` to create a new Truss email address.
`name+some_string@truss.works` will be treated as a new address, but will be
routed to your `name@truss.works` email automatically. Don't use this for the
office-side of account creation. It's helpful to use these types of accounts for
the customer-side accounts.

## Project Layout

All of our code is intermingled in the top level directory of `mymove`. Here is an explanation of what some of these
directories contain:

- `.circleci`: Directory for CircleCI CI/CD configuration
- `bin`: A location for tools compiled from the `cmd` directory
- `build`: The build output directory for the client. This is what the development server serves
- `cmd`: The location of main packages for any go binaries we build
- `config`: Config files for the database and AWS ECS. Also certificates.
- `cypress`: The integration test files for the [Cypress tool](https://www.cypress.io/)
- `docs`: A location for docs for the project. This is where ADRs are
- `internal`: Generated code for duty station loader
- `migrations`: Database migrations, see [./migrations/README.md]
- `node_modules`: Cached javascript dependencies for the client
- `pkg`: The location of all of our go code for the server and various tools
- `public`: The client's static resources
- `scripts`: A location for tools helpful for developing this project
- `src`: The react source code for the client
- `swagger`: The swagger definition files for each of our APIs

## Application Setup

Note: These instructions are a living document and often fall out-of-date.
If you run into anything that needs correcting or updating, please create
a PR with those changes to help those coming after you.

There are two main ways we have for setting up local development:

- Using `nix` with a bit of `homebrew`
- Using primarily only `homebrew`

Both need a bit of base setup before, but then you can follow whichever path you prefer after that. There are also a few parts that may be shared between both setups.

### Setup: Base Setup

There are a number of things you'll need at a minimum to be able to work with this project.

#### Homebrew

We use [Homebrew](https://brew.sh) to manage a few of the packages we need for this project.

Whether or not you already have Homebrew installed, you'll need to make sure it's
up to date and ready to brew:

```shell
SKIP_LOCAL=true /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/monfresh/fresh-brew/main/fresh-press)"
```

If you're using the Fish shell, run this command:

```shell
SKIP_LOCAL=true bash (curl -fsSL https://raw.githubusercontent.com/monfresh/fresh-brew/main/fresh-press | psub)
```

See the [monfresh/fresh-brew repo](https://github.com/monfresh/fresh-brew)
for more information.

#### Setup: Git

Use your work email when making commits to our repositories. The simplest path to correctness is setting global config:

```shell
git config --global user.email "trussel@truss.works"
```

```shell
git config --global user.name "Trusty Trussel"
```

If you drop the `--global` flag these settings will only apply to the current repo. If you ever re-clone that repo or
clone another repo, you will need to remember to set the local config again. You won't. Use the global config. :-)

For web-based Git operations, GitHub will use your primary email unless you choose "Keep my email address private".
If you don't want to set your work address as primary, please
[turn on the privacy setting](https://github.com/settings/emails).

Note if you want use HTTPS instead of SSH for working with git, since we want 2-factor-authentication enabled, you need
to [create a personal access token](https://gist.github.com/ateucher/4634038875263d10fb4817e5ad3d332f) and use that as
your password.

#### Setup: Project Checkout

You can checkout this repository by running

```shell
git clone git@github.com:transcom/mymove.git
```

Please check out the code in a directory like `~/Projects/mymove`. You can check the code out anywhere EXCEPT inside your `$GOPATH`. As an example:

```shell
mkdir -p ~/Projects && cd ~/Projects
```

```shell
git clone git@github.com:transcom/mymove.git
```

```shell
cd mymove
```

You will then find the code at `~/Projects/mymove`.

#### Setup: Editor Config

[EditorConfig](http://editorconfig.org/) allows us to manage editor configuration (like indent sizes) with a
[file](https://github.com/transcom/ppp/blob/main/.editorconfig) in the repo. Install the appropriate plugin in your
editor to take advantage of that if you wish.

### Setup: Nix

If you need help with this setup, you can ask for help in the
[Truss slack #code-nix channel](https://trussworks.slack.com/archives/C01KTH6HP7D).

1. [Initial Setup](#nix-initial-setup)
1. [Clean Up Local Env](#nix-clean-up-local-env)
1. [Install Dependencies](#nix-installing-dependencies)
1. [Add or Update Packages](#nix-add-or-update-packages)
1. [Run the app](#setup-run-the-app)

#### Nix: Initial Setup

1. First read the overview in the
   [Truss Engineering Playbook](https://github.com/trussworks/Engineering-Playbook/tree/main/developing/nix).
1. Follow the installation instructions in the playbook.

#### Nix: Clean Up Local Env

This section is only if you had previously set up any of these tools/packages. It is also optional, with the following
the caveat of this note:

:warning: NOTE: If you need any of the packages/tools for other things that you won't use `nix` for, you can set things
up so that they both work side by side, but you'll just have to set up your `PATH` properly. And even then, there may be
other steps necessary which aren't documented here.

1. Disable or uninstall `nodenv`, `asdf` or any other version switchers for `mymove`.

   1. `nodenv`:
      1. TLDR (disable only): remove `eval "$(nodenv init -)"` from `.zshrc` (or your shell's config file)
      1. Full instructions: [Uninstalling nodenv](https://github.com/nodenv/nodenv#uninstalling-nodenv)
   1. `asdf`:

      1. See [Remove asdf](https://asdf-vm.com/#/core-manage-asdf?id=remove)
      1. Remove setting of `GOPATH` and putting `GOPATH` in `PATH` in `.zshrc` (or your shell's config file). Looks
         something like this:

         ```shell
         export GOPATH=~/dev/go
         export PATH=$(go env GOPATH)/bin:$PATH
         ```

#### Nix: Installing Dependencies

1. Install a few MilMove dependencies:

   ```shell
   nix-env -i aws-vault chamber direnv bash
   ```

1. [Set up AWS services](#setup-aws-services)

1. Configure direnv:

   1. [Set up direnv](#setup-direnv)
   1. In `.zshrc` (or the relevant one for you), the `nix` setup line (inserted by the `nix` installation) needs to run
      before the `direnv` hook setup.

1. Run `./nix/update.sh`

   1. NOTE: If the nix dependencies change, you should see a warning from direnv:

   ```text
   direnv: WARNING: nix packages out of date. Run nix/update.sh
   ```

1. Run

   ```shell
   make deps_nix
   ```

   1. This will install some things like `pre-commit` hooks, `node_modules`, etc. You can see
      [Setup: Dependencies](#setup-dependencies) for more info on some of the parts.

#### Nix: Add Or Update Packages

First, you need to find the package you are looking for.

Visit [nix-package-search](https://ahobson.github.io/nix-package-search/#/search)

Search for a package, e.g. `go-`. The first time you search, it may be
slow and take almost a minute to get results, but it will be faster
after that.

When you see the version of the package you want, click on the eye
icon to unfold the settings.

Add or update the package to `nix/default.nix`

### Setup: Manual

1. [Set up AWS services](#setup-aws-services)
1. [Prerequisites](#manual-prerequisites)
1. [Set up direnv](#setup-direnv)
1. [Run the app](#setup-run-the-app)

#### Manual: Prerequisites

We have scripts that will install all the dependencies for you, as well as configure your shell file with all the required commands:

```shell
SKIP_CHECKS=true make prereqs
```

This will install everything listed in `Brewfile.local`, as well as Docker. (Depending on your machine's configuration, you may need to ensure that `go` is availble on the command line, and that `GOPATH` is a defined system variable. Running the script will output errors if this is the case.)

**Note**: The script might ask you for your macOS password at certain points, like when installing opensc, or when it needs to write to your `/etc/hosts` file.

Once this script is finished, quit and restart your terminal, then complete the
installation:

```shell
make deps
```

This will install `pre-commit` hooks and frontend client dependencies. See [Setup: Dependencies](#setup-dependencies) for more info.

**Note that installing and configuring pre-commit the first time takes about 3 minutes.**

Going forward, feel free to run `make prereqs` or `make deps` as often as you'd like to keep your system up to date. Whenever we update the app to a newer version of Go or Node, all you have to run is `make prereqs` and it will update everything for you.

### Setup: Shared

#### Setup: AWS Services

This project uses AWS services which means you'll need an account to work with parts of it. AWS credentials are managed
via `aws-vault`. Once you have received AWS credentials (which are provided by the infrastructure team), you can follow
these instructions to
[finish setting up AWS](https://dp3.atlassian.net/wiki/spaces/MT/pages/1250066433/0029+AWS+Organization+Authentication).

#### Setup: Direnv

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

  - **Note** that this method does not work for users of the `fish` shell unless you replace `direnv allow` with

    ```shell
    direnv export fish | source
    ```

  - **Note also** if you have a very poor internet connection, this method may be
    problematic to you.

- An alternative is to add a `.envrc.local` file. Then run:

  ```shell
  DISABLE_AWS_VAULT_WRAPPER=1 AWS_REGION=us-gov-west-1 aws-vault exec transcom-gov-dev -- chamber env app-devlocal >> .envrc.local
  ```

- If you don't have access to `chamber`, you can also run

  ```shell
  touch .envrc.local
  ```

  then add any values that the output from `direnv` asks you to define.

##### Helpful variables for `.envrc.local`

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

##### Troubleshooting direnv & chamber

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

#### Setup: Run the app

**If this is your very first time setting up this project, you'll need to launch Docker first, follow the prompts to allow macOS to open it, and agree to Docker's terms of service.**

You might also need to launch Docker if you restarted your computer and you configured Docker to not automatically launch after a restart.

Once Docker is up and running, the following commands will get `mymove` running on your machine.

1. Run the backend server

   ```shell
   make server_run
   ```

   This command also ensures the database is up and running and that the
   latest migrations are applied. See [Setup: Database](#setup-database) and
   [Setup: Server](#setup-server) for more details.

1. Run the frontend client **in a separate terminal tab**

   ```shell
   make client_run
   ```

   This will ensure the frontend dependencies are installed and will
   automatically launch the browser and open the app at milmovelocal:3000.
   See [Setup: MilMove Local Client](#setup-milmove-local-client) for more details.

#### Setup: Dependencies

This step will check your system for any setup issues. Then it will ensure that you have installed `pre-commit`
and go on to install the client (javascript) and server (golang) dependencies for you. If you are interested in
more details, you can look at the sections under this one, but it's not required.

##### Setup: Pre-Commit

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

###### Pre-Commit Troubleshooting (Manual): Process hanging on install hooks

If any pre-commit commands (or `make deps`) result in hanging or incomplete
installation, remove the pre-commit cache and the `.client_deps.stamp` and try again:

```shell
rm -rf ~/.cache/pre-commit
rm .client_deps.stamp
```

###### Pre-Commit Troubleshooting (Nix): SSL: CERTIFICATE VERIFY FAILED

This can happen because of the way certs need to be handled in this project and `nix`. To get around this issue, you
can try running:

```shell
NIX_SSL_CERT_FILE=$HOME/.nix-profile/etc/ssl/certs/ca-bundle.crt <pre-commit related command>
```

E.g.

```shell
NIX_SSL_CERT_FILE=$HOME/.nix-profile/etc/ssl/certs/ca-bundle.crt pre-commit install-hooks
```

##### Setup: Database

You will need to setup a local database before you can begin working on the local server / client. Docker will need to
be running for any of this to work.

1. Creates a PostgreSQL docker container for dev, if it doesn't exist already, and starts/runs it.

   ```shell
   make db_dev_run
   ```

1. Runs all existing database migrations for dev database, which does things like creating table structures, etc.
   You will run this command again anytime you add new migrations to the app (see below for more).

   ```shell
   make db_dev_migrate
   ```

You can validate that your dev database is running by running

```shell
psql-dev
```

This puts you in a PostgreSQL shell. To show all the tables, type

```shell
\dt
```

If you want to exit out of the PostgreSQL shell, type

```shell
\q
```

If you are stuck on this step you may need to see the section on Troubleshooting.

##### Setup: Server

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

###### Server Dependencies

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

##### Setup: MilMove Local Client

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

### Other Possible Setups

The instructions so far have been for getting the project up and running, but focused on the client/customer side.
There are more things you can set up in the following sections.

#### Setup: Office Local client

1. Ensure that you have a test account which can log into the office site. To load test data, run:

   ```shell
   make db_dev_e2e_populate
   ```

1. Run

   ```shell
   make office_client_run
   ```

1. Log into "Local Sign In" and either select a pre-made user or use the button to create a new user

#### Setup: Admin Local client

Run

```shell
make admin_client_run
```

#### Setup: Orders Gateway

Nothing to do.

#### Setup: Prime API

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

## Development

### GoLand

GoLand supports
[attaching the debugger to a running process](https://blog.jetbrains.com/go/2019/02/06/debugging-with-goland-getting-started/#debugging-a-running-application-on-the-local-machine),
however this requires that the server has been built with specific flags. If you wish to use this feature in
development add the following line `export GOLAND=1` to your `.envrc.local`. Once the server starts follow the steps
outlined in the article above and you should now be able to set breakpoints using the GoLand debugger.

#### Goland: Nix

To get Goland to play nicely with `nix`, there's a few things you can set up:

- Update `GOROOT` to `/nix/var/nix/profiles/mymove/bin/go`
  - Note that once you add it, Goland will resolve it to the actual path (the one above is a link), so it’ll look
    something like `/nix/store/rv16prybnsmav8w1sqdgr80jcwsja98q-go-1.19.3/bin/go`
- Update `GOPATH` to point to the `.gopath` dir in the `mymove` repo
  - You may need to create the `.gopath` dir yourself.
- Update Node and NPM:
  - Node interpreter: `/nix/var/nix/profiles/mymove/bin/node`
  - Package manager:
    - This might be fixed automatically, but if not, you can point it `/nix/var/nix/profiles/mymove/bin/yarn`
    - Similar to `GOROOT`, it will resolve to something that looks like
      `/nix/store/cnmxp5isc3ck1bm11zryy8dnsbnm87wk-yarn-1.22.10/libexec/yarn`
