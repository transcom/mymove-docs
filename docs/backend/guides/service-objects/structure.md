---
sidebar_position: 2
---
# Structure

This page will primarily cover how service objects are structured and a general overview of what each file is. 
Details for actually working with the different files will be covered in the detailed guides on working with service 
objects.

All types of service objects should be in the
[`mymove` `./pkg/services`](https://github.com/transcom/mymove/tree/master/pkg/services) directory, but their 
structure within there will vary based on the type of service object you're working with.

Our service objects are composed of an interface that is defined in the `services` package as well as a subpackage 
that contains the implementation logic, validation logic, and tests.

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
`Go` files at the end. The names of these solo `Go` files should match that of a directory above.

```text {7,11}
mymove/
├── pkg/
│   ├── services/
│   │   ├── ...
│   │   ├── mto_agent/
│   │   ├── mto_service_item/
│   │   ├── mto_shipment/       <- a subpackage
│   │   ├── ...
│   │   ├── mto_agent.go
│   │   ├── mto_service_item.go
│   │   ├── mto_shipment.go     <- the interface in the services package
│   │   ├── ...
```

### Data Service Objects High Level Structure

The names of the file + subpackage should match the database table name, but in singular form. E.g. `mto_shipment` 
service object for the `mto_shipments` table.

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
us separate out the `orchestrators` from the other more "regular" service objects (i.e. pre-existing service object 
types that existed before `orchestrators` were added). 

As for the corresponding interface in the `services` package, we use a standalone file with the orchestrator name 
followed by `_orchestrator` to identify it more easily as an orchestrator.

```text {6,7,11}
mymove/
├── pkg/
│   ├── services/
│   │   ├── ...
│   │   ├── office_user/
│   │   ├── orchestrators/            <- all orchestrators subpackage
│   │   │   ├── shipment              <- subpackage for a single orchestrator
│   │   ├── order/
│   │   ├── ...
│   │   ├── reweight.go
│   │   ├── shipment_orchestrator.go  <- the interface in the services package for a single orchestrator
│   │   ├── sit_extension.go
│   │   ├── ...
```

So in our example above, we have an orchestrator service object called `shipment` that lives in the `orchestrators` 
subpackage. It has a corresponding interface file called `shipment_orchestrator` in the `services` package.

Each of the orchestrator subpackages should contain the logic for orchestrating (a.k.a. composing) service objects, 
e.g. the `shipment` service object contains the logic for calling the `mto_shipment` and `ppm_shipment` service 
objects as needed because they are very closely related. This makes it easier to re-use the logic as needed, e.g. 
allowing both the internal and ghc APIs to interact with shipments similarly.  

## Service Object Subpackage Structure

Below is the expected structure of a subpackage. For this diagram, we're using the `shipment` orchestrator, but other 
types should be similar. The only difference will be naming. 

In the sections below we'll get into naming a bit, but the difference to know is that when we say something should be 
named `<service_object_name>_whatever`, the `service_object_name` will be the full name for data and util type service
objects, e.g. `mto_shipment_whatever`, while for orchestrator type service objects, the `service_object_name` will 
be shortened a bit so instead of `shipment_orchestrator_whatever`, it will be `shipment_whatever`. This helps cut 
down a bit on the **stuttering**, at least with respect to the word `orchestrator`.

```text
mymove/
├── pkg/
│   ├── services/
│   │   ├── orchestrators/
│   │   │   ├── shipment                        <- subpackage for a service object
│   │   │   │   ├── rules.go                    <- contains functions that check data to ensure it is valid
│   │   │   │   ├── rules_test.go               <- tests for rules.go
│   │   │   │   ├── shipment_creator.go         <- service object, `ShipmentCreator`, that handles creating shipments
│   │   │   │   ├── shipment_creator_test.go    <- tests for `ShipmentCreator` service object
│   │   │   │   ├── shipment_service_test.go    <- boilerplate testing suite setup
│   │   │   │   ├── shipment_updater.go         <- service object, `ShipmentUpdater`, that handles updating shipments
│   │   │   │   ├── shipment_updater_test.go    <- tests for `ShipmentUpdater` service object
│   │   │   │   ├── validation.go               <- boilerplate for validating data; uses functions defined in rules.go
│   │   │   │   ├── validation_test.go          <- tests for boilerplate
│   │   ├── ...
```

In the example above, we have a few files that should be common across service objects:

* The `rules.go`, `validation.go`, and their test files are related to data validation. For more info on these files 
  and how they tie into the service objects, you can read [Service Validation](/docs/backend/guides/service-objects/validation).
* The `shipment_service_test.go` file is boilerplate for setting up the testing suite for the package and should be 
  named something like `<service_object_name>_service_test.go`

The rest of the files are implementing service objects. There should be a file that implements a service object and 
the corresponding file containing the tests. So in the example above, we have a shipment creator service object 
defined in `shipment_creator.go` and the corresponding tests in `shipment_creator_test.go`. We name these files 
based on the main **action** that the service object will perform so in this example, it **creates** shipments, so 
it's a **creator**.
