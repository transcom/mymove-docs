# Lambda Summary

The TRDM lambda function is a cron based function to run every Sunday to keep our TGET data up to date for TAC and LOA. It previously functioned as an API gateway, allowing MilMove to TRDM REST to SOAP API conversion, however due to this being inefficient, prone to issues with the MilMove server scaling and having multiple instances of data pulls, and API limits, it was discontinued. Most of the code was deleted from the [repository](https://github.com/transcom/trdm-lambda), however, some still remains as leftover. In the future, this could be re-enabled, not to have MilMove perform a cron, but instead of we were to no longer store TGET data internally and instead fetch it via API when necessary.

## Functionality

There are two primary calls utilized in the trdm-lambda cron. `getLastTableUpdate` and `getTable`. We call TRDM's last table update for the specified TGET table we store internally, and if their data is newer than ours, then we know that the cron should ask for that new data. This is done by comparing our latest TAC or LOA entry's `updated_at` field compared to what was received from the `getLastTableUpdate`. Upon TRDM having newer data, a `getTable` function is then called to ask for 1 week of data, up to TRDM's last update. So, should our data be two weeks out of date, we will only ask for one week. This is an issue slated to be fixed in PI 24-4. If it receives 0 rows for the requested week date range, it will ask for the next week, looping up until the TRDM last update to prevent us from being stuck in the past. This was introduced because of issue [I-12635](https://www13.v1host.com/USTRANSCOM38/Issue.mvc/Summary?oidToken=Issue%3A921623).

## API Documentation

The SOAP to API conversion documentation is limited, but there is some documentation noted in the README.md of the [trdm-lambda repository](https://github.com/transcom/trdm-lambda). The only documentation on the TRDM API is found via a developer guide [stored internally on the CACI SharePoint](https://caci.sharepoint.us/sites/DPS/milmove/Shared%20Documents/Forms/AllItems.aspx?viewpath=%2Fsites%2FDPS%2Fmilmove%2FShared%20Documents&id=%2Fsites%2FDPS%2Fmilmove%2FShared%20Documents%2FMilMove%20Documents%2FTRDM&viewid=efcad058%2D1dd8%2D4b05%2D8212%2D56454a879e54).

## Files

:::warning

Column headers are based on the "subscription" to data setup between MilMove and TRDM. They vary by environment and are subject to change.

:::

`getTable` from TRDM will return an XML response stating how many rows were returned, as well as attach a file to the response. This file is what stores the rows of data. It will have a line dedicated to column headers, with subsequent lines holding data with an index corresponding to the headers. Classification does _NOT_ appear to show at the top of the file, and instead may be provided in another form. We were under the initial assumption that it was, however currently our impelementation appears to have faced no issues based on it conditionally looking for the line `Unclassified`.

## Deployment

Currently manual, set to be automated in PI 24-4.
