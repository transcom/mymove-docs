import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Okta

:::tip
You can find Okta Docs for developers here: **https://developer.okta.com/**
:::

We will use Okta Identity, Credential, and Access Management (ICAM) solution for secure access to the MilMove website. Previously MilMove was using Login.gov for authentication, but it was discovered that Login.gov did not meet IAL2 services and so there was a need to switch to a more secure identity management service - enter <b>Okta</b>.

From the MilMove application, it will redirect all users to Okta when they click **Sign in**. This will prompt them to sign in (only customers can self register and have a **Sign up** button).There are two separate authentication policies for customers and office/admin users:

- **Customer**
    - Two factor authentication using any of the following:
        - Password
        - Email code
        - Okta Verify push notification
        - Okta Verify code
        - Google Authenticator
        - Smart Card authentication

:::info
The user ***MUST*** have their EDIPI/DoD ID# in their Okta profile in order to authenticate with their Smart Card.
:::
- **Back Office/Admin**
    - <i>ONLY</i> Smart Card authentication

You can access the Okta consoles here if you are a set up as a customer or admin user: <br />
Okta console for <b>TESTING</b>: `https://test-milmove.okta.mil`<br/>
Okta console for <b>PRODUCTION</b>: `https://milmove.okta.mil`

You will need an Okta account with access to each respective application, which can be done within the Okta Admin Console by designated personnel. At this time, *office* and *admin* users will be created and activated using a **CSV file** that specifies which group they are in that will automatically assign them to the application they can access. 

Only specific personnel (Okta Admin roles) are able to import this CSV file and those imported users will be unable to edit their Okta profile since the account creation/activation are done in the Okta Admin Console. If an Okta Admin needs to create another Okta Admin, they will have to do so either:

1. Manually and adding them to the appropriate groups
2. With a CSV file and allow for account activation from the user

:::info
Only customers can self register and update for an Okta account.
:::
<br/>

**TO SUMMARIZE OKTA USERS**

<Tabs>
  <TabItem value="customer" label="Customer" default>
    <b>ACCESSING:</b> my.move.mil <br/>
    <b>CREATED BY:</b> self registration <br/>
    <b>MILMOVE AUTHENTICATION:</b> two factor <br/>
    <b>OKTA DASHBOARD:</b> accessible
  </TabItem>
  <TabItem value="office" label="Back Office">
    <b>ACCESSING:</b> office.move.mil <br/>
    <b>CREATED BY:</b> CSV file <br/>
    <b>MILMOVE AUTHENTICATION:</b> CAC only <br/>
    <b>OKTA DASHBOARD:</b> not accessible
  </TabItem>
  <TabItem value="admin" label="Admin">
    <b>ACCESSING:</b> admin.move.mil <br/>
    <b>CREATED BY:</b> CSV file OR manually <br/>
    <b>MILMOVE AUTHENTICATION:</b> CAC only <br/>
    <b>OKTA DASHBOARD:</b> not accessible for some, accessible for only those that are Okta admins
  </TabItem>
</Tabs>
