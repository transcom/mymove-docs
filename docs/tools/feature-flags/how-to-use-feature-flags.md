# How to use Feature Flags

## Introduction

MilMove uses [Flipt](https://www.flipt.io) for feature flags. See [ADR 0082 Use Flipt for Feature Flags](../../adrs/0082-use-flipt-feature-flags.md) for why Flipt was chosen and [ADR 0084 Deploy Flipt using ECS service discovery](../../adrs/0084-deploy-flipt-service-discovery.md) for how Flipt is deployed in AWS.

While MilMove uses Flipt, it has a generic feature flag API that hides most of Flipt's implementation details. This allows for using environment variables to simulate feature flags in local development without running a Flipt server and would facilitate moving to another feature flag provider in the future should that be desirable.

The feature flag data is stored in a separate, private repository `transcom/milmove-feature-flags`.

As for 2023-09-06, feature flags have not been used for a full end to end feature deployment. This document may have some gaps because of that.

### Feature Flag Evaluation

First, familiarize yourself with the key [Flipt Concepts](https://www.flipt.io/docs/concepts).

Each deployed environment (demo, exp, loadtest, stg, prd) is in its
own [Flipt Namespace](https://www.flipt.io/docs/concepts#namespaces) and only that single namespace is available in each environment.

Flipt supports two kinds of feature flags:
 * [Boolean Flags](https://www.flipt.io/docs/concepts#boolean-flags)
 * [Variant Flags](https://www.flipt.io/docs/concepts#variant-flags)

Boolean flags are for when a feature can only be turned on or off. Variant flags are for when a feature might have multiple options.

The most common [Entity](https://www.flipt.io/docs/concepts#entities) to work with is a user and that is probably how most feature flags will be used: to determine if a particular user should have access to a feature or not.

The [Context](https://www.flipt.io/docs/concepts#context) contains multiple bits of information that can by used by flipt to determine if a feature should be available to a user or not.

### MilMove Backend Feature Flag Service

A [backend service object](../../backend/guides/service-objects/overview.md) has been created for feature flags that hides the specific Flipt API. This allows for using environment variable based feature flags in local development and/or when flipt is not available.

The recommended APIs for use in the backend are `GetBooleanFlagForUser` and `GetVariantFlagForUser`. The feature flag service object sets the `entityID` for those requests to the ID of the user making the request. It populates some default information in the context, including:
  * The application name (mil, office, admin)
  * If the user is an admin user, service member, or office user
  * The [permissions](../../backend/guides/roles-and-permissions.md) of the user

As we get more experience, we can add more information to the default context of a user.

In addition, the API allows the caller to provide additional context that could be used for a specific feature flag.

For feature flags that are not specific to a particular user, use the `GetBooleanFlag` and `GetVariantFlag` APIs for full customization of the `EntityID` and `Context`.

### MilMove Backend Feature Flag Swagger API

The `GetBooleanFlagForUse` and `GetVariantFlagForUser` APIs are exposed in the internal API via the `/feature-flags/user-boolean/{key}` and `/feature-flags/user-variant/{key}` endpoints so that the frontend can query feature flag status.

### MilMove Frontend Feature Flag Component

To allow for customizing the user presentation based on feature flags, we have a `FeatureFlag` component that uses the internal API to query the feature flag status.

## Deploying Feature Flags

Each deployed environment has its own feature flag configuration. The
idea is that you can test a configuration in one environment and then
copy the relevant config to the other environment(s).

Note that each environment is in its own namespace (e.g. the `demo`
environment is in the `demo` namespace). That is configured in YAML
file, so you wouldn't want to copy an entire file from one environment
to another without ensuring that the namespace is correct for the new
environment.

### Step by step

1. Create a branch in git on the `transcom/milmove-feature-flags` repository.
1. Edit the file in the `feature_flags` directory corresponding to the
   environment
1. Commit the file and open a PR
1. When the PR is merged, the file for that environment will be copied
   to the S3 bucket for that environment. Flipt checks for updates in
   S3 periodically, and so the new settings should automagically
   appear in flipt.

If for some reason you want to force a copy (e.g. the S3 bucket has
changed), add/update a comment at the top of the file and open + merge
a PR.

See the [flipt
documentation](https://www.flipt.io/docs/configuration/storage#object)
for more on the file format.

### Local Testing

You can run flipt locally with the feature flags for testing. When running locally in development mode, the namespace is `development`.

The idea is to copy the environment you want to test from `milmove-feature-flags` to the `mymove` project and update the namespace to `development`.

```sh
# cd some/path/where/you/have/mymove
#
# now replace the namespace with `development` for local testing
# and copy it to our local dev environment
sed 's,^namespace:.*,namespace: development,' \
  < ../milmove-feature-flags/feature_flags/someenv_features.yaml \
  > config/flipt/storage/development.features.yaml
make feature_flag_docker
# now in another window you can start the server
FEATURE_FLAG_SERVER_URL=http://localhost:9080 make server_run
# and you can start the client in another window
make client_run
```

The admin console has a limited feature flag testing page you can use. Go to [http://adminlocal:3000/system/feature-flags](http://adminlocal:3000/system/feature-flags). If actually adding a new feature flag, you would want to test your code path directly.

Use the [evaluation
console](https://www.flipt.io/docs/introduction#evaluation-console) to
see if the results are what you expected. Go to [http://localhost:9080](http://localhost:9080) to see the flipt console locally.

## Updating feature flag deployments

See the `transcom/milmove-feature-flags` repository for information how to update the deployments (e.g. update the image used by flipt).
