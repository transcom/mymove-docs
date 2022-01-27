---
sidebar_position: 1
---
# Locust

## Overview

We use a tool called [locust](https://docs.locust.io/en/stable/) to load test the MilMove app. This enables us to gather
data about responses times, finding breakpoints, and assessing the overall health of the system.

There are more [docs on load testing available in confluence](https://dp3.atlassian.net/wiki/spaces/MT/pages/1439137811/Load+Testing).
The docs there cover things like deploying to AWS, looking at logs in AWS, restoring the AWS database, and locust best
practices. 

We also have a recording reviewing how to run load tests, working with load tests, etc. It's available in our Google
Drive: [Load Testing 2022-01-20 Recording](https://drive.google.com/drive/folders/1xaxzAvnyBRfg4ZLVH1mLVvhuTrjfPYjQ).

## How It Works

Locust allows us to write the logic for our load tests using python code. We define the types of users we want to use in
our load tests, the tasks they should perform, and whether a task's outcome should be considered successful or not.

When you run `locust`, you will need to define how total many users you want locust to spawn for this load test run, the
rate at which they should spawn, and which server you want to target. This can be done either via the command line or 
the web-based UI. 

See [Running Load Tests](./running-load-tests) for more information on running `locust` and 
[Working With Load Tests](./working-with-load-tests) for more information on working on the codebase.

The existing load tests only interact with APIs exposed by the MilMove app (a.k.a. the `mymove` server, both are used in
these docs). We are not testing the front-end (client/browser) as of this writing.

## Terminology

### Locustfile

Locust uses files called `locustfiles` as the entry point for your load tests. They are python files that define some 
higher level things like the types of users you want to run, custom arguments for the command line, and functions that
you want to run at different points in the `locust` lifecycle. For more information on `locustfiles` and what they
should look like, see the [Locustfile](./locustfile) page.

### User

Users in locust are defined by classes that define the attributes that distinguish users form each other, e.g. what 
tasks they should perform.

### Task

`Tasks` are the actions that you want the load test user to take. These can define things like making calls to different 
API endpoints to do things like retrieve data, make changes, etc. These can be defined at a user level, or at a 
`TaskSet` level, with some slight differences between how tasks are defined in each context.

### TaskSet

`TaskSets` are collections of `tasks` that a user can perform. For more information on `TaskSets` and what they should
look like, see the [TaskSet](./taskset) page.

### Tag

Tasks can be "tagged" with keywords that you can then use to only run load tests that match a given keyword, or set of 
keywords. Alternatively, they can be used to exclude certain load tests from running based on their tags.

## References

* [Locust Documentation](https://docs.locust.io/en/stable/index.html)
* [Original Load Testing PR](https://github.com/transcom/mymove/pull/1597)