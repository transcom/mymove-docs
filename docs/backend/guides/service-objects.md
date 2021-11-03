---
sidebar_position: 1
---
# Backend Service Objects Development Guide

## What is a Service Object?

The MilMove backend is _loosely_ designed with this [3-layer structure](https://docs.google.com/presentation/d/1kVQzrYWY0AnYyPbiqfuFv8Fh_7IwwIFv3XKRxZI44Hs/edit#slide=id.p):

1. **Presentation layer.** Our endpoint handlers that perform type conversions and connect user requests to business logic functions.
2. **Business logic layer.** Code that implements MilMove's business logic.
3. **Data access layer.** Code that directly interacts with and manipulates the database.

The `services` package is a combination of the bottom two layers, **business logic** and **data access**. It is located within the `./pkg/services` directory.

Our "service objects," as we call them (this is MilMove-specific terminology), are the structs/functions within this package that implement our business logic. We organize them by data type, or **model**. For example, all service objects that implement the business logic for shipments will be grouped together in the same sub-package.

This design pattern was decided in our [Service Object Layer ADR](https://github.com/transcom/mymove/blob/master/docs/adr/0033-service-object-layer.md). Service objects allow for better unit testing, re-usability, and organization of code in the MilMove project. We have also developed clear patterns for [creating](#creating-service-objects) and [using](#using-service-objects) this structure.

### Key features

A well-defined service object is:

- Concerned primarily with one data object (although it may use other service objects to modify additional data objects),
- Reusable and modular,
- Not related to or affected by our API design.

Service objects should expose clear and self-explanatory public functions. Niche utilities and business logic should be in private functions within the service object's package.

## Creating Service Objects

### Where does it go?

In the `mymove` codebase, navigate to the `./pkg/services` directory. You should see a bunch of sub-directories (these are all Go packages themselves) and then singular Go files at the end. The names of these solo Go files should match that of a directory above.

```text
mymove/
├── pkg/
│   ├── services/
│   │   ├── ...
│   │   ├── mto_agent/
│   │   ├── mto_service_item/   <- a sub-package
│   │   ├── mto_shipment/
│   │   ├── ...
│   │   ├── mto_agent.go
│   │   ├── mto_service_item.go <- the interface in the services package
│   │   ├── mto_shipment.go
│   │   ├── ...
```

Note that the names here **match our database tables**, but in the singular form.

Each of these sub-packages handles the operations for one particular data model. This helps us keep track of our database interactions and allows for differently-focused teams to speak with the database and APIs using the same validation and functionality.

Now you must either find the sub-package that corresponds to the data model for your new function, or create a new one. Make sure to add the directory _and_ the top-level Go file:

```text {6,9}
mymove/
├── pkg/
│   ├── services/
│   │   ├── ...
│   │   ├── mto_shipment/
│   │   ├── reweigh/
│   │   ├── ...
│   │   ├── mto_shipment.go
│   │   ├── reweigh.go
│   │   ├── ...
```

Leave this Go file blank for the time being.

:::info
If your service involves multiple models or does not easily map to a model entity name, then it might be best to create a new folder that has a relevant name.

However, first consider whether or not the additional models are being updated as a _side-effect_ of another model's update and which model is being exposed as an input or return value. In either of those cases, you can determine which model is the true subject of your service.

Ultimately, you must use your best judgment.
:::

### Adding a new file

Once you have identified or creating the sub-package for your new service object, navigate into that folder.

We name our files for the main **action** of that particular service object. For example, the file that contains the service to update a shipment is called `mto_shipment_updater.go`. If you are modifying an existing action, open that particular file. Otherwise, you should create a new one.

If you are working from scratch, you will also need to add a service test file so that your tests will run properly. This file is boilerplate and can be copy/pasted from any other `services` sub-package.

Your new sub-package should look like this:

```text
mymove/
├── pkg/
│   ├── services/
│   │   ├── reweigh/
│   │   │   ├── reweigh_creator.go  <------ this name can be any action
│   │   │   ├── reweigh_creator_test.go
│   │   │   ├── reweigh_service_test.go  <- boilerplate
│   │   ├── ...
│   │   ├── reweigh.go
│   │   ├── ...
```

:::caution Stuttering
You might notice that there's a lot of redundancy in this naming scheme. This is commonly referred to as **"stuttering"** and is considered an anti-pattern in most languages and frameworks.

We may at some point try to move away from this convention, but it is preferrable to be consistent with our less-than-ideal naming scheme for now.
:::

### Creating the struct

Now that you have your directory and files set up, you can start to add the code within. Open up the Go file corresponding to your action.

Every service object has a base struct type, and all of its actions will be methods on that struct. This struct should be private to the sub-package.

```go title="./pkg/services/reweigh/reweigh_creator.go"
package reweigh

type reweighCreator struct {
    // does not have any defined fields yet
}
```

This struct should contain all the required fields for your new service. You may not know what these are yet, which is okay. Commonly, you'll see validator functions or other services that facilitate the business logic:

```go
type reweighUpdater struct {
	checks       []reweighValidator // validator functions
	recalculator services.PaymentRequestShipmentRecalculator // another service object
}
```

You should think of these fields as _dependencies_ for your new service object. The more you have, the more work the caller will have to do to set up this service. This can get inconvenient very quickly.

Typically, these dependencies will be interfaces, which makes it easier to mock them in tests.

### Creating the function

Once you have a struct defined, you can start working on the main function for your service. This will be a method on the previously defined struct.

We follow a similar naming convention where the function is the active form of your action verb + the name of the object.

```go title="./pkg/services/reweigh/reweigh_creator.go"
// CreateReweigh creates a new reweigh for a shipment. It is a method on the reweighCreator struct.
func (f *reweighCreator) CreateReweigh() {
    // no code yet
}
```

Once you have your bare function signature, you can start to fill in the parameters and return values.

#### Parameters

Service objects should be reusable and modular, so keep this in mind while defining your parameters. To start with, they should be the bare minimum needed for someone to call this function. Use your best judgment.

:::info
You will always need to pass in the `AppContext` as the first argument. This is standard in our codebase. Read more about [AppContext and how to use it](use-stateless-services-with-app-context).
:::

Often, the particular model type you are dealing with is passed in as input as well. This is not a hard rule, but it is a common convention. For our example, we are creating a reweigh and therefore will need information from a `models.Reweigh` type.

```go title="./pkg/services/reweigh/reweigh_creator.go"
// CreateReweigh creates a new reweigh for a shipment. It is a method on the reweighCreator struct.
func (f *reweighCreator) CreateReweigh(appCtx appcontext.AppContext, reweigh *models.Reweigh) {
    // no code yet
}
```

#### Return values

Service objects should return as many return values as appropriate, and this will always include possible errors. A common convention is to return the pointer of the subject model type and a possible error.

```go title="./pkg/services/reweigh/reweigh_creator.go"
// CreateReweigh creates a new reweigh for a shipment. It is a method on the reweighCreator struct.
func (f *reweighCreator) CreateReweigh(appCtx appcontext.AppContext, reweigh *models.Reweigh) (*models.Reweigh, error) {
    return nil, nil // so the compiler stays happy
}
```

#### Implementation

Once you have defined the signature for your function, you can start to fill out the logic of your action. **This is going to be highly context-dependent.** Keep in mind that the following guidance may not be directly useful for your particular situation.

For creating a new model record, we generally need to:

1. Find any related objects in the database. For a reweigh, we'll need to verify that the shipment exists.
2. Validate the input data against our business rules.
3. Make the change to the database.
4. Return the successfully created object.

We're going to skip Step #2 for now, since that goes into our [validator pattern](service-validation). We also might not know our business rules just yet. We will be implementing #1, 3, and 4.

**Step #1** involves a query on the database using our ORM, [Pop](https://gobuffalo.io/en/docs/db/getting-started).

```go
// Set up an empty model to receive any data found by Pop
mtoShipment := &models.MTOShipment{}
// Find the shipment using the ShipmentID provided in our reweigh input
err := appCtx.DB().Find(mtoShipment, reweigh.ShipmentID)
if err != nil {
    // Return our standard NotFoundError type if there's an error
    return nil, services.NewNotFoundError(reweigh.ShipmentID, "while looking for MTOShipment")
}
```

**Step #3** (remember: we're skipping Step #2) also leverages [Pop](https://gobuffalo.io/en/docs/db/mutations/) to create the new reweigh record on the database. First, we want to create a **transaction** so that we can rollback this operation (or any calling operations) if something goes wrong.

```go
txErr := appCtx.NewTransaction(func(txnCtx appcontext.AppContext) error {
    // Our database modification will go in here
    // We also only need to return an error because our reweigh is a pointer and will be updated by the Pop method
    return nil
})
if txErr != nil {
    return nil, txErr
}
```

Now lets fill in the creation code, making sure to use the transaction context:

```go
verrs, err := txnCtx.DB().ValidateAndCreate(reweigh)
// Check for validation errors encountered before Pop created the reweigh
if verrs != nil && verrs.HasAny() {
    // Return our standard InvalidInputError type
    return services.NewInvalidInputError(uuid.Nil, err, verrs, "Invalid input found while creating the reweigh.")
} else if err != nil {
    // If the error is something else (this is unexpected), we create a QueryError
    return services.NewQueryError("Reweigh", err, "")
}
```

For **Step #4**, we simply return our new reweigh! Putting all of the above code together, we'll get:

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

    // highlight-next-line
    return reweigh, nil
}
```

:::info
Now that the function is filled out, you'll want to refactor it by extracting each logical step into a separate, smaller, and well-named private function. We should strive to keep all functions as small as possible for readability.

[ApproveOrRejectServiceItem](https://github.com/transcom/mymove/blob/master/pkg/services/mto_service_item/mto_service_item_updater.go#L44-L123) is a good example of a function that performs a lot of actions, and each one is encapsulated in a separate function.
:::


### Creating the interface

Now we get to go back to our top-level Go file (`reweigh.go`, in this example).

Our pattern for service objects involves creating an interface type in the `services` package proper that is implemented by your new service object. One reason for this is import cycles. Another is to keep this functionality grouped together in `services` without having to put all our code in one huge pile. Finally, interfaces are the only objects in Go that can be effectively mocked, so this is advantageous for our testing.

The main thing to remember for an interface is that **it must match your function signature _exactly_**. Any deviation will break the relationship between these two types (the struct and the interface).

:::tip Interfaces vs Structs
If you are new to Go and are still a little wobbly on the concept of "interfaces" vs "structs" remember:

- **Interface** types define _functions_. They are concerned with _verbs_.
- **Struct** types define _objects_. They are concerned with _nouns_.
:::

Using the function signature we defined above, we can complete our interface right away.

```go title="./pkg/services/reweigh.go"
package services

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
)

