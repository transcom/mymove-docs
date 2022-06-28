---
sidebar_position: 8
---

# React forms using Formik

**See also:** [Create a Form Using Formik](create-a-form-using-formik.md)

On the frontend MyMove is migrating from creating forms using the [redux-form](https://redux-form.com/) library in favor of [Formik](https://formik.org/). One major reason for the change is the desire to remove storing frequent state changes in the global redux store, when most form components can manage this locally. Using this pattern will ideally lead to more performant and self contained code.

As we migrate and introduce new forms using Formik, this can be a place to collect best practices that we learn along the way.

## Event Handling

Formik has supplied built in event handlers that it favors over creating individual ones for each input. Of course you are still free to create custom listeners and will need to for things such as click events. Built-in listeners include `handleChange`, `handleBlur`, `handleReset` and `handleSubmit`.

Formik then uses the `name` attribute to distinguish which input triggered the event.  All of your fields require defaults specified in the `initialValues` object.  After update and during submission the current values are provided in the `values` object.

## Validation

TBD

## Submission

Your submit action gets defined in the `onSubmit` property when instantiating Formik.  This is the function that gets called when `handleSubmit` is invoked either automatically from an event listener or by manually calling `submitForm`.  Validation will need to succeed for submission to continue otherwise errors will be set and submission aborts.

Assuming no validation errors your submit function will be called with the values from the form and other helper actions ([FormikBag](https://formik.org/docs/api/withFormik#the-formikbag)).  It's important to note this submit function can be either synchronous or async.  If it is declared synchronously, then you must call `setSubmitting(false)` when all work has finished.  

## Testing

Our testing setup currently includes using Jest and Enzyme when testing components.  There may be some non-intuitive gotchas to test that your Formik fields and handlers work correctly.

### Simulating events

To test our component we often want to mimic the user's interactions such as typing, clicking, and submitting a form.  Here is an example of testing that a validation error is displayed for our form that has an email input with a handleChange listener setup.

```jsx
//FormComponent.test.jsx

it('displays error message on invalid email input', () => {
    // mount the component we're testing, shallow rendering is not possible
    const wrapper = mount(<FormComponent />)

    // any actions causing state changes should be contained in act blocks or you may see errors
    act(() => {
        // Formik will not automatically provide the name identifier for your form element it
        // must be part of the event payload.
        wrapper
            .find('input[name="email"]')
            .simulate('change', { target: { name: "email", value:"@@example.com" } })
    })

    // assert that the error message is displayed after an invalid email value is entered
    expect(wrapper.find('#emailErrorMessage').text()).toBe("invalid character '@' in email format")
})
```

### Mocking functions

It's likely you'll be passing function props to your component for custom listeners for click and submit events.  In our test we'll want to [mock these values with Jest](https://jestjs.io/docs/en/mock-functions.html).

```jsx
//FormComponent.test.jsx

it('calls the onSubmit function prop when save is clicked', () => {
    // replace our real implementation with a mock one, this could also have an implementation or return a promise
    const onSubmit = jest.fn();
    // assuming our function is passed as a prop to the component
    const wrapper = mount(<FormComponent onSubmit={onSubmit}/>)

    // any actions causing state changes should be contained in act blocks or you may see errors
    act(() => {
        // our save button has a click handler set to handleSubmit
        // another option would be to simulate the submit event on the form element itself
        wrapper
            .find('button[name="save"]')
            .simulate('click', { target: { name: "save" } })
    })

    // assert that our function was called at least once
    expect(onSubmit).toHaveBeenCalled()
})
```

### Async concerns

You may run into difficulty because of the async nature of the event callbacks and making sure your tests don't run assertions before these updates have concluded.

```jsx

// create a test case that can use async/await 
it('calls the onSubmit function prop when save is clicked', async () => {

})
```

```jsx

// wait for simulated events and state changes to finish prior to assertions
await act(async () => {
    form.simulate('submit')
})
```

Finally if the state has changed of your component, calling Enzyme's [update function](https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/update.html) to sync can help if your assertions are failing.

```jsx
const wrapper = mount(<FormComponent />)

// wait for simulated events and state changes to finish prior to assertions
await act(async () => {
    form.simulate('submit')
})
// state has changed so resync our component (not rerender)
wrapper.update()

// now do your assertion
```

## Accessibility

TBD
