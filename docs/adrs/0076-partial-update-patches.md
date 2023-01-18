---
title: "0076 Partial Update Patches"
---

# *0076 Partial Update Patches*

**🔒 User Story:** *[MB-14102](https://dp3.atlassian.net/browse/MB-14102)*

At present, the MilMove back-end does not have developed support for partial updates or deleting fields in its models through patches. [ADR 0066](docs/adrs/0066-use-custom-nullable-types-for-patch-requests.md) introduced custom nullable types for patch requests which addresses this issue at the swagger/handler layer, but services may not be prepared to fully support the rest of this sort of workflow.
Some handlers follow a narrow updates pattern, in which one or more models can be updated in a very specific way. A good example of this is the ghc api [move_task_order.go handler](https://github.com/transcom/mymove/blob/main/pkg/handlers/ghcapi/move_task_order.go) -- it has separate functions for different kinds of specific updates, like UpdateMoveTaskOrderStatusHandlerFunc and UpdateMTOStatusServiceCounselingCompletedHandlerFunc, which update the move model and other models in predictable ways. 
For generic updates in which models can be updated in more spontaneous ways, dealing with scenarios in which a given field may be set to null becomes a lot trickier.

## Goal
The intent of this ADR is to select a pattern that can be used in MilMove to enable handlers and services to delete fields in database models and perform other generic updates more easily.
One example of a real bug related to this involves the MTOShipment model and Move History. When a services counselor tries to update a shipment for the first time and doesn't change the `counselor_remarks` field, the field is always automatically set to an empty string from its initial value, `nil`, since the service that updates this model has no way of knowing whether this value was intended to be updated by the payload. This can result in empty entries in the Move history table. Furthermore, the handlers concerned with the MTOShipment model have no way to properly delete fields in the MTOShipment with simple patches, which limits what users can do to update shipments.

### Useful definition
> **Nullable field:** A field that contains information about whether it was included in the payload. A field with `Present=true` was included in the payload, with a `Value` that may or may not be null. A field with `Present=false` was not included in the payload, and therefore should not be updated in its corresponding model.

```
type NullableString struct {
	Present bool // Present is true if key is present in json
	Value   *string
}
```

MTOShipments are an example of a case in which the back-end is not prepared to handle partial updates or intentionally setting fields to null. At the handler (e.g. the ghcapi [UpdateMTOShipmentHandler](https://github.com/transcom/mymove/blob/de9148371427ba348e94439b4acb766f05013797/pkg/handlers/ghcapi/mto_shipment.go#L284)), the payload (which may contain nullable types) is converted to an [MTOShipment model](https://github.com/transcom/mymove/blob/de9148371427ba348e94439b4acb766f05013797/pkg/handlers/ghcapi/internal/payloads/payload_to_model.go#L309), and during this conversion any information that distinguishes between missing fields and null fields is lost.

Furthermore, the [MTOShipmentUpdater service](https://github.com/transcom/mymove/blob/de9148371427ba348e94439b4acb766f05013797/pkg/services/mto_shipment/mto_shipment_updater.go) that is called from the handler further obfuscates things. It fetches the existing MTOShipment from the database and [sets fields in that struct](https://github.com/transcom/mymove/blob/de9148371427ba348e94439b4acb766f05013797/pkg/services/mto_shipment/mto_shipment_updater.go#L103) based on which fields in the payload model are null. Since at this point both omitted fields and intentionally-null fields from the payload are all represented as null, these fields simply are all not updated.


## Proposal 1: **Intermediate Structs** -- introduce a new struct that serves between the handler and service layers and broadcasts intent.
> **proof-of-concept PR:** [MB-14102-Shipment_update_poc](https://github.com/transcom/mymove/pull/9503)

In this proposal, a new service struct, `MTOShipmentUpdate`, would serve communication between the handlers and the `UpdateShipment` service. 
The MTOShipmentUpdate struct would represent an update to an MTOShipment. It would resemble the MTOShipment struct, but its fields could be Nullable, which means that they would contain information about whether a field should be updated by the update service.

```
type Nullable[T any] struct {
	Present bool
	Value   T
}
```

```
type MTOShipmentUpdate struct {
	ID                               uuid.UUID
	MoveTaskOrder                    Move
	MoveTaskOrderID                  uuid.UUID
	ScheduledPickupDate              *time.Time
	RequestedPickupDate              *time.Time
	RequestedDeliveryDate            *time.Time
	ApprovedDate                     *time.Time
	FirstAvailableDeliveryDate       *time.Time
	ActualPickupDate                 *time.Time
	RequiredDeliveryDate             *time.Time
	ScheduledDeliveryDate            *time.Time
	ActualDeliveryDate               *time.Time
	CustomerRemarks                  *string
	CounselorRemarks                 Nullable[*string]
	PickupAddress                    *Address
	PickupAddressID                  *uuid.UUID
	DestinationAddress               *Address
	DestinationAddressID             *uuid.UUID
	DestinationType                  *DestinationType
	MTOAgents                        MTOAgents
	MTOServiceItems                  MTOServiceItems
	SecondaryPickupAddress           *Address
	SecondaryPickupAddressID         *uuid.UUID
	SecondaryDeliveryAddress         *Address
	SecondaryDeliveryAddressID       *uuid.UUID
	SITDaysAllowance                 *int
	SITExtensions                    SITExtensions
	PrimeEstimatedWeight             *unit.Pound
	PrimeEstimatedWeightRecordedDate *time.Time
	PrimeActualWeight                *unit.Pound
	BillableWeightCap                *unit.Pound
	BillableWeightJustification      *string
	NTSRecordedWeight                *unit.Pound
	ShipmentType                     MTOShipmentType
	Status                           MTOShipmentStatus
	Diversion                        bool
	RejectionReason                  *string
	Distance                         *unit.Miles
	Reweigh                          *Reweigh
	UsesExternalVendor               bool
	StorageFacility                  *StorageFacility
	StorageFacilityID                *uuid.UUID
	ServiceOrderNumber               *string
	TACType                          *LOAType
	SACType                          *LOAType
	PPMShipment                      *PPMShipment
	CreatedAt                        time.Time
	UpdatedAt                        time.Time
	DeletedAt                        *time.Time
}
```

Handlers would be in charge of converting payloads into the MTOShipmentUpdate struct and passing it to the UpdateShipment service. The UpdateShipment service would be responsible for fetching the database model (MTOShipment) and updating it appropriately based on the `Present` fields in the MTOShipmentUpdate.

Such a design would have many advantages in addition to solving the problem of partial model updates and setting fields to null. The UpdateMTOShipment struct provides clarity by broadcasting intent: it clearly exists to update a shipment and it tells the service exactly what it wants. It also helps to further disentangle the handler layer from the database and services; since the handler now uses the MTOShipmentUpdate struct, it no longer needs to know about the database structure. This design will also allow for a thorough cleanup of a lot of the handler and service logic through removal of repeated null checking and shifting business logic responsibilities cleanly to the services.

The intention of implementing this proposal is to introduce an option for our endpoints in cases where it would be beneficial. While it likely isn't necessary or worth it to refactor all endpoints to use intermediate structs, the door would be opened to using them where it would be beneficial for existing or future models that may need partial updates, or models that simply need to be able to set fields to null. The [proof-of-concept PR](https://github.com/transcom/mymove/pull/9503) created to accompany this ADR that introduces this pattern for the MTOShipment model only updates one field to be "nullable", the `counselor_remarks` field. This proof-of-concept PR not only introduces this pattern to MilMove, but serves as an incremental step towards making partial updates fully possible for just the MTOShipment model.

### Requirements and Naming
Not every database model requires an "update" struct unless it meets the following criteria:
1. It must be updated in unspecific ways (partial updates)
2. It requires possible field deletion
If a model simply meets the first criterion, it wouldn't necessitate creating a corresponding update struct, but the pattern would be available and it would potentially be a good practice in case the second criterion is ever met in the future. 
In the case that an update struct is to be created, it can simply be named after its model with "Update" appended to the end of its name (e.g. MTOShipment -> MTOShipmentUpdate).

### Implementation
Due to the scope of work required, implementating this pattern would need to be done slowly.

#### Refactor stages
* Identify and refactor any patch endpoints that require nullable fields for deleting values.
* Fully refactor related validator methods to cleanly handle update structs
* Refactor all update structs to remove dependencies on the `models` package
* Relocate fully refactored update structs into a separate package for better separation of code

## Proposal 2: **Handler Transformation** -- move any logic for converting the payload to a model from the service to the handler.
> **proof-of-concept PR:** [MB-1402-Shipment_update_poc_handler_logic](https://github.com/transcom/mymove/pull/9858)

In this proposal, all logic related to converting the payload to a model will be moved to the handler. Since nullable fields can be imlpemented in the swagger definitions, the handler will have information about which fields were present in the payload, and therefore it will know which fields to "update" in the existing model.
This pattern would solve the issue of not being able to delete fields since the model structs are updated with payload presence information in the handler. However, this would further tie the handlers to the database models and ensure that handlers are still responsible for service-adjacent tasks, like fetching database models (which, to some extent, they do already).

### Implementation 
The implementation of this pattern might vary from handler to handler, but the handlers and service that update the MTOShipment model may serve as a good example.

The flow updating a shipment via the ghc-api is sort of confusing. The [UpdateMTOShipmentHandler](https://github.com/transcom/mymove/blob/de9148371427ba348e94439b4acb766f05013797/pkg/handlers/ghcapi/mto_shipment.go#L284) fetches the existing model from the database, creates a new model from the payload, updates _some_ of the fields in the payload model with fields from the existing model, and passes the payload model to the service. Subsequently, the [MTOShipmentUpdater service](https://github.com/transcom/mymove/blob/de9148371427ba348e94439b4acb766f05013797/pkg/services/mto_shipment/mto_shipment_updater.go) fetches the database model again, updates fields in that model based on fields that are not nil in the payload model, and saves the database model (and does other service things, e.g. validation). In this case, both the handler and the service are in some ways responsible for updating a model with information from the payload and the database model.
With the implementation of this proposal, the handler still fetches the existing model from the database, and it has the option to [update only the fields in that model that are present in the payload](https://github.com/transcom/mymove/blob/762eae697d87f16a7fecd734dc3ec8a832d73e8b/pkg/handlers/ghcapi/internal/payloads/payload_to_model.go#L346). It can then pass this updated model to the service, which will [no longer fetch the existing database model and check to update each of its fields](https://github.com/transcom/mymove/pull/9858/files#diff-61462ff1f1c3c378fa84dac247390a2b0b2cd35d5de3c2ea7a54d3a858f50572); instead the service will simply save the model, in addition to its other service responsibilities.

## Considered Options
* **Intermediate Structs** -- introduce a new struct that serves between the handler and service layers and broadcasts intent
* **Handler Transformation** -- move any logic for converting the payload to a model from the service to the handler
* *Update model to store information about "presence"*
* *Pass payload to service*
* *Do nothing*

## Decision Outcome
### Chosen Option: **Handler Transformation** -- move any logic for converting the payload to a model from the service to the handler
* `+` *Addresses issue of not being able to delete fields with patches*
* `+` *Relatively simple to implement in existing handlers*
* `+` *Doesn't overcomplicate service validators*
* `-` *Handlers responsible for a lot of logic, including fetching db model and updating that fetched struct with payload intelligently*
* `-` *Handlers and endpoints still coupled to database models*

## Pros and Cons of the Alternatives
### **Intermediate Structs** -- introduce a new struct that serves between the handler and service layers and broadcasts intent.
* `+` *Addresses issue of not being able to delete fields with patches*
* `+` *Clearly broadcasts intent to handlers and services.*
* `+` *Takes a step towards decoupling handlers and api endpoints from the database and its models.*
* `-` *Composite struct models have dependencies on current `models` package which means they cannot be separated into a new package without introducing circular dependencies*
* `-` *Complicates service validators, which must now handle new intermediate struct*
* `-` *Lots of work to implement*

### *Update model to store information about "presence"*
* `+` *Addresses issue of not being able to delete fields with patches*
* `+` *Little added effort when updating model with additional fields*
* `-` *Violates expectations of pop database models*
* `-` *Large amount of work involved in refactoring current models and all services that use them*

### *Pass payload to service*
The handlers would no longer transform payloads to service models and instead pass the payload to the service
* `+` *Addresses issue of not being able to delete fields with patches*
* `+` *Cleans up handler and service logic (removes a lot of repeated null checks and shifts more responsibilities to service)*
* `-` *Further entangles handler and service (service now works with payload model)*

### *Do nothing*
* `+` *No additional work*
* `-` *Does not address issue of not being able to delete fields with patches*