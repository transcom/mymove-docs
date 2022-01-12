"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[9036],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return h}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=u(n),h=o,m=d["".concat(s,".").concat(h)]||d[h]||p[h]||a;return n?r.createElement(m,i(i({ref:t},c),{},{components:n})):r.createElement(m,i({ref:t},c))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var u=2;u<a;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},70775:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return c},default:function(){return d}});var r=n(87462),o=n(63366),a=(n(67294),n(3905)),i=["components"],l={},s=void 0,u={unversionedId:"help/Troubleshoot-CAC-Reader-Issues",id:"help/Troubleshoot-CAC-Reader-Issues",isDocsHomePage:!1,title:"Troubleshoot-CAC-Reader-Issues",description:"Here are some potential CAC reader errors and their solutions.",source:"@site/docs/help/Troubleshoot-CAC-Reader-Issues.md",sourceDirName:"help",slug:"/help/Troubleshoot-CAC-Reader-Issues",permalink:"/mymove-docs/docs/help/Troubleshoot-CAC-Reader-Issues",editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/help/Troubleshoot-CAC-Reader-Issues.md",tags:[],version:"current",frontMatter:{},sidebar:"helpSidebar",previous:{title:"Go Resources",permalink:"/mymove-docs/docs/help/index"}},c=[],p={toc:c};function d(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Here are some potential CAC reader errors and their solutions."),(0,a.kt)("h1",{id:"cac-errors"},"CAC Errors"),(0,a.kt)("h1",{id:"1-no-matching-slot-found"},"1. No matching slot found"),(0,a.kt)("p",null,"   When running a client like ",(0,a.kt)("inlineCode",{parentName:"p"},"prime-api-client")," you may get an error as follows"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"2020/08/21 21:26:09 No matching slot found\nexit status 1\n")),(0,a.kt)("p",null,"   This means the script cannot find your card. Check that your card reader and card are properly plugged in. You can run this tool to see what is plugged in."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},">  pkcs11-tool --list-token-slots\nAvailable slots:\nNo slots.\n")),(0,a.kt)("p",null,"   If your card IS plugged in, you should see"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},">  pkcs11-tool --list-token-slots\nAvailable slots:\nSlot 0 (0x0): Generic Smart Card Reader Interface\n   token label        : LASTNAME.FIRSTNAME.MIDDLE.NUM...\n   token manufacturer : piv_II\n   token model        : PKCS#15 emulated\n   token flags        : login required, token initialized, PIN initialized\n   hardware version   : 0.0\n   firmware version   : 0.0\n   serial num         : hexadecimalserial\n   pin min/max        : 4/8\n")),(0,a.kt)("h1",{id:"2-no-matching-slot-found-when-card-is-plugged-in"},"2. No matching slot found when card IS plugged in"),(0,a.kt)("p",null,"   Sometimes you might see that error even if your card is plugged in.\nThat can happen if you have more than one smartcard-like object plugged in, like a ",(0,a.kt)("strong",{parentName:"p"},"Yubikey"),"."),(0,a.kt)("p",null,"   This may show up as the following error too:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"Ensure CAC reader and card inserted: pkcs11: the token has no such object\n")),(0,a.kt)("p",null,"   That's because the script defaults to picking one of the slots, and gets confused by the Yubikey, instead of checking all of them to find your CAC."),(0,a.kt)("p",null,"   You ",(0,a.kt)("em",{parentName:"p"},"should")," be able to see the Yubikey slot information when you run this tool."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},">  pkcs11-tool --list-token-slots\nSlot 0 (0x0): Generic Smart Card Reader Interface\n   ...\nSlot 1 (0x4): Yubico YubiKey OTP+FIDO+CCID\n   ...\n")),(0,a.kt)("p",null,"   To solve this you can do either of the following"),(0,a.kt)("p",null,"   a) Remove the Yubikey when using the client and your CAC card."),(0,a.kt)("p",null,"   b) Tell the client to select which token to use."),(0,a.kt)("p",null,"   To select the token in the client you use the ",(0,a.kt)("inlineCode",{parentName:"p"},"--token-label")," argument."),(0,a.kt)("p",null,"   The token label is the one listed in your slot info in the format ",(0,a.kt)("inlineCode",{parentName:"p"},"LASTNAME.FIRSTNAME.MIDDLE.NUM...")," and yes, the three periods are included."),(0,a.kt)("p",null,"   So you need to pass that into the client as follows"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"go run ./cmd/prime-api-client --tokenlabel LASTNAME.FIRSTNAME.MIDDLE.NUM... --cac --hostname api.stg.move.mil --port 443 fetch-mto-updates\n")),(0,a.kt)("p",null,"   I just save the above as an alias (minus the fetch-mto-updates) to reuse whenever I need to hit staging."),(0,a.kt)("h1",{id:"3-cannot-sign-adobe-pdf-documents-with-cac"},"3. Cannot sign Adobe PDF documents with CAC"),(0,a.kt)("p",null,"   i. In adobe acrobat, go to Preferences > Signatures > Creation and Appearance > More."),(0,a.kt)("p",null,"   ii. Set default signing to CAdES-Equivalent and make sure CryptoTokenKit support is enabled."),(0,a.kt)("p",null,"   iii. Then (again in Preferences > Signatures Dialog) under Identities and Trusted Certificates > More >PKCS#11 Modules. Choose attach module and put in the path to pkcs."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"  On my computer it was `/usr/local/lib/opensc-pkcs11.so`\n")),(0,a.kt)("p",null,"   iv. Then Refresh, in the left sidebar you should have a new entry called OpenSC smartcard, with your card listed under that. You can then Log in with your PIN."),(0,a.kt)("h1",{id:"4-using-the-prime-api-client-results-in-a-cert-authority-error"},"4. Using the prime-api-client results in a cert authority error"),(0,a.kt)("p",null,"If you are getting certificate authority error like the one below when trying to execute commands against staging using the ",(0,a.kt)("inlineCode",{parentName:"p"},"prime-api-client")," then you need to ensure that you are trusting the DOD Root Certs in your Keychain and have loaded all the DOD certs in your keychain as well. For details on adding them properly see [","[Using-your-CAC-in-Browsers-on-MacOS]","]"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"2020/09/23 16:13:40 Get operation to https://api.stg.move.mil:443/prime/v1/move-task-orders failed, check if server is running : x509: certificate signed by unknown authority\n")),(0,a.kt)("h1",{id:"5-using-the-prime-api-client-results-in-a-401-unauthorized"},"5. Using the prime-api-client results in a 401 unauthorized"),(0,a.kt)("p",null,"If you are getting a 401 or 403 when making prime api calls to staging this means your certificate is not authorized in staging. This will happen when you get a new cac or renewed one as it will have new certs. See [","[use-mtls-with-cac]","] for details to create the migration for a new cac for the first time or replace your old cac cert"))}d.isMDXComponent=!0}}]);