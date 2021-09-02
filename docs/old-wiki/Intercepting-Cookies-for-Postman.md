# Intercepting Cookies for Postman

Please follow [these initial setup instructions](https://github.com/transcom/mymove/wiki/Setting-Up-Postman) first!

For these APIs, we need to supply Postman with the appropriate session cookies from a logged-in user. One way to do this is the Interceptor Chrome extension from Postman. It creates a connection between Chrome and Postman that lets Chrome capture the cookies from a browser session and pass them on to your Postman app. We'll use Interceptor in Chrome to capture cookies as we log in to the app, and then switch to Postman to make the request.

This doc will take you through the following steps:

* [Install Postman and Interceptor](#install-postman-and-interceptor)
* [Find and transfer the necessary cookies](#find-and-transfer-the-necessary-cookies)
* [Form a working GET and PATCH request in Postman](#form-a-working-get-and-patch-request-in-postman)

## Install Postman and Interceptor

* [Install Postman](https://www.postman.com/)

* [Install Postman Interceptor for Chrome](https://chrome.google.com/webstore/detail/postman-interceptor/aicmkgpgakddgnaphhhpliifpcfhicfo?hl=en)
* Open Postman and [follow these instructions](https://learning.postman.com/docs/sending-requests/capturing-request-data/interceptor/#installing-interceptor) for installing Interceptor. Pasted below:
    * Navigate to the Postman app and click the satellite icon in the upper-right corner to **Capture requests and cookies with Postman**. You can then enable those two features in their respective tabs. Under **Requests**, change **Source** to Interceptor.
    * Select **Install Interceptor Bridge** to download the Bridge, an independent executable that facilitates communication with the Interceptor.
    * If you're on Windows or Linux, Postman will take care of everything for you. If you're on MacOS, you'll be prompted to install NodeJS if it's not already installed on your computer.
    * Confirm Interceptor is ready to use by checking that the **Interceptor connected** status is green. You can now capture requests from your browser and cookies from any domain to use in Postman.

* Turn on cookie syncing for Milmove domains.
    * Click again on the satellite icon and click on the **Cookies** tab.
    * Make sure **Capture Cookies** is toggled **On.**
    * Under **Domains**, add the following domains:
        * `admin.stg.move.mil`
        * `adminlocal:3000`
        * `office.stg.move.mil`
        * `officelocal:3000`

![Screenshot of Postman Interceptor settings](/img/postman/postman_interceptor_add_domains.jpg)


## Find and transfer the necessary cookies

We’ll run through an example with the Admin API.

* In your terminal, `make server_run` and `make admin_client_run`

* In the Admin app, click **Local Sign In** and log in as an admin user.

* In Postman, make GET request to an Admin endpoint. e.g.  `http://adminlocal:3000/webhook_subscriptions`

* Some people have luck with Interceptor successfully updating all cookies on the first try, and you may get a 200 here! But it’s common to get a `403 Unauthorized` at this point. To fix, we’ll update the `admin_session_token` manually in Postman.

* In Chrome, open up dev tools -> Application -> Cookies -> Copy the token for `admin_session_token`

* In Postman, click the `Cookies` link in your Request view. You should see three values populated. Click the `admin_session_token` cookie, paste in your new value, and save.

![Screenshot of Cookies link in Postman](/img/postman/postman_cookies_link.jpg)

![Screenshot of Cookies view in Postman](/img/postman/postman_update_admin_session_token.jpg)

* Retry the `GET` request. You should receive a 200!


## Form a working GET and PATCH request in Postman


At this point, you’ve already made a successful `GET` request. Now that your session token is updated and Interceptor is working, you should be able to make any `GET` requests without further setup.

To do a `POST`, `PUT`, or `PATCH` request, you'll need to add a new header.

* In Postman, click the `cookies` link in your Request view. You should see three values populated. Click the `masked_gorilla_csrf` cookie, and copy the value.
* In the Request view, click **Headers.** Add a header for your request with the key `X-CSRF-TOKEN` and value `{masked_gorilla_csrf value you copied}` ![Screenshot of how to update a header in Postman](/img/postman/postman_update_csrf_header.jpg)
* Add your Request body for your update, and hit Send. Success!

## Troubleshooting
Can't connect to Postman's request interceptor after install?

* It's possible that `~/.postman/InterceptorBridge/InterceptorBridge` is trying to look for a local install of `Node`.
  * Try installing `Node` with `brew install node`
  * Then restart the Postman desktop app
