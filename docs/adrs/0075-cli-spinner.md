---
title: "0075 Use YAC Spin"
---

# _Use YAC Spin_

A CLI spinner is a spinner that appears on the command line interface to visually indicate that the program being run is working on a task.
The MilMove project uses such spinners when loading or parsing documents. pterm spinner, the current spinner being used on MilMove, is not thread safe. This was discovered while working on [MB-12825 Race Conditions](ttps://dp3.atlassian.net/browse/MB-12825). pterm offers many other command line interface features that are thread safe; it is specifically the spinner that generates warnings when Go's `-race` flag is turned on while running tests.

## Decision Drivers

- We want to resolve the race conditions that appear when the `-race` flag is turned on in Go

## Considered Decisions

- Use [YAC Spin](https://github.com/theckman/yacspin)
- Replace [pterm](https://github.com/pterm/pterm) completely
- Continue to use [pterm](https://github.com/pterm/pterm) spinner

## Decision Outcome

- Chosen Decision: Use YAC Spin
- Using YAC spin resolves races conditions that are flagged by Go's `-race` flag. Resolving these race conditions helps resolve [STIG V-70185](https://www.stigviewer.com/stig/application_security_and_development/2018-12-24/finding/V-70185).
- Using YAC Spin will not fully replace pterm. This means that yet another third party dependency will have been added. [MB-13883](https://dp3.atlassian.net/browse/MB-13883) will turn on the `-race` flags permanently such that developers should not need to remember to use YAC Spin over pterm's spinner since pterm's spinner will generate a race condition warning.

## Pros and Cons of the Decisions

### Use YAC Spin

- `+` No race conditions because YAC Spin is thread safe.
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
