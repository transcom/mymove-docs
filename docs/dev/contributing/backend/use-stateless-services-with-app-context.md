# AppContext: how and when to use it

We want our services to be composable, so that one service can call
another. We also want to be able to have a per request trace id
associated with a logger so that we can correlate log messages in a
single request.

See [ADR 0064](https://github.com/transcom/mymove/blob/master/docs/adr/0064-use-stateless-services-with-context.md) for more background.

The way we achieve that goal is by storing the DB connection, logger, and
session inside an instance of `appcontext.AppContext`, and requiring all
functions that need one or more of those elements (DB, logger, session) to accept an argument of type `appcontext.AppContext` as its first argument. The function can then extract those elements from the app context, like so:

```golang
func MyFunction(appCtx appcontext.AppContext) {
  db := appCtx.DB()
  logger := appCtx.Logger()
  session := appCtx.Session()
}
```

Search the `mymove` codebase for `appCtx appcontext.AppContext` for more usage
examples. We also have examples here in [Service Objects](service-objects#naming-and-defining-public-service-object-functions) and [Guide to Creating an Endpoint](Guide-to-Creating-an-Endpoint#steps-to-creating-a-new-handler).

## Testing with AppContext

When testing a service object function, we need to pass in an instance of the AppContext that contains the test DB and test logger. That instance can be created like this:

```golang
appcontext.NewAppContext(suite.DB(), suite.logger)
```

Since this is a common thing to do in tests, packages should extract this into a `TestAppContext()` helper method that's defined in the package's `*_test.go` file. For example, it is defined in `pkg/services/mto_shipment/mto_shipment_service_test.go` for the `mtoshipment` package:

```golang
// TestAppContext returns the AppContext for the test suite
func (suite *MTOShipmentServiceSuite) TestAppContext() appcontext.AppContext {
  return appcontext.NewAppContext(suite.DB(), suite.logger)
}
```

Search for `TestAppContext() appcontext.AppContext` in the codebase for more examples.

You can then use it in tests like this:

```golang
func (suite *MTOShipmentServiceSuite) TestRejectShipment() {
  router := NewShipmentRouter()
  approver := NewShipmentRejecter(router)
  reason := "reason"

  suite.T().Run("If the shipment rejection is approved successfully, it should update the shipment status in the DB", func(t *testing.T) {
    shipment := testdatagen.MakeDefaultMTOShipmentMinimal(suite.DB())
    shipmentEtag := etag.GenerateEtag(shipment.UpdatedAt)
    fetchedShipment := models.MTOShipment{}

    rejectedShipment, err := approver.RejectShipment(suite.TestAppContext(), shipment.ID, shipmentEtag, &reason)

    suite.NoError(err)
    suite.Equal(shipment.MoveTaskOrderID, rejectedShipment.MoveTaskOrderID)

    err = suite.DB().Find(&fetchedShipment, shipment.ID)
    suite.NoError(err)

    suite.Equal(models.MTOShipmentStatusRejected, fetchedShipment.Status)
    suite.Equal(shipment.ID, fetchedShipment.ID)
    suite.Equal(rejectedShipment.ID, fetchedShipment.ID)
    suite.Equal(&reason, fetchedShipment.RejectionReason)
  })
}
```
