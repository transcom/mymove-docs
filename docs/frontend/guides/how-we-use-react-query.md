---
sidebar_position: 4
---
# How we use TanStack Query

:::caution Version information
The MilMove project uses **TanStack Query v4** for the Frontend applications. Within TanStack Query, we are using the React framework, a combination colloquially known as **React Query**.
:::

:::success Ask in Slack
If you have any questions, ask in [#prac-frontend][slack-fe] /
[#prac-engineering][slack-eng] for help.

[slack-fe]: https://ustcdp3.slack.com/archives/CTQQJD3G8
[slack-eng]: https://ustcdp3.slack.com/archives/CP6PTUPQF
:::

## Overview

[Read more about React Query in the official Overview
documentation][docs-rq-overview]. This guide is a brief primer and discusses
best practices for the MilMove project. Instead of being comprehensive, this
documentation strives to be a starting point for the official documentation with
references to how to find the particular React Query functions within the
MilMove codebase using the official GitHub search functionality. This search
functionality can also be achieved locally using command-line tools such as
`grep` or `ripgrep`.

[docs-rq-overview]: https://tanstack.com/query/v4/docs/react/overview

## `useQuery` Basics

:::note Official documentation
[Read the official documentation on this here][docs-rq-usequery-basics].
[docs-rq-usequery-basics]: https://tanstack.com/query/v4/docs/react/guides/queries
:::

On the MilMove project we setup all of our [custom React Query hooks in the same
file][gh-mymove-hooks-queries], with the exceptions of Mutations. For Mutations
we create these on a per-page or per-Component basis. 
```js reference
https://github.com/transcom/mymove/blob/main/src/hooks/queries.js#L61-L71"
```
When writing a custom query, you can choose to spread the queryKeys to the query function.
```js title="src/hooks/queries.js"
export const useNewCustomQueries = (moveCode) => {
    const { data: move, ...moveQuery } = useQuery({ 
    queryKey: [KEY, moveCode],
    // highlight-next-line
    queryFn: ({ queryKey }) => getMove(...queryKey)});

    const { isLoading, isError, isSuccess } = getQueriesStatus([movesQuery]);
    return {move,orders,isLoading, isError,isSuccess,};
};

```
Or you can pass only the queryKey need for the api call.

```js title="src/hooks/queries.js"
export const useNewCustomQueries = (moveCode) => {
    const { data: move, ...moveQuery } = useQuery({ 
    queryKey: [KEY, moveCode],
    // highlight-next-line
    queryFn: ({ queryKey }) => getMove(queryKey[1]),
    });
    
    const { isLoading, isError, isSuccess } = getQueriesStatus([movesQuery, ordersQuery]);
    return {move,orders,isLoading, isError,isSuccess,};
};

```
Multiple queries can be in the same custom Query. If the one query has a dependency based on another query's data, setting the `enabled` key with the needed value will paused the query while that value is undefined.

```js reference
https://github.com/transcom/mymove/blob/main/src/hooks/queries.js#L166-L201
```

[gh-mymove-hooks-queries]: https://github.com/transcom/mymove/search?l=JavaScript&q=%22useQuery%28%22

## Mutations (Updates)

:::note Official documentation
[Read the official documentation on this here][docs-rq-mutations-updates].
[docs-rq-mutations-updates]: https://tanstack.com/query/v4/docs/react/guides/mutations
:::

On the MilMove project, [we create Mutations for specific Components or
Pages][gh-mymove-use-mutation]. The reason for that is because these Mutations
have callback functions that are specific to user actions. This allows us to do
specific Component or Page actions on Success or Error related to the data being
shown on that Component or Page.

### Writing Mutations

There are some common ["gotchas"](https://tkdodo.eu/blog/mastering-mutations-in-react-query#common-gotchase) that can cause mutations to not behave as expected. To avoid those issues, the examples below give examples of best practices to follow in order for mutations to work consistently. These preferences were influenced by methods recommended by the maintainers of React Query.


#### Mutate functions

:::tip TDLR;
Preference is given to using the `mutate` function because errors are handled by React Query.
:::

There are two mutation functions, `mutate` or `mutateAsync`. The `mutate` function does not return anything and utilizes React Query's built in error handling. However there still access to the mutated data via React Query's callbacks.


```js
import { useMutation } from '@tanstack/react-query'

const {mutate: myMutation } = useMutation({mutateFn: functionToBeCalled});

const onSubmit = () => {
    myMutation(variables, {
        onSuccess: (result) => {
            console.log(result)
            history.push(path)
        }
    })
}
```

The `mutateAsync` function returns a promise but requires manual error handling.

```js 
import { useMutation } from '@tanstack/react-query'

const {mutateAsync: myAsyncMutation } = useMutation({mutateFn: functionToBeCalled});

const onSubmit = async () => {
    try{
        const result = await myAsyncMutation();
        console.log(result);
        history.push(path);
    }   
    catch(error) {
        console.log(`Handle this ${error}`)
    }
}
```
#### Mutation callbacks
:::info Note
 In this codebase, the mutation is often created in a different component that where mutate function is called.
:::

 Callbacks maybe not fire as expected. To avoid that issue, logic should be handled in the `useMutation` callback which is called first. 
 ```jsx reference
https://github.com/transcom/mymove/blob/main/src/pages/Office/EditShipmentDetails/EditShipmentDetails.jsx#L22-L30
```
UI changes should happen in the `mutate` callback which is called second after the `useMutation` callback. This is handled second so the mutation can complete. 

```jsx reference
https://github.com/transcom/mymove/blob/main/src/components/Office/ShipmentForm/ShipmentForm.jsx#L330-L339
```

 If UI changes, such navigating to a new page, happen on the `useMutation` callback, the mutation will prematurely end. In this codebase, the mutation is often created in a different component that where mutate function is called.




[gh-mymove-use-mutation]: https://github.com/transcom/mymove/search?l=JavaScript&q=%22useMutation%28%22

## Query invalidation

:::note Official documentation
[Read the official documentation on this here][docs-rq-query-invalidation].
[docs-rq-query-invalidation]: https://tanstack.com/query/v4/docs/react/guides/query-invalidation
:::

[We use query invalidation to fetch new data][gh-mymove-invalidate-queries] from
the APIs that `useQuery` fetches from.  Only use this when you want to fetch new
data related to the Entity that you're updating. Make sure you also fetch new
data for related Entities as well.

```js

import {useQueryClient} from '@tanstack/react-query'

const queryClient = useQueryClient()

const {mutate: myMutation } = useMutation({
    mutateFn: functionToBeCalled,
    onSuccess: () => {
        // highlight-next-line 
        queryClient.invalidateQueries({queryKey: [KEY_1, KEY_2]})

    }
});

```

[gh-mymove-invalidate-queries]: https://github.com/transcom/mymove/search?l=JavaScript&q=%22invalidateQueries%28%22&type=

### Query cache

:::note Official documentation
[Read the official documentation on this here][docs-rq-caching].
[docs-rq-caching]: https://tanstack.com/query/v4/docs/react/guides/caching
:::

:::info About Query Cache
Currently, we access the Query cache via the QueryClient using the `useQueryClient` hook. This is mostly used to invalidate and refetch queries.  In the future, we have the ability to do Query Cache for the React Query when
we get real-user data.
:::

```js

import {useQueryClient} from '@tanstack/react-query'

        // highlight-next-line 
const queryClient = useQueryClient()

const {mutate: myMutation } = useMutation({
    mutateFn: functionToBeCalled,
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [KEY_1, KEY_2]})

    }
});

```


## Testing

:::note Official documentation
[Read the official documentation on this here][docs-rq-testing].
[docs-rq-testing]: https://tanstack.com/query/v4/docs/react/guides/testing
:::

In order to test component using React Query, it needs to have a wrapper with an instance of the query client running. `ReactQueryWrapper` is available in [testing utils](https://github.com/transcom/mymove/blob/main/src/testUtils.jsx) to accomplish that. The wrapper has been added to `MockProviders` also in the testing utils.

```js
    it('has a React Query wrapper directly', async () => {
      render(<ShipmentForm />, {wrapper: ReactQueryWrapper});
    });

    it('has a React Query wrapper via Mock Providers', async () => {
      render(
        <MockProviders>
          <ShipmentForm />
        </MockProviders>,
      );
    });

```



