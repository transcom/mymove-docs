---
sidebar_position: 10
---

# How to Upgrade Go Version

Upgrading the Go version that we use happens in roughly these steps:

 1. [Updating our Docker Image:](#1-updating-our-docker-image) Update [transcom/circleci-docker](https://github.com/transcom/circleci-docker) to point at an updated Go binary
 2. [Upgrade Local Go Version:](#2-upgrade-local-go-version) Upgrade local Go version with asdf config `.tool-version`
 3. [Update `transcom/mymove` Repo:](#3-update-transcommymove-repo) Create a PR for the `transcom/mymove` repo with the updated docker image hash created in step 1
 4. [Notify Folks:](#notify-folks) Notify everyone that we're updating Go around the time your PR lands


## 1. Updating Our Docker Image

- Grab the download URL and SHA256 checksum for the latest 64-bit Linux Go release from `https://golang.org/dl/`
  - The file name should be something like `gox.xx.x.linux-amd64.tar.gz`
- Update any Dockerfile that installs go with the new go version and checksum.
  - See [this PR](https://github.com/transcom/circleci-docker/pull/82) as an example.
- Open a PR and ask someone from the Milmove Platform Team to approve it.
- You may want to hold off merging this `circleci-docker` PR until just before you're about to land the corresponding PR for the `transcom/mymove` repo.
  - You can use the PR's hash to test, then merge and switch to the `main` hash after all testing/checks/approvals are done.
  - This keeps others who may be doing `circleci-docker` work from prematurely using the updated Go container before the necessary Go-related changes have landed in `transcom/mymove`.
- Keep in mind that others may have merged things into the `main` branch on `circleci-docker` that haven't been
deployed yet in a MilMove build. Carefully examine the diffs since the last used hash and see if any look like
they could have an impact and test accordingly (including an experimental deploy if warranted such as when a base
Docker image has changed).

## 2. Upgrade Local Go Version

### asdf

For more details see [Manage golang with asdf](manage-golang-with-asdf.md)

- Update `.tool-versions` to point to new version of golang
- Run `asdf install` to install the new version (if you do not yet have it installed, see [How to get up and running](manage-golang-with-asdf.md)
- Run `asdf global golang <version>` to update global version as well
- `go version` and `asdf which go` to check it worked
- Add this change to the PR created in the next step

```sh
❯ go version
go version go1.16.4 darwin/amd64

❯ asdf which go
/Users/john/.asdf/installs/golang/1.16.4/go/bin/go
```

### nix

- Update `nix/default.nix` (you will also need to [update the hash](https://ahobson.github.io/nix-package-search))
- Run `./nix/update.sh`

## 3. Update `transcom/mymove` Repo

- After your Docker image PR lands, grab the git hash from [Docker](https://hub.docker.com/r/milmove/circleci-docker) that corresponds with your merged code.
- Update files with the updated Docker image tag hash and/or Go version:
  - [Example PR](https://github.com/transcom/mymove/pull/10185)
  - Update the Go version number in:
    - `.tool-versions`
    - `go-version` in `.github/workflows/go-auto-approve.yml`
  - Update the Docker image tag hash in:
    - `.circleci/config.yml`
    - `Dockerfile.local`
    - `Dockerfile.migrations_local`
    - `Dockerfile.reviewapp`
    - `Dockerfile.tasks_local`
    - `Dockerfile.tools_local`
    - `Dockerfile.webhook_client`
    - `Dockerfile.webhook_client_dp3`
    - `Dockerfile.webhook_client_local`
    - `Makefile` (in the `docker_circleci` target)
- If you use `asdf` to manage your local Go version, you still need to update the nix package in `nix/default.nix` - use the [package search](https://ahobson.github.io/nix-package-search) to find the hash
- If the major/minor version changed (the first or second number, e.g. 1.x.y to 2.x.y or 1.15.x to 1.16.x):
  - [Example PR](https://github.com/transcom/mymove/pull/10185)
  - Update the following files with the new go version:
    - `go.mod`
  - You may have to update the `golangci-lint` pre-commit hook version found in `.pre-commit-config.yaml` to one that supports the new Go version
- Rerun the Go formatter on the codebase with `pre-commit run --all-files golangci-lint`
- Regenerate mocks (in case the signatures have changed that we're mocking): `make mocks_generate`
- Run `make e2e_test_docker` to test that the `Dockerfile.*local` files work  with the new image.
- Commit the above changes and any reformatted code and make sure everything builds correctly on CircleCI
- You may also want to check for an upgrade to the `golangci-lint` version ([example](https://github.com/transcom/mymove/pull/8327/files#r835384615)), particularly if doing a major Go version upgrade

## 4. Notify Folks

- It can be jarring when everything suddenly breaks after pulling from main, so it's a nice courtesy to notify folks in #prac-engineering in slack that the official Go version will be updated shortly and their local Go version should be upgraded as well
- If `circleci-lint` has changed as well, then in-flight PRs will need to be formatted before they are merged, lest they break main

### Message template
Below is an example message one can use as a template for their notification to #prac-engineering (credit: Reggie R):

```
@engineering I just merged a [PR](https://github.com/transcom/mymove/pull/8244) 
that upgrades the project to [Go 1.17.7](https://go.dev/doc/devel/release#go1.17) (which includes security fixes). 
When you pull that, here’s what to do if you’re using asdf:


`asdf install`
`asdf global golang 1.17.7`


You may need to restart your terminal after this if you still see mention of 1.17.5 when building.  
If you happen to be using nix instead, you should be prompted to run `./nix/update.sh` after pulling.  
If you’re using an IDE, you may need to adjust it to point to 1.17.7 too.  

```
