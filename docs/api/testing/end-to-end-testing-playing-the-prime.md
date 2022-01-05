---
sidebar_position: 2
---

# End to End Testing Playing the Prime

This page includes instructions on how to complete basic functions as the Prime when testing the application e2e (e.g. MilMob) with other user roles (Services Counselor, TOO, TIO).

## Setup

* [Install mTLS integrations certificate](https://github.com/transcom/transcom-infrasec-com/blob/master/docs/mtls-certs.md) on your local machine

* [Configure Postman for mTLS API calls](/docs/tools/postman/setup-postman-to-make-mutual-tls-api-calls)
  * Use your mTLS integrations certificate in place of the dev certs
  * Add an entry for each environment, STG and EXP
  
<img src="https://github.com/transcom/mymove/wiki/images/postman/postman-exp-stg-mtls.png" width="600" alt="sample certificate setup in postman for exp and stg"/>

* Import Prime E2E Testing collection into Postman
  * Download the [Postman Collection here](/files/postman/Prime%20E2E%20Testing.postman_collection.json)
  * Download the [Postman EXP environment config here](/files/postman/Prime%20EXP.postman_environment.json)
  * In Postman, go to File > Import > Select your downloaded files

* Hit an endpoint to test your setup
  * Select "Prime EXP" as your environment
  * Open the new Prime Testing collection
  * Send the `fetchMTOUpdates` request.
  * If you don't get a 200, check out the [Postman troubleshooting doc](/docs/tools/postman/setup-postman-to-make-mutual-tls-api-calls).


## E2E Testing Sequence for 1 HHG Move

* Customer creates move
* Services Counselor reviews
* TOO approves shipment
* **Prime Part I - Update shipment, add service items**
* TOO approves service items
* **Prime Part II - Request payment, upload proof of service docs**
* TIO handles invoicing

This page covers the bolded sections for Prime.


## Prime: Part I
A move must go through all previous steps before these actions can be taken, ending with TOO approval.

Each request in the collection should be ran in sequence. You can edit the body as you see fit. There is code in the Tests section of some of the requests that will set variables to reuse, e.g. eTag, mtoShipmentID, etc.


* Send request `fetchMTOUpdates` and search for your move code. Once you find it, copy the `moveTaskOrderID`

* Edit the collection > Variables > Paste in your value for `moveTaskOrderID`

* Send request `getMoveTaskOrder` 
	* This will grab the mtoShipmentID and eTag and store them

* Check response for `destinationAddress`. If none is present, include one in the next request.

* Send request `updateMTOShipment`
  * Include `primeEstimatedWeight`, `primeActualWeight`, `scheduledPickupDate`, `actualPickupDate`
  * If no `deliveryAddress` is present on the shipment, include an address in the following format:

```       
   "destinationAddress": {
        "streetAddress1": "148 S East St",
        "city": "Princeton",
        "state": "NC",
        "postalCode": "27569",
        "country": "US"
    }
```

* Send requests for `createMTOServiceItem`, once for each type/request listed in the collection.

* Wait for TOO approval

## Prime: Part II
Once the service items have been approved, you can create a payment request. The current setup includes two separate payment requests: One with DOSHUT service item, and one with DOFSIT service items.

* Send request `createPaymentRequest1`
  * This includes the `DOSHUT` service item and should succeed
* Send request `createUpload` to include proof of service docs

* Send request `createPaymentRequest2`
  * This includes the remaining service items created
  * This may fail and send back errors. Record these for further investigation.
* If payment request succeeds, send request `createUpload` to include proof of service docs.


