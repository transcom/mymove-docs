---
sidebar_position: 2
---

# Clean Up Local Environment

This section is only if you had previously set up any of these tools/packages. It is also optional, with the following
the caveat of this note:

:::warning
If you need any of the packages/tools for other things that you won't use `nix` for, you can set things
up so that they both work side by side, but you'll just have to set up your `PATH` properly. And even then, there may be
other steps necessary which aren't documented here.
:::

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
