# Transportation Account Parsing

## Importing Package
`"github.com/transcom/mymove/pkg/parser/tac"`

## Parsing Functions
The primary `parse` function will expect to receive a .txt file. Upon receival of this .txt file, it will parse it into go struct for further processing and importing into the database, as desired.

## Additional Processing Functions

### Pruning
You can optionally call `PruneExpiredTACsDesiredFromTRDM` and `ConsolidateDuplicateTACsDesiredFromTRDM` functions to further process the parsed TACs.

`PruneExpiredTACsDesiredFromTRDM` removes all TACs with an expiration date in the past.

### Consolidating / Removing Duplicates
`ConsolidateDuplicateTACsDesiredFromTRDM` consolidates TACs with the same TAC value. Duplicate "Transaction", aka description, values are combined with a delimiter of "*. Additional description found: *" to be more readable.
