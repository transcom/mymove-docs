---
sidebar_position: 19
---

# What Is Optimistic Locking?

Optimistic locking is a strategy to avoid conflicts when multiple people may be editing a single record. Before committing a change, the system checks to make sure the record hasn't been updated before committing the update. For more information, check out the [Wikipedia page](https://en.wikipedia.org/wiki/Optimistic_concurrency_control) and [this MDN section on avoiding mid-air collisions](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag#avoiding_mid-air_collisions).

# How To Use Optimistic Locking (With E-Tags)

ETags (or entity tags) are an HTTP response header. An ETag is an identifier for a specific version of a resource. It lets caches be more efficient and save bandwidth, as a web server does not need to resend a full response if the content was not changed. Additionally, etags help to prevent simultaneous updates of a resource from overwriting each other. See references below for further information and related ADRs on why ETags are used on this project.

ETags are used in conjunction with the If-Match conditional HTTP request header. For GET and HEAD methods, the server will return the requested resource only if it matches one of the listed ETags. For PUT and other non-safe methods, it will only upload the resource in this case. 

*Note: you'll probably want to use this on `PUT` or `PATCH` endpoints only.*

## Leaning on the query builder

Let's say you're building out a new endpoint that needs optimistic locking to avoid people updating stale data. You have a handler and a service object, let's call them `WidgetHandler` and `WidgetUpdater` respectively. The `WidgetUpdater` is going to take care of the business logic. Let's take a look at the handler first:

```go
type PatchWidgetHandler struct {
  //...
  services.WidgetUpdater
}


func (h PatchWidgetHandler) Handle(params widgetops.PatchWidgetParams) middleware.Responder {
  //...

  eTag := params.IfMatch

  widget := h.UpdateWidget(someArg, eTag)

  //...
}
```

We're grabbing the E-tag from the `If-Match` header, and passing it along to the
service object. Meanwhile, in the service object:

```go
type widgetUpdater struct {
  //...
  builder QueryBuilder
}

func (w *widgetUpdater) UpdateWidget(someArg interface{}, eTag string) {
  var widget models.Widget
  //...

  verrs, err := w.builder.UpdateOne(&widget, &eTag)
}

type PreconditionFailedError struct {
  id  uuid.UUID
  Err error
}

func (e PreconditionFailedError) Error() string {
  return fmt.Sprintf("widget with id: '%s' could not be updated due to the record being stale", e.id.String())
}
```

You'll notice that `UpdateOne`, a function that takes a model struct as an
`interface{}` in order to find the record and update it, now takes an optional
`string` argument for an E-tag. If the supplied E-tag is stale, `UpdateOne` will
return a `query.StaleIdentifierError` that you can then use to return a `412
Precondition Failed` in the handler:

```go
//...
widget, err := h.UpdateWidget(someArg, eTag)
if err != nil {
  logger.Error("error: ", zap.Error(err))

  switch e := err.(type) {
  case widget.NotFoundError:
    return widgetops.NewPatchWidgetNotFound()
  case widget.PreconditionFailedError:
    return widgetops.NewPatchWidgetPreconditionFailed()
  default:
    return widgetops.NewPatchWidgetInternalServerError()
  }
}

return widgetops.NewPatchWidgetOk().WithPayload(widget) // make sure payload includes updated E-tag.
//...
```

## How to use optimistic locking on the front-end

Luckily, once we've added the `eTag` key to our Swagger configuration, it's
automatically stored in the Redux state. All we have to do is pull it out of the
Redux state when we need it.

Let's say we need to make an update to an MTO's status. First, we'll need to
visit the entity file:

```javascript
// src/shared/Entities/modules/moveTaskOrders.js

//...


const updateMoveTaskOrders = 'moveTaskOrder.updateMoveTaskOrderStatus';
export function updateMoveTaskOrderStatus(
  moveTaskOrderID,
  isAvailableToPrime,
  label = updateMoveTaskOrders,
) {
  const swaggerTag = 'moveTaskOrder.updateMoveTaskOrderStatus';
  return swaggerRequest(
    getGHCClient,
    swaggerTag,
    { moveTaskOrderID },
    { updateMoveTaskOrders },
  );
}

//...
```

We need to make sure this function takes an ETag as an argument and passes it
along in the `If-Match` header:

```javascript
// src/shared/Entities/modules/moveTaskOrders.js

//...


const updateMoveTaskOrders = 'moveTaskOrder.updateMoveTaskOrderStatus';
export function updateMoveTaskOrderStatus(
  moveTaskOrderID,
  ifMatchETag,
  isAvailableToPrime,
  label = updateMoveTaskOrders,
) {
  const swaggerTag = 'moveTaskOrder.updateMoveTaskOrderStatus';
  return swaggerRequest(
    getGHCClient,
    swaggerTag,
    { moveTaskOrderID, 'If-Match': ifMatchETag },
    { updateMoveTaskOrders },
  );
}

//...
```

Now we need to find where this function is actually being called. It looks like
it's being used as the callback for a button click:

```jsx
// src/scenes/Office/TOO/customerDetails.jsx

//...


<button
  data-hi={moveTaskOrder.eTag}
  onClick={() => this.props.updateMoveTaskOrderStatus(moveTaskOrder.id)}
>
  Send to Prime
</button>

//...
```

We'll need to supply the ETag as an argument:

```jsx
// src/scenes/Office/TOO/customerDetails.jsx

//...


<button
  onClick={() => this.props.updateMoveTaskOrderStatus(moveTaskOrder.id, moveTaskOrder.eTag)}
>
  Send to Prime
</button>

//...
```

You should now be able to update the move task order without getting that pesky
`412 Precondition Failed` error.

# References
- [Entity Tags on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag)
- [If-Match header on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Match)
- [Optimistic concurrency control on Wikipedia](https://en.wikipedia.org/wiki/Optimistic_concurrency_control)
- [Optimistic Locking in a REST API](https://sookocheff.com/post/api/optimistic-locking-in-a-rest-api/)
- [ADR 0042: Use If-Match / E-tags for optimistic locking ](https://github.com/transcom/mymove/blob/a0eb0fb0d58f06493f26bff553d78fff5fa1aa86/docs/adr/0042-optimistic-locking.md)
- [ADR 0049: Do not update child records using parent's E-tag](https://github.com/transcom/mymove/blob/master/docs/adr/0049-etag-for-child-updates.md)
