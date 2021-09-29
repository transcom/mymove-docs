---
title: Service Objects
---
# Guide to Service Objects

## What is a Service Object?

The MilMove backend is _loosely_ designed with this [3-layer structure](https://docs.google.com/presentation/d/1kVQzrYWY0AnYyPbiqfuFv8Fh_7IwwIFv3XKRxZI44Hs/edit#slide=id.p):

1. **Presentation layer.** Our endpoint handlers that perform type conversions and connect user requests to business logic functions.
2. **Business logic layer.** Code that implements MilMove's business logic.
3. **Data access layer.** Code that directly interacts with and manipulates the database. 

The `services` package is a combination of the bottom two layers, **business logic** and **data access**. It is located within the `./pkg/services` directory.

Our "service objects," as we call them (this is MilMove-specific terminology), are the structs/functions within this package that implement our business logic. We organize them by data type, or **model**. For example, all service objects that implement the business logic for shipments will be grouped together in the same sub-package.

This design pattern was decided in our [Service Object Layer ADR](https://github.com/transcom/mymove/blob/master/docs/adr/0033-service-object-layer.md). Service objects allow for better unit testing, re-usability, and organization of code in the MilMove project. We have also developed clear patterns for [creating](#creating-service-objects) and [using](#using-service-objects) this structure.

### When a Service Object Makes Sense

When writing or refactoring a piece of business logic to adhere to the service object pattern, it is important that this business function truly is the responsibility of a service object. Overusing this pattern and not applying it when appropriate can lead to several problems. It is necessary that developers make sure they are using the service object layer pattern when appropriate.

When to use a service object?

* [ ] dedicated encapsulation of a single piece business logic
* [ ] could possibly be re-purposed
* [ ] does this focus beyond parsing a request and rendering data
* [ ] does this singular piece of business logic use many different dependencies and/or different models

If you answered no to more than two of 

TODO: "Ideally, the service object
should expose only one public function, with helper private functions, as needed and when it makes sense. Oftentimes,
smaller private functions are good to unit test smaller units of functionality."

## Creating Service Objects

Once you have analyzed and determined that a service object is appropriate the next step is to actually create it.



### Where does it go?

In the `mymove` codebase, navigate to the `./pkg/services` directory. You should see a bunch of sub-directories (these are all Go packages themselves) and then singular Go files at the end. The names of these solo Go files should match that of a directory above.

```text
mymove/
├── pkg/
│   ├── services/
│   │   ├── ...
│   │   ├── mto_agent/
│   │   ├── mto_service_item/   <- a subpackage
│   │   ├── mto_shipment/ 
│   │   ├── ...
│   │   ├── mto_agent.go
│   │   ├── mto_service_item.go <- the interface in the services package
│   │   ├── mto_shipment.go
│   │   ├── ...
```

Note that the names here **match our database tables**, but in the singular form. 

Each of these subpackages handles the operations for one particular data model. This helps us keep track of our database interactions and allows for differently-focused teams to speak with the database and APIs using the same validation and functionality.

Now you must either find the subpackage that corresponds to the data model for your new function, or create a new one. Make sure to add the directory _and_ the top-level Go file:

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

Once you have identified or creating the subpackage for your new service object, navigate into that folder. 

We name our files for the main **action** of that particular service object. For example, the file that contains the service to update a shipment is called `mto_shipment_updater.go`. If you are modifying an existing action, open that particular file. Otherwise, you should create a new one.

If you are working from scratch, you will also need to add a service test file so that your tests will run properly. This file is boilerplate and can be copy/pasted from any other `services` subpackage.

Your new subpackage should look like this:

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

Every service object has a base struct type, and all of its actions will be methods on that struct. This struct should be private to the subpackage.

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

You will always need to pass in the `AppContext`. This is standard in our codebase.

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

We're going to skip Step #2 for now, since that goes into our [validator pattern]. We also might not know our business rules just yet. We will be implementing #1, 3, and 4.

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

    // highlight-next-line
    return reweigh, nil
}
```

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
	CreateReweighCheck(appCtx appcontext.AppContext, reweigh *models.Reweigh) (*models.Reweigh, error)
}
```

Once you have defined this interface, we can go back to our service object's file and add a function that returns an instance of the interface. 

```go title="./pkg/services/reweigh/reweigh_creator.go"
// NewReweighCreator creates a new struct with the service dependencies and returns the interface type
func NewReweighCreator() services.ReweighCreator {
	return &reweighCreator{}
}
```

This function lets us keep our struct and dependencies private to this subpackage and helps us standardize the way folks use our service. By abstracting implementation and returning an interface, we are creating boundaries between functionality and implementation that allow our codebase to be more flexible. 

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



## Naming and Defining Service Object Execution Method


1. Add the service object as a field for the Handler struct of the handler that the service object will be executed in.

```go
// shipments.go
package publicapi
// CreateGovBillOfLadingHandler creates a GBL PDF & uploads it as a document associated to a move doc, shipment and move
type CreateGovBillOfLadingHandler struct {
  handlers.HandlerContext
  formCreator services.FormCreator
}
```

1. Instantiate the service object while passing it in as a field for the Handler struct in `NewAPIHandler` function call.

```go
// publicapi/api.go
package publicapi

func NewPublicAPIHandler(context handlers.HandlerContext) http.Handler {
  ...
  publicAPI.ShipmentsCreateGovBillOfLadingHandler = CreateGovBillOfLadingHandler{
    context,
    paperworkservice.NewCreateForm(context.FileStorer().TempFileSystem(),
    paperwork.NewFormFiller(),
  )}
  ...
  return publicAPI.Serve(nil)
}
```


## Testing Service Objects

// TODO mocking

1. Make sure the mock generation tool is installed by running `make server_deps`.
1. Generate the mock for the interface you'd like to test. See the [document on generating mocks with mockery](https://github.com/transcom/mymove/wiki/generate-mocks-with-mockery)

```go
// Code generated by mockery v1.0.0. DO NOT EDIT.

package mocks

import io "io"
import mock "github.com/stretchr/testify/mock"
import paperwork "github.com/transcom/mymove/pkg/paperwork"


// FormFiller is an autogenerated mock type for the FormFiller type
type FormFiller struct {
  mock.Mock
}

// AppendPage provides a mock function with given fields: _a0, _a1, _a2
func (_m *FormFiller) AppendPage(_a0 io.ReadSeeker, _a1 map[string]paperwork.FieldPos, _a2 interface{}) error {
  ret := _m.Called(_a0, _a1, _a2)

  var r0 error
  if rf, ok := ret.Get(0).(func(io.ReadSeeker, map[string]paperwork.FieldPos, interface{}) error); ok {
    r0 = rf(_a0, _a1, _a2)
  } else {
    r0 = ret.Error(0)
  }

  return r0
}

```

1. Properly mock all methods for interface, denoting the parameter types, along with the return value.
1. Check the proper assertions

```go
// create_form_test.go
package paperwork

import (
  "github.com/pkg/errors"
  "github.com/spf13/afero"
  "github.com/stretchr/testify/assert"
  "github.com/stretchr/testify/mock"
  "github.com/stretchr/testify/suite"
  "github.com/transcom/mymove/pkg/services/paperwork/mocks"
  paperworkforms "github.com/transcom/mymove/pkg/paperwork"
  "github.com/transcom/mymove/pkg/services"
)

func (suite *CreateFormSuite) TestCreateFormServiceFormFillerAppendPageFailure() {
  FileStorer := &mocks.FileStorer{}
  FormFiller := &mocks.FormFiller{}

  gbl := suite.GenerateGBLFormValues()

  FormFiller.On("AppendPage",
    mock.AnythingOfType("*bytes.Reader"),
    mock.AnythingOfType("map[string]paperwork.FieldPos"),
    mock.AnythingOfType("models.GovBillOfLadingFormValues"),
  ).Return(errors.New("Error for FormFiller.AppendPage()")).Times(1)

  formCreator := NewFormCreator(FileStorer, FormFiller)
  template, _ := MakeFormTemplate(gbl, "some-file-name", paperworkforms.Form1203Layout, services.GBL)
  file, err := formCreator.CreateForm(template)

  suite.NotNil(suite.T(), err)
  suite.Nil(suite.T(), file)
  serviceErrMsg := errors.Cause(err)
  suite.Equal(suite.T(), "Error for FormFiller.AppendPage()", serviceErrMsg.Error(), "should be equal")
  suite.Equal(suite.T(), "Failure writing GBL data to form.: Error for FormFiller.AppendPage()", err.Error(), "should be equal")
  FormFiller.AssertExpectations(suite.T())
}
```

It is important to note that when using a mocked interface, the mock function call will be called, not the original. This helps
to minimize side affects and allows us as developers to focus on what we are truly testing.

*Use `MockedInterface.On()` to mock a method. See their [docs](https://godoc.org/github.com/stretchr/testify/mock#Call.On) for more information.*
*Use `MockedInterface.AssertExpectations` to validate expectations, such as parameter type and number of times the method was called.*

## Resources

* Pairing session on creating the storage in transit GET handler with a service layer:
  [video](https://drive.google.com/file/d/19cCDLt1hDJSbZDhHdwQ8u63lBhupTK_s/view)
  from the [folder](https://drive.google.com/drive/folders/1WMZ5FzzWMU-HzEr36QFfVRr8TRyuK8I-)
  and [pull request](https://github.com/transcom/mymove/pull/2017)
