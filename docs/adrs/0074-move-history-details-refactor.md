---
title: "0074 Refactor Move Event's Details Rendering "
---

# *0074 Refactor Move Event's Details rendering*

**🔒 User Story:** *[MB-11214](https://dp3.atlassian.net/browse/MB-12606)*

*At present, move history templates are matched based on action, event name, and table name. This expects that each action, event, and table combination is unique. However, some move history events share the same values for all three and there isn't a way to specify which template to use.*

### Useful definition
> **Matching combination:** A move event's action, eventName, and tableName.

## Example of two move events with the same action, event, and table combination

<table>
  <tr>
    <td>Approvals request</td>
    <td>Prime excess weight </td> 
  </tr>
  <tr>
    <td>

```json
{
  "action": "UPDATE",
  ...
  "changedValues": {
    "status": "APPROVALS REQUESTED"
  },
  ...
  "eventName": "updateMTOShipment",
  "tableName": "moves",
  "transactionId": 6627,
}
```

  </td>
    <td>

```json
{
  "action": "UPDATE",
  ...
  "changedValues": {
    "excess_weight_qualified_at": "2022-09-07T21:26:47"
  },
  ...
  "eventName": "updateMTOShipment",
  "tableName": "moves", 
  "transactionId": 6627,
}
```

  </td>
  </tr>
</table>

> **Note:**
> History record data has between abbreviated.


**Above there are two issues:**
1. The move events will match multiple templates
2. The move events are of different details types so the same template cannot be used.


### 1. The move events will match multiple templates
Since we assume each matching combination is unique, we create a template for each move event. Given our current setup, if multiple move event has the matching combination, the move events will be able to match to multiple templates. However the TemplateManager, still holds the assumption that 1 template will match a given move event, so it returns after the first match is found. So in our case when a move events with identical match combinations, it will show whichever template is first in the `index.js` for templates even if there is another template that is a better match.

### 2. The move events are of different details types so the same template cannot be used.
One approach could be to share the one for move events with the same matching combinations. However, the move events must have the same detail type. The detail type determines which react component will be rendered in the details column. In the example above one move event requires `labeledDetails` and the other requires `statusDetails`. Due to rigid mapping of event template to detailsType, only one detail type can be specified since there is. There is currently no supported way to display more than one detailsType within an eventTemplate.

### Scope of the issue
To find potential the scope of the issue of sharing matching combinations, the templateManager was edited to run the movement against all the templates instead of returning as soon as it found its first match. This change would make it so a template's test would fail if another template could also be a possible match.
```js
export default (historyRecord) => {
  // find all the templates that match
  const templates = allMoveHistoryEventTemplates.filter((eventType) => eventType.matches(historyRecord));
  // if the template array is length of 1 return that first value
  if (templates.length === 1) {
    return templates[0];
  }
  // else return undefined event
  return undefinedEvent;
};
```

After running the test, we found all of our existing templates match 1:1. Upon, further inspection, it looks like we solved for matching combinations mostly by [sharing templates and using ternaries to return different values](https://github.com/transcom/mymove/blob/f236493f47279345a6d280382ab13738f621c59b/src/constants/MoveHistory/EventTemplates/updateMTOShipmentDeprecatePaymentRequest.js) based on `changedValues`.

## Proposal: Refactor event templates to return their own details components.

One way to look at the issue being addressed by this ADR is that there is a restrictive constant mapping of event template to detailsType. In other words, each event template has only one detailsType, so there isn't much flexibility in how the details for an event template can be displayed. This can be addressed by removing this mapping -- getting rid of the detailsType field and any other details-related fields in the template such as "getPlaintextDetails" -- and providing a single replacement function, `getDetails`, which is responsible for returning the entire details for the event template.

### Implementation

```jsx
// approveShipment.jsx

export default {
  action: a.UPDATE,
  eventName: o.approveShipment,
  tableName: t.mto_shipments,
  getEventNameDisplay: () => 'Approved shipment',
  getDetails: (historyRecord) => {
    return <div>{`${s[historyRecord.oldValues?.shipment_type]} shipment`}</div>;
  },
};
```
This provides flexibility to return two completely different details components, perhaps based on some condition, within the same event template. 
Any existing details components such as `<LabeledDetails>` can also be returned directly from the `getDetails` function. 
Tests could also be changed to actually render components and test detail text on the screen:

```jsx
// approveShipment.test.jsx

describe('when given an Approved shipment history record', () => {
  const item = {
    action: 'UPDATE',
    changedValues: { status: 'APPROVED' },
    eventName: 'approveShipment',
    oldValues: { shipment_type: 'HHG' },
    tableName: 'mto_shipments',
  };
  it('correctly matches the Approved shipment event', () => {
    const result = getTemplate(item);
    expect(result).toMatchObject(e);
    render(result.getDetails(item));
    expect(screen.getByText('HHG shipment')).toBeInTheDocument();
  });
});
```
Such an approach would involve some work to convert the existing move history templates to follow this pattern. This work could be broken down and worked on incrementally if the `MoveHistoryDetailsSelector` is updated to accept either details provider. 


## Considered Alternatives
* *Add a new changed values criterion for distinguishing between events when matching to event templates*
* *Refactor our details types and details components so that different data can be displayed uniquely within the same details type*
* *Do nothing*

## Decision Outcome

### Chosen Alternative: *Refactor event templates to return their own details components*

* `+` *The strategy for displaying details for move history rows would be much more flexible*
* `+` *Displaying move history details would more closely resemble more conventional React-like patterns*
* `+` *Refactoring the existing event templates could be broken down and addressed incrementally.*
* `-` *Refactoring the existing event templates would be a sizeable amount of work.*
* `-` *It does not solve the issue of moving events matching to multiple templates. However, it does give the flexibility to share the same template*
## Pros and Cons of the Alternatives

### *Add a new changed values criterion for distinguishing between events when matching to event templates*
* `+` *It is the same approach used when Action and Table were added as matching criteria when Event Name was not sufficient*
* `-` *It assumes that no event will have the same action, event name, table name, and changed values. We may run into a case that meets this criterion and will have to come up with another metric in which to differentiate move events.*
* `-` *It assumes all `changedValues` listed are required. There are move events where only some of the possible `changedValues` will be present. In that situation, it will not match the template at all.*

### *Refactor our details types and details components so that different data can be displayed differently within the same details type*
* `+` *This will allow us to refactor the details component and consolidate our details types from 4 types to 2 types by combining the status, labeled detail, and plain text types.*
* `-` *Changes would eventually need all the existing event templates to update their details types or we will have to continue to support the legacy format.*
* `-` *Details components will still be rigid and could run into the same problem if a new design for details is introduced.*

### *Do nothing*

* `-` *This does not solve the situation where multiple move event shares the same action, table, and event name.*
* `-` *The move events will not consistently render the correct details*