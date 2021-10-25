---
sidebar_position: 2
---

# Creating a Local Environment for Postman

Please follow [these initial setup instructions](https://github.com/transcom/mymove/wiki/Setting-Up-Postman) first!

## Creating an environment

- Create a `.json` file with the following:

```
{
  "name": "Local GHC Development",
  "values": [
    {
      "key": "baseUrl",
      "value": "http://officelocal:8080/ghc/v1",
      "enabled": true
    },
    {
      "key": "gorillaCSRF",
      "value": "",
      "enabled": true
    },
    {
      "key": "maskedGorillaCSRF",
      "value": "",
      "enabled": true
    }
  ],
  "_postman_variable_scope": "environment"
}
```

- Fill in the two empty values and save the file. The `gorillaCSRF` and `maskedGorillaCSRF` can be found in your `officelocal` cookies in the browser.

- In Postman, click the "Environments" tab in the left sidebar.

- Click the "Import" button next to "My Workspaces" and then click the "Upload Files" button.

![Screenshot of Postman Environments](/img/postman/ghc-postman-env-setup.png)

- Select your `.json` file and upload it.

- Confirm your selection (default values are fine) and click "Import".

You should now see the `Local GHC Development` environment listed.

![Screenshot of Postman Environments](/img/postman/ghc-postman-local-env.png)


## Using the GHC environment and collection

To use the GHC environment, click on the environment dropdown on the upper right of the screen and choose the "Local GHC Development" option.

You are now ready to work with the GHC API locally!

Next steps will depend on which endpoint you are testing. You may need to add various headers or data.

![Screenshot of Postman Environment example](/img/postman/ghc-postman-final-setup.png)
