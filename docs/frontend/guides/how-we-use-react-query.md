---
sidebar_position: 4
---
# How we use React Query

:::caution Version information
The MilMove project uses React Query v2 for the Frontend applications.
:::

[Read more about React Query in the official Overview
documentation][docs-rq-overview]. This guide is a brief primer and discusses
best practices for the MilMove project.

[docs-rq-overview]: https://react-query-v2.tanstack.com/docs

## master src/hooks/queries.js 

## Query invalidation https://react-query-v2.tanstack.com/docs/guides/query-invalidation
    - https://github.com/transcom/mymove/tree/master/src/pages/Office/Orders/Orders.jsx#L54-L69
    - `rg "from 'react-query';" | rg 'useMutation'`
## useQuery basics: https://react-query-v2.tanstack.com/docs/guides/queries
## Mutations (Updates) https://react-query-v2.tanstack.com/docs/guides/mutations
