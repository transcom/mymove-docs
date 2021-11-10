# Integration Test Failures

There are two (2) to receive notifications of integration test failures. 
One is in [MilMove CircleCI dashboard](https://app.circleci.com/pipelines/github/transcom/mymove) 
and the other is from the [GitHub pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) page.

## CircleCI

You will see a `Failed` notification on the dashboard page. Click on the `Failed` notification/label to see what step in the CI/CD has failed.
![Screen Shot 2021-11-09 at 2 38 48 PM](https://user-images.githubusercontent.com/1359520/141003337-a15e2cb5-2036-4752-af00-85b836dd5a44.png)

After you click on the `Failed` notification/label, you will be presented with a list of actions that were taken or are still in progress for the commit.
Click on the failed indicator to see the details of what is failing.
![Screen Shot 2021-11-09 at 2 38 56 PM](https://user-images.githubusercontent.com/1359520/141003369-e26facb8-7f45-4794-acfb-a70f107b879f.png)

These details will show the terminal output that you would see if the tests were running locally.
![Screen Shot 2021-11-09 at 3 58 47 PM](https://user-images.githubusercontent.com/1359520/141011976-2dada386-b769-4d45-aa4f-24c18c87170e.png")

Once you see these logs, you are able to look at the error messages and determine next steps to fix the failed test(s).

### Re-run 
Pushing a new commit to your branch will automatically kick off CI/CD pipeline. However, if there are no changes and you would like to re-run 
the tests you can click on `Rerun` in the upper right-hand corner of the CircleCI page.
![Screen Shot 2021-11-09 at 3 05 03 PM](https://user-images.githubusercontent.com/1359520/141004542-1ea6ff51-1312-4705-8a4b-1a97c06b5fe8.png)

Unless you know you want to re-run the entire pipeline select `Rerun` > `Rerun Workflow from Failed` is good enough. This option only re-runs
the failed tests.
![Screen Shot 2021-11-09 at 3 05 13 PM](https://user-images.githubusercontent.com/1359520/141004562-3c36af65-0851-45b7-a302-450997cfd07e.png)


## GitHub pull request
From the [MilMove GitHub pull request page](https://github.com/transcom/mymove/pulls). You can see a list of pull requests. There is a red `x` or a green checkmark indicator to 
notify if the pull request is passing checking or if there is a failing check that needs attention.
![Screen Shot 2021-11-09 at 3 02 05 PM](https://user-images.githubusercontent.com/1359520/141004355-713bd22a-596c-4270-bcf7-4d6ec0665bcd.png)

Clicking on the pull request or if you are already on the pull request page, you can see the list of checks for the pull request/branch being
run toward the bottom of the page. Similar to the pull reqest list view previously mentioned, there are red `x` or a green checkmark indicators to 
notify the user if the pull request is passing the checks or if there are failing checks needing attention.
![Screen Shot 2021-11-09 at 3 02 54 PM](https://user-images.githubusercontent.com/1359520/141004385-49e4ce35-287d-4659-83c4-30c0bcfdfeaf.png)

Clicking on the `Details` link to the right will take you to the CircleCI run for this branch where you will be able to see the details similar to 
what was shown in the CircleCI section.
![Screen Shot 2021-11-09 at 3 02 54 PM](https://user-images.githubusercontent.com/1359520/141012118-5c070f9f-e34a-4e2a-913e-e17949f519f4.png)

To re-run follow the [Re-run](#re-run) step under CircleCI.

## Help
If the user pushing a commit or performing a merge is unable to troubleshoot the issues being reported ask
[#prac-engineering](https://ustcdp3.slack.com/archives/CP6PTUPQF), [#prac-infrasec](https://ustcdp3.slack.com/archives/CP496B8DB), and/or [#on-call](https://ustcdp3.slack.com/archives/CP4U2NKRT) for help.
