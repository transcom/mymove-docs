"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[8281],{3905:(e,n,t)=>{t.d(n,{Zo:()=>m,kt:()=>c});var o=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,o,a=function(e,n){if(null==e)return{};var t,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=o.createContext({}),d=function(e){var n=o.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},m=function(e){var n=d(e.components);return o.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},g=o.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),g=d(t),c=a,u=g["".concat(s,".").concat(c)]||g[c]||p[c]||i;return t?o.createElement(u,r(r({ref:n},m),{},{components:t})):o.createElement(u,r({ref:n},m))}));function c(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,r=new Array(i);r[0]=g;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,r[1]=l;for(var d=2;d<i;d++)r[d]=t[d];return o.createElement.apply(null,r)}return o.createElement.apply(null,t)}g.displayName="MDXCreateElement"},40095:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var o=t(87462),a=(t(67294),t(3905));const i={title:"0056 Use ASDF To Manage Golang Versions In Development"},r="Use ASDF To Manage Golang Versions In Development",l={unversionedId:"adrs/use-asdf-to-manage-golang-versions-in-development",id:"adrs/use-asdf-to-manage-golang-versions-in-development",title:"0056 Use ASDF To Manage Golang Versions In Development",description:"There are many tools for managing versions of developer tools on developer machines. brew, nodenv, g, etc. Historically MilMove has used brew for many things, but for node and golang this has lead to problems. Because of the issues around requiring specific versions of node and golang brew has caused more headaches than it is worth dealing with. This lead to ADR 0046 Use nodenv, which solved the problem for node. However we don't have one for golang. So this ADR aims to provide a recommendation towards managing golang release versions in development.",source:"@site/docs/adrs/0056-use-asdf-to-manage-golang-versions-in-development.md",sourceDirName:"adrs",slug:"/adrs/use-asdf-to-manage-golang-versions-in-development",permalink:"/mymove-docs/docs/adrs/use-asdf-to-manage-golang-versions-in-development",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/adrs/0056-use-asdf-to-manage-golang-versions-in-development.md",tags:[],version:"current",sidebarPosition:56,frontMatter:{title:"0056 Use ASDF To Manage Golang Versions In Development"},sidebar:"adrsSidebar",previous:{title:"0055 Consolidate moves and move task orders into one database table",permalink:"/mymove-docs/docs/adrs/consolidate-moves-and-mtos"},next:{title:"0057 Deprecate use of lodash over time",permalink:"/mymove-docs/docs/adrs/lodash"}},s={},d=[{value:"Considered Alternatives",id:"considered-alternatives",level:2},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"Pros and Cons of the Alternatives",id:"pros-and-cons-of-the-alternatives",level:2},{value:"Do nothing, keep using brew",id:"do-nothing-keep-using-brew",level:3},{value:"Use a golang specific tool (g, goenv, gvm, etc.)",id:"use-a-golang-specific-tool-g-goenv-gvm-etc",level:3},{value:"Use asdf to manage golang, node, and yarn",id:"use-asdf-to-manage-golang-node-and-yarn",level:3},{value:"Use asdf to manage only golang for now",id:"use-asdf-to-manage-only-golang-for-now",level:3}],m={toc:d};function p(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,o.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"use-asdf-to-manage-golang-versions-in-development"},"Use ASDF To Manage Golang Versions In Development"),(0,a.kt)("p",null,"There are many tools for managing versions of developer tools on developer machines. ",(0,a.kt)("a",{parentName:"p",href:"https://brew.sh/"},"brew"),", ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/nodenv/nodenv"},"nodenv"),", ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/stefanmaric/g"},"g"),", etc. Historically MilMove has used brew for many things, but for node and golang this has lead to problems. Because of the issues around requiring specific versions of node and golang brew has caused more headaches than it is worth dealing with. This lead to ",(0,a.kt)("a",{parentName:"p",href:"/mymove-docs/docs/adrs/use-nodenv"},"ADR 0046 Use nodenv"),", which solved the problem for node. However we don't have one for golang. So this ADR aims to provide a recommendation towards managing golang release versions in development."),(0,a.kt)("h2",{id:"considered-alternatives"},"Considered Alternatives"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Do nothing, keep using brew"),(0,a.kt)("li",{parentName:"ul"},"Use a golang specific tool (g, goenv, gvm, etc.)"),(0,a.kt)("li",{parentName:"ul"},"Use ",(0,a.kt)("a",{parentName:"li",href:"https://asdf-vm.com/"},"asdf")," to manage golang, node, and yarn"),(0,a.kt)("li",{parentName:"ul"},"Use ",(0,a.kt)("a",{parentName:"li",href:"https://asdf-vm.com/"},"asdf")," to manage only golang for now")),(0,a.kt)("h2",{id:"decision-outcome"},"Decision Outcome"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Chosen Alternative: Use ",(0,a.kt)("a",{parentName:"li",href:"https://asdf-vm.com/"},"asdf")," to manage only golang for now",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," asdf supports a ",(0,a.kt)("inlineCode",{parentName:"li"},".tool-version")," config file within the project to define what version of golang are required and can be checked into the repo"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," will allow us to define what version of golang all developers are using so it is consistent"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," removes dependence on brew which regularly only has the latest and greatest version of these tools."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," allows us to switch node and yarn to be managed by asdf at a later time"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-")," asdf is yet another tool to be familiar with"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"=")," Our use and dependence on brew will not be removed, just it's use to install yarn and golang")))),(0,a.kt)("p",null,"To elaborate some more on why ASDF verses a golang specific option. In googling there were not many discussions around version managers. Polling among Truss revealed use of ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/stefanmaric/g"},"g")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"asdf"),". I did like the tool ",(0,a.kt)("inlineCode",{parentName:"p"},"g")," and the maintainer's ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/stefanmaric/g#the-alternatives-and-why-i-prefer-g"},"reasons for preferring it")," to other such tools. However, the only negative listed to ",(0,a.kt)("inlineCode",{parentName:"p"},"asdf-golang")," was it's dependence on ",(0,a.kt)("inlineCode",{parentName:"p"},"asdf"),", and didn't account for the fact that having one tool version manager simplifies one set of tools required for keeping development flowing smoothly. Admittedly we are not yet taking advantage of ",(0,a.kt)("inlineCode",{parentName:"p"},"asdf")," for other tools, but I would like to see that happen."),(0,a.kt)("p",null,"Another advantage of these tools is they also runs on Linux so we can utilize it within docker image creation to manage versions of our tooling that is installed and keep it in sync with what developers are using locally from a single tool configuration file that is checked into the repo. This ADR advocates changing our tooling to rely on ",(0,a.kt)("inlineCode",{parentName:"p"},"asdf")," locally to manage golang and where it makes sense in our ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/transcom/circleci-docker"},"circleci-docker")," images."),(0,a.kt)("h2",{id:"pros-and-cons-of-the-alternatives"},"Pros and Cons of the Alternatives"),(0,a.kt)("h3",{id:"do-nothing-keep-using-brew"},"Do nothing, keep using brew"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," Easy, nothing to do here"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," It got us here"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-")," It's often confusing to fix if a newer version of node, golang, or yarn is installed"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-")," By default brew doesn't save old versions, so if that version is gone from the brew repo there is no rolling back"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-")," Pinning brew packages leads to issues installing other brew packages that depend on them, which may be unrelated to the project"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"=")," Our use and dependence on brew will not be removed, just it's use to install yarn and golang")),(0,a.kt)("h3",{id:"use-a-golang-specific-tool-g-goenv-gvm-etc"},"Use a golang specific tool (g, goenv, gvm, etc.)"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," Solves the version control issues introduced by brew"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," Similar to how we handled node"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-")," Yet another tool"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-")," Yet another configuration"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"=")," Our use and dependence on brew will not be removed, just it's use to install yarn and golang")),(0,a.kt)("h3",{id:"use-asdf-to-manage-golang-node-and-yarn"},"Use asdf to manage golang, node, and yarn"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," Solves the version control issues introduced by brew"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," Similar to how we handled node"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," Allows us to use one tool to manage node, yarn, and golang so we can have matching versions in development and deployed environments"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," One configuration file for all these dependencies"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," Clear documentation"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-")," Pain of switching tools around for all engineers"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-")," Possible conflicts if developers have multiple of these tools installed to manage any one of the tools mentioned"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"=")," Our use and dependence on brew will not be removed, just it's use to install yarn and golang")),(0,a.kt)("p",null,"A disadvantage of this approach, and part of why it was not selected is that many of these tool rely on your shell path to work. So installing node, yarn, or golang with asdf and another one of the similar tools can cause conflicts depending on which of the version manager tools is first in a particular path. This risk exists today, but could be exacerbated by choosing tooling that is less common. I think using ",(0,a.kt)("inlineCode",{parentName:"p"},"direnv")," or other method to control the path can allow the tools to co-exist for those that need it though. Another way to mitigate this is turn on asdf's legacy configuration feature as it will pickup config files for other tools line nodenv that way. See ",(0,a.kt)("a",{parentName:"p",href:"https://asdf-vm.com/#/core-configuration?id=homeasdfrc"},"this documentation")),(0,a.kt)("h3",{id:"use-asdf-to-manage-only-golang-for-now"},"Use asdf to manage only golang for now"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," asdf supports a ",(0,a.kt)("inlineCode",{parentName:"li"},".tool-version")," config file within the project to define what version of golang are required and can be checked into the repo"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," will allow us to define what version of golang all developers are using so it is consistent"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," removes dependence on brew which regularly only has the latest and greatest version of these tools."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," allows us to switch node and yarn to be managed by asdf at a later time"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," Supports configuration file for setting the golang version and checking in"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," Clear documentation"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-")," asdf is yet another tool to be familiar with"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"=")," Our use and dependence on brew will not be removed, just it's use to install yarn and golang")))}p.isMDXComponent=!0}}]);