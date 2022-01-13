"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[9400],{3905:function(e,t,a){a.d(t,{Zo:function(){return l},kt:function(){return d}});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=r.createContext({}),c=function(e){var t=r.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},l=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,p=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=c(a),d=n,f=u["".concat(p,".").concat(d)]||u[d]||m[d]||i;return a?r.createElement(f,o(o({ref:t},l),{},{components:a})):r.createElement(f,o({ref:t},l))}));function d(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=u;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var c=2;c<i;c++)o[c]=a[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},39880:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return s},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return l},default:function(){return u}});var r=a(87462),n=a(63366),i=(a(67294),a(3905)),o=["components"],s={sidebar_position:20},p="Zip code to Rate area mappings",c={unversionedId:"backend/guides/zip-code-to-rate-area-mappings",id:"backend/guides/zip-code-to-rate-area-mappings",isDocsHomePage:!1,title:"Zip code to Rate area mappings",description:"The mymove rate engine uses zip code to rate area associations to calculate a number of values related to billing for a move.",source:"@site/docs/backend/guides/zip-code-to-rate-area-mappings.md",sourceDirName:"backend/guides",slug:"/backend/guides/zip-code-to-rate-area-mappings",permalink:"/mymove-docs/docs/backend/guides/zip-code-to-rate-area-mappings",editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/backend/guides/zip-code-to-rate-area-mappings.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_position:20},sidebar:"backendSidebar",previous:{title:"WIP server-side validation",permalink:"/mymove-docs/docs/backend/guides/wip-server-side-validation"},next:{title:"Open Telemetry",permalink:"/mymove-docs/docs/backend/guides/open-telemetry"}},l=[{value:"Zip Code to Rate Area Mappings",id:"zip-code-to-rate-area-mappings-1",children:[]}],m={toc:l};function u(e){var t=e.components,a=(0,n.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"zip-code-to-rate-area-mappings"},"Zip code to Rate area mappings"),(0,i.kt)("p",null,"The mymove rate engine uses zip code to rate area associations to calculate a number of values related to billing for a move."),(0,i.kt)("p",null,"There is no existing, definitive data set of these associations, so mymove has published its own data set as a declaration of the standard being used."),(0,i.kt)("p",null,"This data set will evolve over time, but should be used when"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"A mymove engineer needs to reference mymove's current authoritative data set for zip code to rate area associations."),(0,i.kt)("li",{parentName:"ul"},"A mymove engineer wants to verify if the zip code to rate area associations currently being used by mymove are correct."),(0,i.kt)("li",{parentName:"ul"},"An external party wants to know what zip code to rate area associations mymove is currently using.")),(0,i.kt)("h3",{id:"zip-code-to-rate-area-mappings-1"},"Zip Code to Rate Area Mappings"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("h4",{parentName:"li",id:"zip3-to-rate-area-associations"},(0,i.kt)("a",{parentName:"h4",href:"/transcom/mymove/blob/master/pkg/services/ghcimport/fixtures/tariff400ng_zip3s_fixture.csv",title:"Zip3 to Rate Area Associations"},"Zip3 to Rate Area Mappings")),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Note:")," Some ",(0,i.kt)("inlineCode",{parentName:"li"},"zip3s")," span multiple ",(0,i.kt)("inlineCode",{parentName:"li"},"rate_areas"),". This happens specifically in larger states: CA, TX, and FL. In the case that a ",(0,i.kt)("inlineCode",{parentName:"li"},"zip3")," spans multiple ",(0,i.kt)("inlineCode",{parentName:"li"},"rate_areas"),", the ",(0,i.kt)("inlineCode",{parentName:"li"},"zip3's")," ",(0,i.kt)("inlineCode",{parentName:"li"},"rate_area")," value will be ",(0,i.kt)("inlineCode",{parentName:"li"},"ZIP")," in the data set. A more specific ",(0,i.kt)("inlineCode",{parentName:"li"},"zip5")," will be used to determine the ",(0,i.kt)("inlineCode",{parentName:"li"},"rate_area")," in these cases.")))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("h4",{parentName:"li",id:"zip5-to-rate-area-associations"},(0,i.kt)("a",{parentName:"h4",href:"/transcom/mymove/blob/master/pkg/services/ghcimport/fixtures/tariff400ng_zip5_rate_areas_fixture.csv",title:"Zip5 to Rate Area Associations"},"Zip5 to Rate Area Mappings")))))}u.isMDXComponent=!0}}]);