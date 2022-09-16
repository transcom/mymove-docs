"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[9059],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var i=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,i,n=function(e,t){if(null==e)return{};var r,i,n={},o=Object.keys(e);for(i=0;i<o.length;i++)r=o[i],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)r=o[i],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=i.createContext({}),d=function(e){var t=i.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},u=function(e){var t=d(e.components);return i.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},p=i.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=d(r),m=n,f=p["".concat(l,".").concat(m)]||p[m]||c[m]||o;return r?i.createElement(f,a(a({ref:t},u),{},{components:r})):i.createElement(f,a({ref:t},u))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,a=new Array(o);a[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:n,a[1]=s;for(var d=2;d<o;d++)a[d]=r[d];return i.createElement.apply(null,a)}return i.createElement.apply(null,r)}p.displayName="MDXCreateElement"},10324:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>d});var i=r(87462),n=(r(67294),r(3905));const o={title:"0050 Fork & maintain react-file-viewer under @trussworks"},a="Fork & maintain react-file-viewer under @trussworks",s={unversionedId:"adrs/doc-viewer-fork",id:"adrs/doc-viewer-fork",title:"0050 Fork & maintain react-file-viewer under @trussworks",description:"User Story: MB-2346 Orders Document viewer (PDF)",source:"@site/docs/adrs/0050-doc-viewer-fork.md",sourceDirName:"adrs",slug:"/adrs/doc-viewer-fork",permalink:"/mymove-docs/docs/adrs/doc-viewer-fork",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/adrs/0050-doc-viewer-fork.md",tags:[],version:"current",sidebarPosition:50,frontMatter:{title:"0050 Fork & maintain react-file-viewer under @trussworks"},sidebar:"adrsSidebar",previous:{title:"0049 Do not update child records using parent's E-tag",permalink:"/mymove-docs/docs/adrs/etag-for-child-updates"},next:{title:"0051 Use only Swagger supported formats for dates",permalink:"/mymove-docs/docs/adrs/swagger-date-formats"}},l={},d=[{value:"Considered Alternatives",id:"considered-alternatives",level:2},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"Pros and Cons of the Alternatives",id:"pros-and-cons-of-the-alternatives",level:2},{value:"Fork react-file-viewer and open PRs for improvements back to the original repo",id:"fork-react-file-viewer-and-open-prs-for-improvements-back-to-the-original-repo",level:3},{value:"Copy and paste the react-file-viewer source code directly into MilMove",id:"copy-and-paste-the-react-file-viewer-source-code-directly-into-milmove",level:3},{value:"Build our own document viewer from scratch",id:"build-our-own-document-viewer-from-scratch",level:3}],u={toc:d};function c(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,i.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"fork--maintain-react-file-viewer-under-trussworks"},"Fork & maintain react-file-viewer under @trussworks"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"User Story:")," ",(0,n.kt)("a",{parentName:"p",href:"https://dp3.atlassian.net/browse/MB-2346"},"MB-2346 Orders Document viewer (PDF)")),(0,n.kt)("p",null,"The goal of this story is to build out a new document viewer component that implements the custom UI that has been designed, and improves user experience for viewing uploaded PDFs and images over the existing solution (which relies on the native browser PDF viewer)."),(0,n.kt)("p",null,"Fortunately we've found an existing ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/plangrid/react-file-viewer"},"file viewer library for React")," that is open source, supports many different file types, and has a well-structured and easy-to-understand source code."),(0,n.kt)("p",null,"Unfortunately, using this library out of the box is not ideal for a few reasons:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"There is no way to customize the HTML markup used for PDF controls (zoom) which is needed, not just to customize the styling but also to make sure we're meeting a11y standards"),(0,n.kt)("li",{parentName:"ul"},"There are no existing rotation controls and no way to add them without editing the source code"),(0,n.kt)("li",{parentName:"ul"},"The library does not appear to be actively maintained, the last release being September 27, 2017")),(0,n.kt)("p",null,"It's my opinion that it would be beneficial for Truss in general to have a go-to library for displaying embedded binary files in React apps. Thankfully, using this library as a starting point gives us a solid foundation to extend and build off, and I don't believe will require a significant amount of overhead for completing the related stories. My suggestion is for us to fork the library under the @trussworks Github org, publish it to npm as @trussworks/react-file-viewer, and maintain it as open source, while expanding on it with features needed for MilMove\u2019s implementation but keeping it abstract enough for other applications as well."),(0,n.kt)("h2",{id:"considered-alternatives"},"Considered Alternatives"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Fork & maintain react-file-viewer under @trussworks"),(0,n.kt)("li",{parentName:"ul"},"Fork react-file-viewer and open PRs for improvements back to the original repo"),(0,n.kt)("li",{parentName:"ul"},"Copy and paste the react-file-viewer source code directly into MilMove"),(0,n.kt)("li",{parentName:"ul"},"Build our own document viewer from scratch")),(0,n.kt)("h2",{id:"decision-outcome"},"Decision Outcome"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Chosen Alternative: Fork & maintain react-file-viewer under @trussworks"),(0,n.kt)("li",{parentName:"ul"},"With this option, we can immediately start editing & using the library to meet the requirements of MilMove, but also continue to maintain it for other future Truss projects as well."),(0,n.kt)("li",{parentName:"ul"},"This means that Truss will have another JavaScript open source library to maintain, which does mean some overhead internally. However I think this is a beneficial area for us to develop more experience in, and establishes further practices around sharing common frontend code.")),(0,n.kt)("h2",{id:"pros-and-cons-of-the-alternatives"},"Pros and Cons of the Alternatives"),(0,n.kt)("h3",{id:"fork-react-file-viewer-and-open-prs-for-improvements-back-to-the-original-repo"},"Fork react-file-viewer and open PRs for improvements back to the original repo"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"+")," Truss takes no ownership of the library and doesn't have to maintain it or take responsibility for publishing future releases"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"+")," We might benefit from other contributions from the existing userbase if others also take this approach"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"-")," The Github repo shows little to no activity by maintainers since fall of 2019, and this could indicate they are no longer interested in maintaining it."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"-")," We have less autonomy to take the library in a different direction (such as if we wanted to convert it to TypeScript)")),(0,n.kt)("h3",{id:"copy-and-paste-the-react-file-viewer-source-code-directly-into-milmove"},"Copy and paste the react-file-viewer source code directly into MilMove"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"+")," This is the most direct and (maybe) fastest way to get document viewer code into MilMove's codebase"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"+")," We can edit the source code specifically for MilMove's needs without worrying about keeping it extensible"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"-")," The existing code was built under a different environment (i.e., with different webpack config, different lint rules, different dependencies) and some number of adjustments would be required to consolidate that"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"-")," We would not immediately get the benefits of a shared library for other Truss projects that might need similar functionality")),(0,n.kt)("h3",{id:"build-our-own-document-viewer-from-scratch"},"Build our own document viewer from scratch"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"+")," We could use react-file-viewer as inspiration but write our own code directly in MilMove"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"-")," This would probably be the most time consuming option, to set up everything from scratch in the MilMove code environment"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"-")," We would not get the benefits of a shared library for other Truss projects that might need similar functionality")))}c.isMDXComponent=!0}}]);