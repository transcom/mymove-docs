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
│   │   ├── cat/
│   │   │   ├── cat_service_test.go
│   │   │   ├── validation.go       <- new file
│   │   │   ├── validation_test.go  <- new file
│   │   ├── ...
```

#### `validator` interface and the `Validate` function

Now we'll define an interface type that all of our validators will implement. This type will be private to our 
service package and have one method, `Validate()`:

```go title="pkg/services/cat/validation.go"
package cat

import (
	"github.com/transcom/mymove/pkg/appcontext"
)

// catValidator defines the interface for checking business rules for a cat
type catValidator interface {
	Validate(appCtx appcontext.AppContext) error
}
```

Based on our general Go standards, we know this function (like many other functions) will take in the `AppContext` 
as its first argument. Since the action is "validate," it also makes sense that it would return an error. But what 
else do we need?

The parameters of `Validate()` should include **all model types** that you will need to validate your business rules.
This will change on a case-by-case basis, but, at a minimum, you will generally include your subject model type.

##### Variations of `Validate` Signature

Since we're creating service objects for creating and updating cats, we know we'll need an argument that is of type 
`models.Cat`. Unfortunately, we don't have a set standard for how that argument should be used, nor how to handle 
the updates. We'll talk about a couple of the ways you'll find in existing code, but then pick one to use for the 
purposes of these docs.

1. Use `new` and `original` models. Looks something like this:

   ```go title="pkg/services/cat/validation.go"
   package cat

   import (
       "github.com/transcom/mymove/pkg/appcontext"
       "github.com/transcom/mymove/pkg/models"
   )
   
   // catValidator defines the interface for checking business rules for a cat
   type catValidator interface {
       // Validate The newCat is assumed to be required, so that is a value type.
       // The originalCat is optional, so it's a pointer type.
       Validate(appCtx appcontext.AppContext, newCat models.Cat, originalCat *models.Cat) error
   }
   ```

   For this pattern, the following explains what `newCat` (a.k.a. the `base`) and `originalCat` would contain for
   `create` vs `update`:

    1. `create`: `newCat` would contain the information for the new `Cat`, while `originalCat` would be `nil`.

    1. `update`: `newCat` would contain the requested _final_ version of the `Cat`, while `originalCat` would
       contain the original version of the cat. The _final_ version of the `Cat` being the version that would be
       saved to the database, so the original `Cat` with the requested changes made to it already, in other words,
       a merged version of the `Cat`.

   Pros:

    * Validating the version of the model that would be saved to the database, so there's less of a chance for there
      to be invalid data saved.

   Cons:

    * Can't easily see what changes are without comparing the `new` and `original` versions.

1. Use `base` and `delta` models. Looks something like this (there are variations that flip which comes first, and 
   what they're called):

   ```go title="pkg/services/cat/validation.go"
    package cat

    import (
        "github.com/transcom/mymove/pkg/appcontext"
        "github.com/transcom/mymove/pkg/models"
    )

    // catValidator defines the interface for checking business rules for a cat
    type catValidator interface {
        // Validate The base Cat is assumed to be required, so that is a value type.
        // The delta is optional, so it's a pointer type
        Validate(appCtx appcontext.AppContext, cat models.Cat, delta *models.Cat) error
    }
   ```
   
   For this pattern, the following explains what `cat` (a.k.a. the `base`) and `delta` would contain for `create` vs 
   `update`:

   1. `create`: `cat` would contain the information for the new `Cat`, while `delta` would be `nil`.
    
   1. `update`: `cat` would contain the original `Cat`, while `delta` would contain the _changes_ requested.

   Pros:
    
   * Can easily see in the validation functions what the requested changes are, at least for fields that aren't 
     being set to `nil`, otherwise have to compare to the original to see if you're changing from a value to `nil`.

   Cons:

   * Not validating the version of the model that would be saved to the database, meaning there's potentially room 
     for errors to be introduced when the original model gets the requested changes applied.

For the purposes of these docs, we'll use the first pattern shown, using the merged and original versions of the `Cat`.

##### Implementing the `Validate` Interface

Now that we've settled on a signature, we can also add the type that will implement this interface. We will make the 
type a function type, which will enable us to write our rules using [closures](https://gobyexample.com/closures). We 
can define this new type in the `validation.go` file, under the validator interface we defined in the previous section.

```go title="pkg/services/cat/validation.go"
package cat

import (
    "github.com/transcom/mymove/pkg/appcontext"
    "github.com/transcom/mymove/pkg/models"
)

