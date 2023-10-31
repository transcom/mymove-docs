# API / Swagger

Internal services (i.e. endpoints only intended for use by the React client) are
defined in `swagger-def/internal.yaml` and served from the value of the
`basePath:` stanza at the root of the generated `./swagger/internal.yaml` file.
**Internal endpoints are not intended for use by external clients**.

The Orders Gateway's API is defined in the file `swagger-def/orders.yaml` and
served from the value of the `basePath:` stanza at the root of the generated
`./swagger/orders.yaml` file.

The Admin API is defined in the file `swagger-def/admin.yaml` and served from
the value of the `basePath:` stanza at the root of the generated
`./swagger/admin.yaml` file.

The Prime API is defined in the file `./swagger-def/prime.yaml` and served from
the value of the `basePath:` stanza at the root of the generated
`./swagger/prime.yaml` file.

You can view the documentation for the following APIs (powered by Swagger UI) at
the following URLS with a local client and server running:

- internal API: [http://milmovelocal:3000/swagger-ui/internal.html](http://milmovelocal:3000/swagger-ui/internal.html)
- admin API: [http://adminlocal:3000/swagger-ui/admin.html](http://adminlocal:3000/swagger-ui/admin.html)
- GHC API: [http://officelocal:3000/swagger-ui/ghc.html](http://officelocal:3000/swagger-ui/ghc.html)
- Prime API: [http://primelocal:3000/swagger-ui/prime.html](http://primelocal:3000/swagger-ui/prime.html)

For more information on _API / Swagger_ definitions, please review the README
documentation found in the `./swagger/README.md` and `./swagger-def/README.md`
files.
