# How to use Feature Flags

## Introduction

:::caution

As of 2023-09-06, MilMove has not leveraged feature flags using Flipt, so feature flags are still considered experimental. Unexpected behavior may occur because of this. Please update this document with any new information after MilMove starts using Flipt.

:::

MilMove uses [Flipt](https://www.flipt.io) for feature flags. See [ADR 0082 Use Flipt for Feature Flags](../../adrs/0082-use-flipt-feature-flags.md) for why Flipt was chosen and [ADR 0084 Deploy Flipt using ECS service discovery](../../adrs/0084-deploy-flipt-service-discovery.md) for how Flipt is deployed in AWS.

While MilMove uses Flipt, it has a generic feature flag API that hides most of Flipt's implementation details. This allows environment variables to be used to simulate feature flags in local development without running a Flipt server. Additionally, this would also facilitate moving to another feature flag provider in the future should that be desirable.

The feature flag data is stored in a separate, private repository `transcom/milmove-feature-flags`.

As of 2023-09-06, feature flags have not been used for a full end to end feature deployment. This document may have some gaps because of that.

### Feature Flag Evaluation

First, familiarize yourself with the key [Flipt Concepts](https://www.flipt.io/docs/concepts).

Each deployed environment (demo, exp, loadtest, stg, prd) is in its
own [Flipt Namespace](https://www.flipt.io/docs/concepts#namespaces) and only that single namespace is available in each environment.

Flipt supports two kinds of feature flags:
 * [Boolean Flags](https://www.flipt.io/docs/concepts#boolean-flags)
 * [Variant Flags](https://www.flipt.io/docs/concepts#variant-flags)

Boolean flags are for when a feature can only be turned on or off. Variant flags are for when a feature might have multiple options.

The most common [Entity](https://www.flipt.io/docs/concepts#entities) to work with is a user and that is probably how most feature flags will be used: to determine if a particular user should have access to a feature or not.

The [Context](https://www.flipt.io/docs/concepts#context) contains multiple bits of information that can by used by Flipt to determine if a feature should be available to a user or not.

### MilMove Backend Feature Flag Service

We use the [backend service object](../../backend/guides/service-objects/overview.md) for feature flags to wrap the specific endpoints in the Flipt API. This enables environment variable based feature flags in local development, with the additional benefit of protecting against any temporary unavailability on Flipt's end.

The current APIs for in the backend are `GetBooleanFlagForUser` and `GetVariantFlagForUser`. These methods have been added in [transcom/mymove#11330](https://github.com/transcom/mymove/pull/11330). The feature flag service object sets the `entityID` for those requests to the ID of the user making the request. It populates some default information in the context, including:
  * The application name (mil, office, admin)
  * If the user is an admin user, service member, or office user
  * The [permissions](../../backend/guides/roles-and-permissions.md) of the user

As we get more experience with feature flags, more information may be added to the default context of a user.

In addition, the API allows the caller to provide additional context that could be used for a specific feature flag.

For feature flags that are not specific to a particular user, use the `GetBooleanFlag` and `GetVariantFlag` APIs for full customization of the `EntityID` and `Context`. These methods have been added in [transcom/mymove#11330](https://github.com/transcom/mymove/pull/11330).

### MilMove Backend Feature Flag Swagger API

The `GetBooleanFlagForUse` and `GetVariantFlagForUser` APIs are exposed in the internal API via the `/feature-flags/user-boolean/{key}` and `/feature-flags/user-variant/{key}` endpoints so that the frontend can query feature flag status. These endpoints have been added in [transcom/mymove#11330](https://github.com/transcom/mymove/pull/11330).

### MilMove Frontend Feature Flag Component

To allow for customizing the user presentation based on feature flags, we have a `FeatureFlag` component that uses the internal API to query the feature flag status.

## Example Feature Flag Usage

### Backend Boolean Feature Flag Usage

Imagine you have a new endpoint that adds new functionality that you
aren't ready to expose to every user. Add code to your handler that
looks like

```go

const newFeatureFlagName = "can-use-feature"

func (h SomeNewHandler) Handle(params newfeatureop.FeatureParams) middleware.Responder {
	return h.AuditableAppContextFromRequestWithErrors(params.HTTPRequest,
		func(appCtx appcontext.AppContext) (middleware.Responder, error) {
			canUseFeature := false
			flag, err := h.FeatureFlagFetcher().GetBooleanFlagForUser(params.HTTPRequest.Context(), appCtx, newFeatureFlagName, map[string]string{})
			if err != nil {
				// Some error reaching the feature flag server. Log it
				// and set the default to false
				appCtx.Logger().Error("Error fetching feature flag", zap.String("featureFlagKey", newFeatureFlagName), zap.Error(err))
				canUseFeature = false
			} else {
				// the request was successful
				canUseFeature = flag.Match
			}

			if !canUseFeature {
				return newfeatureop.NewFeatureForbidden(), nil
			}

      // the actual handler code goes here
  }
}

```

### Backend Variant Feature Flag Usage

Imagine you have want to have some parameter that is different per
user.

```go

const newFeatureFlagName = "new-feature"

func (h SomeNewHandler) Handle(params newfeatureop.FeatureParams) middleware.Responder {
	return h.AuditableAppContextFromRequestWithErrors(params.HTTPRequest,
		func(appCtx appcontext.AppContext) (middleware.Responder, error) {
			defaultSize := 100
			someThingSize := defaultSize
			flag, err := h.FeatureFlagFetcher().GetVariantFlagForUser(params.HTTPRequest.Context(), appCtx, newFeatureFlagName, map[string]string{})
			if err != nil {
				// Some error reaching the feature flag server. Log it
				// and set the default to false
				appCtx.Logger().Error("Error fetching feature flag", zap.String("featureFlagKey", newFeatureFlagName), zap.Error(err))
				someThingSize = defaultSize
			} else {
				// the request was successful
				if flag.Match {
					someThingSize, err = strconv.Atoi(flag.Variant)
					if err != nil {
						someThingSize = defaultSize
					}
				}
			}

			things := models.GetThings(appCtx.DB(), someThingSize)
  }
}

```

### Frontend Boolean Feature Flag

Imagine you want to enable some new workflow only for certain users.

```javascript
import { FeatureFlag } from 'components/FeatureFlag/FeatureFlag';

export const MyThing = () => {

  const enabledThing = (
    <div>
      You can do the thing!
    </div>
  );

  const disabledThing = (
    <div>
      Sorry, you can't do the thing.
    </div>
  );

  const featureFlagRender = (flagValue) => {
    if (flagValue === 'true') {
      return enabledThing;
    } else {
      return disabledThing;
    }
  };

   return <FeatureFlag flagKey="new-feature" render={featureFlagRender} />;
}
```

### Frontend Variant Feature Flag

Imagine you want to display different things to different users

```javascript
import { FeatureFlag } from 'components/FeatureFlag/FeatureFlag';

export const MyThing = () => {

  const thingOne = (
    <div>
      This theme is Thing One!
    </div>
  );

  const thingTwo = (
    <div>
      This theme is Thing Two!
    </div>
  );

  const thingThree = (
    <div>
      This theme is Thing Three!
    </div>
  )

  const featureFlagRender = (flagValue) => {
    switch(flagValue) {
      case 'thingOne':
        return thingOne;
      case 'thingTwo':
        return thingTwo;
      default:
        // default to thingThree
        return thingThree;
    }
  };

   return <FeatureFlag flagKey="new-feature" render={featureFlagRender} />;
}
```

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
   appear in Flipt.

If for some reason you want to force a copy (e.g. the S3 bucket has
changed), add/update a comment at the top of the file and open + merge
a PR.

See the [Flipt
documentation](https://www.flipt.io/docs/configuration/storage#object)
for more on the file format.

### Local Testing

You can run Flipt locally with the feature flags for testing. When running locally in development mode, the namespace is `development`.

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
see if the results are what you expected. Go to [http://localhost:9080](http://localhost:9080) to see the Flipt console locally.

## Updating feature flag deployments

See the `transcom/milmove-feature-flags` repository for information how to update the deployments (e.g. update the image used by flipt).