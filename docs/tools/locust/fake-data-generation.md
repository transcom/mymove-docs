---
sidebar_position: 10
---
# Fake Data Generation

We have several helpers to generate fake data for requests, allowing us to create more dynamic
bodies and simulating varied user input/behavior. 

## Fake API Data Generator

We have a function called `get_api_fake_data_generator` that will return an object you can use to generate fake API 
data.

Here is what it would look like to use the fake data generator in a `TaskSet`:

```python
# -*- coding: utf-8 -*-
"""
Example of a TaskSet file using the fake data generator...
"""
import logging
import random
from http import HTTPStatus

from locust import tag, task

from utils.constants import ZERO_UUID
from utils.parsers import APIKey, get_api_fake_data_generator
from utils.request import log_response_failure, log_response_info
from utils.rest import RestResponseContextManager
from utils.task import RestTaskSet
from utils.types import JSONArray, JSONObject


logger = logging.getLogger(__name__)
fake_data_generator = get_api_fake_data_generator()


# tags are useful to add at a TaskSet and task level to enable running only specific load tests.
@tag('support')
class SupportTasks(RestTaskSet):
    """
    Description of the flow for these tasks here.
    """

    @task
    def stop(self) -> None:
        """
        This ensures that at some point, the user will stop running the tasks in this task set.
        """
        self.interrupt()

    @tag('createMTOShipment')
    @task
    def create_mto_shipment(self) -> None:
        """
        Create a shipment on a move.
        """
        # First we'll need a move to work with
        moves_path, request_kwargs = self.request_preparer.prep_prime_request(endpoint="/moves")
    
        with self.rest(method="GET", url=moves_path, **request_kwargs) as resp:
            # This will let our editors know that we expect `resp` to be an instance of
            # `RestResponseContextManager`, which then lets it know what type hints to suggest below.
            resp: RestResponseContextManager
            
            # This function helps us log the response status code uniformly across requests.
            log_response_info(response=resp)
            
            if resp.status_code == HTTPStatus.OK:
                moves: JSONArray = resp.js
            else:
                # if you wanted to, you could mark this load test as a failure by doing this:
                resp.failure("No moves found!")
                
                # This function helps us log info about the response and request when there are errors.
                log_response_failure(response=resp)
                
                return
    
        # You can filter more if you need a specific move
        move_to_use = random.choice(moves)
    
        # The fake data generator allows us to define overrides if there are specific values we want (or
        # don't want) it to use.
    
        # We'll set the move ID and set a few other IDs to be a ZERO_UUID value because we want it to
        # create those objects and thus can't use a non-zero UUID. We're also setting the agents to
        # empty list for simplicity here, but in our real version there's more to it.
        overrides = {
            "moveTaskOrderID": move_to_use['id'],
            "agents": [],
            "pickupAddress": {"id": ZERO_UUID},
            "destinationAddress": {"id": ZERO_UUID},
            "mtoServiceItems": [],
        }
    
        # Now we can use the fake data generator to generate the fake request data.
        payload = fake_data_generator.generate_fake_request_data(
            api_key=APIKey.PRIME,  # This tells the generator which API spec to look at.
            path="/mto-shipments",
            method="post",
            overrides=overrides,
        )
    
        # Now we can make our request:
        create_shipment_path, request_kwargs = self.request_preparer.prep_prime_request(endpoint="/mto-shipments")
    
        # The `generate_fake_request_data` method returns a JSONType object which can be used in our
        # request as the data payload.
        with self.rest(method="POST", url=create_shipment_path, data=payload, **request_kwargs) as resp:
            resp: RestResponseContextManager
            
            log_response_info(response=resp)
            
            # Do whatever else you need to here.
```

`get_api_fake_data_generator` does not need to be used in the context of a `TaskSet` so you can use
it wherever you want. It caches the fake data generator so this means that even if you use it in
multiple places, only the first call to it will parse the API files (which is slow).

You can read more about the internals of the fake API data generator in the [API Parsers](./api-parsers) page.

## Base Fake Data Generator

One downside to the fake API data generator is that it will generate data for a given endpoint including all the
available fields. This can be an issue if you are trying to emulate a flow that hits the same endpoint multiple times, 
e.g. customer on-boarding uses the same endpoint and gradually calls it with new info each time. For cases like this, it
is more useful to use a more basic data generator, `utils.fake_data.MilMoveData`. This class uses a combination of 
`faker` and custom providers to generate appropriate fake data. It is the class that the fake API data generator uses at
a lower level, and so it can be good to use it to generate more consistent data that accounts for our needs.

To use it, you would import it and initialize the class (without arguments). Then you can use its 
`get_fake_data_for_type` method to generate specific types of data, e.g. a first name, or a phone number. You pass the
type of data you expect as an argument, using the `enum` `utils.constants.DataType` defining the type you want. Here is 
a small example:

```python
# -*- coding: utf-8 -*-
"""
Example of a task using MilMoveData
"""
import json
import logging
from http import HTTPStatus
from typing import Optional

from locust import tag, task

from utils.auth import UserType, create_user
from utils.constants import DataType
from utils.fake_data import MilMoveData
from utils.request import log_response_failure, log_response_info
from utils.rest import RestResponseContextManager
from utils.task import RestTaskSet
from utils.types import JSONArray, JSONObject


logger = logging.getLogger(__name__)


class MilMoveTasks(RestTaskSet):
    """
    Set of tasks that can be called for the MilMove interface.
    """

    def on_start(self):
        """
        Creates a login right at the start of the TaskSet and stops task execution if the login fails.
        """
        success = create_user(request_preparer=self.request_preparer, session=self.client, user_type=UserType.MILMOVE)

        if not success:
            logger.error("Failed to create a user")
            self.interrupt()

    @task
    def stop(self) -> None:
        """
        This ensures that at some point, the user will stop running the tasks in this task set.
        """
        self.interrupt()

    @tag("onboardCustomerWorkflow")
    @task
    def onboard_customer(self) -> None:
        """
        Goes through the basic on-boarding flow for a customer.
        """
        # For the sake of brevity, we'll hard-code a fake ID here, but in a real test you'd have to get this.
        service_member_id = "149UYM-THIA90-3450IU"

        # initialize the fake data class
        milmove_faker = MilMoveData()

        # we're going to skip the first onboarding step because we don't need the generator for it, but here is the 
        # setup of the payload for the next step, which would use the generator:

        payload = {
            "id": service_member_id,
            "first_name": milmove_faker.get_fake_data_for_type(data_type=DataType.FIRST_NAME),
            "middle_name": milmove_faker.get_fake_data_for_type(data_type=DataType.FIRST_NAME),
            "last_name": milmove_faker.get_fake_data_for_type(data_type=DataType.LAST_NAME),
            "suffix": "",
        }

        # Then you can use the payload.

```

## References
* [Faker Documentation](https://faker.readthedocs.io/en/stable/index.html)
