"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[4710],{62488:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>m,contentTitle:()=>i,default:()=>p,frontMatter:()=>n,metadata:()=>o,toc:()=>s});var r=t(45072),l=(t(11504),t(95788));t(10880);const n={title:"0019 Range Slider React Component"},i="_Range Slider React Component_",o={unversionedId:"adrs/client-rangeslider",id:"adrs/client-rangeslider",title:"0019 Range Slider React Component",description:"User Story: #155911084",source:"@site/docs/adrs/0019-client-rangeslider.md",sourceDirName:"adrs",slug:"/adrs/client-rangeslider",permalink:"/mymove-docs/docs/adrs/client-rangeslider",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/adrs/0019-client-rangeslider.md",tags:[],version:"current",sidebarPosition:19,frontMatter:{title:"0019 Range Slider React Component"},sidebar:"adrsSidebar",previous:{title:"0018 Optional Field Interop",permalink:"/mymove-docs/docs/adrs/optional-field-interop"},next:{title:"0020 Using Swagger to manage server route authentication",permalink:"/mymove-docs/docs/adrs/swagger-auth"}},m={},s=[{value:"Considered Alternatives",id:"considered-alternatives",level:2},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"Pros and Cons of the Alternatives  optional ",id:"pros-and-cons-of-the-alternatives--optional-",level:2},{value:"<em>react-rangeslider</em>",id:"react-rangeslider",level:3},{value:"<em>rc-slider</em>",id:"rc-slider",level:3},{value:"<em>rheostat</em>",id:"rheostat",level:3},{value:"<em>rea11y-sliders</em>",id:"rea11y-sliders",level:3},{value:"<em>react-html5-slider</em>",id:"react-html5-slider",level:3}],d={toc:s},g="wrapper";function p(e){let{components:a,...t}=e;return(0,l.yg)(g,(0,r.c)({},d,t,{components:a,mdxType:"MDXLayout"}),(0,l.yg)("h1",{id:"range-slider-react-component"},(0,l.yg)("em",{parentName:"h1"},"Range Slider React Component")),(0,l.yg)("p",null,(0,l.yg)("strong",{parentName:"p"},"User Story:")," ",(0,l.yg)("em",{parentName:"p"},(0,l.yg)("a",{parentName:"em",href:"https://www.pivotaltracker.com/story/show/155911084"},"#155911084"))," "),(0,l.yg)("p",null,"We need a range slider component for the PPM Incentives screen. This needs to be"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"accessible"),(0,l.yg)("li",{parentName:"ul"},"styleable"),(0,l.yg)("li",{parentName:"ul"},"responsive")),(0,l.yg)("h2",{id:"considered-alternatives"},"Considered Alternatives"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("em",{parentName:"li"},(0,l.yg)("a",{parentName:"em",href:"https://whoisandy.github.io/react-rangeslider/"},"react-rangeslider"))),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("em",{parentName:"li"},(0,l.yg)("a",{parentName:"em",href:"http://react-component.github.io/slider/"},"rc-slider"))),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("em",{parentName:"li"},(0,l.yg)("a",{parentName:"em",href:"https://github.com/airbnb/rheostat"},"rheostat"))),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("em",{parentName:"li"},(0,l.yg)("a",{parentName:"em",href:"https://github.com/felixgirault/rea11y/blob/master/docs/Slider.md"},"rea11y-sliders"))),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("em",{parentName:"li"},(0,l.yg)("a",{parentName:"em",href:"https://github.com/brownieboy/react-html5-slider"},"react-html5-slider")))),(0,l.yg)("h2",{id:"decision-outcome"},"Decision Outcome"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"Chosen Alternative: ",(0,l.yg)("em",{parentName:"li"},"react-rangeslider")),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("em",{parentName:"li"},"It was the only one that would build, was controllable by keyboard, and looked decent with USWDS CSS"))),(0,l.yg)("h2",{id:"pros-and-cons-of-the-alternatives--optional-"},"Pros and Cons of the Alternatives "),(0,l.yg)("h3",{id:"react-rangeslider"},(0,l.yg)("em",{parentName:"h3"},"react-rangeslider")),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"+")," ",(0,l.yg)("em",{parentName:"li"},"it worked")),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"+")," ",(0,l.yg)("em",{parentName:"li"},"supported keyboard controls")),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"-")," ",(0,l.yg)("em",{parentName:"li"},"examples require component state"))),(0,l.yg)("h3",{id:"rc-slider"},(0,l.yg)("em",{parentName:"h3"},"rc-slider")),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"+")," ",(0,l.yg)("em",{parentName:"li"},"it worked")),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"-")," ",(0,l.yg)("em",{parentName:"li"},"could only be controlled with mouse"))),(0,l.yg)("h3",{id:"rheostat"},(0,l.yg)("em",{parentName:"h3"},"rheostat")),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"+")," ",(0,l.yg)("em",{parentName:"li"},"AirBnb created")),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"+")," ",(0,l.yg)("em",{parentName:"li"},"documentation seemed nice")),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"-")," ",(0,l.yg)("em",{parentName:"li"},"even storybook they deliver has broken styles")),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"-")," ","*","layout was unusable with uswds styles")),(0,l.yg)("h3",{id:"rea11y-sliders"},(0,l.yg)("em",{parentName:"h3"},"rea11y-sliders")),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"-")," ",(0,l.yg)("em",{parentName:"li"},"would not compile"))),(0,l.yg)("h3",{id:"react-html5-slider"},(0,l.yg)("em",{parentName:"h3"},"react-html5-slider")),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("inlineCode",{parentName:"li"},"-")," ",(0,l.yg)("em",{parentName:"li"},"would not compile"))))}p.isMDXComponent=!0}}]);