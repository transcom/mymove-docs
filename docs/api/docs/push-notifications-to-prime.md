---
sidebar_position: 2
---

# Push Notifications to Prime

The push mechanism is a way to notify the Prime of changes as they happen.

We will be using Web Hooks to implement the push mechanism.

> Webhooks are a useful and a resource-light way to implement event reactions. Web hooks provide a mechanism where by a server-side application can notify a client-side application when a new event (that the client-side application might be interested in) has occurred on the server.
>
>Source: https://codeburst.io/what-are-webhooks-b04ec2bf9ca2

For a quick primer on REST hooks and overview of webhooks - this is a great start → https://resthooks.org/docs/

For this to work, all updates to objects that are of interest to the Prime should trigger an event. The notifications code will check the event to see if there is an active subscription to this event and store a notification record and payload to be sent to the Prime.

It's important to note that since Milmove is a Dod property, the connection to the subscriber will be an mTLS connection.

## Design

There are three components of the solution

* **Subscribe to Notifications** - The prime will subscribe to notifications using a URL that Milmove can send a POST request to.
* **Generate Notifications** - Updates to the MTO in Milmove will trigger events which will store notifications.
* **Send Notifications** - A client will read the notifications and send them to Prime.

## Subscribe to Notifications

![](/img/webhooks/subscribe-notifications.png)

We create a table to hold the subscriptions so we can add, delete and modify their subscriptions.

We need a certificate to send them the notifications, so subscription records should have an id that can be used to find the certificate.

A subscription consists of `Object+verb event code`, `subscriberID`, `url` to
contact and `subscription` status.

> Subscription endpoints are not MVP. This means that we will not create
> endpoints for subscribe/delete etc.. With only one subscriber, endpoints for
> self-service have limited value compared to a typical rest hooks
> implementation.

## Generate Notifications

![](/img/webhooks/generate-notifications.png)

Next, we generate events when they occur in our system, by calling an event package. The event function will collect information that will allow the audit pkg and notifications pkg to assemble the record that they need to store.

Relevant code is in **[pkg/services/event/event.go](https://github.com/transcom/mymove/blob/main/pkg/services/event/event.go)**

Event struct will contain the following parameters

```golang
type Event struct {
   EventKey        KeyType                 // Pick from a select list of predefined events (PaymentRequest.Create)
   Request         *http.Request           // We expect to get this from the handler
   MtoID           uuid.UUID               // This is the ID of the MTO that the object is associated with
   UpdatedObjectID uuid.UUID               // This is the ID of the object itself (PaymentRequest.ID)
   EndpointKey     EndpointKeyType         // Pick from a select list of endpoints
   DBConnection    *pop.Connection         // The pop connection DB
   HandlerConfig   handlers.HandlerConfig  // The handler config
   logger          handlers.Logger         // The logger
}
```

Dev would call event trigger code such as

```golang
_, err := TriggerEvent(Event{
   EndpointKey:     SupportUpdatePaymentRequestStatusEndpointKey,
   EventKey:        PaymentRequestCreateEventKey,
   UpdatedObjectID: paymentRequestID,
   MtoID:           mtoID,
   Request:         &dummyRequest,
   HandlerConfig:   handler,
   DBConnection:    h.DB(),
})
```

For more information on triggering events, read [How to Add an Event Trigger](/docs/backend/guides/how-to/add-an-event-trigger)

Note: The event package is generic and services all events for all internal and external needs. It will not sanitize or assemble the data for the Prime notifications. It should initially support the expected needs of the notifications and audit records.

## Event Types

For notifications, we need to break down our MTO into smaller logical objects to be able to send over smaller updates than the full MTO.

For an effective solution, we had to pick a level of granularity for the events and notification bodies.

We do not want to send the whole MTO on each event, not do we want to send a single address record. Instead we have picked a set of logical objects that match updates that the Prime would like to see.

### Logical Objects

Logical Objects that the Prime is interested in are:

* Move - Consists of `Move` and `Contractors`
* Orders - Consists of `Orders`, `Customer`, `Entitlement`, `DutyStation`, and `Address`.
* MTOShipment - Consists of `MTOShipment`, `Agent` and `Address`.
* MTOServiceItem - Consists of `MTOServiceItem`, `MTOServiceItemDimensions`, `MTOServiceItemCustomerContacts`
* PaymentRequest - Consists of `PaymentRequest`, `PaymentServiceItems`, `PaymentServiceItemParams` and `Uploads`

What this means is an update to an address on an MTOShipment should result in an "MTOShipment.Update" event.

![](/img/webhooks/push-objects.png)

## Notifications

The notifications code will register a handler with the event package. When an event happens, the event pkg will call each registered handler.

```golang
   for i := 0; i < len(registeredEventHandlers); i++ {
       err := registeredEventHandlers[i](&event)
       if err != nil {
           errorList = append(errorList, err)
       }
   }
```

The handler will then assemble the data it needs to store in its record. It can also contain its own logic about whether a notification needs to be sent.

`NotificationEventHandler` function will get the `EventKey`, `MtoID`, `Request` params, and `ObjectID`.

It will check that the originator of the action was not the same as the prime, that the MTO is available to prime and if so, create a payload from the logical object.

It will store a record with all relevant information including the payload in the notifications table.

Relevant code is in **[pkg/services/event/notification.go](https://github.com/transcom/mymove/blob/main/pkg/services/event/notification.go)**

## Send Notifications

![](/img/webhooks/send-notifications.png)

To send the payload, we use an app called the webhook-client that will
periodically check the webhook_notifications table and send to the Prime.

The app will be asynchronous to the rest of the handling of the event. This is intentional to avoid increasing the time to execute the handler.
