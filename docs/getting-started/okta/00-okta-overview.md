import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

# Okta Overview

MilMove has two domains set up with Okta - one that serves the **testing** applications and one that serves the **production** application.<br/>

:::info Okta Testing Domain
`https://test-milmove.okta.mil`
which serves the dev, exp, loadtest, demo, and stg environments.
:::
:::info Okta Production Domain
`https://milmove.okta.mil`
which ONLY serves the prd environment.
:::

In order for a customer, office, or admin user to log into MilMove, they *MUST* have an Okta account. If they do not have an Okta account, they will be denied access to the application and returned back to the `/sign-in` page and will not be allowed to access the MilMove application.<br/>

## Getting an Okta account
Customers and Office/Admin users get Okta accounts in different ways. See below:
<Tabs>
    <TabItem label="Customers" value="customers" default>
    MilMove Customers can self-register. If they do not have an Okta account when creating a move, they can sign-up when MilMove sends them to Okta for authentication.
    </TabItem>
    <TabItem label="Office" value="office">
    MilMove Office users will not be able to self-register and will require an account to be created by an Okta Admin with a CSV file import by an Okta Admin. It is crucial to ensure that the office user's DoDID/EDIPI is accurate when being imported.
    </TabItem>
    <TabItem label="Admin" value="admin">
    MilMove Admin users will not be able to self-register and will require an account to be created by an Okta Admin with a CSV file import or manual creation of the user by an Okta Admin. It is crucial to ensure that the office user's DoDID/EDIPI is accurate when being imported.
    </TabItem>
</Tabs>

# Authenticating with Okta
Customers and Office/Admin users have different authentication methods, meaning they can sign into Okta differently. See below:
<Tabs>
    <TabItem label="Customers" value="customers" default>
    MilMove Customers can sign in with two factors. Okta will allow for <b>email</b>, <b>password</b>, <b>Okta Verify OTP or Push Notification</b>, <b>Google Authenticator</b>, or they can sign in with their <b>CAC</b> but only if their profile contains their DoDID/EDIPI number.
    </TabItem>
    <TabItem label="Office" value="office">
    MilMove Office users will only be able to sign in with their Smart Card. This can be a CAC or PIV, but an Okta Admin will need to ensure that their DoDID/EDIPI number is up to date and accurate.
    </TabItem>
    <TabItem label="Admin" value="admin">
    MilMove Office users will only be able to sign in with their Smart Card. This can be a CAC or PIV, but an Okta Admin will need to ensure that their DoDID/EDIPI number is up to date and accurate.
    </TabItem>
</Tabs>

# Okta Groups
When a user authenticates with Okta, there is an additional check that is done to allow access to an application. The user must be a part of the application's respective group in Okta. If the user is not a part of that group in Okta, then they will be denied access. When customers self-register they are **automatically** assigned to the respective Customer group, but *Office & Admin* users are assigned to their group during the [CSV import](/docs/getting-started/okta/02-csv-import.md). See the following groups in Okta and which applications they grant access to:

:::caution Okta groups matter
A user will not be allowed to access any Customer MilMove application if they are assigned to an Admin or Office group in Okta. In the rare case an office user will need to register as a customer, they will need to use a different email address and create a separate Okta account to access the Customer MilMove application.
:::

<Tabs>
<TabItem label="Dev" value="dev" default>
<CodeBlock>
https://test-milmove.okta.mil<br/>
'Dev - Customer' -> http://milmovelocal:3000<br/>
'Dev - Office' -> http://officelocal:3000<br/>
'Dev - Admin' -> http://adminlocal:3000
</CodeBlock>
</TabItem>
<TabItem label="Exp" value="exp">
<CodeBlock>
https://test-milmove.okta.mil<br/>
'Exp - Customer' -> https://my.exp.dp3.us/<br/>
'Exp - Office' -> https://office.exp.dp3.us/<br/>
'Exp - Admin' -> https://admin.exp.dp3.us/
</CodeBlock>
</TabItem>
<TabItem label="Loadtest" value="loadtest">
<CodeBlock>
https://test-milmove.okta.mil<br/>
'Exp - Customer' -> https://my.loadtest.dp3.us/<br/>
'Exp - Office' -> https://my.loadtest.dp3.us/<br/>
'Exp - Admin' -> https://my.loadtest.dp3.us/
</CodeBlock>
</TabItem>
<TabItem label="Demo" value="demo">
<CodeBlock>
https://test-milmove.okta.mil<br/>
'Exp - Customer' -> https://my.demo.dp3.us/<br/>
'Exp - Office' -> https://office.demo.dp3.us/<br/>
'Exp - Admin' -> https://admin.demo.dp3.us/
</CodeBlock>
</TabItem>
<TabItem label="Staging" value="stg">
<CodeBlock>
https://test-milmove.okta.mil<br/>
'Stage - Customer' -> https://my.stg.move.mil/<br/>
'Stage - Office' -> https://office.stg.move.mil/<br/>
'Stage - Admin' -> https://admin.stg.move.mil/
</CodeBlock>
</TabItem>
<TabItem label="Prod" value="prd">
<CodeBlock>
https://milmove.okta.mil<br/>
'MilMove - Customer' -> https://my.move.mil/<br/>
'MilMove - Office' -> https://office.move.mil/<br/>
'MilMove - Admin' -> https://admin.move.mil/
</CodeBlock>
</TabItem>
</Tabs>

# Successful Flow with Okta
A successful authentication with Okta for any user will look like this:
1. User goes to the MilMove application
2. User clicks the **Accept Terms** button and is directed to Okta to log in/register
3. If a customer, they sign in with their username in an email format and their two authenticating factors<br/>
If an office/admin, they will click the **Sign in with CAC/PIV** box, select their certificate, and enter their PIN.
4. Okta will find the user based on their entered credentials
5. Okta will make sure that they are assigned to the group that allows access to the application they were directed from
6. If they are, they'll send them back to MilMove successfully where they can access the MilMove application

**If there are any issues during these steps, you can find some troubleshooting help [HERE](/docs/getting-started/okta/03-okta-troubleshooting.md)**
