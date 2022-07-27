---
title: '0073 Choose a Method for Exporting Database Data'
---

# Choose a Method for Exporting Database Data

- [**Product Brief**](https://dp3.atlassian.net/wiki/spaces/MT/pages/1802797074/Advana+Data+Warehouse+Integration)
- 🔒 **User Story:** [_MB-13238_](https://dp3.atlassian.net/browse/MB-13238)
- 🔒 **User Story:** [_MB-13183_](https://dp3.atlassian.net/browse/MB-13183)

As part of the Advana Data Warehouse Integration effort, MilMove infrastructure must support dumping and exporting data from the MM database to an S3 bucket owned by Advana. This ADR concerns the methods with which the data is pulled from the database and exported to an S3 bucket to be shared with Advana. This ADR does not aim to completely address data transformation or anything more precise than exporting the entire MM database, but such concerns may be taken in consideration when choosing an outcome that may or may not be more conducive to future reworks.

## Proposal: AWS ECS Tasks w/Golang + S3
This solution would involve creating an ECS task with a Docker container that is responsible for the database dump and export. The Docker image would contain a Golang binary that can run pg_dump and subsequently use the AWS Go SDK to upload the resulting dump to an internal S3 bucket every 12 hours. A replication rule for the internal S3 bucket would then share the data with Advana. This approach has some downsides, including its higher cost of effort both immediately and long-term since it would require custom code to perform database dumps. It would also potentially expose production data in the S3 bucket. However, it would leave the door open for a more precise solution in the future; for example, if there were a need to export only some of the data, the Golang binary would simply need to be updated to meet that criteria.

## Considered Alternatives

* *AWS ECS Tasks w/Golang + S3*
* *AWS RDS snapshot+S3*
* *pg_dump*
* *AWS Glue*

## Decision Outcome

* Chosen Alternative: *AWS ECS Tasks w/Golang + S3*
* *Since the first pass of data export only requires exporting the entire database, the initial effort can be relatively low since it would mostly involve simply implementing pg_dump and the AWS SDK in Go*
* *This solution is flexible; if/when the requirements around the export data evolve, the Go binary can simply be updated to match those requirements*
* *Consequences involve slightly more effort both initially and long-term with custom exporting code*

## Pros and Cons of the Alternatives

### *AWS RDS snapshot+S3*
RDS has [built-in support](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CreateSnapshot.html) for creating DB snapshots. Since exporting snapshot data to an S3 bucket is not supported out of the box by terrform, a third-party or a custom solution would have to be explored.
* `+` *Leverages our existing AWS app architecture*
* `-` *Requires more support from Infra*
* `-` *RDS to S3 not not supported by terraform natively*

### *pg_dump*
* `+` *Low infra overhead *
* `+` *Tool currently used successfully in MilMove*
* `-` *Little flexibility with choosing what to export*

### *AWS Glue*
* `+` *Automates the extraction and transformation of data*
* `+` *Gov cloud compliant*
* `-` *Requires more support from Infra*
* `-` *Costs $$$*
* `-` *requires integrating with post to gex script*
