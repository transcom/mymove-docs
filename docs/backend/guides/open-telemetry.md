---
sidebar_position: 23
---

# Open Telemetry

The Milmove app has had aspects of logging (Zap), tracing (trace middleware), and monitoring (AWS infra dashboards) previously, but there is now an [ADR to use the Open Telemetry library](https://github.com/transcom/mymove/blob/master/docs/adr/0061-use-opentelemetry-for-distributed-tracing.md) to standardize our efforts. While not solely useful just for load testing, it did expose our need for better insight into the performance of the Milmove app and it's services.

## Implementation

### Environment configuration
Open Telemetry is configured like many of our features through environment
variables.  When the application binary is started in `cmd/milmove/serve.go` the
system reads if telemetry is enabled and also for which environment it is
running in (locally or `loadtesting` on AWS).

**Telemetry environment variables:**

Environment variable | Default value | Notes
-|-|-
TELEMETRY_ENABLED | false | Enables telemetry
TELEMETRY_ENDPOINT | `stdout` | Endpoint for where to send traces and metrics, the default would be the console. An HTTP and/or GPRC endpoint `host:port` where exports are sent.
TELEMETRY_USE_XRAY_ID | false | When telemetry is used in a deployed AWS environment this needs to be set to true so that trace IDs are formatted properly. This way the same request can be correlated across the firewall WAF, Load Balancer, and ECS service if needed.
TELEMETRY_SAMPLING_FRACTION | .5 | Recording every log would bog down the application so we only want to send a representative fraction of all logs.  When developing locally setting to `1` would mean every log is sent.
TELEMETRY_COLLECT_SECONDS | 30 | The interval in seconds between calls to collect metrics.

When [running telemetry locally](../../tools/telemetry/running-telemetry-locally.md) with the open telemetry collector stack (defined in docker-compose.telemetry.yaml), the development configuration used is that of `config/telemetry/collector-config.dev.yaml`

### Go package

The main initialization code for registering telemetry can be found in `pkg/telemetry/init.go`

The custom code for collecting database connection stats also lives within the package at `pkg/telemetry/db.go`.

The code for hooking into the Go runtime library for memory stats lives within the package at `pkg/telemetry/runtime.go`

### Instrumentation

The ecosystem of Open Telemetry comes with many built in and 3rd party libraries for plugging into our existing code with little or no customization.

#### Routing

Milmove uses the Gorilla Mux router so we can use the existing [Open Telemetry
Mux library][gh-mux-lib] middleware for our non-swagger routes.

[gh-mux-lib]: https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/instrumentation/github.com/gorilla/mux/otelmux

```golang
router.Use(otelmux.Middleware("auth"))
```

#### HTTP handler

Similar to the otelmux library the [Open Telemetry HTTP
library](https://github.com/trussworks/otelhttp) is designed to wrap HTTP
handler functions. It has built in events (read & write) to report the request
size, response size, and duration of the HTTP request.  It is more configurable
than the `otelmux` middleware allowing you to filter out certain routes and other
controls.

```golang
otelhttp.NewHandler(router, "server-tls", []otelHTTP.Option{otelHTTP.ReadEvents, otelHTTP.WriteEvents})
```

Note: This implementation has been forked to the Trussworks GitHub to address bug fixes.

#### SQL

The [`XSAM/otelsql`](https://github.com/XSAM/otelsql) library wraps the queries to
our Postgres database and appends a span to the trace with the statement and
duration information.  Query parameters may be hidden to not log sensitive
information.  It can also be used to log calls to cursor rows when paging
through larger result sets.

#### Go

The [Go runtime instrumentation library](https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/instrumentation/runtime) primarily provides statistics on memory usage and garbage collection cycles that may degrade performance.

## Data collection

Data from the MilMove app is sent to the Open Telemetry collector, which processes the trace, metric, and log data and exports it to the services of our choice.  In AWS the collector exports to the CloudWatch and AWS X-Ray services for storage and analysis.  When run locally the data is exported to the Elastic APM Server running Elasticsearch and Kibana.

### Traces

A trace can be thought of as a tree linked structure of one or more spans that represent a segment of time.  A single trace may contain child spans that include the duration of the HTTP API request on the server and span(s) for the database calls within that lifecycle.  [The Open Telemetry specification](https://opentelemetry.io/docs/reference/specification/trace/semantic_conventions/) defines semantic conventions that our libraries primarily follow for span attribute names and values.

**Common Trace fields**
- ID
- Parent ID
- Trace ID
- Name
- Kind
- Start time
- End time
- Status code
- Status message

#### HTTP Requests

```
http.client_ip
http.flavor
http.host
http.method
http.scheme
http.server_name
http.status_code
http.target
http.user_agent
http.wrote_bytes
net.host_ip
net.host_port
net.peer_ip
net.peer_port
net.transport
```

#### Database SQL Statements

Spans/segments will be added to the current trace when database queries (Select) or executions (Update/Insert) are made within a request.

**sql.conn.exec** (Update/Insert statements)
- db.statement

**sql.conn.query** (Select statements)
- db.system
- db.statement

**sql.rows** (When using a rows cursor to iterate through database results)
- db.system

### Metrics

Open Telemetry defines three primary metric instrument types to be counters, measures, and observers.  Metric events should conform to the [metrics specification](https://opentelemetry.io/docs/reference/specification/overview/#metric-signal), which supports both non-aggregated and pre-aggregated measurements.

#### HTTP
HTTP Request Count
- HTTP Protocol Version
- Host
- Scheme
- Server Name (TLS/MTLS/No-TLS)
- Status Code
- Target (URL path)

HTTP Request Content Length
- HTTP Protocol Version
- Host
- Scheme
- Server Name (TLS/MTLS/No-TLS)
- Target (URL path)

HTTP Response Content Length
- HTTP Protocol Version
- Host
- Scheme
- Server Name (TLS/MTLS/No-TLS)
- Target (URL path)

HTTP Duration
- HTTP Protocol Version
- Host
- Scheme
- Server Name (TLS/MTLS/No-TLS)
- Target (URL path)

#### Database Connections

Database Pool Connections
- Inuse
- Idle
- Wait Duration

#### Go Runtime

Copied from https://github.com/open-telemetry/opentelemetry-go-contrib/blob/main/instrumentation/runtime/doc.go
```
runtime.go.cgo.calls         -          Number of cgo calls made by the current process
runtime.go.gc.count          -          Number of completed garbage collection cycles
runtime.go.gc.pause_ns       (ns)       Amount of nanoseconds in GC stop-the-world pauses
runtime.go.gc.pause_total_ns (ns)       Cumulative nanoseconds in GC stop-the-world pauses since the program started
runtime.go.goroutines        -          Number of goroutines that currently exist
runtime.go.lookups           -          Number of pointer lookups performed by the runtime
runtime.go.mem.heap_alloc    (bytes)    Bytes of allocated heap objects
runtime.go.mem.heap_idle     (bytes)    Bytes in idle (unused) spans
runtime.go.mem.heap_inuse    (bytes)    Bytes in in-use spans
runtime.go.mem.heap_objects  -          Number of allocated heap objects
runtime.go.mem.heap_released (bytes)    Bytes of idle spans whose physical memory has been returned to the OS
runtime.go.mem.heap_sys      (bytes)    Bytes of heap memory obtained from the OS
runtime.go.mem.live_objects  -          Number of live objects is the number of cumulative Mallocs - Frees
runtime.go.runtime.uptime    (ms)       Milliseconds since application was initialized
```

#### AWS Container Metrics

All containers running on AWS ECS can access container level metrics including
memory, CPU, network, and storage usage. In the [AWS OTEL
collector](https://aws-otel.github.io/docs/components/ecs-metrics-receiver) we
connect the receiver and exporter to send data from the container through to
Cloudwatch.

```
Task Level Metrics              Container Level               Metrics Unit

ecs.task.memory.usage           container.memory.usage	      Bytes
ecs.task.memory.usage.max       container.memory.usage.max    Bytes
ecs.task.memory.usage.limit     container.memory.usage.limit  Bytes
ecs.task.memory.reserved        container.memory.reserved     Megabytes
ecs.task.memory.utilized        container.memory.utilized     Megabytes

ecs.task.cpu.usage.total        container.cpu.usage.total	    Nanoseconds
ecs.task.cpu.usage.kernelmode   container.cpu.usage.kernelmode	Nanoseconds
ecs.task.cpu.usage.usermode     container.cpu.usage.usermode	Nanoseconds
ecs.task.cpu.usage.system       container.cpu.usage.system      Nanoseconds
ecs.task.cpu.usage.vcpu         container.cpu.usage.vcpu        vCPU
ecs.task.cpu.cores              container.cpu.cores             Count
ecs.task.cpu.onlines            container.cpu.onlines           Count
ecs.task.cpu.reserved           container.cpu.reserved          vCPU
ecs.task.cpu.utilized           container.cpu.utilized          Percent

ecs.task.network.rate.rx	          container.network.rate.rx	            Bytes/Second
ecs.task.network.rate.tx	          container.network.rate.tx	            Bytes/Second
ecs.task.network.io.usage.rx_bytes	  container.network.io.usage.rx_bytes	Bytes
ecs.task.network.io.usage.rx_packets  container.network.io.usage.rx_packets	Count
ecs.task.network.io.usage.rx_errors	  container.network.io.usage.rx_errors	Count
ecs.task.network.io.usage.rx_dropped  container.network.io.usage.rx_dropped	Count
ecs.task.network.io.usage.tx_bytes	  container.network.io.usage.tx_bytes	Bytes
ecs.task.network.io.usage.tx_packets  container.network.io.usage.tx_packets	Count
ecs.task.network.io.usage.tx_errors	  container.network.io.usage.tx_errors	Count
ecs.task.network.io.usage.tx_dropped  container.network.io.usage.tx_dropped	Count

ecs.task.storage.read_bytes	  container.storage.read_bytes	Bytes
ecs.task.storage.write_bytes  container.storage.write_bytes	Bytes
```

#### Elasticache (Redis)

The Milmove app uses a Redis cache to store session data for auth purposes.  I omitted some of the credit balance metrics that infra uses but the full documentation is available here [https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.Redis.html](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.Redis.html).

- ActiveDefragHits
- BytesUsedForCache
- CacheHitRate
- CacheHits
- CacheMisses
- CPUUtilization
- CurrConnections
- CurrItems
- DatabaseMemoryUsagePercentage
- DBOAveerageTTL
- EngineCPUUtilization
- Evictions
- FreeableMemory
- GetTypeCmds
- GetTypeCmdsLatency
- IsMaster
- KeyBasedCmds
- KeyBasedCmdsLatency
- MasterLinkHealthStatus
- MemoryFragmentationRatio
- NetworkBytesIn
- NetworkBytesOut
- NetworkPacketsin
- NetworkPacketsout
- NewConnections
- Reclaimed
- ReplicationBytes
- ReplicationLag
- SaveInProgress
- SetTypeCmds
- SetTypeCmdsLatency
- StringBasedCmds
- StringBasedCmdsLatency
- SwapUsage

### Resources

[Open Telemetry Homepage](https://opentelemetry.io/)

[Open Telemetry for Golang](https://opentelemetry.io/docs/go/)

[AWS Open Telemetry Docs](https://aws-otel.github.io/)

[Elastic Application Performance Monitoring](https://www.elastic.co/observability/application-performance-monitoring)