// ReweighCreator creates a reweigh
type ReweighCreator interface {
	CreateReweigh(appCtx appcontext.AppContext, reweigh *models.Reweigh) (*models.Reweigh, error)
}
```

Once you have defined this interface, we can go back to our service object's file and add a function that returns an instance of the interface.

```go title="./pkg/services/reweigh/reweigh_creator.go"
// NewReweighCreator creates a new struct with the service dependencies and returns the interface type
func NewReweighCreator() services.ReweighCreator {
	return &reweighCreator{}
}
```

This function lets us keep our struct and dependencies private to this sub-package and helps us standardize the way folks use our service. By abstracting implementation and returning an interface, we are creating boundaries between functionality and implementation that allow our codebase to be more flexible.

### Example file

Putting together everything we did above, this is what our new service object file would look like:

```go title="./pkg/services/reweigh/reweigh_creator.go"
package reweigh

import (
	"github.com/gofrs/uuid"

	"github.com/transcom/mymove/pkg/appcontext"

	"github.com/transcom/mymove/pkg/services"

	"github.com/transcom/mymove/pkg/models"
)


type reweighCreator struct {
    // does not have any defined fields yet
}

// NewReweighCreator creates a new struct with the service dependencies and returns the interface type
func NewReweighCreator() services.ReweighCreator {
	return &reweighCreator{}
}

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

