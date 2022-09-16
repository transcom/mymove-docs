"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[6266],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var s=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,s,r=function(e,t){if(null==e)return{};var n,s,r={},a=Object.keys(e);for(s=0;s<a.length;s++)n=a[s],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(s=0;s<a.length;s++)n=a[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=s.createContext({}),l=function(e){var t=s.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return s.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},p=s.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=l(n),m=r,h=p["".concat(c,".").concat(m)]||p[m]||d[m]||a;return n?s.createElement(h,i(i({ref:t},u),{},{components:n})):s.createElement(h,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=p;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var l=2;l<a;l++)i[l]=n[l];return s.createElement.apply(null,i)}return s.createElement.apply(null,n)}p.displayName="MDXCreateElement"},49650:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>o,toc:()=>l});var s=n(87462),r=(n(67294),n(3905));const a={sidebar_position:5},i="How to run end to end (Cypress) tests",o={unversionedId:"backend/testing/run-e2e-tests",id:"backend/testing/run-e2e-tests",title:"How to run end to end (Cypress) tests",description:"Cypress tests run using the client-side code. This guide shows you how to run",source:"@site/docs/backend/testing/run-e2e-tests.md",sourceDirName:"backend/testing",slug:"/backend/testing/run-e2e-tests",permalink:"/mymove-docs/docs/backend/testing/run-e2e-tests",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/backend/testing/run-e2e-tests.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"backendSidebar",previous:{title:"How to run acceptance tests",permalink:"/mymove-docs/docs/backend/testing/run-acceptance-tests"},next:{title:"How to run Go tests",permalink:"/mymove-docs/docs/backend/testing/run-go-tests"}},c={},l=[{value:"Using the Cypress UI",id:"using-the-cypress-ui",level:2},{value:"In Docker",id:"in-docker",level:2},{value:"Run Specific Tests in a File",id:"run-specific-tests-in-a-file",level:2},{value:"Automated tests artifacts from continuous integration",id:"automated-tests-artifacts-from-continuous-integration",level:2}],u={toc:l};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,s.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"how-to-run-end-to-end-cypress-tests"},"How to run end to end (Cypress) tests"),(0,r.kt)("p",null,"Cypress tests run using the client-side code. This guide shows you how to run\nthe Cypress test suite either as Docker container, as a command-line tool\nlocally, or using the Cypress UI. When running within these tests, make sure you\nbuild the client locally in order to ensure that the latest client code is what\nCypress is testing against."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"make client_build\n")),(0,r.kt)("p",null,"After completing the previous command, you should be able to run the commands\nbefore and utilize the same client-side code to test. If you make any changes\nwithin the ",(0,r.kt)("inlineCode",{parentName:"p"},"src/")," directory, you will need to rebuild the client-side code. The\nsame is not true for the back-end work as that work is reloaded every time the\nCypress tests are started."),(0,r.kt)("h2",{id:"using-the-cypress-ui"},"Using the Cypress UI"),(0,r.kt)("p",null,'The fastest way to run end to end tests is with the following command, which will open the\nCypress UI, from which you can choose to run all integration specs (there should be a link in\nthe top right that says something like "Run 25 integration specs"), or click on individual ones.'),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"make e2e_test\n")),(0,r.kt)("p",null,"This command truncates most tables in the test DB (which is much faster than destroying it, running it again,\nand running all the migrations), then populates the DB from the data in the\n",(0,r.kt)("inlineCode",{parentName:"p"},"/pkg/testdatagen/scenario/e2ebasic.go")," script, and then launches Cypress UI."),(0,r.kt)("p",null,"Sometimes, a new recently-merged migration might prevent the script from running.\nIn that case, or if something else seems wrong with the test DB, you can set everything\nup from scratch:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"make e2e_test_fresh\n")),(0,r.kt)("p",null,"If you have already run tests in the current database, and you want to keep Cypress open\nto run the tests again, you can empty and refill the test DB with this command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"make db_e2e_up\n")),(0,r.kt)("h2",{id:"in-docker"},"In Docker"),(0,r.kt)("p",null,"If you instead would like to run all the tests in the terminal, use the following command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"make e2e_test_docker\n")),(0,r.kt)("p",null,"To run just the office tests:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"SPECS=cypress/integration/office/**/* make e2e_test_docker\n")),(0,r.kt)("h2",{id:"run-specific-tests-in-a-file"},"Run Specific Tests in a File"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"yarn cypress run --spec cypress/integration/path/to/file.jsx\n")),(0,r.kt)("h2",{id:"automated-tests-artifacts-from-continuous-integration"},"Automated tests artifacts from continuous integration"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"External documentation call-out")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"The intention of this documentation is to not repeat the official docs. At the\ntime of this writing, the documentation being referenced contains an ",(0,r.kt)("em",{parentName:"p"},"Artifacts\noverview")," section, which shows where Artifacts are stored in the\nCircleCI UI."))),(0,r.kt)("p",null,"We use CircleCI to store artifacts for failed Cypress tests. These are available\nto all Trussels with GitHub repository access in the CircleCI UI. ",(0,r.kt)("a",{parentName:"p",href:"https://circleci.com/docs/artifacts#artifacts-overview"},"Please see\nthe official CirclCI documentation about build\nartifacts"),". The project's Artifacts are only stored on\nfailed Integration Tests that run in CI. This is defined in our\n",(0,r.kt)("inlineCode",{parentName:"p"},".circleci/config.yml")," file in the project under the ",(0,r.kt)("inlineCode",{parentName:"p"},"e2e_tests_cypress:"),"\nstanza. ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/transcom/mymove/blob/35630d2f7e94371393860dfd63f9b6d49eededdb/.circleci/config.yml#L567-L633"},"Here's a link to an example at the time of this\nwriting"),"."))}d.isMDXComponent=!0}}]);