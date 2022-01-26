---
sidebar_position: 8
---
# TaskSet

Tasks are distinct functions, or callables, that tell Locust what to do during load testing. A task
is, in essence, a load test. `TaskSet` classes are a way to link tasks together and keep the code
organized. Task sets and functions should all be defined in python files in the `tasks/` directory.

It is possible for a user class to have more than one task set, but it's important to keep in mind
is that if a user has more than one task set, they will only ever switch between the task sets if
you remember to have the task set stop at some point. Otherwise, the user will just stay stuck on
their first task set until the load tests end. Examples will be included below.

An example `TaskSet` for this project might be:

```python
# -*- coding: utf-8 -*-
"""
Example of a TaskSet file...
"""
import logging
from http import HTTPStatus

from locust import tag, task

from utils.request import log_response_failure, log_response_info
from utils.rest import RestResponseContextManager
from utils.task import RestTaskSet


logger = logging.getLogger(__name__)


# tags are useful to add at a TaskSet and task level to enable running only specific load tests.
@tag('mainTasks')
class PrimeTasks(RestTaskSet):
    """
    Description of the flow for these tasks here.
    """

    @task
    def stop(self) -> None:
        """
        This ensures that at some point, the user will stop running the tasks in this task set.
        """
        self.interrupt()
        
    @tag('doSomething')
    @task
    def do_something(self) -> None:
        """
        Do a task! Tasks generally have three steps: Set-up, make a request, validate/log results
        """
        # Prep the path and request kwargs. Using "1" for the moveID for the sake of simplicity here,
        # but in a regular load test, you would need to have some way of getting this.
        moves_path, request_kwargs = self.request_preparer.prep_prime_request(
          endpoint="/move-task-orders/1", endpoint_name="/move-task-orders/{moveID}"
        )
        
        # Now make the request
        with self.rest(method="GET", url=moves_path, **request_kwargs) as resp:
            # This will let our editors know that we expect `resp` to be an instance of
            # `RestResponseContextManager`, which then lets it know what type hints to suggest below.
            resp: RestResponseContextManager
        
            # This function helps us log the response status code uniformly across requests.
            log_response_info(response=resp)
            
            if resp.status_code == HTTPStatus.OK:
                logger.info(f"\nℹ️ {resp.js=}\n")
            else:
                # This function helps us log info about the response and request when there are errors.
                log_response_failure(response=resp)
            
                # if you wanted to, you could mark this load test as a failure by doing this:
                resp.failure("Move not found!")
```

Note that we are using the `RestTaskSet` as our parent class. It enables easier testing and more
control over whether a load test should be considered a success or failure. Among the things it
provides are the `self.request_preparer` object and `self.rest` context manager.

The `request_preparer` is an instance of the helper class mentioned earlier called
`MilMoveRequestPreparer` and has several helper functions for preparing to make a request to the
`mymove` server:

* `prep_ghc_request`
* `prep_internal_request`
* `prep_prime_request`
* `prep_support_request`

Each of these takes an endpoint, e.g. `/move-task-orders/1` (like in the example above). They can
also optionally take an `endpoint_name` argument that is useful for the purposes of locust request
grouping. So in the example above, we use `endpoint_name="/move-task-orders/{moveID}"`. That way
instead of `locust` having each request to an endpoint like `/move-task-orders/{moveID}` be its own
group, e.g. `/move-task-orders/1` , `/move-task-orders/2`, etc., `locust` will group them all under
the same name.

Each of these functions will return a tuple containing the URL to use (stored in `moves_path`
above), and the keyword arguments (or kwargs, called `request_kwargs` above) to pass to `self.rest`.

The `rest` context manager makes it easier to work with responses by:

* providing a variable you can use (called `resp` above) to mark the load test as a success (by
  calling `resp.success()`) or a failure (`resp.failure("message")` like at the end of the example).
* automatically parsing the response content into `json` and failing the load test if it can't be
  parsed. The parsed `json` response content can be accessed in `resp.js`.
    * In an example earlier, you can see `parse_response_json` being used. The context manager uses
      that internally to populate `resp.js`.
    * This isn't called `resp.json` because that's already a method on the `resp` object.
* automatically catching of any exceptions that may be raised in your `with` block, which will then
  mark the load test as a failure and format an error message to display in the results.

Also note that we included a `stop` task that means at some point, that task will be selected and
the task set will end, passing control back to the parent. In our case this means the user class,
but locust does allow nested task sets, in which case it would give control back to the parent task
set.

One last thing to point out is that we used the `@task` decorator for the `TaskSet`'s
methods/functions. This is the key part that turns the methods into load tests. Any methods that
don't have the `@task` decorator will be regular methods that the `TaskSet` has access to.

