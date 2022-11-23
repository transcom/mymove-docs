"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[4586],{4418:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var a=n(87462),o=(n(67294),n(3905));n(16758);const i={sidebar_position:2},r="Backend Structure",l={unversionedId:"backend/guides/backend-structure",id:"backend/guides/backend-structure",title:"Backend Structure",description:"This article provides a high-level overview of the MilMove backend. It is intended for folks who are brand new to the project and need some guidance to navigate through the complexity and clutter in our codebase. It is not intended to be an in-depth analysis of why our backend is the way it is.",source:"@site/docs/backend/guides/backend-structure.md",sourceDirName:"backend/guides",slug:"/backend/guides/backend-structure",permalink:"/mymove-docs/docs/backend/guides/backend-structure",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/backend/guides/backend-structure.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"backendSidebar",previous:{title:"Usage",permalink:"/mymove-docs/docs/backend/guides/service-objects/usage"},next:{title:"Adding ShipmentLineItem records to the 400ng table (tariff400ng_items)",permalink:"/mymove-docs/docs/backend/guides/tariff400ng_items-update-data"}},s={},d=[{value:"The Server",id:"the-server",level:2},{value:"The Backend: <code>pkg/</code>",id:"the-backend-pkg",level:2}],c={toc:d};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"backend-structure"},"Backend Structure"),(0,o.kt)("p",null,"This article provides a high-level overview of the MilMove backend. It is intended for folks who are brand new to the project and need some guidance to navigate through the complexity and clutter in our codebase. It is not intended to be an in-depth analysis of ",(0,o.kt)("em",{parentName:"p"},"why")," our backend is the way it is."),(0,o.kt)("h2",{id:"the-server"},"The Server"),(0,o.kt)("p",null,"So what is a server? You can google this question and get loads of dense, complicated answers back. But practically, what is our MilMove server and how do we work with it?"),(0,o.kt)("p",null,'At the lowest level, our server is a Go script. We run a Go command that executes a process with multiple concurrent channels that "listen" for requests to our APIs. (TODO: Add a link to the Go concurrency exercise in A Tour to Go in case folks what to learn more about concurrency) This same script also exits the server. Basically, we run one command for a really long time to serve up our MilMove APIs.'),(0,o.kt)("p",null,"This command is in ",(0,o.kt)("inlineCode",{parentName:"p"},"cmd/milmove/serve.go"),". This file contains the entire lifecycle of our server. We're not going to change this very often, so although it's nice to know where to find it, you'll rarely have to go into this file during your day-to-day."),(0,o.kt)("p",null,"Naturally, this command doesn't handle all of our backend logic. We store the\nbulk of our server code elsewhere, and the ",(0,o.kt)("inlineCode",{parentName:"p"},"serve.go")," file simply references it\nat the right times. The rest of our backend code is in the ",(0,o.kt)("inlineCode",{parentName:"p"},"pkg/")," folder. There\nare some, ",(0,o.kt)("em",{parentName:"p"},"small")," exceptions, but practically all backend logic should be found\nin here. ",(0,o.kt)("inlineCode",{parentName:"p"},"pkg/")," is the backend developer's home base."),(0,o.kt)("admonition",{title:"Terminology",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},'A lot of concepts in the backend have shared terminology. We have the concept of an "',(0,o.kt)("strong",{parentName:"p"},"endpoint"),'," but it can be called different things depending on which part of the stack you\'re in. For example, an "endpoint" in the API YAML file actually goes under the ',(0,o.kt)("inlineCode",{parentName:"p"},"paths:"),' category. So "endpoint" = "',(0,o.kt)("strong",{parentName:"p"},"path"),'" in this context.'),(0,o.kt)("p",{parentName:"admonition"},"In the YAML file, we also have a property on each path called ",(0,o.kt)("inlineCode",{parentName:"p"},"operationId:"),'. This is the unique name for your endpoint, or "path." Now "endpoint" = "path" = "',(0,o.kt)("strong",{parentName:"p"},"operation"),'."'),(0,o.kt)("p",{parentName:"admonition"},'In the backend, we also use "',(0,o.kt)("strong",{parentName:"p"},"handler"),'" functions to execute the logic for our endpoints. You will see the terms "handler" and "endpoint" used interchangeably throughout our documentation. Keep in mind that these things all tie back to the same concept, and remember that tech terminology is unfair and wacky.')),(0,o.kt)("h2",{id:"the-backend-pkg"},"The Backend: ",(0,o.kt)("inlineCode",{parentName:"h2"},"pkg/")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"gen/")," - the generated Swagger code. No development happens here, but this is where any changes to the API YAML spec will be reflected"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"handlers/"),' - contains our receiving functions for all of our endpoints. We call them "handler functions." Each endpoint (or path or operation, as mentioned above) will have a distinct handler function.'),(0,o.kt)("p",null,"So how do you find the handler function for the endpoint you're looking at?"),(0,o.kt)("p",null,"Within ",(0,o.kt)("inlineCode",{parentName:"p"},"handlers/"),", each API file will have its own sub-package. So the\n",(0,o.kt)("inlineCode",{parentName:"p"},"ghc.yaml")," API file will have a package called ",(0,o.kt)("inlineCode",{parentName:"p"},"ghcapi/"),". See below:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"handlers/\n\u251c\u2500\u2500 ghcapi/\n\u251c\u2500\u2500 ...\n")),(0,o.kt)("p",null,"Now go back to your API definition in the YAML file. You should see a ",(0,o.kt)("inlineCode",{parentName:"p"},"tags:")," key. It will look like:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"/mto-shipments:\n  post:\n    summary: createMTOShipment\n    description: |\n      ...\n    consumes:\n      - application/json\n    produces:\n      - application/json\n    operationId: createMTOShipment\n    tags:\n      - mtoShipment\n")),(0,o.kt)("p",null,"Here we see the tag ",(0,o.kt)("inlineCode",{parentName:"p"},"mtoShipment"),". This will correspond directly with a Go file within the ",(0,o.kt)("inlineCode",{parentName:"p"},"internalapi/")," package in the backend. So now you know you're looking for the ",(0,o.kt)("inlineCode",{parentName:"p"},"mto_shipment.go")," file:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"handlers/\n\u251c\u2500\u2500 ghcapi/\n\u2502   \u251c\u2500\u2500 mto_shipment.go\n\u2502   \u251c\u2500\u2500 ...\n\u251c\u2500\u2500 ...\n")),(0,o.kt)("p",null,"Back in the API definition again, this time look for the ",(0,o.kt)("inlineCode",{parentName:"p"},"operationId:")," key. If you look at the example above, you can see we have the value ",(0,o.kt)("inlineCode",{parentName:"p"},"createMTOShipment")," as our operation ID for this endpoint."),(0,o.kt)("p",null,"Within the ",(0,o.kt)("inlineCode",{parentName:"p"},"mto_shipment.go")," file, we now know we're looking for a struct called\n",(0,o.kt)("inlineCode",{parentName:"p"},"CreateMTOShipmentHandler"),". This struct will have an associated ",(0,o.kt)("inlineCode",{parentName:"p"},"Handle()"),"\nfunction. Almost all of the logic (save for authentications, and some validation\nin the generated Swagger files) for your the action your endpoint represents is\nexecuted from this function."),(0,o.kt)("p",null,'Although this function executes the logic for this endpoint\'s action, it generally calls other functions to complete the bulk of the business logic. In the MilMove codebase, we have a concept of "services." Services are shared business logic that we use across all of our APIs - see below (TODO LINK) for a more in-depth explanation.'),(0,o.kt)("p",null,"In the struct for the handler (",(0,o.kt)("inlineCode",{parentName:"p"},"CreateMTOShipmentHandler")," in this example), you'll see that some services are defined ..."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"services/"),' - contains the code for our "service objects." Service objects, or services, are utility functions that access the database. Generally, no other part of the codebase should be directly accessing the database (although there are always exceptions to any rule).'),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"models/")," - NOTE: explain the difference between models and database access. Explain the role models serve in the ORM."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"testdatagen/")," - NOTE: kind of an aside - uses the models to make test data in test database (but could work in any DB...)"),(0,o.kt)("p",null,"The other top-level packages in the backend are for niche processes that most folks won't interact with. Your day-to-day will be in these four folders (not including ",(0,o.kt)("inlineCode",{parentName:"p"},"gen/")," since those are generated files)."),(0,o.kt)("p",null,"NOTE: Middleware... If we have a comprehensive guide, it might be:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Server/Backend Introduction",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Day-to-Day Overview"),(0,o.kt)("li",{parentName:"ul"},"Guide to Middleware"),(0,o.kt)("li",{parentName:"ul"},"In depth on Service Objects"),(0,o.kt)("li",{parentName:"ul"},"Models (and Database interactions?)"),(0,o.kt)("li",{parentName:"ul"},"The Pricer/Rate engine?")))),(0,o.kt)("p",null,'In docusaurus, have a "Guides" section for tutorials and the like. Point new folks here.'))}p.isMDXComponent=!0}}]);