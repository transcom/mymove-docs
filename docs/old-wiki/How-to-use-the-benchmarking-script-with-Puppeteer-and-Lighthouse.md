# Description

The benchmarking script was created to capture performance metrics for our application, Milmove, in order to create a baseline on how the application performs currently and what we can improve on. This [feature story](https://dp3.atlassian.net/browse/MB-3776) captures the initial work on what kind of metrics we want with the intent of capturing metrics for the document viewer that the TOO/TIO pages uses.

The benchmarking code now lives in a seperate repository from mymove at [trancom/milmove-browser-benchmarking](https://github.com/transcom/milmove-browser-benchmarking).

##  Motivation

A [visit on base to a transportation office](https://docs.google.com/document/d/1qCYlnZHcMmqQkc4-3XDECW55VU0pBMrwYYU-S87_O0s/edit) by Truss's engineers and designers revealed that office users have slow internet connections. The motivation is to make sure the document viewer is performant enough for our office users, therefore, an automated benchmarking script was created to capture performance of the document viewer. The script can be expanded to audit the entire application as well.

# How it works

Libraries that the benchmark script uses:
* [Commander](https://github.com/tj/commander.js)
  * > node.js command-line interfaces made easy
  * Used to create a command line interface to interact in the terminal.
* [Puppeteer](https://github.com/puppeteer/puppeteer)
  * > Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.
  * Used to authenticate users for the application, simulate throttling of network and gather performance metrics through the devtools.
* [Lighthouse](https://github.com/GoogleChrome/lighthouse)
  * > Lighthouse analyzes web apps and web pages, collecting modern performance metrics and insights on developer best practices.
  * Used to gather browser metrics, simulate throttling of network and suggestions to improve the application.

## 🚨 Pre-requisites 🚨
The script only works if the server and client are running. The database will also need to be migrated. Run the following commands before running the benchmark script:
```bash
make db_bandwidth_up
make server_run client_run
```

### Optional
The script is able to capture the AWS S3 network when fetching the document. To enable the AWS S3 connection, do the following:
* Uncomment `export STORAGE_BACKEND=s3` in the `.envrc` file.

In the terminal:
* `direnv allow` to reload configs.
* `aws-vault exec transcom-gov-dev -- make db_bandwidth_up` to upload documents to S3. An AWS account is required.
* `aws-vault exec transcom-gov-dev -- make server_run` to run the server.
* `make client_run` to run the client.

## Using the `benchmarking.js` script

### TL;DR;
Run in the terminal in the `milmove-browser-benchmarking` directory:
```bash
node benchmarking.js run -v
```
This will run the script testing the TOO document viewer page using the defaults defined in the `config.json` file.

The script will return some metrics after it finishes:
![benchmark result example](/img/benchmark/benchmark_result_1.png)

### Directory structure
The `milmove-browser-benchmarking` directory contains:
* `config.json` a json configuration file to define settings to use in the script. Add/Edit properties here.
* `constants.js` a js file that contains constant definitions and schema definitions to be used in the script. Add/Edit properties here. If modifying the `config.json` file, make sure to keep the `schema` constant updated as well.
* `scenarios.js` a js file that contains functions to gather metrics. Add/Edit how we gather metrics here.
* `benchmarking.js` a js file that is the main command line interface. Add/Edit options and commands here.

### Script options
All options running `node benchmarking.js run`
* `-s, --scenario <scenario>` scenario is the page or workflow being tested (choices: "too-orders-document-viewer", "tio-payment-requests-document-viewer", default: "too-orders-document-viewer").
* `-m --measurement-type <type>` specifies the kind of performance output metrics to measure (choices: "total-duration", "network-comparison", "file-duration", default: "total-duration").
* `-h --host <host>` base host url to use including port (default: "http://officelocal:3000").
* `-v --verbose` shows verbose debugging info (default: false).
* `-r --save-reports` save the reports from lighthouse and performance trace json files (default: false).
* `--help` display help for command.

### Scenarios
There are currently two scenarios the script supports by using the `-s --scenario <scenario>` option:
* `too-orders-document-viewer` is the default. Runs Puppeteer and Lighthouse to gather metrics from the TOO orders document viewer page.
* `tio-payment-requests-document-viewer` is similar to the TOO document viewer. The difference is the TIO document viewer shows the payment request service items.

### Measurement types
There are currently three measurement types the script supports by using the `-m --measurement-type <type>` option. Properties `network` and `fileSize` are specified in the `config.json` will be used:
* `total-duration` gather metrics from the specified scenario page , `network` profile type (default: fast), and  `fileSize` type (default: large).
* `network-comparison` gather metrics by running though each `network` type defined (fast, medium, slow) and uses the defined scenario page, and `fileSize` type (default: large).
* `file-duration` gather metrics by running through each `fileSize` type defined (large, medium, small) and uses the defined scenario page, and `network` profile type (default: fast).

### Network profiles
There are three network profiles defined to gather metrics from the document viewer:
* `fast` is about 10 MB/s.
* `medium` is about 5 MB/s.
* `slow` is about 1 MB/s.

### File sizes
There are three file sizes defined to gather metrics from the document viewer located `pkg/testdatagen/testdata/bandwidth_test_docs`:
* `large` is about 25MB image.
* `medium` is about 2MB image.
* `small` is about 150KB image.

### Viewing the performance trace and lighthouse report saved
Two reports can be generated using the `-r --save-reports` option saved in the `reports` directory:
* `performance-trace.json` is the chrome devtools performance trace. This file can be viewed in the chrome devtools `Performance` tab or [the web performance trace viewer](https://chromedevtools.github.io/timeline-viewer/).

![Image on how to load performance trace](/img/benchmark/how_to_load_performance_trace.gif)

* `lighthouse-report.json` is the chrome devtools lighthouse report. This file can be viewed in the chrome devtools `Lighthouse` tab or the [web lighthouse report viewer](https://googlechrome.github.io/lighthouse/viewer/).

![Image on how to load lighthouse report](/img/benchmark/how_to_load_lighthouse_report.gif)

## Metrics gathered
The following are the metrics gathered:
* `🏁 Peformance timing (seconds)` captures the total page navigation + all resources downloaded on page load. This is gathered from the [browser performance api](https://developer.mozilla.org/en-US/docs/Web/API/Performance).

The rest are gathered from [Lighthouse](https://web.dev/lighthouse-performance/#metrics):
* `🎨 Largest Contentful Paint (seconds)` "LCP measures when the largest content element in the viewport is rendered to the screen. This approximates when the main content of the page is visible to users". [More here](https://web.dev/lighthouse-largest-contentful-paint/).
* `👆 Time To Interactive (seconds)` "TTI measures how long it takes a page to become fully interactive." [More here](https://web.dev/interactive/).
* `⌛️ Total Blocking Time (milliseconds)` "TBT measures the total amount of time that a page is blocked from responding to user input, such as mouse clicks, screen taps, or keyboard presses." [More here](https://web.dev/lighthouse-total-blocking-time/).

## Additional resources
* Performance API: https://developer.mozilla.org/en-US/docs/Web/API/Performance
* Research on tooling: https://docs.google.com/document/d/1qF8fLZOKUAbDXGiMwWF4J2OjRzaQG9wm54CivZjpqv8/edit#heading=h.3emrnnq244df
* Puppeteer: https://github.com/puppeteer/puppeteer#puppeteer
* Puppeteer API: https://pptr.dev/
* Recipes for Puppeteer and Lighthouse: https://github.com/addyosmani/puppeteer-webperf
* Lighthouse: https://github.com/GoogleChrome/lighthouse#lighthouse-----
* Lighthouse throttling guide: https://github.com/GoogleChrome/lighthouse/blob/master/docs/throttling.md
* Analyzing performance trace: https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference
* Lighthouse performance audit: https://web.dev/lighthouse-performance/
* Lighthouse report viewer: https://googlechrome.github.io/lighthouse/viewer/
* Performance trace viewer: https://chromedevtools.github.io/timeline-viewer/
