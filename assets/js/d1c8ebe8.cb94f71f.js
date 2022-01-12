"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[9361],{3905:function(e,t,o){o.d(t,{Zo:function(){return p},kt:function(){return u}});var r=o(67294);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function s(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var l=r.createContext({}),c=function(e){var t=r.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):s(s({},t),e)),o},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=c(o),u=n,h=m["".concat(l,".").concat(u)]||m[u]||d[u]||a;return o?r.createElement(h,s(s({ref:t},p),{},{components:o})):r.createElement(h,s({ref:t},p))}));function u(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,s=new Array(a);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,s[1]=i;for(var c=2;c<a;c++)s[c]=o[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,o)}m.displayName="MDXCreateElement"},79487:function(e,t,o){o.r(t),o.d(t,{frontMatter:function(){return i},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return m}});var r=o(87462),n=o(63366),a=(o(67294),o(3905)),s=["components"],i={},l="How to Upload Electronic Orders Using your CAC",c={unversionedId:"dev/tools/CAC/upload-electronic-orders",id:"dev/tools/CAC/upload-electronic-orders",isDocsHomePage:!1,title:"How to Upload Electronic Orders Using your CAC",description:"Requirements",source:"@site/docs/dev/tools/CAC/upload-electronic-orders.md",sourceDirName:"dev/tools/CAC",slug:"/dev/tools/CAC/upload-electronic-orders",permalink:"/mymove-docs/docs/dev/tools/CAC/upload-electronic-orders",editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/dev/tools/CAC/upload-electronic-orders.md",tags:[],version:"current",frontMatter:{},sidebar:"devSidebar",previous:{title:"Using-your-CAC-in-Browsers-on-MacOS",permalink:"/mymove-docs/docs/dev/tools/CAC/Using-your-CAC-in-Browsers-on-MacOS"},next:{title:"How to Create CAC Access (for using Prime API and uploading Electronic Orders)",permalink:"/mymove-docs/docs/dev/tools/CAC/use-mtls-with-cac"}},p=[{value:"Requirements",id:"requirements",children:[]},{value:"Uploading Electronic Orders Locally with transcom/milmove_orders",id:"uploading-electronic-orders-locally-with-transcommilmove_orders",children:[]},{value:"Uploading Electronic Orders Locally with transcom/nom",id:"uploading-electronic-orders-locally-with-transcomnom",children:[]},{value:"Note on IWS RBS for EDIPI/SSN conversion",id:"note-on-iws-rbs-for-edipissn-conversion",children:[{value:"Updating the Sample CSV for transcom/nom",id:"updating-the-sample-csv-for-transcomnom",children:[]}]}],d={toc:p};function m(e){var t=e.components,o=(0,n.Z)(e,s);return(0,a.kt)("wrapper",(0,r.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"how-to-upload-electronic-orders-using-your-cac"},"How to Upload Electronic Orders Using your CAC"),(0,a.kt)("h2",{id:"requirements"},"Requirements"),(0,a.kt)("p",null,"You must first read the article on ",(0,a.kt)("a",{parentName:"p",href:"/mymove-docs/docs/dev/tools/CAC/use-mtls-with-cac"},"How to Use mTLS with CAC"),"."),(0,a.kt)("h2",{id:"uploading-electronic-orders-locally-with-transcommilmove_orders"},"Uploading Electronic Orders Locally with ",(0,a.kt)("a",{parentName:"h2",href:"https://github.com/transcom/milmove_orders/"},"transcom/milmove_orders")),(0,a.kt)("p",null,"Use the transcom/milmove_orders repo with ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/transcom/milmove_orders/blob/master/testdata/nom_demo_20190404.csv"},"sample navy orders data"),". "),(0,a.kt)("p",null,"Then run:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"direnv allow\nmake bin/orders-api-client\n")),(0,a.kt)("p",null,"Run the mymove server at ",(0,a.kt)("inlineCode",{parentName:"p"},"https://github.com/transcom/mymove"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"make server_run\n")),(0,a.kt)("p",null,"Then run this command:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"orders-api-client --cac --hostname orderslocal --port 9443 --insecure post-revisions --issuer navy --csv-file testdata/nom_demo_20190404.csv\n")),(0,a.kt)("h2",{id:"uploading-electronic-orders-locally-with-transcomnom"},"Uploading Electronic Orders Locally with ",(0,a.kt)("a",{parentName:"h2",href:"https://github.com/transcom/nom/"},"transcom/nom")),(0,a.kt)("p",null,"Use the transcom/nom repo with ",(0,a.kt)("a",{parentName:"p",href:"https://drive.google.com/drive/folders/1dxOO9uXSOWfjQiKMzwX3bmRqBJfBLldi"},"sample navy orders data"),". "),(0,a.kt)("p",null,"Then run:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"direnv allow\nmake server_run\n")),(0,a.kt)("p",null,"To continue you need to get the Token from the CAC with a script in transcom/mymove (Becomes ",(0,a.kt)("inlineCode",{parentName:"p"},"ENTERYOURTOKEN")," in following step):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"cac-extract-token-label\n")),(0,a.kt)("p",null,"Now over in your git checkout of the transcom/nom repo. Then download the ",(0,a.kt)("a",{parentName:"p",href:"https://drive.google.com/open?id=1-zxetfRhLEpnx1SBTAveoTLpwEzp3fK-"},"sample csv")," into the repo. And run these commands (",(0,a.kt)("strong",{parentName:"p"},"NOTE:")," you will need your CAC personal PIN to do this operation):"),(0,a.kt)("p",null,"For MacOS 10.14 and earlier:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},'make bin/nom\nTOKEN="ENTERYOURTOKEN"\nMODULE="/usr/local/lib/pkcs11/cackey.dylib"\nbin/nom -host orderslocal -port 9443 -insecure -pkcs11module "${MODULE}" -certlabel "Identity #0" -keylabel "Identity #0" --tokenlabel "${TOKEN}" nom_demo_20190404.csv\nPIN: ********\n')),(0,a.kt)("p",null,"For MacOS 10.15 and later"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},'make bin/nom\nTOKEN="ENTERYOURTOKEN"\nMODULE="/usr/local/lib/pkcs11/opensc-pkcs11.so"\nbin/nom -host orderslocal -port 9443 -insecure -pkcs11module "${MODULE}" nom_demo_20190404.csv\nPIN: ********\n')),(0,a.kt)("h2",{id:"note-on-iws-rbs-for-edipissn-conversion"},"Note on IWS RBS for EDIPI/SSN conversion"),(0,a.kt)("p",null,"It's important that the SSNs match the ones in the DMDC Contractor Test database. You can see the ",(0,a.kt)("a",{parentName:"p",href:"https://drive.google.com/file/d/1vfxEaC6cadFtMlTGFZsy95P52poKLaXA/view"},"set of contractor test SSN's"),". However, if you don't want to connect to DMDC's IWS RBS service you can turn off IWS on the devlocal server by setting this env var (which is the default in the ",(0,a.kt)("inlineCode",{parentName:"p"},".envrc"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"export IWS_RBS_ENABLED=0\n")),(0,a.kt)("p",null,"Otherwise set:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},'export IWS_RBS_ENABLED=1\nexport IWS_RBS_HOST="pkict.dmdc.osd.mil"\n')),(0,a.kt)("h3",{id:"updating-the-sample-csv-for-transcomnom"},"Updating the Sample CSV for transcom/nom"),(0,a.kt)("p",null,"The data in transcom/nom ",(0,a.kt)("inlineCode",{parentName:"p"},"sample.csv")," is generated from data in the fake records hosted by the DMDC. Copies of\nthe fake data exist in CSV/Excel files in the ",(0,a.kt)("a",{parentName:"p",href:"https://drive.google.com/drive/folders/16k7eG4j5vSBQIX_eTWnoXqiae1T0ysiq"},"USTC MilMove -> Integrations -> Identity Web Services -> Developer Samples")," folder. The latest set of data is ",(0,a.kt)("a",{parentName:"p",href:"https://drive.google.com/drive/folders/16k7eG4j5vSBQIX_eTWnoXqiae1T0ysiq"},"Cust2675_TRANSCOM_20190823_Demo2"),". If you need to update\nthis data you will need to contact DMDC as they refresh the data from time to time."),(0,a.kt)("p",null,"Tip: If you want to skip the DMDC lookup by providing fake SSNs in the spreadsheet you can put 10 digit numbers (starting with any digit other than 0) instead of 9 digit numbers in the SSN column in the CSV. It's still worthwhile to test the whole pipeline, obviously, but sometimes the DMDC part is more trouble than it's worth."))}m.isMDXComponent=!0}}]);