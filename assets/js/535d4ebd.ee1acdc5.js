"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[3800],{48204:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>n,toc:()=>p});var i=o(45072),a=(o(11504),o(95788));o(10880);const r={title:"0032 CSRF Protection for the Application",description:"Decision outcome: Double-submit cookie method with gorilla/csrf\n"},s="CSRF Protection for the Application",n={unversionedId:"adrs/csrf-protection",id:"adrs/csrf-protection",title:"0032 CSRF Protection for the Application",description:"Decision outcome: Double-submit cookie method with gorilla/csrf\n",source:"@site/docs/adrs/0032-csrf-protection.md",sourceDirName:"adrs",slug:"/adrs/csrf-protection",permalink:"/mymove-docs/docs/adrs/csrf-protection",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/adrs/0032-csrf-protection.md",tags:[],version:"current",sidebarPosition:32,frontMatter:{title:"0032 CSRF Protection for the Application",description:"Decision outcome: Double-submit cookie method with gorilla/csrf\n"},sidebar:"adrsSidebar",previous:{title:"0031 CSS Tooling",permalink:"/mymove-docs/docs/adrs/css-tooling"},next:{title:"0033 Service Object Layer",permalink:"/mymove-docs/docs/adrs/service-object-layer"}},l={},p=[{value:"Decision Drivers",id:"decision-drivers",level:2},{value:"Considered Alternatives",id:"considered-alternatives",level:2},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"Pros and Cons of the Alternatives",id:"pros-and-cons-of-the-alternatives",level:2},{value:"<em>Double-submit cookie method with justinas/nosurf</em>",id:"double-submit-cookie-method-with-justinasnosurf",level:3}],c={toc:p},m="wrapper";function u(e){let{components:t,...o}=e;return(0,a.yg)(m,(0,i.c)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"csrf-protection-for-the-application"},"CSRF Protection for the Application"),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"User Story:")," Story ",(0,a.yg)("a",{parentName:"p",href:"https://www.pivotaltracker.com/story/show/162096596"},"#162096596")),(0,a.yg)("p",null,"We want to be able to protect our application against ",(0,a.yg)("a",{parentName:"p",href:"https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)"},"Cross-Site Request Forgery (CSRF)")," attacks. While CSRF is no longer in the ",(0,a.yg)("a",{parentName:"p",href:"https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project"},"OWASP top ten list")," of security risks, our application does not use a full fledge Golang framework that includes CSRF protection. Therefore, we added protection to address the vulnerability."),(0,a.yg)("h2",{id:"decision-drivers"},"Decision Drivers"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Ease of implementation"),(0,a.yg)("li",{parentName:"ul"},"Good library documentation"),(0,a.yg)("li",{parentName:"ul"},"Works with our current Go web framework: Goji")),(0,a.yg)("h2",{id:"considered-alternatives"},"Considered Alternatives"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Double submit cookie method with justinas/nosurf"),(0,a.yg)("li",{parentName:"ul"},"Double submit cookie method with gorilla/csrf")),(0,a.yg)("h2",{id:"decision-outcome"},"Decision Outcome"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Chosen Alternative: ",(0,a.yg)("strong",{parentName:"p"},"Double-submit cookie method with gorilla/csrf"))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("strong",{parentName:"p"},"Justification:")," Gorilla/CSRF library has a fairly simple implementation that works with our framework")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Good documentation for JavaScript applications")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Works with Goji")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Generates unique-per-request (masked) tokens as a mitigation against the ",(0,a.yg)("a",{parentName:"p",href:"http://breachattack.com/"},"BREACH")," attack")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Uses ",(0,a.yg)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Secure_cookie"},"secure cookies")," to store the unmasked csrf token session")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"CSRF token session is stateless via ",(0,a.yg)("a",{parentName:"p",href:"https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.md#double-submit-cookie"},"Double Submit Cookie method")," meaning that multiple browser tabs won't cause a user problems as their per-request token is compared with the base (unmasked) token.")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("strong",{parentName:"p"},"Consequences:")," HTTP requests will now need to include ",(0,a.yg)("inlineCode",{parentName:"p"},"x-csrf-token")," header")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"Every HTTP requests that modifies data will need the header"))),(0,a.yg)("h2",{id:"pros-and-cons-of-the-alternatives"},"Pros and Cons of the Alternatives"),(0,a.yg)("h3",{id:"double-submit-cookie-method-with-justinasnosurf"},(0,a.yg)("em",{parentName:"h3"},"Double-submit cookie method with justinas/nosurf")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"+")," Works with Goji"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"+")," Double submit cookie method"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"-")," Documentation lacking for JavaScript applications"),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("inlineCode",{parentName:"li"},"-")," Doesn't use secure cookies")))}u.isMDXComponent=!0}}]);