# Transportation Account Parsing

## Importing Package
`"github.com/transcom/mymove/pkg/parser/tac"`

## Expected Behavior
The following assumptions are made when parsing the .txt files:
1. The first and last lines are the security classification.
2. The second line of the file are the columns that will be a 1:1 match to the TransportationAccountingCodeTrdmFileRecord struct in pipe delimited format.
3. There are 23 values per line, excluding the security classification. Again, to know what these values are refer to note #2.
4. All values are in pipe delimited format.
5. Null values will be present, but are not acceptable for TRNSPRTN_ACNT_CD.

The following columns are expected on the second line:
```
// This struct only applies to the received .txt file.
type TransportationAccountingCodeTrdmFileRecord struct {
	TAC_SYS_ID              string
	LOA_SYS_ID              string
	TRNSPRTN_ACNT_CD        string
	TAC_FY_TXT              string
	TAC_FN_BL_MOD_CD        string
	ORG_GRP_DFAS_CD         string
	TAC_MVT_DSG_ID          string
	TAC_TY_CD               string
	TAC_USE_CD              string
	TAC_MAJ_CLMT_ID         string
	TAC_BILL_ACT_TXT        string
	TAC_COST_CTR_NM         string
	BUIC                    string
	TAC_HIST_CD             string
	TAC_STAT_CD             string
	TRNSPRTN_ACNT_TX        string
	TRNSPRTN_ACNT_BGN_DT    string
	TRNSPRTN_ACNT_END_DT    string
	DD_ACTVTY_ADRS_ID       string
	TAC_BLLD_ADD_FRST_LN_TX string
	TAC_BLLD_ADD_SCND_LN_TX string
	TAC_BLLD_ADD_THRD_LN_TX string
	TAC_BLLD_ADD_FRTH_LN_TX string
	TAC_FNCT_POC_NM         string
}

```

## Expected Results
The tac parsing package was created with the assumption that the following data is desired to return for further processing as desired:
```
type TransportationAccountingCodeDesiredFromTRDM struct {
	TAC/*Third in line, values[2]*/ string                      `json:"tac"`
	BillingAddressFirstLine/*20th in line, values[19]*/ string  `json:"billing_address_first_line"`
	BillingAddressSecondLine/*21st in line, values[20]*/ string `json:"billing_address_second_line"`
	BillingAddressThirdLine/*22nd in line, values[21]*/ string  `json:"billing_address_third_line"`
	BillingAddressFourthLine/*23rd in line, values[22]*/ string `json:"billing_address_fourth_line"`
	Transaction/*16th in line, values[15]*/ string              `json:"transaction"`
	EffectiveDate/*17th in line, values[16]*/ time.Time         `json:"effective_date"`
	ExpirationDate/*18th in line, values[17]*/ time.Time        `json:"expiration_date"`
	FiscalYear/*4th in line, values[3]*/ string                 `json:"fiscal_year"`
}
```

Do note that currently only "TAC" is stored within MilMove, the additional fields are for future use.

## Parsing Functions
The primary `parse` function will expect to receive a .txt file. Upon receival of this .txt file, it will parse it into go struct for further processing and importing into the database, as desired.

## Additional Processing Functions

### Pruning
You can optionally call `PruneExpiredTACsDesiredFromTRDM` and `ConsolidateDuplicateTACsDesiredFromTRDM` functions to further process the parsed TACs.

`PruneExpiredTACsDesiredFromTRDM` removes all TACs with an expiration date in the past.

### Consolidating / Removing Duplicates
`ConsolidateDuplicateTACsDesiredFromTRDM` consolidates TACs with the same TAC value. Duplicate "Transaction", aka description, values are combined with a delimiter of "*. Additional description found: *" to be more readable.
