# Validation in Service Objects

This is being converted, as it gets covered in the new page, I'll remove the corresponding sections below. 
[New version](/docs/backend/guides/service-objects/validation)


### `rules` functions

Create a `rules.go` file in your service object's sub-package. You will need to use the types defined in 
`validation.go`, so make sure you complete that step first. 

You will also need a list of business rules to implement - **you didn't skip that step, right?**

For our example, we will implement two different rules:

* Check that an ID value isn't present when creating a reweigh. This can cause unexpected server errors if we don't 
  catch it.
* Check if a reweigh is associated with a Prime-available move.

```go title="./pkg/services/reweigh/rules.go"
package reweigh

import (
	"github.com/transcom/mymove/pkg/appcontext"
    "github.com/transcom/mymove/pkg/models"
)

// checkReweighID checks that the user can't manually set the reweigh's ID
func checkReweighID() validator {
	return validatorFunc(func(appCtx appcontext.AppContext, reweigh models.Reweigh, delta *models.Reweigh, shipment *models.MTOShipment) error {
		//TODO
	})
}

// checkPrimeAvailability checks that move associated with the reweigh is available to the Prime contractor
func checkPrimeAvailability() validator {
	return validatorFunc(func(appCtx appcontext.AppContext, reweigh models.Reweigh, delta *models.Reweigh, shipment *models.MTOShipment) error {
		//TODO
	})
}
```

These functions are [**closures**](https://gobyexample.com/closures), which basically means a function within function.
In this case, the outer function has no parameters and returns the `validator` interface type. 

The _inner_ function, however, must have a signature that is exactly the same as our `validatorFunc` function type so
that we can use the interface. This means you will have to change all of these rule functions if you ever change that 
base signature, so keep that in mind as you continue working on validation.

#### `checkReweighID`

Let's add the logic for our `checkReweighID` rule:

```go title="./pkg/services/reweigh/rules.go" {3}
// checkReweighID checks that the user can't manually set the reweigh's ID
func checkReweighID() validator {
	return validatorFunc(func(_ appcontext.AppContext, reweigh models.Reweigh, delta *models.Reweigh, _ *models.MTOShipment) error {
		verrs := validate.NewErrors()
        // If there is no delta, then we are creating a new reweigh:
		if delta == nil {
			if reweigh.ID != uuid.Nil {
				verrs.Add("ID", "cannot manually set a new reweigh's UUID")
			}
		}
		return verrs
	})
}
```

Observe that on line 3, we use `_` to mark the input parameters that we don't use in this rule (in this case, `appCtx`
and `shipment`). Since we need a verbose signature to fit our needs for _all_ of these rules, there is no way we're 
going to use everything in every single rule. Use `_` to make clear what is relevant and what isn't.

On line 4, we also initialize a `verrs` variable. This is so we can accumulate our invalid input errors. We always 
return this at the end of our rule function. An empty `verrs` instance will be ignored.

#### `checkPrimeAvailability`

This one is a little different:

```go title="./pkg/services/reweigh/rules.go" {2,8}
// checkPrimeAvailability checks that move associated with the reweigh is available to the Prime contractor
func checkPrimeAvailability(checker services.MoveTaskOrderChecker) validator {
	return validatorFunc(func(appCtx appcontext.AppContext, reweigh models.Reweigh, _ *models.Reweigh, shipment *models.MTOShipment) error {
		if shipment == nil {
			return services.NewNotFoundError(newReweigh.ID, "while looking for Prime-available Shipment")
		}

		isAvailable, err := checker.MTOAvailableToPrime(appCtx, shipment.MoveTaskOrderID)
		if !isAvailable || err != nil {
			return services.NewNotFoundError(
				reweigh.ID, fmt.Sprintf("while looking for Prime-available Shipment with id: %s", shipment.ID))
		}
		return nil
	})
}
```

We pass in a parameter to the top function, `checkPrimeAvailability`! This is the true power of closures, and it's cool
because it means we were able to pass in a new parameter without changing the signature for all of the other rule
functions. The parameter `checker` is a service that we need for this function in particular to validate the 
Prime-availability rule.

**So what goes in the validator signature and what goes in the input of the outer function?**

There is a lot of room for interpretation with this, but some general guidelines are:

- If it's a dependency that can be set up before the service function is called, pass it in as the input of the outer 
  function.
- If it's data that _must_ be retrieved _during_ the service function, it should be in the validator function signature. 

The parameters in the outer functions are like _dependencies_, and the validator function signature is the true input.

### Grouping `rules` functions

Once we have some rules, we'll want to be able to group them according who called the service. The key here is to 
define functions that will return slices of validator functions, instead of constant slice variables.

```go
// basicChecks are the rules that should always run for reweigh validation
func basicChecks() []validator {
	return []validator{
		checkReweighID(),
	}
}

// primeChecks are the rules that should only run for validating Prime reweigh actions
func primeChecks(checker services.MoveTaskOrderChecker) []validator {
	return []validator{
		checkReweighID(),
		checkPrimeAvailability(checker),
	}
}
```

It looks like we're calling these functions now, which wouldn't make sense because we don't have all the input. But 
remember: These are _closures_, so by calling the outer function, we're getting another function that has not been 
called yet. The returned function is our validator. The validators won't be called until the `validateReweigh()` 
function is executed.

Note that we _do_ pass in whatever parameters we use in the outer functions at this level. This is where we set those 
"dependencies."

These grouping functions can be used in multiple places, and are meant for utility. They are not a hard requirement to
implement the validator pattern, but they are helpful organizational tools. 

In general, you should always have a set of rules for "basic" validation, which is as bare as possible. You'll build up
more requirements as you go, so it's better to err on the side of fewer checks to start with. You may place these group
functions in the `validation.go` or the `rules,go` file - whichever makes more sense for your use case.

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
