import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

# CSV File Importing

When a MilMove Office or Admin user is created within the MilMove application **(not Okta)**, they will also need an account created in Okta. This will need to be done within the **Okta Admin Console** by an Okta Admin with the appropriate privileges.

:::info
You can find more info about Okta Admins **[HERE](/docs/getting-started/okta/01-okta-admins.md)**
:::

When importing a CSV file to create or update any user, Okta requires the columns to be ones they recognize in the respective Okta profile. When filling out a CSV file, it should look like this:
### CSV File Example
<CodeBlock>
email,login,firstName,lastName,cac_edipi,gsa_id,role<br/>
officeUser@email.com,officeUser@email.com,John,Office,1231231231,,office<br/>
adminUser@email.com,adminUser@email.com,Jill,Admin,2342342342,,admin<br/>
gsaUser@gsa.gov,gsaUser@gsa.gov,Jimmy,GSA,,3453453453453,office<br/>
hybridUser@email.gov,hybridUser@email.gov,Susy,Hybrid,,5675675675,hybrid
</CodeBlock>
This file contains all the columns that we need and will use in Okta. There are a bunch more properties that Okta uses for a profile, but these are the only ones we need for MilMove. Let's break it down:
<Tabs>
    <TabItem label="email" value="email" default>
    This will be the same as <b>login</b>, but it's imperative that this email is the primary email of the user and should be a <b>functional</b> email.
    </TabItem>
    <TabItem label="login" value="login">
    This will be the same as <b>email</b> and will also need to be a <b>functional</b> email.
    </TabItem>
    <TabItem label="firstName" value="firstName">
    First name of the user.
    </TabItem>
    <TabItem label="lastName" value="lastName">
    Last name of the user.
    </TabItem>
    <TabItem label="cac_edipi" value="cac_edipi">
    This will be the DoDID/EDIPI number that is located on the user's Smart Card. This number should only be <b>ten digits</b> in length and must be <b>unique</b>. Okta will not allow this user to be imported if this number already exists in their database. This can be left empty if the office user does not use a CAC.
    </TabItem>
    <TabItem label="gsa_id" value="gsa_id">
    This column is specific for GSA users and they will need to provide this number or it can be found in their certificate. It is variable in length, but can be found in the <b>Subject Alternative Name</b> property in their certificate and are the numbers to the left of their <b>@gsa.gov</b> email found in that property. This can be empty when importing users that are not GSA users.
    </TabItem>
    <TabItem label="role" value="role">
    This will determine which groups the user is assigned to upon import. <b>This field is required</b>. The values in this column assign users to their respective groups, which allows for access to the application.
    <CodeBlock>
    office -> assigns to office group<br/>
    admin -> assigns to admin group<br/>
    hybrid -> assigns to BOTH office and admin groups<br/>
    </CodeBlock>
    </TabItem>
</Tabs>

### Double Check - Triple Check

:::danger
If the `cac_edipi` or `gsa_id` is wrong, the user will not be able to log in. Additionally, please make sure that the value in the `role` column is either `office`, `admin`, or `hyrbid` and all lowercase. Please make sure to double check these values prior to importing.
:::

## Importing CSV File into Okta
1. Sign into the Okta Dashboard
2. Click the `Admin` button in the top right to go to the Admin Console
3. In the nav bar on the left, click `Directory`
4. Click `People` to open the users page
5. There's a dropdown box that says `More actions`, click that
6. A dropdown menu will show, click `Import users from CSV`
7. Select the CSV file and click `Upload CSV`
8. Okta will check the headers to make sure it knows where to put the data, if successful - you'll see a success message<br/>
If it was NOT successful, Okta will show an error message and tell you what it doesn't recognize
9. Click `Next`
10. If the user will only be logging in with their CAC, check both boxes since they won't need a password (this is for office users)<br/>
If the user will be an Okta Admin and will need to sign in with additional authenticators, only check the top box since they'll need to log into Okta
11. If the user in each row doesn't exist - Okta will create an account for them<br/>
If the user does exist, Okta will update their profile with the values in the CSV file
12. Now each user will be able to authenticate with Okta (as long as the information in the file is correct)!