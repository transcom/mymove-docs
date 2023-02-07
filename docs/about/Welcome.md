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
