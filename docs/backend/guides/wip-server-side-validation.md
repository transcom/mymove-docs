---
sidebar_position: 20
---

# WIP server-side validation

## The (grossly over-simplified) layers of the MilMove server
- [Authentication](#authentication)
- [Swagger (OpenAPI)](#swagger-openapi)
- [Handlers](#handlers)
	- Payload-to-Model conversions (and the reverse)
- [Service Objects](#service-objects)
- [Models](#models)

In an ideal world, each of these layers would have a distinct purpose. Because we've never explicitly defined these purposes, learning where to find code while debugging an error, or where to write code when working on a new part of the app, is one of the steepest challenges on MilMove. We can immediately improve the accessibility of the project for new and junior engineers by establishing basic guidelines about what logic belongs in each of the server-side app layers.

I propose that we begin to write these guidelines starting with validation. Once we agree on where we validate each part of the user request, we can use that as a foundation to structure the rest of our codebase. Below is the validation structure I suggest for MilMove.

(Note that this is NOT an in-depth guide for how to interact with each layer in our system. It is only intended to be a high-level overview.)

### Authentication
This is where we authenticate the user. Any code related to permissions, sessions, certificates, etc, belongs here. No validation related to user input or the request body should be in this layer.

### Swagger (OpenAPI)
This is the first place where we'll see any input validation. After the server
authenticates the user, it tries to convert our request to the Go types defined
by the packages located in `./pkg/gen`. These files are generated using Swagger
Codegen, a tool that analyzes our API specification and converts it into Go
code. **We do not write any code in `./pkg/gen` - all of these files are
autogenerated.**

We can modify the generated Go code by updating our API specifications and then regenerating the files in `./pkg/gen`. Our API specifications are YAML files that have been written in the Swagger (OpenAPI v2.0) format and are kept in the top-level `./swagger` directory. Each one of these files corresponds to a distinct API being served up by MilMove.

(Is all this talk of "Swagger" and "OpenAPI" confusing to you? I recommend going through the official Swagger documentation as a first step. Start here: [What is OpenAPI?](https://swagger.io/docs/specification/about/))

The OpenAPI format gives us a lot of options when we're writing our API. When we define the fields that belong in the request body of an endpoint, we can use this format to tell Swagger how these fields should be validated. For example, we can add rules like `readOnly: True`, `format: date-time`, and `pattern: '^(\[2-9\]\\d{2}-\\d{3}-\\d{4})?$'` (the pattern for a phone number). Swagger will use this information when it generates the Go code for our server, and this code will then be able to validate the input data as expected.

It's important to note that by adding these rules to the API specification, we're not just telling Swagger how to validate the input - we're telling the user what kind of input is acceptable. Just like how we use these YAML files to generate Go code, we also use them to generate user-facing documentation. This will be our clients' primary resource for learning how to use our API.

When we rely on validation in the Swagger-generated Go code, we don't have much control over what those responses look like, and we don't have any control over possible exceptions or complex business rules. The true benefit of placing input validation in this layer is communicating with the client about what they need to know in order to use our API successfully. This layer is all about improving clarity and usability.

Any validation that can be reasonably defined using the OpenAPI format, without sacrificing readability, ease-of-use, or maintainability, should be included in the API specification.

### Handlers
The Handlers layer, located in `./pkg/handlers`, is the most organized. Every API on our server has its own package (`adminapi`, `primeapi`, etc), and every endpoint within that API has its own `Handle()` function. These functions are where we execute all of the required logic for a given endpoint.

When we work in this part of the codebase, we already know who our user is (or who they can be) and which API they came from by virtue of where we're writing our code. This structure makes it seem like the `Handle()` functions are a natural place to check API-level or user-specific business rules. However, this layer should **not** access the database - we reserve that functionality for the Service Objects (for reasons outlined in that section).

With business rules like "The Prime contractor cannot update a service item that already has an active payment request" or "The TOO can only see moves in the same GBLOC as their own transportation office," it becomes apparent that we will need to query the database in order to verify that these conditions have been met.

#### Payload-to-Model / Model-to-Payload functions
Due to Go's strict typing, we TODO EXPLAIN THAT SOME TYPE VALIDATION GOTTA HAPPEN HERE BUT THAT'S IT

### Service Objects
The service objects are how we access the database on MilMove. IMPORTANT

### Models
Models represent DATABASE TABLES