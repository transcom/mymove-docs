---
sidebar_position: 8
---

# How to upgrade Node

1. Submit a PR that updates node to the new version in https://github.com/transcom/circleci-docker/. [Here's an example](https://github.com/transcom/circleci-docker/pull/130).
2. Look for the hash here: https://hub.docker.com/r/milmove/circleci-docker/tags
3. In the transcom/mymove repo, create a PR to update node. [Here's an example](https://github.com/transcom/mymove/pull/6878) && [this PR](https://github.com/transcom/mymove/pull/6904)

Things to modify:
* Bump the nodejs version in `.tool-versions` and `.node_version` (some folks may still be using nodenv to manage node)
* Modify the instances of `milmove/circleci-docker:milmove-app-` and replace the hash w/ the one found in step 2. (I used the PR branch name rather than hash so it would pull any changes I made over on the `circleci-docker` PR without having to update the hash each time I made a change)
* update `check-node-version` and `prereqs`
* Do a find and replace to update references of the prior node version with the new node version
4. Run `make clean build` and verify that the desired version of Node is being used
5. Get reviews for the 2 PRs to check your work.
6. Merge the PR from step 1
7. Find the new image hash from the Docker hub
8. Update the transcom/mymove PR to use the hash from step 7
9. Test again to make sure everything works as expected.
10. Announce in #prac-engineering that you will be updating node and any
    instructions [An example slack
    message](https://ustcdp3.slack.com/archives/CP6PTUPQF/p1624996730029000)
11. Merge the PR in transcom/mymove

# Troubleshooting

If you're getting a wrong version of node error try the following steps:
1. run `brew install nvm`
2. run `mkdir ~/.nvm` to create nvm working directory
3. add nvm to shell profile by running:
    > ```
    > export NVM_DIR="$HOME/.nvm"
    > [ -s "$HOMEBREW_PREFIX/opt/nvm/nvm.sh" ] && \. "$HOMEBREW_PREFIX/opt/nvm/nvm.sh" # This loads nvm
    > [ -s "$HOMEBREW_PREFIX/opt/nvm/etc/bash_completion.d/nvm" ] && \. "$HOMEBREW_PREFIX/opt/nvm/etc/bash_completion.d/nvm" # This loads nvm bash_completion
    > ```
4. run `nvm install 18.20.4` with the version of nodejs you want to install
5. run `nvm use 18.20.4` with the version of nodejs you want to use

If you're still encountering errors you can use nvm to uninstall the incorrect versions `nvm uninstall 18.20.2`