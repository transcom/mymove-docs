"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[7433],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var o=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),u=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=u(e.components);return o.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},p=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=u(n),m=r,h=p["".concat(l,".").concat(m)]||p[m]||c[m]||a;return n?o.createElement(h,i(i({ref:t},d),{},{components:n})):o.createElement(h,i({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var u=2;u<a;u++)i[u]=n[u];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}p.displayName="MDXCreateElement"},65529:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>a,metadata:()=>s,toc:()=>u});var o=n(87462),r=(n(67294),n(3905));const a={title:"0006 Use Redux"},i="Use [Redux](https://redux.js.org) to manage state and [Redux Thunk](https://github.com/gaearon/redux-thunk) middleware to write action creators that return functions",s={unversionedId:"adrs/redux",id:"adrs/redux",title:"0006 Use Redux",description:"In React, though parent components can pass information to their children components, it's atypical for children components to pass information to parent components. This makes it difficult to handle state that is consistent across multiple components (such as authentication and authorization). Doing so using only React causes a loss in modularity.",source:"@site/docs/adrs/0006-redux.md",sourceDirName:"adrs",slug:"/adrs/redux",permalink:"/mymove-docs/docs/adrs/redux",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/adrs/0006-redux.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{title:"0006 Use Redux"},sidebar:"adrsSidebar",previous:{title:"0005 Use Create React App",permalink:"/mymove-docs/docs/adrs/create-react-app"},next:{title:"0007 Use swagger-client to make calls to API from client",permalink:"/mymove-docs/docs/adrs/swagger-client"}},l={},u=[{value:"Considered Alternatives",id:"considered-alternatives",level:2},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"Pros and Cons of the Alternatives",id:"pros-and-cons-of-the-alternatives",level:2},{value:"Redux",id:"redux",level:3},{value:"MobX",id:"mobx",level:3}],d={toc:u};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"use-redux-to-manage-state-and-redux-thunk-middleware-to-write-action-creators-that-return-functions"},"Use ",(0,r.kt)("a",{parentName:"h1",href:"https://redux.js.org"},"Redux")," to manage state and ",(0,r.kt)("a",{parentName:"h1",href:"https://github.com/gaearon/redux-thunk"},"Redux Thunk")," middleware to write action creators that return functions"),(0,r.kt)("p",null,"In React, though parent components can pass information to their children components, it's atypical for children components to pass information to parent components. This makes it difficult to handle state that is consistent across multiple components (such as authentication and authorization). Doing so using only React causes a loss in modularity.\nRedux is by far the most popular tool used to address the above issue. It also allows for easier testing. Because we'd also like to be able to use thunks (functions that wrap expressions to delay their evaluations) to exert control on when an action is dispatched, we chose redux-thunk middleware once we had settled on using redux."),(0,r.kt)("h2",{id:"considered-alternatives"},"Considered Alternatives"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Redux"),(0,r.kt)("li",{parentName:"ul"},"MobX")),(0,r.kt)("h2",{id:"decision-outcome"},"Decision Outcome"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Chosen Alternative: Redux"),(0,r.kt)("li",{parentName:"ul"},"Redux is the most obvious choice to address this issue. There are many supporting tools (such as redux-thunk) already built to address features Redux itself doesn't address. A few of our team members also already had experience with Redux."),(0,r.kt)("li",{parentName:"ul"},"We can also use ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/zalmoxisus/redux-devtools-extension"},"Redux dev tools")," for debugging. Users of redux devtools must add the extension to their browser of choice (follow instructions in the link above).")),(0,r.kt)("h2",{id:"pros-and-cons-of-the-alternatives"},"Pros and Cons of the Alternatives"),(0,r.kt)("h3",{id:"redux"},"Redux"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"+")," Truss has used in other projects (ProtoWeb App)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"+")," Most commonly used tool to address state management in React."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"+")," Helpful dev tools."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"-")," Haven't explored using other tools thoroughly, so don't really know if this is the 'best' for this specific app.")),(0,r.kt)("h3",{id:"mobx"},"MobX"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"+")," There are rustlings in the community that this is another good tool."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"-")," Truss hasn't used before."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"-")," No convincing argument that it's better than Redux."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"-")," Redux more prevalent.")))}c.isMDXComponent=!0}}]);