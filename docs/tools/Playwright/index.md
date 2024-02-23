---
sidebar_position: 1
---

# Playwright
## Running Playwright locally with VSCode

Running Playwright Tests locally:
1. Install the **Playwright Test for VSCode** extension
1. Press **Command+Shift+P** and then type: **Install Playwright** select what should be the first option **Test: Install Playwright**
1. You will be asked which browsers you want to install, you can just use Chromium other are optional, you don't need the Github Actions one
1. Open VSCode from the terminal while in your branches mymove directory using **code .**
1. **IMPORTANT:** You need to open the project's workspace by clicking the Open Workspace popup in the bottom right corner when you first open the project. If you don't do this you will not be able to run the Playwright tests (You won't see the play buttons for the tests). If you didn't open the workspace and dismissed the popup, then just close VSCode and reopen and you should see the popup again.
1. Open your terminals and launch **make server_run** then depending on which app you want to test also launch **make office_client_run** or **make client_run** or both if you want to run all tests. 
1. Click the flask icon on the left side of VSCode then click the play button for the tests you want to run.
1. You should see a browser window open and will see click thru as the tests are run.

You can also debug the Playwright tests using this method and drop breakpoints in the file. When you hover over the lines in debugger the associated components in the browser window it opened will be highlighted as well.
