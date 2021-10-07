---
title: GHC Rate Engine & Invoicing
sidebar_position: 1
---

# GHC Rate Engine & Invoicing

The MilMove Rate Engine and Invoicing components are responsible for processing requests from the 
GHC Prime to receive payment for services rendered by creating a Payment Request, pricing the Payment Request, 
and storing the pricing information and details about the inputs used for pricing to the database. Once this information
is stored in the database, the TIO UI is able to query the database for Payment Request(s) details for display on the UI.

Once the TIO user has reviewed and approved a Payment Request for payment. The GHC Invoicing component will take the
Payment Request and generate an EDI order to send to the Third Party Payment System (TPPS) to process the payment (pay the GHC Prime).

## GHC Invoicing Diagram

High level overview diagrams
* [Sequence diagram](https://miro.com/app/board/o9J_ls9Gt7E=/?moveToWidget=3074457365163319192&cot=14)
* [Invoicing Flow](https://miro.com/app/board/o9J_kwqdujc=/?moveToWidget=3074457346823225551&cot=14)
* [GHC Process Diagram](https://miro.com/app/board/o9J_kwpI-uM=/?moveToWidget=3074457346865834870&cot=14)
* [Prime API Sequence Diagram](https://github.com/transcom/prime_api_deliverable/wiki/Sequence-Diagram)

## GHC Invoicing Flow

* GHC Prime
    * Creates Payment Request (optionally marked “final” to indicate no more payments due on this Task Order)
        * Payment Request contains a subset of MTO Service Items from a Move or MoveTaskOrder (MTO)
    * Sends “Proof of Service Document Package” to MilMove
    
* MilMove
    * Receive Payment Request along with Proof of Service Doc Package
    * Validates Payment Request
        * Ensures that no previous “final” Payment Request has been sent
        * Ensures that TOO has approved items on Task Order for which payment is requested. (Unapproved service items will not appear on the MTO.)
        * Ensure that requested Service Item balances have not been covered in other Payment Requests
        * Ensure that Service Item parameters obey validation logic
        * Ensure that no other Payment Requests are open for these service items
        * If valid, continue.
        * If not valid
            * Send rejection to GHC Prime
            * **End**
    
* Transportation Invoicing Officer
    * Validates Payment Request (manual, web UI)
        * Ensure Proof of Service Document Package exists and properly backs up requested Service Items
            * TBD: if Prime submits unfinished payment request, what to do (this story needs to be cleaned up)
        * If valid
            * Approves Payment Request
            * Continue
        * If not valid
            * Provides rejection reason
            * Present rejection to GHC via MilMove
            * **End**
    * If last / “final” Payment Request, mark the Task Order “complete”
        * No future Task Orders may be sent on this.
    
* MilMove
    * Sends EDI 858 order to TPPS (GEX) for payment 
      
* TPPS processes payment… 
  
* MilMove
    * Receives EDI 997 to acknowledge receipt of the EDI
    * If there are issues/errors with EDI 858, MilMove receives EDI 824 with a description of the issue

## GHC Invoicing Mini Design Docs
* [Discovery JobRunner](https://docs.google.com/document/d/1CTexWoGYPQnmBZuO6LTphp9zS1KKcWJjFunStK0pPbw/edit?usp=sharing)
* [JobRunner Async Handling for EDI Generation and Send to GEX-Syncada Proposal](https://docs.google.com/document/d/1otdYJzRnkaVfZrPC1Oi8dv1WaByXPiow/edit#heading=h.gjdgxs)
* [Discovery Auto-Validate Payment Request Implementation](https://docs.google.com/document/d/13gO40_O0FoEIQcu3G4lzHAtehfgUNe1rUFdTXHfOc_0/edit?usp=sharing)
* [Discovery: TIO Pricing Details](https://docs.google.com/document/d/1Yd71KxjwcbF06wiJ_ZSTvttbwRnRzQxk4M8itogT4hs/edit?usp=sharing)
* [Invoice Processing Design](https://docs.google.com/document/d/1D8wp4d62ip2lQG1dKBIAWQy1Bian-ezWwoRqaZ6xti4/edit)
* [Job Runner: EDI Responses Design](https://docs.google.com/document/d/1e8Zq2dkqZ1nWxJNTI5V-w1iZo0ccVTunmWEAr61F4MA/edit#heading=h.pydiodiv30kf)
* [Payment Request proposed model](https://docs.google.com/document/d/1f_FV8SeUAbmOb0zTvIidXhuHx00NzU4xpX0MiF2Ke-c/edit)
* [Recording Errors from 997 or 824](https://docs.google.com/document/d/11W0HTPYy9fAjPVAgh5M1cunLaFT0QZhLHRhFpnQoEes/edit#heading=h.sz7x3sm32lts)
* [GHC Fuel Surcharge Pricer](https://docs.google.com/document/d/19vlZsZDPqrWnk6GWv7xfZ_GLLGvRfMllWw7ihHTWTnQ/edit#heading=h.v28rizfh9b9b)
* [SIT Pricing Notes](https://docs.google.com/document/d/1jRl91aslMnOMt2zS1tt_XT0lD1I-xvsiKOfprAaFrAs/edit#heading=h.od9n7nbhtjs5)
* [Pricing Service Items Design](https://docs.google.com/document/d/1KBQWC1bSUC6S69w-1fcdDpPId4tEiTZDQZfTTBNieVU/edit#heading=h.f6ntcg9hwkij)
* [[noodling] Reweighs: Invoicing engineer](https://miro.com/app/board/o9J_l3lkp8s=/)
* [Payment Request Uploader Design](https://miro.com/app/board/o9J_kuh516s=/?moveToWidget=3074457347367317910&cot=14) and [GH pull request](https://github.com/transcom/mymove/pull/3775) for the refactor.
* [SIT Pricing Distance Flow Design](https://miro.com/app/board/o9J_lZAfvO0=/?moveToWidget=3074457353115567897&cot=14)
* [Design how data will be imported into production](https://docs.google.com/document/d/1QVwY5uobUpz87WEeAXSnIXG0NE1o4YnFW0Lf7PnMqO0/edit#heading=h.8wmuqkn9o6rd)
* [Initial PR to setup service item param lookup framework](https://github.com/transcom/mymove/pull/3401)
* [Service-object-based implementation of domestic linehaul pricer #2836](https://github.com/transcom/mymove/pull/2836)

## Miro boards
* [Payment Request state diagram](https://miro.com/app/board/o9J_krR2Tt8=/?moveToWidget=3074457349208255435&cot=13)

## TXO UI
* [TIO Abstract Workflow](https://app.abstract.com/projects/1f6c1fd0-88a2-11e9-aaf7-a7ce5896598b/branches/master/collections/a720952c-9c81-4b3f-bb03-6ce3fde71987)

* [TOO Abstract Workflow](https://app.abstract.com/projects/1f6c1fd0-88a2-11e9-aaf7-a7ce5896598b/branches/master/collections/e2f84e6a-c87c-4ca1-9a00-3608bd74d35a)

## EDI/Syncada
TODO I think there are more docs than this, need to pull the relevant ones
* [Mapping of EDI field names with MilMove names](https://docs.google.com/spreadsheets/d/1o9nMDg6AxGe7aypI5jR9Emjix3eRkZHNcnsJfAVj_vQ/edit#gid=566972450)
* [Mapping of EDI Responses e.g. 997 & 824, field names](https://docs.google.com/spreadsheets/d/1OYYgAp6GD0wG6SKx61De2VRZFkAPHBHZV2BpyvD0nMc/edit#gid=2073567060)

## References
* [GHC Rate Engine & Invoicing (Google Doc with notes)](https://docs.google.com/document/d/1U6a8-zc67eo1g888wM9LzFebQ8SBjGY7hTYYzbMyPPg/edit#heading=h.9a9z2xj8xsoq)
