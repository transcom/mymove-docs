"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[5162],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(n),d=r,h=m["".concat(s,".").concat(d)]||m[d]||u[d]||i;return n?a.createElement(h,o(o({ref:t},c),{},{components:n})):a.createElement(h,o({ref:t},c))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},92591:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return c},default:function(){return m}});var a=n(87462),r=n(63366),i=(n(67294),n(3905)),o=["components"],l={sidebar_position:7},s="How to run the GHC Transit Time Import and Verify Data",p={unversionedId:"backend/guides/ghc/ghc-transit-time-import",id:"backend/guides/ghc/ghc-transit-time-import",isDocsHomePage:!1,title:"How to run the GHC Transit Time Import and Verify Data",description:"To support loading GHC Transit Time data you can use the bin/ghc-transit-time-parser to do so.",source:"@site/docs/backend/guides/ghc/ghc-transit-time-import.md",sourceDirName:"backend/guides/ghc",slug:"/backend/guides/ghc/ghc-transit-time-import",permalink:"/mymove-docs/docs/backend/guides/ghc/ghc-transit-time-import",editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/backend/guides/ghc/ghc-transit-time-import.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"backendSidebar",previous:{title:"How to run the GHC Pricing Import and Verify Data",permalink:"/mymove-docs/docs/backend/guides/ghc/ghc-pricing-import"},next:{title:"How data will be imported into production",permalink:"/mymove-docs/docs/backend/guides/ghc/ghc-import-pricing-production"}},c=[{value:"Running the parser",id:"running-the-parser",children:[]},{value:"Verifying the data",id:"verifying-the-data",children:[{value:"1. Make sure csv data matches expectation",id:"1-make-sure-csv-data-matches-expectation",children:[]}]},{value:"Useful Command Options",id:"useful-command-options",children:[]}],u={toc:c};function m(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"how-to-run-the-ghc-transit-time-import-and-verify-data"},"How to run the GHC Transit Time Import and Verify Data"),(0,i.kt)("p",null,"To support loading GHC Transit Time data you can use the ",(0,i.kt)("inlineCode",{parentName:"p"},"bin/ghc-transit-time-parser")," to do so."),(0,i.kt)("h2",{id:"running-the-parser"},"Running the parser"),(0,i.kt)("p",null,"You will need to build the parser first."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"make bin/ghc-transit-time-parser\n")),(0,i.kt)("p",null,"Once built you can run the command."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"bin/ghc-transit-time-parser --display --filename [path to your file]/Appendix_C\\(i\\)_-_Transit_Time_Tables.xlsx\n")),(0,i.kt)("p",null,"Once complete move on to the next section to verify the import"),(0,i.kt)("h2",{id:"verifying-the-data"},"Verifying the data"),(0,i.kt)("p",null,"The script will output the transit time table model."),(0,i.kt)("p",null,"To do the verification, open the newly created csv file located in the directory where the parser was ran."),(0,i.kt)("h3",{id:"1-make-sure-csv-data-matches-expectation"},"1. Make sure csv data matches expectation"),(0,i.kt)("p",null,"The pricing parser will output the csv file, compare this to the data in the spreadsheet. For example the csv data is found in the pricing template sheet ",(0,i.kt)("inlineCode",{parentName:"p"},"domestic"),"."),(0,i.kt)("p",null,"Once you find the main source of the information you can verify that the number of rows reported in the summary is the same as the number of rows in the matching table."),(0,i.kt)("p",null,"Pricing parser output example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},'2020-03-18T02:59:31.535Z        INFO    transittime/parse_transit_times.go:69           {"DomesticTransitTime": {"ID":"493fae77-e55c-4d9d-aa3a-1641558e8a2b","MaxDaysTransitTime":32,"WeightLbsLower":8000,"WeightLbsUpper":0,"DistanceMilesLower":6751,"DistanceMilesUpper":7000}}\n2020/03/18 02:59:31 File created:\n2020/03/18 02:59:31 1_hhg_domestic_transit_times_domestic_20200318025931.csv\n2020/03/18 02:59:31 Completed processing sheet index 1 with Description HHG Domestic Transit Times\n')),(0,i.kt)("h2",{id:"useful-command-options"},"Useful Command Options"),(0,i.kt)("p",null,"You can run the parser with the ",(0,i.kt)("inlineCode",{parentName:"p"},"--help")," flag to see all possible options. Below is a selection of the most commonly needed flags:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"--filename string")," ",(0,i.kt)("strong",{parentName:"li"},"Required"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Filename (including path) of the XLSX to parse for the GHC transit time data import"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"--save-csv"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Save output of XLSX sheets to CSV file (default true)"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"--display"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Display output of parsed info (default false)"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"--db-env string"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},'Database environment: container, test, development (default "development")'))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"--db-name string"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},'Database name (default "dev_db")'))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"--db-host string"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},'Database hostname (default "localhost")'))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"--db-port int"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Database port (default 5432)"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"--db-user string"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},'Database username (default "postgres")'))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"--db-password string"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Database password")))))}m.isMDXComponent=!0}}]);