"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[7708],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>d});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var m=n.createContext({}),p=function(e){var t=n.useContext(m),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(m.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,m=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),c=p(r),d=a,k=c["".concat(m,".").concat(d)]||c[d]||u[d]||l;return r?n.createElement(k,i(i({ref:t},s),{},{components:r})):n.createElement(k,i({ref:t},s))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,i=new Array(l);i[0]=c;var o={};for(var m in t)hasOwnProperty.call(t,m)&&(o[m]=t[m]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var p=2;p<l;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}c.displayName="MDXCreateElement"},82503:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>m,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var n=r(87462),a=(r(67294),r(3905));const l={title:"Template"},i="*[short title of solved problem and solution]*",o={unversionedId:"adrs/template",id:"adrs/template",title:"Template",description:"User Story: [ticket/issue-number]",source:"@site/docs/adrs/template.md",sourceDirName:"adrs",slug:"/adrs/template",permalink:"/mymove-docs/docs/adrs/template",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/adrs/template.md",tags:[],version:"current",frontMatter:{title:"Template"},sidebar:"adrsSidebar",previous:{title:"0072 Using React-App-Rewired",permalink:"/mymove-docs/docs/adrs/using-react-app-rewired"}},m={},p=[{value:"Considered Alternatives",id:"considered-alternatives",level:2},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"Pros and Cons of the Alternatives  optional ",id:"pros-and-cons-of-the-alternatives--optional-",level:2},{value:"<em>alternative 1</em>",id:"alternative-1",level:3},{value:"<em>alternative 2</em>",id:"alternative-2",level:3},{value:"<em>alternative 3</em>",id:"alternative-3",level:3}],s={toc:p};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"short-title-of-solved-problem-and-solution"},(0,a.kt)("em",{parentName:"h1"},"[short title of solved problem and solution]")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"User Story:")," ",(0,a.kt)("em",{parentName:"p"},"[ticket/issue-number]")," "),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"[context and problem statement]"),"\n",(0,a.kt)("em",{parentName:"p"},"[decision drivers | forces]")," "),(0,a.kt)("h2",{id:"considered-alternatives"},"Considered Alternatives"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("em",{parentName:"li"},"[alternative 1]")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("em",{parentName:"li"},"[alternative 2]")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("em",{parentName:"li"},"[alternative 3]")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("em",{parentName:"li"},"[...]")," ")),(0,a.kt)("h2",{id:"decision-outcome"},"Decision Outcome"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Chosen Alternative: ",(0,a.kt)("em",{parentName:"li"},"[alternative 1]")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("em",{parentName:"li"},"[justification. e.g., only alternative, which meets KO criterion decision driver | which resolves force force | ... | comes out best (see below)]")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("em",{parentName:"li"},"[consequences. e.g., negative impact on quality attribute, follow-up decisions required, ...]")," ")),(0,a.kt)("h2",{id:"pros-and-cons-of-the-alternatives--optional-"},"Pros and Cons of the Alternatives "),(0,a.kt)("h3",{id:"alternative-1"},(0,a.kt)("em",{parentName:"h3"},"[alternative 1]")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," ",(0,a.kt)("em",{parentName:"li"},"[argument 1 pro]")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," ",(0,a.kt)("em",{parentName:"li"},"[argument 2 pro]")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-")," ",(0,a.kt)("em",{parentName:"li"},"[argument 1 con]")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("em",{parentName:"li"},"[...]")," ")),(0,a.kt)("h3",{id:"alternative-2"},(0,a.kt)("em",{parentName:"h3"},"[alternative 2]")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," ",(0,a.kt)("em",{parentName:"li"},"[argument 1 pro]")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," ",(0,a.kt)("em",{parentName:"li"},"[argument 2 pro]")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-")," ",(0,a.kt)("em",{parentName:"li"},"[argument 1 con]")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("em",{parentName:"li"},"[...]")," ")),(0,a.kt)("h3",{id:"alternative-3"},(0,a.kt)("em",{parentName:"h3"},"[alternative 3]")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," ",(0,a.kt)("em",{parentName:"li"},"[argument 1 pro]")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"+")," ",(0,a.kt)("em",{parentName:"li"},"[argument 2 pro]")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-")," ",(0,a.kt)("em",{parentName:"li"},"[argument 1 con]")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("em",{parentName:"li"},"[...]")," ")))}u.isMDXComponent=!0}}]);