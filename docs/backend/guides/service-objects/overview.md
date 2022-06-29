---
sidebar_position: 1
---
# Overview

## What is a Service Object?

The MilMove backend is _loosely_ designed with this
[3-layer structure](https://docs.google.com/presentation/d/1kVQzrYWY0AnYyPbiqfuFv8Fh_7IwwIFv3XKRxZI44Hs/edit#slide=id.p):

1. **Presentation layer.** - Our endpoint handlers that perform type conversions and connect user requests to 
   business logic functions.
2. **Business logic layer.** - Code that implements MilMove's business logic.
3. **Data access layer.** - Code that directly interacts with and manipulates the database.

The `services` package is a combination of the bottom two layers, **business logic** and **data access**. It is 
located within the [`mymove` `./pkg/services`](https://github.com/transcom/mymove/tree/master/pkg/services) directory.

Our "service objects," as we call them (this is MilMove-specific terminology), are the structs/functions within this 
package that implement our business logic. An example of a service object would be something like `AddressUpdater` 
to update an `Address` record, or `MTOShipmentCreator` to create an `MTOShipment` record. 

### Service Object Types

We have a few different kinds of service objects:

- data type: These are the service objects that are tied to a specific model
    - For example, the `MTOShipmentUpdater` service object contains the logic to update an `MTOShipment` model 
      instance. The implementation code is in the `pkg/services/mto_shipment` service subpackage.
- orchestrators: These are service objects that help manage other service objects that are closely related.
    - For example, we have service objects to create `MTOShipments`, `MTOShipmentCreator`, and `PPMShipments`, 
      `PPMShipmentCreator`. Each has the necessary logic for creating the model it is for, but `PPMShipment` is a 
      child model of `MTOShipment` and needs an `MTOShipment` to exist before it can be created. To make it 
      easier for our handlers to create a shipment of any kind, without having to know that for PPM shipments you 
      have to first use the `MTOShipmentCreator` and then use the `PPMShipmentCreator`, we use an orchestrator 
      service object, `ShipmentCreator`, that handles the logic of calling the correct creators as needed and in the 
      proper order. This orchestrator service object implementation lives in the 
      `pkg/services/orchestrators/shipment` service subpackage.
- utility: These are service objects that help us out across the code base.
    - For example, we have a `Fetcher` service object that fetch a record form the database. The implementation 
      logic lives in the `pkg/services/fetch` service subpackage.

Service objects allow for better unit testing, re-usability, and organization of code in the MilMove project. 

## ADRs

We have two decision records related to service objects:

- [Service Object Layer ADR](https://github.com/transcom/mymove/blob/master/docs/adr/0033-service-object-layer.md) 
  is the one that began our use of service objects.
- [Use orchestrator service objects ADR](https://github.com/transcom/mymove/blob/master/docs/adr/0069-use-orchestrator-service-objects.md)
  is where we defined a new type of service object to help manage interactions between closely related service objects.

## Key features

A well-defined service object is:

- Reusable and modular
- Not related to or affected by our API design

Specific types of service objects have additional constraints:

- data type service objects should be:
  - Concerned primarily with one data object
    - They may use other service objects to perform actions on other data objects, but you should also consider if 
      it should use that other service object directly, or if it would be better to use a service object orchestrator.
- orchestrator service objects should:
  - Not repeat validation that the service objects they use will have. The main validation that should be done at 
    this level should be for things that the orchestrator needs in order to function.

Service objects should expose clear and self-explanatory public functions. Niche utilities and business logic should be 
in private functions within the service object's package.

## Detailed Docs

For ease of reading, the docs on service objects are broken down a bit based on what you're trying to do/understand.

:::caution
There are several service objects that don't fully match what is stated in these docs. That is usually because the
patterns outlined in the docs were established after many of these service objects existed, and we didn't go back and
change existing service objects to match. It has also happened from accidentally following the wrong example for
what to look at. If you are adding a new service object, follow the patterns outlined here. If you are editing a
service object and have a bit of extra time, try updating the service object you're changing to follow the patterns
here.
:::

* [Getting Started](./getting-started)

## Resources

* [3 Layer Application Structure](https://docs.google.com/presentation/d/1kVQzrYWY0AnYyPbiqfuFv8Fh_7IwwIFv3XKRxZI44Hs/edit#slide=id.p)
