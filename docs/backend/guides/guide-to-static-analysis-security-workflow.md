---
sidebar_position: 8
---

# Guide to Static Analysis Security Workflow

**Contents**

- [Introduction](#introduction)
  - [Exceptions](#exceptions)
- [Processes](#processes)
  - [What to do if you’ve written code that triggers the linter](#what-to-do-if-youve-written-code-that-triggers-the-linter)
  - [If you need to disable a rule check the severity level of the linter violation](#if-you-need-to-disable-a-rule-check-the-severity-level-of-the-linter-violation)
  - [If you need annotation approval](#if-you-need-annotation-approval)
  - [If you are a trussel in ‘truss-is3’ github group and someone needs an approval](#if-you-are-a-trussel-in-truss-is3-github-group-and-someone-needs-an-approval)

# Introduction

As part of the ATO (Authority to Operate) process ([#wg-ato](https://ustcdp3.slack.com/archives/CP4UNF7H6)) the mymove repository must complete a static analysis assessment of the codebase periodically to identify potential vulnerabilities. Historically, this has been accomplished with the Fortify static analysis tool. However, the Fortify static analysis tool may not be compatible with the latest Go versions.

In lieu of using Fortify, we are attempting to complete the same analysis with the existing mix of [golangci-lint](https://golangci-lint.run/), [pre-commit hooks](https://pre-commit.com/), and [eslint](https://eslint.org/). The severity of vulnerabilities are categorized along a scale from CAT-I, being the most critical, to CAT-III which is of lowest priority.

In order to meet security and ATO requirements, we must ensure linters are alerting engineers to fix any issues. Disabling certain rules could risk merging of code that creates a security vulnerability. Some in-file rule disables may be mitigated through justifiable reasoning and annotation comments within the code.

## Exceptions

Some eslint rules have been determined to be okay to bypass:

- Rules in the [master spreadsheet](https://docs.google.com/spreadsheets/d/1eH5ZYkKv7_c-p_D_y5G5ULdWgI_Zrwg_xL4WbLNZoqw/edit#gid=0) under Fortify Weakness as ‘N/A’ (highlighted in gray)
- `'security/detect-object-injection'` is okay in src code (for example, we do not want to disable it in the dangerjs file). It is disabled inside the `src` directory.

The <code>[eslint-plugin-ato/no-unapproved-annotation.js](https://github.com/transcom/mymove/blob/master/eslint-plugin-ato/no-unapproved-annotation.js)</code> file is where rules are bypassed by the linter.

# Processes

## What to do if you’ve written code that triggers the linter

**First choice:** Fix the linter issue/remove the disable and write the code such that disabling of the linter is unnecessary.

**Second choice:** If disabling is necessary, check the severity level, disable the code, add annotations above the disable line if CAT I, II or III.

Acceptance flow diagram:
![Acceptance flow diagram](/img/static_analysis/approval_flow.png)
[https://lucid.app/documents/view/511a8852-7a08-4589-b536-52c5b11bbfdc](https://lucid.app/documents/view/511a8852-7a08-4589-b536-52c5b11bbfdc)

## If you need to disable a rule, check the severity level of the linter violation

Check the severity level of the [master spreadsheet](https://docs.google.com/spreadsheets/d/1eH5ZYkKv7_c-p_D_y5G5ULdWgI_Zrwg_xL4WbLNZoqw/edit#gid=0). If it is CAT I, II, or III, you will need to write annotation

## If severity level of a linter occurrence is unknown (i.e. it’s not in [master spreadsheet](https://docs.google.com/spreadsheets/d/1eH5ZYkKv7_c-p_D_y5G5ULdWgI_Zrwg_xL4WbLNZoqw/edit#gid=0))

1. Contact Leo Scott and Erik Reiken, the ISSOs (Information System Security Officer), in #static-code-review and request a review of the linter rule. One of them will add it into the spreadsheet.
2. Depending on the severity level of the eslint, there are two routes:
   1. If the finding is an eslint with N/A severity
      - Add it to the `approvedBypassableRules` list in the <code>[eslint-plugin-ato/no-unapproved-annotation.js](https://github.com/transcom/mymove/blob/master/eslint-plugin-ato/no-unapproved-annotation.js) </code>file
   2. If the finding is of severity level CAT I, II, or III

      - First choice is for it to be remediated (refactor code so that the rule does not need to be violated)

      - Second choice is for it to be annotated

## If you need to write an annotation

- see [Guide to Static Analysis Annotations for Disabled Linters](Guide-to-Static-Analysis-Annotations-for-Disabled-Linters.md#guide-to-static-analysis-annotations-for-disabled-linters)

- Make sure all disabling code appears immediately below the annotation, or else the linter will give you an error.

## If you need annotation approval

1. Label the PR with needs-is3-review
2. Add ‘truss-is3’ group as reviewers. You can alert Trussels in #eng-leads
3. Tag ISSOs (Leo Scott and Erik Reiken) in the #static-code-review Slack channel
4. Provide as much info/context as you can for the ISSOs in the slack message:
   1. Include links in PR Description
   2. Give further context
   3. Let them know if the story is a block to other stories

Note: The PR will fail the run linters check until the ISSM approves the change in status via a commit to the PR.

## If you are a Trussel in ‘truss-IS3’ Github group and someone needs an approval

1. Ensure one IS3 Trussel reviews and approves PRs with annotations
2. Review any changes to config files that impact static analysis linting rules (you are a CODEOWNER for those files)

Workflow Diagram:
![Workflow diagram](/img/static_analysis/static_analysis_security_workflow.png)
[https://lucid.app/documents/view/17d640a9-ae3d-4b3b-bbd6-a9a999be013c](https://lucid.app/documents/view/17d640a9-ae3d-4b3b-bbd6-a9a999be013c)
