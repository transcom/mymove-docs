---
sidebar_position: 2
---
# Backend Structure

This article provides a high-level overview of the MilMove backend. It is intended for folks who are brand new to the project and need some guidance to navigate through the complexity and clutter in our codebase. It is not intended to be an in-depth analysis of _why_ our backend is the way it is.

## The Server

So what is a server? You can google this question and get loads of dense, complicated answers back. But practically, what is our MilMove server and how do we work with it?

At the lowest level, our server is a Go script. We run a Go command that executes a process with multiple concurrent channels that "listen" for requests to our APIs. (TODO: Add a link to the Go concurrency exercise in A Tour to Go in case folks what to learn more about concurrency) This same script also exits the server. Basically, we run one command for a really long time to serve up our MilMove APIs.

This command is in `cmd/milmove/serve.go`. This file contains the entire lifecycle of our server. We're not going to change this very often, so although it's nice to know where to find it, you'll rarely have to go into this file during your day-to-day.

Naturally, this command doesn't handle all of our backend logic. We store the
bulk of our server code elsewhere, and the `serve.go` file simply references it
at the right times. The rest of our backend code is in the `pkg/` folder. There
are some, _small_ exceptions, but practically all backend logic should be found
in here. `pkg/` is the backend developer's home base.

:::tip Terminology

A lot of concepts in the backend have shared terminology. We have the concept of an "**endpoint**," but it can be called different things depending on which part of the stack you're in. For example, an "endpoint" in the API YAML file actually goes under the `paths:` category. So "endpoint" = "**path**" in this context.

In the YAML file, we also have a property on each path called `operationId:`. This is the unique name for your endpoint, or "path." Now "endpoint" = "path" = "**operation**."

In the backend, we also use "**handler**" functions to execute the logic for our endpoints. You will see the terms "handler" and "endpoint" used interchangeably throughout our documentation. Keep in mind that these things all tie back to the same concept, and remember that tech terminology is unfair and wacky.

:::

## The Backend: `pkg/`




`gen/` - the generated Swagger code. No development happens here, but this is where any changes to the API YAML spec will be reflected

`handlers/` - contains our receiving functions for all of our endpoints. We call them "handler functions." Each endpoint (or path or operation, as mentioned above) will have a distinct handler function.

So how do you find the handler function for the endpoint you're looking at?

Within `handlers/`, each API file will have its own sub-package. So the
`ghc.yaml` API file will have a package called `ghcapi/`. See below:

```
handlers/
├── ghcapi/
├── ...
```

Now go back to your API definition in the YAML file. You should see a `tags:` key. It will look like:

```yaml
/mto-shipments:
  post:
    summary: createMTOShipment
    description: |
      ...
    consumes:
      - application/json
    produces:
      - application/json
    operationId: createMTOShipment
    tags:
      - mtoShipment
```

Here we see the tag `mtoShipment`. This will correspond directly with a Go file within the `internalapi/` package in the backend. So now you know you're looking for the `mto_shipment.go` file:

```
handlers/
├── ghcapi/
│   ├── mto_shipment.go
│   ├── ...
├── ...
```

Back in the API definition again, this time look for the `operationId:` key. If you look at the example above, you can see we have the value `createMTOShipment` as our operation ID for this endpoint.

Within the `mto_shipment.go` file, we now know we're looking for a struct called
`CreateMTOShipmentHandler`. This struct will have an associated `Handle()`
function. Almost all of the logic (save for authentications, and some validation
in the generated Swagger files) for your the action your endpoint represents is
executed from this function.

Although this function executes the logic for this endpoint's action, it generally calls other functions to complete the bulk of the business logic. In the MilMove codebase, we have a concept of "services." Services are shared business logic that we use across all of our APIs - see below (TODO LINK) for a more in-depth explanation.

In the struct for the handler (`CreateMTOShipmentHandler` in this example), you'll see that some services are defined ...

`services/` - contains the code for our "service objects." Service objects, or services, are utility functions that access the database. Generally, no other part of the codebase should be directly accessing the database (although there are always exceptions to any rule).

`models/` - NOTE: explain the difference between models and database access. Explain the role models serve in the ORM.

`testdatagen/` - NOTE: kind of an aside - uses the models to make test data in test database (but could work in any DB...)

The other top-level packages in the backend are for niche processes that most folks won't interact with. Your day-to-day will be in these four folders (not including `gen/` since those are generated files).







NOTE: Middleware... If we have a comprehensive guide, it might be:
- Server/Backend Introduction
	- Day-to-Day Overview
	- Guide to Middleware
	- In depth on Service Objects
	- Models (and Database interactions?)
	- The Pricer/Rate engine?

In docusaurus, have a "Guides" section for tutorials and the like. Point new folks here.
