---
sidebar_position: 7
---

# How to write fast tests

## Use stubbed models

In many cases, we don't need to save models in the database. The less we use the DB, the faster our tests. For example, there are many tests that create a user only to pass it to the `suite.AuthenticateUserRequest` function. That function doesn't care whether or not the user exists in the DB. It uses the user to set Session variables so we can simulate an authenticated user. In these cases, you should use the `MakeStubbedUser` function in testdatagen.

For tests that use other models but don't need them in the DB, you can stub them by passing in the `Stub: true` assertion, like this:

```golang
officeUser := testdatagen.MakeTOOOfficeUser(suite.DB(), testdatagen.Assertions{
    Stub: true,
})
```
If you find that you are passing in `Stub: true` to the same model in many places, you might consider making a named helper function, such as `MakeStubbedOfficeUser` and placing it in the appropriate file in `pkg/testdatagen`.

## Use mocks when testing response types in handler tests

If the purpose of a handler test is to verify that the appropriate response is returned, the DB is not needed. All models can be stubbed, and functions that call the DB can be mocked to return the desired data or errors. We use the [stretchr/testify](https://github.com/stretchr/testify#mock-package) mocking library.

### Authorization Test Example

```golang
suite.T().Run("When office user is not TOO, response should be 403", func(t *testing.T) {
    moveOrderFetcher := &mocks.MoveOrderFetcher{}
    officeUser := testdatagen.MakeOfficeUser(suite.DB(), testdatagen.Assertions{
      Stub: true,
    })

    req := httptest.NewRequest("GET", fmt.Sprintf("/move_orders"), nil)
    req = suite.AuthenticateOfficeRequest(req, officeUser)

    params := moveorderop.ListMoveOrdersParams{
      HTTPRequest: req,
    }

    handler := ListMoveOrdersHandler{
      handlers.NewHandlerConfig(suite.DB(), suite.TestLogger()),
      moveOrderFetcher,
    }
    response := handler.Handle(params)

    suite.IsType(&moveorderop.ListMoveOrdersForbidden{}, response)
})
```

### Example of testing an error scenario

```golang
suite.T().Run("failed fetch of payment requests", func(t *testing.T) {
    paymentRequestListFetcher := &mocks.PaymentRequestListFetcher{}
    officeUser := testdatagen.MakeTIOOfficeUser(suite.DB(), testdatagen.Assertions{
      Stub: true,
    })
    paymentRequestListFetcher.On("FetchPaymentRequestList", officeUser.ID).Return(nil, errors.New("test failed to create with err returned")).Once()

    req := httptest.NewRequest("GET", fmt.Sprintf("/payment_requests"), nil)
    req = suite.AuthenticateOfficeRequest(req, officeUser)
    params := paymentrequestop.ListPaymentRequestsParams{
      HTTPRequest: req,
    }

    handler := ListPaymentRequestsHandler{
      handlers.NewHandlerConfig(suite.DB(), suite.TestLogger()),
      paymentRequestListFetcher,
    }
    response := handler.Handle(params)

    suite.IsType(&paymentrequestop.ListPaymentRequestsInternalServerError{}, response)
})
```
