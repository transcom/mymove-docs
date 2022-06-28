## Test Setup

Most handler tests require the same boilerplate code and setup steps.

- Create the necessary models in the DB. For example:
  ```golang
  move := testdatagen.MakeDefaultMove(suite.DB())
  order := move.Orders
  ```

- Set up the Body of the HTTP request if creating or updating a model:
  ```golang
  body := &ghcmessages.UpdateOrderPayload{
      Sac: handlers.FmtString("987654321"),
  }
   ```

- Define the request:
  ```golang
  request := httptest.NewRequest("PATCH", "/orders/{orderID}", nil)
  ```

- Set up the params:
  ```golang
  params := orderop.UpdateOrderParams{
      HTTPRequest: request,
      OrderID:     strfmt.UUID(order.ID.String()),
      IfMatch:     etag.GenerateEtag(order.UpdatedAt),
      Body:        body,
  }
  ```

- Set up the context:
  ```golang
  context := handlers.NewHandlerConfig(suite.DB(), suite.TestLogger())
  ```

- Set up the handler:
  ```golang
  handler := UpdateOrderHandler{
      context,
      orderservice.NewOrderUpdater(suite.DB()),
  }
  ```

- Validate the Body. This runs the Swagger validation against the generated params before passing to the handler, which is what happens when the real endpoint is hit.
  ```golang
  suite.NoError(params.Body.Validate(strfmt.Default))
  ```

- Finally make the request:
  ```golang
  response := handler.Handle(params)
  ```

To test the response, make sure to test all the fields that you expect to be present. For example:

```golang
response := handler.Handle(params)
suite.IsNotErrResponse(response)
orderOK := response.(*orderop.GetOrderOK)
ordersPayload := orderOK.Payload

suite.Assertions.IsType(&orderop.GetOrderOK{}, response)
suite.Equal(order.ID.String(), ordersPayload.ID.String())
suite.Equal(move.Locator, ordersPayload.MoveCode)
suite.NotNil(order.NewDutyStation)
suite.NotZero(order.OriginDutyStation)
suite.NotZero(ordersPayload.DateIssued)
```

Note that the expected order of arguments to `suite.Equal` is `(expected, actual)`. The payload attributes should always be on the right. This makes it easier to troubleshoot.
Whenever a value is known, we want to prefer checking explicitly for the value using `suite.Equal`
or `suite.EqualValues`. 
Read the [Testing Best Practices](testing-best-practices.md) for more guidance.

## Inspecting the response

Because we use Swagger to generate API code, each handler has its own response `type`
for each defined HTTP status. For example, when the status is 200, the `UpdateOrder` 
handler has a response `type` of `orderop.UpdateOrderOK{}`.
To get the payload of the response, you have to do something like this:

```golang
payload := response.(*orderop.UpdateOrderOK).Payload
```

Then you can fetch the various attributes, such as `payload.MoveCode`.

If you're used to web frameworks like Rails, you might prefer to inspect the payload as
JSON for debugging. Here's how to parse the response as JSON:

```golang
payload := response.(*orderop.UpdateOrderOK).Payload
jsonPayload, errJSONMarshall := json.Marshal(payload)
if errJSONMarshall != nil {
  fmt.Println("failed to parse payload as JSON")
}
fmt.Println(string(jsonPayload))
```