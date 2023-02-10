---
title: 0077 Permanently store Origin Duty Location GBLOC
description: |
  Decision outcome: [TBD]
---

# Permanently Store the Origin Duty Location GBLOC

**User Story:** *[MB-15032](https://dp3.atlassian.net/browse/MB-15032)* :lock:

## Problem Statement

In our current database structure, GBLOCs are stored in the `postal_code_to_gblocs` as a one-to-many value - one GBLOC can 
represent many postal codes - and MTOs associate to GBLOCs using the `origin_duty_location_to_gbloc` view.
The view queries the `postal_code_to_gblocs` table on every read to fetch the GBLOC associated with the origin postal code on the
MTO while having the benefit of behaving like a table that can be joined in other queries.

The downside of using a view to fetch the origin duty location GBLOC is that the data remains dynamic, and there is no way to 
determine what the *original* GBLOC was if the postal code to GBLOC relationship changes later. Since GBLOCs can be consolidated,
USTC needs to be able to access the historical data for moves. 

### Additional considerations behind this change:

* View tables are not transferred to data warehouse. USTC needs the duty location GBLOC data warehoused.
* The `origin_duty_location_to_gbloc` does not handle GBLOC outliers, such as USMC logic, leading to [incorrect data](https://dp3.atlassian.net/browse/MB-15143) :lock:.

## Decision Drivers

* Complexity and impact of refactor
  * What potential does the solution have to introduce breaking changes?
  * Do we have enough capacity handle the unknowns or deal with future issues this decision may cause?
  * How disruptive will this work be on other teams?
* Flexibility
  * Will this solution support required future changes?
  * Will it be easy and intuitive to handle GBLOC consolidations and additions?
* Consistency
  * Does this change follow best practices?
  * Does it introduce any anti-patterns?


## Considered Alternatives

> **bold denotes chosen**

* *Do nothing*
* *Add a column to the orders table*
* *Store the Origin Duty Location GBLOC in a join table*

## Decision Outcome

<!-- * Chosen Alternative:  -->
* Chosen Alternative: *TBD*
* Positive Outcomes: 
  * Eliminate relying on a view for frequently accessed data
  * Maintain historical data on origin duty location GBLOCs
* Consequences: 
  * Event triggers will need to be added/maintained for history and audit logging purposes
  * Will require coordination with team managing the warehouse integration
* Other considerations:
  * :musical_note: How do you solve a problem like USMC? :musical_note:
  * Data backfill will need to be addressed

## Pros and Cons of the Alternatives

### *Do nothing*
Continue using the views as we currently are, and address existing bugs and edge cases as needed.

* `+` *There's no work to be done so teams can focus on other work.*
* `-` *GBLOC data remains dynamic and no historical data is warehoused*

### *Add a column to the orders table*
Reintroduce the `gbloc` column to the `orders` table. This column was included when the table was originally created,
but later dropped in favor of using the view to fetch the origin duty location GBLOC.

* `+` *Single column to add*
* `+` *Reduces the number of joins when querying for move task orders.*
* `+` *Eliminates the need for the `origin_duty_location_to_gbloc` view and associated models, potential positive performance impact.*
* `-` *Likely introduces breaking changes to warehouse integration.*
  * `-` Would require coordination with team responsible for data warehouse integration.

### *Store the Origin Duty Location GBLOC in a join table*

* `+` *Easily duplicate the expected data output of the existing `origin_duty_location_to_gbloc` view.*
  * `+` Lower impact on existing API
  * `+` Faster implementation
* `+` *Would not introduce breaking changes to data warehouse integration*
  * `-` Would still eventually need to be added to the data warehouse integration.
* `-` *A new table adds to DB maintenence load*
* `-` *Pattern of duplicating expected data output is outside of relational DB design best practices*
  * Note that the current GBLOC db design does not lend itself to a pefect solution in this requirement.
