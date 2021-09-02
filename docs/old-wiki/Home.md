Welcome to the mymove wiki!

The intention for this wiki is to share our collective knowledge on best practices and allow everyone working on the DoD MilMove project to write code in compatible styles.

If you are looking to understand choices made in this project, see the list of [ADRs](https://github.com/transcom/mymove/tree/master/docs/adr).

If you are looking to edit or add to this wiki, checkout github's [Editing wiki content](https://help.github.com/en/github/building-a-strong-community/editing-wiki-content).

## License Information (Must remain at top of this page)

Works created by U.S. Federal employees as part of their jobs typically are not eligible for copyright in the United
States. In places where the contributions of U.S. Federal employees are not eligible for copyright, this work is in
the public domain. In places where it is eligible for copyright, such as some foreign jurisdictions, the remainder of
this work is licensed under [the MIT License](https://opensource.org/licenses/MIT), the full text of which is included
in the LICENSE.md file in this repository.


## Product Overview
* **Overview of Milmove - START HERE**
* User Management

## Backend Development and Test

### Guides
* **Backend / Go Developer Guide|Backend-Programming-Guide**
* **Prime / External-facing API Guide|api-programming-guide**

### Development How Tos
* [Access a Global Application Variable](access-global-variables#how-to-access-a-global-application-variable)
* [Add Application Logging](add-application-logging#how-to-add-application-logging)
* When to use Service Objects|service-objects
* [Generate Mocks with Mockery](generate-mocks-with-mockery#how-to-generate-mocks-with-mockery)
* [handle back-end errors](handle-backend-errors#how-to-handle-back-end-errors)
* [Set Up a Feature Flag](how-to-set-up-a-feature-flag)
* [Use Optimistic Locking](use-optimistic-locking#how-to-use-optimistic-locking)

### Testing How Tos
* Testing Best Practices
* Testing Handlers
* Running server tests inside a transaction
* [Run Go Tests](run-go-tests#how-to-run-go-tests)
* [Run server_test job in CircleCI container locally](run-server-test-circle-ci#run-server-test-job-in-circleci-container-locally)
* [Setup Postman to make Mutual TLS API Calls](setup-postman-to-make-mutual-tls-api-calls#how-to-setup-postman-to-make-mutual-tls-api-calls)
* [Test the Prime API](How-to-Test-the-Prime-API-(Local,-Staging,-and-Experimental))
* [Test the Admin and Office APIs](https://github.com/transcom/mymove/wiki/Test-Admin-and-Office-APIs-with-Postman)
* Test Data Generation
* Understanding Testdatagen Functions
* How to write fast tests
* Interacting with the DB in Go server tests
* [Testing Sending Email in Devlocal](Test-Sending-Email-in-Devlocal)
* [Test Storing Data in S3 in Devlocal](Test-Storing-Data-in-S3-in-Devlocal)
* [Troubleshoot GEX Connection](troubleshoot-gex-connection#how-to-troubleshoot-gex-connection)

### CAC How Tos
* [Upload Electronic Orders Using your CAC](upload-electronic-orders#how-to-upload-electronic-orders-using-your-cac)
* [Create CAC Access (for using Prime API and uploading Electronic Orders)](use-mtls-with-cac#how-to-create-cac-access-for-using-prime-api-and-uploading-electronic-orders)
* Troubleshoot CAC Reader Issues

## Frontend Development and Test

* **Front-end / React Developer Guide|frontend**

### Development How Tos
* [Call Swagger Endpoints from React](access-swagger-endpoints-from-react#how-to-call-swagger-endpoints-from-react)
* [Store Data in Redux](store-data-in-redux#how-to-store-data-in-redux)
* [Store UI State in Redux](store-ui-state-in-redux#how-to-store-ui-state-in-redux)

### Test How Tos
* [Unit Test React Components](unit-test-react-components#how-to-unit-test-react-components)
* [Run JavaScript (Jest) Tests](run-js-tests#how-to-run-javascript-jest-tests)
* [Run End to End (Cypress) Tests](run-e2e-tests#how-to-run-end-to-end-cypress-tests)
* [Use and Run Storybook](run-storybook#how-to-use-and-run-storybook)
* How to view a move or payment request in the office app as a TOO or TIO

## Database

* Database
* SchemaSpy Database Schema Visualizer
* Using EagerPreload in Pop
* Backup an restore dev database|backup-and-restore-dev-database
* Migrate the database|Database Migrations
* Soft Delete|soft-delete
* [Configure Postico to connect to the mymove DB](https://github.com/transcom/mymove/wiki/Configure-Postico-to-connect-to-mymove-DB)

## Deployment and Developer Tooling

* [Change considerations](https://github.com/transcom/mymove/wiki/Change-Considerations)

### Developer Tooling
* [Revert a change](revert-a-change#how-to-revert-a-change)
* [Upgrade Go Version](upgrade-go-version#how-to-upgrade-go-version)
* [Run and troubleshoot pre-commit hooks](run-pre-commit-hooks#run-and-troubleshoot-pre-commit-hooks)
* Troubleshoot Precommit Hook Failures
* [Create An ECS Scheduled Task](create-an-ecs-scheduled-task#how-to-create-an-ecs-scheduled-task)
* [Manage Dependencies With go mod](manage-dependencies-with-go-mod#how-to-manage-dependencies-with-go-mod)
* [Manage Docker Locally](manage-docker-locally#how-to-manage-docker-locally)


### Deployment Tooling (AWS and GovCloud Infrastructure)
* [Deployment Process](Deployment-Process)
* [Deploy to Experimental](deploy-to-experimental#how-to-deploy-to-experimental)
* [Manage Dependabot](manage-dependabot#how-to-manage-dependabot)
* [View ECS Service Logs](view-ecs-service-logs#how-to-view-ecs-service-logs)
* [Search Cloudwatch Logs for Instance ID](How-to-Search-Cloudwatch-Logs-using-Instance-ID)
* [Searching for Application Errors](search-for-application-errors#how-to-searching-for-application-errors)
* Metrics. Documentation for application metrics.
* Anti-Virus|anti_virus. Documentation for the anti-virus solutions employed.

## Miscellaneous How Tos

* [Automatically add JIRA ID to Commit Message](automatically-add-jira-id-to-commit-message#how-to-automatically-add-jira-id-to-commit-message)
* [display dates and times](display-dates-and-times#how-to-display-dates-and-times)
* [Run Acceptance Tests](run-acceptance-tests#how-to-run-acceptance-tests)
* [Run Against S3 & CDN Locally](run-against-s3-locally#how-to-run-against-s3-cdn-locally)
* Pairing. A list of past pairing recordings.
* [Create or Deactivate Users](create-or-deactivate-users#how-to-create-or-deactivate-users)
* [Guide to Static Analysis Security Workflow](guide-to-static-analysis-security-workflow#guide-to-static-analysis-security-workflow)
* [Guide to Static Analysis Annotations for Disabled Linters](guide-to-static-analysis-annotations-for-disabled-Linters#guide-to-static-analysis-annotations-for-disabled-linters)

