---
sidebar_position: 8
---

# Running integration tests with routing middleware enabled

Sometimes it will be necessary to write server integration tests with routing middleware enabled. For example, we may want to test calling an API endpoint with an unauthorized user, and ensure that we receive a 403 response. Here's how to go about it.

## Test name and location

Your test will live in `pkg/handlers/routing`, in a subdirectory corresponding to the API you're testing, `{api_name}api_test`. Tests of the `internal` API live in `pkg/handlers/routing/internalapi_test`.

The name of the test file should correspond to the name of the file that contains the handler that the endpoint calls, `{handler_file_name}_test.go`. `pkg/handlers/internalapi/ppm_shipment.go` would have a corresponding test file in `pkg/handlers/routing/internalapi_test/ppm_shipment_test.go`.

Generally, the test name and location should be
```pkg/handlers/routing/{api_name}api_test/{handler_file_name}_test.go```

## Test structure

In general, here's how to set up the file created above.

Include the test as part of the `{api_name}api_test` package, and any imports, as usual.

For each request type, write a function whose receiver is the API's test suite. For example, tests of updating a pro-gear weight ticket in the internal API's suite would look like:

```
func (suite *InternalAPISuite) TestUpdateProgearWeightTicket() {
  ...
}
```

For each test, call `Run` on the suite, with a description of the test, and the test function.

```
  suite.Run("Unauthorized progear weight ticket update by another service member", func() { ... })
```

The body of the test function will likely contain some data set up -- using factories to build a pro-gear weight ticket and service member, for example -- which we can use to build the endpoint, body, and request, and get the response.
### Endpoint

Build the endpoint from the corresponding Swagger definition. For example, the `swagger-def/internal.yaml` defines the update path for pro-gear weight tickets as

```
/ppm-shipments/{ppmShipmentId}/pro-gear-weight-tickets/{proGearWeightTicketId}

```

Build the endpoint path, for example, assuming the `ppmShipment` and `proGearWeightTicket` are created,

```
endpointPath := fmt.Sprintf("/internal/ppm-shipments/%s/pro-gear-weight-tickets/%s", ppmShipment.ID.String(), progearWeightTicket.ID.String())
```

Be sure that the first path segment(s) correspond to the appropriate API:

- Customer/internal -> `/internal`
- GHC/office -> `/ghc/v1`
- Prime -> `/prime/v1`
- Admin -> `/admin/v1`

These prefixes are not typically included in other tests since they do not make API requests directly.

### The request body

Swagger generates types that define the shape a request body should take, and we can leverage those types in writing tests.

For our example, our request body type is `internalmessages.UpdateProGearWeightTicket`, which Swagger generates for us in `pkg/gen/internalmessages/update_pro_gear_weight_ticket.go`.

To build out the request body, we create an object of this type, marshal it to JSON, check for errors, then cast it to a buffer using `bytes.NewBuffer`.

```
body := &internalmessages.UpdateProGearWeightTicket{
  Description:      handlers.FmtString("My cool stuff"),
  HasWeightTickets: true,
  Weight:           handlers.FmtInt64(4000),
  BelongsToSelf:    true,
}

jsonBody, err := json.Marshal(body)

suite.FatalNoError(err)

bodyBuffer := bytes.NewBuffer(jsonBody)
```
### The request

Now we can build the request from the endpoint and body. Requests are available from the `BaseRoutingSuite` with and without authentication for each app:

- `NewAdminRequest()` and `NewAuthenticatedAdminRequest()`
- `NewMilRequest()` and `NewAuthenticatedMilRequest()`
- `NewOfficeRequest()` and `NewAuthenticatedOfficeRequest()`
- `NewPrimeRequest()` and `NewAuthenticatedPrimeRequest()`

Since our request is hitting the customer API with authentication, we'll use `NewAuthenticatedMilRequest()`, and a `PATCH` method.

```
req := suite.NewAuthenticatedMilRequest("PATCH", endpointPath, bodyBuffer, wrongUser)
```

Since this is a `PATCH` request and we [use optimistic locking](https://transcom.github.io/mymove-docs/docs/backend/guides/use-optimistic-locking), we will also need to include the `If-Match` header. We will also set the `Content-Type` header.

```
req.Header.Set("Content-Type", "application/json")
req.Header.Set("If-Match", etag.GenerateEtag(progearWeightTicket.UpdatedAt))
```

Note: reference [orders_test.go](https://github.com/transcom/mymove/blob/56590a3b462bc5709be4d5f93e9000188388329a/pkg/handlers/routing/internalapi_test/orders_test.go#L16) for an example of how to upload a file as part of the request body, should you need to.

### The response

Set up the response recorder and serve HTTP, then check that the response equals the expectation.

```
rr := httptest.NewRecorder()
suite.SetupSiteHandler().ServeHTTP(rr, req)

suite.Equal(http.StatusNotFound, rr.Code)
```

(Note that this returns a `StatusNotFound` rather than a `StatusForbidden`, which [is preferred when the wrong user makes a request](https://github.com/transcom/mymove/pull/10938/files#r1240473787).)
