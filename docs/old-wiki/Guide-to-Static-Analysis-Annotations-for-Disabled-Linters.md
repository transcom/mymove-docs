# Guide to Static Analysis Annotations for Disabled Linters

**Contents**
* [Introduction](#introduction)
* [Annotations](#annotations)
* [Life After Annotation](#life-after-annotation)
* [Front End Annotation Templates](#front-end-annotation-templates)
    * [security/detect-unsafe-regex](#securitydetect-unsafe-regex)
    * [no-console](#no-console)
    * [react/no-array-index-key](#reactno-array-index-key)
    * [security/detect-object-injection](#securitydetect-object-injection)
* [Back End Annotation Templates](#back-end-annotations-templates)
    * [gosec G101](#gosec-g101)
    * [gosec G307](#gosec-g307)
    * [gosec G404](#gosec-g404)
    * [Note on Errcheck](#note-on-errcheck)


# Introduction

See [Static Analysis Security Workflow](https://github.com/transcom/mymove/wiki/Guide-to-Static-Analysis-Security-Workflow#introduction)


# Annotations

In an ideal world, we would be able to fix all potential vulnerabilities, but sometimes there is no path to mitigation. This is where **annotations** come into play. An **annotation** is a formatted comment block whose purpose is to explain why the vulnerability cannot be remediated. Annotations precede a line of code that is disabling the linter (ex. eslint-disable-next-line, #nosec). Below is the skeleton of an annotation and explanations for what each field covers:


```
// RA Summary: [linter] - [linter type code] - [Linter summary]
// RA: <Why did the linter flag this line of code?>
// RA: <Why is this line of code valuable?>
// RA: <What mitigates the risk of negative impact?>
// RA Developer Status: {RA Request, RA Accepted, POA&M Request, POA&M Accepted, Mitigated, Need Developer Fix, False Positive, Bad Practice}
// RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}
// RA Validator:
// RA Modified Severity: 
// #nosec [linter code] (or disable code specific to linter)
```


Throughout this document, you will see examples of lint errors that already have an annotation associated with it. Some annotations may need minor modifications to the description depending on the context of the line of code you are disabling the linter for. After you have added your annotation and lint-disabling code, you are ready for the final step.


# Life after annotation
Once you have added your annotation, you will need an ISSO to look over the annotation and approve it via the RA Validator Status field. The ISSO may provide feedback on ways you could fix the potential vulnerability, but if not, then the ISSO will commit to your branch and modify the Validator Status. Once the validator status is a specific value then the linter will unblock you and you are free to merge your code. **ISSO approval process TBD...**


# **Front end annotation templates** 

In this section you will see a list of templates for a given eslint rule. Although we have to have annotations for potential vulnerabilities, there are many [rules that are not potential vulnerabilities and are merely style preferences](https://github.com/transcom/mymove/wiki/Guide-to-Static-Analysis-Security-Workflow#exceptions). Those lint errors do not need annotation. Below is a list of lint rules that need annotations, along with their annotation templates.


## security/detect-unsafe-regex 

```
// RA Summary: eslint - security/detect-unsafe-regex - Denial of Service: Regular Expression
// RA: Locates potentially unsafe regular expressions, which may take a very long time to run, blocking the event loop
// RA: Per MilMove SSP, predisposing conditions are regex patterns from untrusted sources or unbounded matching.
// RA: The regex pattern is a constant string set at compile-time and it is bounded to 15 characters (127.000.000.001).
// RA Developer Status: Mitigated
// RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}
// RA Modified Severity: N/A
// 127.0.0.1/8 is considered localhost for IPv4.
// eslint-disable-next-line security/detect-unsafe-regex
```



## no-console 


```
// RA Summary: eslint: no-console - System Information Leak: External
// RA: The linter flags any use of console logging.
// RA: This console displays an error message from unsuccessful mutation.
// RA: TODO: As indicated, this error needs to be handled and needs further investigation and work.
// RA: POAM story here: https://dp3.atlassian.net/browse/MB-5597
// RA Developer Status: Known Issue
// RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}
// RA Modified Severity: CAT II
// eslint-disable-next-line no-console
```



## react/no-array-index-key 


```
// RA Summary: eslint:react/no-array-index-key
// RA: Using the index as an element key in cases where the array is reordered will result in unnecessary renders.
// RA: The source data is unstructured, with a potential for duplicate values amongst siblings.
// RA: A reorder function is not implemented for this array.
// RA Developer Status: Mitigated
// RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}
// RA Modified Severity: N/A
// eslint-disable react/no-array-index-key
```


Most of the time, there is a unique identifier that can be used when rendering an array. For cases when there are not, we use the index, which is the default behavior. One thing to note is our ato-linter interprets regular javascript comments differently than comments in a JavaScript expression. We should always opt for the former so that the linter will behave as expected **(e.g. Use // or /\* \*/ instead of {/\* \*/})**

Note: Please collocate the annotation right above the line you are disabling.


```
{dataRow.map((cell, i) => (
         // RA Summary: eslint:react/no-array-index-key
         // RA: Using the index as an element key in cases where the array is reordered will result in unnecessary renders.
         // RA: The source data is unstructured, with a potential for duplicate values amongst siblings.
         // RA: A reorder function is not implemented for this array.
         // RA Developer Status: Mitigated
         // RA Validator Status: Mitigated
         // RA Modified Severity: N/A
         // no unique identifier that can be used as a key, cell values can be duplicates (e.g. Dates)
         // eslint-disable-next-line react/no-array-index-key
         <td key={i}>
           <div className={classnames({ [`${styles.iconCellContainer}`]: !!icon && i === 0 })}>
             <span>{cell}</span>
             {!!icon && i === 0 && icon}
           </div>
         </td>
       ))}
```



## security/detect-object-injection

```
//RA Summary: eslint - security/detect-object-injection
//RA: Using square bracket notation with user input can lead to exploitation
//RA: Uses object square bracket notation
//RA: Valuable for state management cleanup
//RA: The threat actor (web application user) already controls the execution environment (web browser)
//RA Developer Status: Mitigated
//RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}
//RA Modified Severity: N/A
// eslint-disable-next-line security/detect-object-injection
```



# **Back end annotations templates** 


## gosec G101 


```
//RA Summary: gosec - G101 - Password Management: Hardcoded Password
//RA: This line was flagged because it detected use of the word "token"
//RA: This line is used to identify the name of the token. GorillaCSRFToken is the name of the base CSRF token.
//RA: This variable does not store an application token.
//RA Developer Status: Mitigated
//RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}
//RA Validator: jneuner@mitre.org
//RA Modified Severity: CAT III
// #nosec G101
```



## gosec G307


```
//RA: Linter flags errcheck error: Ignoring a method's return value can cause the program to overlook unexpected states and conditions.
//RA: Functions with unchecked return values in the file are used to clean up file created for unit test
//RA: Given the functions causing the lint errors are used to clean up local storage space after a unit test, it does not present a risk
//RA Developer Status: Mitigated
//RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}
//RA Modified Severity: N/A
// #nosec G307
```



## gosec G404 


```
//RA Summary: gosec - G404 - Insecure random number source (rand)
//RA: gosec detected use of the insecure package math/rand rather than the more secure cryptographically secure pseudo-random number generator crypto/rand.
//RA: This particular usage is mitigated by sourcing the seed from crypto/rand in order to create the new random number using math/rand.
//RA Developer Status: Mitigated
//RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}
//RA Modified Severity: CAT III
// #nosec G404
```



## Note on Errcheck 

We _should_ be handling errors. There are legacy errcheck violations with annotations.  We should not be adding any new errcheck annotations.
