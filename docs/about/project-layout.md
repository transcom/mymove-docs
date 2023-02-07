# Project Layout

All of our code is intermingled in the top level directory of `mymove`. Here is an explanation of what some of these
directories contain:

- `.circleci`: Directory for CircleCI CI/CD configuration
- `bin`: A location for tools compiled from the `cmd` directory
- `build`: The build output directory for the client. This is what the development server serves
- `cmd`: The location of main packages for any go binaries we build
- `config`: Config files for the database and AWS ECS. Also certificates.
- `cypress`: The integration test files for the [Cypress tool](https://www.cypress.io/)
- `docs`: A location for docs for the project. This is where ADRs are
- `internal`: Generated code for duty station loader
- `migrations`: Database migrations, see [./migrations/README.md]
- `node_modules`: Cached javascript dependencies for the client
- `pkg`: The location of all of our go code for the server and various tools
- `public`: The client's static resources
- `scripts`: A location for tools helpful for developing this project
- `src`: The react source code for the client
- `swagger`: The swagger definition files for each of our APIs
