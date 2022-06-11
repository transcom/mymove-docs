---
sidebar_position: 6
---
# Implementation

Now we can start implementing our service objects. We'll start with the creator service object and then work on the 
updater service object.

## `Cat` Creator

In the `services/cat` subpackage, we'll add two new files, `cat_creator.go` and its corresponding tests file,  
`cat_creator_test.go`:

```text {7,8}
mymove/
├── pkg/
│   ├── services/
│   │   ├── ...
│   │   ├── audit/
│   │   ├── cat/
│   │   │   ├── cat_creator.go
│   │   │   ├── cat_creator_test.go
│   │   │   ├── ...
│   │   ├── customer_support_remarks/
│   │   ├── ...
```

### Creating the Struct

In the `cat_creator.go` file, we'll start by defining our base `struct` type for the service object. All of a 
service objects' actions will be receiver functions for the `struct`. This `struct` should be private to the subpackage.

```go title="pkg/services/cat/cat_creator.go"
package cat

// catCreator is the concrete struct implementing the services.CatCreator interface
type catCreator struct {}
```

This struct should contain all the required fields for your new service. Commonly this includes the validator 
functions for the service and possibly other service objects if they are needed. You should think of these fields as
_dependencies_ for your new service object. The more you have, the more work the caller will have to do to set up 
this service, which can get inconvenient very quickly. Typically, these dependencies will be interfaces, which makes 
it easier to mock them in tests at least.

Note that the service objects that you need to define here are the ones that your service object will use directly, 
they aren't the ones your validation functions will need. We'll see later how we pass the validators their dependencies. 

For the creator, we won't need any services to be part of the `struct`, but we'll see an example of using a service 
when we get to the updater. So for now, we'll just add a field for our validators:

```go title="pkg/services/cat/cat_creator.go"
package cat

// catCreator is the concrete struct implementing the services.CatCreator interface
type catCreator struct {
	checks []catValidator
}
```

### Creating the Action Function

