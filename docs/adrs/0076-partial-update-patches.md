---
title: "0076 Partial Update Patches"
---

# *0076 Partial Update Patches*

**🔒 User Story:** *[MB-14102](https://dp3.atlassian.net/browse/MB-14102)*

At present, the MilMove back-end does not have developed support for partial updates or deleting fields in its models through patches. [ADR 0066](docs/adrs/0066-use-custom-nullable-types-for-patch-requests.md) introduced custom nullable types for patch requests which addresses this issue at the swagger/handler layer, but services may not be prepared to fully support the rest of this sort of workflow.

### Useful definition
> **Nullable field:** A field that contains information about whether it was included in the payload. A field with `Present=true` was included in the payload, with a `Value` that may or may not be null. A field with `Present=false` was not included in the payload, and therefore should not be updated in its corresponding model.

```
type NullableString struct {
	Present bool // Present is true if key is present in json
	Value   *string
}
```

MTOShipments are an example of a case in which the back-end is not prepared to handle partial updates or intentionally setting fields to null. At the handler (e.g. the ghcapi [UpdateMTOShipmentHandler](https://github.com/transcom/mymove/blob/de9148371427ba348e94439b4acb766f05013797/pkg/handlers/ghcapi/mto_shipment.go#L284)), the payload (which may contain nullable types) is converted to an [MTOShipment model](https://github.com/transcom/mymove/blob/de9148371427ba348e94439b4acb766f05013797/pkg/handlers/ghcapi/internal/payloads/payload_to_model.go#L309), and during this conversion any information that distinguishes between missing fields and null fields is lost.

Furthermore, the [MTOShipmentUpdater service](https://github.com/transcom/mymove/blob/de9148371427ba348e94439b4acb766f05013797/pkg/services/mto_shipment/mto_shipment_updater.go) that is called from the handler further obfuscates things. It fetches the existing MTOShipment from the database and sets fields in that struct based on which fields in the payload model are null[todo: add link]. Since at this point both omitted fields and intentionally-null fields from the payload are all represented as null, these fields simply are all not updated.


## Proposal: Introduce a new struct that serves between the handler and service layers and broadcasts intent.

In this proposal, a new service model, `MTOShipmentUpdate`, would serve communication between the handlers and the `UpdateShipment` service. 
The MTOShipmentUpdate model would represent an update to an MTOShipment. It would resemble the MTOShipment struct, but its fields could be Nullable, which means that they would contain information about whether a field should be updated by the update service.

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

Handlers would be in charge of converting payloads into the MTOShipmentUpdate model and passing it to the UpdateShipment service. The UpdateShipment service would be responsible for fetching the database model (MTOShipment) and updating it appropriately based on the `Present` fields in the MTOShipmentUpdate.

Such a design would have many advantages in addition to solving the problem of partial model updates and setting fields to null. The UpdateMTOShipment struct provides clarity by broadcasting intent: it clearly exists to update a shipment and it tells the service exactly what it wants. It also helps to further disentangle the handler layer from the database and services; since the handler now uses the MTOShipmentUpdate model, it no longer needs to know about the database structure. This design will also allow for a thorough cleanup of a lot of the handler and service logic through removal of repeated null checking and shifting business logic responsibilities cleanly to the services.

### Implementation

Due to the scope of work required, implementating this pattern would need to be done slowly.

#### Decisions to finalize
* Decide on a naming convention for intermediary update models
* Determine if all models should fall under this pattern or only update models.

#### Refactor stages
* Identify and refactor any patch endpoints that require nullable fields for deleting values.
* Fully refactor related validator methods to cleanly handle intermediary update models
* Refactor all update models to remove dependencies on the `models` package
* Relocate fully refactored update models into a separate package for better separation of code


## Considered Alternatives
* *Add a new changed values criterion for distinguishing between events when matching to event templates*
* *Refactor our details types and details components so that different data can be displayed uniquely within the same details type*
* *Do nothing*

## Decision Outcome

### Chosen Alternative: *Introduce a new struct that serves between the handler and service layers and broadcasts intent*

* `+` *The strategy for displaying details for move history rows would be much more flexible*
* `+` *Displaying move history details would more closely resemble more conventional React-like patterns*
* `+` *Refactoring the existing event templates could be broken down and addressed incrementally.*
* `-` *Refactoring the existing event templates would be a sizeable amount of work.*
* `-` *It does not solve the issue of moving events matching to multiple templates. However, it does give the flexibility to share the same template*
* `-` *Composite struct models have dependencies on current `models` package which means they cannot be separated into a new package without introducing circular dependencies*

## Pros and Cons of the Alternatives

### *Update model to store information about "presence" *
* `+` *Addresses issue of not being able to delete fields with patches*
* `+` *Little added effort when updating model with additional fields*
* `-` *Violates expectations of pop database models*
* `-` *Large amount of work involved in refactoring current models and all services that use thems*

### *Pass payload to service*
The handlers would no longer transform payloads to service models and instead pass the payload to the service
* `+` *Addresses issue of not being able to delete fields with patches*
* `+` *Cleans up handler and service logic (removes a lot of repeated null checks and shifts more responsibilities to service)*
* `-` *Further entangles handler and service (service now works with payload model)*

### *Do nothing*

* `+` *No additional work*
* `-` *Does not address issue of not being able to delete fields with patches*