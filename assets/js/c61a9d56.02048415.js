"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[3807],{3905:function(e,n,t){t.d(n,{Zo:function(){return l},kt:function(){return u}});var a=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function r(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var d=a.createContext({}),c=function(e){var n=a.useContext(d),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},l=function(e){var n=c(e.components);return a.createElement(d.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,d=e.parentName,l=r(e,["components","mdxType","originalType","parentName"]),m=c(t),u=i,N=m["".concat(d,".").concat(u)]||m[u]||p[u]||o;return t?a.createElement(N,s(s({ref:n},l),{},{components:t})):a.createElement(N,s({ref:n},l))}));function u(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,s=new Array(o);s[0]=m;var r={};for(var d in n)hasOwnProperty.call(n,d)&&(r[d]=n[d]);r.originalType=e,r.mdxType="string"==typeof e?e:i,s[1]=r;for(var c=2;c<o;c++)s[c]=t[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},60261:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return r},contentTitle:function(){return d},metadata:function(){return c},toc:function(){return l},default:function(){return m}});var a=t(87462),i=t(63366),o=(t(67294),t(3905)),s=["components"],r={sidebar_position:1},d="Acceptance testing Syncada",c={unversionedId:"backend/testing/acceptance-testing-syncada-edi-invoicing",id:"backend/testing/acceptance-testing-syncada-edi-invoicing",isDocsHomePage:!1,title:"Acceptance testing Syncada",description:"Prerequisites",source:"@site/docs/backend/testing/acceptance-testing-syncada-edi-invoicing.md",sourceDirName:"backend/testing",slug:"/backend/testing/acceptance-testing-syncada-edi-invoicing",permalink:"/mymove-docs/docs/backend/testing/acceptance-testing-syncada-edi-invoicing",editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/backend/testing/acceptance-testing-syncada-edi-invoicing.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"backendSidebar",previous:{title:"MilMove Backend",permalink:"/mymove-docs/docs/backend"},next:{title:"Acceptance testing notifications",permalink:"/mymove-docs/docs/backend/testing/acceptance-testing-notifications"}},l=[{value:"Prerequisites",id:"prerequisites",children:[{value:"Move",id:"move",children:[]},{value:"Orders",id:"orders",children:[]},{value:"Shipment",id:"shipment",children:[]},{value:"Payment Request",id:"payment-request",children:[]}]},{value:"Invoicing Operations",id:"invoicing-operations",children:[{value:"Generate EDI locally",id:"generate-edi-locally",children:[]},{value:"Generate EDI via support API",id:"generate-edi-via-support-api",children:[]},{value:"Update status of Payment Request",id:"update-status-of-payment-request",children:[]},{value:"Generate and send EDI to Syncada",id:"generate-and-send-edi-to-syncada",children:[]}]},{value:"References",id:"references",children:[]}],p={toc:l};function m(e){var n=e.components,t=(0,i.Z)(e,s);return(0,o.kt)("wrapper",(0,a.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"acceptance-testing-syncada"},"Acceptance testing Syncada"),(0,o.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("em",{parentName:"p"},"The following examples use a Move from the devseed data if needed for local\nuse.")))),(0,o.kt)("p",null,"This section will describe the prerequisites for invoicing, that are beyond the scope of documenting here. See the ",(0,o.kt)("a",{parentName:"p",href:"#references"},"References")," section for links that may help in setting these up."),(0,o.kt)("h3",{id:"move"},"Move"),(0,o.kt)("p",null,"A move with at least one shipment approved. Also helpful to have Management or Counsiling fees approved."),(0,o.kt)("h3",{id:"orders"},"Orders"),(0,o.kt)("p",null,"The orders associated with the move must have all the required fields, particularly ",(0,o.kt)("inlineCode",{parentName:"p"},"Department indicator"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"TAC"),", and ",(0,o.kt)("inlineCode",{parentName:"p"},"SAC")," as all 3 are required for EDI Generation."),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("em",{parentName:"p"},"TAC and SAC are large, 255 varchar and text in the database respectively;\nhowever, the EDI can only handle a max of 80 characters for those two fields.")))),(0,o.kt)("h3",{id:"shipment"},"Shipment"),(0,o.kt)("p",null,"A shipment that is approved, with service items that can be priced."),(0,o.kt)("h3",{id:"payment-request"},"Payment Request"),(0,o.kt)("p",null,"A payment request is created for price-able service items. That payment request then needs to be reviewed via the TIO interface and contain at least 1 approved payment service item."),(0,o.kt)("p",null,"Save the following to ",(0,o.kt)("inlineCode",{parentName:"p"},"payload.json"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Save the following JSON to payload.json"',title:'"Save',the:!0,following:!0,JSON:!0,to:!0,'payload.json"':!0},'{\n  "body": {\n    "isFinal": false,\n    "moveTaskOrderID": "9c7b255c-2981-4bf8-839f-61c7458e2b4d",\n    "serviceItems": [\n      {\n        "id": "ca9aeb58-e5a9-44b0-abe8-81d233dbdebf"\n      },\n      {\n        "id": "eee4b555-2475-4e67-a5b8-102f28d950f8"\n      },\n      {\n        "id": "6431e3e2-4ee4-41b5-b226-393f9133eb6c"\n      },\n      {\n        "id": "fd6741a5-a92c-44d5-8303-1d7f5e60afbf"\n      }\n    ]\n  }\n}\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh",metastring:'title="Run this command"',title:'"Run',this:!0,'command"':!0},"prime-api-client --insecure create-payment-request --filename payload.json | jq '.id,.paymentRequestNumber'\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh",metastring:'title="Previous command output"',title:'"Previous',command:!0,'output"':!0},'"ce261508-1bd3-4876-b5ca-fb761de43d4d"\n"5405-6058-1"\n')),(0,o.kt)("h2",{id:"invoicing-operations"},"Invoicing Operations"),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("em",{parentName:"p"},"The following examples use a Move from the devseed data if needed for local use.")))),(0,o.kt)("h3",{id:"generate-edi-locally"},"Generate EDI locally"),(0,o.kt)("p",null,"You will need the payment request number that you can find in the fetch-mto-updates call"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh",metastring:'title="Run this command"',title:'"Run',this:!0,'command"':!0},"bin/generate-payment-request-edi --payment-request-number 5405-6058-1\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh",metastring:'title="Previous command output"',title:'"Previous',command:!0,'output"':!0},"ISA*00*0084182369*00*0000000000*ZZ*MILMOVE        *12*8004171844     *210116*0827*U*00401*533069921*0*T*|\nGS*SI*MILMOVE*8004171844*20210116*0827*100001251*X*004010\nST*858*0001\nBX*00*J*PP*5405-6058*TRUS**4\nN9*CN*5405-6058-1**\nN9*CT*TRUSS_TEST**\nN9*1W*Leo, Spacemen**\nN9*ML*E_1**\nN9*3L*ARMY**\nG62*10*20210115**\nG62*76*20210114**\nG62*86*20200316**\nN1*BY*JPPSO Testy McTest*92*LKNQ\nN1*SE*Prime*2*PRME\nN1*ST*Fort Gordon*10*CNNQ\nN3*Fort Gordon*\nN4*Augusta*GA*30813*USA**\nPER*CN**TE*706-791-4184\nN1*SF*umRSlGJ7mP*10*LKNQ\nN3*987 Other Avenue*P.O. Box 1234\nN4*Des Moines*IA*50309*USA**\nPER*CN**TE*(510) 555-5555\nHL*1**I\nN9*PO*5405-6058-a492e26c**\nL5*1*FSC*TBD*D**\nL0*1*354.000*DM*1349.000*B******L\nL1*1*1349*LB*34400\nFA1*DY\nFA2*TA*F8E1\nHL*2**I\nN9*PO*5405-6058-740cb8c2**\nL5*2*CS*TBD*D**\nL0*2**********\nL1*2*0**2235300\nFA1*DY\nFA2*TA*F8E1\nHL*3**I\nN9*PO*5405-6058-1044cdb9**\nL5*3*DSH*TBD*D**\nL0*3*388.000*DM*1349.000*B******L\nL1*3*1349*LB*47543300\nFA1*DY\nFA2*TA*F8E1\nHL*4**I\nN9*PO*5405-6058-6233632d**\nL5*4*DLH*TBD*D**\nL0*4*354.000*DM*1349.000*B******L\nL1*4*1349*LB*115948500\nFA1*DY\nFA2*TA*F8E1\nL3*****1657615\nSE*50*0001\nGE*1*100001251\nIEA*1*533069921\n")),(0,o.kt)("h3",{id:"generate-edi-via-support-api"},"Generate EDI via support API"),(0,o.kt)("p",null,"Save the following to ",(0,o.kt)("inlineCode",{parentName:"p"},"payload.json")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Save the following JSON to payload.json"',title:'"Save',the:!0,following:!0,JSON:!0,to:!0,'payload.json"':!0},'{\n  "paymentRequestID": "ce261508-1bd3-4876-b5ca-fb761de43d4d"\n}\n')),(0,o.kt)("p",null,"Use the Support API endpoint to generate the EDI"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh",metastring:'title="Run this command"',title:'"Run',this:!0,'command"':!0},"bin/prime-api-client --insecure support-get-payment-request-edi --filename payload.json | jq -r .edi\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh",metastring:'title="Previous command output"',title:'"Previous',command:!0,'output"':!0},"ISA*00*0084182369*00*0000000000*ZZ*MILMOVE        *12*8004171844     *210116*0834*U*00401*000000002*0*T*|\nGS*SI*MILMOVE*8004171844*20210116*0834*100001251*X*004010\nST*858*0001\nBX*00*J*PP*5405-6058*TRUS**4\nN9*CN*5405-6058-1**\nN9*CT*TRUSS_TEST**\nN9*1W*Leo, Spacemen**\nN9*ML*E_1**\nN9*3L*ARMY**\nG62*10*20210115**\nG62*76*20210114**\nG62*86*20200316**\nN1*BY*JPPSO Testy McTest*92*LKNQ\nN1*SE*Prime*2*PRME\nN1*ST*Fort Gordon*10*CNNQ\nN3*Fort Gordon*\nN4*Augusta*GA*30813*USA**\nPER*CN**TE*706-791-4184\nN1*SF*umRSlGJ7mP*10*LKNQ\nN3*987 Other Avenue*P.O. Box 1234\nN4*Des Moines*IA*50309*USA**\nPER*CN**TE*(510) 555-5555\nHL*1**I\nN9*PO*5405-6058-a492e26c**\nL5*1*FSC*TBD*D**\nL0*1*354.000*DM*1349.000*B******L\nL1*1*1349*LB*34400\nFA1*DY\nFA2*TA*F8E1\nHL*2**I\nN9*PO*5405-6058-740cb8c2**\nL5*2*CS*TBD*D**\nL0*2**********\nL1*2*0**2235300\nFA1*DY\nFA2*TA*F8E1\nHL*3**I\nN9*PO*5405-6058-1044cdb9**\nL5*3*DSH*TBD*D**\nL0*3*388.000*DM*1349.000*B******L\nL1*3*1349*LB*47543300\nFA1*DY\nFA2*TA*F8E1\nHL*4**I\nN9*PO*5405-6058-6233632d**\nL5*4*DLH*TBD*D**\nL0*4*354.000*DM*1349.000*B******L\nL1*4*1349*LB*115948500\nFA1*DY\nFA2*TA*F8E1\nL3*****1657615\nSE*50*0001\nGE*1*100001251\nIEA*1*000000002\n")),(0,o.kt)("h3",{id:"update-status-of-payment-request"},"Update status of Payment Request"),(0,o.kt)("p",null,"To update the status of one payment request you can trigger the reviewed payment request processor."),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("em",{parentName:"p"},"The payment request processor will only apply changes to payment requests in\nthe Reviewed status")))),(0,o.kt)("p",null,"Save one of the below JSON snippets to ",(0,o.kt)("inlineCode",{parentName:"p"},"payload.json")," and run the following command to change the status"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh",metastring:'title="Run this command"',title:'"Run',this:!0,'command"':!0},"prime-api-client --insecure support-reviewed-payment-requests --filename tmp/payloads/process_payment.json|jq .\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Example of previous command output"',title:'"Example',of:!0,previous:!0,command:!0,'output"':!0},'[\n  {\n    "eTag": "MjAyMS0wMS0xNlQwODo0Nzo1Ni41NDczMjRa",\n    "id": "cfd110d4-1f62-401c-a92c-39987a0b4228",\n    "isFinal": false,\n    "moveTaskOrderID": "7cbe57ba-fd3a-45a7-aa9a-1970f1908ae7",\n    "paymentRequestNumber": "2387-4783-1",\n    "status": "SENT_TO_GEX"\n  },\n  {\n    "eTag": "MjAyMS0wMS0xNlQwODo0Nzo1Ni41NTI4Nlo=",\n    "id": "cfd110d4-1f62-401c-a92c-39987a0b4229",\n    "isFinal": false,\n    "moveTaskOrderID": "7cbe57ba-fd3a-45a7-aa9a-1970f1908ae8",\n    "paymentRequestNumber": "9644-7573-1",\n    "status": "SENT_TO_GEX"\n  },\n  {\n    "eTag": "MjAyMS0wMS0xNlQwODo0Nzo1Ni41NTU5NjZa",\n    "id": "ce261508-1bd3-4876-b5ca-fb761de43d4d",\n    "sFinal": false,\n    "moveTaskOrderID": "9c7b255c-2981-4bf8-839f-61c7458e2b4d",\n    "paymentRequestNumber": "5405-6058-1",\n    "status": "SENT_TO_GEX"\n  }\n]\n')),(0,o.kt)("p",null,"Below are 3 examples of the status update JSON"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="JSON to update status of all reviewed paymentrequests to SENT_TO_GEX"',title:'"JSON',to:!0,update:!0,status:!0,of:!0,all:!0,reviewed:!0,paymentrequests:!0,'SENT_TO_GEX"':!0},'{\n  "body": {\n    "sendToSyncada": false\n  }\n}\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="JSON to update status of all reviewed paymentrequests to another one"',title:'"JSON',to:!0,update:!0,status:!0,of:!0,all:!0,reviewed:!0,paymentrequests:!0,another:!0,'one"':!0},'{\n  "body": {\n    "status": "PAID",\n    "sendToSyncada": false\n  }\n}\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="JSON to update status of one reviewed paymentrequest to SENT_TO_GEX"',title:'"JSON',to:!0,update:!0,status:!0,of:!0,one:!0,reviewed:!0,paymentrequest:!0,'SENT_TO_GEX"':!0},'{\n  "body": {\n    "paymentRequestID": "ce261508-1bd3-4876-b5ca-fb761de43d4d",\n    "sendToSyncada": false\n  }\n}\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="JSON to update status of one reviewed paymentrequest to something else"',title:'"JSON',to:!0,update:!0,status:!0,of:!0,one:!0,reviewed:!0,paymentrequest:!0,something:!0,'else"':!0},'{\n  "body": {\n    "paymentRequestID": "ce261508-1bd3-4876-b5ca-fb761de43d4d",\n    "status": "PAID",\n    "sendToSyncada": false\n  }\n}\n')),(0,o.kt)("h3",{id:"generate-and-send-edi-to-syncada"},"Generate and send EDI to Syncada"),(0,o.kt)("p",null,"To send to Syncada you will need to make use of the reviewed payment request processor"),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("em",{parentName:"p"},"The payment request processor will only apply changes to payment requests in\nthe Reviewed status")))),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("em",{parentName:"p"},"This can be run locally if you have the SYNCADA credentials from Chamber")))),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("em",{parentName:"p"},"The ",(0,o.kt)("inlineCode",{parentName:"em"},"paymentRequestID")," parameter is ignored if ",(0,o.kt)("inlineCode",{parentName:"em"},"sendToSyncada")," is set to true")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Save the following JSON to payload.json"',title:'"Save',the:!0,following:!0,JSON:!0,to:!0,'payload.json"':!0},'{\n  "body": {\n    "sendToSyncada": true\n  }\n}\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh",metastring:'title="Run this command"',title:'"Run',this:!0,'command"':!0},"prime-api-client --insecure support-reviewed-payment-requests --filename payload.json | jq .\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="Example of previous command output"',title:'"Example',of:!0,previous:!0,command:!0,'output"':!0},'[\n  {\n    "eTag": "MjAyMS0wMS0xNlQwODo0Nzo1Ni41NDczMjRa",\n    "id": "cfd110d4-1f62-401c-a92c-39987a0b4228",\n    "isFinal": false,\n    "moveTaskOrderID": "7cbe57ba-fd3a-45a7-aa9a-1970f1908ae7",\n    "paymentRequestNumber": "2387-4783-1",\n    "status": "SENT_TO_GEX"\n  },\n  {\n    "eTag": "MjAyMS0wMS0xNlQwODo0Nzo1Ni41NTI4Nlo=",\n    "id": "cfd110d4-1f62-401c-a92c-39987a0b4229",\n    "isFinal": false,\n    "moveTaskOrderID": "7cbe57ba-fd3a-45a7-aa9a-1970f1908ae8",\n    "paymentRequestNumber": "9644-7573-1",\n    "status": "SENT_TO_GEX"\n  },\n  {\n    "eTag": "MjAyMS0wMS0xNlQwODo0Nzo1Ni41NTU5NjZa",\n    "id": "ce261508-1bd3-4876-b5ca-fb761de43d4d",\n    "sFinal": false,\n    "moveTaskOrderID": "9c7b255c-2981-4bf8-839f-61c7458e2b4d",\n    "paymentRequestNumber": "5405-6058-1",\n    "status": "SENT_TO_GEX"\n  }\n]\n')),(0,o.kt)("h2",{id:"references"},"References"),(0,o.kt)("p",null,"Some helpful resources for getting this setup"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"Acceptance-Testing-Payment-Requests.md"},"Acceptance Testing Payment Requests")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"Manually-run-Prime-API-for-Slice-demo.md"},"Manually run Prime API for Slice demo"))))}m.isMDXComponent=!0}}]);