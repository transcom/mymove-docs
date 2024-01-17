# How to Track New Events in Move History

## Overview

Our Move history component is a useful tool for our office users; when a move is created, changed, or edited, our move history component displays the who, what, and when of those changes. We achieve this through the use of database triggers monitoring certain tables; whenever data in those tables is inserted, deleted, or updated, a record is inserted into our audit_history table to capture that event. This record contains information relevant to the transaction: when it happened, who did it, what table was changed, what was the old data, what is the new data, etc. Because the audit_history table holds the history of all moves, to pull the associated records for a move we use move_history_fetcher.sql to pull only the records that are associated with the currently viewed move.

In the front end, our MoveHistory component passes the move locator (such as 'AB6PPM') to getMoveHistory, receives the relevant data back, and passes that to our TemplateManager. The TemplateManager looks at each row, specifically the action (UPDATE, DELETE, or INSERT), eventName (the operationId), and the tableName, and determines which template to use to display that data (templates are housed in the [EventTemplates](https://github.com/transcom/mymove/tree/main/src/constants/MoveHistory/EventTemplates) directory). The template then takes the data and formats it for each particular combination of action, event, and table.

At its most basic level, here are the changes needed to track a new event in our Move history component:
1. Ensure the action is currently being tracked in our audit_history table (and add a trigger if not)
2. Check if the action is currently being tracked by our query (and add it if not)
3. Create a new event template for it in the EventTemplates directory

## Detailed Workflow

### 1. Ensure the action is currently being tracked in our audit_history table
#### files: create a migration

To accomplish this, trigger the action in the UI, then use the command line or dbeaver to view the audit_history table, sorted by timestamp.

```sql
SELECT * FROM audit_history ORDER BY action_tstamp_tx DESC LIMIT 20
```

If the action triggered an entry, you can probably move to the next step. If not, you'll need to create a database trigger in a migration ([documentation for creating a migration](https://transcom.github.io/mymove-docs/docs/backend/setup/database-migrations/#creating-migrations)):

```
milmove gen migration -n <migration_name>
```

The migration itself should look something like this:

```sql
SELECT add_audit_history_table(target_table := 'table_name', audit_rows := BOOLEAN 't', audit_query_text := BOOLEAN 't', ignored_cols := ARRAY['created_at', 'updated_at']);
```

Once you've created the migration for a database trigger, run make db_dev_fresh to migrate the changes and reset your db. Use the UI to trigger the action again, check the audit_history table and confirm that a record now exists for the transaction.

### 2. Check if the action is currently being tracked by our query
#### files: [move_history_fetcher.sql](https://github.com/transcom/mymove/blob/main/pkg/assets/sql_scripts/move_history_fetcher.sql)

The easiest way to do this is to open a new SQL script in dbeaver, copy the existing move_history_fetcher.sql file over from vscode, and hardcode the locator in single quotes.

```sql
WITH move AS (
    SELECT
        moves.*
    FROM
        moves
    WHERE
        moves.locator = 'AB6PPM'
),
...
```

If you execute this, and see an entry for your action (they're ordered so the most recent actions will be at the top), you can move on to the next step. Otherwise, you will need to add some sql to this file. There is a chance you can simply build on existing temp tables in this query. For example, if the action you're trying to track is address related, it may fit into the existing move_addresses portion of the query. If not, you will have to create a new temp table in this query.

The design pattern for that is as follows:

1. Create a new temp table, using audit_history.object_id to join the existing temp tables to have access to the data you need
```sql
ppms (ppm_id, shipment_type, shipment_id) AS (
    SELECT
        audit_history.object_id,
        move_shipments.shipment_type,
        move_shipments.id
    FROM
        audit_history
    JOIN ppm_shipments ON audit_history.object_id = ppm_shipments.id
    JOIN move_shipments ON move_shipments.id = ppm_shipments.shipment_id
),
```

2. Create another temp table (by convention, the name should end with `_logs`) to return audit_history rows and context (JSON with whatever extra data you may need thats not included in the audit_history entry)

```sql
ppm_logs AS (
    SELECT
        audit_history.*,
            jsonb_agg(
                jsonb_strip_nulls(
                    jsonb_build_object(
                        'shipment_type', ppms.shipment_type,
                        'shipment_id_abbr', (CASE WHEN ppms.shipment_id IS NOT NULL THEN LEFT(ppms.shipment_id::TEXT, 5) ELSE NULL END)
                    )
                )
            )::TEXT AS context,
        COALESCE(ppms.shipment_id::TEXT, NULL)::TEXT AS context_id
    FROM
        audit_history
    JOIN ppms ON ppms.ppm_id = audit_history.object_id
    WHERE audit_history.table_name = 'ppm_shipments'
    GROUP BY
        ppms.shipment_id, audit_history.id
),
```

3. Add the `_logs` temp table to the union chain towards the end of the query

```sql
combined_logs AS (
    SELECT
        *
    FROM
        address_logs
    UNION
    SELECT
        *
    FROM
        sit_logs
    UNION
    SELECT
        *
    FROM
        ppm_logs
...

```

Execute your script in dbeaver to test your script. If it is working, copy the script back over to vscode and replace your hardcoded locator string on line 7 with the original variable.

### 3. Create a new event template in the EventTemplates directory, following the design pattern you see in other eventTemplates

#### files: [Tables.js](https://github.com/transcom/mymove/blob/main/src/constants/MoveHistory/Database/Tables.js), [Operations.js](https://github.com/transcom/mymove/blob/main/src/constants/MoveHistory/UIDisplay/Operations.js), [FieldMappings.js](https://github.com/transcom/mymove/blob/main/src/constants/MoveHistory/Database/FieldMappings.js)

At this point, we know the backend is recording the transaction in question, and our getMoveHistory query is retrieving it. If we go to our Move history on the move, we should see entries for our new history records, with empty details. These are some of the default event templates, which are displayed if there is not a template specific to our combination of action/eventName/tableName. At this point, stub out a new event template (you pick the filename and where it is housed) with something like this:

```javascript
import React from 'react';

import a from 'constants/MoveHistory/Database/Actions';
import o from 'constants/MoveHistory/UIDisplay/Operations';
import t from 'constants/MoveHistory/Database/Tables';
import LabeledDetails from 'pages/Office/MoveHistory/LabeledDetails';
import { getMtoShipmentLabel } from 'utils/formatMtoShipment';

const formatChangedValues = (historyRecord) => {
    const { changedValues } = historyRecord;
    const newChangedValues = {
        ...changedValues,
        ...getMtoShipmentLabel(historyRecord),
    };

    return { ...historyRecord, changedValues: newChangedValues };
};

export default {
    action: a.INSERT, // action column in audit_history
    eventName: o.createMTOShipment, // event_name column in audit_history
    tableName: t.mto_shipments, // table_name column in audit_history
    getEventNameDisplay: () => 'Created shipment', // what you want the Event column to read on the UI
    getDetails: (historyRecord) => <LabeledDetails historyRecord={formatChangedValues(historyRecord)} />, // LabeledDetails will handle most formatting
};

```
Again the key points here are action, eventName, and tableName -- make sure they all align with the row. The formatChangedValues function and LabeledDetails component should do most of the heavy lifting, formatting the changedValues key-value pairs into something that can display on the MoveHistory. You may have to update some of the front end constant files:

[Tables.js](https://github.com/transcom/mymove/blob/main/src/constants/MoveHistory/Database/Tables.js) for table_name

[Operations.js](https://github.com/transcom/mymove/blob/main/src/constants/MoveHistory/UIDisplay/Operations.js) for event_name

[FieldMappings.js](https://github.com/transcom/mymove/blob/main/src/constants/MoveHistory/Database/FieldMappings.js) for values in changed_values that don't yet appear in the UI

Reach out on slack if you have any questions.

For reference:
- [PR 11628](https://github.com/transcom/mymove/pull/11628) follows a semi happy path of implementation
- [PR 11585](https://github.com/transcom/mymove/pull/11585) has to jump through some hoops to provide requested data via context