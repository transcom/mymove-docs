"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[7809],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),u=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=u(n),m=r,h=d["".concat(i,".").concat(m)]||d[m]||p[m]||l;return n?a.createElement(h,s(s({ref:t},c),{},{components:n})):a.createElement(h,s({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,s=new Array(l);s[0]=d;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:r,s[1]=o;for(var u=2;u<l;u++)s[u]=n[u];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},82487:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>p,frontMatter:()=>l,metadata:()=>o,toc:()=>u});var a=n(87462),r=(n(67294),n(3905));const l={title:"0066 Use custom nullable types for patch requests"},s="Use custom nullable types for patch requests",o={unversionedId:"adrs/use-custom-nullable-types-for-patch-requests",id:"adrs/use-custom-nullable-types-for-patch-requests",title:"0066 Use custom nullable types for patch requests",description:"User Story: MB-10592",source:"@site/docs/adrs/0066-use-custom-nullable-types-for-patch-requests.md",sourceDirName:"adrs",slug:"/adrs/use-custom-nullable-types-for-patch-requests",permalink:"/mymove-docs/docs/adrs/use-custom-nullable-types-for-patch-requests",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/adrs/0066-use-custom-nullable-types-for-patch-requests.md",tags:[],version:"current",sidebarPosition:66,frontMatter:{title:"0066 Use custom nullable types for patch requests"},sidebar:"adrsSidebar",previous:{title:"0065 Use Office application for Prime UI",permalink:"/mymove-docs/docs/adrs/use-office-app-for-prime-ui"},next:{title:"0067 Add a child table to mto_shipments for PPMs",permalink:"/mymove-docs/docs/adrs/ppm-db-design"}},i={},u=[{value:"Considered Alternatives",id:"considered-alternatives",level:2},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"Pros and Cons of the Alternatives",id:"pros-and-cons-of-the-alternatives",level:2},{value:"Use custom nullable types",id:"use-custom-nullable-types",level:3},{value:"Use PUT requests in addition to PATCH requests",id:"use-put-requests-in-addition-to-patch-requests",level:3},{value:"Additional Context",id:"additional-context",level:2}],c={toc:u};function p(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"use-custom-nullable-types-for-patch-requests"},"Use custom nullable types for patch requests"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"User Story:")," ",(0,r.kt)("a",{parentName:"p",href:"https://dp3.atlassian.net/browse/MB-10592"},"MB-10592")),(0,r.kt)("p",null,"There are several instances within the milmove app where a user will need to delete a field or reset a field to null on an object. Currently using patch requests this is not possible because there is no way to differentiate between a field that was omitted or a JSON field that is intentionally set to null. Go-swagger maps the existing YAML type pointers to Go primitive types, where nil could mean omitted or set to null."),(0,r.kt)("h2",{id:"considered-alternatives"},"Considered Alternatives"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Use custom nullable types"),(0,r.kt)("li",{parentName:"ul"},"Use PUT requests in addition to PATCH requests")),(0,r.kt)("h2",{id:"decision-outcome"},"Decision Outcome"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Chosen Alternative: Use custom nullable types")),(0,r.kt)("p",null,"To solve this engineers will now be able to use a custom, nullable type that indicates if the field was set to explicitly set to null ","[delete the data]"," or implicitly ","[don't change anything]",". This solution was selected because the implementation of creating the nullable types is relatively quick, and it allows MilMove to work with a single update request type: PATCH. Using the custom types will require engineers to alter how they access the value of the nullable fields, and understanding of how this type works. The maintenance of the custom code should be minimal after implementation."),(0,r.kt)("h2",{id:"pros-and-cons-of-the-alternatives"},"Pros and Cons of the Alternatives"),(0,r.kt)("h3",{id:"use-custom-nullable-types"},"Use custom nullable types"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"+")," Easy and quick to implement"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"+")," Allows MilMove to use a single update request type"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"+")," Allows API users to set fields to null without having to send all object data"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"-")," Custom code will require milmove engineers to be aware of when and why to use nullable types. There may be a small learning curve.")),(0,r.kt)("h3",{id:"use-put-requests-in-addition-to-patch-requests"},"Use PUT requests in addition to PATCH requests"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"+")," PUT requests are a widely understood and known method of making updates"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"+")," Does not require custom code to implement"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"-")," Requires the API user to return all object data when updating a single field"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"-")," Will require adding additional support for another endpoint for a given resource (new handler, service, changes to YAML, FE calls/payloads, etc.)")),(0,r.kt)("h2",{id:"additional-context"},"Additional Context"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://ustcdp3.slack.com/archives/CP6PTUPQF/p1638833895016700"},"Slack thread discussing alternatives")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://romanyx90.medium.com/handling-json-null-or-missing-values-with-go-swagger-4d7f37a2a7ca"},"Article describing the approach to creating the custom types")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/transcom/mymove/pull/7881"},"Github PR prototyping the custom, nullable string type"))))}p.isMDXComponent=!0}}]);