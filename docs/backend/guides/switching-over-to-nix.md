---
sidebar_position: 16
---

# Switching over to Nix

As a developer on the MilMove project, I would like to not have to maintain to separate sets of local environment setups (our original setup instructions and nix). So to that end, this is to investigate what it would take to fully switch over to nix.

[Relevant JIRA ticket](https://dp3.atlassian.net/browse/MB-8725)

## OS Considerations

Nix is only available for MacOS and Linux.

* MacOS
  * We already only really have instructions and helpful info for setting this project up on MacOS.
* Linux
  * Our instructions might work for linux, but they may or may not need a few tweaks for this.
* Windows
  * We do not have any instructions for getting this working in Windows as is. Just the fact that our main interface for working on the project is `make` makes it so that we don't immediately support Windows. It _can_ be installed on Windows, but it can be a pain to do so, and we don't point to helpful docs for how to do this.

With the above in mind, switching from our current flow to `nix` would not really change our OS support.

## Pros

* Having a single way of setting up locally means fewer things we have to keep up to date.
  * We have several scripts that check versions of software that we could stop maintaining since nix declares the versions we want and installs them.
  * We have some makefile commands that exist just to run these scripts that check versions so we can get rid of those.
* We also have several tools that we don't have version checks for in the repo so it's easy for people to have different versions of things. That will still be possible in the `nix` setup because there's a few packages needed before you can even use the `nix` setup we have like `direnv`, but at least the number will be much smaller, and we could also have that in version control possibly and just handle it slightly differently (e.g. have people use that file to install the first dependencies like `direnv` globally, then have them use the existing `nix` setup.
* We could use something like `niv` to keep our packages up to date:
  * [NixPkgs - Towards Reproducibility](https://nixos.org/guides/towards-reproducibility-pinning-nixpkgs.html)
  * [`niv` - GitHub Repo](https://github.com/nmattia/niv/)
* Set up is quicker with `nix` than our current process.

## Cons

* Nix is something that is new to most people on the project vs `homebrew` which is more ubiquitous, at least among Mac devs.
* Installation is via executing a `curl` shell script.
  * It's something we've talked about being a limitation for full adoption and
    that we should consider contributing to `nix` by making it possible to
    install via `homebrew` or some other method.
  * [Slack thread with more info](https://trussworks.slack.com/archives/C01KTH6HP7D/p1611793387004800).
* Packages in `nix` can lag behind their counterparts in `homebrew`. This means that if we do switch, we either have to be ok with being behind, or we need to be willing to make contributions to `nix` to update the packages we care about.
* Finding the hashes for any given package version can be a pain.
  * We have a [package search setup by Truss](https://ahobson.github.io/nix-package-search/#/search) that can help with this, but ideally we could do it easier.
    * You can also use it on your command line like so:
      ```shell
      curl -sSfL https://ahobson.github.io/nix-package-search/nix/nixpkgs-unstable/all_packages.csv | grep 'awscli2'
      ```
  * `niv` is another way we could mitigate this issue.

## What Would It Take To Switch Over

* We have a lot of hard-coded paths for packages.
  * E.g. the path to `pre-commit` in our `Makefile`, or the path to `opensc` in the CAC scripts.
  * These are hard-coded for where `homebrew` installs things, so we would need to update them to look in a few more places, or preferably, update them to use built in commands like `type` or `command` to find their paths.
    * [Stack Exchange: Finding the Path of an Executable](https://unix.stackexchange.com/a/85250)
* We need to decide if we are ok with the way it's installed now, or if we want to go through the effort of contributing another installation method.
* We would need an ADR stating our intention to switch and reasoning behind the switch (this document could easily feed that one).
* Need to decide if we would make it more of a gradual switch or have a switchover date (or more likely week).
  * A gradual switch could work well in that as people come across issues with their current install, we could point them at the instructions for switching over to `nix`, which should hopefully let them be on their way in under an hour.
