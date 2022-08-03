"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[6490],{3905:(e,o,t)=>{t.d(o,{Zo:()=>c,kt:()=>y});var n=t(67294);function r(e,o,t){return o in e?Object.defineProperty(e,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[o]=t,e}function a(e,o){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);o&&(n=n.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var o=1;o<arguments.length;o++){var t=null!=arguments[o]?arguments[o]:{};o%2?a(Object(t),!0).forEach((function(o){r(e,o,t[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))}))}return e}function s(e,o){if(null==e)return{};var t,n,r=function(e,o){if(null==e)return{};var t,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],o.indexOf(t)>=0||(r[t]=e[t]);return r}(e,o);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],o.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=n.createContext({}),d=function(e){var o=n.useContext(l),t=o;return e&&(t="function"==typeof e?e(o):i(i({},o),e)),t},c=function(e){var o=d(e.components);return n.createElement(l.Provider,{value:o},e.children)},p={inlineCode:"code",wrapper:function(e){var o=e.children;return n.createElement(n.Fragment,{},o)}},u=n.forwardRef((function(e,o){var t=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=d(t),y=r,k=u["".concat(l,".").concat(y)]||u[y]||p[y]||a;return t?n.createElement(k,i(i({ref:o},c),{},{components:t})):n.createElement(k,i({ref:o},c))}));function y(e,o){var t=arguments,r=o&&o.mdxType;if("string"==typeof e||r){var a=t.length,i=new Array(a);i[0]=u;var s={};for(var l in o)hasOwnProperty.call(o,l)&&(s[l]=o[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var d=2;d<a;d++)i[d]=t[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},95455:(e,o,t)=>{t.r(o),t.d(o,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>d});var n=t(87462),r=(t(67294),t(3905));const a={sidebar_position:2},i="How to Use and Run Storybook",s={unversionedId:"frontend/setup/run-storybook",id:"frontend/setup/run-storybook",title:"How to Use and Run Storybook",description:"What is Storybook",source:"@site/docs/frontend/setup/run-storybook.md",sourceDirName:"frontend/setup",slug:"/frontend/setup/run-storybook",permalink:"/mymove-docs/docs/frontend/setup/run-storybook",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/frontend/setup/run-storybook.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"frontendSidebar",previous:{title:"Designers's guide to setting up app locally",permalink:"/mymove-docs/docs/frontend/setup/designers-guide-to-setting-up-app-locally"},next:{title:"Guide to Implementing UI",permalink:"/mymove-docs/docs/frontend/guides/guide-to-implementing-ui"}},l={},d=[{value:"What is Storybook",id:"what-is-storybook",level:2},{value:"Basics",id:"basics",level:2},{value:"Option A: Running with tooling installed locally",id:"option-a-running-with-tooling-installed-locally",level:3},{value:"Dependencies",id:"dependencies",level:4},{value:"How to run storybook server locally",id:"how-to-run-storybook-server-locally",level:4},{value:"How to generate static storybook site files",id:"how-to-generate-static-storybook-site-files",level:4},{value:"Option B: Running in a docker container",id:"option-b-running-in-a-docker-container",level:3},{value:"Adding Stories",id:"adding-stories",level:2},{value:"Addons",id:"addons",level:3},{value:"Actions",id:"actions",level:4},{value:"Knobs",id:"knobs",level:4},{value:"Story changes require approval of Design",id:"story-changes-require-approval-of-design",level:3}],c={toc:d};function p(e){let{components:o,...t}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,t,{components:o,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"how-to-use-and-run-storybook"},"How to Use and Run Storybook"),(0,r.kt)("h2",{id:"what-is-storybook"},"What is Storybook"),(0,r.kt)("p",null,"Storybook is a user interface development environment and playground for UI components. The tool enables developers to create components independently and showcase components interactively in an isolated development environment. ",(0,r.kt)("a",{parentName:"p",href:"https://storybook.js.org/docs/basics/introduction/"},"Read more here")),(0,r.kt)("h2",{id:"basics"},"Basics"),(0,r.kt)("p",null,"Storybook expects ",(0,r.kt)("em",{parentName:"p"},"stories")," to be defined for each component to be showcased. These stories are defined in the stories directory ",(0,r.kt)("inlineCode",{parentName:"p"},"src/stories")),(0,r.kt)("h3",{id:"option-a-running-with-tooling-installed-locally"},"Option A: Running with tooling installed locally"),(0,r.kt)("p",null,"This is the flow that most engineers will likely take since they probably have all the dependencies installed already."),(0,r.kt)("h4",{id:"dependencies"},"Dependencies"),(0,r.kt)("p",null,"If this is your first time running storybook you should run ",(0,r.kt)("inlineCode",{parentName:"p"},"make client_deps")," first to ensure storybook packages are installed"),(0,r.kt)("h4",{id:"how-to-run-storybook-server-locally"},"How to run storybook server locally"),(0,r.kt)("p",null,"To see the components locally simply run ",(0,r.kt)("inlineCode",{parentName:"p"},"make storybook")," and the server will start and automatically open a browser window. If not open ",(0,r.kt)("a",{parentName:"p",href:"http://localhost:6006"},"http://localhost:6006")),(0,r.kt)("h4",{id:"how-to-generate-static-storybook-site-files"},"How to generate static storybook site files"),(0,r.kt)("p",null,"If you wish to generate the static version of storybook run ",(0,r.kt)("inlineCode",{parentName:"p"},"make build_storybook")," and the command will generate the files in ",(0,r.kt)("inlineCode",{parentName:"p"},"storybook-static")),(0,r.kt)("h3",{id:"option-b-running-in-a-docker-container"},"Option B: Running in a docker container"),(0,r.kt)("p",null,"If you don't have all the typical development tools installed this will walk you through running storybook without that. It does require docker to be installed you can get Docker CE for Mac from ",(0,r.kt)("a",{parentName:"p",href:"https://download.docker.com/mac/stable/Docker.dmg"},"here"),". Detailed instructions for installation can be found in the ",(0,r.kt)("a",{parentName:"p",href:"https://docs.docker.com/docker-for-mac/install/"},"Docker for Mac Documentation")),(0,r.kt)("p",null,"Once Docker CE for Mac is installed run the ",(0,r.kt)("inlineCode",{parentName:"p"},"make storybook_docker")," command to start the storybook server. This will not automatically start your browser so once you see the below you can open ",(0,r.kt)("a",{parentName:"p",href:"http://localhost:6006/"},"http://localhost:6006/")," and view storybook."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},">$ make storybook_docker\nstorybook_1  | webpack built e8e291d7822d6638fa63 in 18740ms\nstorybook_1  | \u256d\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256e\nstorybook_1  | \u2502                                                 \u2502\nstorybook_1  | \u2502   Storybook 5.3.14 started                      \u2502\nstorybook_1  | \u2502   15 s for manager and 20 s for preview         \u2502\nstorybook_1  | \u2502                                                 \u2502\nstorybook_1  | \u2502    Local:            http://localhost:6006/     \u2502\nstorybook_1  | \u2502    On your network:  http://172.18.0.2:6006/    \u2502\nstorybook_1  | \u2502                                                 \u2502\nstorybook_1  | \u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256f\n")),(0,r.kt)("h2",{id:"adding-stories"},"Adding Stories"),(0,r.kt)("p",null,"To showcase a component add the ",(0,r.kt)("em",{parentName:"p"},"stories")," to the ",(0,r.kt)("inlineCode",{parentName:"p"},"src/stories")," folder in an appropriate file. The storybook documentation on ",(0,r.kt)("a",{parentName:"p",href:"https://storybook.js.org/docs/basics/writing-stories/"},"Writing Stories")," is a good place to start with how to create ones. If there is not an appropriate file you need to create a new file in the pattern ",(0,r.kt)("inlineCode",{parentName:"p"},"componentName.stories.js")," in the src/stories directory, and then modify the ",(0,r.kt)("inlineCode",{parentName:"p"},".storybook/config.js")," file to include your new file in the generated site."),(0,r.kt)("h3",{id:"addons"},"Addons"),(0,r.kt)("p",null,"Stories in Storybook can use addons to extend the features of Storybook. Some addons already included are the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/storybookjs/storybook/tree/master/addons/actions"},"actions")," and ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/storybookjs/storybook/tree/master/addons/knobs"},"knobs")," addons. The controls for each of these addons shows up in a pane at the bottom of the page where they are used. If you cannot find the pane try toggling the ",(0,r.kt)("em",{parentName:"p"},"Change addons orientation")," from the ellipsis menu next to the logo in the upper left, or using the ",(0,r.kt)("strong",{parentName:"p"},"D")," keyboard short cut to toggle it."),(0,r.kt)("h4",{id:"actions"},"Actions"),(0,r.kt)("p",null,"Storybook Addon Actions can be used to display data received by event handlers in Storybook. See ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/storybookjs/storybook/tree/master/addons/actions"},"the documentation")," for more details."),(0,r.kt)("h4",{id:"knobs"},"Knobs"),(0,r.kt)("p",null,"Storybook Addon Knobs allow you to edit props dynamically using the Storybook UI. You can also use Knobs as a dynamic variable inside stories in Storybook. See ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/storybookjs/storybook/tree/master/addons/knobs"},"the documentation")," for more details."),(0,r.kt)("h3",{id:"story-changes-require-approval-of-design"},"Story changes require approval of Design"),(0,r.kt)("p",null,"As part of the new process of Design and Engineering collaboration, the design team has been made code owners of the code in ",(0,r.kt)("inlineCode",{parentName:"p"},"src/stories")," and the reference, i.e. approved, images in ",(0,r.kt)("inlineCode",{parentName:"p"},".loki/reference"),". So if you are adding a new story, modifying an existing one, or updating Loki reference images you will be required to have a designer give their approval on the GitHub PR."))}p.isMDXComponent=!0}}]);