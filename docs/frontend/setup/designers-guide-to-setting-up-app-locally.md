---
sidebar_position: 1
---

# Designers's guide to setting up app locally

## Installing XCode Developer Tools

XCode is development software from Apple usually used to design and build macOS and iOS applications.  We aren't using it for that purpose but it installs other important things we need.

1. Open the Terminal application which lives inside your Finder > Applications > Utilities folder. It may be useful to drag this to your dock for quick access or you can search for it through the Spotlight icon in your menubar.

2. In the terminal copy and paste this line `xcode-select --install` and press enter.  It should prompt you to agree to the license and install XCode software.

## Installing Homebrew

Homebrew is like the app store for installing developer libraries and command line tools on a macOS computer.

1. From inside the Terminal copy and past this line `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` and press enter.

## Setting up Git

Git is the version control software we use to track changes to our code and manage collaboration.  We use Git in conjunction with GitHub, which provides a centrally hosted place where we create Pull Requests and integrate with things like CircleCi for running tests and Happo for generating visual diffs from Storybook.

Git is likely already installed on your computer but you do have the option of using one of many graphical tools to interact with it such as [GitHub Desktop](https://desktop.github.com/).  You should already have a GitHub account, which you'll need to comment on and approve pull requests on GitHub and Happo diffs.

If you are using git from the terminal it is worth configuring your user settings in case you do end up wanting to ever work on features:

1. From the Terminal set the user email and user name to match your GitHub account by changing the values in quotes below one line at a time.

`git config --global user.email "trussel@truss.works"`

`git config --global user.name "Trusty Trussel"`

## Cloning the mymove repository from GitHub

Now that we have Git installed it's time to clone the mymove repository from GitHub and make a copy with all of the history and branches on your local computer.

From the Terminal:

1. Switch to your home folder by typing `cd ~` and pressing enter.  Your home folder is located at /Users/username/ and is usually displayed on the favorites sidebar in the Finder.
2. Clone the mymove repo by copy and pasting `git clone https://github.com/transcom/mymove.git` and pressing enter.  This should create a folder named mymove inside your home folder.
3. To change folders to the newly created mymove folder run the command `cd mymove`.

Using GitHub Desktop:

1. Visit `https://github.com/transcom/mymove` in your browser and click on the green Code button that should be prominently displayed.  Click on that will have a link to "Open with GitHub Desktop"

## Installing Docker

Docker is a container framework we use for running different services like databases and the mymove app in a predictable and isolated way.  We use it to package everything together when we build and ship the app to environments like experimental, staging, and production to run on Amazon's web servers.

1. Follow this link https://download.docker.com/mac/stable/Docker.dmg in your browser that will prompt you to download the Docker installer.
2. When the download is finished, open it from your downloads folder if it didn't start automatically and follow the install instructions.
3. When it's finished, it should add a whale icon with tetris looking pieces on top.

## Installing other prerequisites

For the sake of time let's try to install all of these dependencies at once. Some of these may not be 100% necessary but it may be easier than trying to track down what's missing later.

1. From your Terminal copy and paste the command below and press the enter key

`brew install asdf awscli bash chamber jq asdf yarn pre-commit shellcheck postgresql opensc circleci direnv entr aws-vault watchman`

## Defining your environment variables with the .envrc.local

Environment variables define things such as database credentials, security certificates, API keys, and feature flags that can vary between environment (local, experimental, staging, production).

Most developers have AWS credentials that are able to keep these values synced and up to date. In the scenario you don't have AWS permissions we will need to create a file with these pre-defined values filled in. This file could become outdated as values change, get added or removed. We should take care not to share this file publicly eventhough most of the values are not the same secrets we use elsewhere.

For steps on how to setup AWS creds with Chamber click [here](https://dp3.atlassian.net/wiki/spaces/MT/pages/1249542242/0030+How+to+Manage+Secrets+with+Chamber)

## System Requirements

Click on the link to [ADR 0016 Browser Support](/docs/adrs/0016-Browser-Support.md) to view list of supported browsers.

## Installing language tools using asdf

asdf is a version manager we used to simplify installing and upgrading dependencies such as Go and Node.

To enable asdf for installing and setting the Go version run this command **from inside your mymove** folder:
```shell
asdf plugin add golang && asdf plugin add nodejs && asdf install && asdf global $(cat .tool-versions | grep golang)
```

The current tool versions being used on the project is inside the .tool-versions file.

## Hooking up your path and version managers to your terminal .zshrc file

In order for certain tools to autoload every time we open the terminal (or open a new terminal tab), we need to add them to a special file named .zshrc located in our home folder.

To create the file and open it for editing run the command `touch ~/.zshrc && open -a TextEdit ~/.zshrc`

Paste the following values at the end of your file if it is not empty and save:

```shell
source /usr/local/opt/asdf/asdf.sh
export GOPATH=${GOPATH:-$(go env GOPATH)}
export PATH=$(go env GOPATH)/bin:$PATH
eval "$(direnv hook zsh)"
```

You will need to restart your terminal or close and open a new window.

The next time you switch the the mymove folder in your terminal you will be prompted to run `direnv allow` for it to autoload the environment variables.

## Adding the custom app hostname entries

Similar to how the mymove app is broken up into different hosts in the deployed environments (admin.move.mil, office.move.mil, and my.move.mil) we need to mimic this setup in our local system.  Normally when you are accessing a locally served app you can access it by entering the localhost value in the browser URL bar but this is not true in our case.

To create unique local hosts for each app run the following command in your terminal:
```sh
echo "127.0.0.1 milmovelocal\n\
127.0.0.1 officelocal\n\
127.0.0.1 adminlocal\n\
127.0.0.1 orderslocal\n\
127.0.0.1 primelocal" | sudo tee -a /etc/hosts
```

## Setting up the database

The mymove application uses a Postgres database to store persistent data.  Locally you can run it with no test data or there are a couple of seed scenario files that are helpful to create test users, moves, payment requests, etc... to make it easier to perform different tasks.

The first time you want to start the database you need to run `make db_dev_run` to download the database Docker image.  You can check that the container named milmove-db-dev exists from the Docker dashboard in your menubar.  The milmove-db-dev container should now be green and have a status of running.

To apply migrations (think of these as all of the incremental versioned tracked changes to the database going back to 2018) and load test data you can use the command `make db_dev_e2e_populate`.  This may take a while if it is the first time but will subsequently only apply new changes when possible.

## Building the application

The first time setting up the application you will likely need to build required libraries but usually not in subsequent runs.

To build required server binaries you must run: `make build_tools && make server_build`

To build required client libraries you must run: `make client_build`

## Starting the application

The application is divided into a backend server, which is written in Go and exposes our APIs, and a frontend client that is developed in React.  To run the application we must always have both of these service running in addition to the database to access it.

In one terminal tab (command+t) you can start the server with the command `make server_run`.

In another terminal tab you can start the client with the command `make client_run`.

When the client is ready it should open a new browser window taking you to the customer homepage [http://milmovelocal:3000](http://milmovelocal:3000)

You can access the other applications such as the office or admin app at:
[http://officelocal:3000](http://officelocal:3000)
or
[http://adminlocal:3000](http://adminlocal:3000)

## Launching Storybook

To launch the standalone Storybook site use the command `make storybook` and it will become accessible at the URL [http://localhost:6006](http://localhost:6006)

## Reviewing a PR/branch

By default you have a copy of the source code of the `main` branch in your mymove folder.  This is the branch that gets autodeployed to staging when PRs are merged.  This will get out of date fairly quickly as code gets merged frequently.  To update to what is the latest code on GitHub you should run `git fetch` periodically on this branch.

Once you have synced with GitHub you want to switch to the branch of the Pull Request.  The name of the branch is found at the top of the GitHub PR page.

If the branch of my PR was named `mb-1000-create-customer-header-storybook-component` then my command would be:

`git checkout mb-1000-create-customer-header-storybook-component`

If your server and client are running when you switch between branches, it will attempt to rebuild the files on the fly.  Sometimes there will be no issues with this auto-reloading but when there is, you may need to run `git checkout .` to restore some files that weren't regenerated.

Other times if there was a new database migration you may need to repopulate your database with `make db_dev_e2e_populate`

If a a new frontend library was install in the meantime you may need to run `yarn install` or `make clean && make client_build`.
