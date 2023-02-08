---
sidebar_position: 3
---

# API Style Guide

We really need a comprehensive style guide, but in the meanwhile this page will collect useful bits of style related info.

## Paths

* Use kebab-case for all paths. This is a common convention.

* In addition, since we use camelCase for parameter names, if you have parameters in your path, they will be camelCase. 

* Think of the path as pointing to a resource. A common pattern is `/resources/{resourceID}`.

* Use the plural version of a resource name unless the resource in question is a singleton within the system (for example, the overall status of the system might be `/status`). This keeps it consistent in the way you refer to particular resources.

      '/mto-shipments/{mtoShipmentID}/addresses/{addressID}':


## Parameters

### **Case**

Consistency is important and using mixed cases is confusing. We selected camelCase because it's predominant in the code base and required the least amount of effort to implement. [ADR 0044 Params Styling](/docs/adrs/0044-params-styling.md)

* Use camelCase for all API parameters in the body and path.

* Use all-caps for ID unless the whole parameter is an id. So we use `moveTaskOrderID` but we also use `id`.

  ```yaml
    id:
      format: uuid
      type: string
    moveTaskOrderID:
      format: uuid
      type: string
  ```

### **Special Parameters**
* All PUT and PATCH updates should have an eTag in the request. This is required to enforce optimistic locking. In the yaml, we mark these as `readOnly: true`.

* All endpoints should properly populate the `produces` and `consumes` properties in the yaml. This is most usually set to `application/json`.

  ```yaml
    consumes:
      - application/json
    produces:
      - application/json
  ```
## Values

* Enum values should be ALL_CAPS with underscores. 

```yaml
    enum:
      - RELEASING_AGENT
      - RECEIVING_AGENT
```

## Tags

* Use camelCase for the tags. Typically use object names for tags to group all endpoints associated with the object like `paymentRequest`.

### **Dates**

* Use Swagger supported date formats, `date-time` or `date`, depending on whether we need to store an exact timestamp of the event. [ADR 0051 Swagger Date Formats](/docs/adrs/0051-swagger-date-formats.md)

  ```yaml
      requestedPickupDate:
        format: date
        type: string
      updatedAt:
        format: date-time
        type: string
        readOnly: true
  ```

Note that **in the database**, we use the following recommendations. [ADR 0043 Prime Time](/docs/adrs/0043-prime-time.md)

* Use timestamps when recording when an action has occurred. Examples include `created_at`, `updated_at`, etc. values

* Use dates when accepting a scheduled date from the Prime. Examples include `scheduled_pickup_date`, etc. Dates are typically formatted as `YYYY-MM-DD` strings in payloads

* Note that `updatedAt` and `createdAt` should always be marked `readOnly: true`. This is because we do not use any values the caller passes in, but instead calculate them ourselves.

### Convert dates to timestamps when comparing with timestamps

1. Interpret a date in Pacific time to convert it to a naive timestamp

2. Use beginning-of-day (12:00:00 am) or end-of-day (11:59:59 pm) depending on operation being performed. In general, use the most forgiving interpretation:
    * If you’re calculating if a date is more than 10 days in the future, use end-of-day.
    * If you’re calculating if a date is more than 2 days ago, use beginning-of-day.

### Serialization

Use [RFC3339](https://tools.ietf.org/html/rfc3339) unless you have a reason not to. It handles both dates and timestamps. `ISO8601` is roughly equivalent for the purposes of this document; however, it contains many optional features and it is recommended that projects move to `RFC3339` to avoid potential issues resulting from this complexity.

* Date example: `2007-11-13T00:00:00Z` (Note that this includes zeroed out hours, minutes, etc.)
* Timestamp example: `2007-11-13T09:13:00Z`
