---
sidebar_position: 3
title: Using eTags and the If-Match header in Postman
---

# Background

We use [optimistic locking](use-optimistic-locking.md) in MilMove to update records, which means PATCH/PUT requests generally include an If-Match header with the [E-Tag](https://en.wikipedia.org/wiki/HTTP_ETag) value for a given record. Basically, if the record that we are attempting to update has been changed before we were able to update it, we don't want our request to succeed.

# Usage With Postman

This means that when testing locally in Postman, we need to include a correct E-Tag value via the If-Match header. If you are getting 412 Precondition Failed responses to your requests, that means your request isn't including a proper E-Tag value.

First, get the correct E-Tag value for whatever record you are trying to update. You generally do a GET request to the resource you are trying to update, and the response should include an E-Tag value.

Second, add the If-Match header to your request in Postman. If it isn't included already, check the box on an empty line in the Headers section of the request you are building and type "If-Match" and it should show up as an option in the autocomplete dropdown. Add the E-Tag value as the value in this header. This should allow you to successfully update the resource via Postman!
