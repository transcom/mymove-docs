# How to handle reverting in main while there is an active integration branch

## Introduction

MilMove's development pipeline currently deploys to a separate, integration environment for testing prior to moving to staging and production. This is handled in a branch that is not main, but rather [integrationTesting](https://github.com/transcom/mymove/tree/integrationTesting). To get changes released to production, it must be merged to this branch, deployed to the environment via CI/CD successfully passing automated testing, and then manually tested and receive Product Owner Acceptance (POA). Then a pull request to the main branch is opened up, referencing the prior approvals to the integration environment, and if the code changes line up it will be approved, merged to main, deployed to staging, and then held until production release.

## How to revert from main properly
In the event of an urgent change needing to skip the integration environment step, we can open a pull request directly to main to deploy as fast as possible to the staging and production environments. This is best reserved for emergency hot fixes.

In the event it is not an emergency and you've got some code that got pushed to staging (main) and is on hold for production release that you need to get out before being released, you need to notify your scrum master and the development lead. Typically they will already be aware, but if not then immediately inform them not to release to production yet as you need to get some code out of the pipeline. The best way to handle it in this scenario is not to revert immediately from main, but to follow *almost* the typical CI/CD pipeline. 

The best approach is to open a new branch with a base of main, create a single commit that is the revert of your merge to main `git revert ${sha}`, and then push. Now create a new branch with a base of integration, merge your "-main" branch you just created in to preserve the git history. **DO NOT CHERRY PICK THIS COMMIT**. Then make a new pull request to the integration environment with that single commit. Then advise the developer channel (not just your team) that you need to get a revert to main and need to get it through integration first. Once approved and your revert is in the integration branch, immediately open up a similar pull request to main with that branch you initially made.

## How does this work
If you were to revert from main first and not integration under the assumption that since it's in integration it's fine, it doesn't need to be reverted there, then the moment another developer merges their main branch into their integration branch things will begin to fall apart. At worst it will pull in your revert and break everything in integration, or at best cause annoying merge conflicts not just for one developer, but any and all developers actively merging main to integration before a resolution has been pushed.

By making a revert on main and merging it into integration, you are getting ahead of the conflicts and saving other developers while preserving git history.

This cleans the slate of any faulty code and allows you, as the developer, to make a new branch that will re-enable your code and introduce fixes for the deployment pipeline.

## How to re-enable what you reverted
Just like how you reverted the code in the first place, revert your revert and push it through the pipeline. If you need to fix your code, your first commit in your development branch will be `git revert ${sha}`, with that sha being your initial revert. This reintroduces your changes while preserving git history. Then your new branch will start with re-enabling the code that was removed, then followed by commits that fix whatever was broken.