Now that we've defined our `struct`, we can define the receiver function for it. Remember that we intend for this 
`struct` to be the implementation of the interface we defined in `services/cat.go`, so we actually already defined 
the signature for it when [we defined the interface](./set-up-service-subpackage-and-interface#service-interface). 
So, that gives us this:

```go title="pkg/services/cat/cat_creator.go" {13-16}
package cat

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
)

// catCreator is the concrete struct implementing the services.CatCreator interface
type catCreator struct {
	checks []catValidator
}

// CreateCat creates a cat
func (c *catCreator) CreateCat(appCtx appcontext.AppContext, cat models.Cat) (*models.Cat, error) {
	return nil, nil  // TODO: implement logic
}
```

We'll come back and implement the logic in a later step.

### Creating An Instance of Our Service Object

We have a service object, and we have validators, but now we need a way to initialize our service objects and define 
how we set up its validators, ensuring the correct ones are used as needed.

We'll use functions to initialize our service object with the correct validators for the use cases we have. When we 
[grouped our validation functions](./validation#grouping-rules-functions), we defined what our use cases were, one 
for the customer, and one for the office. We can create the corresponding initializing functions now:

```go title="pkg/services/cat/cat_creator.go" {14-27}
package cat

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// catCreator is the concrete struct implementing the services.CatCreator interface
type catCreator struct {
	checks []catValidator
}

// NewCustomerCatCreator creates a new catCreator struct with the checks it needs for a customer and the service
// dependencies the checks need.
func NewCustomerCatCreator(stringChecker services.StringChecker) services.CatCreator {
	return &catCreator{
		checks: customerChecks(stringChecker),
	}
}

// NewOfficeCatCreator creates a new catCreator struct with the checks it needs for an office user
func NewOfficeCatCreator() services.CatCreator {
	return &catCreator{
		checks: officeChecks(),
	}
}

// CreateCat creates a cat
func (c *catCreator) CreateCat(appCtx appcontext.AppContext, cat models.Cat) (*models.Cat, error) {
	return nil, nil // TODO: implement logic
}
```

Here you can see in the `NewCustomerCatCreator` how we pass along the `services.StringChecker` that the checks need.

You'll notice we don't allow the caller to choose the checks that will be run for a given service. Instead, the 
caller will need to pick the correct initializing function to use. This makes it so that we have uniform checks for 
a given use case.

Using this strategy, we can add however many `New<UseCase><ServiceObject>` functions as we need to. They will all
return the same service interface with different validators. This way we don't have to muddle with our interface
definition, which is great because every modification to an interface has to be reproduced with every `struct` that
implements that interface. Creating new initializer functions is the least invasive way to change up our validation.

These functions also let us keep our `struct` and dependencies private to this subpackage and helps us standardize 
the way folks use our service. By abstracting implementation and returning an interface, we are creating boundaries 
between functionality and implementation that allow our codebase to be more flexible.

### Implementing the Creator

Now that everything is set up and wired up, we can focus on the implementation details. **This is going to be highly 
context-dependent.** Keep in mind that the following guidance may m.

For creating a new model record, we generally need to:

1. Find any related objects in the database.
    1. Immediately we have a step that isn't applicable to the example model we're working with. Our `Cat` isn't 
       tied to anything else. But, if you were working with say, creating a shipment, you'd need to find the move. 
       We'll see an example of finding data we need when we work on the `Cat` updater though.
1. Validate the input data against our business rules.
1. Start a transaction and make the change to the database.
1. Return the successfully created object.

#### Tests for the Creator

Knowing the general actions we'll take, we can write some tests for our creator, so we know we've set it up correctly.

Test cases we'll want:

* Validation error with the input data
* Error with creating the `Cat`
* Successfully creating a `Cat`

<details>
<summary>Tests for `CreateCat`</summary>

```go title="pkg/services/cat/cat_creator_test.go"
package cat

import (
	"github.com/gofrs/uuid"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/models"
)

func (suite CatSuite) TestCreateCat() {
	// Only going to use one of our creators since the only difference between them is the rules they use for
	// validation. Since the rules have their own tests and aren't the focus of these tests, no point in testing them.

	suite.Run("Returns an InvalidInputError if there's an issue with the input data", func() {
		badCat := models.Cat{
			ID: uuid.Must(uuid.NewV4()),
		}

		creator := NewOfficeCatCreator()

		newCat, err := creator.CreateCat(suite.AppContextForTest(), badCat)

		suite.Nil(newCat)

		if suite.Error(err) {
			suite.IsType(apperror.InvalidInputError{}, err)
			suite.Equal(err.Error(), "Invalid input found while validating the cat.")
		}
	})

	suite.Run("Returns a transaction error if one is raised", func() {
		// Easiest way to trigger this is by trying to store a cat with the same ID. We'll also need to skip the
		// validation for the first one so we'll create it directly
		cat := models.Cat{
			Name: "Fluffy",
		}

		appCtx := suite.AppContextForTest()

		verrs, err := appCtx.DB().ValidateAndCreate(&cat)

		suite.NoVerrs(verrs)
		suite.Nil(err)
		suite.NotNil(cat.ID)

		creator := catCreator{}

		newCat, createErr := creator.CreateCat(appCtx, cat)

		suite.Nil(newCat)

		if suite.Error(createErr) {
			suite.IsType(apperror.QueryError{}, createErr)
		}
	})

	suite.Run("Can successfully create a cat", func() {
		cat := models.Cat{
			Name: "Fluffy",
		}

		creator := NewOfficeCatCreator()

		newCat, err := creator.CreateCat(suite.AppContextForTest(), cat)

		suite.Nil(err)

		if suite.NotNil(newCat) {
			suite.NotNil(newCat.ID)
		}
	})
}
```

</details>

If we run those tests, they should all fail, but soon we'll get them passing!

#### Validating Creator Input

We can finally use the `validateCat` function we wrote in the 
[validation section](validation#create-the-validatemodel-function):

```go title="pkg/services/cat/cat_creator.go"
package cat

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// catCreator is the concrete struct implementing the services.CatCreator interface
type catCreator struct {
	checks []catValidator
}

// NewCustomerCatCreator creates a new catCreator struct with the checks it needs for a customer and the service
// dependencies the checks need.
func NewCustomerCatCreator(stringChecker services.StringChecker) services.CatCreator {
	return &catCreator{
		checks: customerChecks(stringChecker),
	}
}

// NewOfficeCatCreator creates a new catCreator struct with the checks it needs for an office user
func NewOfficeCatCreator() services.CatCreator {
	return &catCreator{
		checks: officeChecks(),
	}
}

// CreateCat creates a cat
func (c *catCreator) CreateCat(appCtx appcontext.AppContext, cat models.Cat) (*models.Cat, error) {
    // highlight-start
	err := validateCat(appCtx, cat, nil, c.checks...)

	if err != nil {
		return nil, err
	}
    // highlight-end

	return nil, nil  // TODO: Finish implementing logic
}
```

You can see that we pass the `appCtx` and `cat` along to `validateCat` for the first two args. We then pass `nil` 
for the third arg since we're creating a `Cat` so there is no pre-existing `Cat`. 

The final bit is to pass the checks that we want to use. Notice how we use `c.checks...` to pass the checks. This is 
because the `checks` will contain the correct checks based on how the `catCreator` was initialized (
`NewCustomerCatCreator` vs `NewOfficeCatCreator`), and the `...` part is because it's a variadic function (more info in 
[validation resources](validation#resources)).

The final bit for this part is to check for errors and return early if we have any.

#### Creating the Cat

Next we'll start a transaction so that we can roll back the operation if there are issues. Within the transaction, 
we'll use [Pop](https://gobuffalo.io/en/docs/db/mutations/) to create the `Cat`.

```go title="pkg/services/cat/cat_creator.go"
package cat

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// Omitting the other parts for ease of reading

// CreateCat creates a cat
func (c *catCreator) CreateCat(appCtx appcontext.AppContext, cat models.Cat) (*models.Cat, error) {
	err := validateCat(appCtx, cat, nil, c.checks...)

	if err != nil {
		return nil, err
	}

    // highlight-start
	txnErr := appCtx.NewTransaction(func(txnCtx appcontext.AppContext) error {
		// TODO: Implement creation logic
		return nil
	})

	if txnErr != nil {
		return nil, txnErr
	}
    // highlight-end
    
    return nil, nil  // TODO: Finish implementing logic
}
```

Here we can see we start a transaction which can return an error, so we need to catch that, check it, and if not 
`nil`, return it.

Within the transaction, it's important to use the `txnCtx` version of `appcontext.AppContext`. This ensures that if 
we are within a larger transaction (e.g. an orchestrator service object is calling several service objects that 
create/update data), we can see the other changes that have been made as part of the transaction and vice versa.

Now we fill in the creation logic:

```go title="pkg/services/cat/cat_creator.go"
package cat

import (
	"github.com/gofrs/uuid"

	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// Omitting the other parts for ease of reading

// CreateCat creates a cat
func (c *catCreator) CreateCat(appCtx appcontext.AppContext, cat models.Cat) (*models.Cat, error) {
	err := validateCat(appCtx, cat, nil, c.checks...)

	if err != nil {
		return nil, err
	}

	txnErr := appCtx.NewTransaction(func(txnCtx appcontext.AppContext) error {
	    // highlight-start
		// This will make the changes directly (if successful) using the pointer so we can just use `cat` later on.
		verrs, err := txnCtx.DB().ValidateAndCreate(&cat)

		// Check validation errors.
		if verrs != nil && verrs.HasAny() {
			return apperror.NewInvalidInputError(uuid.Nil, err, verrs, "Invalid input found while creating the Cat.")
		} else if err != nil {
			// If the error is something else (this is unexpected), we create a QueryError
			return apperror.NewQueryError("Cat", err, "")
		}
		
		return nil
        // highlight-end
	})

	if txnErr != nil {
		return nil, txnErr
	}
    
    return nil, nil  // TODO: Finish implementing logic
}
```

We use `txnCtx.DB().ValidateAndCreate` to actually create the `Cat`, and check the validation errors and regular 
error that we can get back. We have a pattern of converting unexpected (non-validation) errors into a 
`apperror.QueryError` type, but we don't want to override the error msg, hence the third arg being an empty string.

#### Final `cat_creator.go`

The last thing to do is return a pointer to the newly created `Cat`, which gives us this final version:

```go title="pkg/services/cat/cat_creator.go"
package cat

import (
	"github.com/gofrs/uuid"

	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// catCreator is the concrete struct implementing the services.CatCreator interface
type catCreator struct {
	checks []catValidator
}

// NewCustomerCatCreator creates a new catCreator struct with the checks it needs for a customer and the service
// dependencies the checks need.
func NewCustomerCatCreator(stringChecker services.StringChecker) services.CatCreator {
	return &catCreator{
		checks: customerChecks(stringChecker),
	}
}

// NewOfficeCatCreator creates a new catCreator struct with the checks it needs for an office user
func NewOfficeCatCreator() services.CatCreator {
	return &catCreator{
		checks: officeChecks(),
	}
}

// CreateCat creates a cat
func (c *catCreator) CreateCat(appCtx appcontext.AppContext, cat models.Cat) (*models.Cat, error) {
	err := validateCat(appCtx, cat, nil, c.checks...)

	if err != nil {
		return nil, err
	}

	txnErr := appCtx.NewTransaction(func(txnCtx appcontext.AppContext) error {
		// This will make the changes directly (if successful) using the pointer so we can just use `cat` later on.
		verrs, err := txnCtx.DB().ValidateAndCreate(&cat)

		// Check validation errors.
		if verrs != nil && verrs.HasAny() {
			return apperror.NewInvalidInputError(uuid.Nil, err, verrs, "Invalid input found while creating the Cat.")
		} else if err != nil {
			// If the error is something else (this is unexpected), we create a QueryError
			return apperror.NewQueryError("Cat", err, "")
		}

		return nil
	})

	if txnErr != nil {
		return nil, txnErr
	}

	return &cat, nil
}
```
