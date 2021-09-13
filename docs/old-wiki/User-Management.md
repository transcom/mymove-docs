# Table of Contents
* [Users in MilMove](#users-in-milmove)
  * [MilMove User](#milmove-user)
    * [Available Roles for MilMove Users](#available-roles-for-milmove-users)
    * [Creating a MilMove User](#creating-a-milmove-user)
    * [Deactivating a MilMove User](#deactivating-a-milmove-user)
  * [Office User](#office-user)
    * [Available Roles for Office Users](#available-roles-for-office-users)
    * [Creating an Office User](#creating-an-office-user)
    * [Deactivating an Office User](#deactivating-an-office-user)
    * [Bulk Uploading Office Users](#bulk-uploading-office-users)
  * [Admin User](#admin-user)
    * [Available Roles for Admin Users](#available-roles-for-admin-users)
    * [Creating an Admin User](#creating-an-admin-user)
    * [Deactivating an Admin User](#deactivating-an-admin-user)
  * [Deactivating Users](#deactivating-users)
    * [Deactivate the User](#deactivate-the-user)
    * [Revoke a Session](#revoke-a-session)
* [Technical Things](#technical-things)
  * [Login.gov](#logingov)
    * [Session IDs](#session-ids)
  * [Local Sign In](#local-sign-in)
  * [DB tables](#db-tables)

# Users in MilMove

All users in MilMove are associated with a single login.gov account. These users can be one of three types within MilMove.

- MilMove User
- Office User
- Admin User

## MilMove User

A person who’s been issued PCS orders who is logged in through the customer-facing MilMove app. They can be an active duty service members, a civilian who works for the military, the relative of a service member who’s setting up a move on their behalf (typically a spouse, sometimes a parent), or even a services counselor working on the actual customer’s behalf.

### Available Roles for MilMove Users

#### Customer

A customer is someone using MilMove to book (or set up) a PCS move from one military installation to another.
Most customers are service members on active duty, but a customer can also be a civilian who works for the military, or the relative of a service member who’s setting up a move on their behalf. (Typically a spouse, sometimes a parent.)

A customer can submit a move request on MilMove for an HHG shipment to or from a CONUS destination.

The user role of customer is automatically assigned to a MilMove user.

### Creating a MilMove User

Users of MilMove create their own accounts through the MilMove app, through login.gov as mentioned above.

### Deactivating a MilMove User

Only admins can deactivate users. The instructions are the same for all types of users. [See below](#deactivating-users).

## Office User

The users of the office app are USTC employees who administer the moves by approving various parts of the process as it moves forward. They focus on making sure the customer’s move goes well, and that the government pays for everything it’s supposed to but is not overcharged or paying for things it’s not supposed to.

### Available Roles for Office Users

#### Service Counselor

A counselor is someone who is an expert at moving in the military. A session with a counselor is provided to customers to ensure that they’re getting all of their entitlements and they’re making realistic choices about their move.

A “service counselor” is a counselor paid for by one or more of the services (Navy, Army, etc.). There’s a counselor role on the Prime side, as well. If the Prime performs counseling, they are paid a move-level service fee. A customer will be offered counseling from one of those two roles, but not both.

A counselor’s goal is to speak with each customer about their move planning and make any necessary updates to their move record in MilMove.

Service counselors can add information to MilMove, and it can be shared with the Prime Contractor and other people involved in the process to make decisions about the move.

In addition:
* Counselors rely on search in order to find a specific move (i.e. if the customer has a scheduled counseling appointment, or if the customer contacts the counselor to make a change).
* Moves are assigned to counselors based on origin duty station. The exception is Marines, who are assigned to a USMC counselor based on branch of service.
* All moves must receive either services or Prime counseling.

#### Transportation Ordering Officer (TOO)

A Transportation Ordering Officer (TOO), who sits in a JPPSO office, performs the following jobs:
* Reviews customer info and orders
* Creates Move Task Orders
* Review requested service items from GHC Prime (and eventually NTS Prime), and approve or reject them.
* Review additional shipments from Prime
* Authorizes the Prime to move weight in excess of their allowance
* Reviews/approves orders amendments

The TOO uses the web interface in Office App to perform these tasks.

#### Transportation Invoicing Officer (TIO)

A Transportation Invoicing Officer (TIO), who sits in a JPPSO office, conducts the following tasks:
* Reviews payment requests and accompanying proof of service documentation from the Prime
* Approves or rejects payment for service items
* Authorizes payment to the Prime

The TIO uses the web interface in Office App to perform these tasks.

### Creating an Office User

Only admins can create an Office User.

- Go to **Admin App > Office Users > Create**
- Fill out the form for the user.
- You must use the email they will use to create their login.gov account.
- Give them the appropriate role. Note in test environments, you can assign more than one role so that the user can test as either role.

![Create office user dialog](/img/users/create-office-user.png)

### Deactivating an Office User

Only admins can deactivate users. The instructions are the same for all types of users. [See below](#deactivating-users).

### Bulk Uploading Office Users
If there are multiple Office Users that need to be added to Milmove, this can be done in the Admin Console.
- Go to **Admin App > Office Users > Import**
- You will see a table view of Office Users, and above that table an **Import** button.
- When **Import** is selected, a pop up screen will show up for the Admin User to import a CSV.
![Office User Import Button](/img/users/office-users-import-button.png)

The CSV updated must have the following **required** column titles:
- **email**
- **firstName**
- **middleInitials**
- **lastName**
- **telephone**
- **transportationOfficeId**
- **roles**

The following content must be filled out for each Office User:
- **email**
- **first name**
- **last name**
- **telephone**
- **transportation office ID**
- **office user role**
![CSV Example](/img/users/sample-office-user-csv-bulk-upload.png)

Validation checks:
Validators have been added to the Admin console in order to check for errors. If a validator check fails, an error will be thrown and an error message will appear to guide the user in making the appropriate corrections. The following validations are checked:
- All required fields are present
- Phone numbers are formatted xxx-xxx-xxxx
- Roles provided are valid office user roles (i.e. transportation_ordering_officer, transportation_invoicing_officer, contracting_officer, ppm_office_users, services_counselor).

NOTE: In order for new Office users to log in to the office app, make sure that each Office User has first created an account with login.gov.

## Admin User

The admin app is used to administrate *the software* (not to be confused by admins such as the TOO and TIO that administrate *the move*). The users of the office app are select USTC employees and some Truss developers.

### Available Roles for Admin Users

#### Admin

An admin user utilizes the admin app to preform users management and other tasks associated with administering the software.

When an admin user is created, the role of admin is automatically assigned.

### Creating an Admin User

Only admins can create an Admin User.

- Go to **Admin App > Admin Users > Create**
- Fill out the form for the user.
- You must use the email they will use to create their login.gov account.

### Deactivating an Admin User

Only admins can deactivate admin users. The instructions are the same for all types of users. [See below](#deactivating-users).

## Deactivating Users

Admins can deactivate all types of users. It's easiest to know their login.gov email to do this.

Go to **Admin App > Users > Click on the User > Edit**

![User Deactivation Dialog](/img/users/deactivate-user.png)

### Deactivate the User

When you deactivate a user, it revokes all their sessions (logging them out immediately) and stops them from logging back in.
Set Active to No to deactivate the user and revoke all sessions.
The user won't be able to login or continue their session.

If they were an office or admin user, it will also deactivate them as office or admin. If you reactivate them, you will have to go back into those sections and make them admin or office again.

### Revoke a Session

If you only want to log them out of a session, there are three dropdowns to revoke sessions. Select Yes for the session you would like to revoke.

This will disrupt the user's current session but they can always log back in.

# Technical Things

## Login.gov

This project uses login.gov for identity management. Login.gov provides a lot of nice options for user management and is a FedRamp approved service.

Login.gov requires 2FA for which it provides a multitude of options:

- Security key
- Authentication application
- Government ID
- Phone
- Backup codes

### Session IDs

Once we confirm the login, we check that the user is `active` in the users table. If so, we create and store session IDs for the user in the `users` table.

Since we have multiple apps, we have multiple types of session IDs.

- Office Session ID
- Admin Session ID
- MilMove Session ID

These can be [revoked separately](#deactivating-users).

## Local Sign In

When you run any of the apps locally, there is also an option to select **Local Sign In**.

Since login.gov requires setup of a 2FA, this is just a more convenient login to use for testing. We usually have a few pre-created users for various scenarios as well.

Note, **using local sign-in does not create session IDs** and store them in the `users` table. So, you can't deactivate these users or revoke the sessions using the Admin app.

## DB tables

Also good to know, we have **more than one table for user information**.

- `users` - This table should contain all users and their login.gov email. Every user that creates an account associated with login.gov ends up with an entry here. There are also columns for each of the session ids in this table.

- `service_members` If a user is a MilMove user, they have an entry here with a foreign key link to their entry in the `user` table.

- `admin_users` If a user is an admin user, they have an entry here with a foreign key link to their entry in the `user` table. There is a role column but it appears to not be used.

- `office_users` If a user is an office user, they have an entry here with a foreign key link to their entry in the `users` table.

Note, the `users` table is also linked to a `user_roles` table that seems to link users to their Office-related roles but is not really used for MilMove app or Admin Roles.