// catValidator defines the interface for checking business rules for a cat
type catValidator interface {
    // Validate The newCat is assumed to be required, so that is a value type.
    // The originalCat is optional, so it's a pointer type.
    Validate(appCtx appcontext.AppContext, newCat models.Cat, originalCat *models.Cat) error
}

// catValidatorFunc is an adapter that will convert a function into an implementation of catValidator
type catValidatorFunc func(appcontext.AppContext, models.Cat, *models.Cat) error

// Validate fulfills the catValidator interface
func (fn catValidatorFunc) Validate(appCtx appcontext.AppContext, newCat models.Cat, originalCat *models.Cat) error {
    return fn(appCtx, newCat, originalCat)
}
```

Note that all of these function signatures are the exact same. **They must stay the same** so that these types implement
the `catValidator` interface defined above. Such is the nature of interfaces types. It might feel inconvenient to repeat
this signature over and over, but at least it forces us to be explicit about our input.

#### Create the `validate<Model>` Function

Now we're going to define the function that will take in the necessary data and the validation functions that we 
should run, run through all the validation functions, and return an error as appropriate. It will be called from the 
service objects, meaning it will be the access point for all our validation.

We'll name this function based on what you are validating, so in our case, we'll name it `validateCat`. Its 
signature will look similar to the signatures we used earlier, with the addition of a new parameter called `checks`:


```go title="pkg/services/cat/validation.go"
package cat

// Previous definitions ommitted to focus on the new part for now

// validateCat runs a cat through the checks that are passed in.
func validateCat(appCtx appcontext.AppContext, newCat models.Cat, originalCat *models.Cat, checks ...catValidator) error {
	// TODO: Implement validation logic...

	return nil
}
```

This `checks` parameter is what is known as a "variadic parameter," making this a
[variadic function](https://gobyexample.com/variadic-functions). This allows us to pass in however many rules we want,
granting us flexibility in how we validate services, for example, using different checks depending on who is using it.

Let's start defining the logic for our function by adding code to loop through our validators, calling the 
`Validate` method on each of them: 

```go title="pkg/services/cat/validation.go"
package cat

// Previous definitions ommitted to focus on the new part for now

