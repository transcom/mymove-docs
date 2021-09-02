## Overview

Load testing is the process of simulating large numbers of users on MilMove so that we can evaluate how the system is standing up against high demand. Our main objectives currently are to measure response times and identify any breaking points for the application.

All of our load tests will be run against the experimental deployment of MilMove using a [custom-built Locust app](https://github.com/transcom/milmove_load_testing). This app will be running on the computer of the developer who is initiating the test (a further iteration of this project would be to host the Locust app so it can run remotely). Considerations for running the tests:

* Ensure that **no one else is using the experimental environment** during the load tests. 
  
  We want our data to be consistent and comparable. We will accomplish this by following our previously established guidelines for claiming experimental.
* Ensure that we **restore the experimental database** to its previous condition after the test has completed. 

   Each load test will add thousands of moves to the database, so we need to be able to clear this information out to prevent the system from being overburdened after just a few tests. We also do not want to interfere with data entered into the system by other users for their testing purposes.

**The test will be run Thursday mornings at 6AM Pacific Time**, but it may be rescheduled depending on folks' availability. Our test parameters are set as environment variables in the `prime-exp-reporting` service of our `docker-compose.yaml` file, seen here: https://github.com/transcom/milmove_load_testing/blob/03bb152dc1e78e5c15eaedb807af1355f960063d/docker-compose.yaml#L17-L25

At the time of editing this page, these settings mean:

* Each test will last 2 hours. 
* Each test will spawn 1000 users at a rate of 10 users/second. 
* The test will run in the developer's console headless, without the web UI.
* Reports will be saved in .csv format after each test. You can find past reports in [Google Drive](https://drive.google.com/drive/folders/1v7WZc5x074mWaCPbZnq1K7RI5JINH1O8).

## Process

If you are the engineer in charge of running the load test in a given week, please follow these steps:

### Early in the week (Monday/Tuesday)

1. Create a Jira ticket for the Infra On-Call team member for the week. You can use the pre-filled chore [here](https://dp3.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10000&issuetype=10002&labels=team-infra&priority=3&summary=Load%20Testing%3A%20Monitor%20and%20Restore%20Experimental%20Database%20YYYY-MM-DD&description=Load%20testing%20will%20be%20run%20against%20Experimental%20on%20MM%2FDD%2FYYYY.%0A%0ADuring%20this%20time%2C%20the%20Infra%20On-Call%20team%20member%20will%20need%20to%20be%20available%20to%20respond%20to%20any%20issues%20or%20critical%20failures%20that%20may%20arise.%20They%20will%20also%20need%20to%20restore%20the%20Experimental%20DB%20to%20its%20previous%20state%20after%20the%20test%20completes.%0A%0AInfra%20guides%3A%0Ahttps%3A%2F%2Fdocs.google.com%2Fdocument%2Fd%2F1sLcOyuFJdMq-bBqjNDfZGkFO-m9S5BdG0R9vuAWxYxA%2Fedit%0Ahttps%3A%2F%2Fgithub.com%2Ftranscom%2Ftranscom-infrasec-com%2Fblob%2Fmaster%2Fdocs%2Frunbook%2F0016-restoring-db-to-known-snapshot.md%0A%0AExperimental%20DB%20Snapshot%3A%0A%3Cpending%3E%0A) to streamline this process. These are the values you should have:
   * **Issue Type:** Chore
   * **Summary:** Load Testing: Monitor and Restore Experimental Database `<YYYY-MM-DD>` 
   * **Label:** team-infra
   * **Priority:** Medium
   * **Description:** A prefilled description

   These are the values you should fill in:
   * **Reporter:** You (the app eng running the test)
   * **Assignee:** The on-call infra eng - you can find who this is using [PagerDuty](https://movemil.pagerduty.com/schedules#PF78S2T).

   Copy the link to the new ticket and share it in #prac-infrasec channel. Tag their PM, Paul Sackley, to make sure he sees it. 

### The day of (Thursday)

2. On the day of, post in #experimental-env to alert the team that you will be claiming experimental for the next 4 hours (the buffer time is for infra to restore the database after the test). In general, follow [these guidelines for deploying to experimental](deploy-to-experimental).

3. Once you have claimed experimental, checkout the `exp-load-testing` branch in `mymove` and ensure that it is up-to-date with the `master` branch. You can do this by running `git merge origin/master`.

4. In GitHub, identify the [existing PR for this branch](https://github.com/transcom/mymove/pull/5937). 
   * If there were changes merged in from `master`, make sure you push those up. That will trigger the experimental deployment.
   * If there were no changes, navigate to the [CircleCI workflow for this branch](https://app.circleci.com/pipelines/github/transcom/mymove?branch=exp-load-testing) and click "Rerun Workflow from Start" to trigger the redeploy.

5. Wait for experimental to redeploy. Once it has, navigate to the `deploy_exp_migrations` job in the CircleCI workflow. 

6. Save the output from the "Snapshot database" step in this job, and open the Jira ticket you created in step one. In the **Description**, under the "Experimental DB Snapshot:" line, create a code block and paste in the full text of that output. Click "Save". Infra will use this information to restore the database later. 
   * **NOTE:** We may be able to automate the process of grabbing this info from CircleCI and then updating this ticket. Someday.

7. Navigate to your `milmove_load_testing` repo, checkout and update the `master` branch, then enter the command:
  ```sh
  make exp_load_test
  ```
   This will start the pre-defined load test. Go get a coffee or a foot massage and sit tight for the next 2 hours.

8. At 2 hours, check on the test. Verify that the reports and logs have been saved as files in the `static/reports` folder. You should see these five files: 
   * `<YYYY-MM-DD-HHIISS>_exceptions.csv` - contains a record of any Python exceptions that may have been raised during the test. Ideally, this file should be empty.

   * `<YYYY-MM-DD-HHIISS>_failures.csv` - contains a record of all of the request failures to occur during the test. We expect many 4xx responses, and there are some 500 errors that correspond to bugs we are aware of. Any other failures are unexpected and should be investigated after the test.

   * `<YYYY-MM-DD-HHIISS>_logs.txt` - a plain-text dump of the all the output logs from the test. Currently, we are only printing logs with a level of WARNING or above, but this can be adjusted if we want to see more info or debug logs.

   * `<YYYY-MM-DD-HHIISS>_stats.csv` - contains an aggregated record of the request statistics from the tests. Columns include # requests attempted per endpoint, # failures per endpoint, average response time, and so on.

   * `<YYYY-MM-DD-HHIISS>_stats_history.csv` - the request statistics _over time_ during the test. This is important to check to understand how consistent the failure rate was. Did it stay around the same failure % throughout the test? Or was there a sudden drop off with a rapid increase in failures?

   `<YYYY-MM-DD-HHIISS>` should correspond to the date and time when you executed the load test. Move these files into a folder named for the current date in the [Load Testing GDrive folder](https://drive.google.com/drive/folders/1v7WZc5x074mWaCPbZnq1K7RI5JINH1O8).

   **NOTE:** If your load test ended prematurely, either from an unexpected error or a manual interrupt (CTRL+C), you may need to manually copy over the reports from the docker container with this command:

  ```sh
docker cp mmlt_prime_exp_reporting:/app/static/reports static/
  ```

   If the system experiences a critical fail and crashes, let infra know ASAP so they can begin the recovery process. This may involve a lot of work to diagnose the problem and fix it for the future, but we can view this as a valid outcome of the load test. We do not have to have a successful test to get valuable results.

9. Tag the infra on-call person in #experimental-env to let them know that the load test has completed and they can rollback the experimental database (there is a doc for this process somewhere).

10. Infra will revert the database and then notify folks in #experimental-env to let them know that experimental is open for use again.
