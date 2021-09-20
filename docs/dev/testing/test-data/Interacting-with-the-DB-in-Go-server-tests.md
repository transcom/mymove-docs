## Background
The `mymove` repo uses the DB in some particular ways that might be surprising to folks who are new to Golang. Here are some things to be aware of that might trip you up if you have a background in Rails, RSpec, and ActiveRecord.

### Cleaning the DB in between tests
When writing tests that interact with the database, we want to start with a clean slate at the beginning of each test so that data from one test doesn't affect data in another test. Ideally, every test would be run inside a transaction, and the DB would automatically roll back to a clean state. This is how RSpec and Rails system tests work, as an example of industry best practices. The way MilMove is currently configured, we have to truncate the DB manually, which is one of the reasons our server tests are slow.

In order to allow tests from multiple packages to run in parallel (which is one way to speed up the tests), we have to create a separate copy of the DB for each package. This happens in [pop_suite.go](https://github.com/transcom/mymove/blob/master/pkg/testingsuite/pop_suite.go) and was introduced in [this PR](https://github.com/transcom/mymove/pull/1776). In order to take advantage of this, a package must define test setup functions in a separate file that defines the test suite `type`, and that other tests in the same package can use. For example, the test setup for the `move` service in `pkg/services/move` is in `pkg/services/move/move_services_test.go`:

```golang
package move

import (
    "testing"

    "github.com/stretchr/testify/suite"
    "go.uber.org/zap"

    "github.com/transcom/mymove/pkg/testingsuite"
)

type MoveServiceSuite struct {
    testingsuite.PopTestSuite
    logger Logger
}

func TestMoveServiceSuite(t *testing.T) {
    ts := &MoveServiceSuite{
        PopTestSuite: testingsuite.NewPopTestSuite(testingsuite.CurrentPackage()), 
	logger:       zap.NewNop(), // Use a no-op logger during testing
    }
    suite.Run(t, ts)
    ts.PopTestSuite.TearDown()
}
```

Other tests within this package will then use the `MoveServiceSuite` type, such as in `pkg/services/move/move_list_fetcher_test.go`:

```golang
func (suite *MoveServiceSuite) TestFetchMoveList() {
  ...
}
```

Note that with this config, the DB will **not** get truncated in between tests, which can lead to confusion, and wasted time debugging. In this case, `move_list_fetcher_test.go` is the only test in this package, and it only has one function, so the lack of truncation isn't a problem. For now. Save yourself the trouble, and add a `SetupTest` function to truncate the DB in between tests. Most tests already have this function, but if you're adding a new service, you'll need to add it:

```golang
func (suite *MoveServiceSuite) SetupTest() {
    err := suite.TruncateAll()
    suite.FatalNoError(err)
}
```

Another very important note is that the DB will only be truncated in between functions in tests. It will **not** be truncated in between subtests within the same function. Coming from RSpec, this was surprising to me and has tripped me up several times. Here is an example of subtests that begin with `suite.T().Run`:

```golang
func (suite *MoveOrderServiceSuite) TestListMoves() {
    // Create a Move without a shipment to test that only Orders with shipments
    // are displayed to the TOO
    testdatagen.MakeDefaultMove(suite.DB())

    expectedMove := testdatagen.MakeHHGMoveWithShipment(suite.DB(), testdatagen.Assertions{})

    officeUser := testdatagen.MakeDefaultOfficeUser(suite.DB())

    moveOrderFetcher := NewMoveOrderFetcher(suite.DB())

    suite.T().Run("returns moves", func(t *testing.T) {
      moves, _, err := moveOrderFetcher.ListMoveOrders(officeUser.ID, &services.ListMoveOrderParams{PerPage: swag.Int64(1), Page: swag.Int64(1)})

      suite.FatalNoError(err)
      suite.Len(moves, 1)
    })

    suite.T().Run("returns moves filtered by GBLOC", func(t *testing.T) {
      // This move is outside of the office user's GBLOC, and should not be returned
      testdatagen.MakeHHGMoveWithShipment(suite.DB(), testdatagen.Assertions{
        TransportationOffice: models.TransportationOffice{
          Gbloc: "AGFM",
        },
      })

      moves, _, err := moveOrderFetcher.ListMoveOrders(officeUser.ID, &services.ListMoveOrderParams{PerPage: swag.Int64(1), Page: swag.Int64(1)})

      suite.FatalNoError(err)
      suite.Equal(1, len(moves))
    })
}
```
In the test above, the second subtest keeps in mind that the data from the previous subtest still exists in the DB, and adjusts the expected payload length accordingly. Subtests allow for more expressive test descriptions, so their use is encouraged, but if there are more than 2 subtests that depend on the DB, it's best to avoid confusion and clear the DB manually by calling `suite.TruncateAll()` at the beginning of each subtest after the first one.

### Testing associations on models
If you're writing an integration test that verifies that a model was created, and you also want to check attributes on associations, you have to load the associations manually. Pop, unlike ActiveRecord, does not automatically load associations.

For example, let's say we want to verify that service items were created in the DB, and then iterate through them to make sure the `Code` in the `ReService` association was properly created. If we do it like this:

```golang
var expectedReServiceCodes []models.ReServiceCode
expectedReServiceCodes = append(expectedReServiceCodes,
  models.ReServiceCodeDLH,
  models.ReServiceCodeFSC,
  models.ReServiceCodeDOP,
  models.ReServiceCodeDDP,
  models.ReServiceCodeDPK,
  models.ReServiceCodeDUPK,
)

err = suite.DB().Where("mto_shipment_id = ?", shipmentForAutoApprove.ID).All(&serviceItems)

for i := range serviceItems {
   suite.Equal(expectedReServiceCodes[i], serviceItems[i].ReService.Code)
}
```
the test will fail by saying that the actual Code is an empty string, which is misleading because it makes it sound like it was able to fetch the associated ReService.

The solution is to load the association first. There are two ways to do this:

Using `Eager` or `EagerPreload`:
```golang
err = suite.DB().EagerPreload("ReService").Where("mto_shipment_id = ?", shipmentForAutoApprove.ID).All(&serviceItems)
```

Or by using Pop's `Load` function. You can either Load them all:

```golang
err = suite.DB().Where("mto_shipment_id = ?", shipmentForAutoApprove.ID).All(&serviceItems)
suite.DB().Load(&serviceItems)
```

Or just the one(s) you want:

```golang
err = suite.DB().Where("mto_shipment_id = ?", shipmentForAutoApprove.ID).All(&serviceItems)
suite.DB().Load(&serviceItems, "ReService")
```