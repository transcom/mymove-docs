# How to Deploy to Experimental or Demo

Experimental is the MilMove environment that can be used to test out a code change in a branch in a safe way. This is especially good if you'd like Product, Design, or the client to test out the change before you merge the code in. It's also a good decision to use experimental to test out particularly risky changes like changes to containers, app startup, connection to data stores, secure migrations and data loads.

Demo is the MilMove environment that can be used for things like MilMobbing, user testing, acceptance testing or other activities that are expected to keep the environment in a particular state for some length of time. 

Read more about our [deployed environments here](Deployment-Process).

## How to do it

To deploy to experimental or demo, you'll need to trigger the CircleCI workflow to include the deploy to steps specific to the environment.

Edit [the config file](https://github.com/transcom/mymove/blob/master/.circleci/config.yml) by replacing all instances of `placeholder_branch_name` with your branch name. Pay particular attention to the job name for the environment you are deploying to, `exp` vs `demo`. 

```sh
deploy_demo_tasks:
  requires:
    - deploy_demo_migrations
  filters:
    branches:
      only: placeholder_branch_name
```

vs

```sh
deploy_demo_tasks:
  requires:
    - deploy_exp_migrations
  filters:
    branches:
      only: placeholder_branch_name
``````

You'll also want to update any of the lines which refer to tests, which have comments like this:

```sh
# if testing on experimental or demo, you can disable these tests by using your branch name here
  filters:
    branches:
      ignore: placeholder_branch_name
```

The workflow for experimental and demo is as follows:

* Announce deploys to experimental in the `#experimental-env` slack channel or demo  in the `#demo-env` channel at least 20 minutes before you intend to deploy. 
* Try to get a 👍 from someone who is commonly using the environment. 
* If no one comments in that time-frame, feel free to deploy. Only one person can use the given environment at the same time. Any new deploys will overwrite what is currently in that environment.
* When you push up to GitHub and open a PR, it'll trigger the CircleCI workflow to start immediately. You can view its progress on [CircleCI's UI](https://circleci.com/gh/transcom/workflows/mymove) and clicking on your branch.

  If it has succeeded, then it should be available immediately on the appropriate environment link:
   * [Customer (Service Member) experimental](https://my.exp.move.mil/)
   * [Office experimental](https://office.exp.move.mil/)
   * [Customer demo](https://my.demo.dp3.us/)
   * [Office demo](https://office.demo.dp3.us/)

  You should also be able to check the health to verify that your branch/commit is properly deployed:
   * [Experimental health](https://my.exp.move.mil/health)
   * [Demo health](https://my.demo.dp3.us/health)
* Once you are done, announce that you are releasing the environment in the `#experimental-env` slack channel. 
* Don't forget to [clean up](#dont-forget-to-clean-up-your-branch-before-a-merge) before you merge your branch.

## I've got a server-side feature flag

You'll need to add it to the environment config file [experimental config file](https://github.com/transcom/mymove/blob/master/config/env/exp.app.env) or [demo config file](https://github.com/transcom/mymove/blob/master/config/env/demo.app.env). In [the container config file](https://github.com/transcom/mymove/blob/master/config/app.container-definition.json) you'll need to add it by using mustache syntax.

## I have a PR that must be reviewed in experimental before it can be approved

If you have a PR that must be tested in experimental to confirm that it is functioning as intended, you may leave the commit that enables the experimental deployment for the reviewers. This will allow reviewers to click "Re-Run" on the CircleCI flow to redeploy experimental whenever they are ready to test your PR.

However, each reviewer **MUST** follow the same conventions before re-running the workflow:
* Check in the #experimental-env channel that no one else is currently using the experimental environment.
* Post in #experimental-env declaring your intent to claim the environment, giving folks time to speak up if they are still using it.
* Post an update in this channel once you are done testing that the environment is once again available for others to use.

Once the reviewers are done testing, make sure to revert the environment commit as mentioned in [Don't forget to clean up your branch](#Dont-forget-to-clean-up-your-branch-before-a-merge).

## Don't forget to clean up your branch before a merge

All of the [how to do it instructions](#How-to-do-it) need to be reverted so all future branches don't get deployed to experimental or demo. Also, be sure to announce in `#experimental-env` that the environment is available for someone else to use!

## Deploy a Secure Migration to Experimental or Demo

Follow the instructions [here](https://github.com/transcom/mymove/wiki/migrate-the-database#secure-migrations-for-one-environment) to deploy a secure migration to a single environment (either demo, experimental, prod, staging).

**WARNING:** If you run a migration in experimental/demo and either change it before merging or decide not to merge it at all, the Infrasec team will need to restore the environment's database from the snapshot taken before the migration was applied. Otherwise, there could be DB changes in the environment that don’t match what’s in master or dev/stg/prd. Keep this in mind when testing migrations, and make sure to communicate with the folks in #g-database and #prac-infrasec in order to avoid unexpected complications/errors with future experimental/demo deployments. 
