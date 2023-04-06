---
id: index
sidebar_position: 1
slug: /backend/guides/tget
---

# TGET

TGET stands for Transportation Global Edit Table. Each service has their own set of valid accounting codes, also known as TAC (transportation accounting codes).

An example of this would be where the TOO (Transportation Ordering Officer) enters a TAC before approving a shipment. A TAC determines who pays for the shipping service (from which account). This TAC needs to be verified as a valid TAC. The MilMove application uses these to make sure that a customers order is valid. However, it should be noted that these codes do change and are updated.

## Context

The current implmentation is based from a sample file that had been parsed to retrieve all the unique TAC values. A new table in the database was made called `transportation_accounting_codes` and a secure migration was done to put all those unique values into the database.

In the MilMove app, when a user enters a value in to the TAC field, a call gets made to our backend to check if the input shows up in the database.

In the future, an SFTP connection would potentially be made to retrieve the updated file.

## Resources

https://www.ustranscom.mil/dtr/part-ii/dtr_part_ii_app_v.pdf
https://drive.google.com/drive/folders/1bKxCpYzebzwOSokepeLt_ZGJ7YXHqdHw
https://docs.google.com/document/d/1anKX49otdynoG_o3ENPYQtAcUWJ2X7v4IvBDHFwoxAY/edit
https://drive.google.com/drive/folders/1AT6XBR5qtUT2gHP2GSs4ylQ701bZf_dV
https://docs.google.com/document/d/11RAVk9uGCOW7Uk5ZBDFLtel-YY-uVqtj/edit#
https://github.com/transcom/mymove/pull/5922
https://github.com/transcom/mymove/blob/b46b8e1f245174532fd9287eb8abd950ccb89aa3/pkg/handlers/ghcapi/tac.go#L23
