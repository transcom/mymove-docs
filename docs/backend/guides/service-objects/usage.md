---
sidebar_position: 7
---
# Usage

Service objects are often used in other services, but they're most commonly used by our handler functions. Handlers are
the **presentation layer** of our backend, and they correspond to API endpoints.

In either case, they will be used in much the same way. Service objects are often (although not necessarily) defined as
a dependency in a struct:

```go
// CreatePetHandler is the handler for the API endpoint to create a pet
type CreatePetHandler struct {
	handlers.HandlerConfig
	creator services.PetCreator // our service object
}
```

When that struct is being instantiated, they are created using their `New<MyServiceObject>` function:

```go
// First we need to initialize our service object. Here we're using the Customer version, which needs the string checker
petCreator := pet.NewCustomerPetCreator(stringchecker.NewStringChecker)

// Create an instance of CreatePetHandler, passing it the creator, and assign it to our generated Swagger Go code
internalAPI.PetCreatePetHandler = CreatePetHandler{
    ctx,
    petCreator,
}
```

And finally, once the service object is instantiated, it will be used by calling the function defined in the interface
type:

```go
// Call the service object using the creator set in our handler struct (`h` is the struct reference in this receiver 
// func)
createdPet, err := h.creator.CreatePet(appCtx, newPet)
```