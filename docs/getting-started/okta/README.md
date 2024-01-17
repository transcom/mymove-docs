---
id: Okta
sidebar_position: 2
---

We will use Okta Identity, Credential, and Access Management (ICAM) solution for secure access to the MilMove website. Previously MilMove was using Login.gov for authentication, but it was discovered that Login.gov did not meet IAL2 services and so there was a need to switch to a more secure identity management service - enter <b>Okta</b>.

When a customer, office, or admin user attempts to access any MilMove application in any environment (dev, exp, demo, loadtest, stg, prod), they will be required to first sign into Okta. After logging into Okta, they will be redirected back to the MilMove application and can use the MilMove application.

:::tip
You can find an overview of Okta and how we use it at a high level [**HERE**](/docs/getting-started/okta/00-okta-overview.md).
:::

:::info
Some tips on importing users via CSV file [**HERE**](/docs/getting-started/okta/02-csv-import.md).
:::