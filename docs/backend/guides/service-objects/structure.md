---
sidebar_position: 3
---
# Structure

This page will primarily cover how service objects are structured and a general overview of what each file is. 
Details for actually working with the different files will be covered in the next pages.

All types of service objects should be in the
[`mymove` `./pkg/services`](https://github.com/transcom/mymove/tree/main/pkg/services) directory, but their 
structure within there will vary based on the type of service object you're working with.

Our service objects are composed of an interface that is defined in the `services` package as well as a subpackage 
that contains the implementation logic, validation logic, and tests. This pattern is useful to avoid import cycles. 
It also keeps a given service's functionality grouped together in a subpackage with `services` without having to put 
all our code in one huge pile. Finally, interfaces are the only objects in Go that can be effectively mocked, so 
this is advantageous for our testing.

:::caution Stuttering
You might notice that there's a lot of redundancy in our naming scheme. This is commonly referred to as 
**"stuttering"** and is considered an anti-pattern in most languages and frameworks.

We may at some point try to move away from this convention, but it is preferable to be consistent with our 
less-than-ideal naming scheme for now.
:::

## Data/Utility Service Objects High Level Structure

Data and utility service objects follow the same structure pattern, with just naming being different, so they'll be 
covered together at first.

In the `mymove` `./pkg/services` directory you should see several subdirectories (`Go` subpackages) and singular 
`Go` files at the end. The names of these solo `Go` files should match that of a directory above. So for our example 
of having service objects for our `Pet` model, we'd have a subpackage `pet` and a corresponding `pet.go` file.

```text {5,8}
mymove/
├── pkg/
│   ├── services/
│   │   ├── ...
│   │   ├── pet/       <- a subpackage for the set of service objects related to the `Pet` model
│   │   │   ├── ...
│   │   ├── ...
│   │   ├── pet.go     <- the interface in the services package for the `Pet` data service objects
│   │   ├── ...
```

### Data Service Objects High Level Structure

The names of the file + subpackage should match the database table name, but in singular form. E.g. `pet` service 
object for the `pet` table.

Each of these subpackages handles the operations for one particular data model. This helps us keep track of our
database interactions and allows for different parts of the codebase to interact with models while re-using the same 
validation and functionality.

### Utility Service Objects High Level Structure

The names of the file + subpackage should match the function the service object serves, e.g. `fetch`.

Each of these subpackages should focus on the functionality they're meant to serve. It helps us have logic we can 
re-use across service objects.

## Orchestrator Service Objects High Level Structure

Orchestrator service objects are similar overall to the other types of service objects, but the top level structure 
and naming are slightly different. 

We have an `orchestrators` subpackage inside `services` that holds the subpackages for each orchestrator. This helps 
us separate out the `orchestrators` from the other more "common" service objects (i.e. pre-existing service object 
types that existed before `orchestrators` were added). 

```text {5}
mymove/
├── pkg/
│   ├── services/
│   │   ├── ...
│   │   ├── orchestrators/            <- subpackage that contains each of the orchestrator subpackages
│   │   │   ├── ...
│   │   ├── ...
```

As for the corresponding interface in the `services` package, we use a standalone file with the orchestrator name 
followed by `_orchestrator` to identify it more easily as an orchestrator.

So for our example, we have a regular set of data-type service objects for our `Pet` model, but we'll also have 
orchestrators for pets that will handle calling the `Cat` service objects as needed. The pet orchestrator will look 
like this:

```text {8,9,17}
mymove/
├── pkg/
│   ├── services/
│   │   ├── ...
│   │   ├── cat/                      <- subpackage for `Cat` data service objects 
│   │   │   ├── ...
│   │   ├── ...
│   │   ├── orchestrators/            <- subpackage that contains each of the orchestrator subpackages
│   │   │   ├── pet/                  <- subpackage a set of orchestrators related to pets
│   │   │   │   ├── ...               <- implementation of orchestrator service objects
│   │   │   ├── ...
│   │   ├── pet/                      <- subpackage for `Pet` data service objects
│   │   │   ├── ...
│   │   ├── ...
│   │   ├── cat.go
│   │   ├── pet.go
│   │   ├── pet_orchestrator.go       <- the interface in the services package for a single set of orchestrators
│   │   ├── ...
```

So in our example above, we have an orchestrator service subpackage called `pet` that lives in the `orchestrators` 
subpackage. This subpackage will contain all the implementation files for the `orchestrator`. It has a corresponding 
interface file called `pet_orchestrator.go` in the `services` package.

Note that the `services/orchestrators/pet/` set of service objects is separate and different from the 
`services/pet/` service objects. The `services/pet/` service objects are for the `Pet` model data service objects, 
while the `orchestrators` service objects will be the ones that orchestrate the `Pet` and `Cat` service objects. 
This makes it easier to re-use the logic as needed, e.g. allowing both the internal and ghc APIs to interact with 
pets similarly.  

## Service Object Subpackage Structure

Below is the expected structure of a subpackage. For this diagram, we're using the `pet`, but other 
types should be similar. The only difference will be naming. 

In the sections below we'll get into naming a bit, but the difference to know is that when we say something should be 
named `<service_object_name>_whatever`, the `service_object_name` will be the full name for data and util type service
objects, e.g. `pet_whatever`, while for orchestrator type service objects, the `service_object_name` will be 
shortened a bit so instead of `pet_orchestrator_whatever`, it will be `pet_whatever`. This helps cut down a bit on 
the **stuttering**, at least with respect to the word `orchestrator`.

```text
mymove/
├── pkg/
│   ├── services/
│   │   ├── pet                             <- subpackage for a set of service objects
│   │   │   ├── pet_creator.go              <- service object, `PetCreator`, that handles creating pets
│   │   │   ├── pet_creator_test.go         <- tests for `PetCreator` service object
│   │   │   ├── pet_service_test.go         <- boilerplate testing suite setup
│   │   │   ├── pet_updater.go              <- service object, `PetUpdater`, that handles updating pets
│   │   │   ├── pet_updater_test.go         <- tests for `PetUpdater` service object
│   │   │   ├── rules.go                    <- contains functions that check data to ensure it is valid
│   │   │   ├── rules_test.go               <- tests for rules.go
│   │   │   ├── validation.go               <- boilerplate for validating data; uses functions defined in rules.go
│   │   │   ├── validation_test.go          <- tests for boilerplate
│   │   ├── ...
```

In the example above, we have a few files that should be common across service objects:

* The `rules.go`, `validation.go`, and their test files are related to data validation. We will go more in depth on 
  these files in a later section: [Service Validation](/docs/backend/guides/service-objects/validation).
* The `pet_service_test.go` file is boilerplate for setting up the testing suite for the package and should be 
  named something like `<service_object_name>_service_test.go`

### Service Object Naming

The rest of the files are implementing service objects. There should be a file that implements a service object and 
the corresponding file containing the tests. So in the example above, we have a cat creator service object defined 
in `cat_creator.go` and the corresponding tests in `cat_creator_test.go`. We name these files based on the main 
**action** that the service object will perform so in this example, it **creates** pets, so it's a **creator**. 
These names will also be reflected in the interfaces we define for the service objects.
