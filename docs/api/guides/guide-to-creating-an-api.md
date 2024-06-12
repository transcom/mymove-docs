---
sidebar_position: 5
---

# Creating an API
###### These are the various steps that are involved in creating a new endpoint.

:::note
This is assumed you are creating a new API router on an existing server, this documentation will not cover how to create a new server. 
:::
Prior to creating a new API, we must first implement the swagger definition of said new API. We are using Swagger 2.0, which is [OpenAPI](https://swagger.io/specification/v2/), a specification we use to format our RESTful APIs and provide a template for us to communicate the information in our API.
Always start with swagger. This step creates your API's endpoint definitions and generates the files and helper functions you will need to create your endpoint. More specifically, swagger converts JSON user input into generated Go types.

## Creating a new API yaml

All new API require a new yaml file to be added in `mymove/swagger-def`. This directory holds many different specs and definitions as they get reused throughout the application.
You will notice that there is also a `mymove/swagger` folder which holds what looks to be a copy of `swagger-def`, please do not edit within this folder. The `swagger` folder
holds the generated specs to be used within the backend of the codebase.
After we have a base `.yaml` file for our new API and maybe even some tags and paths defined, we will generate Swagger and the new API definitions and specs will generated and be placed inside the `swagger` folder.

First, create a your new API.yaml file under `mymove/swagger-def`, similar to how `admin.yaml`, `prime.yaml`, `support.yaml`, etc. are present. Populate your new `.yaml` file with this template info:

```
swagger: '2.0'
info:
  title: MilMove ${API_NAME} API
  version: 1.0.0
  license:
    name: MIT
    url: 'https://opensource.org/licenses/MIT'
  contact:
    email: milmove-developers@caci.com
  description:
    ${INSERT_DESCRIPTION}
basePath: ${API_NAME}/v1
consumes:
  - application/json
produces:
  - application/json
schemes:
  - ${http or https}
```

- Populate `${API_NAME}` with the name of your new API
- Populate `${INSERT_DESCRIPTION}` with a description of your new API, or conversely create a new markdown file and reference it with `$ref: info/${API_NAME}_description.md`
- Populate `${http or https}`
  - Populate with `http` for testing and development, such as the Support API
  - Populate with `https` for production environments where sensitive information may transmit over TLS. Note that the server and routing configs will handle the TLS path routing and security.

## Creating a new API html

We will also need an HTML file for the Swagger-UI. To do this as easy as possible, navigate to `mymove/public/swagger-ui`, where you will find existing HTML files for the APIs such as `prime.html` and `support.html`.
Since these HTML files only differ by one line, we will simply duplicate one and modify said line. Create a new copy of an existing HTML API file, such as `prime.html`. Give this new file a name of `${API_NAME}.html`, and then near line 100, where the url attribute is passed into the `SwaggerUIBundle` function, adjust the existing API name to be your new one. For example, replacing `url: "/prime/v1/swagger.yaml"` with `url: "/apiNameHere/v1/swagger.yaml"`. Leave this file for now
as we will come back later when mounting the API handler for Swagger UI.

## Generating swagger code for your API

Once your Swagger API `.yaml` files have been created under `swagger-def`, we need to make sure they can be generated for use by our backend. To do this, we need to modify the `gen-server` script found under `mymove/scripts/gen-server`.

Within this file you will see two sections at the bottom to execute the bash script functions `generate_server` and `generate_client`. Please add a new execution line under these two sections for your new API.

Example:

```
# Generate Server Code
...
generate_server swagger/${API_FILENAME}.yaml    ${API_NAME}messages    ${API_NAME}api    ${API_NAME}operations

# Generate Client Code
...
generate_client swagger/${API_FILENAME}.yaml ${API_NAME}messages ${API_NAME}client

```

Once you have added the new execution lines to the bash script, when the `gen-server` script executes, it will generate the new swagger server and client code for your API. Feel free to execute this script manually yourself or run `make server_run` within the MyMove repository.

## Creating your API handler

Now that we have a basic swagger definition for our API and the corresponding Swagger code generated, we are now able to create the API handler and mount it.

Navigate to `mymove/pkg/handlers` and create a new folder called `${API_NAME}api`, similar to `primeapi`, `ghcapi`, etc. Within this folder create a new file called `api.go`. Template your file like so:

```
package ${API_NAME}api

import (
	"log"

	"github.com/go-openapi/loads"

	"github.com/transcom/mymove/pkg/gen/${API_NAME}api"
	${API_NAME}ops "github.com/transcom/mymove/pkg/gen/${API_NAME}api/${API_NAME}operations"
	"github.com/transcom/mymove/pkg/handlers"
)

func New${API_NAME}API(handlerConfig handlers.HandlerConfig) *${API_NAME}ops.MymoveAPI {
	${API_NAME}Spec, err := loads.Analyzed(${API_NAME}api.SwaggerJSON, "")
	if err != nil {
		log.Fatalln(err)
	}
	${API_NAME}API := ${API_NAME}ops.NewMymoveAPI(${API_NAME}Spec)
	${API_NAME}API.ServeError = handlers.ServeCustomError

	return ${API_NAME}API
}
```

This file will receive some test coverage after we add the API to the "routing" portion of our backend. Now that there is a dedicated handler func to instantiate your new API, we need to decide which server it will be attached to. 

## MilMove servers

There are four MilMove servers
- health
- no-tls
- tls
- mutual-tls

These services are launches inside the `serveFunction` within `mymove/cmd/milmove/serve.go`.

**Health**
The health server is a dedicated server only for health checks and the health API.

**no-tls**
The no-tls server is typically only utilized during development, this facilitates our client and office API calls.

**tls**
The tls server is the production server for MilMove client and office API calls

**mutual-tls**
The mutual tls server is our production server for our public API. This is where the Prime and PPTAS APIs are hosted. This server also runs
during the development environment, but is typically proxied to from the frontend on port 3000 under `primelocal:3000`. If you create your API
on the mutual-tls server (Prime router is the generic name), then you will not be able to access it under `primelocal:3000` unless you add it to the proxy at `mymove/src/setupProxy.js`. More details further along.

**Which to choose**
You are going to append your new API path to one of these servers. Most likely if you are reading this then it is not an endpoint specific to the Office, Customer, or Admin APIs, and rather a new API entirely for
another Department of Defense (DOD) agency. If you are looking to create a new API as an expansion upon internal MyMove operations, then please resort to no-tls or tls. If you are
opening access and creating a new API for a third-party agency, then you will want to use the mutual-tls server for extra security.

## Mounting your API to an existing server

At the time of this writing, all of the servers share the same routing config, where a HostRouter then routes incoming requests to the corresponding sub-router, appending additional layers of middleware security accordingly. Please
attempt to pull up the `InitRouting` func within `mymove/pkg/handlers/routing/routing_init.go`. Within this file you will find the heart of our routing configuration. Within this func you will find the routers being created within the server.
All servers call this func and depending on the domain name, will be routed to the correct router accordingly. 

Currently, the five routers are as follows
- Mil Router
  - no-tls
  - tls server
- Office Router
  - no-tls server
  - tls server
- Admin Router
  - mutual-tls server
  - proxied during development
- Prime Router
  - mutual-tls server
  - proxied under "Prime Simulator" during development
- Health Router
  - health server

The proxy will be covered further along. Please navigate to the function that creates the desired router you want to host your API on. Creating a new router should only ever be done if you are standing up a new server.

This example will utilize the Prime router. The Prime router is stood up under the `newPrimeRouter` func, and currently looks like this:
```
// This "Prime" router is really just the "API" router for MilMove.
// It was initially just named under "Prime" as it was the only use of the router
func newPrimeRouter(appCtx appcontext.AppContext, redisPool *redis.Pool,
	routingConfig *Config, telemetryConfig *telemetry.Config, serverName string) chi.Router {

	site := newBaseRouter(appCtx, routingConfig, telemetryConfig, serverName)

	mountHealthRoute(appCtx, redisPool, routingConfig, site)
	mountPrimeAPI(appCtx, routingConfig, site)
	mountSupportAPI(appCtx, routingConfig, site)
	mountTestharnessAPI(appCtx, routingConfig, site)
	mountPPTASAPI(appCtx, routingConfig, site)
	return site
}
```

This func, `newPrimeRouter`, creates a [chi router](https://github.com/go-chi/chi) with shared middleware with the `newBaseRouter` call. This means that with the chi router being created with shared middleware,
we are now able to mount paths (APIs) to the Prime router, inheriting basic middleware and then when mounting additional paths, additional middleware can be added if desired.

We are going to want to create a new function called `mount${API_NAME}`, based on the following template:

```
// Please note that this is a template that will need additional customization and security per requirements.
// For example, this mounting does not conditionally serve from within the routing config. That is a
// customization you will want to introduce.
func mount${API_NAME}API(appCtx appcontext.AppContext, routingConfig *Config, site chi.Router) {
		site.Route("/${API_NAME}/v1", func(r chi.Router) {
			r.Method(
				"GET",
				"/swagger.yaml", // Here is the endpoint we are going to hit to make sure our API is mounted and reachable
				handlers.NewFileHandler(routingConfig.FileSystem,
					routingConfig.${API_NAME}SwaggerPath))
			if routingConfig.ServeSwaggerUI { // Conditionally loading the SwaggerUI just like the other APIs
				r.Method("GET", "/docs",
					handlers.NewFileHandler(routingConfig.FileSystem,
						path.Join(routingConfig.BuildRoot, "swagger-ui", "${API_NAME}.html"))) // Here's that HTML file we made earlier
			} else {
				r.Method("GET", "/docs", http.NotFoundHandler())
			}
			api := ${API_NAME}api.New${API_NAME}API(routingConfig.HandlerConfig)
			tracingMiddleware := middleware.OpenAPITracing(api)
			r.Mount("/", api.Serve(tracingMiddleware))
		})
}
```

Now, add this mounting func to the router you want to branch off, in our example we used the Prime router.

Example
```
  ...
	mountSupportAPI(appCtx, routingConfig, site)
	mountTestharnessAPI(appCtx, routingConfig, site)
	mountPPTASAPI(appCtx, routingConfig, site)
  mount${API_NAME}(appCtx, routingConfig, site) // Order does not matter
	return site
  ...
```

## Creating a proxy for your API

:::tip
Just because you don't proxy your API doesn't mean you can't reach it. Typically, this is only really even necessary for mutual-tls APIs, but it is not required.
For example, if you are hosting on the Prime then it will be immediately mounted and hosted on the real mutual-tls server (locally) at domain `primelocal`, port `9443`.
Our documentation leads most to utilize `primelocal:3000`, this is a proxy URL. This proxy URL is only accessible while the frontend is running.
:::

We utilize a frontend proxy for our API that can be utilized during testing to make it easy to access the HTTPS api via an HTTP channel. Simply navigate to `mymove/src/setupProxy.js`
and create a new line, adding a new proxy middleware to handle routes to `/${API_NAME}` with the target of `milmovelocal`.

## Creating your API test

We are going to want to create a swagger.yaml GET request test for the new API. Routing tests can be found under `mymove/pkg/handlers/routing`. Create a new folder called `${API_NAME}_test`.
Within this folder, we want to create a new test suite for routing tests and your API. Create a file called `${API_NAME}_test.go`.

Populate `${API_NAME}_test.go` like so:

```
package ${API_NAME}api_test

import (
	"testing"

	"github.com/stretchr/testify/suite"

	"github.com/transcom/mymove/pkg/handlers/routing"
)

type ${API_NAME}APISuite struct {
	routing.BaseRoutingSuite
}

func Test${API_NAME}Suite(t *testing.T) {
	hs := &${API_NAME}APISuite{
		routing.NewBaseRoutingSuite(),
	}
	suite.Run(t, hs)
	hs.PopTestSuite.TearDown()
}
```

This creates our test suite so we can write a test for the `.yaml` file. To make a test for your `swagger.yaml` GET request, create a file called `swagger_test.go`.

Populate `swagger_test.go` like so:

```
package ${API_NAME}api_test

import (
	"io"
	"net/http"
	"net/http/httptest"

	"github.com/transcom/mymove/pkg/factory"
)

func (suite *${API_NAME}APISuite) TestSwaggerYaml() {
	routingConfig := suite.RoutingConfig()
	routingConfig.${API_NAME}SwaggerPath = "foo/bar/baz"
	swaggerContent := "some\nswagger\ncontent\n"
	suite.CreateFileWithContent(routingConfig.${API_NAME}SwaggerPath, swaggerContent)
	siteHandler := suite.SetupCustomSiteHandler(routingConfig)

  // Adjust the request requirements per server or API needs
	cert := factory.BuildPrimeClientCert(suite.DB())
	req := suite.NewAuthenticatedPrimeRequest("GET", "/${API_NAME}/v1/swagger.yaml", nil, cert)
	rr := httptest.NewRecorder()
	siteHandler.ServeHTTP(rr, req)
	suite.Equal(http.StatusOK, rr.Code)
	actualData, err := io.ReadAll(rr.Body)
	suite.NoError(err)
	suite.Equal(swaggerContent, string(actualData))
}
```

The `swagger_test.go` file should provide a test that should pass and successfully access your `swagger.yaml` file.

## Manually testing your API

Please only conduct manual testing after your testing suite has been confirmed to pass. It is better practice to troubleshoot and test within the files themselves rather than manually testing and modifying code.

Ensure all files are saved, and then turn on both your client and server. It is important to have both in case you are going to use a proxy endpoint such as `primelocal:3000`. Now,
as we didn't introduce any additional middleware security, we only need to satisfy the base router's middleware. Typically this would include creating an office session if
branched off the GHC/Office or Admin API, or having your certs already setup for something such as the mutual-tls Prime server.  If you do not know how to do this, please see
the [Setting up Postman](/docs/tools/postman/setting-up-postman.md) article.

With your client and server running, please utilize an API tool such as Postman to test a GET request to the `.yaml` file that was explicitly mounted inside the mount${API_NAME} function. If
all went well, you should successfully be able to use a GET request to hit the path of your API, meaning you have created and mounted your API within MilMove. As our API architecture
is subject to change, please reach out to the MilMove developers for any additional assistance or troubleshooting during this process.

## Related:

* [Acceptance testing payment requests](/docs/backend/testing/acceptance-testing-payment-requests)
* [How To Call Swagger Endpoints from React](/docs/frontend/guides/access-swagger-endpoints-from-react)
* [Acceptance Testing Prime API](/docs/api/testing/acceptance-testing-prime-api-endpoints)
* [How to Deprecate an API Endpoint](/docs/api/guides/how-to-deprecate-endpoints)
* [How to Test the Prime API](/docs/api/testing/how-to-test-the-prime-api)
* [Creating an Endpoint](/docs/api/guides/guide-to-creating-an-endpoint)
* [Creating an API](/docs/api/guides/guide-to-creating-an-api)
* [Swagger tutorial](https://goswagger.io/tutorial/todo-list.html)
