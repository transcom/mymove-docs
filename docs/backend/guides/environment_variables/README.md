# Environment Variables

To manage our environment variables, we use [direnv](https://direnv.net/) which evaluates the `.envrc` file when changing into the repository directory.

```shell reference
https://github.com/transcom/mymove/blob/b059c86e383567db8499b55c2ff38e2ea0655983/.envrc#L51-L79
```

The above lines of code evaluates the `.envrc.chamber`.
The below lines of code highlights where `.envrc.chamber` makes the AWS call to get stuff from chamber.

```shell reference
https://github.com/transcom/mymove/blob/5f76c57d8192cf976c6bb6a4586c580384afe1ca/.envrc.chamber.template#L15
```

From there, it's a matter of using the [pflag](https://pkg.go.dev/github.com/spf13/pflag) and [viper](https://pkg.go.dev/github.com/spf13/viper) packages. There was a past ADR regarding [Config Management](/docs/adrs/0028-config-management.md).
