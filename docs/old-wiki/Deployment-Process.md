Deployment is the process of taking the local environment that the developer has on their machine and getting it up on production.

Since we don’t ever want to deploy a version of the codebase that is broken to production, we have a number of checks and balances along the way, as well as test environments.

The environments are :

* Devlocal - The environment on the developer's computer
* Staging - A shared test environment in the cloud
* Experimental - A "private" test environment in the cloud
* Demo - A "private" test/demo environment in the cloud
* Production - The live production environment in the cloud

![](/img/deployment/environments.png)

## Local Development

The work starts on the developer, Dev’s, computer. They have a version of the app, server and database that's local. They develop and test the feature locally and also create unit tests. We call this environment `devlocal`.

Typically, the postgres database is running in a docker container on the desktop. The server and apps are running on the machine and connect to the db as needed.

## Merge to Master

Dev pushes the code up to github using the pull-request process to request the team to review the code. The team reviews the change and provides feedback. Dev can update the PR with fixes as needed.

At the same time, [CircleCI](https://circleci.com/docs/2.0/about-circleci/) runs a set of tests against the new codebase. CircleCI is a continuous integration tool that automates test and deployment.

This set of tests will include any new tests that Dev has written. Circle keeps github updated with the status of the tests. Dev will wait until they have approval from a teammate and all checks pass on Circle.

The full set of tests are defined in

![](/img/deployment/github-circle-checks.png)

Once Dev has obtained approval for the change, and the tests run successfully on CircleCI, they can merge their feature to the `master` branch.

## Deploy to Staging

CircleCI will automatically deploy the new `master` version of the code to staging. The staging environment is a live environment located in GovCloud. The domain is `*.stg.move.mil`

The apps are located at

* `my.stg.move.mil`
* `office.stg.move.mil`
* `admin.stg.move.mil`

CircleCI will run a whole slew of tests again before it deploys to staging.

See the [**full CircleCI pipelines running here**](https://app.circleci.com/pipelines/github/transcom/mymove).

Here’s what that pipeline looks like, super simplified. There are many more jobs than are depicted here. Circle will pause at the stage called `approve_prd_deploy`.

![](/img/deployment/circleci-workflow.png)

### How is Staging different than Devlocal

It's important to understand how staging is different than devlocal.

* Staging is available online and runs in AWS Govcloud, more closely mimicking the production environment. Anyone can access the page my.stg.move.mil for e.g. although they may not be able to log in to office.stg.move.mil.

* Once this version of the codebase is on staging, other Milmove teams will see the new feature. If there are new bugs introduced, other teams may come across them.

* Note that only the codebase is deployed, not the contents of the database. So the database may contain different data than what Dev tested with locally. However, the schema will be the same as the migrations are applied to the staging database.

* We have limited visibility into the database, we can’t simply pull up a database app to view or make changes. All changes must happen through the server.

* The logs on devlocal are visible in your terminal. The logs on staging are visible on [Cloudwatch in AWS](https://github.com/transcom/mymove/wiki/How-to-Search-AWS-Cloudwatch-Logs-using-Instance-ID).

## Deploy to production

Twice a day, an engineer on Milmove will deploy the staged version to production. The production environment is also located in AWS Govcloud, at `*.move.mil`.

The apps are located at

* `my.move.mil`
* `office.move.mil`
* `admin.move.mil`

This deployment responsibility is assigned to one team at a time and changes teams periodically.

The deploying engineer typically does the following:

* Checks that both the customer and office site are working on staging
* Find the latest commit that has passed all tests on CircleCI
* Approves the deployment

Read more about this process in the [Deployment Playbook](https://docs.google.com/document/d/1mXHdYCdVEqqYNhSJ0_76ylJEFGErFGty8FbFaRAiyhQ).

This version of the codebase is then deployed to production, and the engineer checks that the production site is up and running.

### How is Production different than Staging

Staging is quite similar to Production, which is why it's such a useful test environment. But there are some differences.

* Production is used by actual service members or customers. Not all features may be available to them, but this is a production site.

* There are certain APIs that are disabled on production. The support API is an example of an API that is not available in production, only in staging.

* Because this is the live production environment, the database will contain actual PII and it’s worthwhile to realize that it should never be downloaded or exposed in any insecure way. Like staging however, we have no direct access to the database.

* The logs on production are visible on Cloudwatch in [Cloudwatch in AWS](https://github.com/transcom/mymove/wiki/How-to-Search-AWS-Cloudwatch-Logs-using-Instance-ID).

## Deploy to Experimental

Deploying to experimental is not an everyday part of the process but is used to test changes that could break staging for other teams. Since we share the staging environment to test, a risky change could break the site and block other team members from completing their own testing.

In that case, we use experimental which any engineer can request to use, and can expect that they'll be the only ones using this environment during the course of their testing.

Read more about [deploying to experimental here](https://github.com/transcom/mymove/wiki/deploy-to-experimental).

## Deploy to Demo

Deploying to demo is not an everyday part of the process but is used to create an environment for testing over longer periods of time (days/week vs hours). Because of the nature of some of the current demo/testing events, this environment is available for things such as MilMob and user testing.

Any engineer can request to use this environment, and can expect that they'll be the only ones using this environment during the course of their testing.

Read more about [deploying to demo here](https://github.com/transcom/mymove/wiki/deploy-to-experimental).
