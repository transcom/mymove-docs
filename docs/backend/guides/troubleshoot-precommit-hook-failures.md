---
sidebar_position: 13
---

# Precommit Hooks

The precommit hooks run automatically when you try to make a commit. They are a set of scripts that validate the commit.
If the validation fails, the commit isn't committed.

## Cheatsheet

Here are some useful ways to debug.

To run them yourself before you commit:

    $ pre-commit run --all-files

To run a specific hook:

    $ pre-commit run markdownlint --all-files

If they are not installed:

    $ pre-commit install-hooks

## Errors and Solutions

### 1. Error: Installing environment
For an error about installing the environment, try ensuring your nodenv is set correctly.
This is what the error looks like, it stalls here for a while….
```
$ pre-commit install-hooks
[INFO] Installing environment for git://github.com/igorshubovych/markdownlint-cli.
[INFO] Once installed this environment will be reused.
[INFO] This may take a few minutes...
```
#### Solution 1
For this error you may need to set your global nodenv version

Check the current versions,
```
~/$ cat .node-version
12.21.0
```

Outside mymove folder, set the global version,
```
~/mymove$ cd ..
~/$ nodenv global 12.21.0
```

Then inside mymove,
```
~/$ cd mymove
~/mymove$ pre-commit install-hooks
```

#### Solution 2
If the above solution does not work, and running the above still results in a hanging or incomplete installation, remove the pre-commit cache and the `.client_deps.stamp` and try again

```shell
rm -rf ~/.cache/pre-commit
rm .client_deps.stamp
```

### 2. Golang-ci Error: “no go files to analyze”
For an error about context loading failing, clean your precommit cache.
```
level=error msg="Running error: context loading failed: no go files to analyze
```

#### Solution
```
rm -rf ~/.cache/pre-commit && pre-commit run -a
```

### 3. Golang-ci Error: "failed prerequisites"
This error about failed prerequisites is misleading. if you see a failure in `…/[pkgname].test` it means there’s a test in there that likely isn’t building.
```
level=warning msg="[runner] Can't run linter goanalysis_metalinter: assign: failed prerequisites: inspect@github.com/transcom/mymove/pkg/handlers/ghcapi [github.com/transcom/mymove/pkg/handlers/ghcapi.test]"
level=error msg="Running error: assign: failed prerequisites: inspect@github.com/transcom/mymove/pkg/handlers/ghcapi [github.com/transcom/mymove/pkg/handlers/ghcapi.test]"
```
#### Solution
Probably an error in server tests.
Run the tests and look for errors.
```
make server_test
```

One weird trick - you can compile but not run the tests using
```
go test -run=nope ./...
```
This is helpful to find the package with the compile error.

### 4. ESLint Error: "couldn't find the config react-app"
```
Oops! Something went wrong! :(

ESLint: 7.5.0

ESLint couldn't find the config "react-app" to extend from. Please check that the name of the config is correct.
```
#### Solution
For this error, run `yarn install`. This will install the dependencies listed in `package.json`.

### 5. Executable ... not found.
This error says you don't have some tool installed. You might see this with `eslint`, `prettier` and `spectral`.
```
prettier.................................................................Failed
- hook id: prettier
- exit code: 1
Executable `node_modules/.bin/prettier` not found
```

#### Solution
Run `yarn install`. This will install the dependencies listed in `package.json`.

### 6. Module not found in `gen`
```
cannot find module providing package github.com/transcom/mymove/pkg/gen/*
```
#### Solution
Try running `make server_generate` which should generate files for the `gen` folder automatically.

### 7. Module not found in `mocks`
```
cannot find module providing package github.com/transcom/mymove/pkg/.../mocks
```
#### Solution
Try running `make mocks_generate` which should auto generate mocks.

### 8. Failed prerequisites without an indication of an error
```
Can't run linter goanalysis_metalinter: assign: failed prerequisites: inspect@github.com/transcom/mymove/cmd/milmove
```
#### Solution
This could be due to the build failing. Try `make server_build` to check.

#### Nix Error: SSL Certificate verify failed

This can happen because of the way certs need to be handled in this project and `nix`. 

#### Solution
To get around this issue, you can try running:

```shell
NIX_SSL_CERT_FILE=$HOME/.nix-profile/etc/ssl/certs/ca-bundle.crt <pre-commit related command>
```

E.g.

```shell
NIX_SSL_CERT_FILE=$HOME/.nix-profile/etc/ssl/certs/ca-bundle.crt pre-commit install-hooks
```
