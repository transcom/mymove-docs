# Multiple Independant Branches
**Purpose**: To setup multiple local dev environments so that the developer can easily continue working with a branch while a process or operation is running on a separate project folder.

**How to start**: From the current project folder, run the following command:
```
make multi_branch
```
**End result**: You should end up with 2 folders; each with their own instance of the MilMove git repository cloned down.
Special considerations:
- Once the command completes execution successfully, you should be able to run the local server from each instance simultaneously.
- Currently no more than 2 instances of the MilMove project folder is supported at a time.
- In the case that you already have a .envrc.local file set up, none of the file's contents should be changed except for the GIN_PORT assigned.
