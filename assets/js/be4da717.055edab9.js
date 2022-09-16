"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[6932],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>c});var a=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var d=a.createContext({}),l=function(e){var t=a.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=l(e.components);return a.createElement(d.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,d=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=l(r),c=n,f=m["".concat(d,".").concat(c)]||m[c]||u[c]||o;return r?a.createElement(f,s(s({ref:t},p),{},{components:r})):a.createElement(f,s({ref:t},p))}));function c(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,s=new Array(o);s[0]=m;var i={};for(var d in t)hasOwnProperty.call(t,d)&&(i[d]=t[d]);i.originalType=e,i.mdxType="string"==typeof e?e:n,s[1]=i;for(var l=2;l<o;l++)s[l]=r[l];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},59912:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var a=r(87462),n=(r(67294),r(3905));const o={title:"0051 Use only Swagger supported formats for dates"},s="Use only Swagger supported formats for dates",i={unversionedId:"adrs/swagger-date-formats",id:"adrs/swagger-date-formats",title:"0051 Use only Swagger supported formats for dates",description:"In our Swagger yaml files we should only be using date formats that are supported by Swagger.",source:"@site/docs/adrs/0051-swagger-date-formats.md",sourceDirName:"adrs",slug:"/adrs/swagger-date-formats",permalink:"/mymove-docs/docs/adrs/swagger-date-formats",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/adrs/0051-swagger-date-formats.md",tags:[],version:"current",sidebarPosition:51,frontMatter:{title:"0051 Use only Swagger supported formats for dates"},sidebar:"adrsSidebar",previous:{title:"0050 Fork & maintain react-file-viewer under @trussworks",permalink:"/mymove-docs/docs/adrs/doc-viewer-fork"},next:{title:"0052 Use data-testid as an attribute for finding components in tests",permalink:"/mymove-docs/docs/adrs/use-data-testid"}},d={},l=[{value:"Considered Alternatives",id:"considered-alternatives",level:2},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"Pros and Cons of the Alternatives",id:"pros-and-cons-of-the-alternatives",level:2},{value:"Leave everything as is. Continue to use unsupported date formats, namely <code>datetime</code>",id:"leave-everything-as-is-continue-to-use-unsupported-date-formats-namely-datetime",level:3},{value:"Use Swagger supported date formats, <code>date-time</code> or <code>date</code>, depending on whether we need to store an exact timestamp of the event",id:"use-swagger-supported-date-formats-date-time-or-date-depending-on-whether-we-need-to-store-an-exact-timestamp-of-the-event",level:3}],p={toc:l};function u(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"use-only-swagger-supported-formats-for-dates"},"Use only Swagger supported formats for dates"),(0,n.kt)("p",null,"In our Swagger yaml files we should only be using date formats that are supported by Swagger."),(0,n.kt)("h2",{id:"considered-alternatives"},"Considered Alternatives"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Leave everything as is. Continue to use unsupported date formats, namely, ",(0,n.kt)("inlineCode",{parentName:"li"},"datetime"))),(0,n.kt)("h2",{id:"decision-outcome"},"Decision Outcome"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Chosen Alternative: ",(0,n.kt)("strong",{parentName:"li"},"Use Swagger supported date formats, ",(0,n.kt)("inlineCode",{parentName:"strong"},"date-time")," or ",(0,n.kt)("inlineCode",{parentName:"strong"},"date"),", depending on whether we need to store an exact timestamp of the event."))),(0,n.kt)("p",null,"This option will assure that we are using Swagger supported data types"),(0,n.kt)("h2",{id:"pros-and-cons-of-the-alternatives"},"Pros and Cons of the Alternatives"),(0,n.kt)("h3",{id:"leave-everything-as-is-continue-to-use-unsupported-date-formats-namely-datetime"},"Leave everything as is. Continue to use unsupported date formats, namely ",(0,n.kt)("inlineCode",{parentName:"h3"},"datetime")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"+")," No changes needed to be done."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"-")," Leads to inconsistent data type usage for what should be similar data."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"-")," Using a data type format that is not supported by Swagger.")),(0,n.kt)("h3",{id:"use-swagger-supported-date-formats-date-time-or-date-depending-on-whether-we-need-to-store-an-exact-timestamp-of-the-event"},"Use Swagger supported date formats, ",(0,n.kt)("inlineCode",{parentName:"h3"},"date-time")," or ",(0,n.kt)("inlineCode",{parentName:"h3"},"date"),", depending on whether we need to store an exact timestamp of the event"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"+")," Makes correct use of Swagger data types."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"+")," Maintains consistency in how we format dates in our APIs."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"-")," Requires changes to yaml files.")))}u.isMDXComponent=!0}}]);