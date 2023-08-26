---
pagination_next: getting-started/application-setup-new/direnv-setup
---

# Option 2: Setup Using Nix

:::info
If you prefer to setup using Homebrew, go to [Option 1: Setup Using Homebrew](/docs/getting-started/application-setup-new/03-project-setup-homebrew-vs-nix/01-setup-homebrew.md).
:::

## Initial Setup

Read the overview of Nix in the [Truss Engineering Playbook](https://playbook.truss.dev/docs/developing/nix), and follow the instructions in the playbook.

## Clean Up Local Environment

This section is only if you had previously set up any of these tools/packages. It is also optional, with the following the caveat of this note:

:::danger
If you need any of the packages/tools for other things that you won't use `nix` for, you can set things up so that they both work side by side, but you'll just have to set up your `PATH` properly. And even then, there may be other steps necessary which aren't documented here.
:::

Disable or uninstall `nodenv`, `asdf`, or any other version switchers for `mymove` :

- To disable `nodenv`, remove `eval "$(nodenv init -)"` from `.zshrc` (or your shell's config file)
- To uninstall `nodenv`, follow [these instructions](https://github.com/nodenv/nodenv#uninstalling-nodenv).
- To uninstall `asdf`, follow [these instructions](https://asdf-vm.com/manage/core.html#uninstall).
    - Also, remove the following lines from `.zshrc` (or your shell’s config file):

    ```bash
    # remove these lines
    export GOPATH=~/dev/go
    export PATH=$(go env GOPATH)/bin:$PATH
    ```


## Install Dependencies

1. Install `mymove` dependencies:

```bash
nix-env -i aws-vault chamber direnv bash
```

2. Set up [AWS services](/docs/getting-started/application-setup-new/01-prerequisites.md).
3. Follow these steps to configure direnv (which was installed in Step 1).
    1. In `.zshrc` (or the relevant one for you), make sure the `nix` setup line (inserted by the `nix` installation) is run before the `direnv` hook setup.
4. Run `./nix/update.sh`.
5. Run `make deps_nix`. This will install `pre-commit` hooks and frontend client dependencies. See the Pre-Commit guide for more information on how to use it.

## Add or Update Packages

1. Go to [nix-package-search](https://ahobson.github.io/nix-package-search/#/search) and find the package you’re looking for.
2. When you see the version of the package you want, click on the eye icon to unfold the settings.
3. Add or update the package to `nix/default.nix`.
