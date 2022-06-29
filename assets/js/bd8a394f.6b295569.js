"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[8985],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var m=a.createContext({}),p=function(e){var t=a.useContext(m),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(m.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,m=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(n),u=r,k=c["".concat(m,".").concat(u)]||c[u]||s[u]||o;return n?a.createElement(k,i(i({ref:t},d),{},{components:n})):a.createElement(k,i({ref:t},d))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=c;var l={};for(var m in t)hasOwnProperty.call(t,m)&&(l[m]=t[m]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},92714:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>i,default:()=>s,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const o={sidebar_position:5},i="Run pre-commit hooks",l={unversionedId:"backend/setup/run-pre-commit-hooks",id:"backend/setup/run-pre-commit-hooks",title:"Run pre-commit hooks",description:"Pre-commit is a powerful tool that automates validations, lint checks and adds to developer quality of life. The config file that determines the actions of pre-commit hooks can be found here.",source:"@site/docs/backend/setup/run-pre-commit-hooks.md",sourceDirName:"backend/setup",slug:"/backend/setup/run-pre-commit-hooks",permalink:"/mymove-docs/docs/backend/setup/run-pre-commit-hooks",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/backend/setup/run-pre-commit-hooks.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"backendSidebar",previous:{title:"How to Migrate the Database",permalink:"/mymove-docs/docs/backend/setup/database-migrations"},next:{title:"Using EagerPreload in Pop",permalink:"/mymove-docs/docs/backend/setup/using-eagerpreload-in-pop"}},m={},p=[{value:"Testing",id:"testing",level:2},{value:"Specifying and updating the Node version in the config",id:"specifying-and-updating-the-node-version-in-the-config",level:2},{value:"Editor Integration",id:"editor-integration",level:2},{value:"Current pre-commit hooks",id:"current-pre-commit-hooks",level:2}],d={toc:p};function s(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"run-pre-commit-hooks"},"Run pre-commit hooks"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://pre-commit.com/"},"Pre-commit")," is a powerful tool that automates validations, lint checks and adds to developer quality of life. The config file that determines the actions of pre-commit hooks can be found ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/transcom/mymove/blob/master/.pre-commit-config.yaml"},"here"),"."),(0,r.kt)("p",null,"Pre-commit can be run by running the following command in terminal:\n",(0,r.kt)("inlineCode",{parentName:"p"},"pre-commit")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"make pre_commit_tests")," which is similar to how CircleCI runs it."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"If the ",(0,r.kt)("inlineCode",{parentName:"em"},"pre-commit")," command is not found or errors out, please make sure you have the ",(0,r.kt)("a",{parentName:"em",href:"https://github.com/transcom/mymove/blob/master/README.md#setup-prerequisites"},"pre-requisites")," installed.")),(0,r.kt)("h2",{id:"testing"},"Testing"),(0,r.kt)("p",null,"If you would like to run an individual hook, for example if you want to only run ",(0,r.kt)("em",{parentName:"p"},"prettier"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"pre-commit run prettier -a")),(0,r.kt)("h2",{id:"specifying-and-updating-the-node-version-in-the-config"},"Specifying and updating the Node version in the config"),(0,r.kt)("p",null,"By default, ",(0,r.kt)("inlineCode",{parentName:"p"},"pre-commit")," uses the system-installed versions of languages. We prefer to manage versions with language managers such as ",(0,r.kt)("inlineCode",{parentName:"p"},"nodenv")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"asdf"),". By default ",(0,r.kt)("inlineCode",{parentName:"p"},"nodenv")," doesn't install Node system-wide, which can cause ",(0,r.kt)("inlineCode",{parentName:"p"},"pre-commit install-hooks")," to hang without explanation. The solution is to either install the language globally (not ideal), or tell ",(0,r.kt)("inlineCode",{parentName:"p"},"pre-commit")," to use a specific version of a language. We can either use the ",(0,r.kt)("inlineCode",{parentName:"p"},"language_version")," key within a specific hook, or if we expect all Node hooks to use the same version, we can define a top-level ",(0,r.kt)("inlineCode",{parentName:"p"},"default_language_version")," attribute where you can specify multiple languages and their versions, like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"default_language_version:\n  # this should match the version in .node-version at the root of this project\n  node: 12.21.0\n\nrepos:\n  - repo: local\n    hooks:\n      - id: go-version\n        name: go version\n        entry: scripts/check-go-version\n        language: script\n        types: [go]\n")),(0,r.kt)("p",null,"This specific language version should match the one we use on the project. For Node, this is defined in ",(0,r.kt)("inlineCode",{parentName:"p"},".node-version"),". When we upgrade Node, we should remember to update the ",(0,r.kt)("inlineCode",{parentName:"p"},"pre-commit")," config file as well."),(0,r.kt)("p",null,"Currently, it looks like ",(0,r.kt)("inlineCode",{parentName:"p"},"pre-commit")," only supports Python, Node, and Ruby for specific language versions. See the ",(0,r.kt)("a",{parentName:"p",href:"https://pre-commit.com/#overriding-language-version"},"pre-commit documentation")," for more details."),(0,r.kt)("h2",{id:"editor-integration"},"Editor Integration"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"golangci-lint")," supports various ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/golangci/golangci-lint/#editor-integration"},"editors"))),(0,r.kt)("h2",{id:"current-pre-commit-hooks"},"Current pre-commit hooks"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Hook"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"go-version")),(0,r.kt)("td",{parentName:"tr",align:null},"Attempts to load go version and verify it.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"check-json")),(0,r.kt)("td",{parentName:"tr",align:null},"Attempts to load all json files to verify syntax. For more see ",(0,r.kt)("a",{parentName:"td",href:"http://github.com/pre-commit/pre-commit-hooks"},"here"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"check-merge-conflict")),(0,r.kt)("td",{parentName:"tr",align:null},"Check for files that contain merge conflict strings. For more see ",(0,r.kt)("a",{parentName:"td",href:"http://github.com/pre-commit/pre-commit-hooks"},"here"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"check-yaml")),(0,r.kt)("td",{parentName:"tr",align:null},"Attempts to load all yaml files to verify syntax. For more see ",(0,r.kt)("a",{parentName:"td",href:"http://github.com/pre-commit/pre-commit-hooks"},"here"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"detect-private-key")),(0,r.kt)("td",{parentName:"tr",align:null},"Checks for the existence of private keys. For more see ",(0,r.kt)("a",{parentName:"td",href:"http://github.com/pre-commit/pre-commit-hooks"},"here"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"trailing-whitespace")),(0,r.kt)("td",{parentName:"tr",align:null},"Trims trailing whitespace. For more see ",(0,r.kt)("a",{parentName:"td",href:"http://github.com/pre-commit/pre-commit-hooks"},"here"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"markdownlint")),(0,r.kt)("td",{parentName:"tr",align:null},"Linting rules for markdown files. For more see ",(0,r.kt)("a",{parentName:"td",href:"http://github.com/igorshubovych/markdownlint-cli"},"here"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"shell-lint")),(0,r.kt)("td",{parentName:"tr",align:null},"Linter for shell files including spell check. For more see ",(0,r.kt)("a",{parentName:"td",href:"http://github.com/detailyang/pre-commit-shell"},"here"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"prettier")),(0,r.kt)("td",{parentName:"tr",align:null},"Attempts to run ",(0,r.kt)("a",{parentName:"td",href:"https://prettier.io/"},"prettier")," hook against the code.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"eslint")),(0,r.kt)("td",{parentName:"tr",align:null},"Attempts to run linting rules against the code base.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"swagger")),(0,r.kt)("td",{parentName:"tr",align:null},"Attempts to run swagger validator for api, internal, order and dps endpoints.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"mdspell")),(0,r.kt)("td",{parentName:"tr",align:null},"Spellchecks Markdown files. For more see ",(0,r.kt)("a",{parentName:"td",href:"https://github.com/lukeapage/node-markdown-spellcheck"},"here"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"markdown-toc")),(0,r.kt)("td",{parentName:"tr",align:null},"Wrapper script to generate table of contents on Markdown files.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"go-imports")),(0,r.kt)("td",{parentName:"tr",align:null},"Attempts to run command ",(0,r.kt)("inlineCode",{parentName:"td"},"goimports")," which updates your Go import lines, adding missing ones and removing unreferenced ones. For more see ",(0,r.kt)("a",{parentName:"td",href:"https://godoc.org/golang.org/x/tools/cmd/goimports"},"here"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"go-lint")),(0,r.kt)("td",{parentName:"tr",align:null},"Attempts to run a linter against the go source code.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"go-vet")),(0,r.kt)("td",{parentName:"tr",align:null},"Attempts to examines Go source code and reports suspicious constructs, such as ",(0,r.kt)("inlineCode",{parentName:"td"},"Printf")," calls whose arguments do not align with the format string.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"gosec")),(0,r.kt)("td",{parentName:"tr",align:null},"Inspects source code for security problems by scanning the Go AST. For more see ",(0,r.kt)("a",{parentName:"td",href:"https://github.com/securego/gosec"},"here"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"gen-docs")),(0,r.kt)("td",{parentName:"tr",align:null},"Attempts to generate table of contents for the ",(0,r.kt)("inlineCode",{parentName:"td"},"README.md")," file in ",(0,r.kt)("inlineCode",{parentName:"td"},"docs/")," folder.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"gofmt")),(0,r.kt)("td",{parentName:"tr",align:null},"Part of ",(0,r.kt)("inlineCode",{parentName:"td"},"golangci-lint")," linter and attempts to format go code")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"varcheck")),(0,r.kt)("td",{parentName:"tr",align:null},"Part of ",(0,r.kt)("inlineCode",{parentName:"td"},"golangci-lint")," linter and used to find unused global variables and constants")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"typecheck")),(0,r.kt)("td",{parentName:"tr",align:null},"Part of ",(0,r.kt)("inlineCode",{parentName:"td"},"golangci-lint")," linter and works like the front-end of a Go compiler, parses and type-checks Go code")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"structcheck")),(0,r.kt)("td",{parentName:"tr",align:null},"Part of ",(0,r.kt)("inlineCode",{parentName:"td"},"golangci-lint")," linter and finds an unused struct fields")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"deadcode")),(0,r.kt)("td",{parentName:"tr",align:null},"Part of ",(0,r.kt)("inlineCode",{parentName:"td"},"golangci-lint")," linter and used to find unused code")))),(0,r.kt)("h1",{id:"troubleshooting-pre-commit-issues"},"Troubleshooting pre-commit issues"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/mymove-docs/docs/backend/guides/troubleshoot-precommit-hook-failures"},"Troubleshoot Precommit Hook Failures")))}s.isMDXComponent=!0}}]);