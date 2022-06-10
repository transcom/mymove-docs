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
func (c *catCreator) CreateCat(appCtx appcontext.AppContext, cat *models.Cat) (*models.Cat, error) {
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
func (c *catCreator) CreateCat(appCtx appcontext.AppContext, cat *models.Cat) (*models.Cat, error) {
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