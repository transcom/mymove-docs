---
title: 0081 Use ASDF to Manage Node and Golang versions in Development
---

# Use ASDF to Manage Node and Golang versions in Development

:::info

This ADR supersedes [ADR-0046](0046-use-nodenv.md) and [ADR-0056](0056-use-asdf-to-manage-golang-versions-in-development.md)

:::

## Considered Alternatives

* Do nothing, keep using asdf for golang and nodenv for node
* Use asdf to manage golang and node versions

## Decision Outcome

* Chosen Alternative: Use [asdf](https://asdf-vm.com/) to manage golang and node versions

ADR-0056 notes that the original author would like to see asdf used for other tools (presumably such as node)

> Admittedly we are not yet taking advantage of `asdf` for other tools, but I would like to see that happen.

ADR-0056 also lists the following as a disadvantage of using asdf for golang and node:

> installing node, yarn, or golang with asdf and another one of the similar tools can cause conflicts depending on which
> of the version manager tools is first in a particular path.

This is actually an advantage of using asdf, since one of the difficulties of managing asdf _and_ node is the obfuscation
of which version will be shimmed by which tool. Picking and using _one_ tool is the solution. Since asdf is already required
for managing go, and it is capable of managing node, it is the logical choice.

If you have a capable tool, Alton Brown would recommend throwing the redundant "unitasker" out:
> I have railed against unitaskers for 20 years.
>
> I've come around to liking them as strategic gifts for people you don't like.
> - [Alton Brown on NPR's All Things Considered](https://www.npr.org/sections/thesalt/2015/12/23/460833325/the-unitasker-kitchen-gadgets-alton-brown-loves-to-loathe)

## Pros and Cons of the Alternatives

### Do nothing, keep using asdf for golang and nodenv for node

* `+` requires no effort or decision energy
* `+` has no impact on day-to-day operations of any onboarded engineers
* `+` has no chance of introducing new issues because no changes would be made
* `-` keeps relatively higher cognitive load around tooling
* `-` Truss seems to prefer asdf on newer projects, so engineers onboarding from another project in the future will likely have to juggle multiple node version managers
* `-` Provides no incentive to revisit onboarding instructions and scripting, which is [currently outdated or over-engineered, even for existing installation of golang via asdf](https://github.com/transcom/mymove/pull/11053/files#r1261749313)

### Use asdf to manage golang and node versions

* `+` asdf is already used for managing golang, so all engineers are familiar with the tool and are using it today
* `+` simplifies environment setup
* `+` reduces the number of tools required to maintain the project
* `+` can be rolled out such that engineers can continue using nodenv until they choose to switch
* `+` switching from nodenv to asdf is trivial
* `+` Truss seems to prefer asdf on newer projects, so engineers onboarding from another project in the future will not likely have to juggle multiple node version managers
* `-` without proper socialization and documentation updates, could add confusion
* `-` changes core tooling that engineers have likely been using for some time
