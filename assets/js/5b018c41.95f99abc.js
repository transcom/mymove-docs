"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[6869],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var i=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,i,n=function(e,t){if(null==e)return{};var r,i,n={},a=Object.keys(e);for(i=0;i<a.length;i++)r=a[i],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)r=a[i],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=i.createContext({}),c=function(e){var t=i.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=c(e.components);return i.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},h=i.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),h=c(r),d=n,f=h["".concat(s,".").concat(d)]||h[d]||p[d]||a;return r?i.createElement(f,o(o({ref:t},u),{},{components:r})):i.createElement(f,o({ref:t},u))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,o=new Array(a);o[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,o[1]=l;for(var c=2;c<a;c++)o[c]=r[c];return i.createElement.apply(null,o)}return i.createElement.apply(null,r)}h.displayName="MDXCreateElement"},88243:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var i=r(87462),n=(r(67294),r(3905));const a={},o="Integration Test Failures",l={unversionedId:"tools/cicd/integration_test_failures",id:"tools/cicd/integration_test_failures",title:"Integration Test Failures",description:"There are two (2) ways to receive notifications of integration test failures.",source:"@site/docs/tools/cicd/integration_test_failures.md",sourceDirName:"tools/cicd",slug:"/tools/cicd/integration_test_failures",permalink:"/mymove-docs/docs/tools/cicd/integration_test_failures",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/tools/cicd/integration_test_failures.md",tags:[],version:"current",frontMatter:{},sidebar:"toolsSidebar",previous:{title:"Happo",permalink:"/mymove-docs/docs/tools/cicd/happo"},next:{title:"How to Manage Dependabot",permalink:"/mymove-docs/docs/tools/dependabot/manage-dependabot"}},s={},c=[{value:"CircleCI",id:"circleci",level:2},{value:"Re-run",id:"re-run",level:3},{value:"GitHub pull request",id:"github-pull-request",level:2},{value:"Help",id:"help",level:2},{value:"References",id:"references",level:2}],u={toc:c};function p(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,i.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"integration-test-failures"},"Integration Test Failures"),(0,n.kt)("p",null,"There are two (2) ways to receive notifications of integration test failures.\nOne is in ",(0,n.kt)("a",{parentName:"p",href:"https://app.circleci.com/pipelines/github/transcom/mymove"},"MilMove CircleCI dashboard"),"\nand the other is from the ",(0,n.kt)("a",{parentName:"p",href:"https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests"},"GitHub pull request")," page."),(0,n.kt)("h2",{id:"circleci"},"CircleCI"),(0,n.kt)("p",null,"You will see a ",(0,n.kt)("inlineCode",{parentName:"p"},"Failed")," notification on the dashboard page. Click on the ",(0,n.kt)("inlineCode",{parentName:"p"},"Failed")," notification/label to see what step in the CI/CD has failed."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"CircleCI dashboard failed",src:r(31117).Z,width:"1321",height:"309"})),(0,n.kt)("p",null,"After you click on the ",(0,n.kt)("inlineCode",{parentName:"p"},"Failed")," notification/label, you will be presented with a list of actions that were taken or are still in progress for the commit.\nClick on the failed indicator to see the details of what is failing."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"CircleCI failed check",src:r(51472).Z,width:"1317",height:"531"})),(0,n.kt)("p",null,"These details will show the terminal output that you would see if the tests were running locally."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"CircleCI failure details",src:r(46940).Z,width:"2056",height:"378"})),(0,n.kt)("p",null,"Once you see these logs, you are able to look at the error messages and determine next steps to fix the failed test(s)."),(0,n.kt)("h3",{id:"re-run"},"Re-run"),(0,n.kt)("p",null,"Pushing a new commit to your branch will automatically kick off CI/CD pipeline. However, if there are no changes and you would like to re-run\nthe tests you can click on ",(0,n.kt)("inlineCode",{parentName:"p"},"Rerun")," in the upper right-hand corner of the CircleCI page."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"CircleCI rerun",src:r(29110).Z,width:"1033",height:"347"})),(0,n.kt)("p",null,"Unless you know you want to re-run the entire pipeline select ",(0,n.kt)("inlineCode",{parentName:"p"},"Rerun")," > ",(0,n.kt)("inlineCode",{parentName:"p"},"Rerun Workflow from Failed")," is good enough. This option only re-runs\nthe failed tests."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"CircleCI rerun options",src:r(17146).Z,width:"1033",height:"412"})),(0,n.kt)("h2",{id:"github-pull-request"},"GitHub pull request"),(0,n.kt)("p",null,"From the ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/transcom/mymove/pulls"},"MilMove GitHub pull request page"),". You can see a list of pull requests. There is a red ",(0,n.kt)("inlineCode",{parentName:"p"},"x")," or a green checkmark indicator to\nnotify if the pull request is passing checking or if there is a failing check that needs attention."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"GitHub pull requests failed checks",src:r(75520).Z,width:"885",height:"302"})),(0,n.kt)("p",null,"Clicking on the pull request or if you are already on the pull request page, you can see the list of checks for the pull request/branch being\nrun toward the bottom of the page. Similar to the pull reqest list view previously mentioned, there are red ",(0,n.kt)("inlineCode",{parentName:"p"},"x")," or a green checkmark indicators to\nnotify the user if the pull request is passing the checks or if there are failing checks needing attention."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"GitHub pull request failed checks",src:r(11199).Z,width:"1046",height:"656"})),(0,n.kt)("p",null,"Clicking on the ",(0,n.kt)("inlineCode",{parentName:"p"},"Details")," link to the right will take you to the CircleCI run for this branch where you will be able to see the details similar to\nwhat was shown in the CircleCI section."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"CircleCI failed details",src:r(45356).Z,width:"1674",height:"170"})),(0,n.kt)("p",null,"To re-run follow the ",(0,n.kt)("a",{parentName:"p",href:"#re-run"},"Re-run")," step under CircleCI."),(0,n.kt)("h2",{id:"help"},"Help"),(0,n.kt)("p",null,"If the user pushing a commit or performing a merge is unable to troubleshoot the issues being reported ask\n",(0,n.kt)("a",{parentName:"p",href:"https://ustcdp3.slack.com/archives/CP6PTUPQF"},"#prac-engineering"),", ",(0,n.kt)("a",{parentName:"p",href:"https://ustcdp3.slack.com/archives/CP496B8DB"},"#prac-infrasec"),", and/or ",(0,n.kt)("a",{parentName:"p",href:"https://ustcdp3.slack.com/archives/CP4U2NKRT"},"#on-call")," for help."),(0,n.kt)("h2",{id:"references"},"References"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks"},"About status checks")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/troubleshooting-required-status-checks"},"Troubleshooting required status checks"))))}p.isMDXComponent=!0},17146:(e,t,r)=>{r.d(t,{Z:()=>i});const i=r.p+"assets/images/cicleci_rerun-68d5ea14ea7d009356e42ef03dda150e.png"},31117:(e,t,r)=>{r.d(t,{Z:()=>i});const i=r.p+"assets/images/circleci_dashboard_failed_app-5c3c7227a1da0f95529ac6ee9b8305f2.png"},51472:(e,t,r)=>{r.d(t,{Z:()=>i});const i=r.p+"assets/images/circleci_failed_check-e6e75ea63b096084c5b97d4ed64acad0.png"},45356:(e,t,r)=>{r.d(t,{Z:()=>i});const i=r.p+"assets/images/circleci_failed_detailed-4ae28baa348d9e787504358315ad5916.png"},46940:(e,t,r)=>{r.d(t,{Z:()=>i});const i=r.p+"assets/images/circleci_failed_details_2-0cb1d94fbb9b586289cc65d62308427a.png"},29110:(e,t,r)=>{r.d(t,{Z:()=>i});const i=r.p+"assets/images/circleci_test_failed-9c7c68749a850272fc1ca8bee2328390.png"},11199:(e,t,r)=>{r.d(t,{Z:()=>i});const i=r.p+"assets/images/github_pr_failed_check-5ad19ca09a64c3300edb1892e582c2c6.png"},75520:(e,t,r)=>{r.d(t,{Z:()=>i});const i=r.p+"assets/images/github_pullrequests_failed_checks-16da2b3918fa503cde244e34c283d664.png"}}]);