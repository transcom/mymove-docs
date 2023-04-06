"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[7675],{53443:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>r,toc:()=>s});var i=n(87462),a=(n(67294),n(3905));n(95657);const o={},l="Testing DTOD",r={unversionedId:"backend/guides/dtod/testing-dtod",id:"backend/guides/dtod/testing-dtod",title:"Testing DTOD",description:"The instructions that follow will say to change the environment variable inside of .envrc, however, there are other methods one can take to update to environment variables.",source:"@site/docs/backend/guides/dtod/testing-dtod.md",sourceDirName:"backend/guides/dtod",slug:"/backend/guides/dtod/testing-dtod",permalink:"/mymove-docs/docs/backend/guides/dtod/testing-dtod",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/backend/guides/dtod/testing-dtod.md",tags:[],version:"current",frontMatter:{},sidebar:"backendSidebar",previous:{title:"DTOD Architecture",permalink:"/mymove-docs/docs/backend/guides/dtod/dtod-architecture"},next:{title:"Overview",permalink:"/mymove-docs/docs/backend/guides/service-objects/overview"}},d={},s=[{value:"Triggering the DTOD Call",id:"triggering-the-dtod-call",level:2},{value:"With Mocks",id:"with-mocks",level:2},{value:"Using Real DTOD",id:"using-real-dtod",level:2},{value:"Changing the Password Locally",id:"changing-the-password-locally",level:3},{value:"Locally Getting Additional Logging",id:"locally-getting-additional-logging",level:2},{value:"Challenges with Getting Additional Logging",id:"challenges-with-getting-additional-logging",level:3}],g={toc:s};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"testing-dtod"},"Testing DTOD"),(0,a.kt)("p",null,"The instructions that follow will say to change the environment variable inside of ",(0,a.kt)("inlineCode",{parentName:"p"},".envrc"),", however, there are other methods one can take to update to environment variables."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Environment variables can be changed inside of ",(0,a.kt)("inlineCode",{parentName:"li"},".envrc.local")),(0,a.kt)("li",{parentName:"ul"},"Runing ",(0,a.kt)("inlineCode",{parentName:"li"},"export DTOD_USE_MOCK=false")," after ",(0,a.kt)("inlineCode",{parentName:"li"},"direnv allow")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"DTOD_USE_MOCK=false make server_run"))),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"If you are not using the plugin ",(0,a.kt)("a",{parentName:"p",href:"https://plugins.jetbrains.com/plugin/19275-better-direnv"},"better-direnv")," and you are running the server in Goland, be sure to refresh the Goland environment.")),(0,a.kt)("h2",{id:"triggering-the-dtod-call"},"Triggering the DTOD Call"),(0,a.kt)("p",null,"The following steps just documents one way in which DTOD is used in the application. There are others."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Login as a services counselor to the office application."),(0,a.kt)("li",{parentName:"ol"},"Create a PPM shipment."),(0,a.kt)("li",{parentName:"ol"},"The save and continue button should trigger a call to the DTOD API.")),(0,a.kt)("h2",{id:"with-mocks"},"With Mocks"),(0,a.kt)("p",null,"Ensure that ",(0,a.kt)("inlineCode",{parentName:"p"},"DTOD_USE_MOCK")," is set to ",(0,a.kt)("inlineCode",{parentName:"p"},"false")," in ",(0,a.kt)("inlineCode",{parentName:"p"},".envrc"),". Setting this to false will use mock caluclations."),(0,a.kt)("h2",{id:"using-real-dtod"},"Using Real DTOD"),(0,a.kt)("p",null,"Set ",(0,a.kt)("inlineCode",{parentName:"p"},"DTOD_USE_MOCK")," in ",(0,a.kt)("inlineCode",{parentName:"p"},".envrc")," to ",(0,a.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,a.kt)("p",null,"In the server logs, you should see this line"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'2023-02-23T23:30:59.174Z INFO route/planner.go:167 Using real DTOD for DTOD route planner {"git_branch": "main", "git_commit": "d19fedae045252bc8f0116b1a7b216b4a1dc8927"}\n')),(0,a.kt)("h3",{id:"changing-the-password-locally"},"Changing the Password Locally"),(0,a.kt)("p",null,"The password can be overriden by running ",(0,a.kt)("inlineCode",{parentName:"p"},"export DTOD_API_PASSWORD='newpassword'")," after ",(0,a.kt)("inlineCode",{parentName:"p"},"direnv allow")," runs."),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"If the password contains special characters, ensure that they are escaped appropriately.")),(0,a.kt)("h2",{id:"locally-getting-additional-logging"},"Locally Getting Additional Logging"),(0,a.kt)("p",null,"Inside of ",(0,a.kt)("inlineCode",{parentName:"p"},"pkg/route/planner.go"),", change ",(0,a.kt)("inlineCode",{parentName:"p"},"gosoap.SoapClient")," to use ",(0,a.kt)("inlineCode",{parentName:"p"},"gosoap.SoapClientWithConfig")," like so"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"soapClient, err := gosoap.SoapClientWithConfig(dtodWSDL, httpClient, &gosoap.Config{Dump: true})\n")),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"The ",(0,a.kt)("inlineCode",{parentName:"p"},"Dump: true")," config option should only be used locally as that dumps out the username and password into the logs.")),(0,a.kt)("h3",{id:"challenges-with-getting-additional-logging"},"Challenges with Getting Additional Logging"),(0,a.kt)("p",null,"The soap library being used only returns an error if the status code is < 200 or >= 400."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/tiaguinho/gosoap/blob/f4a99995a898b6a2de86e74d0942ffc4cfa89c0d/soap.go#L251-L261.\n")))}p.isMDXComponent=!0}}]);