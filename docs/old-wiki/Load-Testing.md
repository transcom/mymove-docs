# Principles of Load Testing

The primary goal of load testing is to simulate a mass of users and test that the system can withstand sufficiently high traffic - proving that the system is reliable and ready for production use. Our approach also adopts several other principles as implementation guidelines:

* **User activity should cover all possible actions available to them.** No potential vulnerabilities should be left unexposed. 
* **User activity should be realistic.** A user’s options are normally limited by the tasks they’ve already completed. Similarly, load test users should work through the system in the same way they would naturally. We are testing the system against expected behavior.
* **User load should be dynamic.** Not all requests to the system will or should be the same size. 
* **Request data should be dynamic.** Not all requests will or should be successful. Dynamic data that simulates failures as well as successes is ideal. 
* Test results should be scanned for **logical failures** (buggy endpoints, unhelpful error responses) **as well as performance failures** (long response times, system crashes, etc).

The Locust framework is tailored for these principles and bakes some of this behavior into its code. To get a visual overview of how Locust works, refer to [these Miro charts](https://miro.com/app/board/o9J_lbN9baU=/).

To make sure our custom tests also follow these principles, we need to define a natural, expected flow for Prime activity in the system. This will incorporate all Prime API endpoints and whichever Support API endpoints are necessary to fill in gaps in the process and provide cohesion. 

## Resources

* [Locust documentation](https://docs.locust.io/en/stable/)
* [[How to Run Load Testing in Experimental]]