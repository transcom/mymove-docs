---
sidebar_position: 21
---
# How to Set Up a Feature Flag

There is a feature flag feature for both frontend and backend.  Here's how to set up a new feature flag.

## Frontend

### Overview

The frontend feature flag can be turned on or off through the url.  By appending a querystring `?flag:flagName=false`, the feature will be turned off and appending `?flag:flagName=true` will turn on the feature.  Generally, while working on a feature that is not ready for production, by default we set it to off in production and turn it on in dev, staging, and experimental environments.

### How to create a new flag

Go to `shared/featureFlag.js`

Add a key/value to `defaultFlags` and set it to `false`.  The key will be the name you use in the url


`myFeatureFlag` --> `?flag:myFeatureFlag=false`

Add the key/value to the environment flags where you want it different than the default

```
const environmentFlags = {development: Object.assign({}, defaultFlags, { myFeatureFlag: true })}
```
### How to apply the flag in a component

Access the flag value through context
1) To access context, import `withContext`

   ```
   import { withContext } from 'shared/AppContext';
2) wrap the exported component with `withContext`

   ```
   export default withContext(connect(mapStateToProps, mapDispatchToProps)(MyComponent));
3) Pull the boolean value of the flag and apply it to the feature you want to show/hide

   ```
   const showMyFeatureFlag = this.props.context.flags.myFeatureFlag;
## Backend

### Overview

The backend feature flag works by assigning a flag value as environment variables for each environment, and then setting the flag on the handler `Context` in `featureFlags`.  The value is set using `SetFeatureFlag`.

### How to create a new flag

1) Create the flag in `InitFeatureFlags` in `pkg/cli/featureflag.go`

2) Set environment variables for each environment:

`MY_FEATURE_FLAG=true`

in

`config/env/staging/app.env`

`config/env/experiment.app.env`

`config/env/prod.app.env`

`.envrc`

Usually we are just hiding a feature from prod, so the flag would be set to `false` there and `true` everywhere else, but use case may vary.

3) Set the flag in the handlerContext

```
handlerContext.SetFeatureFlag(
	handlers.FeatureFlag{Name: cli.MyFeatureFlag, Active: v.GetBool(cli.MyFeatureFlag)},
)
```

This grabs the value that is set as the environment variable and appends it to the feature flag map as a key value pair.
All handlers have access to the handlerContext, so have access to the flag value.  This boolean value can then be used to turn on or off features.

```
if h.HandlerContext.GetFeatureFlag(cli.MyFeatureFlag) {
    do something. . .
}
```
