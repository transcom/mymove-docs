---
title: How to manage Golang with asdf
sidebar_position: 5
---

# How to manage Golang with `asdf`

This document describes how we are using asdf and some troubleshooting steps

## What is ASDF?

Besides being the home row of the left hand in the qwerty layout it is also a tool to manage runtime versions of multiple different tools. The home page for asdf is at https://asdf-vm.com/. While they support more than one type of tool we are only using it for golang.

## Why ASDF?

To find out more on why asdf was chosen please read [ADR 0056 - Use asdf to manage golang versoins in development](https://github.com/transcom/mymove/blob/master/docs/adr/0056-use-asdf-to-manage-golang-versions-in-development.md)

## Why `asdf global golang <version>`?

We ran into an issue with asdf and pre-commit hooks. During the installation process of the pre-commit hooks `golanglint-ci` requires use of go. Basically the install of `golanglint-ci` happens outside of the milmove directory, which doesn't have `.tool-versions`. So it depends on the global version of golang installed. Since this could be via brew, which has a newer version of golang than currently used on MilMove, or any number of other ways we are recommending using `asdf global` config to configure the default for outside the project as well. This is not different than before the ADR 56 because we had been using `brew` to install and pin golang globally on our laptops.

## How to get up and running

### Install asdf

Run `brew install asdf` to install asdf, then add it to your shell's rc file. See [Adding to your Shell](https://asdf-vm.com/#/core-manage-asdf?id=add-to-your-shell) from the asdf documentation.

### Install golang plugin

Run `asdf plugin add golang` to add the golang plugin. There are other plugins for asdf if you'd like to use it for other projects as well. Also has support for `legacy_version_file` to look for things like `.node-version` instead of just `.tool-versions`.

### Install the version of golang MilMove is using

Run `asdf install` to install the binary for the currently required version of golang.

### Configure global use of golang version

Run `cat .tool-versions` to output what version of go we should be using

```sh
❯ cat .tool-versions
golang 1.15.10
```

Then run `asdf global golang 1.15.10`

### Reload your shell

Reload your shell, open a new shell or source your rc file.

### Verify install

Run `asdf current` and `which go` to verify they point to the right versions. This is also checked by the `script/prereqs` script

```sh
❯ asdf current
golang          1.15.10          /Users/john/projects/dod/mymove/.tool-versions

❯ which go
/Users/john/.asdf/shims/go

❯ rm .prereqs.stamp
❯ make prereqs
scripts/prereqs
/usr/local/bin/aws installed.
bash installed.
/usr/local/bin/chamber installed.
docker installed.
jq installed.
asdf installed.
.asdf/shims was found in path
go installed.
yarn installed.
pre-commit installed.
shellcheck installed.
psql installed.
nodenv installed.
.nodenv/shims was found in path
node installed.
pkcs11-tool installed.
pkcs15-tool installed.
circleci installed.
direnv installed.
entr installed.
aws-vault installed.
watchman installed.
OK: all prereqs found
```

## Troubleshooting

### GOROOT is showing a different version or not working with GoLand

Another issue GoLand users and others can run into with asdf is with GOROOT. Goland expects GOROOT to be set but it may be unclear what it should be set to. You can easily find the value by running `asdf where go`. Not upgrading versions will require this to change unless you can set GOROOT to the output directory of `asdf where go`. For example, you can set this in your `~/.zshrc` (or similar) shell:

```sh
export GOROOT="$(asdf where golang)/go/"
```

### Missing `asdf.sh` executable

Some users have run into an issue with not being able run `asdf`. This is fixed by adding the following line to the `.bash_profile` file:

```sh
source /usr/local/opt/asdf/asdf.sh
```

then run `source ~/.bash_profile` in the terminal to reload.

### Compile errors because wrong version of go after upgrading

If you are getting can't compile because library was compiled for `old version of go` vs `current version of go`. You probably should exit your shell and open a new one. Also ensure the below are in your shell's rc file.

```sh
source /usr/local/opt/asdf/asdf.sh

export GOPATH=$(go env GOPATH)
export PATH="$PATH:$(go env GOPATH)/bin"
```
