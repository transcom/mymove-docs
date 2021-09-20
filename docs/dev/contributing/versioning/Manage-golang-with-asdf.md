This document describes how we are using asdf and some troubleshooting steps

# TOC

<!-- toc -->

- [What is ASDF?](#what-is-asdf)
- [Why ASDF?](#why-asdf)
- [Why `asdf global golang `?](#why-asdf-global-golang-)
- [How to get up and running](#how-to-get-up-and-running)
  * [Install asdf](#install-asdf)
  * [Install golang plugin](#install-golang-plugin)
  * [Install the version of golang MilMove is using](#install-the-version-of-golang-milmove-is-using)
  * [Configure global use of golang version](#configure-global-use-of-golang-version)
  * [Reload your shell](#reload-your-shell)
  * [Verify install](#verify-install)
- [Troubleshooting](#troubleshooting)
  * [GoLand is looking for GOROOT](#goland-is-looking-for-goroot)
  * [Missing `asdf.sh` executable](#missing-asdfsh-executable)
  * [Compile errors because wrong version of go after upgrading](#compile-errors-because-wrong-version-of-go-after-upgrading)

<!-- tocstop -->

# What is ASDF?

Besides being the home row of the left hand in the qwerty layout it is also a tool to manage runtime versions of multiple different tools. The home page for asdf is at https://asdf-vm.com/. While they support more than one type of tool we are only using it for golang.

# Why ASDF?

To find out more on why asdf was chosen please read [ADR 0056 - Use asdf to manage golang versoins in development](https://github.com/transcom/mymove/blob/master/docs/adr/0056-use-asdf-to-manage-golang-versions-in-development.md)

# Why `asdf global golang <version>`?

We ran into an issue with asdf and pre-commit hooks. During the installation process of the pre-commit hooks `golanglint-ci` requires use of go. Basically the install of `golanglint-ci` happens outside of the milmove directory, which doesn't have `.tool-versions`. So it depends on the global version of golang installed. Since this could be via brew, which has a newer version of golang than currently used on MilMove, or any number of other ways we are recommending using `asdf global` config to configure the default for outside the project as well. This is not different than before the ADR 56 because we had been using `brew` to install and pin golang globally on our laptops.

# How to get up and running

## Install asdf

Run `brew install asdf` to install asdf, then add it to your shell's rc file. See [Adding to your Shell](https://asdf-vm.com/#/core-manage-asdf?id=add-to-your-shell) from the asdf documentation.

## Install golang plugin

Run `asdf plugin add golang` to add the golang plugin. There are other plugins for asdf if you'd like to use it for other projects as well. Also has support for `legacy_version_file` to look for things like `.node-version` instead of just `.tool-versions`.

## Install the version of golang MilMove is using

Run `asdf install` to install the binary for the currently required version of golang.

## Configure global use of golang version

Run `cat .tool-versions` to output what version of go we should be using

```sh
❯ cat .tool-versions
golang 1.15.10
```

Then run `asdf global golang 1.15.10`

## Reload your shell

Reload your shell, open a new shell or source your rc file.

## Verify install

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

# Troubleshooting

## GoLand is looking for GOROOT

Another issue GoLand users can run into with asdf is with GOROOT. Goland expects GOROOT to be set but it may be unclear what it should be set to. You can easily find the value by running `asdf which go` and then set that appropriately for your shell. Not upgrading versions will require this to change unless you can set GOROOT to the output directory of `asdf which go`, for example 

```sh
export GOROOT=~/.asdf/installs/golang/1.15.10/go
```

## Missing `asdf.sh` executable

Some users have run into an issue with not being able run `asdf`. This is fixed by adding the following line to the `.bash_profile` file:

```sh
source /usr/local/opt/asdf/asdf.sh
```

then run `source ~/.bash_profile` in the terminal to reload.

## Compile errors because wrong version of go after upgrading

If you are getting can't compile because library was compiled for `old version of go` vs `current version of go`. You probably should exit your shell and open a new one. Also ensure the below are in your shell's rc file.

```sh
source /usr/local/opt/asdf/asdf.sh

export GOPATH=$(go env GOPATH)
export PATH="$PATH:$(go env GOPATH)/bin"
```
