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

## Running locally (on MacOS)

1. Open your terminal/command line.
2. Clone the repo onto your machine:
   ```
   git clone https://github.com/transcom/mymove-docs.git
   ```
   - If you get a bizarre error about "xcrun", try: `xcode-select --install` and run through the full installation of the MacOS command line tools.
   - If you need to install `git`, please follow these instructions: https://git-scm.com/download/mac

3. Change into the repo directory: `cd mymove-docs`
   ```
   cd mymove-docs
   ```

4. If you are looking at a PR or working on a branch other than the default branch, run:
   ```
   git checkout <branch-name>
   ```

5. Install dependencies:
   ```
   yarn install
   ```
   - If you need to install `yarn`, first check if you have Homebrew, the MacOS package/software manager: `which brew`
      - If you don't get a response, you need to install it:
         ```
         /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
         ```
   - Then check if you have `node` or `nodenv`: `which node`, `which nodenv`
      - If you have `node`, continue on. If not, first install `nodenv`:
         ```
         brew install nodenv
         ```
      - Add `nodenv` to your terminal configuration file:
         ```
         echo 'eval "$(nodenv init -)"' >> ~/.bashrc
         ```
      - Reset your terminal configuration:
         ```
         source ~/.bashrc
         ```
      - Install a version of `node` that is 12 or above (I recommend [the same version we use on MilMove](https://github.com/transcom/mymove/blob/master/.node-version)):
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

[Please read more about Redocusaurus is being used for API documentation.](https://transcom.github.io/mymove-docs/docs/dev/tools/redocusaurus)
