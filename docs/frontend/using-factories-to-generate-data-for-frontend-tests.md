---
sidebar_position: 8
---

# [WIP] Using factories to generate data for front-end tests

## Writing a new factory

Create and export a const called `{OBJECT_}FIELDS`. This constant should be an object whose keys are CAPITAL_SNAKE_CASE and whose values are the actual, camelCase names of the fields, e.g. `MY_FIELD: myField`. While this step is not strictly necessary, it will make using your factory much easier, since the keys in question will be available to your IDE.

Create a const called `{object}Factory`, giving it a camelCase name. This const is a function that

- takes params
- returns a `baseFactory`, into which is passed an object containing
  - `fields`: the fields your factory returns
  - any other configuration passable to the `build()` functions [here](https://www.npmjs.com/package/@jackfranklin/test-data-bot), such as `postBuild` or `traits`.
  - the spread params: `...params`.

Export your factory by default.

### Build and post-build

Factories generate data in two phases, the build and the post-build. Most values can be generated in the build phase. Use postBuild when the value of one field should be based on the value of another generated value.

### Fields

The fields object defines the structure and values of the object your factory will return. This happens at build time. Values of this object can be literals, functions, or another object containing either.

```javascript
  [BASE_OBJECT.FIELDS]: {
    [OBJECT_FIELDS.FIELD_1]: 'value',
    [OBJECT_FIELDS.FIELD_2]: myCoolFunction,
    [OBJECT_FIELDS.FIELD_3]: {
      [SUBOBJECT_FIELDS.FIELD_1]: 'value',
    }
  }
```

#### Literals

If your field's value is a literal, the factory will always return that value. For example:

`field: 'my value'`

will always set the value of `field` to `'my value'` by default (i.e., unless)

#### Functions

Functions will be evaluated and the field set to their value. This is handy when a hardcoded value shouldn't be set, which is usually the case. You might generate an ID with a function, for example.

#### Objects

Fields can be set to objects and their values will be set recursively.

### Subfactories

If your object has fields that themselves can be generated by a factory, you can pass in a factory function as the value of that field:

`[OBJECT_FIELDS.SUBOBJECT_FIELD]: (args) => subobjectFactory(args)`

Be sure not to call the function, or its override features will not work.

### Traits

Traits are a way to set a number of fields at a time easily. The values of a trait's overrides will override any that the factory generates by default.

```javascript
[BASE_FIELDS.TRAITS]: {
    [OBJECT_TRAITS.MY_TRAIT]: {
      [BASE_FIELDS.OVERRIDES]: {
        [OBJECT_FIELDS.FIRST_FIELD_TO_OVERRIDE]: 'overrideValue',
        [OBJECT_FIELDS.SECOND_FIELD_TO_OVERRIDE]: 'overrideValue',
      }
    }
}
```

Note that the structure of these traits is the same as the object passed into a factory when it is actually called (see below).

Traits are used by setting the `useTraits` key to an array of traits when the factory is called, which are executed in order (see below).

### PostBuild

The postBuild function can be used to set values on the object based on other generated values.

```javascript
[BASE_FIELDS.FIELDS]: {
  [OBJECT_FIELDS.STATE]: getRandomState,
}
[BASE_FIELDS.POST_BUILD]: (object) => {
  object[OBJECT_FIELDS.POSTAL_CODE] = getPostalCodeFromState(object[OBJECT_FIELDS.STATE]);
}
```

### To fake() or not to fake()

When declaring fields, the function that returns their values will usually be wrapped in `fake()`, which is a wrapper for test-data-bot's `perBuild()` function.

```javascript
  [BASE_FIELDS.FIELDS]: {
    [OBJECT_FIELDS.STATE]: fake(getRandomState)
  }
```

This ensures that for successive calls to the same generator, unique values are generated.

Note that `fake()` can only be used in the build phase. It is out-of-scope post-build. In the post-build phase, just call a function directly.

```javascript
  [BASE_FIELDS.POST_BUILD]: (object) => {
    [OBJECT_FIELDS.POSTAL_CODE]: getPostalCodeFromState(object.state)
  }
```

Note: passing a factory function to `fake()` is an antipattern. Factories handle their own uniqueness constraints. Set the factory function directly as the property.

```javascript
[BASE_FIELDS.FIELDS]: {
  [OBJECT_FIELDS.ADDRESS]: (addressParams) => addressFactory(addressParams)
}
```

### Basic generators and Helpers

We use [faker](https://github.com/faker-js/faker) to generate basic data.

A number of helpers are also available for generating common data types that are not directly available from faker. A simple example is GBLOCs, which simply generators four capital letters:

```javascript
// helpers.js
export const gblocHelper = (f) => f.random.alpha({ count: 4, casing: 'upper' });

// factory.js
[BASE_FIELDS.FIELDS]: {
  [OBJECT_FIELDS.GBLOC]: fake(gblocHelper),
}
```

### Importing configuration from swagger yaml files

We use js-yaml to import specs from swagger yaml files. This can be useful for importing a set of available values that have already been defined in swagger.

For example, the `stateHelper` imports the set of states defined in the `internal.yml`:

```javascript
const spec = getInternalSpec();

export const stateHelper = () => oneOf(...spec.definitions.Address.properties.state.enum).call();
```

## Using a factory for mocking test data

A factory can be used simply by calling it, which will return its default configuration.

`const object = objectFactory();`

A number of options are available to pass when a factory is called.

### Overrides

Overrides explicitly set values on an object at build time. The key is available via `BASE_FIELDS`:

```javascript
{
  [BASE_FIELDS.OVERRIDES]: {
    [MY_OBJECT_FIELDS.FIELD]: 'my value to override',
  }
}
```

### Traits

Use traits by setting the `useTraits` key to an array of traits. Traits are applied in order, overriding any default values, before postBuild is executed.

`{ [BASE_FIELDS.USE_TRAITS]: [MY_OBJECT_TRAITS.TRAIT_1, MY_OBJECT_TRAITS.TRAIT_2] }`

### Lazy overrides

Lazy overrides explicitly set values on an object at postBuild time, taking precedent over any set at build time.

```javascript
{
  [BASE_FIELDS.LAZY_OVERRIDES]: {
    [MY_OBJECT_FIELDS.FIELD]: 'my higher priority value',
  }
}
```

### Field customization precedence

The order of precedence of field customizations is:

defaults < overrides < traits < lazy overrides

So, setting a value via a trait takes precedence over setting a value on the same field with an override, etc.

### Naming mock data

Be sure to prefix your test data with `mock`. Without the prefix, jest will complain about out-of-scope variables.

`const mockObject = objectFactory()`