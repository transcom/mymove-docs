---
pagination_next: getting-started/application-setup/direnv-setup
---

# Option 1: Setup Using Homebrew

:::info
If you would prefer to setup using Nix, go to [Option 2: Setup Using Nix](/docs/getting-started/application-setup/03-project-setup-homebrew-vs-nix/02-setup-nix.md).
:::

From the `mymove` repo, run the following command to install all the necessary dependencies and configure your shell file:

```bash
SKIP_CHECKS=true make prereqs
```

This will install everything listed in [`Brewfile.local`](https://github.com/transcom/mymove/blob/main/Brewfile.local), as well as [Docker](https://www.docker.com/). (Depending on your machine's configuration, you may need to ensure that `go` is available on the command line, and that `$GOPATH` is a defined system variable. Running the script will output errors if this is the case.)

:::note
The script might ask you for your macOS password at certain points, like when installing opensc, or when it needs to write to your `/etc/hosts` file.
:::

Once this script is finished, quit and restart your terminal, then complete the installation:

```bash
make deps
```

This will install `pre-commit` hooks and frontend client dependencies. See the Pre-Commit guide for more information on how to use it.

:::note
Installing and configuring pre-commit the first time takes about 3 minutes.
:::

Going forward, feel free to run `make prereqs` or `make deps` as often as you'd like to keep your system up to date. Whenever we update the app to a newer version of Go or Node, all you have to run is `make prereqs` and it will update everything for you.
