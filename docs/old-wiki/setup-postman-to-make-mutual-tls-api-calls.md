# How to Setup Postman to make Mutual TLS API Calls

If you are planning to use [Postman](https://www.getpostman.com/) for testing the api you will need to make the following changes to support Mutual TLS.

## General Postman Settings

Open the general settings panel by clicking the wrench icon in the upper left corner

![Postman Settings Menu Upper Right Corner](/img/postman/postman_settings_menu.png)

Under the _General_ tab turn off **SSL certificate verification**

![Postman SSL certification verification switch](/img/postman/postman_ssl_verification.png)

Switch to the **Certificates** tab and add the development certificate with the following settings:

* **Host** `primelocal`
* **Port** `9443`
* **CRT File** `config/tls/devlocal-mtls.cer`
* **KEY File** `config/tls/devlocal-mtls.key`

![Postman client cert settings](/img/postman/postman_client_cert.png)

## Postman Environment settings

You will need to configure the base url for development or other environment you plan to connect to. Click on the gear icon near the environment pull down in the upper right of the application.

![Postman open environment dialog](/img/postman/postman_environment.png)

This will open the _Manage Environments_ dialog. Select **Add** in the lower right corner

![Postman environment dialog](/img/postman/postman_manage_environment_dialog.png)

Fill in the following details in the add new dialog and click **Add**

* **Variable** `baseUrl`
* **Initial Value** `https://primelocal:9443/prime/v1`
* **Current Value** `https://primelocal:9443/prime/v1`

![Postman environment add dialog](/img/postman/postman_manage_environment_add.png)

Once you have added this environment and closed the dialog select the new environment from the pull down.

![Postman select environment](/img/postman/postman_set_environment.png)

## Troubleshooting Postman

1. **ECONNREFUSED error in Postman**

   If you see an error that looks like the following, Postman cannot connect to your server.

    ![Postman ECONNREFUSED error](/img/postman/econnrefused.png)

   **Solution:** Make sure your server is running with `make server_run`.

2. **Unauthorized**

   If the endpoint returns Unauthorized, this could mean that your DB was unpopulated and the server was unable to find your authorization.

   The authorization for the devlocal certifications is stored in the milmove database. Perhaps your database does not contain the authorization? One common reason is that you have an old or empty database.

   **Solution:** Make sure you have a up-to-date and populated DB by running `make db_dev_e2e_populate`

3. **Socket hang up / TLS handshake error**

   If you see an error that say socket hangup, the server hung up on Postman, likely due to authentication.

   ![Postman ECONNREFUSED error](/img/postman/socket-hangup.png)

   This could be a certs related issue. Check your server log in the terminal, do you see a TLS handshake error?

   ```
   2021-01-29T02:20:25.902Z ERROR http/server.go:3093 http: TLS handshake error from 127.0.0.1:61467: tls: client didn't provide a certificate
   ```

   If so, this means Postman did not send your certificates successfully to the server when making the request, OR the server did not send the correct cert back.

   **Solution:** Make sure you have your `devlocal-mtls.cer` and `devlocal-mtls.key` set up as described above in [General Postman Settings](#general-postman-settings). This ensures you are sending the correct cert.

   If you are using `devlocal`, the server does not send a correct certificate back. Check that you have SSL certificate verification set to **off** in the Settings, this ensures you are not trying to verify that certificate.
