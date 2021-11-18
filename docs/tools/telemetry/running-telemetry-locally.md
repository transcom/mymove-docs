# Running telemetry locally

Because we are using open telemetry, we can use one telemetry system
in production (AWS) and another one locally. More information on why open telemetry was chosen is available in this [ADR](https://github.com/transcom/mymove/blob/6feaa5b79cfd20276dd670babdbf0b31351a2fb4/docs/adr/0061-use-opentelemetry-for-distributed-tracing.md).

Running the elastic search offering locally turns out to be easy.

## Setup

1. In one terminal window run `make telemetry_docker`

  :::danger You may encounter errors

  Docker Compose may report errors similar to the following: `ERROR: for apm-server  Container "4aa42b9f5715" is unhealthy` or `ERROR: for apm-server Container "4aa42b9f5715" is unhealthy` this may be an indication that docker doesn't have enough memory. To resolve this issue open up Docker Desktop. Click the gear icon in the header as shown below:

  ![docker settings](/img/telemetry/docker_settings.png)

  You can then click `Resources` on the left nav bar and modify the `Memory` slider to `8.00 GB`. Click `Apply & Restart`. Once you have done this rerun the original command.

  ![changed docker settings](/img/telemetry/docker_resources.png)

  :::

1. In another, run `TELEMETRY_ENDPOINT=localhost:55680 TELEMETRY_ENABLED=1 make server_run`

1. Visit <http://localhost:5601>

  ![Kibana home page](/img/telemetry/kibana-home-page.png)

1. To start collecting information you must run the mymove app locally. To do this navigate to the mymove repo and run the command `make client_run` to start up the local server. You can then navigate through the app to start collecting data.

1. To view this data, on the Kibana page you can click the `Observability` panel and then navigate to the `APM` -> `Services` section on the left hand navigation bar. Then click on the `milmove` service.

  ![Services Dashboard](/img/telemetry/services-dashboard.png)

## How to find specific transactions

To find specific transactions you can leverage the search bar and utilize some of the metadata added to each transaction.

Here are a list of some of the metadata fields that you can search against and what information is provided in that field:

| Key                       | Description                             | Example                                     |
|---------------------------|-----------------------------------------|---------------------------------------------|
| labels.http_route         | Shows the non dynamic url that is hit   | /internal/service_members/{serviceMemberId} |
| http.response.status_code | Show the corresponding http status code | 200                                         |
| http.request.method       | Shows the http request method           | PATCH                                       |

## Troubleshooting

This is a list of common errors that you might see and what they mean:

:::caution Context deadline exceeded

`context deadline exceeded` this is an indication that it can't reach the telemetry server.

:::
