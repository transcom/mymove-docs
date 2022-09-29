---
title: '0074 Use changed values to match move events to their template'
---

# *Use changed values to match move events to their template*

**🔒 User Story:** *[MB-11214](https://dp3.atlassian.net/browse/MB-12606)*

*At present, move history templates are matched based on action, event name, and table name. This expects that each action, event and table combination. However there are some move history events that share the same values for all three and there isn't a way to specify which template to use. The event will then match to whichever template shows up first in the index file. This scenario can be a problem if the two events must display details in two different ways; since there is a rigid mapping of event template to detailsType, there is currently no supported way to display more than one detailsType within an eventTemplate.*

## Proposal: Clean up the current Template Manager

To be able to handle changed values. We will first need to refactor the existing [Template Manager](https://github.com/transcom/mymove/blob/master/src/constants/MoveHistory/TemplateManager.js). We will need the template manager to be able to three things:

1. [Match templates to the an event by action, event,  and table name.](#1-match-templates-to-the-an-event-by-action-event-and-table-name)
2. [Match template to an event using the change values.](#2-match-template-to-an-event-using-the-change-values)
3. [Determine if an event, needs to matched using changed values in addition matching with action, event, and table name.](#3-determine-if-an-event-needs-to-matched-using-changed-values-in-addition-matching-with-action-event-and-table-name)

### 1. Match templates to the an event by action, event, and table name.
The current template manager already does this. We can make this its own function that can be reused.
```js
   //before
    return (
      propertiesMatch(eventType.action, other?.action) &&
      propertiesMatch(eventType.eventName, other?.eventName) &&
      propertiesMatch(eventType.tableName, other?.tableName)
    );

    // after
    function matchByDefaults(template, entry) {
    return (
      propertiesMatch(template.action, entry?.action) &&
      propertiesMatch(template.eventName, entry?.eventName) &&
      propertiesMatch(template.tableName, entry?.tableName)
    );
  }
  ;

```

### 2. Match template to an event using the change values.
To match the history record entry to the correct template, we will take the history record entry's changed value object and compare the keys of that object to the expected keys for the template.
```js
  function matchByChangedValues(template, entry) {
    const entryChangedValues = Object.keys(entry.changedValues);
    const templateChangedValues = template.getChangedValues();
    return (
      templateChangedValues.length === entryChangedValues.length &&
      templateChangedValues.every((key) => entryChangedValues.indexOf(key))
    );
  }
```

### 3. Determine if an event needs to be matched using changed values in addition matching with action, event, and table name.
We will only match a template using `changedValues` if a move template includes a list of changed values. Otherwise, we will only use action, event and table name to match a template. With this check, existing move templates will not need to be updated to list their `changedValues.

```js
    if (typeof eventType.getChangedValues !== 'function') {
      return matchByDefaults(eventType, other);
    }
    else{
    return matchByDefaults(eventType, other) && matchByChangedValues(eventType, other);
    }
  ;
```

### 4. Refactor event templates to return their own details components.
One way to look at the issue being addressed by this ADR is that there is a restrictive constant mapping of event template to detailsType. In other words, each event template has only one detailsType, so there isn't much flexibility in how the details for an event template can be displayed. This can be addressed by removing this mapping -- getting rid of the detailsType field and any other details-related fields in the template such as "getPlaintextDetails" -- and providing a single replacement function, `getDetails`, which is responsible for returning the entire details for the event template.

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
Such an approach would involve some work to convert the existing move history templates to follow this pattern. This work could be broken down and worked on incremently if the `MoveHistoryDetailsSelector` is updated to accept either details provider.


## Changes to event templates

Existing event templates will not be affected by changes to Template Manager. For templates what cannot be matched using out default matching settings, a new `getChangeValues` key can be added to the template object. It is an function that will return an array with the keys of the expected changed values. These changed values will be matched against the history record `changedValues`'s object keys in the template manager.

```js
export default {
  action: a.UPDATE,
  eventName: o.updateMTOShipment,
  tableName: t.moves,
  detailsType: d.PLAIN_TEXT,
  getEventNameDisplay: () => 'Updated move',
  // new optional getChangedValues key that returns an array with the expected change values keys
  getChangedValues: () => ['excess_weight_qualified_at'],
  getDetailsPlainText: () => {
    return 'Flagged for excess weight, total estimated weight > 90% weight allowance';
  },
};
```

## Considered Alternatives
* *Add a new changed values criterion for distinguishing between events when matching to event templates*
* *Refactor our details types and details components so that different data can be displayed uniquely within the same details type*
* *Do nothing*

## Decision Outcome

### Chosen Alternative: _Add a new changed values criterion for distinguishing between events when matching to event templates_
* `+` *It is the same approach used when Action and Table were added as matching criteria when Event Name was not sufficient*
* `-` *It assumes that not no event will have the same action, event name, table name, and changed values. We may run into a case that meets this criteria and will have to come up with another metric in which to differentiate move events.*

## Pros and Cons of the Alternatives

### *Refactor our details types and details components so that different data can be displayed differently within the same details type*
* `+` *This will allow us to refactor the details component and consolidate our details types from 4 types to 2 types by combining the status, labeled detail, and plain text types.*
* `-` *Changes would eventually needed all the existing event templates to update the their details types or we will have to continue to support the legacy format.*
* `-` *Some templates will handle multiple events and this does not follow the structure of having individual event modules which was decided in [ADR 0071 Introduce Move History Events](./0071-move-history-events.md).*

### *Refactor event templates to return their own details components*
* `+` *The strategy for displaying details for move history rows would be much more flexible*
* `+` *Displaying move history details would more closely resemble more conventional React-like patterns*
* `+` *Refactoring the existing event templates could be broken down and addressed incrementally.*
* `-` *Refactoring the existing event templates would be a sizeable amount of work.*

### *Do nothing*

* `-` *This does not solve the situation where multiple move event shares the same action, table and event name.*
* `-` *The move events will not consistently render the correct details*
