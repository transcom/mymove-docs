# Validation in Service Objects

As covered in the [Guide to Service Objects](service-objects), service objects are designed to encapsulate MilMove's business logic. This means that for mutation actions (POST, PUT, PATCH), we will have to thoroughly validate user input to ensure it complies with our business rules. To encourage development of minimal, modular functions to check each rule, we have developed a validation pattern that we can use consistently throughout our service objects. We have also designed it to easily change which rules are applied based on the kind of user performing the action.

## The Pattern

Below is an example of the sub-package structure for a typical service object:

```text
mymove/
├── pkg/
│   ├── services/
│   │   ├── reweigh/ 
│   │   │   ├── reweigh_creator.go
│   │   │   ├── reweigh_creator_test.go
│   │   │   ├── reweigh_service_test.go
│   │   ├── ...
```

To implement the validation pattern, there are two key files we need to add: `validation.go` and `rules.go`:

```text {8,10}
mymove/
├── pkg/
│   ├── services/
│   │   ├── reweigh/ 
│   │   │   ├── reweigh_creator.go
│   │   │   ├── reweigh_creator_test.go
│   │   │   ├── reweigh_service_test.go
│   │   │   ├── rules.go
│   │   │   ├── rules_test.go
│   │   │   ├── validation.go
│   │   │   ├── validation_test.go
│   │   ├── ...
```

The first file, `reweigh_creator.go`, contains the main functionality for our service. This is where we write the function that is exposed outside of the package through an interface. It is the entrypoint for the client.

`validation.go` contains the machinery that executes our validation in this service. It is almost entirely functional, and will generally look similar in other packaged services. A lot of this code is boilerplate.

`rules.go` contains our business logic. This is where we will write the functions that check each of our distinct business rules for the object. They should be able to be called independently of each other.

These three files are the foundation for this pattern. All we need are a function that performs a service, a function that executes validators, and (ideally) many functions that represent the rules for our validation. As business rules are added and removed, `reweigh_creator.go` and `validation.go` should not need to be changed (although there is always an exception to any rule).

Note that this pattern **may not need to be implemented in every service**. The services that involve considerable business logic and/or rules that change based on who the client is will benefit the most from the validation pattern.

## Implementing the Pattern

First things first, you'll need to identify some of the business rules or utilities that you'd like to implement. Common checks will verify if the related move is available to the Prime contractor, if the ID/foreign key values on the base object have been manipulated, if circumstantially required fields have been filled out, and so on.

If you don't know what business rules you'll be working with, **you won't know whether or not you need to implement this pattern.** Do not skip this step.

:::caution Advanced Golang

The validation pattern documented here makes use of some advanced Go patterns. If you're struggling with the syntax or would like more context on what is happening, here are some helpful resources:

* TODO
* Interfaces
* Closures
* Context
* Function types
* Variadic types/parameters

:::

### `validator` interface

Create a `validation.go` file in your service object's sub-package. This is where we'll set up our validator types and write the base function that handles our validation. 

For the first step, we'll define an interface type that all of our validators will implement. This type will have one method, `Validate()`, and it will be private to our service package:

```go title="./pkg/services/reweigh/validation.go"
package reweigh

import (
	"github.com/transcom/mymove/pkg/appcontext"
)

// validator describes a method for checking business requirements on a model
type validator interface {
    Validate(appCtx appcontext.AppContext) error
}
```

Based on our general Go standards, we know this function (and all functions) will take in the `AppContext`. Since the action is "validate," it also makes sense that it would return an error. But what else do we need?

The parameters of `Validate()` should include **all of the model types** that you will need to validate your business rules. This will change on a case-by-case basis, but, at a minimum, you will generally include your subject model type.

For our example, we know we have a `ReweighCreator` service, and we will also have a `ReweighUpdater` service. We need our `models.Reweigh` type for both of these cases as the base model to validate. 

For the updater in particular, we will also need a model type that represents the "delta" of the action, the fields that were modified by the user. 

