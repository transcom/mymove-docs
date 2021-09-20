This document lists all the current Dockerfiles we use, their base images, and what user that image uses. It also notes why that image uses the user account it uses.

NOTE for `gcr.io/distroless/base:latest` based images these by default run with `root` locally. However, we have updated our ECS task definition (See code [here](https://github.com/transcom/mymove/blob/master/cmd/ecs-deploy/task_def.go#L581)) to override that to run with a UID of `1042` and not `root`/`UID:0`.

All docker images that are deployed must not use `root` as their user inside the container to meet Docker STIG requirements. We've updated all Dockerfiles for deployed containers to not use root. We chose not to do this as well on Dockerfiles for images that are not deployed but only used on local laptops or in our CircleCI pipeline for development and testing.

| Dockerfile    | base image  | user | Where it's used |
| ------------- |-------------| -----| --------------- |
| Dockerfile* | gcr.io/distroless/base:latest | `root` (locally) and `UID:1042` (Deployed) | When running the application when deployed |
| Dockerfile.local | gcr.io/distroless/base:latest | `root` (locally) | When running the application locally only |
| Dockerfile.migrations* | alpine:\<version\> | root | Running migrations when deploying the app, staging, experimental, and production |
| Dockerfile.migrations_local | alpine:\<version\> | root | Running migrations locally only |
| cypress/Dockerfile.cypress | cypress/base:\<version\> | root | Running cypress tests locally and in CircleCI only |
| Dockerfile.storybook | milmove/circleci-docker:milmove-app-browsers-`<SHA>` | circleci | Used when running storybook tests in CircleCI only |
| Dockerfile.storybook_local | milmove/circleci-docker:milmove-app-browsers-`<SHA>` | circleci | Used when running `make storybook_tests` or `make storybook_docker` locally only |
| Dockerfile.tasks* | gcr.io/distroless/base:latest | `root` (locally) and `UID:1042` (CircleCI / Deployed) | ECS Scheduled Tasks |
| Dockerfile.tasks_local | gcr.io/distroless/base:latest | `root` (locally) and `UID:1042` (CircleCI / Deployed) | ECS Scheduled Tasks local only |
| Dockerfile.tools | alpine:\<version\> | root | Container for tools used in e2e testing on CircleCI |
| Dockerfile.tools_local | alpine:\<version\> | root | Container for tools used in e2e testing on CircleCI local only |

\* Images that are used in deployed environments outside of local laptops or build/test pipeline in CircleCI