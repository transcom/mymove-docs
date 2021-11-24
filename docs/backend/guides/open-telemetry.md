# Open Telemetry

The Milmove app has had aspects of logging (Zap), tracing (trace middleware), and monitoring (AWS infra dashboards) previously but there is now an [ADR to use the Open Telemetry library](https://github.com/transcom/mymove/blob/master/docs/adr/0061-use-opentelemetry-for-distributed-tracing.md) to standardize our efforts. While not solely useful just for load testing, it did expose our need for better insight into the performance of the Milmove app and it's services.

- [Implementation](#implementation)
  - [Environment configuration](#environment-configuration)
  - [Go package](#go-package)
  - [Instrumentation](#instrumentation)
- [Data collection](#data-collection)
  - [Traces](#traces)
  - [Metrics](#metrics)
  - [Resources](#resources)

## Implementation

### Environment configuration
Open Telemetry is configured like many of our features through environment variables.  When the application binary is started in `cmd/milmove/serve.go` the system reads if telemetry is enabled and also for which environment it is running in (locally or AWS/loadtesting).

**Telemetry environment variables:**

Environment variable | Default value | Notes
-|-|-
TELEMETRY_ENABLED | false | Enables telemetry
TELEMETRY_ENDPOINT | "stdout" | Endoint for where to send traces and metrics, the default would be the console. An http and/or gprc endpoint `host:port` where exports are sent.
TELEMETRY_USE_XRAY_ID | false | When telemetry is used in a deployed AWS environment this needs to be set to true so that trace IDs are formatted properly. This way the same request can be correlated across the firewall WAF, Load Balancer, and ECS service if needed.
TELEMETRY_SAMPLING_FRACTION | .5 | Recording every log would bog down the application so we only want to send a representative fraction of all logs.  When developing locally setting to `1` would mean every log is sent.
TELEMETRY_COLLECT_SECONDS | 30 | The interval in seconds between calls to collect metrics.

When [running telemetry locally](../../tools/telemetry/running-telemetry-locally.md) with the open telemetry collector stack (defined in docker-compose.telemetry.yaml), the development configuration used is that of `config/telemetry/collector-config.dev.yaml`

### Go package

The main initialization code for registering telemetry can be found in `pkg/telemetry/init.go`

The custom code for collecting database connection stats also lives within the package at `pkg/telemetry/db.go`.

### Instrumentation

The ecosystem of Open Telemetry comes with many built in and 3rd party libraries for plugging into our existing code with little or no customization.

#### Routing

Milmove uses the Gorilla mux router so we can use the existing [otelmux library](https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/instrumentation/github.com/gorilla/mux/otelmux) middleware for our non-swagger routes.

```golang
router.Use(otelmux.Middleware("auth"))
```

#### HTTP handler

Similar to the otelmux library the [otelhttp library](https://github.com/trussworks/otelhttp) is designed to wrap HTTP handler functions. It has built in events (read & write) to report the request size, response size, and duration of the http request.  It is more configurable than the otelmux middleware allowing you to filter out certain routes and other controls.

Note: This implementation has been forked to the Trussworks GitHub to address bugfixes.

#### SQL 

#### Go

## Data collection

### Traces

### Metrics

### Resources