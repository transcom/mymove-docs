---
sidebar_position: 6
---
# Implementation

Now we can start implementing our service objects. We'll start with the creator service object and then work on the 
updater service object.

## `Pet` Creator

In the `services/pet` subpackage, we'll add two new files, `pet_creator.go` and its corresponding tests file,  
`pet_creator_test.go`:

```text {6,7}
mymove/
├── pkg/
│   ├── services/
│   │   ├── ...
│   │   ├── pet/
│   │   │   ├── pet_creator.go
│   │   │   ├── pet_creator_test.go
│   │   │   ├── ...
│   │   ├── ...
```

### Creating the Struct

In the `pet_creator.go` file, we'll start by defining our base `struct` type for the service object. All of a 
service objects' actions will be receiver functions for the `struct`. This `struct` should be private to the subpackage.

```go title="pkg/services/pet/pet_creator.go"
package pet

// petCreator is the concrete struct implementing the services.PetCreator interface
type petCreator struct {}
```

This struct should contain all the required fields for your new service. Commonly this includes the validator 
functions for the service and possibly other service objects if they are needed. You should think of these fields as
_dependencies_ for your new service object. The more you have, the more work the caller will have to do to set up 
this service, which can get inconvenient very quickly. Typically, these dependencies will be interfaces, which makes 
it easier to mock them in tests at least.

Note that the service objects that you need to define here are the ones that your service object will use directly, 
they aren't the ones your validation functions will need. We'll see later how we pass the validators their dependencies. 

For the creator, we won't need any services to be part of the `struct`. So for now, we'll just add a field for our 
validators:

```go title="pkg/services/pet/pet_creator.go"
package pet

// petCreator is the concrete struct implementing the services.PetCreator interface
type petCreator struct {
	checks []petValidator
}
```

### Creating the Action Function

