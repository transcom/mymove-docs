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

### Custom Query Example

```js
export const useNewCustomQueries = (moveCode) => {
    // First query
    const { data: move, ...moveQuery } = useQuery({ 
    queryKey: [KEY, moveCode],
    // You can choose to spread all the query keys or only send the ones needed for the api call
    queryFn: ({ queryKey }) => getMove(...queryKey),
    });
    const orderId = move?.ordersId;
    
    // Second Query
    const { data: order, ...ordersQuery } = useQuery({ 
    queryKey: [KEY, moveId],
    // You can choose to spread all the query keys or only send the ones needed for the api call
    queryFn: ({ queryKey }) => getOrders(queryKey[1]),
    // Will not execute this query until orderId id defined
    enabled: !!orderId
    });

    // Combine the statuses from all the queries into one status
    const { isLoading, isError, isSuccess } = getQueriesStatus([movesQuery, ordersQuery]);
    return {
    move,
    orders,
    isLoading,
    isError,
    isSuccess,
  };
};

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

There are two mutation functions, `mutate` or `mutateAsync`. The `mutate` function does not return anything and utilizes React Query's built in error handling. The `mutateAsync` function returns a promise but requires manual error handling. Preference is given to using the `mutate` function because errors are handled.

```js
/// mutate syntax
const {mutate: myMutation } = useMutation({mutateFn: functionToBeCalled});

const onSubmit = () => {
    myMutation(variables, {
        onSuccess: (result) => {
            console.log(result)
            history.push(path)
        }
    })
}

// mutateAsync syntax
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

There are some common ["gotchas"](https://tkdodo.eu/blog/mastering-mutations-in-react-query#some-callbacks-might-not-fire) that can cause mutations to not behave as expected. To avoid those issues, logic should be handled in the `useMutation` callback which is called first. UI changes should happen in the `mutate` callback which is called second after the `useMutation` callback. This is handled second so the mutation can complete. If UI changes happen on the `useMutation`, the mutation will prematurely end.

#### Example of mutation
```js

// Mutation creation
const { mutate: myNewMutation } = useMutation(
    {
   mutationFn: functionToBeCalled ,
     // First callback
    onSuccess: () => { 
        console.log('Where logic should be handled') 
        queryClient.invalidateQueries({queryKey: [myKey]})
        },
    onError: () => {
        console.log('Error handling');
        }
    });

// Mutation call
myNewMutation(
    variables,
    // Second callback
    {
        onSuccess: () => { console.log('Where UI changes should happen') },
        onError: () => console.log('Error handling UI');
    });

```

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

// Access query client in order to interact with the cache
const queryClient = useQueryClient()

const {mutate: myMutation } = useMutation({
    mutateFn: functionToBeCalled,
    onSuccess: () => {
        // invalidate the query after the mutation
        queryClient.invalidateQueries({
            queryKey: [KEY_1, KEY_2]
        })
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
Currently, we access the Query cache via the QueryClient. This is mostly used to invalidate and refetch queries. In the future, we have the ability to do Query Cache for the React Query when
we get real-user data.
:::
## Testing

:::note Official documentation
[Read the official documentation on this here][docs-rq-testing].
[docs-rq-testing]: https://tanstack.com/query/v4/docs/react/guides/testing
:::

In order to test component using React Query, it needs to have a wrapper with an instance of the query client running. `ReactQueryWrapper` is available in [testing utils](https://github.com/transcom/mymove/blob/main/src/testUtils.jsx) to accomplish that. The wrapper has been added to `MockProviders`.

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



