"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[793],{81824:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var n=t(87462),a=(t(67294),t(3905));t(16758);const o={title:"0065 Use Office application for Prime UI"},r="*Use Office application for Prime UI*",s={unversionedId:"adrs/use-office-app-for-prime-ui",id:"adrs/use-office-app-for-prime-ui",title:"0065 Use Office application for Prime UI",description:"- Epic Story: MB-8515",source:"@site/docs/adrs/0065-use-office-app-for-prime-ui.md",sourceDirName:"adrs",slug:"/adrs/use-office-app-for-prime-ui",permalink:"/mymove-docs/docs/adrs/use-office-app-for-prime-ui",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/adrs/0065-use-office-app-for-prime-ui.md",tags:[],version:"current",sidebarPosition:65,frontMatter:{title:"0065 Use Office application for Prime UI"},sidebar:"adrsSidebar",previous:{title:"0064 Use stateless services with context",permalink:"/mymove-docs/docs/adrs/use-stateless-services-with-context"},next:{title:"0066 Use custom nullable types for patch requests",permalink:"/mymove-docs/docs/adrs/use-custom-nullable-types-for-patch-requests"}},l={},p=[{value:"Background",id:"background",level:2},{value:"Leveraging the Office app",id:"leveraging-the-office-app",level:3},{value:"Considered Alternatives",id:"considered-alternatives",level:2},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"<em>Leverage the Office Application to have a Prime Simulator Role</em>",id:"leverage-the-office-application-to-have-a-prime-simulator-role",level:3},{value:"Decision Risks",id:"decision-risks",level:2},{value:"Roles restricted to non-production environments",id:"roles-restricted-to-non-production-environments",level:3},{value:"USWDS components are used where possible",id:"uswds-components-are-used-where-possible",level:3},{value:"CODEOWNERS design reviews will be optional",id:"codeowners-design-reviews-will-be-optional",level:4},{value:"Handling Business Logic",id:"handling-business-logic",level:4}],c={toc:p};function d(e){let{components:i,...t}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,t,{components:i,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"use-office-application-for-prime-ui"},(0,a.kt)("em",{parentName:"h1"},"Use Office application for Prime UI")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Epic Story:")," ",(0,a.kt)("em",{parentName:"li"},(0,a.kt)("a",{parentName:"em",href:"https://dp3.atlassian.net/browse/MB-8515"},"MB-8515")),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"User Story:")," ",(0,a.kt)("em",{parentName:"li"},(0,a.kt)("a",{parentName:"em",href:"https://dp3.atlassian.net/browse/MB-8575"},"MB-8575")))))),(0,a.kt)("h2",{id:"background"},"Background"),(0,a.kt)("p",null,"Currently, neither the Government nor the contractor is able to fully test to\nuse of the external GHC Prime API without the help of engineers who are already\nworking on the project. This means that the Government is unable to do\nacceptance of the work being delivered end-to-end and the non-technical members\nof the contracting team are not able to test internally or with users."),(0,a.kt)("h3",{id:"leveraging-the-office-app"},"Leveraging the Office app"),(0,a.kt)("p",null,"Leveraging the Office application gives Truss engineers one less application to\nmaintain. Users of MilMove applications will interact with the same visual user\ninterface (UI) that is used to with other MilMove applications. The Office\napplication is leveraged by using a ",(0,a.kt)("inlineCode",{parentName:"p"},"Prime Simulator Role")," for the Office user.\nThis is set via the Admin UI application, covered in ",(0,a.kt)("a",{parentName:"p",href:"/mymove-docs/docs/adrs/use-query-builder"},"Use Query Builder for\nAdmin Interface"),", by assigning the role to Office\nusers.  Onboarding to Prime UI use can be done by non-engineers. Accessing the\nPrime UI will done without the aid or use of engineering effort."),(0,a.kt)("h2",{id:"considered-alternatives"},"Considered Alternatives"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("em",{parentName:"li"},"Leverage the Office Application to have a Prime Simulator Role"))),(0,a.kt)("h2",{id:"decision-outcome"},"Decision Outcome"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Chosen Alternative: ",(0,a.kt)("em",{parentName:"li"},"Leverage the Office Application to have a Prime Simulator Role"))),(0,a.kt)("h3",{id:"leverage-the-office-application-to-have-a-prime-simulator-role"},(0,a.kt)("em",{parentName:"h3"},"Leverage the Office Application to have a Prime Simulator Role")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"+")," ",(0,a.kt)("em",{parentName:"p"},"Any user is able to able to validate the work that has been completed by the\ncontractor (Truss), without requiring the use of engineering effort."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"+")," ",(0,a.kt)("em",{parentName:"p"},"Any user is able to test the system, end-to-end, internally, without requiring\nthe use of engineering effort."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"+")," ",(0,a.kt)("em",{parentName:"p"},"Any user is able to demo the system, end-to-end, internally, without requiring\nthe use of engineering effort."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"+")," ",(0,a.kt)("em",{parentName:"p"},"Trussel engineers will be exposed more to Prime API functionality and share\nknowledge of the system, end-to-end, internally, without requiring the use\nof specialized Prime API engineers."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"-")," ",(0,a.kt)("em",{parentName:"p"},"There are some risks to this approach which are covered under ",(0,a.kt)("strong",{parentName:"em"},"Decision\nRisks"),".")))),(0,a.kt)("h2",{id:"decision-risks"},"Decision Risks"),(0,a.kt)("p",null,"This section of the ADR is new addition as this particular ADR does not have any\nother considered alternatives. This section may appear in future ADRs that\nfollow a similar process. This decision has some specific risks involved related\nto its technical implementation. Specific guardrails must exist, otherwise this\ndecision's risks will become a problem for the maintenance of this application."),(0,a.kt)("h3",{id:"roles-restricted-to-non-production-environments"},"Roles restricted to non-production environments"),(0,a.kt)("p",null,"Due to the nature of the Prime API contract, the Prime UI is an entirely\ninternal application that will not be available in production environments. A\nsecure migration for the application must be run in the production database\nwhich is a non-operational (NOOP) migration. This is achieved by having an empty\nmigration file with SQL comments. Please read the ",(0,a.kt)("a",{parentName:"p",href:"https://transcom.github.io/mymove-docs/"},"documentation on Secure\nMigrations")," by searching the Docusaurus site. ",(0,a.kt)("em",{parentName:"p"},"A direct\nlink is not included here because the documentation site is going a\nrestructuring while this ADR is being written"),". This type of migration should be\nused for any environments which may be ",(0,a.kt)("em",{parentName:"p"},"production-like")," or where the ",(0,a.kt)("inlineCode",{parentName:"p"},"Prime\nSimulator Role")," must not exist."),(0,a.kt)("h3",{id:"uswds-components-are-used-where-possible"},"USWDS components are used where possible"),(0,a.kt)("p",null,"In order to get the benefits of using the Office app, the Prime UI must leverage\nReact components of the Office application or the United States Web Design\nSystem (USWDS) which MilMove builds on as a foundation for the design system for\nMilMove applications. Portions of the Prime UI application must have a similar\nlook and feel as the rest of the MilMove Office application. This helps users\nhave a unified visual language when interacting with the Prime UI. Engineers\ncontributing to the Prime UI will have a shared understanding of how to interact\nwith the Prime API. This leads to shared knowledge of the Prime API and Office\napplication across different engineering teams and practices."),(0,a.kt)("p",null,"For more clarity, Truss maintains the ",(0,a.kt)("inlineCode",{parentName:"p"},"React-USWDS")," component library that is\nused in MilMove applications. The USWDS is purely a CSS library and while we do\nimport it directly for some things, it's not the foundation of the application."),(0,a.kt)("h4",{id:"codeowners-design-reviews-will-be-optional"},"CODEOWNERS design reviews will be optional"),(0,a.kt)("p",null,"Designers will not need to be required to review any changes made\nto the Prime UI application. Collaboration between design and engineering for\nthe Prime UI is encouraged but not required. This is enforced by the CODEOWNERS\nfile having no reviewers for ",(0,a.kt)("inlineCode",{parentName:"p"},"src/*/PrimeUI/")," directories."),(0,a.kt)("h4",{id:"handling-business-logic"},"Handling Business Logic"),(0,a.kt)("p",null,"Future decisions will need to be made around how to handle Business Logic that\nUsers may expect to do in a single action that our RESTful API endpoints are not\ncapable of doing. This means that either the Support API or Client-side data\nmanipulation will have additional work to update or tie data behind the scenes."))}d.isMDXComponent=!0}}]);