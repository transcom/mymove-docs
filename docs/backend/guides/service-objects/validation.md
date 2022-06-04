---
sidebar_position: 5
---
# Validation

We have to thoroughly validate user input to ensure it complies with our business rules for any mutations to data. To
encourage development of minimal, modular functions to check each rule, we have developed a validation pattern that 
we can use consistently throughout our service objects. We have also designed it to easily change which rules are 
applied based on the kind of user performing the action.

## The Pattern

As mentioned in the section on [Service Object Subpackage Structure](./structure#service-object-subpackage-structure),
our validation pattern revolves around using the files `rules.go` and `validation.go`.

`validation.go` contains the machinery that executes our validation in this service. It is almost entirely functional,
and will generally look similar in most services. A lot of this code is boilerplate.

`rules.go` contains our business logic. This is where we will write the functions that check each of our distinct
business rules for the object. They should be able to be called independently of each other. As business rules 
change, this should likely be the main file that has to change, unless dependencies for validation change, but that 
will be covered later.

## Implementing the Pattern

First things first, you'll need to identify some business rules or utilities that you'd like to implement.
Common checks will verify if the related move is available to the Prime contractor, if the ID/foreign key values on the
base object have been manipulated, if circumstantially required fields have been filled out, and so on.

:::caution Advanced Golang

The validation pattern documented here makes use of some advanced Go patterns. If you're struggling with the syntax or
would like more context on what is happening, you can look at the [resources section](#resources) for helpful  
explanations and examples.

:::



## Resources

* Interfaces
    * [Go by Example: Interfaces](https://gobyexample.com/interfaces)
    * [Interfaces in Go](https://golangbot.com/interfaces-part-1/)
* Function types
    * [Working with function types in Go](https://stackoverflow.com/questions/9398739/working-with-function-types-in-go)
    * [Function types and values](https://yourbasic.org/golang/function-pointer-type-declaration/)
* Variadic functions
    * [Go by Example: Variadic Functions](https://gobyexample.com/variadic-functions)
    * [Variadic Functions](https://golangbot.com/variadic-functions/)
    * [How to use variadic functions in Go](https://www.digitalocean.com/community/tutorials/how-to-use-variadic-functions-in-go)
* Closures
    * [Go by Example: Closures](https://gobyexample.com/closures)
    * [5 useful ways to use closures in Go](https://www.calhoun.io/5-useful-ways-to-use-closures-in-go/)