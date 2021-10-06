# MilMove Documentation

[![GitHub pages deployment](https://github.com/transcom/mymove-docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/transcom/mymove-docs/actions/workflows/deploy.yml)

## Overview

This repo contains the documentation for [MilMove](https://github.com/transcom/mymove), a possible next generation version of the Defense Personal Property System (DPS). DPS is an online system managed by the U.S. [Department of Defense](https://www.defense.gov/) (DoD) [Transportation Command](http://www.ustranscom.mil/) (USTRANSCOM) and is used by service members and their families to manage household goods moves.

This website is created using [Docusaurus](https://docusaurus.io/), a React-based static site generator. Information about running and testing the MilMove app, and coding against its APIs, is located here. If you have questions or notice inaccuracies, feel to either (if you are on the project) edit the docs directly or (if you an external contractor) open an issue regarding the problem.

## Layout

- `/docs/` contains all of our documentation files (in markdown). If you are here to edit or peruse the docs, this is where you want to go.
- `/src/` contains our React components and pages. Currently, this only contains our main page. It will be rare to need to be in this folder.
- `/static/` contains all of our images and other static files. If you want to add a screenshot or other visual to your doc page, you will need to upload it to this folder.
- `/sidebars.js` contains the sidebars for our doc folders. We autogenerate our sidebars in order to minimize how often our JavaScript files need to be updated. It is highly unlikely that you will need to update this file directly.

## Running locally (on macOS)

**Prerequisites**
- A working installation of Homebrew and Apple's Command Line Tools (CLT), which
can be verified with this command:

```
brew doctor
```

It should say "Your system is ready to brew".

If you get a message about the command brew not being found, you'll need to
install Homebrew, which also installs the CLT for you:
```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

If you already have Hombrew but it’s not ready to brew, one of the most common
issues, and the first one you should fix, is missing or outdated Command Line
Tools. The outdated tools message looks like this:

```
Warning: A newer Command Line Tools release is available.
Update them from Software Update in System Preferences or run:
  softwareupdate --all --install --force

If that doesn't show you any updates, run:
  sudo rm -rf /Library/Developer/CommandLineTools
  sudo xcode-select --install

Alternatively, manually download them from:
  https://developer.apple.com/download/more/.
```

Homebrew usually provides detailed instructions for fixing things, so read them
carefully and follow their instructions. Quit and restart your terminal once the
CLT are installed.

- Direnv and Git, which can be installed with Homebrew:
```shell
brew install direnv git
```

### With Nix

1. Install Nix if you don't already have it:
```
sh <(curl -L https://nixos.org/nix/install) --darwin-use-unencrypted-nix-store-volume --no-daemon
```

Note: if you're using the Fish shell, you'll need to [complete an extra step](https://github.com/trussworks/Engineering-Playbook/tree/main/developing/nix#extra-setup-only-fish-shell-users).

2. Quit and restart your terminal
3. Clone this repo onto your machine and `cd` into it:
   ```
   git clone https://github.com/transcom/mymove-docs.git && cd mymove-docs
   ```
3. Run `direnv allow`
4. Run `nix/update.sh`
5. Run `yarn install`
6. Run `yarn start`

The site should load automatically in your browser at http://localhost:3000/mymove-docs/

### Manual setup

1. Open your terminal/command line.
2. Clone the repo onto your machine and `cd` into it:
   ```
   git clone https://github.com/transcom/mymove-docs.git && cd mymove-docs
   ```

4. If you are looking at a PR or working on a branch other than the default branch, run:
   ```
   git checkout <branch-name>
   ```

5. Install dependencies:
   ```
   brew install nodenv
   ```

   - Add `nodenv` to your terminal configuration file:
      ```
      echo 'eval "$(nodenv init -)"' >> ~/.zshrc
      ```
   - Refresh your terminal configuration:
      ```
      source ~/.zshrc
      ```
      Note that the above two commands assume you are using Zsh as your shell,
      which is the default shell on macOS. If you're using Bash, then replace
      `.zshrc` with `.bash_profile`. If you're not sure, read Moncef's guide to
      [find out which shell you're using](https://www.moncefbelyamani.com/which-shell-am-i-using-how-can-i-switch/).
   - Install a version of `node` that is 12 or above (we recommend [the same version we use on MilMove](https://github.com/transcom/mymove/blob/master/.node-version)):
      ```
      nodenv install <version>
      ```
   - Then set the global version to the one you installed:
      ```
      nodenv global <version>
      ```
   - Finally, install `yarn`:
      ```
      npm install --global yarn
      ```
   - Now you should be able to run the local site! If you're still having trouble, try adding `npx` to the start of every `yarn` command:
      ```
      npx yarn install
      ```

6. Start the app: `yarn start` (or `npx yarn start`)
7. Go to wherever it tells you to (probably http://localhost:3000/mymove-docs/) and look around!

## Deployment

This site is currently deployed using GitHub pages: https://transcom.github.io/mymove-docs/. We're using GitHub actions to redeploy whenever changes are merged to the main branch, which includes all commits that are made and saved directly in GitHub.

Be aware that GitHub pages has a _soft_ limit of 10 deploys per hour, and it is possible we could run up against this (read more about the limitations of pages here: [About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#usage-limits)). It should not have a significant affect on our day-to-day activities, however, and may never become a noticeable issue.

## API Documentation

[Please read more about how Redocusaurus is being used for API documentation.](https://transcom.github.io/mymove-docs/docs/dev/tools/redocusaurus)
