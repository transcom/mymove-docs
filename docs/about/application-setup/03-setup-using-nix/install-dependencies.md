---
sidebar_position: 3
---

# Install Dependencies

1. Install a few MilMove dependencies:

   ```shell
   nix-env -i aws-vault chamber direnv bash
   ```

1. [Set up AWS services](/docs/about/application-setup/01-base-setup/05-aws-services.md)

1. Configure direnv:

   1. [Set up direnv](/docs/about/application-setup/01-base-setup/06-direnv.md)
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
      [Setup: Dependencies](/docs/about/application-setup/06-dependencies) for more info on some of the parts.
