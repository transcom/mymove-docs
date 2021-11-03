---
sidebar_position: 18
---

# Loop Iteration in Golang

## Introduction

When writing loops in Go, you should be aware of how Go instantiates and uses loop variables. Consider this example
[from our code history](https://github.com/transcom/mymove/blob/b173c32688c6f1e4fedc58aaf46fd88e4afb04af/pkg/handlers/primeapi/payloads/model_to_payload.go#L55-L58):

```go
for i, m := range *moveTaskOrders {
    payload[i] = MoveTaskOrder(&m)
}
```

Go will create a single variable `m` that receives a copy of each item in the `moveTaskOrders` slice. Because `m` is
not reallocated with each loop iteration, taking the address of m (`&m`) like done above will result in an identical
pointer value every time through the loop. That can have subtle consequences that you need to keep in mind.

## Problem Manifestation

The purpose of the code above is to translate a tree of model structs to a swagger-generated payload struct to be
returned by an endpoint. However, in some cases during this translation, we take the addresses of items and
[copy them to their corresponding fields](https://github.com/transcom/mymove/blob/b173c32688c6f1e4fedc58aaf46fd88e4afb04af/pkg/handlers/primeapi/payloads/model_to_payload.go#L181-L183)
in the payload structure:

```go
return &primemessages.Address{
    // ...
    City:       &address.City,
    State:      &address.State,
    PostalCode: &address.PostalCode,
    // ...
}
```

The behavior we were seeing in the case above was that some fields like those above in the payload's `Address` structure
appeared to be the same regardless of what was in the database or the `Address` model (both of which were correct).
In fact, those fields would always be set to the values in the *last* `Address` that was processed in the loop. This is
consistent with the Go loop behavior mentioned above since the payload fields point to the correct
values in each iteration, but the subsequent iterations will overwrite the data pointed to and therefore make
them all appear to be the same after each loop iteration.

Note that this does not happen to every field in the payload because we are often not doing a direct pointer copy.
If we're just copying a value type to another value type, a copy of the value is being made so it's disassociated
from the source. If we're copying a pointer to data that is not being replaced -- for instance, if the model was
already storing a `*string` for instance, then we seem to be OK too since that pointer is to a different piece of memory, not
the loop iterator variable. It's only a problem when we're copying the address of some item in the loop
iterator variable (at least in this particular case) since that memory location will not change across iterations.
As you can see, there are some subtleties involved.

## Discovery

We recently upgraded to a newer version of `golangci-lint` which includes a newer `gosec` that will flag cases where
it thinks this situation occurs. The specific linter warning returned is `G601: Implicit memory aliasing of items
from a range statement`.

## How to Fix

The most straightforward fix is to make a local copy of the loop iterator variable within the loop itself, then
take the address of it. Since that local variable is scoped to the loop, it should be a different memory address
with each iteration. So, given our initial example above, we could change it to the following to prevent the
overwriting scenario described above:

```go
for i, m := range *moveTaskOrders {
    copyOfM := m // Make copy to avoid implicit memory aliasing of items from a range statement.
    payload[i] = MoveTaskOrder(&copyOfM)
}
```

Another alternative is to take the address of the slice elements instead:
```go
for i := range *moveTaskOrders {
    // Take the address of the slice element to avoid implicit memory aliasing of items from a range statement.
    payload[i] = MoveTaskOrder(&moveTaskOrders[i])
}
```

If using that strategy, keep in mind that you may be storing pointers to existing slice elements, so there are some
garbage collection and concurrency concerns to consider (as noted in this [Stackoverflow answer](https://stackoverflow.com/a/48826629)).

A casual observer who hasn't been exposed to this loop behavior may see the fixes above as unnecessary, so regardless
of which fix you apply, be sure to add a comment to let them know that the fix was done on purpose and should not
be accidentally undone.

Another option that achieves a similar goal would be to change the called function/method's signature to accept a [value type rather
than a reference](https://goinbigdata.com/golang-pass-by-pointer-vs-pass-by-value/):

```go
for i, m := range *moveTaskOrders {
    payload[i] = MoveTaskOrder(m)
}
```

You would no longer need the local copy in that case as calling the method would automatically make a copy, but
you would have to refactor all calls to that function/method since you would be changing its signature.

## References

- Golang Wiki: [Using reference to loop iterator variable](https://github.com/golang/go/wiki/CommonMistakes#using-reference-to-loop-iterator-variable)
- Stack Overflow: [Using Pointers in a for loop](https://stackoverflow.com/questions/48826460/using-pointers-in-a-for-loop)
- Stack Overflow: [Implicit memory aliasing in for loop](https://stackoverflow.com/questions/62446118/implicit-memory-aliasing-in-for-loop)
- [Go Gotcha: Don't take the address of loop variables](https://www.evanjones.ca/go-gotcha-loop-variables.html)