A reweigh is also affected by the weight fields on the shipment itself, so that is another model type we will need for some validation.

Our fully defined interface is:

```go title="./pkg/services/reweigh/validation.go"
package reweigh

import (
	"github.com/transcom/mymove/pkg/appcontext"
    "github.com/transcom/mymove/pkg/models"
)

// validator describes a method for checking business requirements on a model
type validator interface {
    // The base Reweigh is assumed to be required, so that is a value type. 
    // The delta and shipment parameters are optional, so they are pointer types.
    Validate(appCtx appcontext.AppContext, reweigh models.Reweigh, delta *models.Reweigh, shipment *models.MTOShipment) error
}
```

We can also add the type that will implement this interface. This will be a function type and will enable use to write our rules using [closures](https://gobyexample.com/closures).

```go title="./pkg/services/reweigh/validation.go"
// validatorFunc is an adapter type for converting a function into an implementation of validator
type validatorFunc func(appcontext.AppContext, models.Reweigh, *models.Reweigh, *models.MTOShipment) error

// Validate fulfills the validator interface
func (fn validatorFunc) Validate(appCtx appcontext.AppContext, reweigh models.Reweigh, delta *models.Reweigh, shipment *models.MTOShipment) error {
	return fn(appCtx, reweigh, delta, shipment)
}
```

Note that all of these function signatures are the exact same. **They must stay the same** so that these types implement the `validator` interface defined above. Such is the nature of interfaces types. It might feel inconvenient to repeat this signature over and over, but at least it forces us to be explicit about our input.

### `validateModel` function

The last thing we're going to add to our `validation.go` for the time being is the `validateModel()` function (replace "Model" with the name of your service model). 

This function will take in the necessary data, run through all of the validators we pass in, and return an error as appropriate. It will be called from our service object, meaning it is the primary access point for all of our validation. Our current pattern makes this private, but if any of our validator code was to be made public, this function would be it.

Our signature will look very similar to what we have above, but with the additional `checks` parameter:

```go title="./pkg/services/reweigh/validation.go"
// validateReweigh checks a Reweigh against a passed-in set of business rules
func validateReweigh(
	appCtx appcontext.AppContext,
	reweigh models.Reweigh,
	delta *models.Reweigh,
	shipment *models.MTOShipment,
	checks ...validator,
) (result error) {
	// no code yet
	return result
}
```

This `checks` parameter is what is known as a "variadic parameter," making this a [variadic function](https://gobyexample.com/variadic-functions). This allows us to pass in however many rules we want, granting us flexibility in how we validate services depending on who is using it.

Note that we also have a **named return value**, which allows us to reference the `result` variable as an error type without explicitly defining it. This is a neat little Go trick that helps us write more efficient code.

Now we can add the code to loop through our validators and call the `Validate()` method.

```go title="./pkg/services/reweigh/validation.go"
for _, checker := range checks {
    if err := checker.Validate(appCtx, reweigh, delta, shipment); err != nil {
        // error handling will go here
    }
}
```

After we call `Validate()`, we must handle the error that comes back. We have a couple of guidelines for doing this:

* The [Go Buffalo type `validate.Errors`](https://pkg.go.dev/github.com/gobuffalo/validate) (commonly assigned to `verrs`) should be used to track input errors per field. We do this so the user can get as much information back as possible instead of only seeing one error per request.
    * Use `Add(fieldName str, Message str)` to add individual errors to this type one-at-a-time.
    * Use `Append(verrs validate.Errors)` to combine lists of validation errors.
* All validation errors should be wrapped in a `services.InvalidInputError` type when returned from the service object.
* Any other error types are not combined and take immediate precedence over input errors. For example, the error saying that the model should not have been visible to the caller will take precedence over an error about the phone number being mistyped. 

In order to follow these guidelines, we need to check the type of the error being returned from the validator. If the error is a validation error type, we will combine it with an ongoing list of validation errors and continue checking the rest of the validators. 

If it is _not_ a validation error, we stop everything and return it right away.

```go title="./pkg/services/reweigh/validation.go" {1,4-12}
verrs := validate.NewErrors()
for _, checker := range checks {
    if err := checker.Validate(appCtx, reweigh, delta, shipment); err != nil {
        switch e := err.(type) {
		case *validate.Errors:
			// Accumulate all validation errors
			verrs.Append(e)
		default:
			// Non-validation errors have priority,
			// and short-circuit doing any further checks
			return err
		}
    }
}
```

If we finish checking all of our validators, and we haven't run into any priority errors, we'll need to check if we found any validation errors and wrap them in an `InvalidInputError`. This is the last step to complete our `validateReweigh` function.


```go title="./pkg/services/reweigh/validation.go"
// validateReweigh checks a Reweigh against a passed-in set of business rules
func validateReweigh(
	appCtx appcontext.AppContext,
	reweigh models.Reweigh,
	delta *models.Reweigh,
	shipment *models.MTOShipment,
	checks ...validator,
) (result error) {
    verrs := validate.NewErrors()
    for _, checker := range checks {
        if err := checker.Validate(appCtx, reweigh, delta, shipment); err != nil {
            switch e := err.(type) {
            case *validate.Errors:
                // Accumulate all validation errors
                verrs.Append(e)
            default:
                // Non-validation errors have priority,
                // and short-circuit doing any further checks
                return err
            }
        }
    }
    // highlight-start
    if verrs.HasAny() {
	    result = services.NewInvalidInputError(reweigh.ID, nil, verrs, "Invalid input found while validating the reweigh.")
    }
    // highlight-end
	return result
}
```

This function is almost entirely boilerplate - it can be copied and pasted from one service to another with minimal changes.

### `rules` functions

Create a `rules.go` file in your service object's sub-package. You will need to use the types defined in `validation.go`, so make sure you complete that step first. 

You will also need a list of business rules to implement - **you didn't skip that step, right?**

For our example, we will implement two different rules:

* Check that an ID value isn't present when creating a reweigh. This can cause unexpected server errors if we don't catch it.
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

These functions are [**closures**](https://www.geeksforgeeks.org/closures-in-golang/), which basically means a function within function. In this case, the outer function has no parameters and returns the `validator` interface type. 

The _inner_ function, however, must have a signature that is exactly the same as our `validatorFunc` function type so that we can use the interface. This means you will have to change all of these rule functions if you ever change that base signature, so keep that in mind as you continue working on validation.

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

Observe that on line 3, we use `_` to mark the input parameters that we don't use in this rule (in this case, `appCtx` and `shipment`). Since we need a verbose signature to fit our needs for _all_ of these rules, there is no way we're going to use everything in every single rule. Use `_` to make clear what is relevant and what isn't.

On line 4, we also initialize a `verrs` variable. This is so we can accumulate our invalid input errors. We always return this at the end of our rule function. An empty `verrs` instance will be ignored.

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

We pass in a parameter to the top function, `checkPrimeAvailability`! This is the true power of closures, and it's cool because it means we were able to pass in a new parameter without changing the signature for all of the other rule functions. The parameter `checker` is a service that we need for this function in particular to validate the Prime-availability rule.

**So what goes in the validator signature and what goes in the input of the outer function?**

There is a lot of room for interpretation with this, but some general guidelines are:

- If it's a dependency that can be set up before the service function is called, pass it in as the input of the outer function.
- If it's data that _must_ be retrieved _during_ the service function, it should be in the validator function signature. 

The parameters in the outer functions are like _dependencies_, and the validator function signature is the true input.

### Grouping `rules` functions

...

### Connecting the service

...

## Testing the Pattern

## Examples



Next, establish the general validator. 

Now let's add some rules. These utilize closures and will return our validator function type. This allows us to pass in extra parameters if needed for specific rules. 

After that, let's put it in our service function.

