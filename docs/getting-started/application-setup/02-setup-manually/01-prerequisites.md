---
pagination_next: getting-started/application-setup/database
---

# Prerequisites

We have scripts that will install all the dependencies for you, as well as configure your shell file with all the required commands:

```shell
SKIP_CHECKS=true make prereqs
```

This will install everything listed in `Brewfile.local`, as well as Docker. (Depending on your machine's configuration, you may need to ensure that `go` is availble on the command line, and that `GOPATH` is a defined system variable. Running the script will output errors if this is the case.)

:::note
The script might ask you for your macOS password at certain points, like when installing opensc, or when it needs to write to your `/etc/hosts` file.
:::

Once this script is finished, quit and restart your terminal, then complete the
installation:

```shell
make deps
```

This will install `pre-commit` hooks and frontend client dependencies. See [Dependencies](/docs/getting-started/application-setup/dependencies) for more info.

:::note
that installing and configuring pre-commit the first time takes about 3 minutes.
:::

Going forward, feel free to run `make prereqs` or `make deps` as often as you'd like to keep your system up to date. Whenever we update the app to a newer version of Go or Node, all you have to run is `make prereqs` and it will update everything for you.
