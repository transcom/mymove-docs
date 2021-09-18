[Pricing Acceptance script](https://github.com/transcom/mymove/blob/master/scripts/pricing-acceptance) is being used to mimick the Prime's use of the Prime API. If this script fails on a step, you will need to run the commands manually. This wiki page is to document the list of commands in order that would normally be run by the Prime.

<!-- toc -->

- [1. Fetch MTOs available to the Prime](#1-fetch-mtos-available-to-the-prime)
  * [Assuming the MTO was created during the demo, fetch the latest MTO and save it to a file](#assuming-the-mto-was-created-during-the-demo-fetch-the-latest-mto-and-save-it-to-a-file)
    + [Other variations if needed](#other-variations-if-needed)
      - [Fetch all MTOs](#fetch-all-mtos)
      - [To find the latest MTO use a `jq` filter](#to-find-the-latest-mto-use-a-jq-filter)
      - [To find the MTO by MoveOrderID use a `jq` filter](#to-find-the-mto-by-moveorderid-use-a-jq-filter)
      - [An additional filter can be added to only return the MTO ID](#an-additional-filter-can-be-added-to-only-return-the-mto-id)
- [2. Prime to update dates for the shipment](#2-prime-to-update-dates-for-the-shipment)
  * [For help narrowing down the eTag you can use `jq`](#for-help-narrowing-down-the-etag-you-can-use-jq)
- [3. Prime to update the weights for the shipment](#3-prime-to-update-the-weights-for-the-shipment)
  * [For help narrowing down the eTag you can use `jq`](#for-help-narrowing-down-the-etag-you-can-use-jq-1)
- [4. Prime to update destination address for the shipment](#4-prime-to-update-destination-address-for-the-shipment)
  * [For help narrowing down the eTag you can use `jq`](#for-help-narrowing-down-the-etag-you-can-use-jq-2)
- [5. Prime creates a payment request](#5-prime-creates-a-payment-request)
  * [Create the payload](#create-the-payload)
  * [Review the payload](#review-the-payload)
  * [Send the payment request and save the response](#send-the-payment-request-and-save-the-response)
  * [Get the payment request ID and payment request Number](#get-the-payment-request-id-and-payment-request-number)
- [6. Prime adds proof of service documents](#6-prime-adds-proof-of-service-documents)
  * [Store fake upload files to ./tmp/uploads](#store-fake-upload-files-to-tmpuploads)
- [7. Generate EDI in 858 format for the Payment Request](#7-generate-edi-in-858-format-for-the-payment-request)
- [8. Update the payment requests status](#8-update-the-payment-requests-status)
- [References](#references)

<!-- tocstop -->

# 1. Fetch MTOs available to the Prime

## Assuming the MTO was created during the demo, fetch the latest MTO and save it to a file


```sh
 prime-api-client --cac --hostname api.stg.move.mil --port 443 fetch-mto-updates | jq 'sort_by(.updatedAt) | .[-1]' > demo_mto.json
```

If successful, go to [step 2](https://github.com/transcom/mymove/wiki/Manually-run-Prime-API-for-Slice-demo#2-prime-to-update-dates-for-the-shipment).

### Other variations if needed

#### Fetch all MTOs

```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 fetch-mto-updates | jq
```

#### To find the latest MTO use a `jq` filter
```sh
  prime-api-client --cac --hostname api.stg.move.mil --port 443 fetch-mto-updates | jq 'sort_by(.updatedAt) | .[-1]' 
```

#### To find the MTO by MoveOrderID use a `jq` filter
```sh
  prime-api-client --cac --hostname api.stg.move.mil --port 443 fetch-mto-updates | jq 'map(select(.moveOrderID == "uuid-for-moveorder-id")) | .[0]'
```

#### An additional filter can be added to only return the MTO ID
```sh
 prime-api-client --cac --hostname api.stg.move.mil --port 443 fetch-mto-updates | jq 'sort_by(.updatedAt) | .[-1]' | jq '.id'
```

# 2. Prime to update dates for the shipment
The `shipmentID` must be consistent between steps 2, 3, 4, and 5.

Date format: `YYYY-MM-DD`

Copy the payload to a file, filling in the variables. The file in this example will be `demo_updates_dates.json`
```json
{
  "mtoShipmentID": ${shipmentID},
  "ifMatch": ${shipmentEtag},
  "body": {
    "scheduledPickupDate": "${scheduledPickupDate}",
    "actualPickupDate": "${actualPickupDate}"
  }
}
```

```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 update-mto-shipment --filename demo_updates_dates.json | jq
```

## For help narrowing down the eTag you can use `jq`
The first `.id` is the MTO ID and the second `.id` is the Shipment ID.
```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443  fetch-mto-updates | \
  jq 'map(select(.id == "da3f34cc-fb94-4e0b-1c90-ba3333cb7791")) | .[0] | .mtoShipments | map(select(.id == "b4148fad-acc6-4065-b387-90d05a702a24")) | .[0] | .eTag'
```

If successful, go to [step 3](https://github.com/transcom/mymove/wiki/Manually-run-Prime-API-for-Slice-demo#3-prime-to-update-the-weights-for-the-shipment).

# 3. Prime to update the weights for the shipment
The `shipmentID` must be consistent between steps 2, 3, 4, and 5.

Copy the payload to a file, filling in the variables. The file is this example will be `demo_update_weights.json`
```json
{
  "mtoShipmentID": ${shipmentID},
  "ifMatch": ${shipmentEtag},
  "body": {
    "primeEstimatedWeight": ${estimatedWeight},
    "primeActualWeight": ${actualWeight}
  }
}
```

```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 update-mto-shipment --filename demo_update_weights.json | jq

```

## For help narrowing down the eTag you can use `jq`
The first `.id` is the MTO ID and the second `.id` is the Shipment ID.
```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 fetch-mto-updates | \
  jq 'map(select(.id == "da3f34cc-fb94-4e0b-1c90-ba3333cb7791")) | .[0] | .mtoShipments | map(select(.id == "b4148fad-acc6-4065-b387-90d05a702a24")) | .[0] | .eTag'
```

If successful, go to [step 4](https://github.com/transcom/mymove/wiki/Manually-run-Prime-API-for-Slice-demo#4-prime-creates-a-payment-request).

# 4. Prime to update destination address for the shipment
The `shipmentID` must be consistent between steps 2, 3, 4, and 5.

**NOTE** It is critical to pick a zip code that is not within 50 miles of the origin zip

Copy the payload to a file, filling in the variables. The file in this example will be `demo_updates_dates.json`
```json
{
  "mtoShipmentID": ${shipmentID},
  "ifMatch": ${shipmentEtag},
  "body": {
    "destinationAddress": {
      "streetAddress1": "${destStreetAddress1}",
      "city": "${destCity}",
      "state": "${destState}",
      "postalCode": "${destZip}",
      "country": "US"
    }
  }
}
```

```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 update-mto-shipment --filename demo_updates_dates.json | jq
```

## For help narrowing down the eTag you can use `jq`
The first `.id` is the MTO ID and the second `.id` is the Shipment ID.
```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443  fetch-mto-updates | \
  jq 'map(select(.id == "da3f34cc-fb94-4e0b-1c90-ba3333cb7791")) | .[0] | .mtoShipments | map(select(.id == "b4148fad-acc6-4065-b387-90d05a702a24")) | .[0] | .eTag'
```

If successful, go to [step 3](https://github.com/transcom/mymove/wiki/Manually-run-Prime-API-for-Slice-demo#3-prime-to-update-the-weights-for-the-shipment).


# 5. Prime creates a payment request
The `shipmentID` must be consistent between steps 2, 3, 4, and 5.

## Create the payload
Edit the list of service codes as needed for the demo
```sh
jq '.mtoServiceItems | map(select((.mtoShipmentID == "e272af65-c662-40e3-a47b-9711942d9ce1") and (.reServiceCode == "FSC" or .reServiceCode == "DLH") or .reServiceCode == "MS" or .reServiceCode == "CS")) | { body: { isFinal: false, moveTaskOrderID: "ec88724f-bfa9-4d89-8833-4fcfab24ef59", serviceItems: map({ id: .id }) } }' demo_mto.json > demo_create_payment_request.json
```

## Review the payload
```sh
jq . demo_create_payment_request.json
```

## Send the payment request and save the response
```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 create-payment-request --filename demo_create_payment_request.json > demo_create_payment_request_response.json
```

## Get the payment request ID and payment request Number

```sh
jq .id demo_create_payment_request_response.json
```

```sh
jq .paymentRequestNumber demo_create_payment_request_response.json
```

If successful, go to [step 5](https://github.com/transcom/mymove/wiki/Manually-run-Prime-API-for-Slice-demo#5-prime-adds-proof-of-service-documents).


# 6. Prime adds proof of service documents

Get the list of documents that you want to send e.g. `(./tmp/uploads/proof_of_service.png ./tmp/uploads/proof_of_service.jpg ./tmp/uploads/proof_of_service.pdf)`


```
for proofOfService in "./tmp/uploads/proof_of_service.png" "./tmp/uploads/proof_of_service.jpg" "./tmp/uploads/proof_of_service.pdf"; do
    if [ -f "$proofOfService" ]; then
        echo "Uploading file ${proofOfService}."
        proofBase=$(basename "${proofOfService}")
        prime-api-client --cac --hostname api.stg.move.mil --port 443 create-upload --paymentRequestID "${prID}" --filename "${proofOfService}" > demo_create_upload_response_"${proofBase}".json
    else
        echo "File ${proofOfService} does not exist, skipping upload."
    fi
done
```

If successful, go to [step 6](https://github.com/transcom/mymove/wiki/Manually-run-Prime-API-for-Slice-demo#6-generate-edi-in-858-format-for-the-payment-request)

## Store fake upload files to ./tmp/uploads

If you would like to following this example as-is. You can copy [these files](https://drive.google.com/file/d/1D4QSM1ksBKWXyhVA8pfqdn_t5CkYY626/view?usp=sharing) to your `./tmp/uploads` directory

# 7. Generate EDI in 858 format for the Payment Request
Use the payment ID from step #5.

Save payload to filename `demo_get_payment_request_edi.json`
```json
{
  "paymentRequestID": "${prID}"
}
```

```sh
prime-api-client --cac --hostname api.stg.move.mil --port 443 support-get-payment-request-edi --filename demo_get_payment_request_edi.json | jq -r '.edi' > demo_edi_response.json; cat  demo_edi_response.json

```

# 8. Update the payment requests status
Use the payment ID from step #5.

Save payload to a filename `demo_update_payment_request_status.json`
```json
{
  "body": {
    "paymentRequestID": "${prID}",
    "sendToSyncada": false
  }
}
```

```sh
prime-api-client --cac --hostname api.stg/move.mil --port 443 support-reviewed-payment-requests --filename demo_update_payment_request_status.json
```

If successful, Prime demo is complete 🎉.


# References
* [Acceptance Testing Payment Requests](https://github.com/transcom/mymove/wiki/Acceptance-Testing-Payment-Requests)
* [Acceptance Testing Prime API Endpoints](https://github.com/transcom/mymove/wiki/Acceptance-Testing-Prime-API-Endpoints)
