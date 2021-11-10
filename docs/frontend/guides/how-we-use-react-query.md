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
best practices for the MilMove project. Instead of being comprehensive, this
documentation strives to be a starting point for the official documentation with
references to how to find the particular React Query functions within the
MilMove codebase using the official GitHub search functionality. This search
functionality can also be achieved locally using command-line tools such as
`grep` or `ripgrep`.

[docs-rq-overview]: https://react-query-v2.tanstack.com/docs

## `useQuery` Basics

:::note Official documentation
[Read the official documentation on this here][docs-rq-usequery-basics].
[docs-rq-usequery-basics]: https://react-query-v2.tanstack.com/docs/guides/queries
:::

On the MilMove project we setup all of our [custom React Query hooks in the same
file][gh-mymove-hooks-queries], with the exceptions of Mutations. For Mutations
we create these on a per-page or per-Component basis.

[gh-mymove-hooks-queries]: https://github.com/transcom/mymove/search?l=JavaScript&q=%22useQuery%28%22

## Mutations (Updates)

:::note Official documentation
[Read the official documentation on this here][docs-rq-mutations-updates].
[docs-rq-mutations-updates]: https://react-query-v2.tanstack.com/docs/guides/mutations
:::

On the MilMove project, [we create Mutations for specific Components or
Pages][gh-mymove-use-mutation]. The reason for that is because these Mutations
have callback functions that are specific to user actions. This allows us to do
specific Component or Page actions on Success or Error related to the data being
shown on that Component or Page.

[gh-mymove-use-mutation]: https://github.com/transcom/mymove/search?l=JavaScript&q=%22useMutation%28%22

## Query invalidation

:::note Official documentation
[Read the official documentation on this here][docs-rq-query-invalidation].
[docs-rq-query-invalidation]: https://react-query-v2.tanstack.com/docs/guides/query-invalidation
:::

[We use query invalidation to fetch new data][gh-mymove-invalidate-queries] from
the APIs that `useQuery` fetches from.  Only use this when you want to fetch new
data related to the Entity that you're updating. Make sure you also fetch new
data for related Entities as well.

[gh-mymove-invalidate-queries]: https://github.com/transcom/mymove/search?l=JavaScript&q=%22invalidateQueries%28%22&type=

### Query cache

:::note Official documentation
[Read the official documentation on this here][docs-rq-caching].
[docs-rq-caching]: https://react-query-v2.tanstack.com/docs/guides/caching
:::

:::info About Query Cache
Currently, we don't use Query Cache for React Query. We do have it for Redux.
But we have the ability to do Query Cache for the React Query in the future when
we get real-user data.
:::
