"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[8949],{61274:(e,i,l)=>{l.r(i),l.d(i,{assets:()=>s,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var n=l(58168),t=(l(96540),l(15680));l(41873);const r={title:"0047 Use CircleCI to build only Pull Requests and master"},a="Use CircleCI to build only Pull Requests and master",o={unversionedId:"adrs/build-only-pull-requests-in-circleci",id:"adrs/build-only-pull-requests-in-circleci",title:"0047 Use CircleCI to build only Pull Requests and master",description:"Currently our CircleCI costs are very high, well over the initial expected budget. By default CircleCI builds every branch regardless of if it has a Pull Request (PR) or not. Given the size of the MilMove team and our typical pattern of creating branches in the main repo this results in a large number of builds. The builds are also triggered every time a branch changes, which can be quite frequent on active development branches.",source:"@site/docs/adrs/0047-build-only-pull-requests-in-circleci.md",sourceDirName:"adrs",slug:"/adrs/build-only-pull-requests-in-circleci",permalink:"/mymove-docs/docs/adrs/build-only-pull-requests-in-circleci",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/adrs/0047-build-only-pull-requests-in-circleci.md",tags:[],version:"current",sidebarPosition:47,frontMatter:{title:"0047 Use CircleCI to build only Pull Requests and master"},sidebar:"adrsSidebar",previous:{title:"0046 Use nodenv to manage Node versions in development",permalink:"/mymove-docs/docs/adrs/use-nodenv"},next:{title:"0048 Use a consistent file structure for front-end code",permalink:"/mymove-docs/docs/adrs/frontend-file-org"}},s={},d=[{value:"Considered Alternatives",id:"considered-alternatives",level:2},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"How do we undo this",id:"how-do-we-undo-this",level:3},{value:"Pros and Cons of the Alternatives",id:"pros-and-cons-of-the-alternatives",level:2},{value:"Do nothing, keep the default settings for CircleCI",id:"do-nothing-keep-the-default-settings-for-circleci",level:3},{value:"Switch on the CircleCI option to only build PRs and our default branch (master)",id:"switch-on-the-circleci-option-to-only-build-prs-and-our-default-branch-master",level:3},{value:"Keep building all branches and review build pipeline",id:"keep-building-all-branches-and-review-build-pipeline",level:3}],u={toc:d},c="wrapper";function p(e){let{components:i,...l}=e;return(0,t.yg)(c,(0,n.A)({},u,l,{components:i,mdxType:"MDXLayout"}),(0,t.yg)("h1",{id:"use-circleci-to-build-only-pull-requests-and-master"},"Use CircleCI to build only Pull Requests and master"),(0,t.yg)("p",null,"Currently our CircleCI costs are very high, well over the initial expected budget. By default CircleCI builds every branch regardless of if it has a Pull Request (PR) or not. Given the size of the MilMove team and our typical pattern of creating branches in the main repo this results in a large number of builds. The builds are also triggered every time a branch changes, which can be quite frequent on active development branches."),(0,t.yg)("h2",{id:"considered-alternatives"},"Considered Alternatives"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},"Do nothing, keep the default settings for CircleCI"),(0,t.yg)("li",{parentName:"ul"},"Switch on the CircleCI option to only build PRs and our default branch (master)"),(0,t.yg)("li",{parentName:"ul"},"Keep building all branches and review build pipeline")),(0,t.yg)("h2",{id:"decision-outcome"},"Decision Outcome"),(0,t.yg)("p",null,(0,t.yg)("em",{parentName:"p"},"Chosen Alternative:")," Switch on the CircleCI option to only build PRs and our default branch (master)A"),(0,t.yg)("p",null,"Once accepted this switch ",(0,t.yg)("inlineCode",{parentName:"p"},"CircleCI -> Project Settings -> Advanced -> Only build pull requests")," should be enabled."),(0,t.yg)("h3",{id:"how-do-we-undo-this"},"How do we undo this"),(0,t.yg)("p",null,"We turn the ",(0,t.yg)("inlineCode",{parentName:"p"},"CircleCI -> Project Settings -> Advanced -> Only build pull requests")," option off."),(0,t.yg)("h2",{id:"pros-and-cons-of-the-alternatives"},"Pros and Cons of the Alternatives"),(0,t.yg)("h3",{id:"do-nothing-keep-the-default-settings-for-circleci"},"Do nothing, keep the default settings for CircleCI"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"+")," Easiest to do nothing"),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"-")," Costs of CircleCI continue to grow"),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"-")," Building all branches will continue building even branches that are not ready for review")),(0,t.yg)("h3",{id:"switch-on-the-circleci-option-to-only-build-prs-and-our-default-branch-master"},"Switch on the CircleCI option to only build PRs and our default branch (master)"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"+")," Easy to implement, just a project setting in CircleCI"),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"+")," Should reduce our CircleCI costs significantly by only building PR branches"),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"+")," CircleCI usage reduction will buy us time before having to review all stages of the pipeline"),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"+")," Encourage people to push more often not just when ready for review"),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"-")," Lose the ability to have our branches run in CircleCI without creating a PR")),(0,t.yg)("h3",{id:"keep-building-all-branches-and-review-build-pipeline"},"Keep building all branches and review build pipeline"),(0,t.yg)("ul",null,(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"+")," Review of the pipeline could lead to pipeline efficiencies"),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"-")," Very time consuming to review"),(0,t.yg)("li",{parentName:"ul"},(0,t.yg)("inlineCode",{parentName:"li"},"-")," Still builds every branch on every commit to each branch, even without a PR")))}p.isMDXComponent=!0}}]);