Now that we've defined our `struct`, we can define the receiver function for it. Remember that we intend for this 
`struct` to be the implementation of the interface we defined in `services/pet.go`, so we actually already defined 
the signature for it when [we defined the interface](set-up-service-subpackage-and-interface#service-interface). 
So, that gives us this:

```go title="pkg/services/pet/pet_creator.go" {13-16}
package pet

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
)

// petCreator is the concrete struct implementing the services.PetCreator interface
type petCreator struct {
	checks []petValidator
}

// CreatePet creates a pet
func (c *petCreator) CreatePet(appCtx appcontext.AppContext, pet models.Pet) (*models.Pet, error) {
	return nil, nil  // TODO: implement logic
}
```

We'll come back and implement the logic in a later step.

### Creating An Instance of Our Service Object

We have a service object, and we have validators, but now we need a way to initialize our service objects and define 
how we set up its validators, ensuring the correct ones are used as needed.

We'll use functions to initialize our service object with the correct validators for the use cases we have. When we 
[grouped our validation functions](validation#grouping-rules-functions), we defined what our use cases were, one 
for the customer, and one for the office. We can create the corresponding initializing functions now:

```go title="pkg/services/pet/pet_creator.go" {14-27}
package pet

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// petCreator is the concrete struct implementing the services.PetCreator interface
type petCreator struct {
	checks []petValidator
}

// NewCustomerPetCreator creates a new petCreator struct with the checks it needs for a customer and the service
// dependencies the checks need.
func NewCustomerPetCreator(stringChecker services.StringChecker) services.PetCreator {
	return &petCreator{
		checks: customerChecks(stringChecker),
	}
}

// NewOfficePetCreator creates a new petCreator struct with the checks it needs for an office user
func NewOfficePetCreator() services.PetCreator {
	return &petCreator{
		checks: officeChecks(),
	}
}

// CreatePet creates a pet
func (c *petCreator) CreatePet(appCtx appcontext.AppContext, pet models.Pet) (*models.Pet, error) {
	return nil, nil // TODO: implement logic
}
```

Here you can see in the `NewCustomerPetCreator` how we pass along the `services.StringChecker` that the checks need.

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
context-dependent.** Keep in mind that the following guidance may not apply to your use case.

For creating a new model record, we generally need to:

1. Find any related objects in the database.
    1. Immediately we have a step that isn't applicable to the example model we're working with. Our `Pet` is 
       related to `Cat`, but won't be creating it or affecting it in any way. But, if you were working with say, 
       creating a shipment, you'd need to find the move. We'll see an example of finding data we need when we work 
       on the `Pet` updater though.
1. Validate the input data against our business rules.
1. Start a transaction and make the change to the database.
1. Return the successfully created object.

#### Tests for the Creator

Knowing the general actions we'll take, we can write some tests for our creator, so we know we've set it up correctly.

Test cases we'll want:

* Validation error with the input data
* Error with creating the `Pet`
* Successfully creating a `Pet`

<details>
<summary>Tests for `CreatePet`</summary>

```go title="pkg/services/pet/pet_creator_test.go"
package pet

import (
	"github.com/gofrs/uuid"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/models"
)

func (suite PetSuite) TestCreatePet() {
	// Only going to use one of our creators since the only difference between them is the rules they use for
	// validation. Since the rules have their own tests and aren't the focus of these tests, no point in testing them.

	suite.Run("Returns an InvalidInputError if there's an issue with the input data", func() {
		badPet := models.Pet{
			ID: uuid.Must(uuid.NewV4()),
		}

		creator := NewOfficePetCreator()

		newPet, err := creator.CreatePet(suite.AppContextForTest(), badPet)

		suite.Nil(newPet)

		if suite.Error(err) {
			suite.IsType(apperror.InvalidInputError{}, err)
			suite.Equal(err.Error(), "Invalid input found while validating the pet.")
		}
	})

	suite.Run("Returns a transaction error if one is raised", func() {
		// Easiest way to trigger this is by trying to store a pet with the same ID. We'll also need to skip the
		// validation for the first one so we'll create it directly
		pet := models.Pet{
			Type: models.PetTypeCat,
			Name: "Fluffy",
		}

		appCtx := suite.AppContextForTest()

		verrs, err := appCtx.DB().ValidateAndCreate(&pet)

		suite.NoVerrs(verrs)
		suite.Nil(err)
		suite.NotNil(pet.ID)

		creator := petCreator{}

		newPet, createErr := creator.CreatePet(appCtx, pet)

		suite.Nil(newPet)

		if suite.Error(createErr) {
			suite.IsType(apperror.QueryError{}, createErr)
		}
	})

	suite.Run("Can successfully create a pet", func() {
		pet := models.Pet{
			Type: models.PetTypeCat,
			Name: "Fluffy",
		}

		creator := NewOfficePetCreator()

		newPet, err := creator.CreatePet(suite.AppContextForTest(), pet)

		suite.Nil(err)

		if suite.NotNil(newPet) {
			suite.NotNil(newPet.ID)
		}
	})
}
```

</details>

If we run those tests, they should all fail, but soon we'll get them passing!

#### Validating Creator Input

We can finally use the `validatePet` function we wrote in the 
[validation section](validation#create-the-validatemodel-function):

```go title="pkg/services/pet/pet_creator.go"
package pet

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// petCreator is the concrete struct implementing the services.PetCreator interface
type petCreator struct {
	checks []petValidator
}

// NewCustomerPetCreator creates a new petCreator struct with the checks it needs for a customer and the service
// dependencies the checks need.
func NewCustomerPetCreator(stringChecker services.StringChecker) services.PetCreator {
	return &petCreator{
		checks: customerChecks(stringChecker),
	}
}

// NewOfficePetCreator creates a new petCreator struct with the checks it needs for an office user
func NewOfficePetCreator() services.PetCreator {
	return &petCreator{
		checks: officeChecks(),
	}
}

// CreatePet creates a pet
func (c *petCreator) CreatePet(appCtx appcontext.AppContext, pet models.Pet) (*models.Pet, error) {
    // highlight-start
	err := validatePet(appCtx, pet, nil, c.checks...)

	if err != nil {
		return nil, err
	}
    // highlight-end

	return nil, nil  // TODO: Finish implementing logic
}
```

You can see that we pass the `appCtx` and `pet` along to `validatePet` for the first two args. We then pass `nil` 
for the third arg since we're creating a `Pet` so there is no pre-existing `Pet`. 

The final bit is to pass the checks that we want to use. Notice how we use `c.checks...` to pass the checks. This is 
because the `checks` will contain the correct checks based on how the `petCreator` was initialized (
`NewCustomerPetCreator` vs `NewOfficePetCreator`), and the `...` part is because it's a variadic function (more info in 
[validation resources](validation#resources)).

The final bit for this part is to check for errors and return early if we have any.

#### Creating the Pet

Next we'll start a transaction so that we can roll back the operation if there are issues. Within the transaction, 
we'll use [Pop](https://gobuffalo.io/en/docs/db/mutations/) to create the `Pet`.

```go title="pkg/services/pet/pet_creator.go"
package pet

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// Omitting the other parts for ease of reading

// CreatePet creates a pet
func (c *petCreator) CreatePet(appCtx appcontext.AppContext, pet models.Pet) (*models.Pet, error) {
	err := validatePet(appCtx, pet, nil, c.checks...)

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

```go title="pkg/services/pet/pet_creator.go"
package pet

import (
	"github.com/gofrs/uuid"

	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// Omitting the other parts for ease of reading

// CreatePet creates a pet
func (c *petCreator) CreatePet(appCtx appcontext.AppContext, pet models.Pet) (*models.Pet, error) {
	err := validatePet(appCtx, pet, nil, c.checks...)

	if err != nil {
		return nil, err
	}

	txnErr := appCtx.NewTransaction(func(txnCtx appcontext.AppContext) error {
	    // highlight-start
		// This will make the changes directly (if successful) using the pointer so we can just use `pet` later on.
		verrs, err := txnCtx.DB().ValidateAndCreate(&pet)

		// Check validation errors.
		if verrs != nil && verrs.HasAny() {
			return apperror.NewInvalidInputError(uuid.Nil, err, verrs, "Invalid input found while creating the Pet.")
		} else if err != nil {
			// If the error is something else (this is unexpected), we create a QueryError
			return apperror.NewQueryError("Pet", err, "")
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

We use `txnCtx.DB().ValidateAndCreate` to actually create the `Pet`, and check the validation errors and regular 
error that we can get back. We have a pattern of converting unexpected (non-validation) errors into a 
`apperror.QueryError` type, but we don't want to override the error msg, hence the third arg being an empty string.

#### Final `pet_creator.go`

The last thing to do is return a pointer to the newly created `Pet`, which gives us this final version:

<details>
<summary>Final `pet_creator.go`</summary>

```go title="pkg/services/pet/pet_creator.go"
package pet

import (
	"github.com/gofrs/uuid"

	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// petCreator is the concrete struct implementing the services.PetCreator interface
type petCreator struct {
	checks []petValidator
}

// NewCustomerPetCreator creates a new petCreator struct with the checks it needs for a customer and the service
// dependencies the checks need.
func NewCustomerPetCreator(stringChecker services.StringChecker) services.PetCreator {
	return &petCreator{
		checks: customerChecks(stringChecker),
	}
}

// NewOfficePetCreator creates a new petCreator struct with the checks it needs for an office user
func NewOfficePetCreator() services.PetCreator {
	return &petCreator{
		checks: officeChecks(),
	}
}

// CreatePet creates a pet
func (c *petCreator) CreatePet(appCtx appcontext.AppContext, pet models.Pet) (*models.Pet, error) {
	err := validatePet(appCtx, pet, nil, c.checks...)

	if err != nil {
		return nil, err
	}

	txnErr := appCtx.NewTransaction(func(txnCtx appcontext.AppContext) error {
		// This will make the changes directly (if successful) using the pointer so we can just use `pet` later on.
		verrs, err := txnCtx.DB().ValidateAndCreate(&pet)

		// Check validation errors.
		if verrs != nil && verrs.HasAny() {
			return apperror.NewInvalidInputError(uuid.Nil, err, verrs, "Invalid input found while creating the Pet.")
		} else if err != nil {
			// If the error is something else (this is unexpected), we create a QueryError
			return apperror.NewQueryError("Pet", err, "")
		}

		return nil
	})

	if txnErr != nil {
		return nil, txnErr
	}

	return &pet, nil
}
```
</details>

### Implementing the Updater

Next we can work on implementing the updater. **This one is going to be highly context-dependent.** Keep in mind 
that the following guidance may not apply to your use case.

#### Setting Up the Struct, Function, and Initializers

The steps here will be similar to the `Create` version, so this section won't have as much explanation as the first 
time.

```go title="pkg/services/pet/pet_updater.go"
package pet

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// petUpdater is the concrete struct implementing the services.PetUpdater interface
type petUpdater struct {
	checks  []petValidator
}

// NewCustomerPetUpdater creates a new petUpdater struct with the checks it needs for a customer and the service
// dependencies the checks need.
func NewCustomerPetUpdater(stringChecker services.StringChecker) services.PetUpdater {
	return &petUpdater{
		checks: customerChecks(stringChecker),
	}
}

// NewOfficePetUpdater creates a new petUpdater struct with the checks it needs for an office user
func NewOfficePetUpdater() services.PetUpdater {
	return &petUpdater{
		checks: officeChecks(),
	}
}

// UpdatePet updates an existing pet
func (u *petUpdater) UpdatePet(appCtx appcontext.AppContext, pet models.Pet, eTag string) (*models.Pet, error) {
	return nil, nil // TODO: implement logic
}
```

One thing to note is that we're re-using our grouped rule functions. This is why we wrote the functions to be able 
to handle both the case of creating and updating. Now we can easily re-use them for both our creator and updater 
service objects.

#### Update Process

For updating model record, we generally need to:

1. Find any related objects in the database.
    1. This means finding the current version of the record we're updating, as well as any related models.
2. Check the input `eTag` against the current model to ensure the user was looking at the latest version before 
   making changes.
3. Create a version of the model that has the requested changes layered on top of the original data.
    1. Remember that in [Variations of `Validate` Signature](validation#variations-of-validate-signature) we 
       mentioned that there's different ways of approaching validation. Since we chose option 1 then, we need to 
       create the merged new version **before** validating the data. If we'd chosen option 2, this step would be 
       after the next one.
4. Validate the input data against our business rules.
5. Start a transaction and make the change to the database.
6. Return the successfully updated object.

#### Tests for the Updater

Knowing the general actions we'll take, we can write some tests for our updater, so we know we've set it up correctly.

Test cases we would want:

* Error if original `Pet` can't be found
* Error if `eTag` is stale/invalid
* Validation error with the input data
* Error with updating the `Pet`
    * Because of the way our `Pet` model is set up, there isn't really an easy way to test this case, so we'll skip 
      this one.
* Successfully updating a `Pet`
* Returns associated models.
    * This will depend a lot on what you're trying to do. You may not have related data, or you may not need to pass 
      it back out.

<details>
<summary>Tests for `UpdatePet`</summary>

```go title="pkg/services/pet/pet_updater_test.go"
package pet

import (
	"errors"
	"fmt"

	"github.com/gofrs/uuid"
	"github.com/stretchr/testify/mock"

	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/etag"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services/mocks"
	"github.com/transcom/mymove/pkg/testdatagen"
)

func (suite PetSuite) TestUpdateCat() {
	setUpForTest := func(appCtx appcontext.AppContext, overrides *models.Pet) *models.Pet {
		originalPet := models.Pet{
			Type: models.PetTypeDog,
			Name: "Fluffy",
		}

		if overrides != nil {
			testdatagen.MergeModels(&originalPet, overrides)
		}

		verrs, err := appCtx.DB().ValidateAndCreate(&originalPet)

		suite.NoVerrs(verrs)
		suite.Nil(err)
		suite.NotNil(originalPet.ID)

		return &originalPet
	}

	suite.Run("Returns an error if the original ", func() {
		// Since we haven't created any Pets, we'll just use a randomly generated ID that we'll try searching for.
		badPet := models.Pet{
			ID: uuid.Must(uuid.NewV4()),
		}

		updater := NewOfficePetUpdater()

		updatedPet, err := updater.UpdatePet(suite.AppContextForTest(), badPet, "")

		suite.Nil(updatedPet)

		if suite.Error(err) {
			suite.IsType(apperror.NotFoundError{}, err)

			suite.Equal(
				fmt.Sprintf("ID: %s not found while looking for Pet", badPet.ID.String()),
				err.Error(),
			)
		}
	})

	suite.Run("Returns a PreconditionFailedError if the input eTag is stale/incorrect", func() {
		appCtx := suite.AppContextForTest()

		originalPet := setUpForTest(appCtx, nil)

		updater := NewOfficePetUpdater()

		updatedPet, updateErr := updater.UpdatePet(suite.AppContextForTest(), *originalPet, "")

		suite.Nil(updatedPet)

		if suite.Error(updateErr) {
			suite.IsType(apperror.PreconditionFailedError{}, updateErr)

			suite.Equal(
				fmt.Sprintf("Precondition failed on update to object with ID: '%s'. The If-Match header value did not match the eTag for this record.", originalPet.ID.String()),
				updateErr.Error(),
			)
		}
	})

	suite.Run("Returns an InvalidInputError if there's an issue with the input data", func() {
		appCtx := suite.AppContextForTest()

		originalPet := setUpForTest(appCtx, nil)

		badPet := *originalPet
		badPet.Name = "<Hacked>"

		stringCheckError := errors.New("invalid characters found in string")

		stringChecker := mocks.NewStringChecker(suite.T())

		stringChecker.On("Validate",
			mock.AnythingOfType("*appcontext.appContext"),
			mock.AnythingOfType("string"),
		).Return(stringCheckError)

		updater := NewCustomerPetUpdater(stringChecker)

		updatedPet, updateErr := updater.UpdatePet(suite.AppContextForTest(), badPet, etag.GenerateEtag(originalPet.UpdatedAt))

		suite.Nil(updatedPet)

		if suite.Error(updateErr) {
			suite.IsType(apperror.InvalidInputError{}, updateErr)

			suite.Equal("Invalid input found while validating the pet.", updateErr.Error())
		}
	})

	suite.Run("Can successfully update a pet", func() {
		appCtx := suite.AppContextForTest()

		originalPet := setUpForTest(appCtx, nil)

		desiredPet := *originalPet
		desiredPet.Name = "Cheddar"

		updater := NewOfficePetUpdater()

		updatedPet, updateErr := updater.UpdatePet(suite.AppContextForTest(), desiredPet, etag.GenerateEtag(originalPet.UpdatedAt))

		suite.Nil(updateErr)

		if suite.NotNil(updatedPet) {
			suite.Equal(desiredPet.Name, updatedPet.Name)
		}
	})

	suite.Run("Returns associated child models", func() {
		appCtx := suite.AppContextForTest()

		originalPet := setUpForTest(appCtx, &models.Pet{Type: models.PetTypeCat})

		desiredPet := *originalPet
		desiredPet.Name = "Cheddar"
		eTag := etag.GenerateEtag(originalPet.UpdatedAt)

		updater := NewOfficePetUpdater()

		updatedPet, updateErr := updater.UpdatePet(suite.AppContextForTest(), desiredPet, eTag)

		suite.Nil(updateErr)

		if suite.NotNil(updatedPet) {
			suite.Equal(desiredPet.Name, updatedPet.Name)

			suite.NotNil(updatedPet.Cat)
		}
	})
}
```

</details>

If we run those tests, they should all fail, but soon we'll get them passing!

#### Fetching the Current Record

The first thing we'll want to do is search for the current version of this model. The exact query will vary based on 
what info you need, but for this one, it will look like this:

```go title="pkg/services/pet/pet_updater.go"
package pet

import (
	"database/sql"
	
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// Omitting the other parts for ease of reading

// UpdatePet creates a pet
func (u *petUpdater) UpdatePet(appCtx appcontext.AppContext, pet models.Pet, eTag string) (*models.Pet, error) {
    // highlight-start
	originalPet := models.Pet{}

    if err := appCtx.DB().Eager().Find(&originalPet, pet.ID); err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil, apperror.NewNotFoundError(pet.ID, "while looking for Pet")
		default:
			return nil, apperror.NewQueryError("Pet", err, "")
		}
	}
    // highlight-end

	return nil, nil // TODO: implement logic
}
```

Note that we want to load the associated models too so that when we return the final version, it has all the 
necessary related data. If you don't need the extra data, you can skip that part. There are also performance 
considerations for using `Eager` vs `EagerPreload`, but we can't use the latter here due to a bug. You can see more 
info in [Using EagerPreload in Pop](/docs/backend/setup/using-eagerpreload-in-pop).

#### Checking For a Stale/Invalid ETag

Now we want to make sure that the `eTag` associated with the version of the data that the user wants to update is 
still the latest version. Otherwise, the updates this user requested might accidentally overwrite another user's 
updates.

```go title="pkg/services/pet/pet_updater.go"
package pet

import (
	"database/sql"
	
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/etag"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// Omitting the other parts for ease of reading

// UpdatePet creates a pet
func (u *petUpdater) UpdatePet(appCtx appcontext.AppContext, pet models.Pet, eTag string) (*models.Pet, error) {
	originalPet := models.Pet{}

	if err := appCtx.DB().Find(&originalPet, pet.ID); err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil, apperror.NewNotFoundError(pet.ID, "while looking for Pet")
		default:
			return nil, apperror.NewQueryError("Pet", err, "")
		}
	}

	if originalPet.Type == models.PetTypeCat {
		if err := appCtx.DB().Load(&originalPet, "Cat"); err != nil {
			return nil, apperror.NewQueryError("Pet", err, "")
		}
	}

    // highlight-start
	if etag.GenerateEtag(originalPet.UpdatedAt) != eTag {
		return nil, apperror.NewPreconditionFailedError(originalPet.ID, nil)
	}
    // highlight-end

	return nil, nil // TODO: implement logic
}
```

#### Merging the Current Model with Desired Changes

Next we'll merge the current model and the desired changes to get the final state that we can then validate:

```go title="pkg/services/pet/pet_updater.go"
package pet

import (
	"database/sql"
	
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/etag"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// Omitting the other parts for ease of reading

// UpdatePet creates a pet
func (u *petUpdater) UpdatePet(appCtx appcontext.AppContext, pet models.Pet, eTag string) (*models.Pet, error) {
	originalPet := models.Pet{}

	if err := appCtx.DB().Find(&originalPet, pet.ID); err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil, apperror.NewNotFoundError(pet.ID, "while looking for Pet")
		default:
			return nil, apperror.NewQueryError("Pet", err, "")
		}
	}

	if originalPet.Type == models.PetTypeCat {
		if err := appCtx.DB().Load(&originalPet, "Cat"); err != nil {
			return nil, apperror.NewQueryError("Pet", err, "")
		}
	}

	if etag.GenerateEtag(originalPet.UpdatedAt) != eTag {
		return nil, apperror.NewPreconditionFailedError(originalPet.ID, nil)
	}

    // highlight-start
    // First we'll create a copy of the originalPet and make the changes to the new version.
	newPet := originalPet

	if pet.Type != "" {
		newPet.Type = pet.Type
	}

	if pet.Name != "" {
		newPet.Name = pet.Name
	}

	newPet.Birthday = services.SetOptionalDateTimeField(pet.Birthday, originalPet.Birthday)
	newPet.GotchaDay = services.SetOptionalDateTimeField(pet.GotchaDay, originalPet.GotchaDay)
	newPet.Bio = services.SetOptionalStringField(pet.Bio, originalPet.Bio)
	newPet.Weight = services.SetOptionalPoundField(pet.Weight, originalPet.Weight)
    // highlight-end

	return nil, nil // TODO: implement logic
}
```

You'll see that we have some shared helper functions to deal with the logic for setting some types of optional 
fields. We also have some for required fields, but not for `Type` and `Name` so we had to do those manually. As you 
work on services, if you find that you're doing some type of logic repeatedly, feel free to add more helpers!

#### Validating Updater Input

Now we're ready to validate!

```go title="pkg/services/pet/pet_updater.go"
package pet

import (
	"database/sql"
	
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/etag"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// Omitting the other parts for ease of reading

// UpdatePet creates a pet
func (u *petUpdater) UpdatePet(appCtx appcontext.AppContext, pet models.Pet, eTag string) (*models.Pet, error) {
	// Omitting the rest of the logic to focus better
	
	// First we'll create a copy of the originalPet and make the changes to the new version.
	newPet := originalPet

	if pet.Type != "" {
		newPet.Type = pet.Type
	}

	if pet.Name != "" {
		newPet.Name = pet.Name
	}

	newPet.Birthday = services.SetOptionalDateTimeField(pet.Birthday, originalPet.Birthday)
	newPet.GotchaDay = services.SetOptionalDateTimeField(pet.GotchaDay, originalPet.GotchaDay)
	newPet.Bio = services.SetOptionalStringField(pet.Bio, originalPet.Bio)
	newPet.Weight = services.SetOptionalPoundField(pet.Weight, originalPet.Weight)
	
    // highlight-start
   	if err := validatePet(appCtx, newPet, &originalPet, u.checks...); err != nil {
		return nil, err
	}
    // highlight-end

	return nil, nil // TODO: implement logic
}
```

You can see that unlike with the creator, we do pass in a third arg to `validatePet` since we're doing updates this 
time and do have an `originalPet`.

#### Updating the Pet

Next we'll start a transaction so that we can roll back the operation if there are issues. Within the transaction,
we'll use [Pop](https://gobuffalo.io/en/docs/db/mutations/) to update the `Pet`.

```go title="pkg/services/pet/pet_updater.go"
package pet

import (
	"database/sql"
	
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/etag"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// Omitting the other parts for ease of reading

// UpdatePet creates a pet
func (u *petUpdater) UpdatePet(appCtx appcontext.AppContext, pet models.Pet, eTag string) (*models.Pet, error) {
	// Omitting the rest of the logic to focus better
	
    // highlight-start
    txnErr := appCtx.NewTransaction(func(txnCtx appcontext.AppContext) error {
		// This will make the changes directly (if successful) using the pointer so we can just use `newPet` later on.
		verrs, err := txnCtx.DB().ValidateAndUpdate(&newPet)

		// Check validation errors.
		if verrs != nil && verrs.HasAny() {
			return apperror.NewInvalidInputError(originalPet.ID, err, verrs, "invalid input found while updating the Pet")
		} else if err != nil {
			// If the error is something else (this is unexpected), we create a QueryError
			return apperror.NewQueryError("Pet", err, "")
		}

		return nil
	})

	if txnErr != nil {
		return nil, txnErr
	}
    // highlight-end
}
```

You'll notice the logic for the DB transaction is pretty similar to the logic for the creator. The main difference 
is the use of `txnCtx.DB().ValidateAndUpdate` instead of `txnCtx.DB().ValidateAndCreate`

#### Final `pet_updater.go`

And with that, we're done! Here's the final version of the updater:

<details>
<summary>Final `pet_updater.go`</summary>

```go title="pkg/services/pet/pet_updater.go"
package pet

import (
	"database/sql"

	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/apperror"
	"github.com/transcom/mymove/pkg/etag"
	"github.com/transcom/mymove/pkg/models"
	"github.com/transcom/mymove/pkg/services"
)

// petUpdater is the concrete struct implementing the services.PetUpdater interface
type petUpdater struct {
	checks []petValidator
}

// NewCustomerPetUpdater creates a new petUpdater struct with the checks it needs for a customer and the service
// dependencies the checks need.
func NewCustomerPetUpdater(stringChecker services.StringChecker) services.PetUpdater {
	return &petUpdater{
		checks: customerChecks(stringChecker),
	}
}

// NewOfficePetUpdater creates a new petUpdater struct with the checks it needs for an office user
func NewOfficePetUpdater() services.PetUpdater {
	return &petUpdater{
		checks: officeChecks(),
	}
}

// UpdatePet creates a pet
func (u *petUpdater) UpdatePet(appCtx appcontext.AppContext, pet models.Pet, eTag string) (*models.Pet, error) {
	originalPet := models.Pet{}

	if err := appCtx.DB().Eager().Find(&originalPet, pet.ID); err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil, apperror.NewNotFoundError(pet.ID, "while looking for Pet")
		default:
			return nil, apperror.NewQueryError("Pet", err, "")
		}
	}

	if etag.GenerateEtag(originalPet.UpdatedAt) != eTag {
		return nil, apperror.NewPreconditionFailedError(originalPet.ID, nil)
	}

	// First we'll create a copy of the originalPet and make the changes to the new version.
	newPet := originalPet

	if pet.Type != "" {
		newPet.Type = pet.Type
	}

	if pet.Name != "" {
		newPet.Name = pet.Name
	}

	newPet.Birthday = services.SetOptionalDateTimeField(pet.Birthday, originalPet.Birthday)
	newPet.GotchaDay = services.SetOptionalDateTimeField(pet.GotchaDay, originalPet.GotchaDay)
	newPet.Bio = services.SetOptionalStringField(pet.Bio, originalPet.Bio)
	newPet.Weight = services.SetOptionalPoundField(pet.Weight, originalPet.Weight)

	if err := validatePet(appCtx, newPet, &originalPet, u.checks...); err != nil {
		return nil, err
	}

	txnErr := appCtx.NewTransaction(func(txnCtx appcontext.AppContext) error {
		// This will make the changes directly (if successful) using the pointer so we can just use `newPet` later on.
		verrs, err := txnCtx.DB().ValidateAndUpdate(&newPet)

		// Check validation errors.
		if verrs != nil && verrs.HasAny() {
			return apperror.NewInvalidInputError(originalPet.ID, err, verrs, "invalid input found while updating the Pet")
		} else if err != nil {
			// If the error is something else (this is unexpected), we create a QueryError
			return apperror.NewQueryError("Pet", err, "")
		}

		return nil
	})

	if txnErr != nil {
		return nil, txnErr
	}

	return &newPet, nil
}
```
</details>

:::info
Now that the function is filled out, you'll want to refactor it by extracting each logical step into a separate,
smaller, and well-named private function. We should strive to keep all functions as small as possible for 
readability. The creator was much smaller, so it's not as vital to do that there, but as you can see, the updater is 
quite large by the end.

[ApproveOrRejectServiceItem](https://github.com/transcom/mymove/blob/master/pkg/services/mto_service_item/mto_service_item_updater.go#L44-L123)
is a good example of a function that performs a lot of actions, and each one is encapsulated in a separate function.
:::