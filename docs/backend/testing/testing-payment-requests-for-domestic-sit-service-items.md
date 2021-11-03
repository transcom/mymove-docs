---
sidebar_position: 12
---

# Testing payment requests

Storage In Transit (SIT) pricing is composed of the following three elements:

- SIT First Day: Covers the warehouse and handing in/out costs (but not transit).
- SIT Add’l Days: After the first day, a daily rate is charged for ongoing storage.
- SIT Pickup/Delivery: The cost of picking up or delivering a shipment in/out of SIT.

There are two types of SIT -- Origin SIT and Destination SIT, depending on whether SIT is being used at the origin or destination of the move.

### Domestic SIT service items
- **DOFSIT** - Domestic origin 1st day SIT
- **DOASIT** - Domestic origin Additional day SIT
- **DOPSIT** - Domestic origin SIT pickup
- **DDFSIT** - Domestic destination 1st day SIT
- **DDASIT** - Domestic destination Additional day SIT
- **DDDSIT** - Domestic destination SIT delivery

This page will walk you through creating and pricing a move with SIT service items.

# Choosing a pricing scenario
Origin SIT pickup (DOPSIT) and Destination SIT delivery (DDDSIT) service items are priced in 3 different ways, depending on the "original" and "actual" ZIP3 (a ZIP3 is the first 3 digits of a ZIP code). See the [pricing notes doc](https://docs.google.com/document/d/1jRl91aslMnOMt2zS1tt_XT0lD1I-xvsiKOfprAaFrAs/edit#heading=h.qvz570f9mzig) for details.

The 3 scenarios are:
* ZIP3 to same ZIP3
* ZIP3 to different ZIP3 and > 50 miles
* ZIP3 to different ZIP3 and <= 50 miles

## Distance calculation
DTOD is used to calculate distances within the same ZIP3, and Rand McNally is used for other distance calculations.

## Where do I put these ZIPs?
For both types of SIT, the original ZIP comes from an address entered by the service member when creating their shipment, and the actual ZIP is set by the prime.
For Origin SIT, the original ZIP comes from the pickup address on the shipment (`mto_shipments.pickup_address_id`), and the actual address is sent in the `sitHHGActualOrigin` field when creating the DOFSIT service item.
For Destination SIT, the original ZIP comes from the destination address on the shipment (`mto_shipments.destination_address_id`), and the actual address is sent in the `sitDestinationFinalAddress` field when updating the DDDSIT service item.

## Example ZIP codes for testing
- close to Fort Gordon (useful when testing Destination SIT)
  - ZIP3 to same ZIP3
    - from: Fort Gordon, GA 30905
    - to: Augusta, GA 30909
  - ZIP3 to different ZIP3 and > 50 miles
    - from: Aberdeen Proving Ground, MD, 21005
    - to: Fort Gordon, GA 30813
  - ZIP3 to different ZIP3 and <= 50 miles
    - from: Fort Gordon, GA 30905
    - to: Fort Gordon, GA 30813
- close to Fort Irwin (useful when testing Origin SIT)
  - ZIP3 to same ZIP3
    - from: Fort Irwin, CA 92310
    - to: Baker, CA 92309
  - ZIP3 to different ZIP3 and > 50 miles
    - from: Fort Irwin, CA 92310
    - to: Henderson, NV 89002
  - ZIP3 to different ZIP3 and <= 50 miles
    - from: Beverly Hills, CA 90210
    - to: Long Beach, CA 90803

# Initial move setup from scratch

Before you can add SIT service items to a move, you have to set up a move and get it ready for the Prime.
Create an account for a new service member and create a new HHG move with a shipment. The origin duty station's GBLOC must be in the same GBLOC as the office user you look at it with (see [this Wiki page](https://github.com/transcom/mymove/wiki/How-to-view-a-move-or-payment-request-in-the-office-app-as-a-TOO-or-TIO) for more details). Take note of the move locator on the last page.

For Origin SIT, choose a pickup address with a ZIP that fits your chosen pricing scenario.

For Destination SIT, choose a delivery address with a ZIP that fits your chosen pricing scenario. If the destination duty station ZIP fits, you can opt to use that instead of entering a delivery address.


Go to the office app ([local](http://officelocal:3000), [staging](https://office.stg.move.mil/)) and find the move you just created via the move locator. Go to the orders and set any empty fields like TAC/SAC. Go ahead and approve the move and the default service items for shipment management and counseling fees.

Now let's use the pricing-acceptance script to handle some of the usual things like updating dates/weights that the prime would be doing.
```sh
rm bin/prime-api-client
make bin/prime-api-client

# local
pricing-acceptance <insert move ID> local

# staging
pricing-acceptance <insert move ID> api.stg.move.mil

```
Note that this script can create destination SIT service items (DDFSIT, DDASIT, DDDSIT), but it will not update the DDDSIT item with `sitDestinationFinalAddress`. It will also create a payment request.
Depending on what you are testing, you may want to stop the demo script with `ctrl-c` before one or both of these steps.

- If you are testing destination SIT, and **don't** intend to set a final address, you can run the script to the end.
- If you are testing destination SIT, and you **do** intend to set a final address, you can stop the script when it prompts to create a payment request
- If you do not want to create destination SIT service items, kill the script when it prompts to create a DDFSIT service item.


# Creating SIT service items
When you create the first day SIT service items, additional days and pickup/delivery service items will be created automatically.
So if you add a DOFSIT service item, you'll also get a DOASIT and a DOPSIT, and if you add a DDFSIT, you'll get a DDASIT and a DDDSIT.

When creating origin SIT service items, we can send the new pickup address in the payload for creating the DOFSIT service item.

For destination SIT, after creating the service items, you use update-mto-service-item to add the new delivery address to the DDDSIT service item.

## Create Origin SIT service items
*Skip this section if you are only testing Destination SIT*

If necessary, you can use the move locator to look up the moveTaskOrderID and the mtoShipmentID:
```sh
# local
prime-api-client --insecure fetch-mto-updates | jq --arg moveCode <insert move locator> 'map(select(.moveCode == $moveCode)) | .[0] | {moveTaskOrderID: .id, mtoShipmentID: .mtoShipments[0].id}'

# staging
prime-api-client --cac --hostname api.stg.move.mil --port 443 fetch-mto-updates | jq --arg moveCode <insert move locator> 'map(select(.moveCode == $moveCode)) | .[0] | {moveTaskOrderID: .id, mtoShipmentID: .mtoShipments[0].id}'

```

Make a payload file for creating the DOFSIT service item:

`create_dofsit_service_item.json`
```json
{
  "body": {
    "moveTaskOrderID": "bc561acb-0cae-43f7-a1a8-393067ffcc56",
    "mtoShipmentID": "22267602-d1b8-45e8-a95e-ec61bc728a13",
    "modelType": "MTOServiceItemOriginSIT",
    "reServiceCode": "DOFSIT",
    "sitPostalCode": "00000",
    "reason": "my address changed",
    "sitEntryDate": "2021-01-13",
    "sitHHGActualOrigin":  {
      "streetAddress1": "20245 4th St",
      "city": "New Braunfels",
      "state": "TX",
      "postalCode": "78130",
      "country": "United States"
    }
  }
}
```
Update `moveTaskOrderID` and `mtoShipmentID` to match your move.
Update `sitEntryDate` to something plausible.
`sitHHGActualOrigin` is used as the "actual" address for pricing, so set this according to your pricing scenario.

Note: `sitPostalCode` is not currently used (and may be removed), but for now, it must be present and must pass ZIP validations.


```sh
# local
prime-api-client --insecure create-mto-service-item --filename create_dofsit_service_item.json

# staging
prime-api-client --cac --hostname api.stg.move.mil --port 443 create-mto-service-item --filename create_dofsit_service_item.json
```
Approve the new service items from the TOO interface, and proceed to making a payment request.

## Create Destination SIT service items
*Skip this section if you are only testing Origin SIT*

Start by adding a DDFSIT (destination first day SIT) to the move. This will also cause DDASIT and DDDSIT service items to be added automatically. You'll need the moveTaskOrderID and the shipmentID. You can get these from your local database, or by using the prime API.
```sh
# local
prime-api-client --insecure fetch-mto-updates | jq --arg moveCode <insert move locator> 'map(select(.moveCode == $moveCode)) | .[0] | {moveTaskOrderID: .id, mtoShipmentID: .mtoShipments[0].id}'

# staging
prime-api-client --cac --hostname api.stg.move.mil --port 443 fetch-mto-updates | jq --arg moveCode <insert move locator> 'map(select(.moveCode == $moveCode)) | .[0] | {moveTaskOrderID: .id, mtoShipmentID: .mtoShipments[0].id}'
```

Use this JSON template to make a file named create_ddfsit_service_item.json, filling in the move ID and shipment ID (which you can either get from your local database, or by calling `fetch-mto-updates`):

```json
{
  "body": {
    "moveTaskOrderID": "<insert move ID>",
    "mtoShipmentID": "<insert shipment ID>",
    "modelType": "MTOServiceItemDestSIT",
    "reServiceCode": "DDFSIT",
    "timeMilitary1": "1705Z",
    "firstAvailableDeliveryDate1": "2021-01-31",
    "timeMilitary2": "0719Z",
    "firstAvailableDeliveryDate2": "2021-02-03",
    "sitEntryDate": "2021-01-12",
    "sitDepartureDate": "2021-01-22"
  }
}
```
Run this command to create DDFSIT, DDASIT, and DDDSIT service items, and generate a payload file for the next step:
```sh
# local
prime-api-client --insecure create-mto-service-item --filename create_ddfsit_service_item.json | jq "map(select(.reServiceCode == \"DDDSIT\"))[0] | {mtoServiceItemId: .id, ifMatch: .eTag, body: {id: .id, modelType: \"UpdateMTOServiceItemSIT\", sitDestinationFinalAddress: {streetAddress1: \"20245 4th St\", city: \"Albuquerque\", state: \"NM\", postalCode: \"87117\", country: \"United States\"}}}" > update_dddsit_service_item.json

# staging
prime-api-client --cac --hostname api.stg.move.mil --port 443 create-mto-service-item --filename create_ddfsit_service_item.json | jq "map(select(.reServiceCode == \"DDDSIT\"))[0] | {mtoServiceItemId: .id, ifMatch: .eTag, body: {id: .id, modelType: \"UpdateMTOServiceItemSIT\", sitDestinationFinalAddress: {streetAddress1: \"20245 4th St\", city: \"Albuquerque\", state: \"NM\", postalCode: \"87117\", country: \"United States\"}}}" > update_dddsit_service_item.json
```
If you've already created the SIT service items (eg with the `pricing-acceptance` script, you can use information from `fetch-mto-updates` to generate the payload instead.
```sh
# local
prime-api-client --insecure fetch-mto-updates | jq --arg moveCode <insert move locator> 'map(select(.moveCode == $moveCode)) | .[0] |  .mtoServiceItems | map(select(.reServiceCode == "DDDSIT"))[0] | {mtoServiceItemId: .id, ifMatch: .eTag, body: {id: .id, modelType: "UpdateMTOServiceItemSIT", sitDestinationFinalAddress: {streetAddress1: "20245 4th St", city: "Albuquerque", state: "NM", postalCode: "87117", country: "United States"}}}' > update_dddsit_service_item.json

# staging
prime-api-client --cac --hostname api.stg.move.mil --port 443 fetch-mto-updates | jq --arg moveCode <insert move locator> 'map(select(.moveCode == $moveCode)) | .[0] |  .mtoServiceItems | map(select(.reServiceCode == "DDDSIT"))[0] | {mtoServiceItemId: .id, ifMatch: .eTag, body: {id: .id, modelType: "UpdateMTOServiceItemSIT", sitDestinationFinalAddress: {streetAddress1: "20245 4th St", city: "Albuquerque", state: "NM", postalCode: "87117", country: "United States"}}}' > update_dddsit_service_item.json
```

You should update the `sitDestinationFinalAddress` field in the generated file, `update_dddsit_service_item.json` if you require a specific address for the scenario that you're testing.

Next, use the following command to use the generated file to update the DDDSIT service item with the new address.
```sh
# local
prime-api-client --insecure update-mto-service-item --filename update_dddsit_service_item.json

# staging
prime-api-client --cac --hostname api.stg.move.mil --port 443 update-mto-service-item --filename update_dddsit_service_item.json
```


# Creating a Payment Request
Get the MTO ID and the MTO Service Item IDs of any service items you want to include in the payment request, and put them in the body
of the request.

```json
{
  "body": {
    "isFinal": false,
    "moveTaskOrderID": "<insert MTO ID>",
    "serviceItems": [
      {
        "id": "<insert first MTO service item ID>"
      },
      {
        "id": "<insert second MTO service item ID>"
      },
      ...
    ]
  }
}
```
You can use `jq` and `fetch-mto-updates` to generate a request body that includes every service item.
```sh
# local
prime-api-client --insecure fetch-mto-updates | jq --arg moveCode <insert move code> 'map(select(.moveCode == $moveCode)) | .[0] | .id as $mto | .mtoServiceItems | map({id: .id}) | {body: {isFinal: false, moveTaskOrderID: $mto, serviceItems: .}}' > create_payment_request.json

# staging
prime-api-client --cac --hostname api.stg.move.mil --port 443 fetch-mto-updates | jq --arg moveCode <insert move code> 'map(select(.moveCode == $moveCode)) | .[0] | .id as $mto | .mtoServiceItems | map({id: .id}) | {body: {isFinal: false, moveTaskOrderID: $mto, serviceItems: .}}' > create_payment_request.json

```
And then use the request body to create a payment request:
```sh
# local
prime-api-client create-payment-request --insecure --filename create_payment_request.json

# staging
prime-api-client --cac --hostname api.stg.move.mil --port 443 create-payment-request --insecure --filename create_payment_request.json
```

# Approve payment request as TIO
Log in as a TIO user in the same GBLOC as your move.

You should be able to see the SIT service items and pricing details.

You can check the pricing calculations using the instructions from [this document](https://github.com/transcom/mymove/wiki/Acceptance-Testing-Payment-Requests).

If you want to send an invoice, approve some of the service items and the move, and then wait for the `process_edis` scheduled task to run.


# References
[SIT pricing discovery](https://docs.google.com/document/d/1jRl91aslMnOMt2zS1tt_XT0lD1I-xvsiKOfprAaFrAs/edit#)

<https://github.com/transcom/mymove/wiki/Acceptance-Testing-Payment-Requests#add-sit-related-service-items>
- Has example payload and call for dom/origin first day SIT and no explanation

<https://github.com/transcom/mymove/pull/6435>
- explains the 3 pricing scenarios for destination SIT

<https://github.com/transcom/mymove/pull/6417>
- Use prime api demo to set up some sit service items
- How to add DDASIT service item
- Create a payment request for that service item
- Screenshots for TIO view of the service item

<https://github.com/transcom/mymove/pull/6402>
- Use prime api demo to set up new move
- Create DOFSIT service item with prime api client
- Create payment request for service item
- Screenshot of TIO view

<https://github.com/transcom/mymove/pull/5823>
- More detailed move creation instructions (eg talks about GBLOC, and more detail about what to do as TOO)
- Create DOFSIT and explains how the tcreates other service items
- Talks about the 3 zip scenarios and suggests testing them all
- Links to SIT pricing notes doc: https://docs.google.com/document/d/1jRl91aslMnOMt2zS1tt_XT0lD1I-xvsiKOfprAaFrAs/edit#heading=h.od9n7nbhtjs5

<https://github.com/transcom/mymove/pull/5769>
- Talks about updating DDDSIT with an address
    - So you have to create it without an address, and then you later call update-mto-service-item with the new address
