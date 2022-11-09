---
title: "0075 Remove CLI Spinner"
---

# _Remove CLI Spinner_

A CLI spinner is a spinner that appears on the command line interface to visually indicate that the program being run is working on a task.
The MilMove project uses such spinners when loading or parsing documents. pterm spinner, the current spinner being used on MilMove, is not thread safe. This was discovered while working on [MB-12825 Race Conditions](ttps://dp3.atlassian.net/browse/MB-12825). pterm offers many other command line interface features that are thread safe; it is specifically the spinner that generates warnings when Go's `-race` flag is turned on while running tests.

## Decision Drivers

- We want to resolve the race conditions that appear when the `-race` flag is turned on in Go

## Considered Decisions

- Remove all the spinner code
- Use [YAC Spin](https://github.com/theckman/yacspin)
- Replace [pterm](https://github.com/pterm/pterm) completely
- Continue to use [pterm](https://github.com/pterm/pterm) spinner

## Decision Outcome

Remove all spinner code.

- This allows us to resolve races conditions that are flagged by Go's `-race` flag. Resolving these race conditions helps resolve [STIG V-70185](https://www.stigviewer.com/stig/application_security_and_development/2018-12-24/finding/V-70185).
- Having a spinner display is not critical to the operation of the application. The text of the messeage should be retained to maintain context as to what is being run.

## Pros and Cons of the Decisions

### Remove all spinner code

- `+` No race conditions created from spinners.
- `+` Less code to maintain.
- `-` Work to be done to remove the spinners.
- `-` No visibility on if the task that would be using the spinner is active.

### Use YAC Spin

- `+` No race conditions from spinners because YAC Spin is thread safe.
- `-` The features that we use for the terminal user interface are split across two libraries.
- `-` Some work will need to be done to replace pterm's spinner.

### Replace pterm

- `+` Wouldn't have to deal with race conditions from pterm.
- `+` All the features for a terminal user interface are in one library.
- `-` Have to find a sutable replacement that is thread safe and does everything that MilMove uses pterm for.
- `-` Work needs to be done to refactor and replace pterm.

### Continue to use pterm's spinner

- `+` All the terminal user interface related stuff are in one library.
- `+` No code changes needed.
- `-` MilMove is stuck with race conditions since the race conditions are occurring in a third party library.
