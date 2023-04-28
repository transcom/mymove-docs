# DTOD Architecture

This document aims to give a general picture of what DTOD looks like in our code.

DTOD is a third party API that the MilMove system calls to get the distance calculation between two Zip codes.

The calls to set up DTOD occur in `cmd/milmove/serve.go`.
`pkg/cli/route.go` holds the code to initialize the the API username, password, and URL to use. The API username, password, and URL are held inside of the AWS Systems Manager Parameter store. The flags get passed by `cmd/milmove/serve.go` when it calls `InitDTODRoutePlanner` inside of `pkg/route/planner.go`.

From here, either the API or the mock is called.

## Mocked DTOD

If DTOD is mocked, then `cmd/milmove/serve.go` calls the `NewMockDTODZip5Distance` inside of `pkg/route/dtod_zip5_distance_mock.go`.
The `mockDTODZip5Distance` has the receiver `DTODZip5Distance`. This function does the work of creating fake data to use.

## Non Mocked DTOD

If DTOD is not mocked, then `cmd/milmove/serve.go` does additional work to setup `pkg/route/dtod_zip5_distance.go`.
`pkg/route/dtod_zip5_distance.go` makes calls to the DTOD API.
