# Running telemetry locally

Because we are using open telemetry, we can use one telemetry system
in production (AWS) and another one locally.

Running the elastic search offering locally turns out to be easy.

1. In one window run `docker-compose -f docker-compose.telemetry.yml up`

1. In another, run `TELEMETRY_ENDPOINT=localhost:55680 TELEMETRY_ENABLED=1 make server_run`

1. Visit <http://localhost:5601>
