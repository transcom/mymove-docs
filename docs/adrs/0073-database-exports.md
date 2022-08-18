---
title: '0073 Exporting the MilMove database with an ECS scheduled task'
---

# Exporting the MilMove database with an ECS scheduled task

- [**Product Brief**](https://dp3.atlassian.net/wiki/spaces/MT/pages/1802797074/Advana+Data+Warehouse+Integration)
- 🔒 **User Story:** [_MB-13238_](https://dp3.atlassian.net/browse/MB-13238)
- 🔒 **User Story:** [_MB-13183_](https://dp3.atlassian.net/browse/MB-13183)

As part of the Advana Data Warehouse Integration effort, MilMove infrastructure must support exporting and exporting data from the MilMove database to an S3 bucket owned by Advana. This ADR concerns the methods with which the data is pulled from the database and exported to an S3 bucket to be shared with Advana. This ADR does not aim to completely address data transformation or anything more precise than exporting the entire MilMove database, but such concerns may be taken in consideration when choosing an outcome that may or may not be more conducive to future reworks.

## Proposal: AWS ECS Tasks w/Golang + S3

This solution would involve creating an ECS task with a Docker container that is responsible for the database export and export. The Docker image would contain a Golang binary that can run `pg_dump` and subsequently use the AWS Go SDK to upload the resulting export to an internal S3 bucket every 12 hours. A replication rule for the internal S3 bucket would then share the data with Advana. This approach has some downsides, including its higher cost of effort both immediately and long-term since it would require custom code to perform database exports. It would also potentially expose production data in the S3 bucket. However, it would leave the door open for a more precise solution in the future; for example, if there were a need to export only some of the data, the Golang binary would simply need to be updated to meet that criteria.

### Dependencies for this solution

This solution is made up of a number of dependencies in both application code
and infrastructure code. This means that there will be both Golang and Terraform
code updates to the MilMove project across a number of repositories. There are
two private repositories of Terraform modules that will require InfraSec support
to be updated. The details of this is out of scope for this ADR, but please read
through [the internal 🔒 documentation][docs-create-ecs-task] on creating ECS
tasks to get familiarized with this approach.

Because of the nature of this solution, it is required that ECS tasks have a
writable file system. Currently, the ECS schedule tasks have a number of
limitations around file system writes, any binaries such as `psql-client` or
`mkdir`, and are run as non-privileged and non-root user. These limitations are
in place to leverage best practices around immutable infrastructure but also
prevent basic activities such as being able to create directories, install
software during the execution of the task, or write files to the ephemeral
storage of AWS Fargate tasks. Because of these limitations there will need to be
some modifications to the `Dockerfile.tasks` file and the `cmd/ecs-deploy`
command-line tool that exists in [the transcom/mymove repository][gh-mymove].

[docs-create-ecs-task]: https://dp3.atlassian.net/l/cp/17R7gtqv
[gh-mymove]: https://github.com/transcom/mymove

#### ATO considerations

Due the nature of the dependencies mentioned above, there will need to be
modifications to [the MilMove System Security and Architecture Guide 🔒
(SSAG)][docs-ssag]. Specifically around the concepts of running Privileged users
in order to prepare Mount Points and bind Volumes to the ECS tasks running in
Fargate. There is a known and documented limitation of the AWS Fargate engine
where Mount Points are created by default and without the ability modify at
provision time as owned by the Root user and group (`root:root`). There are a
number of request of AWS to support this using the Task or Container
definitions. There has been some progress around this but it requires the
introduction of a preliminary container to execute `chown` operations on the
Volume that is being added to the Mount Points in order to have non-root users
access the Volume within the ECS task.

:::info AWS Community discussion around this limitation and work around

The following links are to the GitHub issues around working with non-root users
_and_ using a read-only file system.

- [Support permission configuration of Mount
  Points][gh-aws-config-mp-permissions]
    - [Direct link to solution using a `permissions-init`
      container][gh-aws-config-mp-permissions-solution]
- [Support `tmpfs`][gh-aws-tmpfs]
    - [Direct link to explanation for mimicking `tmpfs`][gh-aws-tmpfs-solution]
- [AWS documentation on Bind mount examples][docs-aws-bind-mount-examples]
    - Specifically navigate to the **To provide an empty data volume for one or
      more containers**.

[gh-aws-config-mp-permissions]: https://github.com/aws/containers-roadmap/issues/938
[gh-aws-tmpfs]: https://github.com/aws/containers-roadmap/issues/736
[gh-aws-tmpfs-solution]: https://github.com/aws/containers-roadmap/issues/736#issuecomment-1124118127
[gh-aws-config-mp-permissions-solution]: https://github.com/aws/containers-roadmap/issues/938#issuecomment-868096035
[docs-aws-bind-mount-examples]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/bind-mounts.html#bind-mount-examples
:::

[docs-ssag]: https://dp3.atlassian.net/wiki/spaces/MT/pages/1251147777/System+Security+and+Architecture+Guide

##### Setting up Mount Points

Using the solutions above, the MilMove project can leverage Mount Points. They
will need to be configured in Golang rather than JSON or Terraform due to the
current architecture of our ECS tasks at the time of this writing.

##### Creating a new Docker image

Using the solutions above, a new Docker image will need to be created that does
not use `gcr.io/distroless/base` in order to have basic Bash support to modify
the permissions in the Volume and Mount Points definitions to allow access to
the ECS tasks non-root user defined in `cmd/ecs-deploy/task_def.go` in the
`transcom/mymove` repository.

##### Modifying the `cmd/ecs-deploy` command-line tool

## Considered Alternatives

* *AWS ECS Tasks w/Golang + S3*
* *AWS RDS Snapshot + S3*
* *AWS Glue*

## Decision Outcome

* Chosen Alternative: *AWS ECS Tasks w/Golang + S3*
* *Since the first pass of data export only requires exporting the entire database, the initial effort can be relatively low since it would mostly involve simply implementing `pg_dump` and the AWS SDK in Go*
* *This solution is flexible; if/when the requirements around the export data evolve, the Go binary can simply be updated to match those requirements*
* *Consequences involve slightly more effort both initially and long-term with custom exporting code*

## Pros and Cons of the Alternatives

### *AWS RDS snapshot + S3*
RDS has [built-in support](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CreateSnapshot.html) for creating DB snapshots. Since exporting snapshot data to an S3 bucket is not supported out of the box by Terraform, a third-party or a custom solution would have to be explored.
* `+` *Leverages our existing AWS app architecture*
* `-` *Requires more support from Infra*
* `-` *RDS to S3 not supported by Terraform natively*

### *AWS Glue*
* `+` *Automates the extraction and transformation of data*
* `+` *Gov cloud compliant*
* `-` *Requires more support from Infra*
* `-` *Costs $$$*
* `-` *requires integrating with post to GEX script*
