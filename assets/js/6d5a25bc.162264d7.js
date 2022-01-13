"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[8196],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=c(n),m=i,h=p["".concat(l,".").concat(m)]||p[m]||u[m]||o;return n?a.createElement(h,r(r({ref:t},d),{},{components:n})):a.createElement(h,r({ref:t},d))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,r[1]=s;for(var c=2;c<o;c++)r[c]=n[c];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},40832:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return d},default:function(){return p}});var a=n(87462),i=n(63366),o=(n(67294),n(3905)),r=["components"],s={sidebar_position:7},l="Guide to Static Analysis Annotations for Disabled Linters",c={unversionedId:"backend/guides/guide-to-static-analysis-annotations-for-disabled-linters",id:"backend/guides/guide-to-static-analysis-annotations-for-disabled-linters",isDocsHomePage:!1,title:"Guide to Static Analysis Annotations for Disabled Linters",description:"Contents",source:"@site/docs/backend/guides/guide-to-static-analysis-annotations-for-disabled-linters.md",sourceDirName:"backend/guides",slug:"/backend/guides/guide-to-static-analysis-annotations-for-disabled-linters",permalink:"/mymove-docs/docs/backend/guides/guide-to-static-analysis-annotations-for-disabled-linters",editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/backend/guides/guide-to-static-analysis-annotations-for-disabled-linters.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"backendSidebar",previous:{title:"How data will be imported into production",permalink:"/mymove-docs/docs/backend/guides/ghc/ghc-import-pricing-production"},next:{title:"Guide to Static Analysis Security Workflow",permalink:"/mymove-docs/docs/backend/guides/guide-to-static-analysis-security-workflow"}},d=[{value:"security/detect-unsafe-regex",id:"securitydetect-unsafe-regex",children:[]},{value:"no-console",id:"no-console",children:[]},{value:"react/no-array-index-key",id:"reactno-array-index-key",children:[]},{value:"security/detect-object-injection",id:"securitydetect-object-injection",children:[]},{value:"gosec G101",id:"gosec-g101",children:[]},{value:"gosec G307",id:"gosec-g307",children:[]},{value:"gosec G404",id:"gosec-g404",children:[]},{value:"Note on Errcheck",id:"note-on-errcheck",children:[]}],u={toc:d};function p(e){var t=e.components,n=(0,i.Z)(e,r);return(0,o.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"guide-to-static-analysis-annotations-for-disabled-linters"},"Guide to Static Analysis Annotations for Disabled Linters"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Contents")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#introduction"},"Introduction")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#annotations"},"Annotations")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#life-after-annotation"},"Life After Annotation")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#front-end-annotation-templates"},"Front End Annotation Templates"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#securitydetect-unsafe-regex"},"security/detect-unsafe-regex")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#no-console"},"no-console")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#reactno-array-index-key"},"react/no-array-index-key")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#securitydetect-object-injection"},"security/detect-object-injection")))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#back-end-annotations-templates"},"Back End Annotation Templates"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#gosec-g101"},"gosec G101")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#gosec-g307"},"gosec G307")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#gosec-g404"},"gosec G404")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#note-on-errcheck"},"Note on Errcheck"))))),(0,o.kt)("h1",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,"See ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/transcom/mymove/wiki/Guide-to-Static-Analysis-Security-Workflow#introduction"},"Static Analysis Security Workflow")),(0,o.kt)("h1",{id:"annotations"},"Annotations"),(0,o.kt)("p",null,"In an ideal world, we would be able to fix all potential vulnerabilities, but sometimes there is no path to mitigation. This is where ",(0,o.kt)("strong",{parentName:"p"},"annotations")," come into play. An ",(0,o.kt)("strong",{parentName:"p"},"annotation")," is a formatted comment block whose purpose is to explain why the vulnerability cannot be remediated. Annotations precede a line of code that is disabling the linter (ex. eslint-disable-next-line, #nosec). Below is the skeleton of an annotation and explanations for what each field covers:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"// RA Summary: [linter] - [linter type code] - [Linter summary]\n// RA: <Why did the linter flag this line of code?>\n// RA: <Why is this line of code valuable?>\n// RA: <What mitigates the risk of negative impact?>\n// RA Developer Status: {RA Request, RA Accepted, POA&M Request, POA&M Accepted, Mitigated, Need Developer Fix, False Positive, Bad Practice}\n// RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}\n// RA Validator:\n// RA Modified Severity:\n// #nosec [linter code] (or disable code specific to linter)\n")),(0,o.kt)("p",null,"Throughout this document, you will see examples of lint errors that already have an annotation associated with it. Some annotations may need minor modifications to the description depending on the context of the line of code you are disabling the linter for. After you have added your annotation and lint-disabling code, you are ready for the final step."),(0,o.kt)("h1",{id:"life-after-annotation"},"Life after annotation"),(0,o.kt)("p",null,"Once you have added your annotation, you will need an ISSO to look over the annotation and approve it via the RA Validator Status field. The ISSO may provide feedback on ways you could fix the potential vulnerability, but if not, then the ISSO will commit to your branch and modify the Validator Status. Once the validator status is a specific value then the linter will unblock you and you are free to merge your code. ",(0,o.kt)("strong",{parentName:"p"},"ISSO approval process TBD...")),(0,o.kt)("h1",{id:"front-end-annotation-templates"},(0,o.kt)("strong",{parentName:"h1"},"Front end annotation templates")),(0,o.kt)("p",null,"In this section you will see a list of templates for a given eslint rule. Although we have to have annotations for potential vulnerabilities, there are many ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/transcom/mymove/wiki/Guide-to-Static-Analysis-Security-Workflow#exceptions"},"rules that are not potential vulnerabilities and are merely style preferences"),". Those lint errors do not need annotation. Below is a list of lint rules that need annotations, along with their annotation templates."),(0,o.kt)("h2",{id:"securitydetect-unsafe-regex"},"security/detect-unsafe-regex"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"// RA Summary: eslint - security/detect-unsafe-regex - Denial of Service: Regular Expression\n// RA: Locates potentially unsafe regular expressions, which may take a very long time to run, blocking the event loop\n// RA: Per MilMove SSP, predisposing conditions are regex patterns from untrusted sources or unbounded matching.\n// RA: The regex pattern is a constant string set at compile-time and it is bounded to 15 characters (127.000.000.001).\n// RA Developer Status: Mitigated\n// RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}\n// RA Modified Severity: N/A\n// 127.0.0.1/8 is considered localhost for IPv4.\n// eslint-disable-next-line security/detect-unsafe-regex\n")),(0,o.kt)("h2",{id:"no-console"},"no-console"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"// RA Summary: eslint: no-console - System Information Leak: External\n// RA: The linter flags any use of console logging.\n// RA: This console displays an error message from unsuccessful mutation.\n// RA: TODO: As indicated, this error needs to be handled and needs further investigation and work.\n// RA: POAM story here: https://dp3.atlassian.net/browse/MB-5597\n// RA Developer Status: Known Issue\n// RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}\n// RA Modified Severity: CAT II\n// eslint-disable-next-line no-console\n")),(0,o.kt)("h2",{id:"reactno-array-index-key"},"react/no-array-index-key"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"// RA Summary: eslint:react/no-array-index-key\n// RA: Using the index as an element key in cases where the array is reordered will result in unnecessary renders.\n// RA: The source data is unstructured, with a potential for duplicate values amongst siblings.\n// RA: A reorder function is not implemented for this array.\n// RA Developer Status: Mitigated\n// RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}\n// RA Modified Severity: N/A\n// eslint-disable react/no-array-index-key\n")),(0,o.kt)("p",null,"Most of the time, there is a unique identifier that can be used when rendering an array. For cases when there are not, we use the index, which is the default behavior. One thing to note is our ato-linter interprets regular javascript comments differently than comments in a JavaScript expression. We should always opt for the former so that the linter will behave as expected ",(0,o.kt)("strong",{parentName:"p"},"(e.g. Use // or /","*"," ","*","/ instead of {/","*"," ","*","/})")),(0,o.kt)("p",null,"Note: Please collocate the annotation right above the line you are disabling."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"{dataRow.map((cell, i) => (\n         // RA Summary: eslint:react/no-array-index-key\n         // RA: Using the index as an element key in cases where the array is reordered will result in unnecessary renders.\n         // RA: The source data is unstructured, with a potential for duplicate values amongst siblings.\n         // RA: A reorder function is not implemented for this array.\n         // RA Developer Status: Mitigated\n         // RA Validator Status: Mitigated\n         // RA Modified Severity: N/A\n         // no unique identifier that can be used as a key, cell values can be duplicates (e.g. Dates)\n         // eslint-disable-next-line react/no-array-index-key\n         <td key={i}>\n           <div className={classnames({ [`${styles.iconCellContainer}`]: !!icon && i === 0 })}>\n             <span>{cell}</span>\n             {!!icon && i === 0 && icon}\n           </div>\n         </td>\n       ))}\n")),(0,o.kt)("h2",{id:"securitydetect-object-injection"},"security/detect-object-injection"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"//RA Summary: eslint - security/detect-object-injection\n//RA: Using square bracket notation with user input can lead to exploitation\n//RA: Uses object square bracket notation\n//RA: Valuable for state management cleanup\n//RA: The threat actor (web application user) already controls the execution environment (web browser)\n//RA Developer Status: Mitigated\n//RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}\n//RA Modified Severity: N/A\n// eslint-disable-next-line security/detect-object-injection\n")),(0,o.kt)("h1",{id:"back-end-annotations-templates"},(0,o.kt)("strong",{parentName:"h1"},"Back end annotations templates")),(0,o.kt)("h2",{id:"gosec-g101"},"gosec G101"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'//RA Summary: gosec - G101 - Password Management: Hardcoded Password\n//RA: This line was flagged because it detected use of the word "token"\n//RA: This line is used to identify the name of the token. GorillaCSRFToken is the name of the base CSRF token.\n//RA: This variable does not store an application token.\n//RA Developer Status: Mitigated\n//RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}\n//RA Validator: jneuner@mitre.org\n//RA Modified Severity: CAT III\n// #nosec G101\n')),(0,o.kt)("h2",{id:"gosec-g307"},"gosec G307"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"//RA: Linter flags errcheck error: Ignoring a method's return value can cause the program to overlook unexpected states and conditions.\n//RA: Functions with unchecked return values in the file are used to clean up file created for unit test\n//RA: Given the functions causing the lint errors are used to clean up local storage space after a unit test, it does not present a risk\n//RA Developer Status: Mitigated\n//RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}\n//RA Modified Severity: N/A\n// #nosec G307\n")),(0,o.kt)("h2",{id:"gosec-g404"},"gosec G404"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"//RA Summary: gosec - G404 - Insecure random number source (rand)\n//RA: gosec detected use of the insecure package math/rand rather than the more secure cryptographically secure pseudo-random number generator crypto/rand.\n//RA: This particular usage is mitigated by sourcing the seed from crypto/rand in order to create the new random number using math/rand.\n//RA Developer Status: Mitigated\n//RA Validator Status: {RA Accepted, Return to Developer, Known Issue, Mitigated, False Positive, Bad Practice}\n//RA Modified Severity: CAT III\n// #nosec G404\n")),(0,o.kt)("h2",{id:"note-on-errcheck"},"Note on Errcheck"),(0,o.kt)("p",null,"We ",(0,o.kt)("em",{parentName:"p"},"should")," be handling errors. There are legacy errcheck violations with annotations.  We should not be adding any new errcheck annotations."))}p.isMDXComponent=!0}}]);