---
title: How to add an event trigger
sidebar_position: 1
---

## Overview

Events are triggered when objects in the db are created, updated or deleted in endpoints.

We trigger events so we can perform other actions that were not specifically requested by the handler, sort of like side effects.

The primary use case is to send a webhook notification to Prime, if the event is of interest to Prime.

For more details, see the [Webhooks for Milmove Design Doc](https://docs.google.com/document/d/1tq2jWvuLXEv30Bab2S-nSj9V1bAzLrPk7DZo3xLX9-o/edit#heading=h.5x0d5h95i329).

### **RULE OF THUMB - Every endpoint in the ghcapi.yaml file should have an event trigger call in the top level handler.**

Read on to understand how to add the event trigger.

### How do I trigger an event

You trigger an event by inserting a call to TriggerEvent on the SUCCESSFUL completion of the handler's action.

**Here's an example:**

Imagine the TOO hits the "Authorize Payment" button.

This calls the `ghcapi` endpoint `updatePaymentRequestStatus` and runs the handler.

In the handler, the code updates the Payment Request object in the db with the new status.

If it is able to **successfully** update the object, it must trigger the `PaymentRequest.Update` event.

To do so it makes a call to `event.TriggerEvent` and passes on a bunch of useful information how which endpoint was called, by whom, and what the action was taken.

If the actual payment request update failed, we don't trigger the event as there was no successful action taken.

## TriggerEvent function

Here's the call we'd make to `event.TriggerEvent`:
```go
_, err = event.TriggerEvent(event.Event{
    EndpointKey:     event.SupportUpdatePaymentRequestStatusEndpointKey,
                                                            // Endpoint that is being handled
    EventKey:        event.PaymentRequestUpdateEventKey,    // Event that you want to trigger
    UpdatedObjectID: updatedPaymentRequest.ID,              // ID of the updated logical object
    MtoID:           mtoID,                                 // ID of the associated Move
    Request:         params.HTTPRequest,                    // Pass on the http.Request
    DBConnection:    h.DB(),                                // Pass on the pop.Connection
    HandlerContext:  h,                                     // Pass on the handlerContext
})
// If the event trigger fails, just log the error.
if err != nil {
    logger.Error("supportapi.UpdatePaymentRequestStatusHandler could not generate the event")
}
```

The event code is located in `pkg/services/event/event.go`.

### Which Event Should I trigger?

There are too many tables in our MTO to update the Prime about. To reduce the granularity, we have grouped the tables into the following logical objects or entities.

The boxes are the logical objects and the blue highlighted names are the db table names.

The events are always `<LogicalObject>.<Verb>` events, so if you update any table under PAYMENT REQUESTS, like payment_service_items, the event is `PaymentRequest.Update`.

![](/img/webhooks/push-objects.png)

## FAQ

### What is the UpdatedObjectID?

When you call the `TriggerEvent`, you have to pass in the UpdatedObjectID. The updated object is again, the logical object that got updated. If you updated payment_service_items, your UpdatedObjectID is the UUID of the associated Payment Request.

###  What is the MtoID?

The MtoID is the UUID of the overall parent Move. (It is called MtoID because we recently consolidated the Move and MTO tables so in our DB they are the same, but Prime understands Move Task Order)

### What if my endpoint doesn't exist?

Originally we wrote a script to quickly generate all the current endpoints. But as new endpoints are added, you can manually update the appropriate map with the new endpoint.

The endpoints are stored in a map in `pkg/services/event/{api}_endpoint.go`.
There you need to add an entry for your endpoint.
The key name is defined by the `operationID` in the yaml. Please follow the pattern.
```
// GhcUpdatePaymentRequestStatusEndpointKey is the key for the updatePaymentRequestStatus endpoint in ghc
const GhcUpdatePaymentRequestStatusEndpointKey = "Ghc.UpdatePaymentRequestStatus"
```

And then add that key into the map.
```
var ghcEndpoints = EndpointMapType{
...
  GhcUpdatePaymentRequestStatusEndpointKey: {
	APIName:     GhcAPIName,
	OperationID: "updatePaymentRequestStatus",
},
```

After that, you have a new endpoint you can pass in with your event trigger.

## Reference
* [Acceptance testing notifications](https://transcom.github.io/mymove-docs/docs/backend/testing/acceptance-testing-notifications/)
