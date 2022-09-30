# login.gov authentication flow

We use login.gov for our authentication flow. This is an overview of
how that works for the backend.

See [User Management](../../about/security/user-management.md) for
more background on how users are managed.

It would be helpful to familiarize yourself with the [login.gov
integration flow](https://developers.login.gov/overview/). MilMove
apps use the [OIDC](https://developers.login.gov/oidc/) integration
from login.gov.

## Overview

When a user clicks on the "Sign In" button in one of the MilMove apps
(my, office, or admin), the browser is directed to the URL
`/auth/login-gov`. Currently each app (mil, office, admin) has its own
[client side
component](https://github.com/transcom/mymove/search?l=JavaScript&q=login-gov).

Routing for login gov authentication is set up in the
[routing_init.go](https://github.com/transcom/mymove/search?q=authMux+Handle)
file. There are 3 handlers:
  1. Redirect Handler
  1. Callback Handler
  1. Logout Handler
  
Each application uses
[middleware](https://www.alexedwards.net/blog/making-and-using-middleware)
to enforce that only [authenticated and
authorized](https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization)
users can access the application.

## Concepts
### Session

The session represents a single browser session interacting with the
app. We use a session cookie to associate the browser with the session
on the server side. On the server, we use redis for
[session-management](session-management.md).

One of our ATO requirements is that a user can only have a single
session at a time, so we associate a single sessionID with a user for
each app. The user model has a column for the current session id for
each of the apps (admin, office, mil). If a user logs in with a new
browser session (e.g. in a different browser), the new sessionID is
stored in the database and the old session deleted so it is no longer
valid.

Note that all the information related to the session is stored server
side, the session cookie only has the id used to retrieve the session
information.

### LoginGov Redirect Handler
The `/auth/login-gov` route is served by the
[RedirectHandler](https://github.com/transcom/mymove/blob/master/pkg/handlers/authentication/auth.go).
The purpose of this handler is to check and see if the user has an
existing and valid [session](session-management.md). If they do, they
do not need to log in again and are redirected to the main page of the
application.

If they do not have a session, three cookies are set:
  1. a state cookie that is used when login.gov sends the browser back
     to the application and is used to verify the incoming request.
  1. a session cookie is set to track the user and which app they are
     trying to log in
  2. a csrf cookie is set, but it is not strictly related to
     authentication.

Note that as this point, the handler does not yet know anything about
the user that is trying to log in.

The user is redirected to the [login.gov OIDC Authorization
URL](https://developers.login.gov/oidc/#authorization) with the
relevant parameters.

### LoginGov Callback Handler

After the login.gov authentication flow completes, the user is sent
back to the application at the url `/auth/login-gov/callback` with
information in the query parameters about if the authentication was
successful or not. This is the [login.gov OIDC Authoriziation
Response](https://developers.login.gov/oidc/#authorization-response)

The browser needs to send an existing session cookie and state cookie
(which it should do automatically).

If the authentication is unsuccessful, an `error` will be provided in
the query parameters with the reason. In this case the browser will be
redirected back to the main page of the application so the user could
try to log in again.

If successful, the query parameters will contain a `code` and `state`
which are validated against the information in from the original
Redirect Handler. If the original state cannot be found, that is an
authorization error and a 403 response will be sent. This is to
protect against an attacker trying to fake valid login.gov response
and so should basically never happen.

If the state matches, a [login.gov Token
request](https://developers.login.gov/oidc/#token) is made and the
token is saved in the session (e.g. in redis). This is needed so we
can log the user out of login.gov upon request.

Then a [login.gov User
info](https://developers.login.gov/oidc/#user-info) request is made.
At this point the app finally gets information about the user that has
logged in: the email address they used.

At this point, the app has verified that the user is authenticated
(e.g. they are who they say they are and own that email address) but
have not yet been authorized (e.g. are they allowed to access the
app).

To authorize a user, the information returned from the login.gov user
info request needs to be associated with a user in the database (see
also [User Management](../../about/security/user-management.md)).

The login.gov user info returns a unique uuid for the user. This uuid
should stay the same, *even if the user changes their email address in
login.gov*. The first check that is done is to see if an existing user
has a `login_gov_uuid` that matches the uuid returned in the user
info. If so, then it is a "known user" and the
[authorizeKnownUser](https://github.com/transcom/mymove/search?l=Go&q=authorizeKnownUser)
function is called. The roles are loaded from the database and checked
against the roles required by the app. If the user does not have the
appropriate roles, an Invalid Permissions response is returned.

If the uuid from login.gov does not match an existing user, this is an
"unknown user" and the
[authorizeUnknownUser](https://github.com/transcom/mymove/search?l=Go&q=authorizeUnknownUser)
function is called. If the app being accessed is the office or admin
app, the database is checked to see if a relevant user already exists
and is active.
If it doesn't, then an Invalid Permissions response is returned. The
mymove app is slightly different as we will create a user if one
doesn't already exist yet.

Next we update the session with the
[authenticateUser](https://github.com/transcom/mymove/search?q=authenticateUser)
function call so the user is fully authenticated and authorized.

When all of that has completed successfully, the user is redirected to
the home page of the application.

One important thing to note is that this authentication flow is
happening entirely server side. If a user is not authorized, the
server currently responds with a very brief "403 Forbidden" message.
If we want to present a "pretty" invalid permissions page, we would
need to redirect to a url that would be served by the client code.

### LoginGov Logout Handler

If a user is logged in to login.gov with a valid session, the
`/auth/logout` URL will destory the session (e.g. remove it from
redis) and then redirect to the [login.gov logout
url](https://developers.login.gov/oidc/#logout). After being logged
out from login.gov they are redirected back to the app home page.

