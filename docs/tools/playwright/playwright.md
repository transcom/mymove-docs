---
sidebar_position: 1
---

# Playwright

## Playwright documentation
https://playwright.dev/docs/intro
The documentation is well rounded. It also includes conventional use of specific playwright library functions regarding UI test practices.

## Running Playwright locally with VSCode

1. Install the **Playwright Test for VSCode** extension
1. Press **Command+Shift+P** and then type: **Install Playwright** select what should be the first option **Test: Install Playwright**
1. You will be asked which browsers you want to install, you can just use Chromium other are optional, you don't need the Github Actions one
1. Open VSCode from the terminal while in your branches mymove directory using **code .**
1. Open your terminals and launch **make server_run** then depending on which app you want to test also launch **make office_client_run** or **make client_run** or both if you want to run all tests. 
1. Click the flask icon on the left side of VSCode then click the play button for the tests you want to run. NOTE: You may need to close and reopen VSCode to see the playwright tests.
1. You should see a browser window open and will see click thru as the tests are run.

You can also debug the Playwright tests using this method and drop breakpoints in the file. When you hover over the lines in debugger the associated components in the browser window it opened will be highlighted as well.
