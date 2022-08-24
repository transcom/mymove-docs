---
title: '0073 Exporting the MilMove database with an ECS scheduled task'
---

# Exporting the MilMove database with an ECS scheduled task

- [**Product Brief**](https://dp3.atlassian.net/wiki/spaces/MT/pages/1802797074/Advana+Data+Warehouse+Integration)
- 🔒 **User Story:** [_MB-13238_](https://dp3.atlassian.net/browse/MB-13238)
- 🔒 **User Story:** [_MB-13183_](https://dp3.atlassian.net/browse/MB-13183)

:::info This document assumes the reader knows about the following technologies and/or jargon:
- [AWS Database Migration Service (DMS)][docs-dms].
- [AWS Lambda][docs-lambda].
- [AWS Elastic Container Service (ECS)][docs-ecs].
- [AWS Elastic File System (EFS)][docs-efs]
- We leverage the word **dataset(s)** to mean the data that we export from our
  database which can be in a number of formats.
- Streaming files to AWS S3 from memory.
- Permissions and file system to upload files to AWS S3.
- System Security and Architecture Guide (SSAG) documentation updates in
  Confluence.
    - Review and updated any ATO or STIG related requirements.
- Change Data Capture (CDC) to send incremental changes.

[docs-efs]: https://docs.aws.amazon.com/efs/index.html
[docs-ecs]: https://docs.aws.amazon.com/ecs/index.html
[docs-dms]: https://docs.aws.amazon.com/dms/index.html
[docs-lambda]: https://docs.aws.amazon.com/lambda/index.html
:::

## Background

As part of the Advana Data Warehouse Integration effort, MilMove infrastructure must support exporting data from the MilMove database to an S3 bucket owned by Advana. This ADR concerns the methods with which the data is pulled from the database and exported to an S3 bucket to be shared with Advana. This ADR does not aim to completely address data transformation or anything more precise than exporting the entire MilMove database, but such concerns may be taken in consideration when choosing an outcome that may or may not be more conducive to future reworks.

### Fits into our current tech stack

In general, the objective is to choose a solution that meets or prioritizes most
of the following criteria. We would like to have infrastructure changes that are
already used in the codebase. These include ECS and Lambda functions. We
currently leverage ECS cluster for the application, webhook-client, migrations,
and scheduled tasks. We also currently use Lambda for a number of functions as
well. So there is prior-art in the MilMove project to leverage either ECS or
Lambda for specific one-off tasks such as exporting datasets from the database.

There are further technical approaches here when it comes to pushing the
datasets over to S3. We can rely on saving the dataset being exported to an
ephemeral or persistent file system. This option is _the non-streaming option_
for handling the datasets. There is a second option which streams datasets
directly to S3. This option is _the streaming option_. The non-streaming option
at the time of this writing will require some minor changes to our configuration
for ECS tasks. This change has the potential to affect the MilMove SSAG in order
to support ECS Fargate engine tasks from running both as a non-root user and
with a non-writable root file system.

### Low complexity and is easily updated in the future

We don't want to build solutions which would require an extensive rewrite of the
solution proposed for this ADR. This means that any alternative here will need
to be weighed against the level of effort it would cause the teams to restart
the work from scratch. This means that we will need to consider alternatives
which help achieve the goals of incremental changes using a custom CDC solution.
**This does not mean that the chosen alternative needs to implement these
changes. This is mostly to be able to talk about the pros and cons of a given
solution.**

### Doesn't negatively impact the security of the application

The alternatives here must not impact the security of the application
negatively. Currently our ECS tasks run within a non-root and unprivileged user.
This is further secured by our disabling of having a writable root file system.
In order to bypass these restrictions, some of the alternatives introduce the
need of mounted Bind Points or AWS EFS volumes. These technical details will
require more infrastructure and additional changes to our SSAG document
depending on the alternative chosen.

### In conclusion

In conclusion, the alternatives presented below are weighed by their pros 🟩
and cons 🟥. Out of the decision outcomes section, we will choose a proposed
solution and place it under the **Proposal:** heading. Within this section, we
will go into further technical details and possible implementation details.
These extra details are not done for all of the proposed alternatives. Instead
we rely on the pros and cons of the alternatives to relay that information.

## Considered Alternatives

**Bold text is the chosen alternative**.

- Using Lambda or ECS: Save the dataset to a file system then upload to S3
- Using Lambda or ECS: Stream the dataset directly to S3 in-memory
- Have AWS save an RDS Snapshot automatically and place in S3 bucket
- **Have AWS DMS save datasets directly into S3 as a data migration target**

## Decision Outcome

> This section below still needs some work

The AWS DMS solution sounds promising and sounds like it might hit all of our
criteria that we need such as CSV output, CDC level change tracking, and
automated S3 bucket replication of our database. The work required here will be
that we will need to have a replication policy on the S3 bucket that we
configure to be used as the target for the data migration.

### Proposal: Have AWS DMS save datasets directly into S3 as a data migration target

We've chosen the AWS DMS alternative. It is a solution that targets all of the
talking points above in the Background section. Because this solution is owned
and operated by the AWS infrastructure, it will require less work from Trussel
engineers regardless of InfraSec or AppEng designation. It also skips the
initial step of sharing the entire database with Advana which is less effort on
Truss to provide a dataset every 12 hours to Advana. This solution uses CSV
files to track the changes made to the database using a custom CDC solution that
tracks all changes made to the database and captures them in easily consumable
CSV files.

#### Fits into our current tech stack

There's an AWS DMS Terraform module that InfraSec can leverage for setting up
DMS within our infrastructure.

[gh-aws-dms-module]: https://github.com/terraform-aws-modules/terraform-aws-dms

#### Low complexity and is easily updated in the future

Because AWS DMS will handle the actual tasks here, Truss engineers are only
tasked with setting up the automation and not being responsible for actively
maintaining it.

#### Doesn't negatively impact the security of the application

The impacts on our security posture for the MilMove application are impacted in
the following ways. We will need to configure our AWS S3 bucket in ways that
make sense for the Advana replication work _and_ the DMS target integration
work. [This means that we will have prerequisites for using S3 as a
target][docs-aws-prereq-s3]. [There are also some limitations to consider when
using S3 as a target][docs-aws-limitations-s3].

> Let's talk about we'll need to configure for our S3 buckets and what
> limitations this presents. How does this affect security?

The major security changes for our S3 bucket will be that the migration task for
DMS will require the S3 bucket to have both **write** and **delete** access to
the S3 bucket that is used as a target. [This language is explicitly called out
in the Security section of the AWS DMS documentation][docs-aws-dms-security].
The IAM role used for the migration must also be able to perform the
`s3:PutObjectAcl` API operation as well.

> So it seems to me that there's a ton of work that will go into talking about
> S3 in this section. So let's keep going.

[docs-aws-dms-prereq-s3]: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.S3.html#CHAP_Target.S3.Prerequisites
[docs-aws-dms-limitations-s3]: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.S3.html#CHAP_Target.S3.Limitations
[docs-aws-dms-security]: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.S3.html#CHAP_Target.S3.Security

## Pros and Cons of the Alternatives

### Have AWS save an RDS Snapshot automatically and place in S3 bucket

RDS has [built-in support](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CreateSnapshot.html) for creating DB snapshots. Since exporting snapshot data to an S3 bucket is not supported out of the box by Terraform, a third-party or a custom solution would have to be explored.
- 🟩 Leverages our existing AWS app architecture
- 🟥 Requires more support from InfraSec
- 🟥 RDS to S3 not supported by Terraform natively

### Using Lambda or ECS: Save the dataset to a file system then upload to S3

ECS tasks and Lambda functions are AWS tools that are great for accomplishing small tasks within the ECS environment. For this option, a simple Go function could be designed to perform a `pg_dump` and export the result to an S3 bucket with the AWS Go SDK. This function could then be added to the existing MilMove tasks binary or added as a Lambda function. This function could also be updated in the future to meet any sort of requirements, including fetching incremental changes and/or transforming the output data.
- 🟩 Leverages some of our existing AWS app architecture
- 🟩 Extremely flexible
- 🟩 Business logic entirely in Go
- 🟥 Difficult to test; ECS task deployment to experimental takes about 20 minutes and logs can be unhelpful
- 🟥 No prior architecture in MilMove for ECS tasks or Lambda functions with a file system, [Work-around](https://github.com/aws/containers-roadmap/issues/736#issuecomment-1124118127) for supporting a file system for an ECS task in the current architecture is kind of kludgy
- 🟥 **ECS Only:** Supporting a file system for an ECS task would likely have small impacts to system security
- 🟥 **Lambda Only:** There is a hard time limit with Lambda functions of 15 minutes; extra measures might need to be taken to ensure that the runtime of the function never approaches this limit

### Using Lambda or ECS: Stream the dataset directly to S3 in-memory

An ECS task or Lambda function could also stream data directly to an S3 bucket and skip saving to a file. This approach would avoid the security and workload concerns of the file-saving approach but may introduce other considerations.
- 🟩 Leverages some of our existing AWS app architecture
- 🟩 Extremely flexible
- 🟩 Business logic entirely in Go
- 🟥 **ECS Only:** Difficult to test; ECS task deployment to experimental takes about 20 minutes and logs can be unhelpful
- 🟥 Possibility for data loss if the stream is interrupted. While this might not be an issue if the entire database is exported with each run (each datasets would overwrite the last), it might have negative impacts when incremental changes would need to be retained with write-ahead logs, for example
- 🟥 **Lambda Only:** There is a hard time limit with Lambda functions of 15 minutes; extra measures might need to be taken to ensure that the runtime of the function never approaches this limit

### Have AWS DMS save datasets directly into S3 as a data migration target

AWS Data Migration Service seems to be good fit for the end goal of this feature. It supports using CDC data as a CSV directly to an S3 bucket [out-of-the-box](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.S3.html).
- 🟩 Native support for sending CDC data to an S3 bucket
- 🟩 Supported by Terraform
- 🟩 No apparent security concerns
- 🟥 May involve some difficulties with bucket versioning
- 🟥 No existing model for this in MilMove
