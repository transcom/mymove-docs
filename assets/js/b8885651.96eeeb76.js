"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[1638],{35285:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>r,toc:()=>u});var a=t(58168),i=(t(96540),t(15680));t(41873);const o={title:"0025 Client Side Feature Flags using Custom JavaScript",description:"Decision outcome: Detect current environment using NODE_ENV and fallback\nto using the hostname when in production. Toggle features\nbased on this environment.\n"},l="Client Side Feature Flags using Custom JavaScript",r={unversionedId:"adrs/client-side-feature-flags",id:"adrs/client-side-feature-flags",title:"0025 Client Side Feature Flags using Custom JavaScript",description:"Decision outcome: Detect current environment using NODE_ENV and fallback\nto using the hostname when in production. Toggle features\nbased on this environment.\n",source:"@site/docs/adrs/0025-client-side-feature-flags.md",sourceDirName:"adrs",slug:"/adrs/client-side-feature-flags",permalink:"/mymove-docs/docs/adrs/client-side-feature-flags",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/adrs/0025-client-side-feature-flags.md",tags:[],version:"current",sidebarPosition:25,frontMatter:{title:"0025 Client Side Feature Flags using Custom JavaScript",description:"Decision outcome: Detect current environment using NODE_ENV and fallback\nto using the hostname when in production. Toggle features\nbased on this environment.\n"},sidebar:"adrsSidebar",previous:{title:"0024 Model Authorization and Handler Design",permalink:"/mymove-docs/docs/adrs/model-authorization-and-handler-design"},next:{title:"0026 Use Snyk Vulnerability Scanning",permalink:"/mymove-docs/docs/adrs/use-snyk-vulnerability-scanning"}},s={},u=[{value:"Considered Alternatives",id:"considered-alternatives",level:2},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"Implementation Details",id:"implementation-details",level:2},{value:"Pros and Cons of the Alternatives",id:"pros-and-cons-of-the-alternatives",level:2},{value:"Launch Darkly",id:"launch-darkly",level:3},{value:"Use environment variables to toggle features on and off, with or without a library",id:"use-environment-variables-to-toggle-features-on-and-off-with-or-without-a-library",level:3}],d={toc:u},g="wrapper";function m(e){let{components:n,...t}=e;return(0,i.yg)(g,(0,a.A)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"client-side-feature-flags-using-custom-javascript"},"Client Side Feature Flags using Custom JavaScript"),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"User Story:")," Story ",(0,i.yg)("a",{parentName:"p",href:"https://www.pivotaltracker.com/story/show/158741324"},"#158741324")),(0,i.yg)("p",null,"As new features are built out in the application, we need a way to prevent users from\nseeing (and attempting to use) partially implemented functionality. At the same time,\nwe want to be able to selectively test features in specific environments."),(0,i.yg)("p",null,"While we eventually may wish to have such functionality available to the Go portions\nof the application, our immediate needs can be satisfied through purely client-side\nsolutions."),(0,i.yg)("h2",{id:"considered-alternatives"},"Considered Alternatives"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Use a third-party service such as ",(0,i.yg)("a",{parentName:"li",href:"https://launchdarkly.com/implementation/"},"Launch Darkly")),(0,i.yg)("li",{parentName:"ul"},"Detect current environment using the hostname and toggle features based on this environment"),(0,i.yg)("li",{parentName:"ul"},"Use environment variables to toggle features on and off, with or without a library")),(0,i.yg)("h2",{id:"decision-outcome"},"Decision Outcome"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Chosen Alternative: ",(0,i.yg)("strong",{parentName:"li"},"Detect current environment using ",(0,i.yg)("inlineCode",{parentName:"strong"},"NODE_ENV")," and fallback to using\nthe hostname when ",(0,i.yg)("inlineCode",{parentName:"strong"},"NODE_ENV === 'production'"),". Toggle features based on this environment.")),(0,i.yg)("li",{parentName:"ul"},"Simplest solution to the current set of known requirements."),(0,i.yg)("li",{parentName:"ul"},"Requires the least investment in new libraries or services."),(0,i.yg)("li",{parentName:"ul"},"Allows us to try out a simple approach with minimal investment, leaving open the\npossibility of moving to a more involved solution when it is warranted."),(0,i.yg)("li",{parentName:"ul"},"This does require a commit and deploy to change the value of a flag, but this\nis OK given our intention of using this feature to gate large features."),(0,i.yg)("li",{parentName:"ul"},"We can use the ",(0,i.yg)("inlineCode",{parentName:"li"},"AppContext")," provider/consumer already used in the app for app-level\nsettings to make the flags available throughout the app while preserving the ability\nto manipulate them in tests.")),(0,i.yg)("h2",{id:"implementation-details"},"Implementation Details"),(0,i.yg)("p",null,"We will determine the environment using:"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("inlineCode",{parentName:"li"},"NODE_ENV")),(0,i.yg)("li",{parentName:"ol"},"The page's hostname if ",(0,i.yg)("inlineCode",{parentName:"li"},"NODE_ENV")," is ",(0,i.yg)("inlineCode",{parentName:"li"},"production"),".")),(0,i.yg)("p",null,"Each environment (production, staging, experimental, development, test) will have its own mapping of flags to values."),(0,i.yg)("p",null,"An example of checking the value of the ",(0,i.yg)("inlineCode",{parentName:"p"},"hhg")," flag within JSX code is:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-jsx"},"<AppContext.Consumer>\n  {settings => (\n    <p>HHG is {settings.flags.hhg ? 'enabled' : 'disabled'}.</p>\n  )}\n</AppContext.Consumer>\n")),(0,i.yg)("h2",{id:"pros-and-cons-of-the-alternatives"},"Pros and Cons of the Alternatives"),(0,i.yg)("h3",{id:"launch-darkly"},"Launch Darkly"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"+")," Provides a user-friendly web interface for controlling flags"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"+")," Changes to flags do not require a code change or deployment"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"+")," Provides server-side and client-side functionality"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"-")," Allows for multivariate flags that contain values beyond simple boolean values"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"-")," Adds a dependency on a new external service"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"-")," Involves using the official Launch Darkly APIs")),(0,i.yg)("h3",{id:"use-environment-variables-to-toggle-features-on-and-off-with-or-without-a-library"},"Use environment variables to toggle features on and off, with or without a library"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"+")," We already use environment variables to configure many parts of the application"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"-")," Production environment variables are not available when the docker images are built on CircleCI"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"-")," Many libraries exist to handle this, however, none that would work with both\nGo and JavaScript code without additional work on our part.")))}m.isMDXComponent=!0}}]);