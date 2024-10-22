# How to use Feature Flags

## Introduction

MilMove uses [Flipt](https://www.flipt.io) for feature flags. See [ADR 0082 Use Flipt for Feature Flags](../../adrs/0082-use-flipt-feature-flags.md) for why Flipt was chosen and [ADR 0084 Deploy Flipt using ECS service discovery](../../adrs/0084-deploy-flipt-service-discovery.md) for how Flipt is deployed in AWS.

While MilMove uses Flipt, it has a generic feature flag API that hides most of Flipt's implementation details. This allows environment variables to be used to simulate feature flags in local development without running a Flipt server. Additionally, this would also facilitate moving to another feature flag provider in the future should that be desirable.

The feature flag data is stored in a separate, private repository `transcom/milmove-feature-flags`.

As of 2023-09-06, feature flags have not been used for a full end to end feature deployment. This document may have some gaps because of that.

### Feature Flag Evaluation

First, familiarize yourself with the key [Flipt Concepts](https://www.flipt.io/docs/concepts).

Each deployed environment (demo, exp, loadtest, stg, prd) is in its
own [Flipt Namespace](https://www.flipt.io/docs/concepts#namespaces) and only that single namespace is available in each environment.

Flipt supports two kinds of feature flags:

- [Boolean Flags](https://www.flipt.io/docs/concepts#boolean-flags)
- [Variant Flags](https://www.flipt.io/docs/concepts#variant-flags)

Boolean flags are for when a feature can only be turned on or off. Variant flags are for when a feature might have multiple options.

The most common [Entity](https://www.flipt.io/docs/concepts#entities) to work with is a user and that is probably how most feature flags will be used: to determine if a particular user should have access to a feature or not.

The [Context](https://www.flipt.io/docs/concepts#context) contains multiple bits of information that can by used by Flipt to determine if a feature should be available to a user or not.

### MilMove Backend Feature Flag Service

We use the [backend service object](../../backend/guides/service-objects/overview.md) for feature flags to wrap the specific endpoints in the Flipt API. This enables environment variable based feature flags in local development, with the additional benefit of protecting against any temporary unavailability on Flipt's end.

For development environments, the feature flag service object will utilize environment variables set in `.envrc`. This is because if a Flipt URL is not provided, it will default to the EnvFetcher service object. Internal endpoints to fetch the feature flag value will utilize the same service object, but return different values depending on environment and configuration.

The current APIs for in the backend are `GetBooleanFlagForUser` and `GetVariantFlagForUser`. These methods have been added in [transcom/mymove#11330](https://github.com/transcom/mymove/pull/11330). The feature flag service object sets the `entityID` for those requests to the ID of the user making the request. It populates some default information in the context, including:

- The application name (mil, office, admin)
- If the user is an admin user, service member, or office user
- The [permissions](../../backend/guides/roles-and-permissions.md) of the user

As we get more experience with feature flags, more information may be added to the default context of a user.

In addition, the API allows the caller to provide additional context that could be used for a specific feature flag.

For feature flags that are not specific to a particular user, use the `GetBooleanFlag` and `GetVariantFlag` APIs for full customization of the `EntityID` and `Context`. These methods have been added in [transcom/mymove#11330](https://github.com/transcom/mymove/pull/11330).

### MilMove Backend Feature Flag Swagger API

The `GetBooleanFlagForUse` and `GetVariantFlagForUser` APIs are exposed in the internal API via the `/feature-flags/user-boolean/{key}` and `/feature-flags/user-variant/{key}` endpoints so that the frontend can query feature flag status. These endpoints have been added in [transcom/mymove#11330](https://github.com/transcom/mymove/pull/11330).

### MilMove Frontend Feature Flag Component

To allow for customizing the user presentation based on feature flags, we have a `FeatureFlag` component that uses the internal API to query the feature flag status. Additionally, an asynchronous util function can be created to be reused for logic handling within components.

## Example Feature Flag Usage

### Backend Boolean Feature Flag Usage

If you are checking for a boolean flag value in the area of the Prime API, you should use the GetBooleanFlag() function rather than the GetBooleanFlagForUser() function. The Prime API (using primelocal as the base URL for testing) is our way to test the mTLS functionality of the The GetBooleanFlagForUser() function relies on a session being created, which we don't have in the case of TLS authentication, and using GetBooleanFlagForUser() without that session will result in a nil session error, resulting in the Feature Flag check to always return False. Using GetBooleanFlag() does not rely on a session, and allows the true Feature Flag value to be checked and also ensures the the TLS handshake is truly under test.

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

### Frontend Defined Util for Feature Flag Logic

And once you have it created in envrc, navigate to the component you would like to implement feature flag logic for.
Then, import your new function and use it

```javascript
import { isBooleanFlagEnabled } from '../../utils/featureFlags';
```

For a class, add it to state and then call it in the `componentDidMount`

```javascript
export class App extends Component {
  constructor() {
    this.state = {
      featureFlag: false,
    };
  }

  componentDidMount() {
    isBooleanFlagEnabled('your_ff_here').then((enabled) => {
      this.setState({
        featureFlag: enabled,
      });
    });
  }
}
```

For a function, call and assign it in the `useEffect`

```javascript
const [yourFFHere, setYourFFHere] = useState();

useEffect(() => {
  const fetchData = async () => {
    isBooleanFlagEnlabed('your_ff_here').then((enabled) => {
      setYourFFHere(enabled);
    });
  };
  fetchData();
}, [setErrorState]);
```

### Frontend Boolean Feature Flag Rendering

Imagine you want to enable some new workflow only for certain users.

```javascript
import { FeatureFlag } from 'components/FeatureFlag/FeatureFlag';

export const MyThing = () => {
  const enabledThing = <div>You can do the thing!</div>;

  const disabledThing = <div>Sorry, you can't do the thing.</div>;

  const featureFlagRender = (flagValue) => {
    if (flagValue === 'true') {
      return enabledThing;
    } else {
      return disabledThing;
    }
  };

  return <FeatureFlag flagKey="new-feature" render={featureFlagRender} />;
};
```

### Frontend Variant Feature Flag Rendering

Imagine you want to display different things to different users

```javascript
import { FeatureFlag } from 'components/FeatureFlag/FeatureFlag';

export const MyThing = () => {
  const thingOne = <div>This theme is Thing One!</div>;

  const thingTwo = <div>This theme is Thing Two!</div>;

  const thingThree = <div>This theme is Thing Three!</div>;

  const featureFlagRender = (flagValue) => {
    switch (flagValue) {
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
};
```

## Jest Testing Feature Flags

```javascript
import { isBooleanFlagEnabled } from 'utils/featureFlags';
```

Add the following block to the top of your test file:

```javascript
jest.mock('utils/featureFlags', () => ({
  ...jest.requireActual('utils/featureFlags'),
  isBooleanFlagEnabled: jest.fn().mockImplementation(() => Promise.resolve(false)),
}));
```

You can mock the boolean value in your tests with:

```javascript
isBooleanFlagEnabled.mockImplementation(() => Promise.resolve(YOUR_BOOLEAN_VALUE_HERE));
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
2. Edit the file in the `feature_flags` directory corresponding to the
   environment.
3. Commit the file and open a PR
4. When the PR is merged, the file for that environment will be copied
   to the S3 bucket for that environment. Flipt checks for updates in
   S3 periodically, and so the new settings should automagically
   appear in Flipt. This applies to the live AWS app, not development.
5. Create a branch in git on the `transcom/mymove` repository.
6. Update the `.envrc` file adding a new exported environment variable with the following naming convention: `FEATURE_FLAG_${Feature_Flag_Key}`. The key should be in screaming snake case, and match the key in `transcom/milmove-feature-flags`.
7. Commit the file and open a PR.
8. When the PR is merged, the development environment will now have the feature flag.
9. Add the feature flag to the [CircleCI deployment flags](#circleci-deployment-flags)

If for some reason you want to force a copy (e.g. the S3 bucket has
changed), add/update a comment at the top of the file and open + merge
a PR.

See the [Flipt
documentation](https://www.flipt.io/docs/configuration/storage#object)
for more on the file format.

### Local Testing

:::caution

Local testing and development run off the "EnvFetcher" which does not use the Flipt container. Please update the `.envrc` file accordingly during development to test turning features on and off.
However, to test with a live Flipt container to simulate exactly how it's running in the AWS environments, then please proceed with the following section.

:::

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

### CircleCI deployment flags

:::caution

Failing to set CircleCI deployment flags will lead to faulty builds as CircleCI cannot natively find which feature flags are enabled or disabled. It does not even see `.envrc` that developers utilize.

:::

To set a feature flag as enabled or disabled within certain deployment environments, you must update the corresponding [config](https://github.com/transcom/mymove/tree/main/config) environment variables. CircleCI deployment environments can be found under the [config/env folder](https://github.com/transcom/mymove/tree/main/config/env).

When you export your feature flag variable for a specific environment, make sure you update its "app" and its respective "app-client-tls" file. Example:

```
// ${environment} can be "prd", "exp", "stg", "loadtest", "demo", "review", and so on as environments change.

config/env/{$environment}.app.env

config/env/{$environment}.app-client-tls.env
```

Adding `FEATURE_FLAG_EXAMPLE=false` or `true` per environment. You do not need to add `export` to the front like you would in a typical `.envrc` file.

## Updating feature flag deployments

See the `transcom/milmove-feature-flags` repository for information how to update the deployments (e.g. update the image used by flipt).
