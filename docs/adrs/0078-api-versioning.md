---
title: 0078 API Versioning
description: How to implement API Versioning
---

# How to implement API Versioning for Prime API

**User Story:** *[MB-15994](https://dp3.atlassian.net/browse/MB-15994)*

## Problem Statement
In order to support the Prime API Integration and prevent introducing potential breaking changes to the API, MilMove needs to version future updates to the Prime API. This ADR will attempt to address the "How?" questions associated with this endeavor. While some of the challenges involved are technical in nature, much of the challenge is coming up with patterns that are clear, understandable, and acceptable to the members of the engineering team.

There are a few areas to consider when deciding how to implement API versioning:
* [The overall versioning strategy (URL patterns, query params, headers, etc.)](#options-for-versioning-strategy)
* [What endpoints will be incorporated into a new API version?](#codebase-management)
* An overall file organization strategy - This could even be broken up into categories to consider on their own, because we don't necessarily want to take the same organization approach for all areas of the application
  * [Swagger files](#swagger-organization)
  * [Handlers](#handler-organization)
  * [Services](#services-organization)
* [Documentation considerations](#documentation) - This is a necessity since it will be key ensuring the consumers of our API are informed on what is changed between versions

## API Versioning Strategy

### SemVer
The Prime API follows the SemVer (Semantic Versioning) convention, using a three-part version number: Major.Minor.Patch. Here's what each part signifies:

Major versions incorporate significant changes, including backward-incompatible API changes.

Minor versions add new features in a backwards-compatible manner.

Patch versions include backwards-compatible bug fixes.

For example, a version could be noted as "2.1.3," where '2' is the major version, '1' is the minor version, and '3' is the patch version.

#### Options on SemVer
* Option 1: Allow for the prime to specify which minor/patch version to use
  * Pros: Would be really granular for the consumer of our API.
  * Cons: Would be a heavy lift to retain former minor and patch versions of our endpoints for the deprecation period.
* Option 2: Use the most recent minor/patch versions for the respective major version, and only allow the prime to specify which major version to use.
  * Pros: Easier to implement. For our purposes we do not need to get too complicated.
  * Cons: Not as granular for the prime in choosing what is returned.

**Chosen Alternative**: Option 2. This meets our requirements and is easier to implement. We will use the minor/patch versions to note changes in our API.

### Options for Versioning Strategy
There are a few options for implementing api versioning in our prime API.

* Option 1: Include version in the URL patterns.
  * Pros: This is the simplest option. We currently have `/v1/` in the paths of all of our APIs, and the implementation of our routing initialization can be easily modified to include multiple paths. If we went with some other option we would want to remove the `v1` from our outward facing APIs.
  * Cons: Could lead to a big footprint in the codebase when branching the API.
* Option 2: Indicate version based on query parameters.
  * Pros: Easy to default to the latest version
  * Cons: Difficult to route requests. Would need to modify our current routing processes to account for this. Would have a similar effect on the codebase footprint as option 1.
* Option 3: Custom headers for versioning.
  * Pros: Similar to the previous 2 but does not clutter up the URL path with version information
  * Cons: Would require us to create the infrastructure to route based on these custom headers. Would have a similar effect on the codebase footprint as option 1.
* Option 4: Versioning through Content Negotiation or media type. Customize the accept media type header to specify the versioning.
  * Pros: Can version directly at the resource level.
  * Cons: Difficult to test. Would be a heavy lift as we would have to refactor our routing infrastructure. Potentially confusing for the consumers of our API.

**Chosen Alternative:** Option 1. This would be the most straightforward approach and easiest lift as it
 builds off of our current routing for our API.

### Codebase management
In order to mitigate the potential for our codebase to swell in size as we branch off versions of our
APIs, we need to address which endpoints will get pulled into the new versions.

* Option 1: Pull in each endpoint as the need to implement breaking changes arises.
  * When the first endpoint needs to be refactored to introduce a breaking change to the prime API, then a version 2 API will be created containing that one endpoint. That endpoint would be deprecated over time in version 1. More endpoints would be brought in to version 2 as the need arises.
  * Pros: Much easier lift. Lessens the size of our codebase.
  * Cons: Could be more confusing for the consumers of our API since not all endpoints are on each version
* Option 2: Branch off the API to contain all endpoints for each version.
  * Pros: Each version would have all endpoints
  * Cons: Increased codebase footprint. Would introduce the need for further versions as the need more breaking occurs again.

**Chosen Alternative:** Option 1. This would keep the codebase from swelling in size and would be easier for the engineers to maintain. With this approach we would need to address issues in documentation and file organization, which will be discussed below.

### File/Code Organization
In the process of versioning our API, we will need to have some agreed upon patterns for organizing our files and code. There are three general areas we should consider and the file organization might differ based on the section of the code we are talking about.

#### Swagger Organization

**Current Setup:** In our swagger-def files we currently have a file for each api (`prime.yaml`, `ghc.yaml`, etc.). We also have some shared files in the `definitions`, `parameters`, `paths`, `responses` and `tags` directories. Some of the definitions in our swagger-def yaml files reference these shared definitions and some do not. Here is an [example](https://github.com/transcom/mymove/blob/66fdbaab15ea26e669195bf14f04a5a840d9795c/swagger-def/ghc.yaml#L3158-L3162) of where `current_address` uses the shared definitions, whereas `backup_contact` uses an internal defnition.

* Option 1: Keep a singular prime swagger-def file and modify the paths to point to either v1 or v2.
  * Pros: It would be less files to manage, especially the generated swagger and server files.
  * Cons: It would make it difficult to tell the two APIs apart. It would introduce the risk of modifying a definition that would introduce a breaking change to one or both versions. It would make the handlers and services more confusing to keep them in order.
* Option 2: Have an entirely separate version 2 swagger file. It would be best to also create a subdirectory under the definitions for any version 2 definitions that are not internally defined, to avoid reuse.
  * Pros: It would be easier to keep the definitions separate and avoid accidental introduction of breaking changes. It would enable us to use the generated code for our handlers and payload/model files.
  * Cons: More generated files to manage

**Chosen Alternative:** Option 2. While it does increase the number of files, it will be clearer to differentiate and easier to maintain a separate swagger file and its accompanying generated files. [You can see an example in this commit](https://github.com/transcom/mymove/pull/10816/commits/0f387d655e098e589b10ab27b388bc771e873f09).

#### Handler Organization

Since we will be generating separate `*messages` and `*operations` packages for the version 2 api, it would make sense then to create a separate directory for the version 2 handlers. This will make it easier to differentiate the handlers from different versions, and ensure we are using the correct generated code for that handler.

You can see an example of utilizing the generated code in the handlers and creating the necessary routing [in this commit](https://github.com/transcom/mymove/pull/10816/commits/0c4be3bab159a49f83e407830a9fecb9d27278da).

#### Services Organization

This is where there are a few options to organize our services. And I am currently unsure about the best way to go.

Here are some questions to consider, when adding a new endpoint to our version 2 API:

1. What do we do if we create a new endpoint that requires changes to the service that is called? How do we organize the functions/files? Do we create a new file in the services folder? Should we store these services files in a separate v2 subdir? What is the naming structure going to look like?
2. What if the new endpoint does not require changes to the service? Should we make a new service anyway to prevent issues further down the line?


* Option 1: Rename the old version to something that indicates it is old and add the new version to the same interface.
  * Pros: As we remove the deprecated endpoints, we will have less code duplication.
  * Cons: It will be easier to use the wrong service with the wrong endpoint.
  * [Example can be seen here](https://github.com/transcom/mymove/pull/10816/commits/0913f2f4625450a2ac43b358e1890d17d77b747d)
* Option 2: Create a new interface and service for the new version. This can be separated out into a new file or put in the same services file. In the example linked below it is separated out into its own file.
  * Pros: Clear delineation between the two versions. You would not be able to mix up the new service with the old service since it does not use the same interface.
  * Cons: Repetitive code. Naming questions arise, in order to delineate the new from the old. Difficulty when dealing with more complicated services, especially when we use a service in another service.
  * [Example can be seen here](https://github.com/transcom/mymove/compare/0c4be3b...3769845)
* Option 3: Create subdirectories in the current services directories for each version. Pass along a version flag in the AppContext (or some other method). Use that flag to identify which version of the service to use.
  * Pros: Clear delineation between the two versions. There would not need to be a break from how we are currently utilizing our services and interfaces. We would only need to pull in the changed services into our subdirectories, which would lead to less code duplication.
  * Cons: We would need to ensure that our flagging system worked completely as intended in order to not accidentally introduce breaking changes.
  * [Example can be seen here](https://github.com/transcom/mymove/compare/0c4be3b...8ad4aed)

There are definitely other alternatives out there. Please feel free to suggest another.

**Chosen Alternative:** Option 3. It is dependent on reliably setting the api version flag and getting it to the services. However, once this is accomplished, this option best separates the different versions.

### Documentation
Communicating version changes to the prime will be crucial. We will want to deploy our prime V2 api docs
in the same manner that we deploy the [prime api docs](https://transcom.github.io/mymove-docs/api/prime).

We also might want to consider having a prime api specific release notes section in somewhere in the [API
section of our documentation](https://transcom.github.io/mymove-docs/docs/api).
However, that might be better for a documentation specific ADR.
