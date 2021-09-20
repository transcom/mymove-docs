These are the various steps that are involved in creating a new endpoint.

It was written for external facing APIs, rather than internal ones. But most concepts should apply equally to internal APIs.

This page is a skeleton that we hope to populate with more details. 

* Add a new entry into the yaml
	* URL design and structure: [API Style Guide](https://github.com/transcom/mymove/wiki/API-Style-Guide)
	* Path Parameters, Headers and Body 
	* Response Body
		* Required
		* x-nullable
		* Readonly
		* Documentation
	* Error Responses: [API Errors Guide](https://github.com/transcom/mymove/wiki/API-Errors)
* Add a handler for the endpoint
	* Add payload_to_model and model_to_payload functions
	* Create handler type and Handle function
		* Hook it up to api.go
	* How to handle errors
* Add service object
	* When to make a service object: [Service Objects](https://github.com/transcom/mymove/wiki/service-objects)
	* Add service object interface
	* Add service object constructor
	* Add service object code
	* Add service object tests
* Add event key and update event map
	* Each API has a corresponding file in `/pkg/services/event/<apiName>_endpoint.go`
	* Add new `const` to represent event key
	* Add event key to endpoint map in the same file, using the event key name, api name, and operation ID.
* Add tests for the handler
	* Add mocks: [Generating Mocks with mockery](https://github.com/transcom/mymove/wiki/generate-mocks-with-mockery)
	* Add test code
        * Use testdatagen functions [[Understanding Testdatagen Functions]]
