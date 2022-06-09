# Validation in Service Objects

This is being converted, as it gets covered in the new page, I'll remove the corresponding sections below. 
[New version](/docs/backend/guides/service-objects/validation)

### Connecting the service

Once you have finished creating the `validateModel` function and defining your rules, you are ready to connect your 
service object to the validation. First, go to your service object's struct and add a field for the validators:

```go title="./pkg/services/reweigh/reweigh_creator.go"
type reweighCreator struct {
    checks []validator // a slice of validator functions
}
```

Now we're going to set the validators in the `New<ServiceObject>` function. To start with, we'll set the basic set of
checks:

```go title="./pkg/services/reweigh/reweigh_creator.go" {3}
// NewReweighCreator creates a new struct with the service dependencies and returns the interface type
func NewReweighCreator() services.ReweighCreator {
    return &reweighCreator{basicChecks()}
}
```

We don't allow the user to pass in the checks so that way we can dictate how our service is validated across the entire
app. To allow the caller to use the Prime validator functions instead, we'll make a new `New<ServiceObject>` function 
to handle it:

```go title="./pkg/services/reweigh/reweigh_creator.go"
// NewPrimeReweighCreator creates a new ReweighCreator with Prime-specific validation
func NewPrimeReweighCreator(checker services.MoveTaskOrderChecker) services.ReweighCreator {
    return &reweighCreator{primeChecks(checker)}
}
```

Using this strategy, we can add however many `New<Validation><ServiceObject>` functions as we need to. They will all 
return the same service interface with different validators. This way we don't have to muddle with our interface 
definition, which is great because every modification to an interface has to be reproduced with every struct that 
implements that interface. Creating new initializer functions is the least invasive way to change up our validation.

Finally, we have to call the `validateModel` function in our service method: 

```go title="./pkg/services/reweigh/reweigh_creator.go"
// CreateReweigh creates a new reweigh for a shipment. It is a method on the reweighCreator struct.
func (f *reweighCreator) CreateReweigh(appCtx appcontext.AppContext, reweigh *models.Reweigh) (*models.Reweigh, error) {
    // Set up an empty model to receive any data found by Pop
    mtoShipment := &models.MTOShipment{}
    // Find the shipment using the ShipmentID provided in our reweigh input
    err := appCtx.DB().Find(mtoShipment, reweigh.ShipmentID)
    if err != nil {
        // Return our standard NotFoundError type if there's an error
        return nil, services.NewNotFoundError(reweigh.ShipmentID, "while looking for MTOShipment")
    }

    // Run the (read-only) validations
    // highlight-start
	if verr := validateReweigh(appCtx, *reweigh, nil, mtoShipment, f.checks...); verr != nil {
		return nil, verr
	}
    // highlight-end

    txErr := appCtx.NewTransaction(func(txnCtx appcontext.AppContext) error {
        verrs, err := txnCtx.DB().ValidateAndCreate(reweigh)
        // Check for validation errors encountered before Pop created the reweigh
        if verrs != nil && verrs.HasAny() {
            // Return our standard InvalidInputError type
            return services.NewInvalidInputError(uuid.Nil, err, verrs, "Invalid input found while creating the reweigh.")
        } else if err != nil {
            // If the error is something else (this is unexpected), we create a QueryError
            return services.NewQueryError("Reweigh", err, "")
        }
        return nil
    })
    if txErr != nil {
        return nil, txErr
    }

    return reweigh, nil
}
```

And we're done! Now it's up to the caller to decide whether to use the base checks, the Prime checks, or to write new 
rules functions and create a different set of checks, if necessary. 

## Testing the Pattern

Testing the pattern is generally like testing any Go code (look at the tests for the [linked examples](#examples) for
more inspiration). However, here are some guidelines for what you should focus on for each part of the pattern:

* Testing rule functions (`rules_test.go`)
  * Each one of these functions should be independent and modular, so creating test cases should be easiest to do at 
  * this level. Take advantage of this and write thorough unit tests for all the cases you can think of.
* Testing the validation utility code (`validation_test.go`)
  * This code is generally boilerplate and extremely similar across service objects. An integration test or two is 
    typically fine.
* Testing the service object (`<service_action>_test.go`)
  * You should still be testing for every possible return value from this service object. When it comes to testing 
    interactions with the validators, a few integration tests and/or some mocks should be sufficient.
  * You should have at least one test for each different version of the `New<ServiceObject>()` function you wrote.  
    Make sure the correct checks are being used, but you do not need to thoroughly unit test each distinct test 
    again (since that should be done in `rules_test.go`).

## Examples

* Move Excess Weight Uploader
  * https://github.com/transcom/mymove/blob/master/pkg/services/move/excess_weight_uploader.go
  * https://github.com/transcom/mymove/blob/master/pkg/services/move/validation.go
* Reweighs
  * https://github.com/transcom/mymove/blob/master/pkg/services/reweigh/rules.go
  * https://github.com/transcom/mymove/blob/master/pkg/services/reweigh/validation.go
* https://github.com/transcom/mymove/blob/master/pkg/services/reweigh/validation.go
* https://github.com/transcom/mymove/blob/master/pkg/services/mto_shipment/validation.go
