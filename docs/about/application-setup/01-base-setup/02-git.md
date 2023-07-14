# Git

:::info

This section assumes git has been installed, configured, and linked to your github account already.

If not (e.g. if you are setting up a brand-new machine), follow the [official github instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

:::

Use your work email when making commits to our repositories. The simplest path to correctness is setting global config:

```shell
git config --global user.email "trussel@truss.works"
```

```shell
git config --global user.name "Trusty Trussel"
```

If you drop the `--global` flag these settings will only apply to the current repo. If you ever re-clone that repo or
clone another repo, you will need to remember to set the local config again. You won't. Use the global config. :-)

For web-based Git operations, GitHub will use your primary email unless you choose "Keep my email address private".
If you don't want to set your work address as primary, please
[turn on the privacy setting](https://github.com/settings/emails).

Note if you want use HTTPS instead of SSH for working with git, since we want 2-factor-authentication enabled, you need
to [create a personal access token](https://gist.github.com/ateucher/4634038875263d10fb4817e5ad3d332f) and use that as
your password.
