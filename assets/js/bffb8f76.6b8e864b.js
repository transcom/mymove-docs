"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[320],{5088:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>r,contentTitle:()=>s,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>m});var i=t(45072),n=(t(11504),t(95788));t(10880);const l={title:"0022 Chose Excelize package to parse XLSX files",description:"Use Excelize"},s="Chose Excelize package to parse XLSX files",o={unversionedId:"adrs/xlsx-lib",id:"adrs/xlsx-lib",title:"0022 Chose Excelize package to parse XLSX files",description:"Use Excelize",source:"@site/docs/adrs/0022-xlsx-lib.md",sourceDirName:"adrs",slug:"/adrs/xlsx-lib",permalink:"/mymove-docs/docs/adrs/xlsx-lib",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/adrs/0022-xlsx-lib.md",tags:[],version:"current",sidebarPosition:22,frontMatter:{title:"0022 Chose Excelize package to parse XLSX files",description:"Use Excelize"},sidebar:"adrsSidebar",previous:{title:"0021 Temporary use and plan for expunging Social Security Numbers in the prototype",permalink:"/mymove-docs/docs/adrs/ssn-use"},next:{title:"0023 Representing Dollar Values in Go and the Database",permalink:"/mymove-docs/docs/adrs/representing-dollar-values"}},r={},m=[{value:"Considered Alternatives",id:"considered-alternatives",level:2},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"Pros and Cons of the Alternatives",id:"pros-and-cons-of-the-alternatives",level:2},{value:"<em>XLSX</em>",id:"xlsx",level:3},{value:"<em>Excelize</em>",id:"excelize",level:3}],d={toc:m},p="wrapper";function c(e){let{components:a,...t}=e;return(0,n.yg)(p,(0,i.c)({},d,t,{components:a,mdxType:"MDXLayout"}),(0,n.yg)("h1",{id:"chose-excelize-package-to-parse-xlsx-files"},"Chose Excelize package to parse XLSX files"),(0,n.yg)("p",null,(0,n.yg)("strong",{parentName:"p"},"User Story:")," ",(0,n.yg)("em",{parentName:"p"},(0,n.yg)("a",{parentName:"em",href:"https://www.pivotaltracker.com/story/show/156427513"},"Pivotal Task"))),(0,n.yg)("p",null,"The Rate Engine relies on data from the 400NG Tariff baseline rates excel doc which is published yearly. We need a way to import this data into the application to use in look ups for the rate engine.\nImporting this from the excel document is the most reliable and reproducible way to get the data in the database."),(0,n.yg)("h2",{id:"considered-alternatives"},"Considered Alternatives"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("em",{parentName:"li"},(0,n.yg)("a",{parentName:"em",href:"https://github.com/tealeg/xlsx"},"XLSX"))),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("em",{parentName:"li"},(0,n.yg)("a",{parentName:"em",href:"https://github.com/360EntSecGroup-Skylar/excelize"},"Excelize")))),(0,n.yg)("h2",{id:"decision-outcome"},"Decision Outcome"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},"Chosen Alternative: ",(0,n.yg)("em",{parentName:"li"},"Excelize")),(0,n.yg)("li",{parentName:"ul"},"Both alternatives seem to have similar base functionality, but this one has better documentation, more engaged contributors, and the other top hit refers to this as worth checking out. Because we're using for a very discrete task (parsing and then hoovering up data for our database), I think having a package that has a relatively limited scope is appropriate. Used ",(0,n.yg)("a",{parentName:"li",href:"https://docs.google.com/document/d/1Z_R9mFRo4n-rvxLD1Cbz-KXy32H5Z50_J3j4x15hq0Y/edit"},"this")," as guidance for how to make this decision.")),(0,n.yg)("h2",{id:"pros-and-cons-of-the-alternatives"},"Pros and Cons of the Alternatives"),(0,n.yg)("h3",{id:"xlsx"},(0,n.yg)("em",{parentName:"h3"},"XLSX")),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("inlineCode",{parentName:"li"},"+")," ",(0,n.yg)("em",{parentName:"li"},"Most used on ",(0,n.yg)("a",{parentName:"em",href:"https://godoc.org/github.com/tealeg/xlsx"},"GoDocs"))),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("inlineCode",{parentName:"li"},"+")," *Easy to get started"),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("inlineCode",{parentName:"li"},"+")," ",(0,n.yg)("em",{parentName:"li"},"Has some nice offshoots such as an xlsx to csv project and a streaming xlsx parser")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("inlineCode",{parentName:"li"},"+")," ",(0,n.yg)("em",{parentName:"li"},"Has CI and decent test coverage")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("inlineCode",{parentName:"li"},"-")," ",(0,n.yg)("em",{parentName:"li"},"Less in-depth docs")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("inlineCode",{parentName:"li"},"-")," ",(0,n.yg)("em",{parentName:"li"},"Less frequently updated")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("inlineCode",{parentName:"li"},"-")," ",(0,n.yg)("em",{parentName:"li"},"Long waits on PRs"))),(0,n.yg)("h3",{id:"excelize"},(0,n.yg)("em",{parentName:"h3"},"Excelize")),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("inlineCode",{parentName:"li"},"+")," ",(0,n.yg)("em",{parentName:"li"},"Second most frequently used on ",(0,n.yg)("a",{parentName:"em",href:"https://godoc.org/github.com/360EntSecGroup-Skylar/excelize"},"GoDocs"))),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("inlineCode",{parentName:"li"},"+")," *Easy to get started"),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("inlineCode",{parentName:"li"},"+")," ",(0,n.yg)("em",{parentName:"li"},"Has CI and excellent test coverage")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("inlineCode",{parentName:"li"},"+")," ",(0,n.yg)("em",{parentName:"li"},"Better documentation")),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("inlineCode",{parentName:"li"},"-")," ",(0,n.yg)("em",{parentName:"li"},"Fewer references on the internet that I've found"))))}c.isMDXComponent=!0}}]);