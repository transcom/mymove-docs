---
sidebar_position: 6
---

# Feature flags in the app

To add a new feature flag, see [[How to Set Up a Feature Flag]].

Here are the feature flags being used in the app:

# Backend Feature Flags:
Feature flags for the backend are defined in: https://github.com/transcom/mymove/blob/master/pkg/cli/featureflag.go

## `FEATURE_FLAG_SERVICE_COUNSELING`
A temporary feature flag as service counseling work goes on to gate the service counseling flow. This was added in: https://github.com/transcom/mymove/pull/6354

When `true`, all moves are routed to service counseling. This means their status gets set to `MoveStatusNeedsServiceCounseling`.

When `false`, no moves are routed to service counseling. Their status gets set to `MoveStatusSUBMITTED`. (See: https://github.com/transcom/mymove/blob/master/pkg/models/move.go#L26 for the move status types.)

## `FEATURE_FLAG_ACCESS_CODE`
This flag determines whether or not service members are prompted for an access code before they start onboarding.
