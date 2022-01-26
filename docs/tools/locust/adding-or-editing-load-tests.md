---
sidebar_position: 9
---
# Adding or Editing Load Tests

If you want to add or edit a load test, here are the general steps (more detailed information can be found
in the rest of the documentation):

1. Start by finding (or creating) the corresponding `User` class (e.g. `PrimeUser`).
   1. See [Locustfile](./locustfile) for more info on working with `locustfiles` and `Users`.
2. Find (or create) the `TaskSet` that defines the tasks (load tests) the user will perform.
    1. We have `TaskSets` for all of our users, so you may be able to add your new load test to an
       existing class, but one thing to keep in mind is that some `TaskSets` are shared across users.
    2. If the `TaskSet` is used by multiple `User` classes, see if it makes sense for your load test
       to be run by all the users that use the existing `TaskSet` or if you should create a new
       `TaskSet` and add it to the user's `tasks` attribute.
    3. See [TaskSet](./taskset) for more info on working with `TaskSets`.
3. Add a task (a function/method decorated with the `@task` decorator) to the `TaskSet`.
    1. You should also decorate it with any tags you think are relevant to this task.
4. Run the load test and check that your task is working properly.
    1. If it is, you're good to go!
    2. See [Running Load Tests](./running-load-tests) for more info on how to run load tests.