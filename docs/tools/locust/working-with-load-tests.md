---
sidebar_position: 6
---
# Working With Load Tests

There are two main things to keep in mind when it comes to load testing with `locust` and how we have our load tests 
structured. In order to run a load test, you need:

* a `locustfile` which serves as the entry point and defines your `User` classes.
* a task set file which serves to define `TaskSet`s, which are the work the users should perform.

The docs below will go over each of these so that you can understand our existing files and either create more or edit
them as needed.

One thing to note is that `locust` has a concept of `host` that differs a bit from how we use it. `locust` defaults to
using `host` in the `User`/`TaskSet` context as a base domain to then add on to when you make requests, but because we
have a need to make requests outside the `User`/`TaskSet` context, we've taken a slightly different approach.

We use `locust`'s `host` value as a key to know which `mymove` server we want to target (mentioned in the 
[Running Locust Locally](./running-locust-locally) section). We use `locust`'s `host` value combined with an `Enum`
called `MilMoveEnv` to know what environment we're targeting. Then we combine it with a helper class called 
`MilMoveRequestPreparer` which helps us build proper URLs and enables us to make requests more easily in and out of the 
`User`/`TaskSet` context.

* [Locustfile](./locustfile)
* [TaskSet](./taskset)
* [Adding or Editing Load Tests](./adding-or-editing-load-tests)
* [Fake Data Generation](./fake-data-generation)