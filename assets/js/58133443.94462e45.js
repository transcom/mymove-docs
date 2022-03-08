"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[2325],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return m}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},l=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),d=u(n),m=o,f=d["".concat(s,".").concat(m)]||d[m]||p[m]||i;return n?r.createElement(f,c(c({ref:t},l),{},{components:n})):r.createElement(f,c({ref:t},l))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,c=new Array(i);c[0]=d;var a={};for(var s in t)hasOwnProperty.call(t,s)&&(a[s]=t[s]);a.originalType=e,a.mdxType="string"==typeof e?e:o,c[1]=a;for(var u=2;u<i;u++)c[u]=n[u];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},89543:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return l},default:function(){return d}});var r=n(87462),o=n(63366),i=(n(67294),n(3905)),c=["components"],a={id:"github_actions",slug:"/tools/cicd/github_actions"},s="GitHub Actions",u={unversionedId:"tools/cicd/github_actions",id:"tools/cicd/github_actions",isDocsHomePage:!1,title:"GitHub Actions",description:"MilMove uses GitHub Actions rated at IL6+ as of March 31, 2021.",source:"@site/docs/tools/cicd/github_actions.md",sourceDirName:"tools/cicd",slug:"/tools/cicd/github_actions",permalink:"/mymove-docs/docs/tools/cicd/github_actions",editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/tools/cicd/github_actions.md",tags:[],version:"current",frontMatter:{id:"github_actions",slug:"/tools/cicd/github_actions"},sidebar:"toolsSidebar",previous:{title:"CircleCI",permalink:"/mymove-docs/docs/tools/cicd/circleci"},next:{title:"Happo",permalink:"/mymove-docs/docs/tools/cicd/happo"}},l=[],p={toc:l};function d(e){var t=e.components,n=(0,o.Z)(e,c);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"github-actions"},"GitHub Actions"),(0,i.kt)("p",null,"MilMove uses ",(0,i.kt)("a",{parentName:"p",href:"https://dp3.atlassian.net/wiki/spaces/MT/pages/1250197576/ADR-0029+Replace+CircleCI+SaaS+with+GitHub+Actions"},"GitHub Actions")," rated at IL6+ as of March 31, 2021."),(0,i.kt)("p",null,"A set of ",(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions"},"GitHub actions/workflows")," are defined ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/transcom/mymove/tree/master/.github/workflows"},"in MilMove"),".\nAs part of the ",(0,i.kt)("a",{parentName:"p",href:"https://dp3.atlassian.net/wiki/spaces/MT/pages/1467252884/Deployment"},"MilMove deployment")," process, when a developer pushes their code to their GitHub branch automated tests are run and must pass all the necessary checks\nbefore the developer is allowed to merge their code to the main (master) branch."))}d.isMDXComponent=!0}}]);