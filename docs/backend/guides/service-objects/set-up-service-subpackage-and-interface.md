---
sidebar_position: 4
---
# Set Up Service Subpackage and Interface

Since we're going to be creating data service objects, we'll be following the guidelines in
[Structure - Data/Utility High Level Structure](/docs/backend/guides/service-objects/structure#datautility-service-objects-high-level-structure).

For the purposes of this walk-through, that means creating a subpackage in the `services` package called `cat` and a 
corresponding interface file called `cat.go`, like this:

```text {6,10}
mymove/
├── pkg/
│   ├── services/
│   │   ├── ...
│   │   ├── audit/
│   │   ├── cat/                       <- our new subpackage
│   │   ├── customer_support_remarks/
│   │   ├── ...
│   │   ├── audit.go
│   │   ├── cat.go                     <- our new interface in the services package
│   │   ├── customer.go
│   │   ├── ...
```

## Service Interface

The `services/cat.go` file will define the interface for our service objects. As noted in the 
[structure](/docs/backend/guides/service-objects/structure] page, This file will only have the interface, while the 
implementation logic will live in the subpackage. This means that the interface's functions that we define here will 
have to match the receiver functions for our service object structs we create later in the implementation files.

:::tip Interfaces vs Structs
If you are new to Go and are still a little wobbly on the concept of "interfaces" vs "structs" remember:

- **Interface** types define _functions_. They are concerned with _verbs_.
- **Struct** types define _objects_. They are concerned with _nouns_.
:::

Let's start off by defining the bare interfaces for a `CatCreator` and a `CatUpdater`:

```go title="pkg/services/cat.go"
package services

// CatCreator Interface for the service object that creates a cat
type CatCreator interface {
}

// CatUpdater Interface for the service object that updates a cat
type CatUpdater interface {
}
```

Following our naming conventions stated in
[Structure - Service Object Naming](/docs/backend/guides/service-objects/structure#service-object-naming), we'll 
define the interface functions like so:

```go title="pkg/services/cat.go"
package services

// CatCreator Interface for the service object that creates a cat
type CatCreator interface {
	CreateCat() (

// CatUpdater Interface for the service object that updates a cat
type CatUpdater interface {
	UpdateCat() ()
}
```

Now we'll need to think about what we'll need to take in as parameters and what we'll want to return. 

### Parameters

Service objects should be reusable and modular, so keep this in mind while defining your parameters. To start with,
they should be the bare minimum needed for someone to call this function. Use your best judgment.

:::info
You will always need to pass in the `AppContext` as the first argument. This is standard in our codebase. Read more
about [AppContext and how to use it](/docs/backend/guides/use-stateless-services-with-app-context).
:::

Often, the particular model type you are dealing with is passed in as input as well. For our example, we'll have a 
service object to create a cat and one to update a cat, so we'll need to take in a `models.Cat` type. For updates,
we'll also need to take in an E-tag per our 
[optimistic locking ADR](https://github.com/transcom/mymove/blob/master/docs/adr/0042-optimistic-locking.md).

So now our interfaces look like this:

```go title="pkg/services/cat.go"
package services

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
)

// CatCreator Interface for the service object that creates a cat
type CatCreator interface {
	CreateCat(appCtx appcontext.AppContext, cat models.Cat) ()
}

// CatUpdater Interface for the service object that updates a cat
type CatUpdater interface {
	UpdateCat(appCtx appcontext.AppContext, cat models.Cat, eTag string) ()
}
```

### Return values

Service objects should return as many return values as appropriate, and this will always include possible errors. A
common convention is to return the pointer of the subject model type and a possible error. So taking that into 
account, our interfaces now look like this:

```go title="pkg/services/cat.go"
package services

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
)

// CatCreator Interface for the service object that creates a cat
type CatCreator interface {
	CreateCat(appCtx appcontext.AppContext, cat models.Cat) (*models.Cat, error)
}

// CatUpdater Interface for the service object that updates a cat
type CatUpdater interface {
	UpdateCat(appCtx appcontext.AppContext, cat models.Cat, eTag string) (*models.Cat, error)
}
```

### Mocks

The final piece we need to define at the interface level is the mocks. When our service objects are dependencies 
elsewhere, we want to be able to mock them out for those tests, letting them focus on what they're testing rather 
than having to worry about what our service object does. We use 
[`mockery` to generate our mocks](/docs/tools/mockery/generate-mocks-with-mockery). To set up our service objects to 
be able to be mocked, we'll need to add tags that `go:generate` can read, like so:

```go title="pkg/services/cat.go"
package services

import (
	"github.com/transcom/mymove/pkg/appcontext"
	"github.com/transcom/mymove/pkg/models"
)

// CatCreator Interface for the service object that creates a cat
//go:generate mockery --name CatCreator --disable-version-string
type CatCreator interface {
	CreateCat(appCtx appcontext.AppContext, cat models.Cat) (*models.Cat, error)
}

// CatUpdater Interface for the service object that updates a cat
//go:generate mockery --name CatUpdater --disable-version-string
type CatUpdater interface {
	UpdateCat(appCtx appcontext.AppContext, cat models.Cat, eTag string) (*models.Cat, error)
}
```

Note that the name we pass in the `--name` argument matches the name of our interface type. That's what will get 
used by any test that wants to mock out our service.

Now you could generate the mocks using `make mocks_generate` and you should see that new mock files are created for 
the new service objects.

## Service Test File

Now we'll add the boilerplate testing suite setup mentioned in
[Service Object Subpackage Structure](./structure#service-object-subpackage-structure). We'll add a file called
`cat_service_test.go` in the `cat` subpackage like so:

```text {7}
mymove/
├── pkg/
│   ├── services/
│   │   ├── ...
│   │   ├── audit/
│   │   ├── cat/
│   │   │   ├── cat_service_test.go    <- boilerplate testing suite setup
│   │   ├── customer_support_remarks/
│   │   ├── ...
```

Here is what the file will contain:

```go
package cat

import (
	"testing"

	"github.com/stretchr/testify/suite"

	"github.com/transcom/mymove/pkg/testingsuite"
)

type CatSuite struct {
	testingsuite.PopTestSuite
}

func TestCatServiceSuite(t *testing.T) {
	ts := &CatSuite{
		PopTestSuite: testingsuite.NewPopTestSuite(testingsuite.CurrentPackage(), testingsuite.WithPerTestTransaction()),
	}

	suite.Run(t, ts)

	ts.PopTestSuite.TearDown()
}
```

This file sets up our `cat` subpackage to enable
[running tests in transactions](/docs/backend/testing/running-server-tests-inside-a-transaction).

That's it for this step, we'll add more files to the subpackage as we go along the process and fill in the interface
when we start setting up our service objects.