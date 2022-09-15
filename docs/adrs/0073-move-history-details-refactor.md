---
title: '0073 Consolidate Move History Details'
---

# *Refactor how move history templated are matched to move events*

**User Story:** *[MB-11214](https://dp3.atlassian.net/browse/MB-12606)*

*Currently, move history templates are matched based on action, event name, and table name. This expects that each action, event and table combination. However there are some move history events that share the same values for all three and there isn't a way to specify which template to use. The event will then match to whichever template shows up first.*

AN ideal solution would be one that can add a new selector without affecting the existing selectors. The currrent `getTemplate` function requires checking event, action and table for all move events. Adding a check for `changedValues` there could potentially mean a changed on every existing move detail. Other existing functions are done in the details selector. However we would need to match the correct template first.

## Considered Alternatives

* *Add a new changed values criterion for distinguishing between events when matching to event templates*
* *Refactor our details types and details components so that different data can be displayed differently within the same details type*
* *Do nothing*

## Decision Outcome

### Chosen Alternative: _Add a new changed values criterion for distinguishing between events when matching to event templates_

#### Justification: This is the only solution that will mismatched detail objects.


* *It is the same approach used when Action and Table were added as matching criteria when Event Name was not sufficient*
* *[consequences. e.g., negative impact on quality attribute, follow-up decisions required, ...]* <!-- optional -->

## Pros and Cons of the Alternatives <!-- optional -->


### *Refactor our details types and details components so that different data can be displayed differently within the same details type*

* `+` *[argument 1 pro]*
* `+` *[argument 2 pro]*
* `-` *[argument 1 con]*
* *[...]* <!-- numbers of pros and cons can vary -->

### *Do nothing*

* `-` *This does not solve the situation where a move event shares the same action, table and event name.*
* `+` *The move event will not consistently render the correct details.*
* `-` *[argument 1 con]*
* *[...]* <!-- numbers of pros and cons can vary -->
