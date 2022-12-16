# Understanding MilMove Routing

This document is a brief summary on how routing on MilMove works.

## Routing

The routing is initialized in `serve.go`, which calls `InitRouting` inside of `routing_init.go`. This initializes the routing that will be used by the MilMove application. This sets up routing for all 3 sites, the MilMove application, office, and admin. Perhaps this not ideal, but this is how it works as of the writing of this document (December 2022).
MilMove is using [Gorilla Mux](https://github.com/gorilla/mux) for routing.

## Code Snippet Analysis

:::note
This document won't analyze all the code related to how server side routing works, but select ones that are considered notable and for which there is extensive knowlege on.
:::

### Subrouting

Gorilla Mux allows easy configuration of matching routes.
Here were are matching by a path prefix. This means that any requests that are prefixed with `/static`, will use the set middleware and handlers.

Here's the code with some comments to further explain.

```golang
// Create a sub router for anything prefixed with "/static"
staticMux := site.PathPrefix("/static/").Subrouter()

// Use the following middleware
staticMux.Use(middleware.ValidMethodsStatic(appCtx.Logger()))
staticMux.Use(middleware.RequestLogger(appCtx.Logger()))

// Check if telemetryConfig is enabled before using the otel middleware
if telemetryConfig.Enabled {
    staticMux.Use(otelmux.Middleware("static"))
}

// All static GET and HEAD requests will use this handler.
staticMux.PathPrefix("/").Handler(clientHandler).Methods("GET", "HEAD")
```

### Middleware

See [Gorilla Mux Middleware](https://github.com/gorilla/mux#middleware) for details on middleware in general and how it works.

Occasionally in `routing_init.go` you will see code that looks like the following.

```golang
staticMux.Use(middleware.ValidMethodsStatic(appCtx.Logger()))
```

This is telling the static router to _use_ the `ValidMethodsStatic` middleware.

Inside of`valid_methods_static.go`, we'll see the following code.

```golang
func ValidMethodsStatic(logger *zap.Logger) func(inner http.Handler) http.Handler {
	logger.Debug("ValidMethodsStatic Middleware used")
	return func(inner http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.Method != "GET" && r.Method != "HEAD" {
				http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
				return
			}
			inner.ServeHTTP(w, r)
		})
	}
}
```

All middleware follows the format of returning a function which takes in an `http.Handler` and returns an `http.Handler`.
Inside this closure, one can do whatever one desires to do using the `http.ResponseWriter` and `http.Request`.
In this case for `ValidMethodsStatic`, the function checks if the request is either a `GET` or a `HEAD` request, and returns an error if the request is neither. Afterwards, it calls the next handler.

### Index Handler

This index handler is used to handle all path prefixes that start with `/`.

```golang
root.PathPrefix("/").Handler(indexHandler(routingConfig, appCtx.Logger())).Methods("GET", "HEAD")
```

This is the corresponding `indexHandler` function, with comments to explain.

```golang
// indexHandler returns a handler that will serve the resulting content
func indexHandler(routingConfig *Config, globalLogger *zap.Logger) http.HandlerFunc {

    // Get the path to the index file using the build root directory and then name index.html
	indexPath := path.Join(routingConfig.BuildRoot, "index.html")

    // Open the index.html file.
	reader, err := routingConfig.FileSystem.Open(filepath.Clean(indexPath))

    // If we can't open it, then client_build should be run
	if err != nil {
		globalLogger.Fatal("could not read index.html template: run make client_build", zap.Error(err))
	}

    // Get the status of the index.html file
	stat, err := routingConfig.FileSystem.Stat(indexPath)

    // We can't get the status, log error.
	if err != nil {
		globalLogger.Fatal("could not stat index.html template", zap.Error(err))
	}

	return func(w http.ResponseWriter, r *http.Request) {
        // Serve the index.html file
		http.ServeContent(w, r, "index.html", stat.ModTime(), reader)
	}
}
```

## Resources

[Gorilla Mux](https://github.com/gorilla/mux)
