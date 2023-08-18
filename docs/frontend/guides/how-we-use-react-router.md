---
sidebar_position: 9
---

# How we use `react-router`

The implementation of routes and navigation in MilMove using `react-router` has led to the development of several common code and testing patterns. This document's purpose is to provide an overview and examples of the most frequently employed techniques and patterns within MilMove. For more on `react-router` functionality, refer to the latest [react-router documentation](https://reactrouter.com/en/main/start/overview).

## Navigate

The primary method for redirecting to a new URL using `react-router` is through the `Navigate` function. This function serves as a replacement for `history.push()`. It can be [invoked as a function](https://reactrouter.com/en/main/hooks/use-navigate) or utilized as a [component-based version](https://reactrouter.com/en/main/components/navigate) in class components where hooks are not available. One important consideration with `Navigate` is that if the path does not start with a leading slash, it is resolved relative to the parent route.

```javascript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Root path (starts with '/')
navigate('/absolute/path/to/page');

// No leading slash, path is relative
navigate('relative/path'); // go to current URL + relative/path

// Go back
navigate(-1);
```

## Links

Links (and [NavLinks](https://reactrouter.com/en/main/components/nav-link)) are also commonly used in MilMove to navigate between pages. Similar to `Navigate`, links can employ relative routing when the path lacks a leading slash. The react-router documentation describes this well:

> "A relative `<Link to>` value (that does not begin with `/`) resolves relative to the parent route, which means that it builds upon the URL path that was matched by the route that rendered that `<Link>`. It may contain `..` to link to routes further up the hierarchy. In these cases, `..` works exactly like the command-line `cd` function; each `..` removes one segment of the parent path."

```javascript
import { Link } from 'react-router-dom';

// Root path (starts with '/')
<Link to="/absolute/path/to/page" />

// relative path
<Link to="relative/path" />

// remove one segmet of parent path, then relative path
<Link to="../relative/path" relative="path"/>
```

## URL Parameters (Params)

URL parameters can be accessed using the [`useParams()`](https://reactrouter.com/en/main/hooks/use-params) hook.

```javascript
import { useParams } from 'react-router-dom';

// On a route with path something like: /moves/:moveCode/details
const { moveCode } = useParams();
```

## Routes

In `react-router` version 6, the [`<Switch>` component was replaced with the `<Routes>` component](https://reactrouter.com/en/main/upgrading/v5#upgrade-all-switch-elements-to-routes). The most significant consequence of this change is that all children of the `<Routes>` component must be pure `react-router` `<Route>` components. Previously, we employed customized route components such as `<PrivateRoute>`, which handled tasks like permission checks and displaying 'Forbidden' pages. This functionality has been refactored, and we now exclusively use pure `<Route>` components. For more details, refer to the informative guide on [composing `<Route>` in react-router v6](https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f).

## Testing and Storybook

When rendering components that depend on `react-router` functionality, an error may occur (`... may be used only in the context of a <Router> component`) due to the absence of a `react-router` setup, as would be present in the application. This scenario is quite common and we have testing utilities to aid in setting up `react-router` (and other providers) for isolated component testing or Storybook.

These utility functions and components are locate in [src/testUtils.jsx](https://github.com/transcom/mymove/blob/main/src/testUtils.jsx).

### Routing Test Utilities

If you only require a mocked `react-router`, you can employ the `renderWithRouter` function, the `MockRouterProvider` component, or the `renderWithRouterProp` function for class components that use a `router` prop. See [Additional Providers](#additional-providers) below for including additional providers.

#### Props and Function Arguments

The props and arguments for these test utilities have undergone slight changes from our previous (similar) testing utilities. All props are optional and come with reasonable defaults. Therefore, provide them only when specific routing is necessary for the component. The primary props required for customizing routing are `path` and `params`. The `path` represents a `react-router` string [path](https://reactrouter.com/en/main/route/route#path), which should typically be sourced from [constants/routes.js](https://github.com/transcom/mymove/blob/main/src/constants/routes.js). The `params` correspond to the values for [dynamic segments](https://reactrouter.com/en/main/route/route#dynamic-segments) within the `path` (segments starting with a colon). These two values ensure the proper execution of routing functionality and hooks like `useParams` without requiring individual mocks, as was previously needed with our testing utilities.

#### `renderWithRouter`

This function is used to render a component with React Testing Library (RTL) and set up `react-router`.

```javascript
import { renderWithRouter } from 'testUtils';

const routingConfig = {
  path: customerRoutes.SHIPMENT_CREATE_PATH, // /moves/:moveId/new-shipment
  params: { moveId: '976d1b02-afee-4e6e-9fe4-a18ced45807e' },
};

renderWithRouter(<MtoShipmentForm />, routingConfig);
```

#### `MockRouterProvider`

Used when you need a routing provider setup but do not want to render with [RTL](https://testing-library.com/docs/react-testing-library/intro/). Common uses include storybook and enzyme testing.

```javascript
import { MockRouterProvider } from 'testUtils';

// Enzyme mount the QAE Report Header componenr with react router setup
const wrapper = mount(
  <MockRouterProvider
    path={qaeCSRRoutes.BASE_EVALUATION_REPORT_PATH}
    params={{ moveCode: 'AMDORD', reportId: 'abc123' }}
  >
    <QaeReportHeader />
  </MockRouterProvider>,
);
```

### Additional Providers

In addition to react-router, there are three other providers frequently required for rendering components in isolation: `react-query`, `permissions`, and `redux`. Similar to the routing provider utilities, we offer utility functions and components that set up and include all these providers. The most commonly used utilities are `renderWithProviders` and `MockProviders`, which mirror the use cases of the routing-only utilities but include all other providers as well.
