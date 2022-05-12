---
sidebar_position: 6
---

# Writing Frontend Tests: Enzyme and React Testing Library

We use both Enzyme and React Testing Library (RTL) to create unit/component-level tests. These two libraries work off very different philosophies, but can be used within the same files without conflict. 

We now favor RTL over Enzyme and over time the code base will reflect this change.

## Enzyme

Most of our tests are currently written in Enzyme. This was the initial testing library of choice for the frontend.

While we have largely used it to test component user interactions, it is also well-suited to test component internals. However, this style of testing has been deprecated by the React team in favor of RTL.

## React Testing Library

This library focuses on user-oriented component-level tests. You cannot test component state or internals with RTL. Instead, you test how the user interacts with the component and what the results are that are reflected to the user.

This is the testing library recommended by the React team.

## Why not choose one or the other?

Migrating all of our tests to RTL will require effort spread out over time. There is also a learning curve for those who either have learned Enzyme or are unfamiliar with writing tests while they get up to speed with RTL. 

Since both libraries can coexist, we chose to move forward with RTL rather than wait for a full migration away from Enzyme.

## When should I use Enzyme? When should I use RTL?

In general and within reason, if you are writing a new test, it should be written with RTL.

Exceptions to this case include:
- Lack of RTL knowledge/understanding that significantly slows development time on a particular story.
- Deadlines where existing Enzyme tests can be quickly modified/duplicated to expedite completion of a story.
- Rare cases where Enzyme is better suited to testing a particular component interaction.

## Resources

### On moving from Enzyme to RTL
[Migrate from Enzyme](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme)

[Enyzme vs RTL, a mindset shift](https://blog.logrocket.com/enzyme-vs-react-testing-library-a-mindset-shift/)

[Sometimes we really do need to test an internal function](https://www.wisdomgeek.com/development/web-development/javascript/how-to-unit-test-private-non-exported-function-in-javascript/)

### React Testing Library
[Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)

[Introducing the react-testing-library](https://kentcdodds.com/blog/introducing-the-react-testing-library)

[React Testing Library official documentation](https://testing-library.com/docs/react-testing-library/intro/)

### Enzyme
For Enzyme resources see our guide on [How To Unit Test React Components](unit-test-react-components.md)
