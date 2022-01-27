---
sidebar_position: 5
---
# Running Locust from AWS

:::info Note

As of this writing (2022-01-25), the deployed locust is set up to run the prime load tests only.

:::

1. Run the port-forwarding script:

    ```sh
    aws-vault exec $AWS_PROFILE -- ./scripts/aws-session-port-forward.py
    ```

2. You can then visit <http://localhost:4000> to see the `locust` web UI for the deployed version of `locust`.

## Troubleshooting

You may see the following errors:

* `SessionManagerPlugin is not found`. If you do please follow the link and the instructions to install the Session
  Manager plugin or reference
  [the Session Manager plugin installation guide](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html#install-plugin-macos)
  directly.

* An error mentioning `credentials missing`.
    * If there is an additional reference to a specific profile. If this is the case please add the corresponding entry
      from [this AWS config template](https://dp3.atlassian.net/wiki/spaces/MT/pages/1348927493/AWS+GovCloud+Config+Templates)
      to your `~/.aws/config` file.
    * If you only see an error mentioning `credentials missing` without an additional reference to a specific profile,
      please ensure that your $AWS_PROFILE variable is not blank. This can be set by running:

      ```shell
      direnv allow
      ```