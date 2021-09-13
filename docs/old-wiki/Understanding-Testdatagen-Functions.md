## Why we use testdatagen functions
When we unit test our code, we need a way to insert records in the database to test with. We need sample records to manipulate, update, delete, etc.

We could create them by using Pop to create in the DB directly. However, our records have a lot of interdependencies and constraints. Here’s a subset of the constraints you’d have to understand, and handle, to create a payment request:
* Payment requests must link to existent service items.
* Payment requests must link to an existent MTO record.
* The MTO must link to an existent Orders record.
* Payment requests must use a sequence_id > 0
* Payment requests must have a PaymentRequestNumber
the list goes on…

So to test something as simple as a function to approve a Payment Request, you’d be writing a lot of test code just to create that Payment Request.

That’s where `testdatagen.Make` functions come in handy. They efficiently **create records** with **default values**, while handling all the **dependencies**, and even allowing you to **override default values**.

It's important to note that they create **records in the db** by default, so if you just want a model that doesn't need to exist in the db, use the [stub feature](#stubbing-objects). 

## How to use a testdatagen function

To use a testdatagen function, you import the testdatagen package from `github.com/transcom/mymove/pkg/testdatagen` and use the Make functions. 

Let's assume we're creating an MTOShipment.

### Defaults provided
The testdatagen function should provide defaults for value in the record, so you don't need to provide these. The following should create an MTOShipment in the db and return a model with the data.

```go
mtoShipment := testdatagen.MakeDefaultMTOShipment(suite.DB())
```

### Assertions
However if you want to change a field in the record, you can provide an `assertion` to do so. 
An assertion says, create the default record, but overwrite this field.

```go
mtoShipment := testdatagen.MakeMTOShipment(suite.DB(), 
  testdatagen.Assertions{
    MTOShipment: models.MTOShipment{
      CustomerRemarks: swag.String("my special remarks"),
    },
})
```

What this says is: create a default MTOShipment but overwrite the `CustomerRemarks` field.

**CAVEAT**: Overriding does not work for `false` boolean values. If some attribute is `true` by default, setting it to `false` via Assertions won't work. This is a [known issue in the mergo](https://github.com/imdario/mergo/issues/165) package we use for merging the structs. To work around this, you can either just avoid making the default value `true` in the base function. 

Or you can use a helper function like this:
```golang
func setDependentsAuthorized(assertionDependentsAuthorized *bool) *bool {
    dependentsAuthorized := swag.Bool(true)
    if assertionDependentsAuthorized != nil {
	dependentsAuthorized = assertionDependentsAuthorized
    }
    return dependentsAuthorized
}
entitlement := models.Entitlement{
    DependentsAuthorized:  setDependentsAuthorized(assertions.Entitlement.DependentsAuthorized),
    ...
}
```

### Dependent objects
In addition to creating the record you requested, the `MTOShipment`, the Make function will also create every nested record it needs, by calling those objects' Make functions.

Pretty awesome not to have to create all of these records!

```
MakeMTOShipment
├── MakeMove
│   ├── MakeOrder
│   │  ├── MakeExtendedServiceMember
│   │  ├── MakeDocument
│   │  └── MakeUserUpload
│   └── MakeContractor
└── MakeAddress
```

So what if you want to overwrite fields in those nested objects? You can, in fact, pass in assertions for those records. 

### Assertions on dependent records
Dependent records are things like `Move`, that `MTOShipment` nests in its model.

But the assertions work differently. You want to **flatten** the assertions, so that in the `testdatagen.Assertions` object, they are all at the top level.

Notice inside the assertions, that `MTOShipment` and `Move` are at the same level.

```go
mtoShipment := testdatagen.MakeMTOShipment(suite.DB(), 
  testdatagen.Assertions{
    MTOShipment: models.MTOShipment{
      CustomerRemarks: swag.String("my special remarks"),
    },
    Move: models.Move{
	  ReferenceID: "1234567",
    },
})
```

This ensures that when the nested Make functions get called, they can find all your assertions and apply them correctly.

### Reusing objects
In the above examples, the Make functions are always creating new records with a new uuid, so a new `MTOShipment`, `Move`, `Order` etc. At times, you may want to provide an record you have already created. 

```go
mto := testdatagen.MakeAvailableMove(suite.DB())
.
.
.
mtoShipment1 := testdatagen.MakeMTOShipment(suite.DB(), 
  testdatagen.Assertions{
    Move: mto,
})
```

This will connect that shipment to the previously created MTO. 

## Stubbing objects

In many cases, you should not need to use the DB to test logic. To keep using the handy testdatagen functions but without saving them to the DB, you can pass in the top-level `Stub: true` assertion, like this:

```go
officeUser := testdatagen.MakeTOOOfficeUser(suite.DB(), testdatagen.Assertions{
    Stub: true,
})
```
For more details, read about [[How to write fast tests]].