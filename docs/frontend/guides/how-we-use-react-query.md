---
sidebar_position: 4
---
# How we use React Query

:::caution Version information
The MilMove project uses **React Query v2** for the Frontend applications.
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
best practices for the MilMove project.

[docs-rq-overview]: https://react-query-v2.tanstack.com/docs

## `useQuery` Basics

:::note Official documentation
[Read the official documentation on this here][docs-rq-query-invalidation].
[docs-rq-usequery-basics]: https://react-query-v2.tanstack.com/docs/guides/queries
:::

On the MilMove project we setup all of our [custom React Query hooks in the same
file][gh-mymove-hooks-queries], with the exceptions of Mutations. For Mutations
we create these on a per-page or per-Component basis.

[gh-mymove-hooks-queries]: https://github.com/transcom/mymove/search?l=JavaScript&q=%22useQuery%28%22

## Mutations (Updates)

:::note Official documentation
[Read the official documentation on this here][docs-rq-query-invalidation].
[docs-rq-mutations-updates]: https://react-query-v2.tanstack.com/docs/guides/mutations
:::

On the MilMove project, [we create Mutations for specific Components or
Pages][gh-mymove-hooks-queries]. The reason for that is because these Mutations
have callback functions that are specific to user actions. This allows us to do
specific Component or Page actions on Success or Error related to the data being
shown on that Component or Page.

[gh-mymove-use-mutation]: https://github.com/transcom/mymove/search?l=JavaScript&q=%22useMutation%28%22

## Query invalidation

:::note Official documentation
[Read the official documentation on this here][docs-rq-query-invalidation].
[docs-rq-query-invalidation]: https://react-query-v2.tanstack.com/docs/guides/query-invalidation
:::

[There are examples in the codebase here][gh-mymove-invalidate-queries]. We use
query invalidation to fetch new data from the APIs that `useQuery` fetches from.
Only use this when you want to fetch new data related to the Entity that you're
updating. Make sure you also fetch new data for related Entities as well.

[gh-mymove-invalidate-queries]: https://github.com/transcom/mymove/search?l=JavaScript&q=%22invalidateQueries%28%22&type=

### Query cache

:::note Official documentation
[Read more about Caching in the official documentation][docs-rq-caching].
[docs-rq-caching]: https://react-query-v2.tanstack.com/docs/guides/caching
:::

:::info About Query Cache
Currently, we don't use Query Cache for React Query. We do have it for Redux.
But we have the ability to do Query Cache for the React Query in the future when
we get real-user data.
:::
