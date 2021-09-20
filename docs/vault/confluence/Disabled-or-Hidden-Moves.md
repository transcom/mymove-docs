## Overview

Office users can mark moves as "cancelled" and stop their progress through MilMove, and these moves need to stay visible to the TXO, the customer, and potentially even the Prime (if they were cancelled after being approved and sent). Costs may have been accrued and decisions that must be documented were likely made before this move was cancelled. 

In contrast, there are also situations where the preferable course of action is to completely hide the move from all users and operate as if it never existed, such as:

* when there is suspected malicious activity and a move was erroneously created,
* when a move was created in a testing environment without using the USTC-approved fake names and addresses,
* when bad data is entered into a move that fatally breaks parts of the system, or
* when fake moves are added from external processes, such as load testing or hackathon events.

To allow for this functionality, we add the boolean `show` field to the `moves` table. If this field's value is `true`, then the move is considered valid and active within MilMove. If this value is set to `false`, it is considered disabled or deactivated and is hidden from all views in the app. There are only two parts of the app that can ever be used to work with hidden/disabled moves: the **Support API** and the **Admin Interface**.

**No other part of the app should EVER be able to interact with or view disabled moves.**

## Support API

This API can only be used while testing the app - it will never be functional in the production environment. All of its endpoints can be used to view and modify hidden moves. Currently, the only way to actually mark moves as hidden or disabled is the `hideNonFakeMoveTaskOrders` enpoint, which will automatically identify any moves using non-USTC-approved fake data and hide them from view. 

## Admin Interface

The Admin Interface is intended to be used by MilMove admins (currently only Truss engineers) to manage user creation/authorization, revoke sessions, and disable or reenable specific moves. This interface will be available in production. To hide/show a field:

* Log into the the Admin Interface:
	* [Experimental](https://admin.exp.move.mil)
	* [Staging](https://admin.stg.move.mil)
* Navigate to the "[Moves](https://admin.exp.move.mil/system/moves)" tab on the left nav panel. 
* If you are looking for a specific move, you may enter its locator code in the input box at the top of the list to find it. 
* Once you find the move you want to hide or show, click on its row in the output table (note: NOT the checkbox). This will take you to the Move Details page. 
* Use the details to verify that you have the correct move. Once you're confident this is the move you want to update, click the "Edit" button in the top right. 
* Go to the dropdown for the "Show" field and select either "Yes" or "No."
* Click the "Save" button at the bottom of the page.
* Test that your changes went through by attempting to locate this move in another part of the app. If you set the "Show" field to "No," you should see a Not Found error whenever you attempt to view it. 

## The Rest of MilMove

As stated above, **no other part of the MilMove app should be able to see hidden moves**. While we are undergoing active development on the system, this means that every developer is responsible for ensuring that their endpoints and interfaces cannot be used to access hidden moves. Every endpoint needs to validate that the move's `show` field is set to `true`, even if that endpoint looks at a shipment, service item, or another child object of the move.

The Prime API must validate that every move and child object has also been marked as "available to Prime" (indicated by the `available_to_prime_at` column on the move). This part of the app has been able to conveniently bundle these audits together, making it a relatively painless process to verify that no hidden moves are accessible.

The Internal and GHC APIs do not have this convenience, and other strategies must be developed to ensure they securely hide all deactivated moves. **This is an active concern that all teams should prioritize resolving.**

One possible solution is to take advantage of POP's (our backend ORM) `ScopeFunc` feature: https://github.com/gobuffalo/pop/blob/d30b82d843cd997d3ae847267fb68069329fdaec/scopes.go

