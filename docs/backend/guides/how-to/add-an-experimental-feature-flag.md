---
sidebar_position: 7
---

# How to set up an experimental feature flag

Backend feature flags via the "experimental" way utilize environment variables rather than Flipt API or Chamber secrets.

## Setting up environment variables

### Naming convention

Feature flags stored inside of the environment variables files should be prefixed with `FEATURE_FLAG_`. It must be prefixed this way in order for the `EnvFetcher` to properly retrieve it.

Code example:
`export FEATURE_FLAG_EXAMPLE=true` (Set's the feature flag *`example`* to true)

### CircleCI deployment flags

To set a feature flag as enabled or disabled within certain deployment environments, you must update the corresponding [config](https://github.com/transcom/mymove/tree/main/config) environment variables. CircleCI deployment environments can be found under the [config/env folder](https://github.com/transcom/mymove/tree/main/config/env).

When you export your feature flag variable for a specific environment, make sure you update its "app" and its respective "app-client-tls" file. Example:

```
// ${environment} can be "prd", "exp", "stg", and so on.

config/env/{$environment}.app.env

config/env/{$environment}.app-client-tls.env
```

Adding `FEATURE_FLAG_EXAMPLE=false` or `true` per environment. You do not need to add `export` to the front like you would in a typical `.envrc` file.

### Development flags

:::warning
Ensure you have properly configured the CircleCI deployment flags prior to implementing any feature flags to the root `.envrc` file. This guarantees these feature flags will not be accidentally pushed without being configured for deployment first.
:::

The development value for the feature flag is added to the root `.envrc` file within the [mymove repository](https://github.com/transcom/mymove). It should be set to `true` if the feature flag should be enabled inside of development.

## How to use the EnvFetcher


### Handler config

If the EnvFetcher is not enabled inside of the HandlerConfig, it is likely disabled. To re-enable it, you must import it to the interface so that you can use it when handling endpoints.
```
// HandlerConfig provides access to all the contextual references
// needed by individual handlers
type HandlerConfig interface {
  ...
	EnvFetcher() services.EnvFetcher // Experimental, TODO: Replace with full flipt FeatureFlagFetcher implementation
}
```

Here is what the EnvFetcher interface should look like inside of the services package.

```
// EnvFetcher is the exported interface for environment sourced feature flags
//
// This service is an experimental implementation of feature flags until
// we fully migrate to flipt. These flags will be managed at the code level via .envrc and config/env/*.env
//
//go:generate mockery --name EnvFetcher
type EnvFetcher interface {
	GetBooleanFlagForUser(ctx context.Context, appCtx appcontext.AppContext, key string, flagContext map[string]string) (FeatureFlag, error)
	GetBooleanFlag(ctx context.Context, logger *zap.Logger, entityID string, key string, flagContext map[string]string) (FeatureFlag, error)
	GetVariantFlagForUser(ctx context.Context, appCtx appcontext.AppContext, key string, flagContext map[string]string) (FeatureFlag, error)
	GetVariantFlag(ctx context.Context, logger *zap.Logger, entityID string, key string, flagContext map[string]string) (FeatureFlag, error)
}

```


### Code example

In this example we will review how to utilize the experimental feature flag via `EnvFetcher` inside of a handler. The createMTOShipmentHandler with flag `MULTI_MOVE` was used for this.

```
import 	(
    "context"
	"github.com/transcom/mymove/pkg/appcontext"
)

...

// Handle creates the mto shipment
func (h CreateMTOShipmentHandler) Handle(params mtoshipmentops.CreateMTOShipmentParams) middleware.Responder {
	return h.AuditableAppContextFromRequestWithErrors(params.HTTPRequest,
		func(appCtx appcontext.AppContext) (middleware.Responder, error) {

			// Retrieve feature flag. Do not include "FEATURE_FLAG_" inside of
            // the variable fetch. The EnvFetcher handles this automatically
			flag, err := h.EnvFetcher().GetBooleanFlagForUser(context.Background(), appCtx, "MULTI_MOVE", map[string]string{})
			if err != nil {
				// Handle accordingly
			}

			if flag.Match != true {
				// Handle accordingly (Basic example)
				return mtoshipmentops.NewCreateMTOAgentForbidden(), nil
			}
```

Flag will look something like this:
```
Entity:
"7e302e56-a8b4-4801-8015-9b7fa113ec5b"
Key:
"MULTI_MOVE" // Notice how FEATURE_FLAG_ is not included
Match:
true
Variant:
"true"
Namespace:
"development"
```
