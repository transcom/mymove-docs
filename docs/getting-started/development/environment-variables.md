# Environment Variables

In development, we use [direnv](https://direnv.net/) to setup environment variables required by the application.

- If you want to add a new environment variable to affect only your development machine, export it in `.envrc.local`. Variables exported in this file take precedence over those in `.envrc`.
- If you want to add a new environment variable that is required by new development, it can be added to `.envrc` using one of the following:

  ```bash
  # Add a default value for all devs that can be overridden in their .envrc.local
  export NEW_ENV_VAR="default value"

  # or

  # Specify that an environment variable must be defined in .envrc.local
  require NEW_ENV_VAR "Look for info on this value in chamber and Google Drive"
  ```

Required variables should be placed in google docs and linked in `.envrc`. The value should also be placed in `chamber`
with `DISABLE_AWS_VAULT_WRAPPER=1 AWS_REGION=us-gov-west-1 aws-vault exec transcom-gov-dev -- chamber write app-devlocal <key> <value>`. For long blocks of text like certificates you can write them with
`echo "$LONG_VALUE" | DISABLE_AWS_VAULT_WRAPPER=1 AWS_REGION=us-gov-west-1 aws-vault exec transcom-gov-dev -- chamber write app-devlocal <key> -`.

For per-tier environment variables (that are not secret), simply add the variables to the relevant `config/env/[experimental|staging|prod].env` file with the format `NAME=VALUE` on each line. Then add the relevant section to `config/app.container-definition.json`. The deploy process uses Go's [template package](https://golang.org/pkg/text/template/) for rendering the container definition. For example,

```bash
MY_SPECIAL_TOKEN=abcxyz
```

```json
{
  "name": "MY_SPECIAL_TOKEN",
  "value": "{{ .MY_SPECIAL_TOKEN }}"
}
```
