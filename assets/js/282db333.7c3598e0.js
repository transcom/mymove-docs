"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[5149],{87283:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>d,default:()=>p,frontMatter:()=>o,metadata:()=>r,toc:()=>s});var a=n(87462),i=(n(67294),n(3905));n(16758);const o={title:"How to add an event trigger",sidebar_position:1},d=void 0,r={unversionedId:"backend/guides/how-to/add-an-event-trigger",id:"backend/guides/how-to/add-an-event-trigger",title:"How to add an event trigger",description:"Overview",source:"@site/docs/backend/guides/how-to/add-an-event-trigger.md",sourceDirName:"backend/guides/how-to",slug:"/backend/guides/how-to/add-an-event-trigger",permalink:"/mymove-docs/docs/backend/guides/how-to/add-an-event-trigger",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/backend/guides/how-to/add-an-event-trigger.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"How to add an event trigger",sidebar_position:1},sidebar:"backendSidebar",previous:{title:"How to Access a Global Application Variable",permalink:"/mymove-docs/docs/backend/guides/access-global-variables"},next:{title:"How to handle errors",permalink:"/mymove-docs/docs/backend/guides/how-to/handle-errors"}},l={},s=[{value:"Overview",id:"overview",level:2},{value:"<strong>RULE OF THUMB - Every endpoint in the ghcapi.yaml file should have an event trigger call in the top level handler.</strong>",id:"rule-of-thumb---every-endpoint-in-the-ghcapiyaml-file-should-have-an-event-trigger-call-in-the-top-level-handler",level:3},{value:"How do I trigger an event",id:"how-do-i-trigger-an-event",level:3},{value:"TriggerEvent function",id:"triggerevent-function",level:2},{value:"Which Event Should I trigger?",id:"which-event-should-i-trigger",level:3},{value:"FAQ",id:"faq",level:2},{value:"What is the UpdatedObjectID?",id:"what-is-the-updatedobjectid",level:3},{value:"What is the MtoID?",id:"what-is-the-mtoid",level:3},{value:"What if my endpoint doesn&#39;t exist?",id:"what-if-my-endpoint-doesnt-exist",level:3},{value:"Reference",id:"reference",level:2}],h={toc:s};function p(e){let{components:t,...o}=e;return(0,i.kt)("wrapper",(0,a.Z)({},h,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"overview"},"Overview"),(0,i.kt)("p",null,"Events are triggered when objects in the db are created, updated or deleted in endpoints."),(0,i.kt)("p",null,"We trigger events so we can perform other actions that were not specifically requested by the handler, sort of like side effects."),(0,i.kt)("p",null,"The primary use case is to send a webhook notification to Prime, if the event is of interest to Prime."),(0,i.kt)("p",null,"For more details, see the ",(0,i.kt)("a",{parentName:"p",href:"https://docs.google.com/document/d/1tq2jWvuLXEv30Bab2S-nSj9V1bAzLrPk7DZo3xLX9-o/edit#heading=h.5x0d5h95i329"},"Webhooks for Milmove Design Doc"),"."),(0,i.kt)("h3",{id:"rule-of-thumb---every-endpoint-in-the-ghcapiyaml-file-should-have-an-event-trigger-call-in-the-top-level-handler"},(0,i.kt)("strong",{parentName:"h3"},"RULE OF THUMB - Every endpoint in the ghcapi.yaml file should have an event trigger call in the top level handler.")),(0,i.kt)("p",null,"Read on to understand how to add the event trigger."),(0,i.kt)("h3",{id:"how-do-i-trigger-an-event"},"How do I trigger an event"),(0,i.kt)("p",null,"You trigger an event by inserting a call to TriggerEvent on the SUCCESSFUL completion of the handler's action."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Here's an example:")),(0,i.kt)("p",null,'Imagine the TOO hits the "Authorize Payment" button.'),(0,i.kt)("p",null,"This calls the ",(0,i.kt)("inlineCode",{parentName:"p"},"ghcapi")," endpoint ",(0,i.kt)("inlineCode",{parentName:"p"},"updatePaymentRequestStatus")," and runs the handler."),(0,i.kt)("p",null,"In the handler, the code updates the Payment Request object in the db with the new status."),(0,i.kt)("p",null,"If it is able to ",(0,i.kt)("strong",{parentName:"p"},"successfully")," update the object, it must trigger the ",(0,i.kt)("inlineCode",{parentName:"p"},"PaymentRequest.Update")," event."),(0,i.kt)("p",null,"To do so it makes a call to ",(0,i.kt)("inlineCode",{parentName:"p"},"event.TriggerEvent")," and passes on a bunch of useful information how which endpoint was called, by whom, and what the action was taken."),(0,i.kt)("p",null,"If the actual payment request update failed, we don't trigger the event as there was no successful action taken."),(0,i.kt)("h2",{id:"triggerevent-function"},"TriggerEvent function"),(0,i.kt)("p",null,"Here's the call we'd make to ",(0,i.kt)("inlineCode",{parentName:"p"},"event.TriggerEvent"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-go"},'_, err = event.TriggerEvent(event.Event{\n    EndpointKey:     event.SupportUpdatePaymentRequestStatusEndpointKey,\n                                                            // Endpoint that is being handled\n    EventKey:        event.PaymentRequestUpdateEventKey,    // Event that you want to trigger\n    UpdatedObjectID: updatedPaymentRequest.ID,              // ID of the updated logical object\n    MtoID:           mtoID,                                 // ID of the associated Move\n    Request:         params.HTTPRequest,                    // Pass on the http.Request\n    DBConnection:    h.DB(),                                // Pass on the pop.Connection\n    HandlerConfig:   h,                                     // Pass on the handlerConfig\n})\n// If the event trigger fails, just log the error.\nif err != nil {\n    logger.Error("supportapi.UpdatePaymentRequestStatusHandler could not generate the event")\n}\n')),(0,i.kt)("p",null,"The event code is located in ",(0,i.kt)("inlineCode",{parentName:"p"},"pkg/services/event/event.go"),"."),(0,i.kt)("h3",{id:"which-event-should-i-trigger"},"Which Event Should I trigger?"),(0,i.kt)("p",null,"There are too many tables in our MTO to update the Prime about. To reduce the granularity, we have grouped the tables into the following logical objects or entities."),(0,i.kt)("p",null,"The boxes are the logical objects and the blue highlighted names are the db table names."),(0,i.kt)("p",null,"The events are always ",(0,i.kt)("inlineCode",{parentName:"p"},"<LogicalObject>.<Verb>")," events, so if you update any table under PAYMENT REQUESTS, like payment_service_items, the event is ",(0,i.kt)("inlineCode",{parentName:"p"},"PaymentRequest.Update"),"."),(0,i.kt)("p",null,(0,i.kt)("img",{src:n(90501).Z,width:"704",height:"682"})),(0,i.kt)("h2",{id:"faq"},"FAQ"),(0,i.kt)("h3",{id:"what-is-the-updatedobjectid"},"What is the UpdatedObjectID?"),(0,i.kt)("p",null,"When you call the ",(0,i.kt)("inlineCode",{parentName:"p"},"TriggerEvent"),", you have to pass in the UpdatedObjectID. The updated object is again, the logical object that got updated. If you updated payment_service_items, your UpdatedObjectID is the UUID of the associated Payment Request."),(0,i.kt)("h3",{id:"what-is-the-mtoid"},"What is the MtoID?"),(0,i.kt)("p",null,"The MtoID is the UUID of the overall parent Move. (It is called MtoID because we recently consolidated the Move and MTO tables so in our DB they are the same, but Prime understands Move Task Order)"),(0,i.kt)("h3",{id:"what-if-my-endpoint-doesnt-exist"},"What if my endpoint doesn't exist?"),(0,i.kt)("p",null,"Originally we wrote a script to quickly generate all the current endpoints. But as new endpoints are added, you can manually update the appropriate map with the new endpoint."),(0,i.kt)("p",null,"The endpoints are stored in a map in ",(0,i.kt)("inlineCode",{parentName:"p"},"pkg/services/event/{api}_endpoint.go"),".\nThere you need to add an entry for your endpoint.\nThe key name is defined by the ",(0,i.kt)("inlineCode",{parentName:"p"},"operationID")," in the yaml. Please follow the pattern."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'// GhcUpdatePaymentRequestStatusEndpointKey is the key for the updatePaymentRequestStatus endpoint in ghc\nconst GhcUpdatePaymentRequestStatusEndpointKey = "Ghc.UpdatePaymentRequestStatus"\n')),(0,i.kt)("p",null,"And then add that key into the map."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'var ghcEndpoints = EndpointMapType{\n...\n  GhcUpdatePaymentRequestStatusEndpointKey: {\n    APIName:     GhcAPIName,\n    OperationID: "updatePaymentRequestStatus",\n},\n')),(0,i.kt)("p",null,"After that, you have a new endpoint you can pass in with your event trigger."),(0,i.kt)("h2",{id:"reference"},"Reference"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/mymove-docs/docs/backend/testing/acceptance-testing-notifications"},"Acceptance testing notifications"))))}p.isMDXComponent=!0},90501:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/push-objects-fed3803c5ca838daa527f160ae2719b6.png"}}]);