---
title: How to Switch from nodenv to asdf for Managing Node Versions
---

# How to Switch from [nodenv](https://github.com/nodenv/nodenv) to [asdf](https://asdf-vm.com/) for managing Node Versions

[ADR-0081](../../../adrs/0081-use-asdf-to-manage-node-and-golang-versions-in-development.md) recommends using asdf for
both Node and Go. Many folks are likely using nodenv today, and have the option to migrate at a time of their choosing.

This guide assumes you already have asdf installed (for Go). If not, install asdf first.

1. Uninstall nodenv

   ```
   $ brew uninstall nodenv
   ```

2. Remove nodenv references from your shell profile file (e.g. `.zshrc`). You likely have a `eval "$(nodenv init -)"` there.

3. Install the asdf nodejs plugin

   ```
   asdf plugin add nodejs
   ```

4. Ensure project tool versions for the project are installed, by running the following from inside the project directory.

   ```
   asdf install
   ```

   Within mymove-docs, this will install the correct version of node.
   Within mymove, this will install the correct version of go and node.

   ASDF will automatically use the version(s) defined in `.tool-versions` whenever you are in a directory that has a `.tool-versions` file, so long as it has been installed, just like nodenv.

