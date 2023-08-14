---
title: "0084 Deploy Flipt using ECS service discovery"
description: "An ADR about how we deploy Flipt using AWS ECS service discovery."
---

# Deploy flipt using ECS service discovery

## Background

In [ADR 0082 Use Flipt for feature flags](./0082-use-flipt-feature-flags.md) it was agreed we would use [flipt](https://flipt.io) to enable feature flags on MilMove. Now the question is how we should deploy it to our infrastructure.

MilMove has multiple deployment environments (demo, experimental, loadtesting, staging and production) that have different uses and different tolerances for breaking changes and security measures. Ideally, each environment would be independent of the others.

## Considered Alternatives

- Deploy a single flipt instance for all environments
- Deploy flipt as a sidecar to the MilMove application
- Deploy a single flipt instance to each environment using AWS Service Connect
- **Deploy a single flipt instance to each environment using AWS Service Discovery**

## Decision Outcome: Deploy a single flipt instance to each environment using AWS Service Discovery

This section is an summary of the decision outcome.

Deploying a single flipt instance for all environments creates complications both for security and reliability reasons. It does not seem worthwhile or viable to do so.

Deploying flipt as a sidecar means we would have multiple flipt instances running in every cluster. That would mean each environment would be running ~4 flipt instances. This could work, but is a somewhat inefficient use of resources. It would only work if we can use a [s3 storage with flipt](https://github.com/flipt-io/flipt/pull/1900). It would be probably challenging to expose the (readonly) flipt UI.

As of 2023-07-24, [AWS Service Connect is not available in GovCloud](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-connect.html)

Using AWS Service Discovery means we have a single instance of flipt per environment, we should be able to find a way to expose the UI, and we have options if we don't want to use s3 storage. This option has the most upside, although it does mean we have to experiment with a new configuration we haven't used before. The sidecar option comes in a close second.

## Pros and Cons of the Alternatives

### Deploy a single flipt instance for all environments

- `+` A single installation to manage
- `-` It creates a dependency between our environments and something we run outside of that environment. This would be a new pattern and have security implications.

### Deploy flipt as a sidecar to the MilMove application

- `+` No changes needed to the ECS infrastructure
- `-` Inefficient use of resources, since it runs multiple instances of the same service
- `-` Locks us into using the S3 storage system


### Deploy a single flipt instance to each environment using AWS Service Connect

- '-' As of 2023-07-24, [AWS Service Connect is not available in GovCloud](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-connect.html), so this is a non starter.

### Deploy a single flipt instance to each environment using AWS Service Discovery

- `+` Allows Flipt UI to be exposed for troubleshooting/debugging/inspection
- `+` Efficient use of resources
- `-` Requires using a new ECS deployment configuration not currently used on MilMove
