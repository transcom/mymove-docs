"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[7325],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>p});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),h=l(n),p=o,m=h["".concat(s,".").concat(p)]||h[p]||u[p]||a;return n?r.createElement(m,i(i({ref:t},d),{},{components:n})):r.createElement(m,i({ref:t},d))}));function p(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=h;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},55924:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>c,toc:()=>l});var r=n(87462),o=(n(67294),n(3905));const a={sidebar_position:11},i="Troubleshoot GEX Connection",c={unversionedId:"backend/guides/troubleshoot-gex-connection",id:"backend/guides/troubleshoot-gex-connection",title:"Troubleshoot GEX Connection",description:"1. Retrieve certificates from chamber",source:"@site/docs/backend/guides/troubleshoot-gex-connection.md",sourceDirName:"backend/guides",slug:"/backend/guides/troubleshoot-gex-connection",permalink:"/mymove-docs/docs/backend/guides/troubleshoot-gex-connection",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/backend/guides/troubleshoot-gex-connection.md",tags:[],version:"current",sidebarPosition:11,frontMatter:{sidebar_position:11},sidebar:"backendSidebar",previous:{title:"How to Debug Go in VSCode",permalink:"/mymove-docs/docs/backend/guides/how-to/debug-go-with-vscode"},next:{title:"Importing tariff400ng data for the year",permalink:"/mymove-docs/docs/backend/guides/tariff400ng-yearly-import"}},s={},l=[{value:"1. Retrieve certificates from chamber",id:"1-retrieve-certificates-from-chamber",level:2},{value:"2. Verify the Connection",id:"2-verify-the-connection",level:2}],d={toc:l};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"troubleshoot-gex-connection"},"Troubleshoot GEX Connection"),(0,o.kt)("h2",{id:"1-retrieve-certificates-from-chamber"},"1. Retrieve certificates from chamber"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/segmentio/chamber"},"Chamber")," is a tool for managing secrets. We use it to access secret values stored in SSM Parameter Store in AWS."),(0,o.kt)("p",null,"Run the following commands from within the project directory:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},"$ chamber read app-experimental move_mil_dod_tls_key > tmp/secret.key\n$ chamber read app-experimental move_mil_dod_tls_cert > tmp/secret.cert\n")),(0,o.kt)("p",null,"You will now have the client certificate and key saved into ",(0,o.kt)("inlineCode",{parentName:"p"},"tmp"),".",(0,o.kt)("strong",{parentName:"p"},"Delete these files when you are done using them.")),(0,o.kt)("h2",{id:"2-verify-the-connection"},"2. Verify the Connection"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},"$ curl --cert tmp/secret.cert --key tmp/secret.key --insecure -v https://gexweba.daas.dla.mil/msg_data/submit/Test\n")),(0,o.kt)("p",null,"You should see the following if the connection was ",(0,o.kt)("strong",{parentName:"p"},"successful"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-console"},'$ curl --cert tmp/secret.cert --key tmp/secret.key --insecure -v https://gexweba.daas.dla.mil/msg_data/submit/Test\n*   Trying 131.78.200.191...\n* TCP_NODELAY set\n* Connected to gexweba.daas.dla.mil (131.78.200.191) port 443 (#0)\n* ALPN, offering h2\n* ALPN, offering http/1.1\n* Cipher selection: ALL:!EXPORT:!EXPORT40:!EXPORT56:!aNULL:!LOW:!RC4:@STRENGTH\n* successfully set certificate verify locations:\n*   CAfile: /etc/ssl/cert.pem\n  CApath: none\n* TLSv1.2 (OUT), TLS handshake, Client hello (1):\n* TLSv1.2 (IN), TLS handshake, Server hello (2):\n* TLSv1.2 (IN), TLS handshake, Certificate (11):\n* TLSv1.2 (IN), TLS handshake, Server key exchange (12):\n* TLSv1.2 (IN), TLS handshake, Request CERT (13):\n* TLSv1.2 (IN), TLS handshake, Server finished (14):\n* TLSv1.2 (OUT), TLS handshake, Certificate (11):\n* TLSv1.2 (OUT), TLS handshake, Client key exchange (16):\n* TLSv1.2 (OUT), TLS handshake, CERT verify (15):\n* TLSv1.2 (OUT), TLS change cipher, Client hello (1):\n* TLSv1.2 (OUT), TLS handshake, Finished (20):\n* TLSv1.2 (IN), TLS change cipher, Client hello (1):\n* TLSv1.2 (IN), TLS handshake, Finished (20):\n* SSL connection using TLSv1.2 / ECDHE-RSA-AES256-GCM-SHA384\n* ALPN, server did not agree to a protocol\n* Server certificate:\n*  subject: C=US; O=U.S. GOVERNMENT; OU=DOD; OU=PKI; OU=DLA; CN=gexweba.daas.dla.mil\n*  start date: Feb 20 16:13:52 2018 GMT\n*  expire date: Feb 20 16:13:52 2021 GMT\n*  issuer: C=US; O=U.S. Government; OU=DoD; OU=PKI; CN=DOD ID SW CA-38\n*  SSL certificate verify ok.\n> GET /msg_data/submit/Test HTTP/1.1\n> Host: gexweba.daas.dla.mil\n> User-Agent: curl/7.54.0\n> Accept: */*\n>\n< HTTP/1.1 401 Unauthorized\n< Date: Wed, 10 Oct 2018 16:33:47 GMT\n< WWW-Authenticate: Basic realm="msg_data"\n< Content-Length: 452\n< Content-Type: text/html; charset=iso-8859-1\n< Set-Cookie: TS0=01a9f; Path=/; Domain=.gexweba.daas.dla.mil; Secure; HTTPOnly\n<\n<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">\n<html><head>\n<title>401 Unauthorized</title>\n</head><body>\n<h1>Unauthorized</h1>\n<p>This server could not verify that you\nare authorized to access the document\nrequested.  Either you supplied the wrong\ncredentials (e.g., bad password), or your\nbrowser doesn\'t understand how to supply\nthe credentials required.</p>\n<hr>\n<address>Apache Server at gexweba.daas.dla.mil Port 443</address>\n</body></html>\n* Connection #0 to host gexweba.daas.dla.mil left intact\n')),(0,o.kt)("p",null,"If you see other output, then there is most likely an issue with the server verifying the client certificates."))}u.isMDXComponent=!0}}]);