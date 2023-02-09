# Homebrew

We use [Homebrew](https://brew.sh) to manage a few of the packages we need for this project.

Whether or not you already have Homebrew installed, you'll need to make sure it's
up to date and ready to brew:

```shell
SKIP_LOCAL=true /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/monfresh/fresh-brew/main/fresh-press)"
```

If you're using the Fish shell, run this command:

```shell
SKIP_LOCAL=true bash (curl -fsSL https://raw.githubusercontent.com/monfresh/fresh-brew/main/fresh-press | psub)
```

See the [monfresh/fresh-brew repo](https://github.com/monfresh/fresh-brew)
for more information.
