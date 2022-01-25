---
sidebar_position: 15
---

# Session management

## Background
MilMove uses server-side session management because our ATO (Authority to Operate) requires that we be able to revoke individual sessions. This is not possible with JWTs (our previous session implementation) or cookies. We chose Redis because it can automatically delete expired sessions. With Postgres, we would need to run a routine
periodically to clean up stale sessions.

After researching various session management solutions, we chose
[`scs`](https://github.com/alexedwards/scs) because it was the easiest to
integrate, and it supports various stores out of the box. It is the second most
popular repo after `gorilla/sessions`. We didn't pick `gorilla/sessions` because
it suffers from memory leak issues, and uses its own `context` instead of the
`request.Context()` provided by Golang. The maintainers are aware of the issues
and have opened a GitHub issue to propose [improvements for
v2](https://github.com/gorilla/sessions/issues/105). However, it doesn't look
like any progress has been made over the past 2 years, while `scs` has
implemented most of those improvements.

## Local setup
Run `make deps` to make sure your local setup is up to date and to pull the Redis image. That should be all you need to be able to sign in and out of the various apps.

## Customization
There are various ENV vars you can set in your `.envrc.local` to customize your sessions.

### Idle timeout
`SESSION_IDLE_TIMEOUT_IN_MINUTES` defines how long you can be idle while signed in before your session expires. The default is 15 minutes and is defined in `pkg/cli/session.go`. To test a value less than 15 minutes or greater than 30 minutes, comment out the following lines in `pkg/cli/session.go`:
```go
if err := ValidateSessionTimeout(v, SessionIdleTimeoutInMinutesFlag); err != nil {
    return err
}
```
To disable idle timeout, set it to `0`.
Example usage:
```
export SESSION_IDLE_TIMEOUT_IN_MINUTES=2
```
### Session Lifetime
`SESSION_LIFETIME_IN_HOURS` defines the absolute duration of the session. For example, once you sign in, even if you make requests continually, your session will expire after the lifetime has been reached. The default is 24 hours and is defined in `pkg/cli/session.go`.
Example usage:
```
export SESSION_LIFETIME_IN_HOURS=12
```
### Session Cookie attributes
`scs` allows us to customize various attributes of the session cookie. We should rarely need to modify those, but if we need to, they are configured in `SetupSessionManagers` in `pkg/auth/session.go`.

## Redis
You shouldn't need to change any of the Redis config, but if you're curious, it's defined in `pkg/cli/redis.go`
To access the Redis console, run `redis-dev`. You can then view all keys with `KEYS *`. The session keys will have the prefix `scs:session`.
