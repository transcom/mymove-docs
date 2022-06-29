---
sidebar_position: 16
---

# Roles and Permissions


## Background

MilMove follows the OWASP recommendations for Role Based Access Control for requests. Below you will find details on the implementation as well as links to references and resources used in the construction of this middleware. 

### Rules and Definitions

**Roles** 
- Are defined by our existing user groups e.g. TIO, TOO, Prime etc.

**Access** 
- Is evaluated based on the permissions granted to a user's role. 

**Permissions**
- Are **additive**, meaning if a user has multiple roles, they will have permissions from all roles.  
- composed of an `action` and an `object`. Actions are mapped to CRUD actions, and objects map to database level objects.
  - e.g. `update.move` or `create.serviceItem` 
-  **context** comes from the route they are defined upon. 

### Implementation Details

In order to implement the above rules MyMove has permissions middleware which can be set on the API router in `cmd/milmove/serve.go` and will then run at the front of request processing. For more details on how Go-Swagger middleware works refer to the resources section below.

Permissions should be added to a swagger route on the operation level of the route (e.g. `get`, `post`, `patch`) with the `x-permissions` keyword. Multiple permissions can be defined and a user must meet all of these in order to be granted access. 

The middleware checks the permissions listed on the route against the user's roles, and the permissions allotted to those roles. Permissions are **addititve** so if a user has more than one role, they will have the permissions from all roles. If they are missing any of the permissions required for a route operation access will be denied and logged. 

### Outstanding Work Left To Do

This is still a work in progress - so we expect this model to continue to evolve. Outstanding items to be figured out include:
- [Determine a datastore for permissions](https://dp3.atlassian.net/browse/MB-12738)
- [Cleanup manual checks](https://dp3.atlassian.net/browse/MB-12739)

### OWASP Recommendations

* Role Based Access Control - RBAC - model for controlling access to resources where permitted actions are identified with roles rather than with individual identities

Principles of access control design
* Design AC thoroughly up front
    * may start simple but can grow in to a complex and feature-heavy security control, ensure that functionality will allow for customization and future requirements
* Force all requests to go through AC checks
* Deny by default - if a request is not specifically allowed it is denied 
    * if an error is thrown by application code AC should always be denied
    * when a new account is created (via admin or user sign up) that should have minimal or no access by default until configured
    * when a new feature is added all users should be denied access until it is properly configured
* Principle of least privilege - all users should have the least amount of access possible
    * be wary of systems that do not provide granular access control configuration capabilities
* Don’t hardcode rules
    * it’s fragile - can be easy to create incorrect or missing role checks
    * does not allow for multi-tenancy, extreme measures like forked code or added checks for each customer will be required for have different rules for different customers
    * does not allow for data-specific or horizontal access control rules
    * can make it difficult to audit or verify the overall application access control policy
    * instead use attribute or feature-based access control checks 
* Log all access control events
    * all failures should be logged as they can be indicative of a malicious user probing the app for vulnerabilities

### Resources

* [ADR-040 -> using swagger for RBAC middleware](https://github.com/transcom/mymove/blob/c90ae337459b0dafaede81e8b684f59bf5aa1465/docs/adr/0040-role-base-authorization.md)
* [Initial PR for permissions middleware implementation](https://github.com/transcom/mymove/pull/8673)
* [How auth works in swagger](https://swagger.io/docs/specification/2-0/authentication/)
* [Composed auth in swagger](https://goswagger.io/tutorial/composed-auth/)
* [Using Middleware in Go-Swagger](https://goswagger.io/use/middleware.html )
* [Making and using middleware in Go](https://www.alexedwards.net/blog/making-and-using-middleware)
* [How Open-API, Swagger and Go work together](https://eli.thegreenplace.net/2021/rest-servers-in-go-part-4-using-openapi-and-swagger/) s