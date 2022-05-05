---
sidebar_position: 11
---

# Testing best practices

## General guidelines

- Be explicit when verifying values
- Avoid `NotEqual` or `NotNil` tests because they can lead to a false sense of security. Prefer testing for specific values with `Equal` or `Nil`.
- Before iterating through a range, make sure that the range is not empty first.
- When verifying an expected error, you **must** check the type of the error, and if necessary, the contents of the error message. `suite.Error(err)` or `suite.NotNil(err)` is not enough because they can result in false positives of false negatives.
- Do not write a huge setup with subtests that reference variables several lines above the subtest. Create a separate setup for each test for readability.
- Subtests must be able to run in isolation. You can verify this with Goland, which makes it easy to run individual subtests.
- Avoid `mock.anything`. Part of mocking is to ensure that the object that is mocked has been called with the right arguments. If a handler is supposed to call a service object with a specific model ID, then if you use `mock.anything` in the test and you introduce a bug in the handler where it passes in the wrong ID, the test will still pass. If you find it hard to avoid using `mock.anything`, it's most likely a sign the code under test is not designed properly.
- Always validate `Params` in handlers using `suite.NoError(params.Body.Validate(strfmt.Default))`
- When using `testdatagen` to create data for test, pass `Stub: true` into the assertions when the object being created doesn't need to be saved to the database. Such as in instances when the test only needs to check for validation errors or when returning a mocked response. 

## Examples of tests that will pass when they should fail

### Using NotEqual

This test below is supposed to verify that if a service item has an existing `RejectionReason`, and if the service item is approved, it should no longer have a `RejectionReason`. The way the test is making that verification is by asserting that the updated service item's `RejectionReason` is not equal to the one it had at the beginning of the test. This is not a valid test because if the code changed to set the `RejectionReason` to any value that is not the original one, the test would pass, but we expect it to fail. Instead, we should assert that the `RejectionReason` is `nil`.

```golang
func (suite *HandlerSuite) TestUpdateMTOServiceItemStatusHandlerApproveSuccess() {
    mtoServiceItem := suite.createServiceItem()
    mtoServiceItem.Status = models.MTOServiceItemStatusApproved
    reason := "should not update reason"
    mtoServiceItem.RejectionReason = &reason

    request := httptest.NewRequest("PATCH", "/service-items/{mtoServiceItemID}/status", nil)
    params := mtoserviceitemop.UpdateMTOServiceItemStatusParams{
	HTTPRequest:      request,
	MtoServiceItemID: mtoServiceItem.ID.String(),
	Body:             payloads.MTOServiceItem(&mtoServiceItem),
	IfMatch:          etag.GenerateEtag(mtoServiceItem.UpdatedAt),
    }

    // rest of handler boilerplate goes here

    suite.NotEqual(mtoServiceItemPayload.RejectionReason, reason)
}
```
There is another issue with the test above. Can you spot it?

The `RejectionReason` is not being saved to the database, and so it will always be `nil` in the payload. If you comment out the code in the service that sets the `RejectionReason` to `nil`, the test will still pass, which is not good. Here is what the test should look like:

```golang
func (suite *HandlerSuite) TestUpdateMTOServiceItemStatusHandlerApproveSuccess() {
    mtoServiceItem := suite.createServiceItem()
    reason := "should not update reason"
    mtoServiceItem.RejectionReason = &reason
    suite.MustSave(&mtoServiceItem)
    mtoServiceItem.Status = models.MTOServiceItemStatusApproved

    request := httptest.NewRequest("PATCH", "/service-items/{mtoServiceItemID}/status", nil)
    params := mtoserviceitemop.UpdateMTOServiceItemStatusParams{
	HTTPRequest:      request,
	MtoServiceItemID: mtoServiceItem.ID.String(),
	Body:             payloads.MTOServiceItem(&mtoServiceItem),
	IfMatch:          etag.GenerateEtag(mtoServiceItem.UpdatedAt),
    }

    // rest of handler boilerplate goes here

    suite.Nil(mtoServiceItemPayload.RejectionReason)
}
```

### Not checking the length of an array before iterating through it

In this test below, if the `UpdateMTOShipmentStatus` function is refactored and
stops returning service items, the test will still pass. If
the `serviceItems` array is empty, the code inside the `for` loop will
not be executed.

```golang
suite.T().Run("Create approved service items when the mtoShipment is approved", func(t *testing.T) {
    shipmentForAutoApproveEtag := etag.GenerateEtag(shipmentForAutoApprove.UpdatedAt)
    serviceItems := models.MTOServiceItems{}

    _, err := updater.UpdateMTOShipmentStatus(shipmentForAutoApprove.ID, status, nil, shipmentForAutoApproveEtag)
    suite.NoError(err)

    err = suite.DB().Where("mto_shipment_id = ?", shipmentForAutoApprove.ID).All(&serviceItems)
    suite.NoError(err)

    // If we've gotten the shipment updated and fetched it without error then we can inspect the
    // service items created as a side effect to see if they are approved.
    for _, serviceItem := range serviceItems {
        suite.Equal(models.MTOServiceItemStatusApproved, serviceItem.Status)
    }
}
```
To make this test more robust, first make sure the `serviceItems` array contains the expected amount of items:
```golang
suite.Equal(6, len(serviceItems))
```
