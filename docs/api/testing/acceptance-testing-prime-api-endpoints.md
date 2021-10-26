---
sidebar_position: 1
---

# Acceptance Testing Prime API

## Current Prime API Endpoints
* `fetchMTOUpdates`
* `updateMTOPostCounselingInformation`
* `createMTOShipment`
* `updateMTOShipment`
* `createMTOServiceItem`
* `createPaymentRequest`
* `createUpload`
* `createMTOAgent`

## Checklist for Acceptance Testing Prime API Endpoints

### 1. Verify Business Logic
* `available_to_prime_at` will have a timestamp if in production environment
* business logic should be tested in test cases

### 2. Validate Requests
* all requests fields should be defined in `prime.yaml`
* un/required fields should properly denoted  
* fields that are provided in the response but not valid in the request should be marked `readOnly`
* `etag` should be marked as `readOnly` in the yaml - It should never be in the request payload
* all fields should have a meaningful description visible in the Redoc

### 3. Validate Responses
* all response fields should be defined in `prime.yaml`
* un/required fields should properly denoted  
* fields that are used in the request but not valid in the response should be marked `writeOnly`
* `pointOfContact` should be marked as `writeOnly` - It's a logged field which should never be in the response. 
* all fields should have a meaningful description visible in the Redoc

### 4. Validate Errors
* all error fields should be defined in `prime.yaml`
* error responses should be meaningful and follow our [desired pattern](https://github.com/transcom/mymove/wiki/API-Errors).
* errors we like to use:
1. `401 - Unauthorized`: requester is not properly authorized to make request
1. `422 - Unprocessable Entity`: validation errors, missing values, invalid values
1. `409 - Conflict Error`: Cannot process the request due to the current state of the server (for e.g., we cannot change this value once this date is past)
1. `404 - Not Found`: Requested resource does not exist and the server does not know if it ever existed.

For more detail on how to generate and return errors, [API Errors · transcom/mymove Wiki](https://github.com/transcom/mymove/wiki/API-Errors)

For a working complete list of MTO database field description, [see here](https://docs.google.com/spreadsheets/d/1pQVZdi5ttQ67DIcBAgk9INUH9oVqTDpzL2ciMAJuBV8/edit#gid=0)