// validateCat runs a cat through the checks that are passed in.
func validateCat(appCtx appcontext.AppContext, newCat models.Cat, originalCat *models.Cat, checks ...catValidator) error {
	for _, check := range checks {
		if err := check.Validate(appCtx, newCat, originalCat); err != nil {
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

Taking those guidelines into account, we end up with this `validateCat` function:

```go title="pkg/services/cat/validation.go"
package cat

// Previous definitions ommitted to focus on the new part for now

// validateCat runs a cat through the checks that are passed in.
func validateCat(appCtx appcontext.AppContext, newCat models.Cat, originalCat *models.Cat, checks ...catValidator) error {
	verrs := validate.NewErrors()

	for _, check := range checks {
		if err := check.Validate(appCtx, newCat, originalCat); err != nil {
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
		return apperror.NewInvalidInputError(newCat.ID, nil, verrs, "Invalid input found while validating the cat.")
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

```go title="pkg/services/cat/validation_test.go"
package cat

import (
	"github.com/gobuffalo/validate/v3"
	"github.com/gofrs/uuid"

	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/models"
)

func (suite CatSuite) TestCatValidatorFuncValidate() {
	suite.Run("Calling Validate runs validation function with no errors", func() {
		validator := catValidatorFunc(func(_ appcontext.AppContext, _ models.Cat, _ *models.Cat) error {
			return nil
		})

		err := validator.Validate(suite.AppContextForTest(), models.Cat{}, nil)

		suite.NoError(err)
	})

	suite.Run("Calling Validate runs validation function with errors", func() {
		validator := catValidatorFunc(func(_ appcontext.AppContext, _ models.Cat, _ *models.Cat) error {
			verrs := validate.NewErrors()

			verrs.Add("ID", "fake error")

			return verrs
		})

		err := validator.Validate(suite.AppContextForTest(), models.Cat{}, nil)

		suite.Error(err)
		suite.Contains(err.Error(), "fake error")
	})
}

func (suite CatSuite) TestValidateCat() {
	suite.Run("Runs validation and returns nil when there are no errors", func() {
		checkAlwaysReturnNil := catValidatorFunc(func(_ appcontext.AppContext, _ models.Cat, _ *models.Cat) error {
			return nil
		})

		err := validateCat(suite.AppContextForTest(), models.Cat{}, nil, []catValidator{checkAlwaysReturnNil}...)

		suite.NoError(err)
	})

	suite.Run("Runs validation and returns input errors", func() {
		checkAlwaysReturnValidationErr := catValidatorFunc(func(_ appcontext.AppContext, _ models.Cat, _ *models.Cat) error {
			verrs := validate.NewErrors()

			verrs.Add("ID", "fake error")

			return verrs
		})

		err := validateCat(suite.AppContextForTest(), models.Cat{}, nil, []catValidator{checkAlwaysReturnValidationErr}...)

		suite.Error(err)
		suite.IsType(apperror.InvalidInputError{}, err)
		suite.Contains(err.Error(), "Invalid input found while validating the cat.")
	})

	suite.Run("Runs validation and returns other errors", func() {
		checkAlwaysReturnOtherError := catValidatorFunc(func(_ appcontext.AppContext, _ models.Cat, _ *models.Cat) error {
			return apperror.NewNotFoundError(uuid.Must(uuid.NewV4()), "Cat not found.")
		})

		err := validateCat(suite.AppContextForTest(), models.Cat{}, nil, []catValidator{checkAlwaysReturnOtherError}...)

		suite.Error(err)
		suite.IsType(apperror.NotFoundError{}, err)
		suite.Contains(err.Error(), "Cat not found.")
	})
}
```
</details>

#### Final `validation.go`

Just to recap, here is what our final `validation.go` file looks like:

<details>
<summary>Final `validation.go`</summary>

```go title="pkg/services/cat/validation.go"
package cat

import (
	"github.com/gobuffalo/validate/v3"

	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/models"
)

// catValidator defines the interface for checking business rules for a cat
type catValidator interface {
	// Validate The newCat is assumed to be required, so that is a value type.
	// The originalCat is optional, so it's a pointer type.
	Validate(appCtx appcontext.AppContext, newCat models.Cat, originalCat *models.Cat) error
}

// catValidatorFunc is an adapter that will convert a function into an implementation of catValidator
type catValidatorFunc func(appcontext.AppContext, models.Cat, *models.Cat) error

// Validate fulfills the catValidator interface
func (fn catValidatorFunc) Validate(appCtx appcontext.AppContext, newCat models.Cat, originalCat *models.Cat) error {
	return fn(appCtx, newCat, originalCat)
}

// validateCat runs a cat through the checks that are passed in.
func validateCat(appCtx appcontext.AppContext, newCat models.Cat, originalCat *models.Cat, checks ...catValidator) error {
	verrs := validate.NewErrors()

	for _, check := range checks {
		if err := check.Validate(appCtx, newCat, originalCat); err != nil {
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
		return apperror.NewInvalidInputError(newCat.ID, nil, verrs, "Invalid input found while validating the cat.")
	}

	return nil
}
```

</details>

### `rules.go`

Now we'll create the `rules.go` and `rules_test.go` files. In the `rules.go` file, we'll use the types defined in 
`validation.go`, so make sure you've done that first. You'll also need to know what your business rules are.

For our example, here are a few potential rules (for the sake of brevity, we won't actually implement them all):

* `ID` must be blank when creating a `Cat`.
* Check that `Name` is not empty.
* Check that, if both `Birthday` and `GotchaDay` are defined, `Birthday` is equal to, or earlier than the `GotchaDay`.
* Check that, if `Weight` is defined, it is greater than 0.

We'll start by defining the functions for our rules like this:

```go title="pkg/services/cat/rules.go"
package cat

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
)

func checkID() catValidator {
	return catValidatorFunc(func(_ appcontext.AppContext, newCat models.Cat, originalCat *models.Cat) error {
		return nil // TODO: implement validation logic
	})
}

func checkName() catValidator {
	return catValidatorFunc(func(_ appcontext.AppContext, newCat models.Cat, originalCat *models.Cat) error {
		return nil // TODO: implement validation logic
	})
}

func checkDates() catValidator {
	return catValidatorFunc(func(_ appcontext.AppContext, newCat models.Cat, originalCat *models.Cat) error {
		return nil // TODO: implement validation logic
	})
}

func checkWeight() catValidator {
	return catValidatorFunc(func(_ appcontext.AppContext, newCat models.Cat, originalCat *models.Cat) error {
		return nil // TODO: implement validation logic
	})
}
```

These functions are [**closures**](https://gobyexample.com/closures), which uses a function within a function.
In this case, the outer function has no parameters and returns the `catValidator` interface type.

The _inner_ function, however, must have a signature that is exactly the same as our `catValidatorFunc` function type so
that we can use the interface. This means you will have to change all of these rule functions if you ever change that
base signature, so keep that in mind as you continue working on validation.

#### `checkID`

We've defined the function name and signature, so we can write our tests for what we expect to happen (minimized for 
ease of reading the page): 

<details>
<summary>Tests for `checkID`</summary>

```go title="pkg/services/cat/rules_test.go"
package cat

import (
	"github.com/gobuffalo/validate/v3"
	"github.com/gofrs/uuid"

	"github.com/transcom/mymove/pkg/models"
)

func (suite *CatSuite) TestCheckID() {
	suite.Run("Success", func() {
		suite.Run("Create Cat without an ID", func() {
			err := checkID().Validate(suite.AppContextForTest(), models.Cat{}, nil)

			suite.NilOrNoVerrs(err)
		})

		suite.Run("Update Cat with matching ID", func() {
			id := uuid.Must(uuid.NewV4())

			err := checkID().Validate(suite.AppContextForTest(), models.Cat{ID: id}, &models.Cat{ID: id})

			suite.NilOrNoVerrs(err)
		})
	})

	suite.Run("Failure", func() {
		suite.Run("Return an error if an ID is defined when creating a Cat", func() {
			err := checkID().Validate(suite.AppContextForTest(), models.Cat{ID: uuid.Must(uuid.NewV4())}, nil)

			suite.Error(err)
			suite.IsType(&validate.Errors{}, err)
			suite.Contains(err.Error(), "ID must not be set when creating a Cat.")
		})

		suite.Run("Return an error if the IDs don't match", func() {
			err := checkID().Validate(suite.AppContextForTest(), models.Cat{ID: uuid.Must(uuid.NewV4())}, &models.Cat{ID: uuid.Must(uuid.NewV4())})

			suite.Error(err)
			suite.IsType(&validate.Errors{}, err)
			suite.Contains(err.Error(), "ID for new Cat must match original Cat ID.")
		})
	})
}
```

</details>

Now we can implement the function like so:

```go title="pkg/services/cat/rules.go" {13,14}
package cat

import (
	"github.com/gobuffalo/validate/v3"

	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
)

// checkID checks that newCat doesn't already have an ID if we're creating a Cat, or that it matches the original Cat
// for updates.
func checkID() catValidator {
	return catValidatorFunc(func(_ appcontext.AppContext, newCat models.Cat, originalCat *models.Cat) error {
		verrs := validate.NewErrors()

		if originalCat == nil {
			if newCat.ID.IsNil() {
				return verrs
			}

			verrs.Add("ID", "ID must not be set when creating a Cat.")
		} else {
			if newCat.ID != originalCat.ID {
				verrs.Add("ID", "ID for new Cat must match original Cat ID.")
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

#### `check<thing>`

Coming soon...

[//]: # (TODO: need an example of a check function that takes advantange of our use of closures. Could use an example of having a string validator service that we use to validate the names...)

#### Grouping `rules` Functions

Once we have some rules, we can start grouping them as needed. For example, we could group them based on which set 
of users require different rules. The key here is to define functions that will return slices of validator functions,
instead of constant slice variables.

```go title="pkg/services/cat/rules.go"
package cat

// Other logic left out for brevity.

// customerChecks are the rules that should run for actions taken by customers
func customerChecks() []catValidator {
	return []catValidator{
		checkID(),
		checkName(),
	}
}

// officeChecks are the rules that should run for actions taken by office users
func officeChecks() []catValidator {
	return []catValidator{
		checkID(),
	}
}
```

The power of this pattern is that it lets us easily define that for customers, we want to check the Cat names, but 
we'll let office users input whatever they want for names. 

You'll notice that we're calling our `check<thing>` functions now, but this isn't triggering validation. These are 
`closures`, so we're calling the outer function, which is returning our validator. The validators that we get back 
aren't called until `validateCat` is called.

Note that we _do_ pass in whatever parameters we use in the outer functions at this level. This is where we set those
"dependencies."

These grouping functions can be used in multiple places, and are meant for utility. They are not a hard requirement to
implement the validator pattern, but they are helpful organizational tools.

## Recap

So now we've written rules for what validation we expect to happen with our data, and we've set up the validation 
function that we can call to run through those rules. Now you can move on to setting up the actual service object.

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