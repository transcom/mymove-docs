---
sidebar_position: 7
---
# Locustfile

Our `locustfiles` live in the `locustfiles/` directory. We likely already have all the ones you
need, but if not, this is where you would add a new one.

This where you will define all of the `User` classes for your load tests. A common user might look
like:

```python
# -*- coding: utf-8 -*-
"""
Example of a locustfile...
"""
from locust import HttpUser, between

from tasks.prime import PrimeTasks


class PrimeUser(HttpUser):
    """
    A user that can test things...
    """
    
    tasks = {PrimeTasks: 1}
    
    # The time (in seconds) Locust waits in between tasks. Can use decimals.
    wait_time = between(0.25, 9)

```

You will need to specify what tasks this user should run. This can be done via a `tasks` attribute
on the class (like in the example above) or defining tasks directly on the user class. In our repo,
we use the `tasks` attribute and pass it task sets.

## Locust Event Hooks

In addition to the `User` classes, another thing that the `locustfiles` will have is hooks. Hooks
provide a way to run code when a given event occurs, e.g. `locust` initializes, load testing is
starting, etc. You can see more info on the
[locust event hooks docs](https://docs.locust.io/en/stable/extending-locust.html).

We have a few hooks we use in our `locusfiles` to help out with making requests to the Prime API.
They set up certs needed to auth our requests. You'll see them look something like this:

```python
# -*- coding: utf-8 -*-
"""
Example of a locustfile with event hooks...
"""
from locust import HttpUser, between, events
from locust.env import Environment, RunnerType

from tasks import PrimeTasks
from utils.auth import remove_certs, set_up_certs
from utils.base import ImplementationError, MilMoveEnv


class PrimeUser(HttpUser):
    """
    A user that can test things...
    """
    
    tasks = {PrimeTasks: 1}
    
    # The time (in seconds) Locust waits in between tasks. Can use decimals.
    wait_time = between(0.25, 9)


@events.init.add_listener
def on_init(environment: Environment, runner: RunnerType, **_kwargs) -> None:
    """
    Event hook that gets run after the locust environment has been set up. See docs for more info:
    https://docs.locust.io/en/stable/api.html?#locust.event.Events.init
    
    In our case, we're setting up certs.
    :param environment: locust environment.
    :param runner: locust runner that can be used to shut down the test run.
    :param _kwargs: Other kwargs we aren't using that are passed to hook functions.
    :return: None
    """
    # Here we're taking locust's `host` variable from the `environment` and turning it into a
    # MilMoveEnv instance, e.g. MilMoveEnv.LOCAL.
    try:
        milmove_env = MilMoveEnv(value=environment.host)
    except ValueError as err:
        # For some reason exceptions don't stop the runner automatically, so we have to do it
        # ourselves.
        runner.quit()
    
        raise err
    
    # Then we use our MilMoveEnv instance, milmove_env, to set up the certs needed for making requests
    # to the Prime API.
    try:
        set_up_certs(env=milmove_env)
    except ImplementationError as err:
        runner.quit()
    
    raise err


@events.quitting.add_listener
def on_quitting(environment: Environment, **_kwargs):
    """
    Event hook that gets run when locust is shutting down.
    
    We're using it to clean up certs that were created during setup.
    :param environment: locust environment.
    :param _kwargs: Other kwargs we aren't using that are passed to hook functions.
    :return: None
    """
    # Here again we'll need our instance of a MilMoveEnv, so we'll turn the `environment.host` into
    # our version of it.
    try:
        milmove_env = MilMoveEnv(value=environment.host)
    except ValueError as err:
        # This should in theory never happen since a similar check is done on init, but just in
        # case...
        environment.runner.quit()
    
        raise err

    # Then we need to use that MilMoveEnv instance to remove the certs that the init hook created.
    remove_certs(env=milmove_env)

```

Here you can see two examples of hooks, one that runs after `locust` has finished initializing, but
before load testing has begun, and one that runs when `locust` is shutting down. In this case we're
setting up and removing certs needed for interacting with the Prime API.

One thing to note is that because the `locustfile` is the entry point for `locust` if you have a
hook that you want to run across `locustfiles`, you'll need to hook up your function in each file.

We have a sample `locustfile` located at `locustfiles/lifecycle.py` that you can run to see some
printed statements showing you some `locust` hooks and the order they run in. You can test it by
running:

```shell
locust -f locustfiles/lifecycle.py --headless -u 1 -r 1 -t 1s
```

Note that we don't define a `host` because it sets one up in the file because of the way it's using
a `Postman` test API.

### Making Requests Outside A User Or TaskSet Class

Another use for event hooks is if you need to make some requests before the load tests begin at all.
Here is an example:

```python
# -*- coding: utf-8 -*-
"""
Example of a locustfile making a request in an event hook...
"""
import requests
from locust import HttpUser, between, events
from locust.env import Environment, RunnerType

from tasks.prime import PrimeTasks
from utils.base import MilMoveEnv
from utils.request import MilMoveRequestPreparer
from utils.rest import parse_response_json
from utils.types import JSONArray


class PrimeUser(HttpUser):
    """
    A user that can test the Prime API
    """
    
    # These are locust HttpUser attributes that help define and shape the load test:
    
    tasks = {PrimeTasks: 1}  # the set of tasks to be executed and their relative weight
    
    # the time period to wait in between tasks (in seconds, accepts decimals and 0)
    wait_time = between(0.25, 9)


def set_up_for_prime_load_tests(env: MilMoveEnv) -> None:
    """
    Sample of func that can set up or get data before tests start.
    :param env: MilMoveEnv that we're targeting, e.g. MilMoveEnv.LOCAL
    """
    # Note how we can use the `MilMoveRequestPreparer` class combined with the `MilMoveEnv` instance
    # to make it easier to prepare for making requests.
    request_preparer = MilMoveRequestPreparer(env=env)
    
    # Here request_kwargs will include the necessary headers for making a json request and the certs
    # needed to auth to the Prime API.
    moves_path, request_kwargs = request_preparer.prep_prime_request(endpoint="/moves")
    
    response = requests.get(url=moves_path, **request_kwargs)
    
    # This function will handle parsing the response content for us, so we can work with the data more
    # easily and creates a nice error message. Alternatively, we could call response.json() and let
    # the caller catch any exceptions (since it's already set up to do that).
    moves, error_msg = parse_response_json(response=response)
    
    # `moves` comes back as a JSONType which is more generic so this states we specifically expect it
    # to be a JSONArray
    moves: JSONArray
    
    if error_msg:
        print(error_msg)
    
    return
    
    if moves:
        print(f"\n{moves[0]=}\n")
    else:
        print("No moves found.")


@events.init.add_listener
def on_init(environment: Environment, runner: RunnerType, **_kwargs) -> None:
    """
    Event hook that gets run after the locust environment has been set up. See docs for more info:
    https://docs.locust.io/en/stable/api.html?#locust.event.Events.init
    
    In our case, we're setting up for the load tests.
    
    :param environment: locust environment.
    :param runner: locust runner that can be used to shut down the test run.
    :param _kwargs: Other kwargs we aren't using that are passed to hook functions.
    :return: None
    """
    try:
        milmove_env = MilMoveEnv(value=environment.host)
    except ValueError as err:
        # For some reason exceptions don't stop the runner automatically, so we have to do it
        # ourselves.
        runner.quit()
        
        raise err
    
    # For the sake of brevity, the code for setting up and removing the certs was excluded from this
    # example.
    
    try:
        set_up_for_prime_load_tests(env=milmove_env)
    except Exception as err:
        runner.quit()
    
    raise err

```

Note that we're using the `requests` package directly to make our requests. The nice thing about
using the `MilMoveRequestPreparer` class is that it enables us to set up requests in a similar
manner both in and out of the `User`/`TaskSet` context. Examples of using it in the `TaskSet`
context will be in the [TaskSets](./taskset) page.