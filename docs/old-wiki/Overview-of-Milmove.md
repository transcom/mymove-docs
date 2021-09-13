# Overview

MilMove is a system to help service members (and other authorized personnel) move their gear and possessions from one place to another.
It also allows the GHC "Prime" Contractor to request payment for services.

![overview of milmove apis](/img/overview/milmove_api.png)

### The Apps

There are three websites (React apps) that compose the front end of the system:

- **Milmove app**, located at my.move.mil.

  This app is used by the people moving, namely the service members and their family.

- **Office app**, located at office.move.mil.

  This app is used by the [office users](User-Management) to review/approve/reject moves and payments.

- **Admin app**, located at admin.move.mil

  This app is used by [administrators](User-Management) to create new office.move.mil users and grant permissions for various office roles.

The links above (my.move.mil) are for the production versions of the site. We have multiple deployed environments, for staging and testing.

[Read more about those here](https://github.com/transcom/mymove/wiki/Deployment-Process).

### The APIs

The websites listed above are served by our APIs. However there are 2 APIs for which we don't develop a front-end website. Instead they are external facing APIs for the Prime contractor and armed services to interact with.

The two external facing APIs are served over mTLS, which is a higher security protocol than the apps use.

- **Prime API**, which is used by the GHC contractor, referred to in our system as the _Prime_.

  The Prime is the contractor who will handle all moves for USTC. Once a customer (service member or related) has entered their information in Milmove and the office user has released the move, the Prime will then perform the move. They will use the API to inform milmove of the details of the move, dates, weights, addresses. They will also use these APIs to send invoices for the move.

   > Note: Prime is just an internal name for the GHC contractor.

- **Orders API**, which is used by the services to send us *orders*.

  Service members receive *orders* to move, which include information about the destination as well as authorizations for various kinds of storage, conveyance, per diem allowances, and many more details. Currently Orders information is entered into the system manually by office personnel from a PDF. However, the Orders API is receiving that data directly from the services and eventually that data will be used as the source of truth. That process is called "Orders Ingestion". The process of getting that data into the system for use with moves is called "Orders Integration".

## Architecture

The architecture for milmove uses a Postgres database, which is accessed by a Go backend, with an ORM called Pop. We then use Swagger to define the APIs which are accessed by the React apps, as well as the external APIs.

The code for milmove, including all these apps and APIs, resides in the **transcom/mymove** repo.

Here's a simplified picture of the technologies used.

![tech stack of milmove](/img/overview/milmove_arch_simple.png)

### Pop

Pop is an an ORM, which allows us to translate database tables into Go structs. Using pop, we can manipulate Go structs instead of writing SQL statements. The Go structs are called models.

We use Pop to

- Read, validate and write models to the database.

- Run migrations on the database

- Handle and execute queries to the database

Read more about Pop here: <https://gobuffalo.io/en/docs/db/getting-started>

### Swagger

Swagger is a way to specify the APIs. We use Swagger to tie the front and back ends together. The Swagger code is found in `*.yaml` files and describes the endpoints and payloads of the API.

It's useful in several ways

- Go boilerplate code is generated from the Swagger files.

  This is done using a library called `go-swagger`. That code is automatically updated when a Swagger file is changed. These generated files are in `/pkg/gen`. The developer must then add the business logic.

- Swagger UI or Redoc generates documentation for users of the API directly from the yaml.

  For TLS APIs, we can test endpoints from within [the doc itself](#setup-milmovelocal-client).
  For mTLS APIs, you can view non-interactive documentation [here](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/transcom/mymove/master/swagger/prime.yaml)

- Swagger also has a JS client that generates a set of API functions that are hooked into the React apps giving them easier access to the data.

Read more about Swagger here: <https://swagger.io/docs/specification/2-0/what-is-swagger/>

### Historical apps [need update]

In addition to the front end interfaces, MilMove comprises a set of APIs that work over Mutual TLS:

`GEX`: Global Exchange. GEX enables the exchange of transaction data between the DoD and private entities. We use it during the invoicing phase of the move.

`DPS`: This is also the name of the system MilMove is replacing, but in terms of APIs, DPS acts as an authenticator that will route a user to DPS or MilMove, as appropriate.

### Historical note

> The history of the project is detailed in the MilMove onboarding document, but one thing for application engineers to keep in mind is that as of this writing, in early 2020, there are two different supported approaches to moves, with one being phased out, but still present in parts of the code. The old model of moves included PPM (Personally Procured Moves--do it yourself and get reimbursed) and HHG (HouseHold Goods moves--the government hires a moving company for you). In that rubric, there was no explicit role system for office app users. We are now phasing out HHG moves in favor of GHC (Global Household goods Contract) moves, in which a single company will handle all subcontracting for moves and explicit roles, like Transportation Ordering Officer (TOO) and Transportation Invoicing Officer (TIO), are defined and assigned.
