---
sidebar_position: 7
---

# Writing Tests using React Testing Library and Jest

This guide will cover preferred strategies for testing using React Testing Library (RTL).
[This wiki](writing-frontend-tests-for-milmove.md) covers strategies for how MilMove writes tests.

## Resources
The React Testing Library documentation is a great resource, specifically; [the queries section](https://testing-library.com/docs/queries/about).

[This article](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) by Kent C. Dodds is also a useful reference. Familiarity with this article is recommended. Some of the following sections will be repeats of this article, but are once again highlighted here as they are common requests in code reviews.

One of the things we'd like to try is to use ARIA roles as much as possible. To that end, here are some MDN docs for roles: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles

## Using Screen 
Use screen for querying and debugging. This helps prevent having to keep the destructure up to date from adding or removing queries. 

Yes, good:
```
screen.getByRole(...)
```

No, avoid:
```
const { getByRole } = ...
``` 

## Using getBy or findBy over queryBy
Use `getBy...` or `findBy...` when something is expected to be in the document. Use `queryBy...` when something is not expected to be in the document. This is because `getBy...` and `findBy...` will throw errors if they don't find what they are looking for, while `queryBy...` will return null.

Note: After the first `await screen.findBy*`, the rest can be `screen.getBy*` without `await`. The only time you need to then do `await screen.findBy*` again should be if you make changes to the page and need to wait for the updates to take effect.

Yes, good:
```
expect(await screen.findByRole('heading', { name: 'Some heading', level: 2 })).toBeInTheDocument();
expect(await screen.queryByRole('heading', { name: 'Some heading not in the document', level: 2 })).not.toBeInTheDocument();
```

No, avoid:
```
expect(await screen.queryByRole('heading', { name: 'Some heading', level: 2 })).toBeInTheDocument();
```

## Using await
Use `await` in combination with `findBy...` instead of `waitFor` with 'getBy'. `findBy...` queries use `waitFor` under the hood, so it is far easier to read `await screen.findBy...` than `await waitFor(() => screen.getBy...)...` 

Yes, good: 
```
await screen.findByRole('heading', { name: 'Some heading', level: 2 }));
```

No, avoid: 
```
await waitFor(() => screen.getByRole('heading', { name: 'Some heading', level: 2 }));
```

## Using Table Driven Tests
Sometimes you want to test repetitive things, such as verifying that each field will have an appropriate error message when not filled out. To that end, you can use table driven tests.

Please wrap your table driven tests inside of a describe! It makes them easier to read when printed out to the screen. 

```
describe('description of what the table driven test is doing', () => {
  it.each([
    ['some data that you want checked', 'usually the expected value'],
    ['some other data that you want checked', 'some other value'],
  ])('this is a table test for %s', async (data, expectedValue) => {
    // Insert test that you want repeated for every item in the list.
  });
});
```

## Using Jest

### jest.fn()
jest.fn() is commonly used as a placeholder function for when a component takes in a function as a prop. 

### jest.mockImplementationOnce()