## Using Service Objects

Service objects are often used in other services, but they're most commonly used by our handler functions. Handlers are the **presentation layer** of our backend, and they correspond to API endpoints.

In either case, they will be used in much the same way. Service objects are often (although not necessarily) defined as a dependency in a struct:

```go {4}
// CreateReweighHandler is the handler for the API endpoint to create a reweigh
type CreateReweighHandler struct {
	handlers.HandlerContext
	creator services.ReweighCreator // our service object
}
```

When that struct is being instantiated, they are created using their `New<MyServiceObject>` function:

```go {4}
// Create an instance of CreateReweighHandler and assign it to our generated Swagger Go code
sampleAPI.MtoShipmentCreateReweighHandler = CreateReweighHandler{
    ctx,
    reweigh.NewReweighCreator(), // instantiating our service object
}
```

And finally, once the service object is instantiated, it will be used by calling the function defined in the interface type:

```go
// Call the service object using the creator set in our handler struct (h, defined above)
createdReweigh, err := h.creator.CreateReweigh(appCtx, newReweigh)
```

### Examples

- [CreateUpload](https://github.com/transcom/mymove/blob/master/pkg/services/upload/upload_creator.go)
- [CreateExcessWeightUpload](https://github.com/transcom/mymove/blob/master/pkg/services/move/excess_weight_uploader.go) - calls `CreateUpload`


## Testing Service Objects

Testing the service object you wrote will be a typical exercise in writing unit tests in Go. Look at examples for guidance here.

When service objects are dependencies, we want to be able to mock those out in our unit tests. To generate the mock types, add this line to your top-level Go file in the `services` package:

```go title="./pkg/services/reweigh.go" {9}
package services

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
)

// ReweighCreator creates a reweigh
//go:generate mockery --name ReweighCreator --disable-version-string
type ReweighCreator interface {
	CreateReweighCheck(appCtx appcontext.AppContext, reweigh *models.Reweigh) (*models.Reweigh, error)
}
```

This enables the the Go `mockery` tool to generate the mock type automatically. To trigger the generation, run `make mocks_generate`.

When you use the mock type, you need to know two things:

1. What you expect to receive as input.
2. What you expect to receive as output.

:::danger Pointers in Mocks
These should be defined as exactly as possible to preserve the integrity of your test. If you have to include pointer input, you must _always_ use copies of the pointer and **_never, ever use that specific pointer again_**. Otherwise, you could unknowingly change the input you expect and your test would be compromised.

**If you are unsure about the inputs/returns for a mock, you should not use a mock.**
:::

```go title="Example test mock"
reweigh := testdatagen.MakeDefaultReweigh(suite.DB())
reweighCopy := *reweigh // make sure the copy is a value, not a pointer

updater := &mocks.ReweighUpdater{}
updater.On("UpdateReweigh",
    mock.AnythingOfType("appcontext.AppContext"), // you can include as many input parameters
    mock.AnythingOfType("*models.Reweigh")        // as you need
).Return(reweighCopy, nil)
```

Note that this calls the generated mock function, _not_ the original.

:::tip More mocking
Use `MockedInterface.On()` to mock a method. Use `MockedInterface.AssertExpectations()` to validate expectations, such as parameter type and number of times the method was called.

See [testify's docs](https://godoc.org/github.com/stretchr/testify/mock#Call.On) for more information.
:::

## Resources

* [3 Layer Application Structure](https://docs.google.com/presentation/d/1kVQzrYWY0AnYyPbiqfuFv8Fh_7IwwIFv3XKRxZI44Hs/edit#slide=id.p)
* [Go by Example: Interfaces](https://gobyexample.com/interfaces)
