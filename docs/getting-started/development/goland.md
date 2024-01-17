# Goland

GoLand supports
[attaching the debugger to a running process](https://blog.jetbrains.com/go/2019/02/06/debugging-with-goland-getting-started/#debugging-a-running-application-on-the-local-machine),
however this requires that the server has been built with specific flags. If you wish to use this feature in
development add the following line `export GOLAND=1` to your `.envrc.local`. Once the server starts follow the steps
outlined in the article above and you should now be able to set breakpoints using the GoLand debugger.

## Goland: Nix

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
