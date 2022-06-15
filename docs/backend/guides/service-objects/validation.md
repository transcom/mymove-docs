---
sidebar_position: 5
---
# Validation

We have to thoroughly validate user input to ensure it complies with our business rules for any mutations to data. To
encourage development of minimal, modular functions to check each rule, we have developed a validation pattern that 
we can use consistently throughout our service objects. We have also designed it to easily change which rules are 
applied based on the kind of user performing the action.

## The Pattern

As mentioned in the section on [Service Object Subpackage Structure](./structure#service-object-subpackage-structure),
our validation pattern revolves around using the files `rules.go` and `validation.go`.

`validation.go` contains the machinery that executes our validation in this service. It is almost entirely functional,
and will generally look similar in most services. A lot of this code is boilerplate.

`rules.go` contains our business logic. This is where we will write the functions that check each of our distinct
business rules for the object. They should be able to be called independently of each other. As business rules 
change, this should likely be the main file that has to change, unless dependencies for validation change, but that 
will be covered later.

## Implementing the Pattern

First things first, you'll need to identify some business rules or utilities that you'd like to implement.
Common checks will verify if the related move is available to the Prime contractor, if the ID/foreign key values on the
base object have been manipulated, if circumstantially required fields have been filled out, and so on.

:::caution Advanced Golang

The validation pattern documented here makes use of some advanced Go patterns. If you're struggling with the syntax or
would like more context on what is happening, you can look at the [resources section](#resources) for helpful  
explanations and examples.

:::

### `validation.go`

We'll start with creating the `validation.go` and `validation_test.go` files. In `validation.go`, we'll set up our 
validator types and write the base function that handles running our checks on the data.

```text {7,8}
mymove/
├── pkg/
│   ├── services/
│   │   ├── ...
│   │   ├── pet/
│   │   │   ├── pet_service_test.go
│   │   │   ├── validation.go       <- new file
│   │   │   ├── validation_test.go  <- new file
│   │   ├── ...
```

#### `validator` interface and the `Validate` function

Now we'll define an interface type that all of our validators will implement. This type will be private to our 
service package and have one method, `Validate()`:

```go title="pkg/services/pet/validation.go"
package pet

import (
	"github.com/transcom/mymove/pkg/appcontext"
)

// petValidator defines the interface for checking business rules for a pet
type petValidator interface {
	Validate(appCtx appcontext.AppContext) error
}
```

Based on our general Go standards, we know this function (like many other functions) will take in the `AppContext` 
as its first argument. Since the action is "validate," it also makes sense that it would return an error. But what 
else do we need?

The parameters of `Validate()` should include **all model types** that you will need to validate your business rules.
This will change on a case-by-case basis, but, at a minimum, you will generally include your subject model type.

##### Variations of `Validate` Signature

Since we're creating service objects for creating and updating pets, we know we'll need an argument that is of type 
`models.Pet`. Unfortunately, we don't have a set standard for how that argument should be used, nor how to handle 
the updates. We'll talk about a couple of the ways you'll find in existing code, but then pick one to use for the 
purposes of these docs.

1. Use `new` and `original` models. Looks something like this:

   ```go title="pkg/services/pet/validation.go"
   package pet

   import (
       "github.com/transcom/mymove/pkg/appcontext"
       "github.com/transcom/mymove/pkg/models"
   )
   
   // petValidator defines the interface for checking business rules for a pet
   type petValidator interface {
       // Validate The newPet is assumed to be required, so that is a value type.
       // The originalPet is optional, so it's a pointer type.
       Validate(appCtx appcontext.AppContext, newPet models.Pet, originalPet *models.Pet) error
   }
   ```

   For this pattern, the following explains what `newPet` (a.k.a. the `base`) and `originalPet` would contain for
   `create` vs `update`:

    1. `create`: `newPet` would contain the information for the new `Pet`, while `originalPet` would be `nil`.

    1. `update`: `newPet` would contain the requested _final_ version of the `Pet`, while `originalPet` would
       contain the original version of the pet. The _final_ version of the `Pet` is the version that would be
       saved to the database, meaning the original `Pet` with the requested changes made to it already, in other words,
       a merged version of the `Pet`.

   Pros:

    * Validating the version of the model that would be saved to the database, so there's less of a chance for there
      to be invalid data saved.

   Cons:

    * Can't easily see what changes are without comparing the `new` and `original` versions.

1. Use `base` and `delta` models. Looks something like this (there are variations that flip which comes first, and 
   what they're called):

   ```go title="pkg/services/pet/validation.go"
    package pet

    import (
        "github.com/transcom/mymove/pkg/appcontext"
        "github.com/transcom/mymove/pkg/models"
    )

    // petValidator defines the interface for checking business rules for a pet
    type petValidator interface {
        // Validate The base Pet is assumed to be required, so that is a value type.
        // The delta is optional, so it's a pointer type
        Validate(appCtx appcontext.AppContext, pet models.Pet, delta *models.Pet) error
    }
   ```
   
   For this pattern, the following explains what `pet` (a.k.a. the `base`) and `delta` would contain for `create` vs 
   `update`:

   1. `create`: `pet` would contain the information for the new `Pet`, while `delta` would be `nil`.
    
   1. `update`: `pet` would contain the original `Pet`, while `delta` would contain the _changes_ requested.

   Pros:
    
   * Can easily see in the validation functions what the requested changes are, at least for fields that aren't 
     being set to `nil`, otherwise have to compare to the original to see if you're changing from a value to `nil`.

   Cons:

   * Not validating the version of the model that would be saved to the database, meaning there's potentially room 
     for errors to be introduced when the original model gets the requested changes applied.

For the purposes of these docs, we'll use the first pattern shown, using the merged and original versions of the `Pet`.

##### Implementing the `Validate` Interface

Now that we've settled on a signature, we can also add the type that will implement this interface. We will make the 
type a function type, which will enable us to write our rules using [closures](https://gobyexample.com/closures). We 
can define this new type in the `validation.go` file, under the validator interface we defined in the previous section.

```go title="pkg/services/pet/validation.go"
package pet

import (
    "github.com/transcom/mymove/pkg/appcontext"
    "github.com/transcom/mymove/pkg/models"
)

// petValidator defines the interface for checking business rules for a pet
type petValidator interface {
    // Validate The newPet is assumed to be required, so that is a value type.
    // The originalPet is optional, so it's a pointer type.
    Validate(appCtx appcontext.AppContext, newPet models.Pet, originalPet *models.Pet) error
}

// petValidatorFunc is an adapter that will convert a function into an implementation of petValidator
type petValidatorFunc func(appcontext.AppContext, models.Pet, *models.Pet) error

// Validate fulfills the petValidator interface
func (fn petValidatorFunc) Validate(appCtx appcontext.AppContext, newPet models.Pet, originalPet *models.Pet) error {
    return fn(appCtx, newPet, originalPet)
}
```

Note that all of these function signatures are the exact same. **They must stay the same** so that these types implement
the `petValidator` interface defined above. Such is the nature of interfaces types. It might feel inconvenient to repeat
this signature over and over, but at least it forces us to be explicit about our input.

#### Create the `validate<Model>` Function

Now we're going to define the function that will take in the necessary data and the validation functions that we 
should run, run through all the validation functions, and return an error as appropriate. It will be called from the 
service objects, meaning it will be the access point for all our validation.

We'll name this function based on what you are validating, so in our case, we'll name it `validatePet`. Its 
signature will look similar to the signatures we used earlier, with the addition of a new parameter called `checks`:


```go title="pkg/services/pet/validation.go"
package pet

// Previous definitions omitted to focus on the new part for now

// validatePet runs a pet through the checks that are passed in.
func validatePet(appCtx appcontext.AppContext, newPet models.Pet, originalPet *models.Pet, checks ...petValidator) error {
	// TODO: Implement validation logic...

	return nil
}
```

This `checks` parameter is what is known as a "variadic parameter," making this a
[variadic function](https://gobyexample.com/variadic-functions). This allows us to pass in however many rules we want,
granting us flexibility in how we validate services, for example, using different checks depending on who is using it.

Let's start defining the logic for our function by adding code to loop through our validators, calling the 
`Validate` method on each of them: 

```go title="pkg/services/pet/validation.go"
package pet

// Previous definitions omitted to focus on the new part for now

// validatePet runs a pet through the checks that are passed in.
func validatePet(appCtx appcontext.AppContext, newPet models.Pet, originalPet *models.Pet, checks ...petValidator) error {
	for _, check := range checks {
		if err := check.Validate(appCtx, newPet, originalPet); err != nil {
			// TODO: Handle errors
		}
	}

	return nil
}
```

After we call `Validate()`, we must handle the error that comes back. We have a couple of guidelines for doing this:

* The [Go Buffalo type `validate.Errors`](https://pkg.go.dev/github.com/gobuffalo/validate) (commonly assigned to 
  `verrs`) should be used to track input errors per field. We do this so the user can get as much information back as
  possible instead of only seeing one error per request.
    * Use `Add(fieldName str, Message str)` to add individual errors to this type one at a time.
    * Use `Append(verrs validate.Errors)` to combine lists of validation errors.
* All validation errors should be wrapped in a `apperror.InvalidInputError` type when returned.
* Any other error types are not combined and take immediate precedence over input errors. For example, the error saying
  that the model should not have been visible to the caller will take precedence over an error about the phone number
  being mistyped.

In order to follow these guidelines, we need to check the type of the error being returned from the validator. If
the error is a validation error type, we will combine it with an ongoing list of validation errors and continue
checking the rest of the validators.

If it is _not_ a validation error, we stop everything and return it right away.

Taking those guidelines into account, we end up with this `validatePet` function:

```go title="pkg/services/pet/validation.go"
package pet

// Previous definitions omitted to focus on the new part for now

// validatePet runs a pet through the checks that are passed in.
func validatePet(appCtx appcontext.AppContext, newPet models.Pet, originalPet *models.Pet, checks ...petValidator) error {
	verrs := validate.NewErrors()

	for _, check := range checks {
		if err := check.Validate(appCtx, newPet, originalPet); err != nil {
			switch e := err.(type) {
			case *validate.Errors:
				// Accumulate all validation errors
				verrs.Append(e)
			default:
				// Non-validation errors have priority and short-circuit doing any further checks
				return err
			}
		}
	}

	if verrs.HasAny() {
		return apperror.NewInvalidInputError(newPet.ID, nil, verrs, "Invalid input found while validating the pet.")
	}

	return nil
}
```

This function is almost entirely boilerplate and can be copied and pasted from one service to another with minimal
changes.

#### Testing `validation.go`

Since most of the code is boilerplate, we can get by with just a few small tests to make sure things work as 
expected. Here is a sample of what your tests could look like (or you can even copy these and modify to fit your 
function signatures):

<details>
<summary>Sample `validation_test.go`</summary>

```go title="pkg/services/pet/validation_test.go"
package pet

import (
	"github.com/gobuffalo/validate/v3"
	"github.com/gofrs/uuid"

	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/models"
)

func (suite PetSuite) TestPetValidatorFuncValidate() {
	suite.Run("Calling Validate runs validation function with no errors", func() {
		validator := petValidatorFunc(func(_ appcontext.AppContext, _ models.Pet, _ *models.Pet) error {
			return nil
		})

		err := validator.Validate(suite.AppContextForTest(), models.Pet{}, nil)

		suite.NoError(err)
	})

	suite.Run("Calling Validate runs validation function with errors", func() {
		validator := petValidatorFunc(func(_ appcontext.AppContext, _ models.Pet, _ *models.Pet) error {
			verrs := validate.NewErrors()

			verrs.Add("ID", "fake error")

			return verrs
		})

		err := validator.Validate(suite.AppContextForTest(), models.Pet{}, nil)

		suite.Error(err)
		suite.Contains(err.Error(), "fake error")
	})
}

func (suite PetSuite) TestValidatePet() {
	suite.Run("Runs validation and returns nil when there are no errors", func() {
		checkAlwaysReturnNil := petValidatorFunc(func(_ appcontext.AppContext, _ models.Pet, _ *models.Pet) error {
			return nil
		})

		err := validatePet(suite.AppContextForTest(), models.Pet{}, nil, []petValidator{checkAlwaysReturnNil}...)

		suite.NoError(err)
	})

	suite.Run("Runs validation and returns input errors", func() {
		checkAlwaysReturnValidationErr := petValidatorFunc(func(_ appcontext.AppContext, _ models.Pet, _ *models.Pet) error {
			verrs := validate.NewErrors()

			verrs.Add("ID", "fake error")

			return verrs
		})

		err := validatePet(suite.AppContextForTest(), models.Pet{}, nil, []petValidator{checkAlwaysReturnValidationErr}...)

		suite.Error(err)
		suite.IsType(apperror.InvalidInputError{}, err)
		suite.Contains(err.Error(), "Invalid input found while validating the pet.")
	})

	suite.Run("Runs validation and returns other errors", func() {
		checkAlwaysReturnOtherError := petValidatorFunc(func(_ appcontext.AppContext, _ models.Pet, _ *models.Pet) error {
			return apperror.NewNotFoundError(uuid.Must(uuid.NewV4()), "Pet not found.")
		})

		err := validatePet(suite.AppContextForTest(), models.Pet{}, nil, []petValidator{checkAlwaysReturnOtherError}...)

		suite.Error(err)
		suite.IsType(apperror.NotFoundError{}, err)
		suite.Contains(err.Error(), "Pet not found.")
	})
}
```
</details>

#### Final `validation.go`

Just to recap, here is what our final `validation.go` file looks like:

<details>
<summary>Final `validation.go`</summary>

```go title="pkg/services/pet/validation.go"
package pet

import (
	"github.com/gobuffalo/validate/v3"

	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/models"
)

// petValidator defines the interface for checking business rules for a pet
type petValidator interface {
	// Validate The newPet is assumed to be required, so that is a value type.
	// The originalPet is optional, so it's a pointer type.
	Validate(appCtx appcontext.AppContext, newPet models.Pet, originalPet *models.Pet) error
}

// petValidatorFunc is an adapter that will convert a function into an implementation of petValidator
type petValidatorFunc func(appcontext.AppContext, models.Pet, *models.Pet) error

// Validate fulfills the petValidator interface
func (fn petValidatorFunc) Validate(appCtx appcontext.AppContext, newPet models.Pet, originalPet *models.Pet) error {
	return fn(appCtx, newPet, originalPet)
}

// validatePet runs a pet through the checks that are passed in.
func validatePet(appCtx appcontext.AppContext, newPet models.Pet, originalPet *models.Pet, checks ...petValidator) error {
	verrs := validate.NewErrors()

	for _, check := range checks {
		if err := check.Validate(appCtx, newPet, originalPet); err != nil {
			switch e := err.(type) {
			case *validate.Errors:
				// Accumulate all validation errors
				verrs.Append(e)
			default:
				// Non-validation errors have priority and short-circuit doing any further checks
				return err
			}
		}
	}

	if verrs.HasAny() {
		return apperror.NewInvalidInputError(newPet.ID, nil, verrs, "Invalid input found while validating the pet.")
	}

	return nil
}
```

</details>

### `rules.go`

Now we'll create the `rules.go` and `rules_test.go` files. In the `rules.go` file, we'll use the types defined in 
`validation.go`, so make sure you've done that first. You'll also need to know what your business rules are.

For our example, here are a few potential rules (for the sake of brevity, we won't actually implement them all):

* `ID` must be blank when creating a `Pet`.
* Check that `Type` isn't an empty string.
* Check that `Name` is not empty and doesn't contain invalid characters.
* Check that, if both `Birthday` and `GotchaDay` are defined, `Birthday` is equal to, or earlier than the `GotchaDay`.
* Check that, if `Weight` is defined, it is greater than 0.

We'll start by defining the functions for our rules like this:

```go title="pkg/services/pet/rules.go"
package pet

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
)

func checkID() petValidator {
	return petValidatorFunc(func(appCtx appcontext.AppContext, newPet models.Pet, originalPet *models.Pet) error {
		return nil // TODO: implement validation logic
	})
}

func checkType() petValidator {
	return petValidatorFunc(func(appCtx appcontext.AppContext, newPet models.Pet, originalPet *models.Pet) error {
		return nil // TODO: implement validation logic
	})
}

func checkName() petValidator {
	return petValidatorFunc(func(appCtx appcontext.AppContext, newPet models.Pet, originalPet *models.Pet) error {
		return nil // TODO: implement validation logic
	})
}
```

These functions are [**closures**](https://gobyexample.com/closures), which uses a function within a function.
In this case, the outer function has no parameters and returns the `petValidator` interface type.

The _inner_ function, however, must have a signature that is exactly the same as our `petValidatorFunc` function type so
that we can use the interface. This means you will have to change all of these rule functions if you ever change that
base signature, so keep that in mind as you continue working on validation.

#### `checkID`

We've defined the function name and signature, so we can write our tests for what we expect to happen (minimized for 
ease of reading the page): 

<details>
<summary>Tests for `checkID`</summary>

```go title="pkg/services/pet/rules_test.go"
package pet

import (
	"github.com/gobuffalo/validate/v3"
	"github.com/gofrs/uuid"

	"github.com/transcom/mymove/pkg/models"
)

func (suite *PetSuite) TestCheckID() {
	suite.Run("Success", func() {
		suite.Run("Create Pet without an ID", func() {
			err := checkID().Validate(suite.AppContextForTest(), models.Pet{}, nil)

			suite.NilOrNoVerrs(err)
		})

		suite.Run("Update Pet with matching ID", func() {
			id := uuid.Must(uuid.NewV4())

			err := checkID().Validate(suite.AppContextForTest(), models.Pet{ID: id}, &models.Pet{ID: id})

			suite.NilOrNoVerrs(err)
		})
	})

	suite.Run("Failure", func() {
		suite.Run("Return an error if an ID is defined when creating a Pet", func() {
			err := checkID().Validate(suite.AppContextForTest(), models.Pet{ID: uuid.Must(uuid.NewV4())}, nil)

			suite.Error(err)
			suite.IsType(&validate.Errors{}, err)
			suite.Contains(err.Error(), "when creating a Pet ID must not be set")
		})

		suite.Run("Return an error if the IDs don't match", func() {
			err := checkID().Validate(suite.AppContextForTest(), models.Pet{ID: uuid.Must(uuid.NewV4())}, &models.Pet{ID: uuid.Must(uuid.NewV4())})

			suite.Error(err)
			suite.IsType(&validate.Errors{}, err)
			suite.Contains(err.Error(), "new Pet ID must match original Pet ID")
		})
	})
}
```

</details>

Now we can implement the function like so:

```go title="pkg/services/pet/rules.go" {13,14}
package pet

import (
	"github.com/gobuffalo/validate/v3"

	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
)

// checkID checks that newPet doesn't already have an ID if we're creating a Pet, or that it matches the original Pet
// for updates.
func checkID() petValidator {
	return petValidatorFunc(func(_ appcontext.AppContext, newPet models.Pet, originalPet *models.Pet) error {
		verrs := validate.NewErrors()

		if originalPet == nil {
			if newPet.ID.IsNil() {
				return verrs
			}

			verrs.Add("ID", "when creating a Pet ID must not be set")
		} else {
			if newPet.ID != originalPet.ID {
				verrs.Add("ID", "new Pet ID must match original Pet ID")
			}
		}

		return verrs
	})
}
```

You may notice we use `_` for the `appcontext.AppContext` param since we don't need it for this rule. Since we need 
a verbose signature to fit our needs for _all_ of these rules, there is no way we're going to use everything in 
every single rule. Use `_` to make clear what is relevant and what isn't.

You can also see that we start the inner function off by initializing `verrs` to hold our validation errors. We 
always return this at the end of our rule functions.

#### `checkType`

Based on our business rules, we want to make sure that `Pet.Type` is always set. We set up the model and table such 
that only a few values are valid, but the way the model works, it still allows a blank string to be set, so we want 
to check for that. Our tests for this one will look like this (minimized for ease of reading the page):

<details>
<summary>Tests for `checkType`</summary>

```go title="pkg/services/pet/rules_test.go"
package pet

import (
	"github.com/gobuffalo/validate/v3"
	"github.com/gofrs/uuid"

	"github.com/transcom/mymove/pkg/models"
)

// TestCheckID tests omitted for clarity

func (suite *PetSuite) TestCheckType() {
	suite.Run("Success", func() {
		suite.Run("Create Pet", func() {
			err := checkType().Validate(
				suite.AppContextForTest(),
				models.Pet{
					Type: models.PetTypeCat,
					Name: "Fluffy",
				},
				nil,
			)

			suite.NilOrNoVerrs(err)
		})

		suite.Run("Update Pet", func() {
			err := checkType().Validate(
				suite.AppContextForTest(),
				models.Pet{
					Type: models.PetTypeDog,
				},
				&models.Pet{
					ID:   uuid.Must(uuid.NewV4()),
					Type: models.PetTypeCat,
					Name: "Fluffy",
				},
			)

			suite.NilOrNoVerrs(err)
		})
	})

	suite.Run("Failure", func() {
		suite.Run("Return an error for an empty pet type", func() {
			err := checkType().Validate(
				suite.AppContextForTest(),
				models.Pet{
					Name: "Fluffy",
				},
				nil,
			)

			suite.Error(err)
			suite.IsType(&validate.Errors{}, err)
			suite.Contains(err.Error(), "type of pet must be specified")
		})
	})
}
```

</details>

Now we can implement the function like so:

```go title="pkg/services/pet/rules.go" {13,14}
package pet

import (
	"github.com/gobuffalo/validate/v3"

	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
)


// other check functions omitted to focus on checkType

// checkType checks that newPet.Type is not an empty string.
func checkType() petValidator {
	return petValidatorFunc(func(_ appcontext.AppContext, newPet models.Pet, originalPet *models.Pet) error {
		verrs := validate.NewErrors()

		if newPet.Type == "" {
			verrs.Add("Type", "type of pet must be specified")
		}

		return verrs
	})
}
```

#### `checkName`

For this one, we'll take advantage of the fact that we're using `closures`.

Let's pretend that we have a service that we use to check strings to make sure they don't have invalid characters 
(e.g. strings that could be used run malicious code). Imagine the service interface looks like this:

```go  title="pkg/services/string_checker.go"
package services

import (
	"github.com/transcom/mymove/pkg/appcontext"
)

// StringChecker validates a string of text to make sure it is safe
//go:generate mockery --name StringChecker --disable-version-string
type StringChecker interface {
	Validate(appCtx appcontext.AppContext, text string) error
}
```

We haven't covered how you're supposed to use service objects, but the important points to know for now are:

* To define something as using this service object's type, we would use `services.StringChecker`
* To mock it out in tests, you can use`mocks.NewStringChecker(suite.T())`
    * This will give you a pointer to the mock and set it up so that when the test is cleaning up, it will assert 
      any expectations you set up actually happened (i.e. if you said it will be called with xyz, it will verify it 
      was called with that).  
* To use it in our service, we'll define a parameter like this: `stringChecker services.StringChecker`
    * We then use it like this: `err := stringChecker(appCtx, "my string to check")`

We'll see all this in practice next.

Now let's say we want to run every name that gets input through our string checker to make sure that users aren't 
passing in bad characters or strings. We can do this by updating our definition of `checkName` to look like this:

```go title="pkg/services/pet/rules.go" {9}
package pet

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// other check functions omitted to focus on checkName

// checkName checks that a name has been input or that one is already set, and runs the string through a string checker
// service.
func checkName(stringChecker services.StringChecker) petValidator {
	return petValidatorFunc(func(_ appcontext.AppContext, newPet models.Pet, originalPet *models.Pet) error {
		return nil // TODO: implement validation logic
	})
}
```

Note how we added `stringChecker services.StringChecker` as a parameter to `checkName`, the outer function. Since 
we're using `closures`, we'll be able to use this `StringChecker` service in the inner function, without having to 
change the signature of the inner function (and by extension every other validation function).

With our newly updated function signature, we're ready to write our tests!

<details>
<summary>Tests for `checkID`</summary>

We'll go into more detail on how we're using the mocks later, but the main thing to get from this for now is that we
want to ensure:

* A pet has a name. This means either a new name is set, or the new name matches the old name.
* A new name has no invalid characters.

```go title="pkg/services/pet/rules_test.go"
package pet

import (
	"errors"
	"fmt"
	
	"github.com/gobuffalo/validate/v3"
	"github.com/gofrs/uuid"
	"github.com/stretchr/testify/mock"

	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services/mocks"
)

// TestCheckID and TestCheckType tests omitted for clarity

func (suite *PetSuite) TestCheckName() {
	getMockStringChecker := func(willBeUsed bool, err error) *mocks.StringChecker {
		stringChecker := mocks.NewStringChecker(suite.T())

		if willBeUsed {
			stringChecker.On("Validate",
				mock.AnythingOfType("*appcontext.appContext"),
				mock.AnythingOfType("string"),
			).Return(err)
		}

		return stringChecker
	}

	suite.Run("Success", func() {
		newName := "Luna"
		oldName := "Whiskers"

		suite.Run("Create Pet", func() {
			stringChecker := getMockStringChecker(true, nil)

			err := checkName(stringChecker).Validate(
				suite.AppContextForTest(),
				models.Pet{Name: newName},
				nil,
			)

			suite.NilOrNoVerrs(err)
		})

		suite.Run("Update Pet", func() {
			petID := uuid.Must(uuid.NewV4())

			stringChecker := getMockStringChecker(true, nil)

			err := checkName(stringChecker).Validate(
				suite.AppContextForTest(),
				models.Pet{
					ID:   petID,
					Name: newName,
				},
				&models.Pet{
					ID:   petID,
					Name: oldName,
				},
			)

			suite.NilOrNoVerrs(err)
		})

		suite.Run("Update with no name change", func() {
			petID := uuid.Must(uuid.NewV4())

			stringChecker := getMockStringChecker(false, nil)

			err := checkName(stringChecker).Validate(
				suite.AppContextForTest(),
				models.Pet{
					ID:   petID,
					Name: oldName,
				},
				&models.Pet{
					ID:   petID,
					Name: oldName,
				},
			)

			suite.NilOrNoVerrs(err)
		})
	})

	suite.Run("Failure", func() {
		blankNameError := errors.New("pet name must be defined")
		stringCheckError := errors.New("invalid characters found in string")
		invalidName := "<hacked>"

		invalidCases := map[string]struct {
			newPetName  string
			originalPet *models.Pet
			expectedErr error
		}{
			"creating with no name": {
				"",
				nil,
				blankNameError,
			},
			"creating with invalid name": {
				invalidName,
				nil,
				stringCheckError,
			},
			"updating with invalid name": {
				invalidName,
				&models.Pet{
					ID:   uuid.Must(uuid.NewV4()),
					Name: "Whiskers",
				},
				stringCheckError,
			},
		}

		for tc, testData := range invalidCases {
			tc := tc
			testData := testData

			suite.Run(fmt.Sprintf("Return error for an invalid name when %v", tc), func() {
				stringChecker := getMockStringChecker(testData.newPetName != "", stringCheckError)

				newPet := models.Pet{Name: testData.newPetName}

				if testData.originalPet != nil {
					newPet.ID = testData.originalPet.ID
				}

				err := checkName(stringChecker).Validate(
					suite.AppContextForTest(),
					newPet,
					testData.originalPet,
				)

				suite.Error(err)
				suite.IsType(&validate.Errors{}, err)
				suite.Contains(err.Error(), testData.expectedErr.Error())
			})
		}
	})
}
```

</details>

Now we can implement our `checkName` function:

```go title="pkg/services/pet/rules.go"
package pet

import (
	"github.com/gobuffalo/validate/v3"

	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// other check functions omitted to focus on checkName

// checkName checks that a name has been input or that one is already set, and runs the string through a string checker
// service.
func checkName(stringChecker services.StringChecker) petValidator {
	return petValidatorFunc(func(appCtx appcontext.AppContext, newPet models.Pet, originalPet *models.Pet) error {
		verrs := validate.NewErrors()

		if newPet.Name == "" {
			verrs.Add("Name", "pet name must be defined")

			return verrs
		}

		if originalPet != nil && newPet.Name == originalPet.Name {
			return verrs
		}

		err := stringChecker.Validate(appCtx, newPet.Name)

		if err != nil {
			verrs.Add("Name", err.Error())
		}

		return verrs
	})
}
```

As stated earlier, we're able to pass in the `services.StringChecker` in to the outer function and then use it in 
the inner function. 

This then leads to a question: What should go in the validator signature (inner function) and what goes in the 
signature of the outer function?

There is a lot of room for interpretation with this, but some general guidelines are:

- If it's a dependency that can be set up before the service function is called, pass it in as the input of the outer
  function.
- If it's data that _must_ be retrieved _during_ the service function, it should be in the validator function signature.

The parameters in the outer functions are like _dependencies_, and the validator function signature is the true input.

#### Grouping `rules` Functions

Once we have some rules, we can start grouping them as needed. For example, we could group them based on which set 
of users require different rules. The key here is to define functions that will return slices of validator functions,
instead of constant slice variables.

```go title="pkg/services/pet/rules.go"
package pet

// Other logic left out for brevity.

// customerChecks are the rules that should run for actions taken by customers
func customerChecks(stringChecker services.StringChecker) []petValidator {
	return []petValidator{
		checkID(),
		checkType(),
		checkName(stringChecker),
	}
}

// officeChecks are the rules that should run for actions taken by office users
func officeChecks() []petValidator {
	return []petValidator{
		checkID(),
		checkType(),
	}
}
```

The power of this pattern is that it lets us easily define that for customers, we want to check the Pet names, but 
we'll let office users input whatever they want for names. 

You'll notice that we're calling our `check<thing>` functions now, but this isn't triggering validation. These are 
`closures`, so we're calling the outer function, which is returning our validator. The validators that we get back 
aren't called until `validatePet` is called.

Note that we _do_ pass in whatever parameters we use in the outer functions at this level. This is where we set those
"dependencies".

These grouping functions can be used in multiple places, and are meant for utility. They are not a hard requirement to
implement the validator pattern, but they are helpful organizational tools.

#### Final `rules.go`


Here is the final rules file that we have:

<details>
<summary>Final `rules.go` file</summary>

```go title="pkg/services/pet/rules.go"
package pet

import (
	"github.com/gobuffalo/validate/v3"

	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// checkID checks that newPet doesn't already have an ID if we're creating a Pet, or that it matches the original Pet
// for updates.
func checkID() petValidator {
	return petValidatorFunc(func(_ appcontext.AppContext, newPet models.Pet, originalPet *models.Pet) error {
		verrs := validate.NewErrors()

		if originalPet == nil {
			if newPet.ID.IsNil() {
				return verrs
			}

			verrs.Add("ID", "ID must not be set when creating a Pet.")
		} else {
			if newPet.ID != originalPet.ID {
				verrs.Add("ID", "ID for new Pet must match original Pet ID.")
			}
		}

		return verrs
	})
}

// checkType checks that newPet.Type is not an empty string.
func checkType() petValidator {
	return petValidatorFunc(func(_ appcontext.AppContext, newPet models.Pet, originalPet *models.Pet) error {
		verrs := validate.NewErrors()

		if newPet.Type == "" {
			verrs.Add("Type", "Type of pet must be specified.")
		}

		return verrs
	})
}

// checkName checks that a name has been input or that one is already set, and runs the string through a string checker
// service.
func checkName(stringChecker services.StringChecker) petValidator {
	return petValidatorFunc(func(appCtx appcontext.AppContext, newPet models.Pet, originalPet *models.Pet) error {
		verrs := validate.NewErrors()

		if newPet.Name == "" {
			verrs.Add("Name", "Pet name must be defined.")

			return verrs
		}

		if originalPet != nil && newPet.Name == originalPet.Name {
			return verrs
		}

		err := stringChecker.Validate(appCtx, newPet.Name)

		if err != nil {
			verrs.Add("Name", err.Error())
		}

		return verrs
	})
}

// customerChecks are the rules that should run for actions taken by customers
func customerChecks(stringChecker services.StringChecker) []petValidator {
	return []petValidator{
		checkID(),
		checkType(),
		checkName(stringChecker),
	}
}

// officeChecks are the rules that should run for actions taken by office users
func officeChecks() []petValidator {
	return []petValidator{
		checkID(),
		checkType(),
	}
}
```

</details>

## Recap

So now we've written rules for what validation we expect to happen with our data, and we've set up the validation 
function that we can call to run through those rules. Now you can move on to setting up the actual service object.

## Examples

## Examples

* Shipment Orchestrator
    * https://github.com/transcom/mymove/blob/master/pkg/services/orchestrators/shipment/rules.go
    * https://github.com/transcom/mymove/blob/master/pkg/services/orchestrators/shipment/validation.go
* PPMShipments
    * https://github.com/transcom/mymove/blob/master/pkg/services/ppmshipment/rules.go
    * https://github.com/transcom/mymove/blob/master/pkg/services/ppmshipment/validation.go
* Reweighs
    * https://github.com/transcom/mymove/blob/master/pkg/services/reweigh/rules.go
    * https://github.com/transcom/mymove/blob/master/pkg/services/reweigh/validation.go

## Resources

* Interfaces
    * [Go by Example: Interfaces](https://gobyexample.com/interfaces)
    * [Interfaces in Go](https://golangbot.com/interfaces-part-1/)
* Function types
    * [Working with function types in Go](https://stackoverflow.com/questions/9398739/working-with-function-types-in-go)
    * [Function types and values](https://yourbasic.org/golang/function-pointer-type-declaration/)
* Variadic functions
    * [Go by Example: Variadic Functions](https://gobyexample.com/variadic-functions)
    * [Variadic Functions](https://golangbot.com/variadic-functions/)
    * [How to use variadic functions in Go](https://www.digitalocean.com/community/tutorials/how-to-use-variadic-functions-in-go)
* Closures
    * [What is a closure](https://stackoverflow.com/a/7464475)
    * [Closures in Go](https://betterprogramming.pub/closures-made-simple-with-golang-69db3017cd7b)
    * [Go by Example: Closures](https://gobyexample.com/closures)
    * [5 useful ways to use closures in Go](https://www.calhoun.io/5-useful-ways-to-use-closures-in-go/)