"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[900],{57625:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>r,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>d,toc:()=>l});var t=n(87462),a=(n(67294),n(3905));n(8209);const s={title:"How to Switch from nodenv to asdf for Managing Node Versions"},i="How to Switch from [nodenv](https://github.com/nodenv/nodenv) to [asdf](https://asdf-vm.com/) for managing Node Versions",d={unversionedId:"backend/guides/how-to/switch-from-nodenv-to-asdf",id:"backend/guides/how-to/switch-from-nodenv-to-asdf",title:"How to Switch from nodenv to asdf for Managing Node Versions",description:"ADR-0081 recommends using asdf for",source:"@site/docs/backend/guides/how-to/switch-from-nodenv-to-asdf.md",sourceDirName:"backend/guides/how-to",slug:"/backend/guides/how-to/switch-from-nodenv-to-asdf",permalink:"/mymove-docs/docs/backend/guides/how-to/switch-from-nodenv-to-asdf",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/backend/guides/how-to/switch-from-nodenv-to-asdf.md",tags:[],version:"current",frontMatter:{title:"How to Switch from nodenv to asdf for Managing Node Versions"},sidebar:"backendSidebar",previous:{title:"How to Debug Go in VSCode",permalink:"/mymove-docs/docs/backend/guides/how-to/debug-go-with-vscode"},next:{title:"Troubleshoot GEX Connection",permalink:"/mymove-docs/docs/backend/guides/troubleshoot-gex-connection"}},r={},l=[],m={toc:l},c="wrapper";function p(e){let{components:o,...n}=e;return(0,a.kt)(c,(0,t.Z)({},m,n,{components:o,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"how-to-switch-from-nodenv-to-asdf-for-managing-node-versions"},"How to Switch from ",(0,a.kt)("a",{parentName:"h1",href:"https://github.com/nodenv/nodenv"},"nodenv")," to ",(0,a.kt)("a",{parentName:"h1",href:"https://asdf-vm.com/"},"asdf")," for managing Node Versions"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/mymove-docs/docs/adrs/use-asdf-to-manage-node-and-golang-versions-in-development"},"ADR-0081")," recommends using asdf for\nboth Node and Go. Many folks are likely using nodenv today, and have the option to migrate at a time of their choosing."),(0,a.kt)("p",null,"This guide assumes you already have asdf installed (for Go). If not, install asdf first."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Uninstall nodenv"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"$ brew uninstall nodenv\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Remove nodenv references from your shell profile file (e.g. ",(0,a.kt)("inlineCode",{parentName:"p"},".zshrc"),"). You likely have a ",(0,a.kt)("inlineCode",{parentName:"p"},'eval "$(nodenv init -)"')," there.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Install the asdf nodejs plugin"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"asdf plugin add nodejs\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Ensure project tool versions for the project are installed, by running the following from inside the project directory."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"asdf install\n")),(0,a.kt)("p",{parentName:"li"},"Within mymove-docs, this will install the correct version of node.\nWithin mymove, this will install the correct version of go and node."),(0,a.kt)("p",{parentName:"li"},"ASDF will automatically use the version(s) defined in ",(0,a.kt)("inlineCode",{parentName:"p"},".tool-versions")," whenever you are in a directory that has a ",(0,a.kt)("inlineCode",{parentName:"p"},".tool-versions")," file, so long as it has been installed, just like nodenv."))))}p.isMDXComponent=!0}}]);