For more details on `TaskSet`s, see the
[locust TaskSet class docs](https://docs.locust.io/en/stable/tasksets.html).

You can link a `User` class with a task set by passing the task set to the `User`'s `tasks`
attribute like this:

```python
# -*- coding: utf-8 -*-
"""
Example of a TaskSet file...
"""
from locust import HttpUser, between

from tasks.prime import PrimeTasks, SupportTasks


class MyUser(HttpUser):
    """
    A user that can test things...
    """
    
    tasks = {PrimeTasks: 5, SupportTasks: 1}
    # The time (in seconds) Locust waits in between tasks. Can use decimals.
    wait_time = between(0.25, 9)
```

The number next to the task set indicates its relative _weight_ - so in this example, tasks
from `PrimeTasks` would be 5 times more likely than tasks from `SupportTasks`.

## Logging In As A Customer or Office User

If you need to be logged in for the load tests, we have a helper function to create users in
`utils/auth.py` called `create_user`. You can use it during the `on_start` method of a `TaskSet`
like this:

```python
# -*- coding: utf-8 -*-
"""
Example of a task set using the LoginTaskSet functionality.
"""
import logging

from locust import task

from utils.auth import UserType, create_user
from utils.task import RestTaskSet


logger = logging.getLogger(__name__)


class MyLoggedInTasks(RestTaskSet):
    """
    Tasks to run that require logging in to the office/ghc or customer/internal APIs.
    """

    def on_start(self) -> None:
        """
        Creates a login right at the start of the TaskSet and stops task execution if the login
        fails.
        """
        success = create_user(request_preparer=self.request_preparer, session=self.client,
                              user_type=UserType.MILMOVE)
        
        if not success:
            logger.error("Failed to create a user")
            self.interrupt()

    @task
    def stop(self) -> None:
        """
        This ensures that at some point, the user will stop running the tasks in this task set.
        """
        self.interrupt()
```

The `request_preparer` and `session` are available already on `RestTaskSet` instances, so the main
thing you need to provide is the `user_type` you want to create.

There are multiple other ways to organize and link tasks together, but using our `RestTaskSet` class
is the main recommendation in this repo.

## Expected Failures

There may be times that you want to create a load test that you expect to fail. E.g. if you want a
load test to cover an endpoint that will reject the request because of some error (eTag, bad data,
etc.). If you want to do that, you can do something like this:

```python
# -*- coding: utf-8 -*-
"""
Example of a TaskSet file...
"""
import json
import logging
from http import HTTPStatus

from locust import tag, task

from utils.constants import MTO_SHIPMENT
from utils.parsers import APIKey, get_api_fake_data_generator
from utils.request import log_response_failure, log_response_info
from utils.rest import RestResponseContextManager
from utils.task import RestTaskSet


logger = logging.getLogger(__name__)
fake_data_generator = get_api_fake_data_generator()


# tags are useful to add at a TaskSet and task level to enable running only specific load tests.
@tag('mainTasks')
class PrimeTasks(RestTaskSet):
    """
    Description of the flow for these tasks here.
    """

    @task
    def stop(self) -> None:
        """
        This ensures that at some point, the user will stop running the tasks in this task set.
        """
        self.interrupt()

    # You can add the expectedFailure tag so that they can all be run if needed.
    @tag(MTO_SHIPMENT, "updateMTOShipmentStatus", "expectedFailure")
    @task
    def update_mto_shipment_with_invalid_status(self) -> None:
        """
        Tries updating an MTO shipment to an invalid status.
        """
        # For the sake of brevity, this example won't include the full setup. You can look at the real
        # PrimeTasks.update_mto_shipment_with_invalid_status method to see the full version.
    
        # This is not how a real mto_shipment would look, but just doing this for the sake of this
        # example.
        mto_shipment = {'id': 'TEST123', 'eTag': 12354519}
    
        # This is an invalid status for a shipment to change to through this endpoint.
        overrides = {"status": "DRAFT"}
    
        # Generate fake payload based on the endpoint's required fields
        payload = fake_data_generator.generate_fake_request_data(
            api_key=APIKey.PRIME,
            path="/mto-shipments/{mtoShipmentID}/status",
            method="patch",
            overrides=overrides,
        )
    
        # Note that we have an em dash plus "expected failure" to put these in a separate locust group
        # than the regular shipment status updates.
        url, request_kwargs = self.request_preparer.prep_prime_request(
            endpoint=f"/mto-shipments/{mto_shipment['id']}/status",
            endpoint_name="/mto-shipments/{mtoShipmentID}/status — expected failure",
        )
    
        request_kwargs["headers"]["If-Match"] = mto_shipment["eTag"]
    
        with self.rest(method="PATCH", url=url, data=json.dumps(payload), **request_kwargs) as resp:
            resp: RestResponseContextManager
            
            log_response_info(response=resp)
            
            if resp.status_code == HTTPStatus.UNPROCESSABLE_ENTITY:
                # Note that by default, locust would fail this request because its status code is > 400 so
                # we need to explicitly mark it as a failure.
                resp.success()
            else:
                # If we get any other status code, we didn't get the expected request failure, so let's mark
                # it as a load test failure.
                resp.failure("Got an unexpected result for updating a shipment with an invalid status.")
                
                log_response_failure(response=resp)
```

The main things to note are:

* Adding a tag for expected failures: `expectedFailure`
* Appending `— expected failure` to the `endpoint_name`
    * Note that if it's an endpoint you would not normally have to specify the `endpoint_name` for,
      e.g. `/moves`, you'll need to specify `endpoint_name=/moves — expected failure`.
* Checking for the bad status code you expect, e.g. `HTTPStatus.UNPROCESSABLE_ENTITY`, a.k.a. `422`
    * Using `resp.success()` if you got the expected bad status code.
    * Using `resp.failure(<reason>)` and `log_response_failure(response=resp)` if you get any other
      status code.
