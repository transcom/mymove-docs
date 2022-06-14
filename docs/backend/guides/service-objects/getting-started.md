---
sidebar_position: 2
---
# Getting Started

These docs will go through the process of creating a new set of service objects, but the info in each section should 
be applicable whether you're creating a new service object or editing an existing one. 

The docs will be using fictional models and associated service objects to make it less likely that there will be
drift between what you see here and what is in the `mymove` codebase (since none of the code here will actually be
in the codebase).

## Fictional Models

For reference, here are the fictional models we'll be working with. They come from our 
[docs on db migrations](/docs/backend/setup/database-migrations) so if you'd like to follow along, you can get the 
corresponding migrations from those docs.

```go title="pkg/models/pet.go"
package models

import (
    "time"

    "github.com/gofrs/uuid"

    "github.com/transcom/mymove/pkg/unit"
)

type PetType string

const (
    // PetTypeCat captures the enum value "CAT"
    PetTypeCat PetType = "CAT"
    // PetTypeDog captures the enum value "DOG"
    PetTypeDog PetType = "DOG"
    // PetTypeFish captures the enum value "FISH"
    PetTypeFish PetType = "FISH"
    // PetTypeGuineaPig captures the enum value "GUINEA_PIG"
    PetTypeGuineaPig PetType = "GUINEA_PIG"
    // PetTypeHamster captures the enum value "HAMSTER"
    PetTypeHamster PetType = "HAMSTER"
    // PetTypeOther captures the enum value "OTHER"
    PetTypeOther PetType = "OTHER"
    // PetTypeRat captures the enum value "RAT"
    PetTypeRat PetType = "RAT"
    // PetTypeSnake captures the enum value "SNAKE"
    PetTypeSnake PetType = "SNAKE"
    // PetTypeTurtle captures the enum value "TURTLE"
    PetTypeTurtle PetType = "TURTLE"
)

// Pet contains all the information relevant to a pet...
type Pet struct {
    ID        uuid.UUID   `json:"id" db:"id"`
    CreatedAt time.Time   `json:"created_at" db:"created_at"`
    UpdatedAt time.Time   `json:"updated_at" db:"updated_at"`
    Type      PetType     `json:"type" db:"type"`
    Name      string      `json:"name" db:"name"`
    Birthday  *time.Time  `json:"birthday" db:"birthday"`
    GotchaDay *time.Time  `json:"gotcha_day" db:"gotcha_day"`
    Bio       *string     `json:"bio" db:"bio"`
    Weight    *unit.Pound `json:"weight" db:"weight"`
}

// Pets is a list of Pets
type Pets []Pet
```

and 

```go title="pkg/models/cat.go"
package models

import (
	"time"

	"github.com/gofrs/uuid"
)

// Cat contains all the information relevant to a cat...
type Cat struct {
	ID                       uuid.UUID `json:"id" db:"id"`
	PetID                    uuid.UUID `json:"pet_id" db:"pet_id"`
	Pet                      Pet       `belongs_to:"pets" fk_id:"pet_id"`
	CreatedAt                time.Time `json:"created_at" db:"created_at"`
	UpdatedAt                time.Time `json:"updated_at" db:"updated_at"`
	LikesCatnip              *bool     `json:"likes_catnip" db:"likes_catnip"`
	FavoriteCatnipBrand      *string   `json:"favorite_catnip_brand" db:"favorite_catnip_brand"`
	FavoriteCatScratcherType *string   `json:"favorite_cat_scratcher_type" db:"favorite_cat_scratcher_type"`
}

// Cats is a list of Cats
type Cats []Cat
```

## Creating Service Objects

Now that we have our model, we can start creating our new service objects.

We'll be creating a service object to create pets, and one to update pets. Once we start thinking about our `Cat` 
model though, we'll find the need to introduce a set of orchestrator service objects. This is because when we create 
a `Cat`, we'll want a corresponding `Pet` to be created first and when we update a `Cat`, there may be changes to 
the `Pet` too. The orchestrators will serve to make sure things are called when needed and in the right order.

We'll go through the following:

1. [Learn about service object file structure](./structure)
1. [Set up service subpackage and interface](./set-up-service-subpackage-and-interface)
1. [Set up validation pattern](./validation)
1. [Implement the service objects](./implementation) 
