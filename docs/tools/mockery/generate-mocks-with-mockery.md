---
sidebar_position: 1
---

# How To Generate Mocks with Mockery

[Mockery](https://github.com/vektra/mockery) provides the ability to easily generate mocks for golang interfaces. It removes the boilerplate coding required to use mocks.

 *In Golang, mocks can only be created on interfaces - not structs. So, it is important that for whichever mock you are trying to generate, it should correspond to the appropriate interface.*

## Auto-generating mocks with `go generate`

 The `make mocks_generate` command will regenerate mocks for all interfaces tagged with the appropriate `go generate` command. To add an interface to the list of auto-generated mocks, just add a
 `go:generate` comment like below and update the name with your interface name.

```.go
// AccessCodeClaimer is the service object interface for ValidateAccessCode
//go:generate mockery -name AccessCodeClaimer
type AccessCodeClaimer interface {
    ClaimAccessCode(code string, serviceMemberID uuid.UUID) (*models.AccessCode, *validate.Errors, error)
}
```

## Using Mocks

When you use the mock type, you need to know two things:

1. What you expect to receive as input.
2. What you expect to receive as output.

:::danger Pointers in Mocks
These should be defined as exactly as possible to preserve the integrity of your test. If you have to include pointer
input, you must _always_ use copies of the pointer and **_never, ever use that specific pointer again_**. Otherwise,
you could unknowingly change the input you expect and your test would be compromised.

**If you are unsure about the inputs/returns for a mock, you should not use a mock.**
:::

```go title="Example test mock"
reweigh := testdatagen.MakeDefaultReweigh(suite.DB())
reweighCopy := *reweigh // make sure the copy is a value, not a pointer

updater := mocks.NewReweighUpdater(suite.T())

updater.On("UpdateReweigh",
    mock.AnythingOfType("appcontext.AppContext"), // you can include as many input parameters
    mock.AnythingOfType("*models.Reweigh")        // as you need
).Return(reweighCopy, nil)
```

Note that this calls the generated mock function, _not_ the original.

:::tip More mocking
Use `MockedInterface.On()` to mock a method. 

Mocks also have a `AssertExpectations` method to validate expectations, such as parameter type and number of times the 
method was called. When you use `mocks.New<MockedThing>`, it automatically sets it up to call `AssertExpectations` 
at the end.

See [testify's docs](https://godoc.org/github.com/stretchr/testify/mock#Call.On) for more information.
:::
