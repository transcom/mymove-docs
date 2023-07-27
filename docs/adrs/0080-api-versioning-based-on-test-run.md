---
title: 0080 API Versioning Code Organization
description: How to implement API Versioning
---

**Note:** This ADR updates and supersedes the sections of [ADR0078 API Versioning](./0078-api-versioning.md) about code organization.

_Previously we wrote [ADR0078 API Versioning](./0078-api-versioning.md) that suggested some approaches for how to handle API versioning. While it did include some code samples for what some of the different choices would potentially look like, without going through an practical change it would be hard to evaluate what the implications of these choices would be. As a result of our [test run](https://github.com/transcom/mymove/pull/10952), we decided that there were some areas that could be improved on._

# How to implement API Versioning for Prime API

Everything in the [previous ADR](./0078-api-versioning.md) outside of the file organization strategy is accurate and reflects the process that we follow for API versioning.

## File/Code Organization

### Swagger Organization

We are continuing to leverage [Option 2: Have an entirely separate version 2 swagger file](https://transcom.github.io/mymove-docs/docs/adrs/api-versioning#swagger-organization) from the original ADR.

Going through this approach we were able to confirm the existing pros and cons.

> Pros: It would be easier to keep the definitions separate and avoid accidental introduction of breaking changes. It would enable us to use the generated code for our handlers and payload/model files.
>
> Cons: More generated files to manage

**Additional Recommendations:** Try and reference existing definitions when possible and create new versions of the definitions when something changes. This should help identify the definitions that have been modified from version to version. You can see an example in this [PR](https://github.com/transcom/mymove/pull/10952/files#diff-ccf222ad69199a6edb2088799e4ac7f8118591dc804aff747293bf1e81262940). Having to copy over existing definitions from the previous version can be tedious and if this is done in the main yaml file it can make it hard to quickly identify what fields are being modified.

### Handler Organization

There are no updates to this section.

### Services Organization

This is where the largest deviation is.

Previously we were suggesting to go with [Option 3: Creating subdirectories and using flags](https://transcom.github.io/mymove-docs/docs/adrs/api-versioning#services-organization). This approach had the following pros and cons:

> Pros: Clear delineation between the two versions. There would not need to be a break from how we are currently utilizing our services and interfaces. We would only need to pull in the changed services into our subdirectories, which would lead to less code duplication.
>
> Cons: Repetitive code. Naming questions arise, in order to delineate the new from the old. Difficulty when dealing with more complicated services, especially when we use a service in another service.

Through this test run, we realized that the flagging system had an additional con. It obfuscated complexity and enabled the flag to be misused. If you take a look at the [example PR](https://github.com/transcom/mymove/compare/0c4be3b...8ad4aed#diff-a2ee24d035b334c22da8c32ee512e2ec1308300bc7b80f0e9f466d13e997dd49) for this suggested option you'll see that the default behavior of the service is to call the v2 service when the flag is not set. This meant that all tests would likely need to have this flag set in some obfuscated initialization code while still making the flag overridable. This added additional complexity and made it so that we could theoretically add a conditional for the flag throughout our codebase. This opens the possibility for code to branch out in a myriad of ways even when we only wanted this functionality to be used in a specific way. The way that we introduced the flag was also a bit questionable. We added it to the app context which was bringing http/routing concerns to the app context which should probably remain separated.

Because of these findings we decided to go with a new option.

Option 4: Only create new services if they are needed and shift any shared logic into reusable functions. These new services won't be versioned and will be added like existing functions. (Eg. if we have a service for fetching orders we might create a separate `fetchOrdersWithAddresses` function that has the same core functionality but also fetches all of the child addresses.)

- Pros: It allows flexibility. We can let endpoints utilize existing services or utilize the newly created service.
- Cons: Sometimes the shared portions of existing functions don't have clear logical break points and it can be easy to have arbitrary functions that don't do a complete "unit" of work.
