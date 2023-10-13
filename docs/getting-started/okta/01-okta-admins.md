import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Okta Admins

The role of Okta Admins is crucial in importing and managing users accessing any MilMove application. When it comes to assigning access to Okta Admins, it is generally best to keep the privileges at the lowest necessary level in order to avoid any security or configuration issues.

:::info
You can find more info about Okta Admins **[HERE](https://help.okta.com/en-us/content/topics/security/administrators-learn-about-admins.htm)**
:::

Generally speaking, the Okta Admins managing the MilMove application will be:
<Tabs>
    <TabItem label="Super Admin" value="super" default>
    An Okta Super Admin will be able to do pretty much anything, but the primary responsibility will be assigning Okta Admin roles to Okta users that will be requiring admin access to manage users or monitor the system logs. Ideally, we only want a very small number of people in this role to avoid any unnecessary privileges.
    </TabItem>
    <TabItem label="MilMove Admin" value="milmove">
    The Okta MilMove Admins role will be allowed to manage users, groups and applications, but the primary role of this Admin will be importing office and admin users via CSV file import, making sure the information is up to date and correct, and assigning users to groups as needed if the automatic enrollment into groups fails during import.
    </TabItem>
    <TabItem label="Help Desk" value="help-desk">
    An Okta Help Desk Admin will be primarily used for user troubleshooting, resetting passwords, creating temporary passwords, unlocking accounts, and other user required actions when they are having issues accessing their accounts.
    </TabItem>
</Tabs>