**This is for historical reference only. We no longer use Loki**

- [How to Run Loki Tests Against Storybook](#how-to-run-loki-tests-against-storybook)
  * [Running tests locally](#running-tests-locally)
    + [Prereqs](#prereqs)
    + [Running Loki Tests](#running-loki-tests)
    + [If there are expected failures](#if-there-are-expected-failures)
  * [Running loki update](#running-loki-update)
    + [Running loki update in docker](#running-loki-update-in-docker)
  * [Skipping loki tests for a story](#skipping-loki-tests)

# How to Run Loki Tests Against Storybook

MilMove uses [Loki](https://loki.js.org/) for testing stories in storybook to ensure they have not changed. You can run the tests locally for verification using this document.

## Running tests locally

### Prereqs

* You will need to be able to run storybook storybook locally. See [How to Run Storybook](run-storybook.md) for details.
* You will need Docker for Mac running locally as well. You can install the latest stable version from [here](https://download.docker.com/mac/stable/Docker.dmg).
  * Detailed instructions for installation can be found in the [Docker for Mac Documentation](https://docs.docker.com/docker-for-mac/install/)

### Running Loki Tests

Ensuring that you do not have storybook running in a separate window, run storybook tests:

```sh
make storybook_tests
```

Sample output

```sh
❯ make storybook_tests
yarn run loki test
yarn run v1.19.0
$ /Users/john/projects/dod/mymove/node_modules/.bin/loki test
loki test v0.18.1
  ✔ Chrome (docker)
✨  Done in 12.02s.
```

*NOTE* If you are seeing strange failures in loki tests you can reduce `CHROME_CONCURRENCY` from 4 locally to 2 in the `docker-compose.storybook_local.yml` file and see if that helps.

### If there are expected failures

If you are working on a storybook story and have finished making changes to the story or the components used the above command will fail. You should review the results files stored in `.loki/current`, `.loki/reference`, and `.loki/difference` directories. 

If the changes are as expected, you will need to start the storybook server locally first (see instructions below for Running loki update), then run the following command to update the reference files. 

```sh
make loki_approve_changes
```

## Running loki update

You may see errors as below when running `make storybook_tests` or in CI.

```sh
storybook_tests_1  |  FAIL  chrome.app/chrome.laptop/Components|TabNav
storybook_tests_1  |        default
storybook_tests_1  |        Invalid file signature
storybook_tests_1  |        withTag
storybook_tests_1  |        No reference image found
...
storybook_tests_1  |  FAIL  chrome.app/chrome.iphone7/Samples|Form
storybook_tests_1  |        personal info
storybook_tests_1  |        Invalid file signature
storybook_tests_1  |  RUNS  chrome.app: Running tests
storybook_tests_1  |  FAIL  chrome.app
storybook_tests_1  | Visual tests failed
storybook_tests_1  | You can update the reference files with:
storybook_tests_1  | loki update --storiesFilter="^Components\\|TabNav withTag\$" --host="storybook"
storybook_tests_1  | error Command failed with exit code 1.
```

If you do you will need to do the following to resolve it

* Start storybook server locally `make storybook_docker` or `yarn storybook`
* Run `yarn loki update --storiesFilter="^Components\\|TabNav withTag\$"` **NOTE** You will need to update the filter as described in the error message
* Run `make storybook_tests`, this may still fail as the above will run the update outside of docker
* Run `make loki_approve_changes`
* Commit the new or changed `.loki/reference` images.

### Running loki update in docker

If you need to run `yarn loki update` you can do so in docker using the following steps

* Make sure you have the storybook image built (NOTE if you have run `make storybook_tests` recently you don't need to do this), run `docker-compose -f docker-compose.storybook.yml -f docker-compose.storybook_local.yml build --pull storybook`
* Open a shell session inside a docker container `docker run -v /Users/<yourusername>/projects/dod/mymove/.loki:/home/circleci/project/.loki -it --rm mymove_storybook bash`
* Start storybook in the background `yarn storybook --ci &`
* Run update or other loki command `yarn loki update`
* Run `exit` to leave the container

## Skipping loki tests for a story

Sometimes you may want to exclude a single story or component from running visual regression tests because of flaky results.  We'll assume you are using the newer [Component Story Format](https://storybook.js.org/docs/formats/component-story-format/) instead of the deprecated `storiesOf` way of doing things.

To skip all of the stories of a particular component you should add the skip flag to the default parameters block:

```jsx
export default {
  title: 'Components|Component Name',
  component: ComponentName,
  parameters: { loki: { skip: true } },
};

export const Simple = () => (
...
);
```

To skip only an individual story, attach the parameters to the exported story object:
```jsx
export default {
  title: 'Components|Component Name',
  component: ComponentName,
};

export const Simple = () => (
...
);

Simple.story = {
    parameters: { loki: { skip: true } },
};
```
