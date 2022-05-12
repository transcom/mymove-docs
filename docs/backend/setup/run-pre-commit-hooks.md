---
sidebar_position: 5
---

# Run pre-commit hooks

[Pre-commit](https://pre-commit.com/) is a powerful tool that automates validations, lint checks and adds to developer quality of life. The config file that determines the actions of pre-commit hooks can be found [here](https://github.com/transcom/mymove/blob/master/.pre-commit-config.yaml).

Pre-commit can be run by running the following command in terminal:
`pre-commit` or `make pre_commit_tests` which is similar to how CircleCI runs it.

*If the `pre-commit` command is not found or errors out, please make sure you have the [pre-requisites](https://github.com/transcom/mymove/blob/master/README.md#setup-prerequisites) installed.*

## Testing

If you would like to run an individual hook, for example if you want to only run *prettier*: `pre-commit run prettier -a`

## Specifying and updating the Node version in the config

By default, `pre-commit` uses the system-installed versions of languages. We prefer to manage versions with language managers such as `nodenv` and `asdf`. By default `nodenv` doesn't install Node system-wide, which can cause `pre-commit install-hooks` to hang without explanation. The solution is to either install the language globally (not ideal), or tell `pre-commit` to use a specific version of a language. We can either use the `language_version` key within a specific hook, or if we expect all Node hooks to use the same version, we can define a top-level `default_language_version` attribute where you can specify multiple languages and their versions, like this:
```yaml
default_language_version:
  # this should match the version in .node-version at the root of this project
  node: 12.21.0

repos:
  - repo: local
    hooks:
      - id: go-version
        name: go version
        entry: scripts/check-go-version
        language: script
        types: [go]
```

This specific language version should match the one we use on the project. For Node, this is defined in `.node-version`. When we upgrade Node, we should remember to update the `pre-commit` config file as well.

Currently, it looks like `pre-commit` only supports Python, Node, and Ruby for specific language versions. See the [pre-commit documentation](https://pre-commit.com/#overriding-language-version) for more details.

## Editor Integration

1. `golangci-lint` supports various [editors](https://github.com/golangci/golangci-lint/#editor-integration)

## Current pre-commit hooks

| Hook  | Description |
| ------------- | ------------- |
| `go-version`  | Attempts to load go version and verify it.
| `check-json`  | Attempts to load all json files to verify syntax. For more see [here](http://github.com/pre-commit/pre-commit-hooks).
| `check-merge-conflict`  | Check for files that contain merge conflict strings. For more see [here](http://github.com/pre-commit/pre-commit-hooks).
| `check-yaml`  | Attempts to load all yaml files to verify syntax. For more see [here](http://github.com/pre-commit/pre-commit-hooks).
| `detect-private-key`  | Checks for the existence of private keys. For more see [here](http://github.com/pre-commit/pre-commit-hooks).
| `trailing-whitespace` | Trims trailing whitespace. For more see [here](http://github.com/pre-commit/pre-commit-hooks).
| `markdownlint`  | Linting rules for markdown files. For more see [here](http://github.com/igorshubovych/markdownlint-cli).
| `shell-lint`  | Linter for shell files including spell check. For more see [here](http://github.com/detailyang/pre-commit-shell).
| `prettier` | Attempts to run [prettier](https://prettier.io/) hook against the code.
| `eslint`  | Attempts to run linting rules against the code base.
| `swagger` | Attempts to run swagger validator for api, internal, order and dps endpoints.
| `mdspell` | Spellchecks Markdown files. For more see [here](https://github.com/lukeapage/node-markdown-spellcheck).
| `markdown-toc`  | Wrapper script to generate table of contents on Markdown files.
| `go-imports`  | Attempts to run command `goimports` which updates your Go import lines, adding missing ones and removing unreferenced ones. For more see [here](https://godoc.org/golang.org/x/tools/cmd/goimports).
| `go-lint` | Attempts to run a linter against the go source code.
| `go-vet` | Attempts to examines Go source code and reports suspicious constructs, such as `Printf` calls whose arguments do not align with the format string.
| `gosec` | Inspects source code for security problems by scanning the Go AST. For more see [here](https://github.com/securego/gosec).
| `gen-docs` |Attempts to generate table of contents for the `README.md` file in `docs/` folder.
| `gofmt` | Part of `golangci-lint` linter and attempts to format go code
| `varcheck` | Part of `golangci-lint` linter and used to find unused global variables and constants
| `typecheck` | Part of `golangci-lint` linter and works like the front-end of a Go compiler, parses and type-checks Go code
| `structcheck` | Part of `golangci-lint` linter and finds an unused struct fields
| `deadcode` | Part of `golangci-lint` linter and used to find unused code

# Troubleshooting pre-commit issues

[Troubleshoot Precommit Hook Failures](../guides/troubleshoot-precommit-hook-failures.md)

