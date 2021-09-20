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
- Open a PR and ask someone from the Truss Infra Team (not necessarily the MilMove Infra Team) to approve it.

## 2. Upgrade Local Go Version

For more details see [[Manage golang with asdf]]

- Update `.tool-versions` to point to new version of golang
  - If you've done some PATH sorcery to point to a specific Go version (as detailed [here](https://github.com/transcom/mymove#setup-prerequisites)), you'll have to update that as well
- Run `asdf install` to install the new version (if you do not yet have it installed, see [How to get up and running](https://github.com/transcom/mymove/wiki/Manage-golang-with-asdf#how-to-get-up-and-running))
- Run `asdf global golang <version>` to update global version as well
- `go version` and `asdf which go` to check it worked
- Add this change to the PR created in the next step

```sh
❯ go version
go version go1.16.4 darwin/amd64

❯ asdf which go
/Users/john/.asdf/installs/golang/1.16.4/go/bin/go
```

## 3. Update `transcom/mymove` Repo

- After your Docker image PR lands, grab the git hash from [Docker](https://hub.docker.com/r/milmove/circleci-docker) that corresponds with your merged code.
- Update files with the updated Docker image tag hash and/or Go version:
  - [Example PR](https://github.com/transcom/mymove/pull/6180)
  - Files to update:
    - `.circleci/config.yml`
    - `Dockerfile.local`
    - `Dockerfile.migrations_local`
    - `Dockerfile.reviewapp`
    - `Dockerfile.tasks_local`
    - `Dockerfile.tools_local`
    - `Dockerfile.webhook_client`
    - `Dockerfile.webhook_client_local`
    - `cypress/Dockerfile.cypress`
    - `scripts/gen-assets`
    - `scripts/gen-server`
    - `scripts/pre-commit-swagger-validate`
    - `GOVERSION` in `scripts/prereqs`
    - `Makefile` the `docker_circleci` task
    - `nix/default.nix` (you will also need to [update the hash](https://ahobson.github.io/nix-package-search))
- If the major/minor version changed (the first or second number, e.g. 1.x.y to 2.x.y or 1.15.x to 1.16.x):
  - [Example PR](https://github.com/transcom/mymove/pull/4990)
  - Update the following files with the new go version:
    - `go-version` in `.github/workflows/be-linter.yml`
    - `go-version` in `.github/workflows/go-auto-approve.yml`
    - `VERSION_NUMBER` in `scripts/check-go-version`
    - `go.mod`
- Rerun the Go formatter on the codebase with `pre-commit run --all-files golangci-lint`
- Regenerate mocks (in case the signatures have changed that we're mocking): `make mocks_generate`
- Run `make e2e_test_docker` to test that the `Dockerfile.*local` files work  with the new image.
- Commit the above changes and any reformatted code and make sure everything builds correctly on CircleCI

## 4. Notify Folks

- It can be jarring when everything suddenly breaks after pulling from master, so it's a nice courtesy to notify folks in #prac-engineering in slack that the official Go version will be updated shortly and their local Go version should be upgraded as well
- If `circleci-lint` has changed as well, then in-flight PRs will need to be formatted before they are merged, lest they break master
