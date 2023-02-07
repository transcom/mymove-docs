"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[9842],{52586:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>r,toc:()=>d});var a=n(87462),o=(n(67294),n(3905));n(29420);const i={},l=void 0,r={unversionedId:"about/Welcome",id:"about/Welcome",title:"Welcome",description:"This is the migrated root README from the Transcom mymove repo. This is a living document that is being worked on.",source:"@site/docs/about/Welcome.md",sourceDirName:"about",slug:"/about/Welcome",permalink:"/mymove-docs/docs/about/Welcome",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/about/Welcome.md",tags:[],version:"current",frontMatter:{},sidebar:"aboutSidebar",previous:{title:"Server",permalink:"/mymove-docs/docs/about/application-setup/server"},next:{title:"API / Swagger",permalink:"/mymove-docs/docs/about/development/api-and-swagger"}},s={},d=[{value:"Overview",id:"overview",level:2},{value:"Login.gov",id:"logingov",level:2},{value:"Creating alternative users with the same email address",id:"creating-alternative-users-with-the-same-email-address",level:3},{value:"Development",id:"development",level:2},{value:"GoLand",id:"goland",level:3},{value:"Goland: Nix",id:"goland-nix",level:4}],m={toc:d};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"This is the migrated root README from the Transcom mymove repo. This is a living document that is being worked on.")),(0,o.kt)("h2",{id:"overview"},"Overview"),(0,o.kt)("p",null,"Please check the ",(0,o.kt)("a",{parentName:"p",href:"https://transcom.github.io/mymove-docs/docs"},"MilMove Development Documentation")," for details on the project itself."),(0,o.kt)("h2",{id:"logingov"},"Login.gov"),(0,o.kt)("p",null,"You'll need accounts for login.gov and the login.gov sandbox. These will\nrequire two-factor authentication, so have your second factor (one of: phone,\nauthentication app, security key, CAC) on hand. To create an account at\nlogin.gov, use your regular ",(0,o.kt)("inlineCode",{parentName:"p"},"truss.works")," email and follow ",(0,o.kt)("a",{parentName:"p",href:"https://login.gov/help/creating-an-account/how-to-create-an-account/"},"the official\ninstructions"),".\nTo create an account in the sandbox, follow the same instructions, but ",(0,o.kt)("a",{parentName:"p",href:"https://idp.int.identitysandbox.gov/sign_up/enter_email"},"in the\nsandbox server"),". Do\n",(0,o.kt)("em",{parentName:"p"},"not")," use your regular email address in the sandbox."),(0,o.kt)("h3",{id:"creating-alternative-users-with-the-same-email-address"},"Creating alternative users with the same email address"),(0,o.kt)("p",null,"You can use the plus sign ",(0,o.kt)("inlineCode",{parentName:"p"},"+")," to create a new Truss email address.\n",(0,o.kt)("inlineCode",{parentName:"p"},"name+some_string@truss.works")," will be treated as a new address, but will be\nrouted to your ",(0,o.kt)("inlineCode",{parentName:"p"},"name@truss.works")," email automatically. Don't use this for the\noffice-side of account creation. It's helpful to use these types of accounts for\nthe customer-side accounts."),(0,o.kt)("h2",{id:"development"},"Development"),(0,o.kt)("h3",{id:"goland"},"GoLand"),(0,o.kt)("p",null,"GoLand supports\n",(0,o.kt)("a",{parentName:"p",href:"https://blog.jetbrains.com/go/2019/02/06/debugging-with-goland-getting-started/#debugging-a-running-application-on-the-local-machine"},"attaching the debugger to a running process"),",\nhowever this requires that the server has been built with specific flags. If you wish to use this feature in\ndevelopment add the following line ",(0,o.kt)("inlineCode",{parentName:"p"},"export GOLAND=1")," to your ",(0,o.kt)("inlineCode",{parentName:"p"},".envrc.local"),". Once the server starts follow the steps\noutlined in the article above and you should now be able to set breakpoints using the GoLand debugger."),(0,o.kt)("h4",{id:"goland-nix"},"Goland: Nix"),(0,o.kt)("p",null,"To get Goland to play nicely with ",(0,o.kt)("inlineCode",{parentName:"p"},"nix"),", there's a few things you can set up:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Update ",(0,o.kt)("inlineCode",{parentName:"li"},"GOROOT")," to ",(0,o.kt)("inlineCode",{parentName:"li"},"/nix/var/nix/profiles/mymove/bin/go"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Note that once you add it, Goland will resolve it to the actual path (the one above is a link), so it\u2019ll look\nsomething like ",(0,o.kt)("inlineCode",{parentName:"li"},"/nix/store/rv16prybnsmav8w1sqdgr80jcwsja98q-go-1.19.3/bin/go")))),(0,o.kt)("li",{parentName:"ul"},"Update ",(0,o.kt)("inlineCode",{parentName:"li"},"GOPATH")," to point to the ",(0,o.kt)("inlineCode",{parentName:"li"},".gopath")," dir in the ",(0,o.kt)("inlineCode",{parentName:"li"},"mymove")," repo",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"You may need to create the ",(0,o.kt)("inlineCode",{parentName:"li"},".gopath")," dir yourself."))),(0,o.kt)("li",{parentName:"ul"},"Update Node and NPM:",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Node interpreter: ",(0,o.kt)("inlineCode",{parentName:"li"},"/nix/var/nix/profiles/mymove/bin/node")),(0,o.kt)("li",{parentName:"ul"},"Package manager:",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"This might be fixed automatically, but if not, you can point it ",(0,o.kt)("inlineCode",{parentName:"li"},"/nix/var/nix/profiles/mymove/bin/yarn")),(0,o.kt)("li",{parentName:"ul"},"Similar to ",(0,o.kt)("inlineCode",{parentName:"li"},"GOROOT"),", it will resolve to something that looks like\n",(0,o.kt)("inlineCode",{parentName:"li"},"/nix/store/cnmxp5isc3ck1bm11zryy8dnsbnm87wk-yarn-1.22.10/libexec/yarn"))))))))}u.isMDXComponent=!0}}]);