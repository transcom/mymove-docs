# How to Set Up a Frontend Feature Flag

:::info
See how to implement an experimental backend feature flag (Without Flipt) [here](../../backend/guides/how-to/add-an-experimental-feature-flag.md)
:::

There is a feature flag feature for both frontend and backend.  Here's how to set up a new feature flag.

## Frontend

### Overview

The frontend feature flag can be turned on or off through the URL. By appending
a query string `?flag:flagName=false`, the feature will be turned off and
appending `?flag:flagName=true` will turn on the feature. Generally, while
working on a feature that is not ready for production, by default we set it to
off in production and turn it on in dev, staging, and experimental environments.

### How to create a new flag

Go to `shared/featureFlag.js`

Add a key/value to `defaultFlags` and set it to `false`. The key will be the
name you use in the URL.


`myFeatureFlag` --> `?flag:myFeatureFlag=false`

Add the key/value to the environment flags where you want it different than the default

```
const environmentFlags = {development: Object.assign({}, defaultFlags, { myFeatureFlag: true })}
```
### How to apply the flag in a component

Access the flag value through context

1. To access context, import `withContext`

   ```
   import { withContext } from 'shared/AppContext';
   ```

2. Wrap the exported component with `withContext`

   ```
   export default withContext(connect(mapStateToProps, mapDispatchToProps)(MyComponent));
   ```

3. Pull the boolean value of the flag and apply it to the feature you want to show/hide

   ```
   const showMyFeatureFlag = this.props.context.flags.myFeatureFlag;

   // OR

   const showMyFeatureFlag = context.flags.myFeatureFlag;
   ```
