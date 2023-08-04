---
sidebar_position: 1
id: index
---

# Pull Request Process

## Branch Creation

CACI will create a branch off of main with the backlog name following the `B-****` naming convention. This branch will directly tie to backlogs created in Agility.


## _Truss Branches
When the main `B-****` branch is ready to merge. The developer will create a new branch off of main named `B-****_Truss`.


## Merge Requests
Then the developer will open a new merge request:

`B-****` -> `B-****_Truss`

This pull request will be reviewed internally. When all internal checks and comments have succeeded the `B-****` branch will merge into `B-****_Truss`.


Then the developer will open a new merge request.

`B-****_Truss` -> `main(truss)`

Once this merge request has been approved and merged into the main `truss` branch. The developer will then sync the `CACI main` branch with the changes from truss.

The developer will be responsible to manage merge conflicts that come from merging `main(truss)` into `main(caci)`.
