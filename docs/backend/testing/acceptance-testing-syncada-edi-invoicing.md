---
sidebar_position: 1
---

# Acceptance testing Syncada

## Prerequisites

:::note
*The following examples use a Move from the devseed data if needed for local
use.*
:::

This section will describe the prerequisites for invoicing, that are beyond the scope of documenting here. See the [References](#references) section for links that may help in setting these up.

### Move

A move with at least one shipment approved. Also helpful to have Management or Counsiling fees approved.

### Orders

The orders associated with the move must have all the required fields, particularly `Department indicator`, `TAC`, and `SAC` as all 3 are required for EDI Generation.

:::note
*TAC and SAC are large, 255 varchar and text in the database respectively;
however, the EDI can only handle a max of 80 characters for those two fields.*
:::

### Shipment

A shipment that is approved, with service items that can be priced.

### Payment Request

A payment request is created for price-able service items. That payment request then needs to be reviewed via the TIO interface and contain at least 1 approved payment service item.

Save the following to `payload.json`.

```json title="Save the following JSON to payload.json"
{
  "body": {
    "isFinal": false,
    "moveTaskOrderID": "9c7b255c-2981-4bf8-839f-61c7458e2b4d",
    "serviceItems": [
      {
        "id": "ca9aeb58-e5a9-44b0-abe8-81d233dbdebf"
      },
      {
        "id": "eee4b555-2475-4e67-a5b8-102f28d950f8"
      },
      {
        "id": "6431e3e2-4ee4-41b5-b226-393f9133eb6c"
      },
      {
        "id": "fd6741a5-a92c-44d5-8303-1d7f5e60afbf"
      }
    ]
  }
}
```

```sh title="Run this command"
prime-api-client --insecure create-payment-request --filename payload.json | jq '.id,.paymentRequestNumber'
```

```sh title="Previous command output"
"ce261508-1bd3-4876-b5ca-fb761de43d4d"
"5405-6058-1"
```

## Invoicing Operations

:::note
*The following examples use a Move from the devseed data if needed for local use.*
:::

### Generate EDI locally

You will need the payment request number that you can find in the fetch-mto-updates call

```sh title="Run this command"
bin/generate-payment-request-edi --payment-request-number 5405-6058-1
```

```sh title="Previous command output"
ISA*00*0084182369*00*0000000000*ZZ*MILMOVE        *12*8004171844     *210116*0827*U*00401*533069921*0*T*|
GS*SI*MILMOVE*8004171844*20210116*0827*100001251*X*004010
ST*858*0001
BX*00*J*PP*5405-6058*TRUS**4
N9*CN*5405-6058-1**
N9*CT*TRUSS_TEST**
N9*1W*Leo, Spacemen**
N9*ML*E_1**
N9*3L*ARMY**
G62*10*20210115**
G62*76*20210114**
G62*86*20200316**
N1*BY*JPPSO Testy McTest*92*LKNQ
N1*SE*Prime*2*PRME
N1*ST*Fort Gordon*10*CNNQ
N3*Fort Gordon*
N4*Augusta*GA*30813*USA**
PER*CN**TE*706-791-4184
N1*SF*umRSlGJ7mP*10*LKNQ
N3*987 Other Avenue*P.O. Box 1234
N4*Des Moines*IA*50309*USA**
PER*CN**TE*(510) 555-5555
HL*1**I
N9*PO*5405-6058-a492e26c**
L5*1*FSC*TBD*D**
L0*1*354.000*DM*1349.000*B******L
L1*1*1349*LB*34400
FA1*DY
FA2*TA*F8E1
HL*2**I
N9*PO*5405-6058-740cb8c2**
L5*2*CS*TBD*D**
L0*2**********
L1*2*0**2235300
FA1*DY
FA2*TA*F8E1
HL*3**I
N9*PO*5405-6058-1044cdb9**
L5*3*DSH*TBD*D**
L0*3*388.000*DM*1349.000*B******L
L1*3*1349*LB*47543300
FA1*DY
FA2*TA*F8E1
HL*4**I
N9*PO*5405-6058-6233632d**
L5*4*DLH*TBD*D**
L0*4*354.000*DM*1349.000*B******L
L1*4*1349*LB*115948500
FA1*DY
FA2*TA*F8E1
L3*****1657615
SE*50*0001
GE*1*100001251
IEA*1*533069921
```

### Generate EDI via support API

Save the following to `payload.json`

```json title="Save the following JSON to payload.json"
{
  "paymentRequestID": "ce261508-1bd3-4876-b5ca-fb761de43d4d"
}
```

Use the Support API endpoint to generate the EDI

```sh title="Run this command"
bin/prime-api-client --insecure support-get-payment-request-edi --filename payload.json | jq -r .edi
```

```sh title="Previous command output"
ISA*00*0084182369*00*0000000000*ZZ*MILMOVE        *12*8004171844     *210116*0834*U*00401*000000002*0*T*|
GS*SI*MILMOVE*8004171844*20210116*0834*100001251*X*004010
ST*858*0001
BX*00*J*PP*5405-6058*TRUS**4
N9*CN*5405-6058-1**
N9*CT*TRUSS_TEST**
N9*1W*Leo, Spacemen**
N9*ML*E_1**
N9*3L*ARMY**
G62*10*20210115**
G62*76*20210114**
G62*86*20200316**
N1*BY*JPPSO Testy McTest*92*LKNQ
N1*SE*Prime*2*PRME
N1*ST*Fort Gordon*10*CNNQ
N3*Fort Gordon*
N4*Augusta*GA*30813*USA**
PER*CN**TE*706-791-4184
N1*SF*umRSlGJ7mP*10*LKNQ
N3*987 Other Avenue*P.O. Box 1234
N4*Des Moines*IA*50309*USA**
PER*CN**TE*(510) 555-5555
HL*1**I
N9*PO*5405-6058-a492e26c**
L5*1*FSC*TBD*D**
L0*1*354.000*DM*1349.000*B******L
L1*1*1349*LB*34400
FA1*DY
FA2*TA*F8E1
HL*2**I
N9*PO*5405-6058-740cb8c2**
L5*2*CS*TBD*D**
L0*2**********
L1*2*0**2235300
FA1*DY
FA2*TA*F8E1
HL*3**I
N9*PO*5405-6058-1044cdb9**
L5*3*DSH*TBD*D**
L0*3*388.000*DM*1349.000*B******L
L1*3*1349*LB*47543300
FA1*DY
FA2*TA*F8E1
HL*4**I
N9*PO*5405-6058-6233632d**
L5*4*DLH*TBD*D**
L0*4*354.000*DM*1349.000*B******L
L1*4*1349*LB*115948500
FA1*DY
FA2*TA*F8E1
L3*****1657615
SE*50*0001
GE*1*100001251
IEA*1*000000002
```

### Update status of Payment Request

To update the status of one payment request you can trigger the reviewed payment request processor.

:::note
*The payment request processor will only apply changes to payment requests in
the Reviewed status*
:::

Save one of the below JSON snippets to `payload.json` and run the following command to change the status

```sh title="Run this command"
prime-api-client --insecure support-reviewed-payment-requests --filename tmp/payloads/process_payment.json|jq .
```


```json title="Example of previous command output"
[
  {
    "eTag": "MjAyMS0wMS0xNlQwODo0Nzo1Ni41NDczMjRa",
    "id": "cfd110d4-1f62-401c-a92c-39987a0b4228",
    "isFinal": false,
    "moveTaskOrderID": "7cbe57ba-fd3a-45a7-aa9a-1970f1908ae7",
    "paymentRequestNumber": "2387-4783-1",
    "status": "SENT_TO_GEX"
  },
  {
    "eTag": "MjAyMS0wMS0xNlQwODo0Nzo1Ni41NTI4Nlo=",
    "id": "cfd110d4-1f62-401c-a92c-39987a0b4229",
    "isFinal": false,
    "moveTaskOrderID": "7cbe57ba-fd3a-45a7-aa9a-1970f1908ae8",
    "paymentRequestNumber": "9644-7573-1",
    "status": "SENT_TO_GEX"
  },
  {
    "eTag": "MjAyMS0wMS0xNlQwODo0Nzo1Ni41NTU5NjZa",
    "id": "ce261508-1bd3-4876-b5ca-fb761de43d4d",
    "sFinal": false,
    "moveTaskOrderID": "9c7b255c-2981-4bf8-839f-61c7458e2b4d",
    "paymentRequestNumber": "5405-6058-1",
    "status": "SENT_TO_GEX"
  }
]
```

Below are 3 examples of the status update JSON

```json title="JSON to update status of all reviewed paymentrequests to SENT_TO_GEX"
{
  "body": {
    "sendToSyncada": false
  }
}
```

```json title="JSON to update status of all reviewed paymentrequests to another one"
{
  "body": {
    "status": "PAID",
    "sendToSyncada": false
  }
}
```

```json title="JSON to update status of one reviewed paymentrequest to SENT_TO_GEX"
{
  "body": {
    "paymentRequestID": "ce261508-1bd3-4876-b5ca-fb761de43d4d",
    "sendToSyncada": false
  }
}
```

```json title="JSON to update status of one reviewed paymentrequest to something else"
{
  "body": {
    "paymentRequestID": "ce261508-1bd3-4876-b5ca-fb761de43d4d",
    "status": "PAID",
    "sendToSyncada": false
  }
}
```

### Generate and send EDI to Syncada

To send to Syncada you will need to make use of the reviewed payment request processor

:::note
*The payment request processor will only apply changes to payment requests in
the Reviewed status*
:::

:::note
*This can be run locally if you have the SYNCADA credentials from Chamber*
:::

:::note
*The `paymentRequestID` parameter is ignored if `sendToSyncada` is set to true*
:::


```json title="Save the following JSON to payload.json"
{
  "body": {
    "sendToSyncada": true
  }
}
```

```sh title="Run this command"
prime-api-client --insecure support-reviewed-payment-requests --filename payload.json | jq .
```

```json title="Example of previous command output"
[
  {
    "eTag": "MjAyMS0wMS0xNlQwODo0Nzo1Ni41NDczMjRa",
    "id": "cfd110d4-1f62-401c-a92c-39987a0b4228",
    "isFinal": false,
    "moveTaskOrderID": "7cbe57ba-fd3a-45a7-aa9a-1970f1908ae7",
    "paymentRequestNumber": "2387-4783-1",
    "status": "SENT_TO_GEX"
  },
  {
    "eTag": "MjAyMS0wMS0xNlQwODo0Nzo1Ni41NTI4Nlo=",
    "id": "cfd110d4-1f62-401c-a92c-39987a0b4229",
    "isFinal": false,
    "moveTaskOrderID": "7cbe57ba-fd3a-45a7-aa9a-1970f1908ae8",
    "paymentRequestNumber": "9644-7573-1",
    "status": "SENT_TO_GEX"
  },
  {
    "eTag": "MjAyMS0wMS0xNlQwODo0Nzo1Ni41NTU5NjZa",
    "id": "ce261508-1bd3-4876-b5ca-fb761de43d4d",
    "sFinal": false,
    "moveTaskOrderID": "9c7b255c-2981-4bf8-839f-61c7458e2b4d",
    "paymentRequestNumber": "5405-6058-1",
    "status": "SENT_TO_GEX"
  }
]
```

## References

Some helpful resources for getting this setup

* [Acceptance Testing Payment Requests](acceptance-testing-payment-requests.md)
* [Manually run Prime API for Slice demo](manually-run-prime-api-for-slice-demo.md)
