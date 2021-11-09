---
sidebar_position: 4
---

# GHC Invoicing Sequence Text

The text used to generate the [GHC Invoice Overview Sequence diagram](https://miro.com/app/board/o9J_ls9Gt7E=/?moveToWidget=3074457365163319192&cot=14) is here.
You can use something like https://sequencediagram.org/ to generate a new and make changes.


```
note over Prime, PaymentRequest: Prime requests payment for services rendered
Prime->PaymentRequest: Create PaymentRequest
loop for each MTOServiceItem
note over PaymentRequest, ServcieParamValueLookups, GHCRateEnginePricer: Invoicing creates and prices a payment request
PaymentRequest->PaymentRequest: Create PaymentRequestServiceItem that maps to the MTOServiceItem
PaymentRequest->ServcieParamValueLookups: Lookup values for each PaymentServiceItemServiceParam
PaymentRequest->PaymentRequest: Create PaymentServiceItemServiceParam
PaymentRequest->GHCRateEnginePricer: Price PaymentRequestServiceItem
end
Prime->PaymentRequest: Upload ProofOfServiceDocs
note over TIO, PaymentRequest: TIO UI is able to view the payment request and details about service item inputs used.\nTIO will approve or reject the service items
TIO->PaymentRequest: Query database to view PaymentRequest and query details about PaymentRequestServiceItem & PaymentServiceItemServiceParams
loop for each PaymentRequestServiceItem
TIO->TIO: Review and approve/request PaymentRequestServiceItem
end
TIO->TIO: Approve PaymentRequest
note over PaymentRequestReviewedProcessor, PaymentRequestReviewedProcessor: Aysnc task that runs at a set interval. Polls  the database for REVIEWED payment requests and generates EDI 858s to send to Syncada\nChecks the GEX SFTP servers for EDI responses from Syncada
loop for each REVIEWED PaymentRequest
PaymentRequestReviewedProcessor->PaymentRequestReviewedProcessor: Queries database for REVIWED PaymentRequests
PaymentRequestReviewedProcessor->Invoice: Calls GHCPaymentRequestInvoiceGenerator and creates an EDI
PaymentRequestReviewedProcessor->Invoice: Send EDI to Syncada
end
loop for each 824
PaymentRequestReviewedProcessor->PaymentRequestReviewedProcessor: Checks SFTP folder for 824an EDI
PaymentRequestReviewedProcessor->Invoice: Call EDI824Processor
end
loop for each 997
PaymentRequestReviewedProcessor->PaymentRequestReviewedProcessor: Checks SFTP folder for 997
PaymentRequestReviewedProcessor->Invoice: Call EDI997Processor
end

```
