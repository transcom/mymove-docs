---
sidebar_position: 23
---

# History and Audit Logging Guide

## Tracking Event History from End to End
- [Database Triggers](#database-triggers)
- [AppContext](#appcontext-in-context)
- [Fetcher](#move-history-fetcher)
- [Frontend](#frontend-event-templates)

### Database Triggers
Move history events are created by [Event Triggers](/docs/backend/guides/how-to/add-an-event-trigger/) and are collected in a single :lock:[move history table](https://dp3.atlassian.net/wiki/spaces/MT/pages/1634992192/PO9+Technical+Implementation) which captures what event took place, what data changed, and which user initiated the event. 

To add history logging to new or untracked tables, create a new [migration script](/docs/backend/setup/database-migrations/#creating-migrations) ([example](https://github.com/transcom/mymove/pull/9422))

:::info
Some things to be aware of regarding history records:
- Events initiated by the system are logged as null users
- Changed data is stored as a JSON string, and to date all data is saved as strings regardless of initial data type
:::

### AppContext in Context
Move history utilizes [AppContext](/docs/backend/guides/use-stateless-services-with-app-context/) to capture user information about an event. Any new endpoints added should adhere to the [auditable app context](/docs/api/guides/guide-to-creating-an-endpoint/#anatomy-of-a-handler) pattern in order to correctly capture event information.

### Move History Fetcher

The heavy lifting of the Move History Fetcher is done in the raw SQL query.
:::info
References:
- :lock: [Technical Implementation](https://dp3.atlassian.net/wiki/spaces/MT/pages/1634992192/PO9+Technical+Implementation)
- [SQL Templating](/docs/adrs/using-templates-for-sql-queries)
:::


### Frontend Event Templates
On the frontend, move events are displayed based on design requirements and [event type](/docs/adrs/move-history-events). Templates are organized based on [event name](/docs/adrs/move-history-details-refactor) for clearer context and grouping. 