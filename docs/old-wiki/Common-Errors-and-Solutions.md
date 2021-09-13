Having trouble running mymove locally? This page collects common errors and their solutions.

## Migrations

### Invalid migration path 

```
2020-08-05T10:41:00.589-0500	INFO	milmove/migrate.go:61	checking migration config	{"git_branch": "master", "git_commit": "c42a3ef9a458e5b9de94fa3507b6c2f43b209856"}
panic: invalid configuration: Expected migrations//secure to be a path in the filesystem: invalid migration path "migrations//secure"
```

#### Solution
Run `direnv allow`

## Pre-Commit Hook Failures
These can happen when committing your code, or when manually running the `pre-commit install-hooks` command. Check out this doc for all the errors and fixes: [Troubleshoot Precommit Hook Failures](https://github.com/transcom/mymove/wiki/Troubleshoot-Precommit-Hook-Failures)

## Yarn

### Engine "node" is incompatible with this module
When running `yarn install`, you may see an error similar to:
```
The engine "node" is incompatible with this module. Expected version "12.21.0". Got [another version].
```

#### Solution
The project uses node version `12.21.0`. Use `nodenv` to manage your node versions and easily switch between them.

* Install `nodenv`: https://github.com/nodenv/nodenv
  * `brew install nodenv`
* Install the correct version of Node
  * `nodenv install 12.21.0`
* Set version of Node
  * `nodenv local 12.21.0`

**Note**: Make sure you've appended `eval "$(nodenv init -)"` to your shell rc. Read through the [official docs](https://github.com/nodenv/nodenv#installation) when installing `nodenv`.

## Compiling

## The client doesn't reflect my new changes or will not build locally
The client server is detecting a build problem. You fix it, but it does not see the new code and the problem remains. Sometimes, no new build is triggered. 

This can manifest in a couple of ways, appearing to be a code problem or potential a missing npm package and various other "weird" symptoms. Sometimes it occurs on branch switching without shutting down the server first.

Troubleshooting steps may include:
- Restarting the server
- Restarting your code editor
- Migrating the database

#### Solution
Trigger a fresh build. To do so, make a change to the code. This may mean inserting a console log, shutting down and switching branches, creating an intentional syntax error, basically anything that will trigger a build.

## Webpack is failing on the client build step unable to order dependencies in the bundle

As Webpack is trying to bundle the frontend javascript and css assets it can run into a problem of circular dependency where it can't deterministically split how some imports should be ordered.

You may see an error message stating `Conflicting order` from a plugin such as the `mini-css-extract-plugin` and names of css or js files that it is failing on.

The way to resolve these errors is to figure out what the common parents of these components or files are and where they are used.  You will likely need to reorder the import statements of these resources in a consistent fashion.  Because we are using create-react-app we can't easily suppress this warning in a webpack config.

For more details you can consult this [GitHub issue](https://github.com/facebook/create-react-app/issues/5372).  


