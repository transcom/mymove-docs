"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[1902],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),p=c(n),u=i,h=p["".concat(l,".").concat(u)]||p[u]||m[u]||o;return n?a.createElement(h,s(s({ref:t},d),{},{components:n})):a.createElement(h,s({ref:t},d))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,s=new Array(o);s[0]=p;var r={};for(var l in t)hasOwnProperty.call(t,l)&&(r[l]=t[l]);r.originalType=e,r.mdxType="string"==typeof e?e:i,s[1]=r;for(var c=2;c<o;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},38676:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var a=n(87462),i=(n(67294),n(3905));const o={title:"0064 Use stateless services with context"},s="Use stateless services with context",r={unversionedId:"adrs/use-stateless-services-with-context",id:"adrs/use-stateless-services-with-context",title:"0064 Use stateless services with context",description:"Problem statement",source:"@site/docs/adrs/0064-use-stateless-services-with-context.md",sourceDirName:"adrs",slug:"/adrs/use-stateless-services-with-context",permalink:"/mymove-docs/docs/adrs/use-stateless-services-with-context",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/adrs/0064-use-stateless-services-with-context.md",tags:[],version:"current",sidebarPosition:64,frontMatter:{title:"0064 Use stateless services with context"},sidebar:"adrsSidebar",previous:{title:"0063 Using openapi CLI to compile API specs",permalink:"/mymove-docs/docs/adrs/use-openapi-to-compile-api-specs"},next:{title:"0065 Use Office application for Prime UI",permalink:"/mymove-docs/docs/adrs/use-office-app-for-prime-ui"}},l={},c=[{value:"Problem statement",id:"problem-statement",level:2},{value:"Considered Alternatives",id:"considered-alternatives",level:2},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"Pros and Cons of the Alternatives",id:"pros-and-cons-of-the-alternatives",level:2},{value:"Modify all service methods to accept a custom interface",id:"modify-all-service-methods-to-accept-a-custom-interface",level:3},{value:"Modify all service methods to accept <em>both</em> a <code>Context</code> and a custom interface",id:"modify-all-service-methods-to-accept-both-a-context-and-a-custom-interface",level:3},{value:"Modify all service methods to accept a <code>Context</code>",id:"modify-all-service-methods-to-accept-a-context",level:3},{value:"Do nothing",id:"do-nothing",level:3}],d={toc:c};function m(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"use-stateless-services-with-context"},"Use stateless services with context"),(0,i.kt)("h2",{id:"problem-statement"},"Problem statement"),(0,i.kt)("p",null,"We want our services to be composable, so that one service can call\nanother. We also want to be able to have a per request trace id\nassociated with a logger so that we can correlate log messages in a\nsingle request."),(0,i.kt)("p",null,"Right now, most services are initialized with a database connection pool\nand a logger."),(0,i.kt)("p",null,"When using the ",(0,i.kt)("inlineCode",{parentName:"p"},"database/sql"),' package, each database\nrequest uses a different connection to the database. Some of our\nservices start transactions and then want to call other services. The\n"sub-service" uses its own connection pool and thus does not have\nvisibility to the changes made within the transaction.'),(0,i.kt)("p",null,"Some services have a way to set the connection used the service, but\nsince we have a single service object, it seems almost certain that\nwith goroutines handling each request that we'll have errors\nwhen multiple requests are running simultaneously."),(0,i.kt)("p",null,'The same problem exists for logging because services are logging using\nthe "global" logger and not one initialized per request. That means\nservice logs don\'t include the per request trace id.'),(0,i.kt)("h2",{id:"considered-alternatives"},"Considered Alternatives"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Modify all service methods to accept a custom interface"),(0,i.kt)("li",{parentName:"ul"},"Modify all service methods to accept ",(0,i.kt)("em",{parentName:"li"},"both")," a ",(0,i.kt)("inlineCode",{parentName:"li"},"Context")," and a custom interface"),(0,i.kt)("li",{parentName:"ul"},"Modify all service methods to accept a ",(0,i.kt)("inlineCode",{parentName:"li"},"Context")),(0,i.kt)("li",{parentName:"ul"},"Do nothing")),(0,i.kt)("h2",{id:"decision-outcome"},"Decision Outcome"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Chosen Alternative: Modify all service methods to accept a custom interface")),(0,i.kt)("h2",{id:"pros-and-cons-of-the-alternatives"},"Pros and Cons of the Alternatives"),(0,i.kt)("h3",{id:"modify-all-service-methods-to-accept-a-custom-interface"},"Modify all service methods to accept a custom interface"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," Services can be composed, calling each other and passing\ntransaction connections around if necessary"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," A custom interface provides ease of use and type safety, easy\nextensibility in the future, and mocking if necessary"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," Modifying all service methods means implementers and consumers\ndon't have to think about what the method signature should be. It\nalso ensures all are available in case the implementation changes\nand they are now needed"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," Services that log now can include the per request trace id"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," A single argument is passed"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," For instrumentation, the ",(0,i.kt)("a",{parentName:"li",href:"https://opentelemetry.io/docs/go/getting-started/"},"opentelemetry\napi")," needs a\n",(0,i.kt)("inlineCode",{parentName:"li"},"Context")," and we can easily extend the custom interface to include\nthat."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"=")," Go best practice is a bit\n",(0,i.kt)("a",{parentName:"li",href:"https://github.com/golang/go/issues/22602"},"unclear")," on whether it\nis okay to include a ",(0,i.kt)("inlineCode",{parentName:"li"},"Context")," in a struct that is used as an argument\nto an API. It seems like including a ",(0,i.kt)("inlineCode",{parentName:"li"},"Context")," is pretty reasonable\nfor APIs that are only used internal to the project.")),(0,i.kt)("h3",{id:"modify-all-service-methods-to-accept-both-a-context-and-a-custom-interface"},"Modify all service methods to accept ",(0,i.kt)("em",{parentName:"h3"},"both")," a ",(0,i.kt)("inlineCode",{parentName:"h3"},"Context")," and a custom interface"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," Services can be composed, calling each other and passing\ntransaction connections around if necessary"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," Modifying all service methods means implementers and consumers\ndon't have to think about what the method signature should be. It\nalso ensures the necessary info is available in case the\nimplementation changes and they are now needed"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," Services that log now can include the per request trace id"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," For instrumentation, the ",(0,i.kt)("a",{parentName:"li",href:"https://opentelemetry.io/docs/go/getting-started/"},"opentelemetry\napi")," needs a\ncontext"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," A ",(0,i.kt)("inlineCode",{parentName:"li"},"Context")," does not provide type safety, so passing both\nprovides a ",(0,i.kt)("em",{parentName:"li"},"lot")," more compile time checking."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"-")," Passing two arguments instead of one")),(0,i.kt)("p",null,"The need for the context for instrumentation means we really have to\npass the context around. Passing two arguments is pretty ugly and has\nsome significant negatives for developer experience."),(0,i.kt)("h3",{id:"modify-all-service-methods-to-accept-a-context"},"Modify all service methods to accept a ",(0,i.kt)("inlineCode",{parentName:"h3"},"Context")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," Services can be composed, calling each other and passing\ntransaction connections around if necessary"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," A custom interface provides ease of use and type safety, easy\nextensibility in the future, and mocking if necessary"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," Modifying all service methods means implementers and consumers don't have to\nthink about what the method signature should be. It also ensures all are available in case the implementation changes and\nthey are now needed"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," Services that log now can include the per request trace id"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," For instrumentation, the ",(0,i.kt)("a",{parentName:"li",href:"https://opentelemetry.io/docs/go/getting-started/"},"opentelemetry\napi")," needs a\ncontext"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," A single argument is passed"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"-")," A ",(0,i.kt)("inlineCode",{parentName:"li"},"Context")," does not provide type safety, so there's no way to\nknow at compile time if a ",(0,i.kt)("inlineCode",{parentName:"li"},"Context")," has the required parameters\n(connection, logger). Because this is a massive change (~8000 lines\nchanged), not having compile time safety significantly increases the\nrisk.")),(0,i.kt)("p",null,'The loss of type safety is not worth the "cost" of not including a\n',(0,i.kt)("inlineCode",{parentName:"p"},"Context")," in a custom argument."),(0,i.kt)("h3",{id:"do-nothing"},"Do nothing"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"+")," Makes things no worse"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"-")," Our current approach will almost certainly result in errors when\nmultiple requests are handled simultaneously"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"-")," Our current approach doesn't allow our services to call other\nservices from inside transactions"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"-")," Our current approach doesn't allow for instrumentation or\nlogging per request trace ids.")),(0,i.kt)("p",null,"This option really isn't realistic."))}m.isMDXComponent=!0}}]);