"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[5860],{19365:(e,t,a)=>{a.d(t,{A:()=>o});var n=a(96540),r=a(40870);const s={tabItem:"tabItem_Ymn6"};function o(e){let{children:t,hidden:a,className:o}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.A)(s.tabItem,o),hidden:a},t)}},11470:(e,t,a)=>{a.d(t,{A:()=>w});var n=a(58168),r=a(96540),s=a(40870),o=a(23104),i=a(56347),l=a(57485),u=a(31682),c=a(89466);function d(e){return function(e){var t;return(null==(t=r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:t.filter(Boolean))??[]}(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:r}}=e;return{value:t,label:a,attributes:n,default:r}}))}function m(e){const{values:t,children:a}=e;return(0,r.useMemo)((()=>{const e=t??d(a);return function(e){const t=(0,u.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function p(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:a}=e;const n=(0,i.W6)(),s=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,l.aZ)(s),(0,r.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(n.location.search);t.set(s,e),n.replace({...n.location,search:t.toString()})}),[s,n])]}function b(e){const{defaultValue:t,queryString:a=!1,groupId:n}=e,s=m(e),[o,i]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=a.find((e=>e.default))??a[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:s}))),[l,u]=g({queryString:a,groupId:n}),[d,b]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,s]=(0,c.Dv)(a);return[n,(0,r.useCallback)((e=>{a&&s.set(e)}),[a,s])]}({groupId:n}),f=(()=>{const e=l??d;return p({value:e,tabValues:s})?e:null})();(0,r.useLayoutEffect)((()=>{f&&i(f)}),[f]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);i(e),u(e),b(e)}),[u,b,s]),tabValues:s}}var f=a(92303);const h={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function v(e){let{className:t,block:a,selectedValue:i,selectValue:l,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:d}=(0,o.a_)(),m=e=>{const t=e.currentTarget,a=c.indexOf(t),n=u[a].value;n!==i&&(d(t),l(n))},p=e=>{var t;let a=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const t=c.indexOf(e.currentTarget)+1;a=c[t]??c[0];break}case"ArrowLeft":{const t=c.indexOf(e.currentTarget)-1;a=c[t]??c[c.length-1];break}}null==(t=a)||t.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":a},t)},u.map((e=>{let{value:t,label:a,attributes:o}=e;return r.createElement("li",(0,n.A)({role:"tab",tabIndex:i===t?0:-1,"aria-selected":i===t,key:t,ref:e=>c.push(e),onKeyDown:p,onClick:m},o,{className:(0,s.A)("tabs__item",h.tabItem,null==o?void 0:o.className,{"tabs__item--active":i===t})}),a??t)})))}function y(e){let{lazy:t,children:a,selectedValue:n}=e;const s=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===n));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},s.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function k(e){const t=b(e);return r.createElement("div",{className:(0,s.A)("tabs-container",h.tabList)},r.createElement(v,(0,n.A)({},e,t)),r.createElement(y,(0,n.A)({},e,t)))}function w(e){const t=(0,f.A)();return r.createElement(k,(0,n.A)({key:String(t)},e))}},28649:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>g,frontMatter:()=>i,metadata:()=>u,toc:()=>d});var n=a(58168),r=(a(96540),a(15680)),s=(a(41873),a(11470)),o=a(19365);const i={},l="Okta Admins",u={unversionedId:"getting-started/okta/okta-admins",id:"getting-started/okta/okta-admins",title:"Okta Admins",description:"The role of Okta Admins is crucial in importing and managing users accessing any MilMove application. When it comes to assigning access to Okta Admins, it is generally best to keep the privileges at the lowest necessary level in order to avoid any security or configuration issues.",source:"@site/docs/getting-started/okta/01-okta-admins.md",sourceDirName:"getting-started/okta",slug:"/getting-started/okta/okta-admins",permalink:"/mymove-docs/docs/getting-started/okta/okta-admins",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/getting-started/okta/01-okta-admins.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"gettingStartedSidebar",previous:{title:"Okta Overview",permalink:"/mymove-docs/docs/getting-started/okta/okta-overview"},next:{title:"CSV File Importing",permalink:"/mymove-docs/docs/getting-started/okta/csv-import"}},c={},d=[],m={toc:d},p="wrapper";function g(e){let{components:t,...a}=e;return(0,r.yg)(p,(0,n.A)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"okta-admins"},"Okta Admins"),(0,r.yg)("p",null,"The role of Okta Admins is crucial in importing and managing users accessing any MilMove application. When it comes to assigning access to Okta Admins, it is generally best to keep the privileges at the lowest necessary level in order to avoid any security or configuration issues."),(0,r.yg)("admonition",{type:"info"},(0,r.yg)("p",{parentName:"admonition"},"You can find more info about Okta Admins ",(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("a",{parentName:"strong",href:"https://help.okta.com/en-us/content/topics/security/administrators-learn-about-admins.htm"},"HERE")))),(0,r.yg)("p",null,"Generally speaking, the Okta Admins managing the MilMove application will be:"),(0,r.yg)(s.A,{mdxType:"Tabs"},(0,r.yg)(o.A,{label:"Super Admin",value:"super",default:!0,mdxType:"TabItem"},"An Okta Super Admin will be able to do pretty much anything, but the primary responsibility will be assigning Okta Admin roles to Okta users that will be requiring admin access to manage users or monitor the system logs. Ideally, we only want a very small number of people in this role to avoid any unnecessary privileges."),(0,r.yg)(o.A,{label:"MilMove Admin",value:"milmove",mdxType:"TabItem"},"The Okta MilMove Admins role will be allowed to manage users, groups and applications, but the primary role of this Admin will be importing office and admin users via CSV file import, making sure the information is up to date and correct, and assigning users to groups as needed if the automatic enrollment into groups fails during import."),(0,r.yg)(o.A,{label:"Help Desk",value:"help-desk",mdxType:"TabItem"},"An Okta Help Desk Admin will be primarily used for user troubleshooting, resetting passwords, creating temporary passwords, unlocking accounts, and other user required actions when they are having issues accessing their accounts.")))}g.isMDXComponent=!0}}]);