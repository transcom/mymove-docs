---
title: '0073 Exporting the MilMove database with an ECS scheduled task'
---

# Exporting the MilMove database with an ECS scheduled task

- [**Product Brief**](https://dp3.atlassian.net/wiki/spaces/MT/pages/1802797074/Advana+Data+Warehouse+Integration)
- 🔒 **User Story:** [_MB-13238_](https://dp3.atlassian.net/browse/MB-13238)
- 🔒 **User Story:** [_MB-13183_](https://dp3.atlassian.net/browse/MB-13183)

:::info This document assumes the reader knows about the following technologies:
- [AWS Database Migration Service (DMS)][docs-dms].
- [AWS Lambda][docs-lambda].
- [AWS Elastic Container Service (ECS)][docs-ecs].
- [AWS Elastic File System (EFS)][docs-efs]
- We leverage the word **dataset(s)** to mean the data that we export from our
  database which can be in a number of formats.
- Streaming files to AWS S3 from memory.
- Permissions and file system to upload files to AWS S3.
- System Security and Architecture Guide documentation updates in Confluence.
    - Review and updated any ATO or STIG related requirements.
- Change Data Capture or CDC to send incremental changes.

[docs-efs]: https://docs.aws.amazon.com/efs/index.html
[docs-ecs]: https://docs.aws.amazon.com/ecs/index.html
[docs-dms]: https://docs.aws.amazon.com/dms/index.html
[docs-lambda]: https://docs.aws.amazon.com/lambda/index.html
:::

As part of the Advana Data Warehouse Integration effort, MilMove infrastructure must support exporting data from the MilMove database to an S3 bucket owned by Advana. This ADR concerns the methods with which the data is pulled from the database and exported to an S3 bucket to be shared with Advana. This ADR does not aim to completely address data transformation or anything more precise than exporting the entire MilMove database, but such concerns may be taken in consideration when choosing an outcome that may or may not be more conducive to future reworks.

In general, the objective is to choose a solution that meets or prioritizes most of the following criteria:
- Fits into our current infrastructure and tech stack
- Has low complexity and is easily updated in the future
- Can scale to send incremental changes of the database later, possibly including data transformation
- Doesn't negatively impact the security of our applications
- Is reliable (e.g. mitigates data loss when services go down)
- Won't exceed duration/size constraints as the database grows (constraints might be determined in part by the solution itself)


## Proposal: We have not proposed a solution yet.

## Considered Alternatives

* Using Lambda or ECS: Save the dataset to a file system then upload to S3
* Using Lambda or ECS: Stream the dataset directly to S3 in-memory
* Have AWS save an RDS Snapshot automatically and place in S3 bucket
* Have AWS DMS save datasets directly into S3 as a data migration target

## Decision Outcome

## Pros and Cons of the Alternatives

### *Have AWS save an RDS Snapshot automatically and place in S3 bucket*
RDS has [built-in support](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CreateSnapshot.html) for creating DB snapshots. Since exporting snapshot data to an S3 bucket is not supported out of the box by Terraform, a third-party or a custom solution would have to be explored.
* `+` *Leverages our existing AWS app architecture*
* `-` *Requires more support from Infra*
* `-` *RDS to S3 not supported by Terraform natively*

### *Using Lambda or ECS: Save the dataset to a file system then upload to S3*

### *Using Lambda or ECS: Stream the dataset directly to S3 in-memory*
Most of what could be accomplished with an ECS task might be possible with a Lambda function. The work involved here may include using a [existing Lambda function](https://github.com/jameshy/pgdump-aws-lambda), configuring it with access to the database and S3 bucket, and possibly configure EFS in the future.
* `+` *An existing solution might be sufficient out-of-the-box with little configuration work*
* `+` *There is prior architecture for lambda functions in our repo*
* `-` *Possibility for data loss if the stream is interrupted. While this might not be an issue if the entire database is exported with each run (each dump would overwrite the last), it might have negative impacts when incremental changes would need to be retained with write-ahead logs, for example*
	* In order to mitigate this possibility, we might want to save to an EFS in addition to sending it to the S3 bucket.
* `-` *There is a hard time limit with lambda functions of 15 minutes; extra measures might need to be taken to ensure that the runtime of the function never approaches this limit*

### *Have AWS DMS save datasets directly into S3 as a data migration target*