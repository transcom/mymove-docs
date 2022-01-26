---
sidebar_position: 11
---
# API Parsers

Internally, the fake data generator is using an `APIParser` class. It parses an API specification
(`.yaml`) file using a path or URL using the `prance` library to create a fully-resolved dictionary
of its Swagger specification. The main methods are:

* `get_request_body`: Returns the full Swagger specification of the request body for a given
  endpoint. Requires the `path` and the `method` (`post`, `get`, etc.) to be passed in. Returns an
  empty dictionary if no matching request found.

  ```python
  # -*- coding: utf-8 -*-
  """
  Example of using APIParser.get_request_body
  """
  from utils.parsers import APIParser


  parser = APIParser(
    api_file="https://raw.githubusercontent.com/transcom/mymove/master/swagger/prime.yaml")

  parser.get_request_body(path="/mto-shipments", method="post")
  ```

* `get_response_body`: Returns the full Swagger specification of the response for a given endpoint.
  Requires the `path` and the `method` (`post`, `get`, etc.). Optionally accepts the `status` code
  for the response, which defaults to `"200"`. Returns an empty dictionary if no matching response
  is found.

  ```python
  # -*- coding: utf-8 -*-
  """
  Example of using APIParser.get_response_body
  """
  from utils.parsers import APIParser

  parser = APIParser(
    api_file="https://raw.githubusercontent.com/transcom/mymove/master/swagger/prime.yaml")

  parser.get_response_body(path="/mto-service-items", method="post", status="201")
  ```

* `get_definition`: Returns the full Swagger specification for a specific definition. Requires
  the `name` of the definition to be passed in. Returns `None` if no matching definition is found.

  ```python
  # -*- coding: utf-8 -*-
  """
  Example of using APIParser.get_definition
  """
  from utils.parsers import APIParser


  parser = APIParser(
    api_file="https://raw.githubusercontent.com/transcom/mymove/master/swagger/prime.yaml")

  parser.get_definition(name="MoveTaskOrder")
  ```

* `generate_fake_request`: Takes in the endpoint `path` and `method` and returns a JSONType object
  with the fields and fake data for the request. Uses the `faker` library to generate the data. Can
  optionally accept a dictionary of `overrides` for any fields that need to have specific values
  set, or a boolean `require_all` that indicates that all fields should be filled, even if not
  required.

  ```python
  # -*- coding: utf-8 -*-
  """
  Example of using APIParser.generate_fake_request
  """
  from utils.parsers import APIParser


  parser = APIParser(
    api_file="https://raw.githubusercontent.com/transcom/mymove/master/swagger/prime.yaml")

  parser.generate_fake_request(path="/mto-service-items", method="post",
                               overrides={"modelType": "MTOServiceItemDDSFIT"})
  ```

    * The fake data generator shown earlier uses this method when you call
      `fake_data_generator.generate_fake_request_data`.

We don't use the `APIParser` class directly though, we define subclasses that use its functionality
with the specific needs for each API specification. These live in the `utils/parsers.py` file. We
have these defined:

* `PrimeAPIParser`
* `SupportAPIParser`
* `GHCAPIParser`
* `InternalAPIParser`

Each one defines what API specification the parser should look at, and can optionally use the hooks
that are built-in to the `APIParser` class to define custom behavior. Here is a sample parser:

```python
# -*- coding: utf-8 -*-
"""
Sample API parser
"""
from utils.parsers import APIParser


class GHCAPIParser(APIParser):
    """
    Sample Parser class for the GHC API.
    """
    
    api_file = "https://raw.githubusercontent.com/transcom/mymove/master/swagger/ghc.yaml"
    
    def _custom_field_validation(self, api_field, object_def):
        """
        This hook is for changes you want to make to a specific field, regardless of which endpoint it is used in.
        These are PRE-DATA changes and will be used to generate the data you want for this field whenever you call the
        generate_fake_data method.
        """
        # Example:
        if api_field.name == "agents":
            try:
                api_field.max_items == 2  # let's say we never want more than two agents, regardless of what the YAML says
            except AttributeError:
                pass  # this wasn't the field type we were expecting -- should log as well

    def _custom_body_validation(self, body):
        """
        This hook is for changes you want to make to a specific APIEndpointBody class (defined in utils/fields.py).
        These are PRE-DATA changes and will be used to generate the data you want for this endpoint whenever you call
        the generate_fake_data method.
        """
        # Example:
        if body.path.endswith("status") and body.method == "patch":
            if body.body_field.object_fields:  # make sure we have the right BaseAPIField type
                status_field = body.body_field.get_field("status")
                
                if status_field and status_field.options:  # check that we have the field and it is an EnumField
                    try:
                        # status will already be SUBMITTED and can't be changed back, so let's just remove that option:
                        status_field.options.remove("SUBMITTED")
                    except ValueError:
                        pass  # it's not in the list, so we're good

    def _custom_request_validation(self, path, method, request_data):
        """
        This hook is for changes you want to make to the data for a specific endpoint AFTER generation. This code
        manipulates actual data and may not apply to every request.
        """
        # Example:
        if path == "/move-task-orders/{moveTaskOrderID}" and method == "patch":
            if request_data.get("isCanceled"):  # check if this value was set and if it's True
                request_data["availableToPrimeAt"] = None
```

We have all the parsers we need for now defined, but if you have a need to add a new one follow
these steps (all in the `utils/parsers.py` file):

1. Add your new parser, subclassing `APIParser` and defining whatever things you need.
2. Add a key/value pair to the `APIKey` enum.
3. Go to `get_api_parsers` and add your new parser to the `parser_classes` dict, giving it the key
   you defined in `APIKey` and the value of your new parser class (un-initialized).
4. Now you should be able to use your new parser with the fake data generator! You'll use your new
   `APIKey.<key>` when using the fake data generator.

## References
* [Prance Documentation](https://pypi.org/project/prance/)