# Integration Test Failures

There are two (2) ways to receive notifications of integration test failures. 
One is in [MilMove CircleCI dashboard](https://app.circleci.com/pipelines/github/transcom/mymove) 
and the other is from the [GitHub pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) page.

## CircleCI

You will see a `Failed` notification on the dashboard page. Click on the `Failed` notification/label to see what step in the CI/CD has failed.

![CircleCI dashboard failed](/img/cicd/circleci_dashboard_failed_app.png)


After you click on the `Failed` notification/label, you will be presented with a list of actions that were taken or are still in progress for the commit.
Click on the failed indicator to see the details of what is failing.

![CircleCI failed check](/img/cicd/circleci_failed_check.png)

These details will show the terminal output that you would see if the tests were running locally.

![CircleCI failure details](/img/cicd/circleci_failed_details_2.png)


Once you see these logs, you are able to look at the error messages and determine next steps to fix the failed test(s).

### Re-run 
Pushing a new commit to your branch will automatically kick off CI/CD pipeline. However, if there are no changes and you would like to re-run 
the tests you can click on `Rerun` in the upper right-hand corner of the CircleCI page.

![CircleCI rerun](/img/cicd/circleci_test_failed.png)


Unless you know you want to re-run the entire pipeline select `Rerun` > `Rerun Workflow from Failed` is good enough. This option only re-runs
the failed tests.

![CircleCI rerun options](/img/cicd/cicleci_rerun.png)

## GitHub pull request
From the [MilMove GitHub pull request page](https://github.com/transcom/mymove/pulls). You can see a list of pull requests. There is a red `x` or a green checkmark indicator to 
notify if the pull request is passing checking or if there is a failing check that needs attention.

![GitHub pull requests failed checks](/img/cicd/github_pullrequests_failed_checks.png)


Clicking on the pull request or if you are already on the pull request page, you can see the list of checks for the pull request/branch being
run toward the bottom of the page. Similar to the pull reqest list view previously mentioned, there are red `x` or a green checkmark indicators to 
notify the user if the pull request is passing the checks or if there are failing checks needing attention.

![GitHub pull request failed checks](/img/cicd/github_pr_failed_check.png)


Clicking on the `Details` link to the right will take you to the CircleCI run for this branch where you will be able to see the details similar to 
what was shown in the CircleCI section.

![CircleCI failed details](/img/cicd/circleci_failed_detailed.png)


To re-run follow the [Re-run](#re-run) step under CircleCI.

## Help
If the user pushing a commit or performing a merge is unable to troubleshoot the issues being reported ask
[#prac-engineering](https://ustcdp3.slack.com/archives/CP6PTUPQF), [#prac-infrasec](https://ustcdp3.slack.com/archives/CP496B8DB), and/or [#on-call](https://ustcdp3.slack.com/archives/CP4U2NKRT) for help.

## References
* [About status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)
* [Troubleshooting required status checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/troubleshooting-required-status-checks)