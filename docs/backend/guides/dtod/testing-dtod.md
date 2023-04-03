# Testing DTOD

The instructions that follow will say to change the environment variable inside of `.envrc`, however, there are other methods one can take to update to environment variables.

- Environment variables can be changed inside of `.envrc.local`
- Runing `export DTOD_USE_MOCK=false` after `direnv allow`
- `export DTOD_USE_MOCK=false make server_run`

:::note
If you are not using the plugin [better-direnv](https://plugins.jetbrains.com/plugin/19275-better-direnv) and you are running the server in Goland, be sure to refresh the Goland environment.
:::

## Triggering the DTOD Call

The following steps just documents one way in which DTOD is used in the application. There are others.

1. Login as a services counselor to the office application.
2. Create a PPM shipment.
3. The save and continue button should trigger a call to the DTOD API.

## With Mocks

Ensure that `DTOD_USE_MOCK` is set to `false` in `.envrc`. Setting this to false will use mock caluclations.

## Using Real DTOD

Set `DTOD_USE_MOCK` in `.envrc` to `true`.

In the server logs, you should see this line

```
2023-02-23T23:30:59.174Z INFO route/planner.go:167 Using real DTOD for DTOD route planner {"git_branch": "main", "git_commit": "d19fedae045252bc8f0116b1a7b216b4a1dc8927"}
```

### Changing the Password Locally

The password can be overriden by running `export DTOD_API_PASSWORD='newpassword'` after `direnv allow` runs.

:::caution
If the password contains special characters, ensure that they are escaped appropriately.
:::

## Locally Getting Additional Logging

Inside of `pkg/route/planner.go`, change `gosoap.SoapClient` to use `gosoap.SoapClientWithConfig` like so

```
soapClient, err := gosoap.SoapClientWithConfig(dtodWSDL, httpClient, &gosoap.Config{Dump: true})
```

:::caution
The `Dump: true` config option should only be used locally as that dumps out the username and password into the logs.
:::

### Challenges with Getting Additional Logging

The soap library being used only returns an error if the status code is < 200 or >= 400.
https://github.com/tiaguinho/gosoap/blob/f4a99995a898b6a2de86e74d0942ffc4cfa89c0d/soap.go#L251-L261.
