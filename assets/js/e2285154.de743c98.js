"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[8173],{2942:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>s,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>l});var n=a(58168),o=(a(96540),a(15680));a(41873);const i={},s="Lambda Summary",r={unversionedId:"integrations/tget/trdm-lambda",id:"integrations/tget/trdm-lambda",title:"Lambda Summary",description:"The TRDM lambda function is a cron based function to run every Sunday to keep our TGET data up to date for TAC and LOA. It previously functioned as an API gateway, allowing MilMove to TRDM REST to SOAP API conversion, however due to this being inefficient, prone to issues with the MilMove server scaling and having multiple instances of data pulls, and API limits, it was discontinued. Most of the code was deleted from the repository, however, some still remains as leftover. In the future, this could be re-enabled, not to have MilMove perform a cron, but instead of we were to no longer store TGET data internally and instead fetch it via API when necessary.",source:"@site/docs/integrations/tget/trdm-lambda.md",sourceDirName:"integrations/tget",slug:"/integrations/tget/trdm-lambda",permalink:"/mymove-docs/docs/integrations/tget/trdm-lambda",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/integrations/tget/trdm-lambda.md",tags:[],version:"current",frontMatter:{},sidebar:"integrationsSidebar",previous:{title:"index",permalink:"/mymove-docs/docs/backend/guides/tget"}},d={},l=[{value:"Functionality",id:"functionality",level:2},{value:"API Documentation",id:"api-documentation",level:2},{value:"Files",id:"files",level:2},{value:"Deployment",id:"deployment",level:2}],m={toc:l},u="wrapper";function h(e){let{components:t,...a}=e;return(0,o.yg)(u,(0,n.A)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"lambda-summary"},"Lambda Summary"),(0,o.yg)("p",null,"The TRDM lambda function is a cron based function to run every Sunday to keep our TGET data up to date for TAC and LOA. It previously functioned as an API gateway, allowing MilMove to TRDM REST to SOAP API conversion, however due to this being inefficient, prone to issues with the MilMove server scaling and having multiple instances of data pulls, and API limits, it was discontinued. Most of the code was deleted from the ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/transcom/trdm-lambda"},"repository"),", however, some still remains as leftover. In the future, this could be re-enabled, not to have MilMove perform a cron, but instead of we were to no longer store TGET data internally and instead fetch it via API when necessary."),(0,o.yg)("h2",{id:"functionality"},"Functionality"),(0,o.yg)("p",null,"There are two primary calls utilized in the trdm-lambda cron. ",(0,o.yg)("inlineCode",{parentName:"p"},"getLastTableUpdate")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"getTable"),". We call TRDM's last table update for the specified TGET table we store internally, and if their data is newer than ours, then we know that the cron should ask for that new data. This is done by comparing our latest TAC or LOA entry's ",(0,o.yg)("inlineCode",{parentName:"p"},"updated_at")," field compared to what was received from the ",(0,o.yg)("inlineCode",{parentName:"p"},"getLastTableUpdate"),". Upon TRDM having newer data, a ",(0,o.yg)("inlineCode",{parentName:"p"},"getTable")," function is then called to ask for 1 week of data, up to TRDM's last update. So, should our data be two weeks out of date, we will only ask for one week. This is an issue slated to be fixed in PI 24-4. If it receives 0 rows for the requested week date range, it will ask for the next week, looping up until the TRDM last update to prevent us from being stuck in the past. This was introduced because of issue ",(0,o.yg)("a",{parentName:"p",href:"https://www13.v1host.com/USTRANSCOM38/Issue.mvc/Summary?oidToken=Issue%3A921623"},"I-12635"),"."),(0,o.yg)("h2",{id:"api-documentation"},"API Documentation"),(0,o.yg)("p",null,"The SOAP to API conversion documentation is limited, but there is some documentation noted in the README.md of the ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/transcom/trdm-lambda"},"trdm-lambda repository"),". The only documentation on the TRDM API is found via a developer guide ",(0,o.yg)("a",{parentName:"p",href:"https://caci.sharepoint.us/sites/DPS/milmove/Shared%20Documents/Forms/AllItems.aspx?viewpath=%2Fsites%2FDPS%2Fmilmove%2FShared%20Documents&id=%2Fsites%2FDPS%2Fmilmove%2FShared%20Documents%2FMilMove%20Documents%2FTRDM&viewid=efcad058%2D1dd8%2D4b05%2D8212%2D56454a879e54"},"stored internally on the CACI SharePoint"),"."),(0,o.yg)("h2",{id:"files"},"Files"),(0,o.yg)("admonition",{type:"warning"},(0,o.yg)("p",{parentName:"admonition"},'Column headers are based on the "subscription" to data setup between MilMove and TRDM. They vary by environment and are subject to change.')),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"getTable")," from TRDM will return an XML response stating how many rows were returned, as well as attach a file to the response. This file is what stores the rows of data. It will have a line dedicated to column headers, with subsequent lines holding data with an index corresponding to the headers. Classification does ",(0,o.yg)("em",{parentName:"p"},"NOT")," appear to show at the top of the file, and instead may be provided in another form. We were under the initial assumption that it was, however currently our impelementation appears to have faced no issues based on it conditionally looking for the line ",(0,o.yg)("inlineCode",{parentName:"p"},"Unclassified"),"."),(0,o.yg)("h2",{id:"deployment"},"Deployment"),(0,o.yg)("p",null,"Currently manual, set to be automated in PI 24-4."))}h.isMDXComponent=!0}}]);