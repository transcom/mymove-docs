---
sidebar_position: 3
---

# Acceptance testing payment requests

Link to a video walk-through example of acceptance testing a payment request. [Video in Google Drive](https://drive.google.com/file/d/1yDQAgRxGRGwkiwhUKgaor5C0vMtm6Ek4/view)

## Pricing Acceptance Tool

In lieu of the following instructions, you can use the `pricing-acceptance`
script to kick off the acceptance process for pricing stories.

:::note
This script creates a brand new shipment. To use, first find an approved move
and use its moveCode or moveID when calling the script.
:::

### Usage

`pricing-acceptance <moveCodeOrID>`

`pricing-acceptance <moveCodeOrID> api.stg.move.mil`

`pricing-acceptance <moveCodeOrID> api.stg.move.mil proof_of_service_docs.pdf`

After calling the tool, you will be prompted to include a path to a payload for the service item you wish to price.

```json {3,4} title="Example output:"
{
  "body": {
    "moveTaskOrderID": "9c7b255c-2981-4bf8-839f-61c7458e2b4d",
    "mtoShipmentID": "0d3a0a52-a9fc-4a7e-bbf4-80f762da44d8",
    "modelType": "MTOServiceItemShuttle",
    "reServiceCode": "DOSHUT",
    "estimatedWeight": 1400,
    "actualWeight": 1400,
    "reason": "Explanation of why a shuttle service is required",
    "description": "Description of shuttling"
  }
}
```

The CLI will output the `moveCodeOrID` and `mtoShipmentID` that should be use in the payload

The CLI will create a payment request for the service item provided. You will be prompted to login as a TIO and approve the payment request. Once approved, you can resume the CLI which will then generate an EDI.

## Creating a new MTO with shipments

Currently there is a temporary converter that will convert PPMs to HHGs for use in testing on staging. It is not enabled in production. The converter code is in `pkg/services/converthelper/convert.go`. This allows us to create a new MTO and it will automatically create two shipments, a line haul and a short haul.

### 1. Create a new PPM

I'm not sure if you need to create a new service member each time but I think PPMs are limited to one per SM.

* Go to http://milmovelocal:3000/
* `Create a new milmove user` and Sign in the local sign in feature
* Create a new PPM move request
  * Use the [fake names spreadsheet](https://docs.google.com/spreadsheets/d/1u1NO_ZWvKJc2ylOSF5-4mcm6Eg5X2zu7c_P-X4lDrE4/edit#gid=524168919) for names and addresses
  * Go through the whole thing and sign the form to submit the move
* Submit the move

![Successfully Submitted Screenshot](https://user-images.githubusercontent.com/940173/86168467-16b14600-bacd-11ea-9e31-041f2926d41a.png)

:::note
For staging the only difference is to visit https://my.stg.move.mil/ and click `Sign in` and then `Create a new account` instead of local sign in.
:::

### 2. Approve HHG shipments and send to prime

:::note
*For staging after creating a PPM move it is automatically converted to an HHG
because staging has `FEATURE_FLAG_CONVERT_PPMS_TO_GHC` on. But to see these HHG
moves you have to log into the https://office.stg.move.mil/ with a user that has
the `TOO` role. You can give yourself the `TOO` role in the
https://admin.stg.move.mil/ app.*
:::

* Sign into http://officelocal:3000/ as `too_role@office.mil (PPM office)` via the local sign in feature
* See that the move is listed in the queue
* Click `Customer Details Page Skeleton` link
* See that an HHG_LONGHAUL_DOMESTIC and HHG_SHORTHAUL_DOMESTIC shipments are added
* Approve each and see that the appropriate service items are added for each. ([See this spreadsheet](https://docs.google.com/spreadsheets/d/1zeS5J2LVd_cyB2TW2rQPu1hHqKSXT-UY7RpUzfvTi0k/edit#gid=0) to confirm what those service items should be)
* Click `Send to Prime` at the bottom of the page to make it available to the prime.

At this point you should be able to move on to setting up a payment request.

:::note
*The MTO Shipments that are created will have `PrimeEstimatedWeight` set to
`4096` for each shipment. This is done because of the restrictions on when the
prime can set estimated weight making it extra difficult to setup examples in
staging.*
:::

## Adding Service Items to a Shipment

Use the appropriate payload and create file to add service items to the shipment. Some examples are below, or [see reDoc createMTOServiceItem](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/transcom/mymove/master/swagger/prime.yaml#operation/createMTOServiceItem) for more help.

```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 create-mto-service-item --filename create_payload.json | jq
```


### Adding Crating

```json {3-4,19-20}
{
    "body" : {
        "moveTaskOrderID": "<enter UUID>",
        "mtoShipmentID": "<enter UUID>",
        "modelType": "MTOServiceItemDomesticCrating",
        "reServiceCode": "DCRT",
        "item": {
            "type": "ITEM",
            "length": 1000,
            "width": 1000,
            "height": 1000
        },
        "crate": {
            "type": "CRATE",
            "length": 1100,
            "width": 1100,
            "height": 1100
        },
        "description": "<enter drescription>",
        "reason": "<enter reason>"
    }
}
```

### Add Shuttling

```json {4-5,8-9}
{
    "body" : {
        "modelType": "MTOServiceItemShuttle",
        "moveTaskOrderID": "<YOUR MOVE ID>",
        "mtoShipmentID": "<YOUR SHIPMENT ID>",
        "status": "SUBMITTED",
        "reServiceCode": "DOSHUT",
        "description": "description",
        "reason": "reason",
        "estimatedWeight": 4200
    }
}
```

## Creating a Payment request

It may be helpful to check out the API docs, see [Milmove Prime API Documentation](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/transcom/mymove/master/swagger/prime.yaml) and [Milmove Support API Documentation](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/transcom/mymove/master/swagger/support.yaml). Also further information in [this repo](https://github.com/transcom/prime_api_deliverable).

### Prerequisites

[See above](#creating-a-new-mto-with-shipments) for instructions on how to you set these up via the UI

- MTO has to be made available to the prime
- MTO has an approved shipment
- MTOShipment has `scheduledPickupDate` set to _at least 10 days_ after TOO approved date
- MTOShipment has `actualPickupDate`, `primeEstimatedWeight`, and `primeActualWeight` set
  - `primeEstimatedWeight` has restrictions:
    - Cannot be edited once set
    - Cannot be set if scheduledPickupDate is too close to TOO approved date

### Add weights to the shipment

:::info
*The `PrimeEstimatedWeight` will be set already if using the PPM to HHG
converter as instructed [above](#creating-a-new-mto-with-shipments). If it is
you won't need to set it again, in fact you can't adjust it once set so omit it
from the payloads*
:::

To update a shipment with estimated and actual weights get the `eTag` for the shipment. The first id is for the MTO, and the second is for the MTOShipment.

*Development*
```sh
prime-api-client --insecure fetch-mto-updates | jq 'map(select(.id == "da3f34cc-fb94-4e0b-1c90-ba3333cb7791")) | .[0] | .mtoShipments | map(select(.id == "b4306be8-146f-482c-b4a2-8432d4b970ca")) | .[0] | .eTag'
```

*Staging*
```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 fetch-mto-updates | jq 'map(select(.id == "da3f34cc-fb94-4e0b-1c90-ba3333cb7791")) | .[0] | .mtoShipments | map(select(.id == "b4306be8-146f-482c-b4a2-8432d4b970ca")) | .[0] | .eTag'
```

Then use that `eTag` in the following payload, which you should save in `update_mto_shipment.json`. This example includes the additional fields of `scheduledPickupDate` and `actualPickupDate`.

```json title="update_mto_shipment.json"
{
  "mtoShipmentID": "b4306be8-146f-482c-b4a2-8432d4b970ca",
  "If-Match": "MjAyMC0wNi0wOVQwNTo1ODowMC44MjA3NDha",
  "body": {
    "scheduledPickupDate": "2020-11-22",
    "actualPickupDate": "2020-11-22"
  }
}
```

Now you can update the shipment

*Development*
```sh
prime-api-client --insecure update-mto-shipment --filename update_mto_shipment.json | jq
```

*Staging*
```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 update-mto-shipment --filename update_mto_shipment.json | jq
```

Once the `scheduledPickupDate` and `actualPickupDate` are set you will need to repeat the above steps with the following payload to update the mto shipment again to add the weights.
```json
{
  "mtoShipmentID": "b4306be8-146f-482c-b4a2-8432d4b970ca",
  "If-Match": "MjAyMC0wNi0wOVQwNTo1ODowMC44MjA3NDha",
  "body": {
    "primeEstimatedWeight": 1000,
    "primeActualWeight": 3000
  }
}
```

### Add SIT-related service items

#### Domestic Destination First Day SIT

```json
{
  "body": {
    "moveTaskOrderID": "<insert MTO ID>",
    "mtoShipmentID": "<insert shipment ID>",
    "modelType": "MTOServiceItemDestSIT",
    "reServiceCode": "DDFSIT",
    "timeMilitary1": "1705Z",
    "firstAvailableDeliveryDate1": "2021-01-31",
    "timeMilitary2": "0719Z",
    "firstAvailableDeliveryDate2": "2021-02-03",
    "sitEntryDate": "2021-01-12"
  }
}
```

*Development*
```sh
prime-api-client --insecure create-mto-service-item --filename create_ddfsit.json | jq
```

*Staging*
```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 create-mto-service-item --filename create_ddfsit.json | jq
```

#### Domestic Origin First Day SIT

```json
{
  "body": {
    "moveTaskOrderID": "<insert MTO ID>",
    "mtoShipmentID": "<insert shipment ID>",
    "modelType": "MTOServiceItemOriginSIT",
    "reServiceCode": "DOFSIT",
    "sitPostalCode": "30907",
    "reason": "my address changed",
    "sitEntryDate": "2021-01-13"
  }
}
```

*Development*
```sh
prime-api-client --insecure create-mto-service-item --filename create_dofsit.json | jq
```

*Staging*
```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 create-mto-service-item --filename create_dofsit.json | jq
```


### Create a Payment Request

You need to be sure that the MTO and MTO Shipment have the details needed for pricing the Service Items included in the payment request. For example to price a Domestic Linehaul service item the MTO Shipment will need both estimated and actual weight set. See above on how to update the shipment.

To create a payment request add the following JSON to a file called `create_payment_request.json`

```json
{
  "body": {
    "isFinal": false,
    "moveTaskOrderID": "da3f34cc-fb94-4e0b-1c90-ba3333cb7791",
    "serviceItems": [
      {
        "id": "9db1bf43-0964-44ff-8384-3297951f6781"
      }
    ]
  }
}
```

Then execute the command to create the payment request.

#### Development
```sh
prime-api-client --insecure create-payment-request --filename create_payment_request.json | jq
```

#### Staging
```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 create-payment-request --filename create_payment_request.json | jq
```


### Create a Payment Request Upload

TBD


#### Development
```sh
prime-api-client --insecure  create-upload --paymentRequestID "a6268f43-fcf9-4b71-aa59-ea2f55aeb324" --filename "/Users/jacquelinemckinney/Documents/mymove/pcs orders/dd1614_pcs.pdf" | jqprime-api-client --insecure create-payment-request --filename create_payment_request.json | jq
```

#### Staging
```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 create-upload --paymentRequestID "a6268f43-fcf9-4b71-aa59-ea2f55aeb324" --filename "/Users/jacquelinemckinney/Documents/mymove/pcs orders/dd1614_pcs.pdf" | jq
```

## Verifying Pricing

:::note
Since we cannot run queries on staging you will need to run the below queries
locally. However, you can load the staging rate data into your database locally
by running `make run_staging_migrations` and then running the queries in
`deployed_migrations` database.
:::

### Domestic Short Haul (DSH)

Formula for price calculation `priceInCents = (Weight Billed Actual / 100.0) * distanceInMiles * rateInCents * escalationCompounded` round to nearest cent.

:::note
The `distanceInMiles` is obtained from the `DistanceZip5` field in
`paymentServiceItemsParams` on the payment request. `Weight Billed Actual` is
also found in `paymentServiceItemsParams`.
:::

To get the rate and `escalationCompounded` run the following query filling in the service item params for your payment request.

```sql {6-10}
select price_cents, escalation_compounded from re_domestic_service_area_prices dsap
    inner join re_domestic_service_areas sa on dsap.domestic_service_area_id = sa.id
    inner join re_services on dsap.service_id = re_services.id
    inner join re_contracts on re_contracts.id = dsap.contract_id
    inner join re_contract_years on re_contracts.id = re_contract_years.contract_id
    where sa.service_area = '076'
        and re_services.code = 'DSH'
        and re_contracts.code = 'TRUSS_TEST'
        and dsap.is_peak_period = true
        and '2020-06-29' between re_contract_years.start_date and re_contract_years.end_date;
```

### Domestic Long Haul (DLH)

Formula for price calculation `priceInCents = ((Weight Billed Actual / 100.0) * distanceInMiles * rateInMillicents * escalationCompounded) / 1000` round to nearest cent

```sql
select price_millicents, escalation_compounded
    from re_domestic_linehaul_prices dlp
    inner join re_contracts c on dlp.contract_id = c.id
    inner join re_contract_years cy on c.id = cy.contract_id
    inner join re_domestic_service_areas dsa on dlp.domestic_service_area_id = dsa.id
    where c.code = 'TRUSS_TEST'
        and '2020-06-29' between cy.start_date and cy.end_date
        and dlp.is_peak_period = true
        and 3000 between dlp.weight_lower and dlp.weight_upper
        and 2376 between dlp.miles_lower and dlp.miles_upper
        and dsa.service_area = '076';
```
### Domestic Destination Price (DDP)

Formula for price calculation `priceInCents = (Weight Billed Actual / 100.0) * rateInCents * escalationCompounded` round to nearest cent

```sql
select price_cents, escalation_compounded from re_domestic_service_area_prices dsap
    inner join re_domestic_service_areas sa on dsap.domestic_service_area_id = sa.id
    inner join re_services on dsap.service_id = re_services.id
    inner join re_contracts on re_contracts.id = dsap.contract_id
    inner join re_contract_years on re_contracts.id = re_contract_years.contract_id
    where sa.service_area = '080'
        and re_services.code = 'DDP'
        and re_contracts.code = 'TRUSS_TEST'
        and dsap.is_peak_period = true
        and '2020-06-26' between re_contract_years.start_date and re_contract_years.end_date;
```
### Domestic Origin Price (DOP)

Formula for price calculation `priceInCents = (Weight Billed Actual / 100.0) * rateInCents * escalationCompounded` round to nearest cent

```sql
select price_cents, escalation_compounded from re_domestic_service_area_prices dsap
    inner join re_domestic_service_areas sa on dsap.domestic_service_area_id = sa.id
    inner join re_services on dsap.service_id = re_services.id
    inner join re_contracts on re_contracts.id = dsap.contract_id
    inner join re_contract_years on re_contracts.id = re_contract_years.contract_id
    where sa.service_area = '080'
        and re_services.code = 'DOP'
        and re_contracts.code = 'TRUSS_TEST'
        and dsap.is_peak_period = true
        and '2020-06-26' between re_contract_years.start_date and re_contract_years.end_date;
```

### Domestic Packing Price (DPK)

Formula for price calculation `priceInCents = (Weight Billed Actual / 100.0) * rateInCents * escalationCompounded` round to nearest cent

```sql
select price_cents, escalation_compounded from re_domestic_other_prices dop
    inner join re_services on dop.service_id = re_services.id
    inner join re_contracts on re_contracts.id = dop.contract_id
    inner join re_contract_years on re_contracts.id = re_contract_years.contract_id
    where re_services.code = 'DPK'
        and re_contracts.code = 'TRUSS_TEST'
        and dop.is_peak_period = true
        and dop.schedule = 3
        and '2020-07-22' between re_contract_years.start_date and re_contract_years.end_date;
```

### Domestic Unpacking Price (DUPK)

Formula for price calculation `priceInCents = (Weight Billed Actual / 100.0) * rateInCents * escalationCompounded` round to nearest cent

```sql
select price_cents, escalation_compounded from re_domestic_other_prices dop
    inner join re_services on dop.service_id = re_services.id
    inner join re_contracts on re_contracts.id = dop.contract_id
    inner join re_contract_years on re_contracts.id = re_contract_years.contract_id
    where re_services.code = 'DUPK'
        and re_contracts.code = 'TRUSS_TEST'
        and dop.is_peak_period = true
        and dop.schedule = 3
        and '2020-07-22' between re_contract_years.start_date and re_contract_years.end_date;
```

### Fuel Surcharge Price (FSC)
Formula for price calculation

1. (`weekly national diesel fuel price` - 2.50) x 100 = `price difference in cents`
1. Determine the `weight based distance multiplier`
    - For shipments up to 5,000 lbs, the amount is $0.000417 per mile.
    - For shipments between 5,001 and 10,000 lbs, the amount is $0.0006255 per mile.
    - For shipments 10,001 to 24,000, the amount is $0.000834 per mile.
    - For shipments over 24,001 lbs, the amount is $0.00139 per mile.
1. `weight based distance multiplier` x `distance` = `fuel surcharge multiplier`
1. `price difference in cents` x `fuel surcharge multiplier` = `fuel surcharge price`

All information for calculating the FSC and the FSC price can be verified by checking the params that are returned upon successfully creating a payment request.

### Domestic Destination or Origin First Day SIT (DDFSIT or DOFSIT)

note: edit `re_services.code = 'DDFSIT'` for `DDFSIT` or `DOFSIT`

Formula for price calculation `priceInCents = (Weight Billed Actual / 100.0) * rateInCents * escalationCompounded` round to nearest cent

```sql
select price_cents, escalation_compounded from re_domestic_service_area_prices dsap
   inner join re_domestic_service_areas sa on dsap.domestic_service_area_id = sa.id
   inner join re_services on dsap.service_id = re_services.id
   inner join re_contracts on re_contracts.id = dsap.contract_id
   inner join re_contract_years on re_contracts.id = re_contract_years.contract_id
   where sa.service_area = '080'
    and re_services.code = 'DDFSIT'
    and re_contracts.code = 'TRUSS_TEST'
    and dsap.is_peak_period = true
    and '2020-06-26' between re_contract_years.start_date and re_contract_years.end_date;
```

### Domestic Destination or Origin SIT Additional Days (DDASIT or DOASIT)

note: edit `re_services.code = 'DDASIT'` for `DDASIT` or `DOASIT`

priceInCents = (Weight Billed Actual / 100.0) * number of days * rateInCents * escalationCompounded round to nearest cent

```sql
select price_cents, escalation_compounded from re_domestic_service_area_prices dsap
    inner join re_domestic_service_areas sa on dsap.domestic_service_area_id = sa.id
    inner join re_services on dsap.service_id = re_services.id
    inner join re_contracts on re_contracts.id = dsap.contract_id
    inner join re_contract_years on re_contracts.id = re_contract_years.contract_id
    where sa.service_area = '781'
        and re_services.code = 'DDASIT'
        and re_contracts.code = 'TRUSS_TEST'
        and dsap.is_peak_period = false
        and '2021-02-04' between re_contract_years.start_date and re_contract_years.end_date;
```

### Domestic Destination Delivery or Origin Pickup SIT (DDDSIT or DOPSIT)

note: edit `re_services.code = 'DDDSIT'` for `DDDSIT` or `DOPSIT`

note: for details about setting up delivery/pickup SIT service items and example ZIP codes for testing each of these scenarios, see [this page](testing-payment-requests-for-domestic-sit-service-items.md).

If zip3 to same zip3, use the [domestic shorthaul](acceptance-testing-payment-requests.md#domestic-short-haul-dsh) calculation.

If zip3 to different zip3 and > 50 miles, use the [domestic linehaul](acceptance-testing-notifications.md#domestic-long-haul-dlh) calculation.

If zip3 to different zip3 and <= 50 miles, use the following:

Formula for price calculation `priceInCents = (Weight Billed Actual / 100.0) * rateInCents * escalationCompounded` round to nearest cent

```sql
select price_cents, escalation_compounded from re_domestic_other_prices dop
    inner join re_services on dop.service_id = re_services.id
    inner join re_contracts on re_contracts.id = dop.contract_id
    inner join re_contract_years on re_contracts.id = re_contract_years.contract_id
    where re_services.code = 'DDDSIT'
        and re_contracts.code = 'TRUSS_TEST'
        and dop.is_peak_period = true
        and dop.schedule = 3
        and '2020-07-22' between re_contract_years.start_date and re_contract_years.end_date;
```

### Domestic Destination Shuttling (DDSHUT)
Formula for price calculation priceInCents = (Weight Billed Actual / 100.0) * rateInCents * escalationCompounded round to nearest cent

```sql
select per_unit_cents, escalation_compounded from re_domestic_accessorial_prices dap
    inner join re_services on dap.service_id = re_services.id
    inner join re_contracts on re_contracts.id = dap.contract_id
    inner join re_contract_years on re_contracts.id = re_contract_years.contract_id
    where re_services.code = 'DDSHUT'
        and re_contracts.code = 'TRUSS_TEST'
        and dap.services_schedule = 3
        and '2020-07-22' between re_contract_years.start_date and re_contract_years.end_date;
```

### Domestic Origin Shuttling (DOSHUT)
Formula for price calculation priceInCents = (Weight Billed Actual / 100.0) * rateInCents * escalationCompounded round to nearest cent

```sql
select per_unit_cents, escalation_compounded from re_domestic_accessorial_prices dap
    inner join re_services on dap.service_id = re_services.id
    inner join re_contracts on re_contracts.id = dap.contract_id
    inner join re_contract_years on re_contracts.id = re_contract_years.contract_id
    where re_services.code = 'DOSHUT'
        and re_contracts.code = 'TRUSS_TEST'
        and dap.services_schedule = 3
        and '2020-07-22' between re_contract_years.start_date and re_contract_years.end_date;
```

### Domestic Crating (DCRT)
Formula for price calculation priceInCents = cubicFeetBilled * rateInCents * escalationCompounded round to nearest cent

```sql
select per_unit_cents, escalation_compounded from re_domestic_accessorial_prices dap
    inner join re_services on dap.service_id = re_services.id
    inner join re_contracts on re_contracts.id = dap.contract_id
    inner join re_contract_years on re_contracts.id = re_contract_years.contract_id
    where re_services.code = 'DCRT'
        and re_contracts.code = 'TRUSS_TEST'
        and dap.services_schedule = 3
        and '2020-07-22' between re_contract_years.start_date and re_contract_years.end_date;
```

### Domestic Uncrating (DUCRT)
Formula for price calculation priceInCents = cubicFeetBilled * rateInCents * escalationCompounded round to nearest cent

```sql
select per_unit_cents, escalation_compounded from re_domestic_accessorial_prices dap
    inner join re_services on dap.service_id = re_services.id
    inner join re_contracts on re_contracts.id = dap.contract_id
    inner join re_contract_years on re_contracts.id = re_contract_years.contract_id
    where re_services.code = 'DUCRT'
        and re_contracts.code = 'TRUSS_TEST'
        and dap.services_schedule = 3
        and '2020-07-22' between re_contract_years.start_date and re_contract_years.end_date;
```

## Generate EDI via Support API

### Prerequisites

[See above](#creating-a-payment-request) for instructions on how to create a payment request. Also you can run `fetch-mto-updates` to find an existing payment request to use for generating an EDI.

- MTO with a payment request created

### Generate EDI via Support API

To generate an EDI add the following JSON to a file called `get_payment_request_edi.json`

```json title="get_payment_request_edi.json"
{
  "paymentRequestID": "6ed3829c-c83e-4ffd-8fcc-a7025638266f"
}
```

Then execute the command to create the payment request.

#### Development
```sh
prime-api-client --insecure support-get-payment-request-edi --filename get_payment_request_edi.json | jq -r '.edi'
```

#### Staging
```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443  support-get-payment-request-edi --filename get_payment_request_edi.json | jq -r '.edi'
```


## Move Task Order actions

### Create an MTO Shipment via prime API

If you need to create a new MTO Shipment create a file named `create_mto_shipment.json` with the following data

```json title="create_mto_shipment.json"
{
  "body": {
    "moveTaskOrderID": "da3f34cc-fb94-4e0b-1c90-ba3333cb7791",
    "shipmentType": "HHG",
    "requestedPickupDate": "2020-06-08",
    "customerRemarks": "special one handle with care",
    "pickupAddress": {
      "city": "Beverly Hills",
      "country": "US",
      "postalCode": "90210",
      "state": "CA",
      "streetAddress1": "123 Any Street",
      "streetAddress2": "P.O. Box 12345",
      "streetAddress3": "c/o Some Person"
    },
    "destinationAddress": {
      "city": "Fairfield",
      "country": "US",
      "postalCode": "94535",
      "state": "CA",
      "streetAddress1": "987 Any Avenue",
      "streetAddress2": "P.O. Box 9876",
      "streetAddress3": "c/o Some Person"
    },
    "agents": [
      {
        "firstName": "James",
        "lastName": "Semaj",
        "email": "jsemaj@example.com",
        "phone": "234-555-1234",
        "agentType": "RELEASING_AGENT"
      }
    ],
    "pointOfContact": "string",
    "mtoServiceItems": []
  }
}
```

Execute the following command to create the shipment

#### Development
```sh
prime-api-client --insecure create-mto-shipment --filename create_mto_shipment.json | jq
```

#### Staging
```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 create-mto-shipment --filename create_mto_shipment.json
```

### Approve MTO Shipment

#### Via TOO UI

To approve an MTO shipment use the following steps:

- Login to the office app https://office.stg.move.mil/ as a TOO
- Head over to the skeleton list of customer moves https://office.stg.move.mil/too/customer-moves
- Select a move, a little trial and error to find one with an MTO
- Click `Approve` next to the shipment. This will add the appropriate service items

### Make MTO available to the prime

There are two ways to do this

#### Via TOO UI

To make an MTO available to the prime use the following steps:

- Login to the office app https://office.stg.move.mil/ as a TOO
- Head over to the skeleton list of customer moves https://office.stg.move.mil/too/customer-moves
- Select a move, a little trial and error to find one with an MTO
- Click `Send to Prime` at the bottom

#### Via support api

If needed you can make a MTO available to the prime via the API you can save the following payload to a file `avail_to_prime.json`. _Note_ this makes use of the support API.

```json
{
  "moveTaskOrderID": "da3f34cc-fb94-4e0b-1c90-ba3333cb7791",
  "If-Match": "MjAyMC0wNi0wOVQwNTo0MzozMC43MzA5Nzla"
}
```

Then run the following command

#### Development
```sh
prime-api-client --insecure support-make-move-task-order-available --filename avail_to_prime.json | jq'
```

#### Staging
```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 support-make-move-task-order-available --filename avail_to_prime.json | jq'
```

## Issues

### Errors during service item param lookups don't bubble up

When creating a payment request you may get an empty payload. This is usually caused by an exception who's message is not being propagated up to the response. There is an open story to fix this, but if it happens during acceptance you should look at the logs to see what went wrong.

## Searching For Errors in Staging

This can be done in CloudWatch using the Log Insights (See [this doc](https://dp3.atlassian.net/l/c/UKR6fUhk) for details), or more easily with the [ecs-service-logs tool](https://github.com/trussworks/ecs-service-logs). If you have a `instance` in the error message you can use that as the `milmove_trace_id`


```json title="Example error response:"
{
  "Payload": {
    "detail": "An internal server error has occurred",
    "instance": "4dacdb9e-0063-44c7-aa21-ebed1e8c221b",
    "title": "Internal Server Error"
  }
}
```

```sh
aws-vault exec transcom-gov-milmove-stg -- ecs-service-logs show -s app-client-tls -e stg 'milmove_trace_id=4dacdb9e-0063-44c7-aa21-ebed1e8c221b' | jq .
```

```json title="Sample output:"
[
  {
    "level": "info",
    "ts": "2020-06-17T18:45:48.516Z",
    "caller": "primeapi/payment_request.go:39",
    "msg": "primeapi.CreatePaymentRequestHandler info",
    "git_branch": "master",
    "git_commit": "71969d2e81f4fb10c5333bf9f152430541a06681",
    "ecs_cluster": "arn:aws:ecs:us-west-2:923914045601:cluster/app-staging",
    "ecs_task_def_family": "app-client-tls-staging",
    "ecs_task_def_revision": "2588",
    "milmove_trace_id": "4dacdb9e-0063-44c7-aa21-ebed1e8c221b",
    "pointOfContact": ""
  },
  {
    "level": "error",
    "ts": "2020-06-17T18:45:49.130Z",
    "caller": "primeapi/payment_request.go:81",
    "msg": "Error creating payment request",
    "git_branch": "master",
    "git_commit": "71969d2e81f4fb10c5333bf9f152430541a06681",
    "ecs_cluster": "arn:aws:ecs:us-west-2:923914045601:cluster/app-staging",
    "ecs_task_def_family": "app-client-tls-staging",
    "ecs_task_def_revision": "2588",
    "milmove_trace_id": "4dacdb9e-0063-44c7-aa21-ebed1e8c221b",
    "error": "Failed to create service item param for param key <ServiceAreaOrigin>  MTO ID <07b3adf0-1c53-40d0-becc-b157828d5dbd> paymentRequestID <00000000-0000-0000-0000-000000000000> MTO Service item ID <b68f3e45-acbc-48ae-b4a3-6fa34f781b50> RE Service Item Code: <> Name: <> err: Failed to lookup ServiceParamValue for param key <ServiceAreaOrigin>  err:  failed ServiceParamValue ServiceAreaOriginLookup with error sql: no rows in result set",
    "stacktrace": "github.com/transcom/mymove/pkg/handlers/primeapi.CreatePaymentRequestHandler.Handle\n\t/home/circleci/transcom/mymove/pkg/handlers/primeapi/payment_request.go:81\ngithub.com/transcom/mymove/pkg/gen/primeapi/primeoperations/payment_requests.(*CreatePaymentRequest).ServeHTTP\n\t/home/circleci/transcom/mymove/pkg/gen/primeapi/primeoperations/payment_requests/create_payment_request.go:60\ngithub.com/go-openapi/runtime/middleware.NewOperationExecutor.func1\n\t/home/circleci/go/pkg/mod/github.com/go-openapi/runtime@v0.19.15/middleware/operation.go:28\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/go-openapi/runtime/middleware.NewRouter.func1\n\t/home/circleci/go/pkg/mod/github.com/go-openapi/runtime@v0.19.15/middleware/router.go:77\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/go-openapi/runtime/middleware.Redoc.func1\n\t/home/circleci/go/pkg/mod/github.com/go-openapi/runtime@v0.19.15/middleware/redoc.go:72\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/go-openapi/runtime/middleware.Spec.func1\n\t/home/circleci/go/pkg/mod/github.com/go-openapi/runtime@v0.19.15/middleware/spec.go:46\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngoji%2eio.dispatch.ServeHTTP\n\t/home/circleci/go/pkg/mod/goji.io@v2.0.2+incompatible/dispatch.go:17\ngithub.com/felixge/httpsnoop.CaptureMetrics.func1\n\t/home/circleci/go/pkg/mod/github.com/felixge/httpsnoop@v1.0.1/capture_metrics.go:30\ngithub.com/felixge/httpsnoop.CaptureMetricsFn\n\t/home/circleci/go/pkg/mod/github.com/felixge/httpsnoop@v1.0.1/capture_metrics.go:81\ngithub.com/felixge/httpsnoop.CaptureMetrics\n\t/home/circleci/go/pkg/mod/github.com/felixge/httpsnoop@v1.0.1/capture_metrics.go:29\ngithub.com/transcom/mymove/pkg/middleware.RequestLogger.func1.1\n\t/home/circleci/transcom/mymove/pkg/middleware/request_logger.go:77\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/middleware.NoCache.func1.1\n\t/home/circleci/transcom/mymove/pkg/middleware/no_cache.go:13\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/auth/authentication.PrimeAuthorizationMiddleware.func1.1\n\t/home/circleci/transcom/mymove/pkg/auth/authentication/auth.go:205\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/auth/authentication.ClientCertMiddleware.func1.1\n\t/home/circleci/transcom/mymove/pkg/auth/authentication/client_cert.go:61\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/auth.HostnameDetectorMiddleware.func1.1\n\t/home/circleci/transcom/mymove/pkg/auth/hostname_detector.go:21\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngoji%2eio.(*Mux).ServeHTTP\n\t/home/circleci/go/pkg/mod/goji.io@v2.0.2+incompatible/mux.go:74\ngoji%2eio.dispatch.ServeHTTP\n\t/home/circleci/go/pkg/mod/goji.io@v2.0.2+incompatible/dispatch.go:17\ngithub.com/transcom/mymove/pkg/middleware.LimitBodySize.func1.1\n\t/home/circleci/transcom/mymove/pkg/middleware/limit_body_size.go:15\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/middleware.SecurityHeaders.func1.1\n\t/home/circleci/transcom/mymove/pkg/middleware/security_headers.go:28\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/middleware.Recovery.func1.1\n\t/home/circleci/transcom/mymove/pkg/middleware/recovery.go:50\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/middleware.ContextLogger.func1.1\n\t/home/circleci/transcom/mymove/pkg/middleware/context_logger.go:18\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/middleware.Trace.func1.1\n\t/home/circleci/transcom/mymove/pkg/middleware/trace.go:29\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngoji%2eio.(*Mux).ServeHTTP\n\t/home/circleci/go/pkg/mod/goji.io@v2.0.2+incompatible/mux.go:74\ngoji%2eio.dispatch.ServeHTTP\n\t/home/circleci/go/pkg/mod/goji.io@v2.0.2+incompatible/dispatch.go:17\ngoji%2eio.(*Mux).ServeHTTP\n\t/home/circleci/go/pkg/mod/goji.io@v2.0.2+incompatible/mux.go:74\nnet/http.serverHandler.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2807\nnet/http.(*conn).serve\n\t/usr/local/go/src/net/http/server.go:1895"
  },
  {
    "level": "error",
    "ts": "2020-06-17T18:45:49.130Z",
    "caller": "primeapi/payment_request.go:106",
    "msg": "Payment Request",
    "git_branch": "master",
    "git_commit": "71969d2e81f4fb10c5333bf9f152430541a06681",
    "ecs_cluster": "arn:aws:ecs:us-west-2:923914045601:cluster/app-staging",
    "ecs_task_def_family": "app-client-tls-staging",
    "ecs_task_def_revision": "2588",
    "milmove_trace_id": "4dacdb9e-0063-44c7-aa21-ebed1e8c221b",
    "payload": {
      "isFinal": false,
      "moveTaskOrderID": "07b3adf0-1c53-40d0-becc-b157828d5dbd",
      "serviceItems": [
        {
          "id": "b68f3e45-acbc-48ae-b4a3-6fa34f781b50",
          "params": null
        }
      ]
    },
    "stacktrace": "github.com/transcom/mymove/pkg/handlers/primeapi.CreatePaymentRequestHandler.Handle\n\t/home/circleci/transcom/mymove/pkg/handlers/primeapi/payment_request.go:106\ngithub.com/transcom/mymove/pkg/gen/primeapi/primeoperations/payment_requests.(*CreatePaymentRequest).ServeHTTP\n\t/home/circleci/transcom/mymove/pkg/gen/primeapi/primeoperations/payment_requests/create_payment_request.go:60\ngithub.com/go-openapi/runtime/middleware.NewOperationExecutor.func1\n\t/home/circleci/go/pkg/mod/github.com/go-openapi/runtime@v0.19.15/middleware/operation.go:28\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/go-openapi/runtime/middleware.NewRouter.func1\n\t/home/circleci/go/pkg/mod/github.com/go-openapi/runtime@v0.19.15/middleware/router.go:77\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/go-openapi/runtime/middleware.Redoc.func1\n\t/home/circleci/go/pkg/mod/github.com/go-openapi/runtime@v0.19.15/middleware/redoc.go:72\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/go-openapi/runtime/middleware.Spec.func1\n\t/home/circleci/go/pkg/mod/github.com/go-openapi/runtime@v0.19.15/middleware/spec.go:46\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngoji%2eio.dispatch.ServeHTTP\n\t/home/circleci/go/pkg/mod/goji.io@v2.0.2+incompatible/dispatch.go:17\ngithub.com/felixge/httpsnoop.CaptureMetrics.func1\n\t/home/circleci/go/pkg/mod/github.com/felixge/httpsnoop@v1.0.1/capture_metrics.go:30\ngithub.com/felixge/httpsnoop.CaptureMetricsFn\n\t/home/circleci/go/pkg/mod/github.com/felixge/httpsnoop@v1.0.1/capture_metrics.go:81\ngithub.com/felixge/httpsnoop.CaptureMetrics\n\t/home/circleci/go/pkg/mod/github.com/felixge/httpsnoop@v1.0.1/capture_metrics.go:29\ngithub.com/transcom/mymove/pkg/middleware.RequestLogger.func1.1\n\t/home/circleci/transcom/mymove/pkg/middleware/request_logger.go:77\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/middleware.NoCache.func1.1\n\t/home/circleci/transcom/mymove/pkg/middleware/no_cache.go:13\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/auth/authentication.PrimeAuthorizationMiddleware.func1.1\n\t/home/circleci/transcom/mymove/pkg/auth/authentication/auth.go:205\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/auth/authentication.ClientCertMiddleware.func1.1\n\t/home/circleci/transcom/mymove/pkg/auth/authentication/client_cert.go:61\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/auth.HostnameDetectorMiddleware.func1.1\n\t/home/circleci/transcom/mymove/pkg/auth/hostname_detector.go:21\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngoji%2eio.(*Mux).ServeHTTP\n\t/home/circleci/go/pkg/mod/goji.io@v2.0.2+incompatible/mux.go:74\ngoji%2eio.dispatch.ServeHTTP\n\t/home/circleci/go/pkg/mod/goji.io@v2.0.2+incompatible/dispatch.go:17\ngithub.com/transcom/mymove/pkg/middleware.LimitBodySize.func1.1\n\t/home/circleci/transcom/mymove/pkg/middleware/limit_body_size.go:15\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/middleware.SecurityHeaders.func1.1\n\t/home/circleci/transcom/mymove/pkg/middleware/security_headers.go:28\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/middleware.Recovery.func1.1\n\t/home/circleci/transcom/mymove/pkg/middleware/recovery.go:50\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/middleware.ContextLogger.func1.1\n\t/home/circleci/transcom/mymove/pkg/middleware/context_logger.go:18\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngithub.com/transcom/mymove/pkg/middleware.Trace.func1.1\n\t/home/circleci/transcom/mymove/pkg/middleware/trace.go:29\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2012\ngoji%2eio.(*Mux).ServeHTTP\n\t/home/circleci/go/pkg/mod/goji.io@v2.0.2+incompatible/mux.go:74\ngoji%2eio.dispatch.ServeHTTP\n\t/home/circleci/go/pkg/mod/goji.io@v2.0.2+incompatible/dispatch.go:17\ngoji%2eio.(*Mux).ServeHTTP\n\t/home/circleci/go/pkg/mod/goji.io@v2.0.2+incompatible/mux.go:74\nnet/http.serverHandler.ServeHTTP\n\t/usr/local/go/src/net/http/server.go:2807\nnet/http.(*conn).serve\n\t/usr/local/go/src/net/http/server.go:1895"
  },
  {
    "level": "info",
    "ts": "2020-06-17T18:45:49.130Z",
    "caller": "middleware/request_logger.go:85",
    "msg": "Request",
    "git_branch": "master",
    "git_commit": "71969d2e81f4fb10c5333bf9f152430541a06681",
    "ecs_cluster": "arn:aws:ecs:us-west-2:923914045601:cluster/app-stg",
    "ecs_task_def_family": "app-client-tls-stg",
    "ecs_task_def_revision": "2588",
    "milmove_trace_id": "4dacdb9e-0063-44c7-aa21-ebed1e8c221b",
    "accepted-language": "",
    "content-length": 152,
    "host": "api.stg.move.mil:443",
    "method": "POST",
    "protocol-version": "HTTP/1.1",
    "referer": "",
    "source": "172.20.35.232:45378",
    "url": "/prime/v1/payment-requests",
    "user-agent": "Go-http-client/1.1",
    "protocol": "https",
    "headers": 5,
    "client-cert-id": "4fea0eb1-0009-47a8-98f4-0a102ee53a4f",
    "duration": 0.614004182,
    "resp-size-bytes": 133,
    "resp-status": 500
  }
]
```

## Filters

Tips on filtering down the JSON responses from the API. You can experiment with jq filter options by inputting the JSON into this tool (https://jqplay.org/)

### Print only MTO

```sh
prime-api-client --insecure fetch-mto-updates | \
  jq 'map(select(.id == "53d5128e-158b-49a6-b3b3-64648b17afaa")) | .[0]'
```

### Print specific MTO Shipment's eTag

```sh
prime-api-client --insecure fetch-mto-updates | \
  jq 'map(select(.id == "da3f34cc-fb94-4e0b-1c90-ba3333cb7791")) | .[0] | .mtoShipments | map(select(.id == "b4148fad-acc6-4065-b387-90d05a702a24")) | .[0] | .eTag'
```

### Print the most recent MTO based on .updatedAt

```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 fetch-mto-updates | jq 'sort_by(.updatedAt) | .[-1]'
```

### Print the MTO with a certain moveCode

```
prime-api-client --cac --hostname api.stg.move.mil --port 443 fetch-mto-updates | jq 'map(select(.moveCode == "9YGVRV")) | .[0]'
```

### List all of the MTO service items for a shipment

```
prime-api-client --insecure fetch-mto-updates | jq 'map(select(.id == "9a5cd4ba-f1b4-4fbe-8469-0ba245c3ec95")) | .[0] | .mtoServiceItems | map(select(.mtoShipmentID == "a6445307-2012-4e8f-9af3-b5166d8f051d")) '
```

### Generate PR payload from MTO ID and Shipment ID with certain service codes
```
prime-api-client --insecure fetch-mto-updates | jq 'map(select(.id == "9a5cd4ba-f1b4-4fbe-8469-0ba245c3ec95")) | .[0] | .mtoServiceItems | map(select((.mtoShipmentID == "a6445307-2012-4e8f-9af3-b5166d8f051d") and .reServiceCode == "FSC" or .reService == "DLH" or .reServiceCode == "DOP" or .reServiceCode == "DPK" or .reServiceCode == "DUPK" ) ) | { body: { isFinal: false, moveTaskOrderID: "9a5cd4ba-f1b4-4fbe-8469-0ba245c3ec95", serviceItems: map({ id: .id }) } }'
```
