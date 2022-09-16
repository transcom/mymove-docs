"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[5951],{69102:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var n=a(87462),i=(a(67294),a(3905));a(61839);const o={sidebar_position:9},s="How to Access a Global Application Variable",r={unversionedId:"backend/guides/access-global-variables",id:"backend/guides/access-global-variables",title:"How to Access a Global Application Variable",description:"Overview",source:"@site/docs/backend/guides/access-global-variables.md",sourceDirName:"backend/guides",slug:"/backend/guides/access-global-variables",permalink:"/mymove-docs/docs/backend/guides/access-global-variables",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/backend/guides/access-global-variables.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9},sidebar:"backendSidebar",previous:{title:"Guide to Static Analysis Security Workflow",permalink:"/mymove-docs/docs/backend/guides/guide-to-static-analysis-security-workflow"},next:{title:"How to add an event trigger",permalink:"/mymove-docs/docs/backend/guides/how-to/add-an-event-trigger"}},l={},c=[{value:"Overview",id:"overview",level:2},{value:"Why we do it this way",id:"why-we-do-it-this-way",level:2},{value:"Getting Environment Variables",id:"getting-environment-variables",level:2},{value:"Setting up global variables in the Handler Config",id:"setting-up-global-variables-in-the-handler-config",level:2}],d={toc:c};function p(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"how-to-access-a-global-application-variable"},"How to Access a Global Application Variable"),(0,i.kt)("h2",{id:"overview"},"Overview"),(0,i.kt)("p",null,"In this project, we access application variables (environment variables or other variables we set for the application) by adding them to the handler config.  Through the context we pass the variables to the functions that require them."),(0,i.kt)("h2",{id:"why-we-do-it-this-way"},"Why we do it this way"),(0,i.kt)("p",null,"Environment variables should only be accessed in the main ",(0,i.kt)("inlineCode",{parentName:"p"},"serve.go")," file and turned into real variables for passing around at that point. Accessing environment vars in other parts of the code increases the scope of our problems if there is something wrong with the environment vars. Also it increases problems with security if people are using the ",(0,i.kt)("inlineCode",{parentName:"p"},"os")," package directly to get them instead of using the ",(0,i.kt)("inlineCode",{parentName:"p"},"spf13/viper")," package which reads both environment vars and command line flags."),(0,i.kt)("p",null,"We use ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/spf13/viper"},(0,i.kt)("inlineCode",{parentName:"a"},"spf13/viper"))," and\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/spf13/pflag"},(0,i.kt)("inlineCode",{parentName:"a"},"spf13/pflags"))," to access environment variables\ntoday. It replaces using the ",(0,i.kt)("inlineCode",{parentName:"p"},"os")," package and the ",(0,i.kt)("inlineCode",{parentName:"p"},"flag")," package because it does\nboth. The pattern is the 12-factor-app pattern."),(0,i.kt)("h2",{id:"getting-environment-variables"},"Getting Environment Variables"),(0,i.kt)("p",null,"We use command line flags to get the environment variables. The flags are set in the ",(0,i.kt)("inlineCode",{parentName:"p"},"cli")," package.  Viper can take the flag and gets the value associated with that flag.  For example:"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"dbEnv := v.GetString(cli.DbEnvFlag)")," returns the database environment name"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"loginGovSecretKey := v.GetString(cli.LoginGovSecretKeyFlag))")," grabs the ",(0,i.kt)("inlineCode",{parentName:"p"},"LOGIN_GOV_SECRET_KEY")," from the ",(0,i.kt)("inlineCode",{parentName:"p"},".envrc")),(0,i.kt)("h2",{id:"setting-up-global-variables-in-the-handler-config"},"Setting up global variables in the Handler Config"),(0,i.kt)("p",null,"To add an application variable to the handler config, we create essentially a getter and setter in the handler config.\n(Ex. ",(0,i.kt)("inlineCode",{parentName:"p"},"SetUseSecureCookie")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"UseSecureCookie"),")\nFollow the pattern in ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/transcom/mymove/blob/master/pkg/handlers/contexts.go"},"pkg/handlers/contexts.go")),(0,i.kt)("p",null,"Then, in the\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/transcom/mymove/blob/master/cmd/milmove/serve.go"},(0,i.kt)("inlineCode",{parentName:"a"},"cmd/milmove/serve.go")),"\nfile, in the function ",(0,i.kt)("inlineCode",{parentName:"p"},"serveFunction")," set the value using the setter."),(0,i.kt)("p",null,"For example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-go"},'dbEnv := v.GetString(cli.DbEnvFlag)\nisDevOrTest := dbEnv == "development" || dbEnv == "test"\nuseSecureCookie := !isDevOrTest\nhandlerConfig.SetUseSecureCookie(useSecureCookie)\n')),(0,i.kt)("p",null,"In your handler, you should now be able to access the value through the handler config by calling the getter (ex. ",(0,i.kt)("inlineCode",{parentName:"p"},"h.HandlerConfig.UseSecureCookie()"),")"))}p.isMDXComponent=!0}}]);