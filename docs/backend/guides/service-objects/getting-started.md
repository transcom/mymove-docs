---
sidebar_position: 3
---
# Getting Started

These docs will go through the process of creating a new set of service objects, but the info in each section should 
be applicable whether you're creating a new service object or editing an existing one. We'll be focusing on creating 
a data-type service object, but the information should be applicable to other types of service objects. We'll also 
be using a fictional model and set of service objects to make it less likely that there will be drift between what 
you see here and what is in the `mymove` codebase (since none of the code here will actually be in the codebase).

## Fictional Model

For reference, here is the fictional model we'll be creating service objects for (from our 
[docs on db migrations](/docs/backend/setup/database-migrations)):

```go
package models

import (
	"time"

	"github.com/gofrs/uuid"

	"github.com/transcom/mymove/pkg/unit"
)

// Cat contains all the information relevant to a cat...
type Cat struct {
	ID        uuid.UUID   `json:"id" db:"id"`
	CreatedAt time.Time   `json:"created_at" db:"created_at"`
	UpdatedAt time.Time   `json:"updated_at" db:"updated_at"`
	Name      string      `json:"name" db:"name"`
	Birthday  *time.Time  `json:"birthday" db:"birthday"`
	GotchaDay *time.Time  `json:"gotcha_day" db:"gotcha_day"`
	Bio       *string     `json:"bio" db:"bio"`
	Weight    *unit.Pound `json:"weight" db:"weight"`
}

// Cats is a list of Cats
type Cats []Cat
```

## Creating Service Objects

Now that we have our model, we can start creating our new service objects. We'll be creating a service object to 
create cats, and one to update cats. We'll go through the following steps:

1. [Set up service subpackage and interface](./set-up-service-subpackage-and-interface)
2. [Set up validation pattern](./validation)
3. [Implement the service objects](./implementation) 
