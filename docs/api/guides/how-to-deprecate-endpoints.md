---
sidebar_position: 5
---

# How to Deprecate an API Endpoint
This article adheres to the principles of [API evolution](https://apisyouwonthate.com/blog/api-evolution-for-rest-http-apis), with a reduced focused on versioning. In essence, this means that we will strive to make _additive_ changes. We will introduce new functionality into the API and gradually communicate the deprecation and eventual sunsetting of the old functionality. 

The following is a suggested outline for how we should execute this process on MilMove.

## When to use this process
A version of this process should be followed for many changes we make to an API, beyond deprecating an endpoint. For example:

- **Changing the name of an object/changing terminology.**
	We can make additive changes to an API to add the new terminology without removing the definitions and endpoints that have the old terminology. On the backend, the endpoints with the old terminology can be modified to point at the new handlers until we remove them on the sunset date.
	
- **Changing the functionality of an existing endpoint**
	Likewise, it is generally possible to add the new functionality before removing the code that will change.

- **Removing definitions and/or functionality**
	We don't have to add any new functionality to follow this process.

## Steps
> ❗️ This process is designed for our _internal_ dev practices. For our external clients, namely the Prime, it **has not yet been finalized**. In particular, the notice period may need to be extended significantly (6-8 months).

### Communicate
1. Submit and merge a PR that adds the new functionality to the API (if any).

2. Set a date to sunset (remove) the old functionality. For internal APIs, this should be, at a minimum, one month after the day you communicate the deprecation. For our external clients, 3 months is the minimum. Bigger changes may need significantly more time.

3. Mark the old endpoint as "deprecated." To do this, you should:
	- Add the key `deprecated: true` to the endpoint definition.
	- Prefix the endpoint description with `_[Deprecated: sunset on <date>]_` with the planned date for sunsetting the old functionality.
	- Add a link to the preferred endpoint to use instead, if applicable.

4. Communicate the changes to the team. To do this, you should make a post in #prac-engineering in the USTC slack. This post should contain:
	- @channel. Everyone needs to be notified.
	- The sunset date. Make it clear when this functionality will no longer be supported.
	- Context. Give folks some insight into why this functionality is being removed. 
	- Alternatives. Talk about the preferred new endpoint, work-arounds, or recommendations for moving away from the old functionality entirely.
	- Who to contact with questions.
        
	Example: 
	> Hi there, @channel! This is your official announcement:
	>
	> The Prime API endpoint `fetchMTOUpdates` is effectively deprecated. We have replaced it with the new endpoint `listMoves`, which notably returns less information. Pair this new endpoint with `getMoveTaskOrder` to retrieve all of the information on a move.
	>
	> `fetchMTOUpdates` will be fully removed on **August 31, 2021**. Please update any systems or processes that rely on this endpoint before this date.
Feel free to ping me if you have any questions. Thanks all!

	_NOTE: This does not account for how we will communicate these changes to the Prime yet. We can consider: email, headers (might not be supported), and putting large notifications on our documentation site (assuming we can set one up soon 🤞)_

### Deprecate
5. Write a ticket to remove the old functionality from the API and schedule it for the sprint of the sunset date.

6. Submit and merge a PR that sunsets the old functionality. Tag the merge commit as a new release with a note about the changes to the API.

## Versioning

When we go live, we will have to address how we plan to _version_ our APIs, particularly for external clients. This process is still a work in progress, and [a difficult one at that](https://blog.container-solutions.com/api-versioning-what-is-it-why-so-hard). In the meantime, we will still follow the above steps for API changes that could impact our internal teams.
