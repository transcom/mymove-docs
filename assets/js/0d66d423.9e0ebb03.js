"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[9329],{3905:(e,t,a)=>{a.d(t,{Zo:()=>h,kt:()=>f});var n=a(67294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=n.createContext({}),d=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},h=function(e){var t=d(e.components);return n.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,h=s(e,["components","mdxType","originalType","parentName"]),u=d(a),f=o,p=u["".concat(l,".").concat(f)]||u[f]||c[f]||r;return a?n.createElement(p,i(i({ref:t},h),{},{components:a})):n.createElement(p,i({ref:t},h))}));function f(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,i=new Array(r);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var d=2;d<r;d++)i[d]=a[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},96697:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>d});var n=a(87462),o=(a(67294),a(3905));const r={title:"0068 Use fake data factories with fake data generators to create test data"},i="Use fake data factories with fake data generators to create test data",s={unversionedId:"adrs/use-fake-data-factories-with-fake-data-generators-to-create-test-data",id:"adrs/use-fake-data-factories-with-fake-data-generators-to-create-test-data",title:"0068 Use fake data factories with fake data generators to create test data",description:"Problem statement",source:"@site/docs/adrs/0068-use-fake-data-factories-with-fake-data-generators-to-create-test-data.md",sourceDirName:"adrs",slug:"/adrs/use-fake-data-factories-with-fake-data-generators-to-create-test-data",permalink:"/mymove-docs/docs/adrs/use-fake-data-factories-with-fake-data-generators-to-create-test-data",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/adrs/0068-use-fake-data-factories-with-fake-data-generators-to-create-test-data.md",tags:[],version:"current",sidebarPosition:68,frontMatter:{title:"0068 Use fake data factories with fake data generators to create test data"},sidebar:"adrsSidebar",previous:{title:"0067 Add a child table to mto_shipments for PPMs",permalink:"/mymove-docs/docs/adrs/ppm-db-design"},next:{title:"0069 Use orchestrator service objects",permalink:"/mymove-docs/docs/adrs/use-orchestrator-service-objects"}},l={},d=[{value:"Problem statement",id:"problem-statement",level:2},{value:"Measuring success",id:"measuring-success",level:2},{value:"Observability",id:"observability",level:3},{value:"Implementation Plan",id:"implementation-plan",level:3},{value:"Ownership",id:"ownership",level:3},{value:"Considered Alternatives",id:"considered-alternatives",level:2},{value:"Decision Outcome",id:"decision-outcome",level:2},{value:"Pros and Cons of the Alternatives",id:"pros-and-cons-of-the-alternatives",level:2},{value:"Option 1: Create factories on the FE (using a package), replace the factories on the BE with a package, and use fake data generators for both the BE and FE",id:"option-1-create-factories-on-the-fe-using-a-package-replace-the-factories-on-the-be-with-a-package-and-use-fake-data-generators-for-both-the-be-and-fe",level:3},{value:"Option 2: Create factories on the FE (using a package) and use fake data generators for both the BE and FE",id:"option-2-create-factories-on-the-fe-using-a-package-and-use-fake-data-generators-for-both-the-be-and-fe",level:3},{value:"Option 3: Start using fake data generators for the BE/FE, but don&#39;t implement factories for FE",id:"option-3-start-using-fake-data-generators-for-the-befe-but-dont-implement-factories-for-fe",level:3},{value:"Option 4: Create factories on the FE, but don&#39;t use fake data generators for FE or BE",id:"option-4-create-factories-on-the-fe-but-dont-use-fake-data-generators-for-fe-or-be",level:3},{value:"Leave things as they are",id:"leave-things-as-they-are",level:3},{value:"Resources",id:"resources",level:2}],h={toc:d};function c(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,n.Z)({},h,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"use-fake-data-factories-with-fake-data-generators-to-create-test-data"},"Use fake data factories with fake data generators to create test data"),(0,o.kt)("h2",{id:"problem-statement"},"Problem statement"),(0,o.kt)("p",null,"We have complex data models that can vary a lot depending on the situation, e.g. an HHG shipment looks very different\nfrom a PPM shipment. This can make writing tests for our code more difficult because even if we aren't doing something\nthat affects every part of an object, we might still need to know the correct way to set up the data before we can even\ntest the part that we are interacting with. The problem with the way we do things now are a bit different between the\nfrontend and backend, but the chosen solution would ideally help with both."),(0,o.kt)("p",null,"Continuing with the shipment model example, if we want to write a test for a services counselor editing a shipment to\nadd counselor notes, we need a shipment that is in a state that makes sense, e.g. has all the required fields for that\ntype of shipment filled out. Ideally, we should be able to have something that lets us quickly get started on the tests\nwithout having to dig into what valid values are for the other parts that we aren't interacting with directly, e.g.\norders."),(0,o.kt)("p",null,"To help with this on the backend, we have things like our ",(0,o.kt)("inlineCode",{parentName:"p"},"testdatagen")," functions that will set up models in a\nsemi-realistic state, but they have flaws and inconsistencies. For example, you can't easily call the ",(0,o.kt)("inlineCode",{parentName:"p"},"testdatagen"),"\nfunction for creating an address more than once without passing in ",(0,o.kt)("inlineCode",{parentName:"p"},"assertions")," (overrides), because otherwise you'll\ncreate the same exact address created twice. To help with that, we actually have 4 different address creation functions\nso that you don't need to always pass in assertions, but that's not a great solution. In a sense, these are already\nfactories, but could use some fixing up to generate realistic fake data without needing overrides every time you want\nnon-hard-coded data."),(0,o.kt)("p",null,"As for the frontend, we tend to create fake objects that kind of look like the data within each test file, which again\ngoes back to the issue of needing to understand what the data ",(0,o.kt)("em",{parentName:"p"},"should")," look like. We end up with many tests that have\nfake objects that don't really look like what the data actually looks like, e.g. many tests have IDs for objects that\nare just a few digits rather than a UUID. There are plenty of times that it doesn't matter too much, but it can make it\nthat much harder for someone that is looking at existing tests as examples in order to write new tests, especially when\nthose new tests need more realistic data."),(0,o.kt)("h2",{id:"measuring-success"},"Measuring success"),(0,o.kt)("p",null,"Initial success would be:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"have FE factories set up for our core objects, namely: moves, orders, service members, and shipments."),(0,o.kt)("li",{parentName:"ul"},"FE factories use fake data generators"),(0,o.kt)("li",{parentName:"ul"},"corresponding core BE factories use fake data generators"),(0,o.kt)("li",{parentName:"ul"},"team members know to use the core factories when available in their tests")),(0,o.kt)("p",null,"Long-term, we would ideally:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"have factories for all the data objects we need on the FE"),(0,o.kt)("li",{parentName:"ul"},"replace our standalone fake objects in FE tests"),(0,o.kt)("li",{parentName:"ul"},"update all ",(0,o.kt)("inlineCode",{parentName:"li"},"testadagen")," functions that we use for BE and e2e tests to use fake data generators (while still allowing overrides)"),(0,o.kt)("li",{parentName:"ul"},"have team members use factories whenever possible and add/update factories as objects are added/changed")),(0,o.kt)("h3",{id:"observability"},"Observability"),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"How will this change be observed by other team members?")),(0,o.kt)("p",null,"This ADR will be announced in meetings where most of the MilMove team is present. If approved, as core factories are set\nup, they could be announced at internal demos or FE check in meetings."),(0,o.kt)("h3",{id:"implementation-plan"},"Implementation Plan"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Mark existing fake data with comments indicating it's the old way of doing things. BE/FE order not important.",(0,o.kt)("ol",{parentName:"li"},(0,o.kt)("li",{parentName:"ol"},"Mark existing ",(0,o.kt)("inlineCode",{parentName:"li"},"testdatagen")," functions with comments indicating that they should be updated to use fake data."),(0,o.kt)("li",{parentName:"ol"},"Mark existing fake data in FE tests with comments indicating they they should be updated to use factories if possible.",(0,o.kt)("ol",{parentName:"li"},(0,o.kt)("li",{parentName:"ol"},"This way anyone that looks at it for an example will see that it's using an older pattern."),(0,o.kt)("li",{parentName:"ol"},"Anyone working on those tests will see it and can update it as they edit the tests."))))),(0,o.kt)("li",{parentName:"ol"},"Set up core factories as needed and use fake data generators in factories. BE/FE order not important. Core factories\ndefined in ",(0,o.kt)("a",{parentName:"li",href:"#measuring-success"},"Measuring Success"),".",(0,o.kt)("ol",{parentName:"li"},(0,o.kt)("li",{parentName:"ol"},"Create core FE factories."),(0,o.kt)("li",{parentName:"ol"},"Update core ",(0,o.kt)("inlineCode",{parentName:"li"},"testdatagen")," functions to use fake data generators.")))),(0,o.kt)("h3",{id:"ownership"},"Ownership"),(0,o.kt)("p",null,"AppEng would own this since it's related to the way we test our application code."),(0,o.kt)("p",null,"As we start having more factories, it would be up to the person writing tests and reviewers to ensure factories are\nbeing used, added, and updated."),(0,o.kt)("h2",{id:"considered-alternatives"},"Considered Alternatives"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Create factories on the FE (using a package), replace the factories on the BE with a package, and use fake data generators for both the BE and FE."),(0,o.kt)("li",{parentName:"ol"},"Create factories on the FE (using a package) and use fake data generators for both the BE and FE."),(0,o.kt)("li",{parentName:"ol"},"Start using fake data generators for the BE/FE, but don't implement factories for FE."),(0,o.kt)("li",{parentName:"ol"},"Create factories on the FE, but don't use fake data generators for FE or BE."),(0,o.kt)("li",{parentName:"ol"},"Leave things as they are.")),(0,o.kt)("p",null,"Each of the options that has us creating factories for the FE could also have an alternative of us creating the\nfactories from scratch rather than using an existing package, but if we're starting from a blank slate, we might as well\nuse a supported package that comes with features we'll want out of the box, rather than coding it ourselves and possibly\nmaking mistakes or having feature gaps. I.e. the argument for using open source code in general."),(0,o.kt)("h2",{id:"decision-outcome"},"Decision Outcome"),(0,o.kt)("p",null,"Chosen Alternative -> Option 2: Create factories on the FE and use fake data generators for both the BE and the FE."),(0,o.kt)("p",null,"This is one of the options that requires the most work up front, but it enables easier testing. With the factories that\nuse fake data generators, people will be able to more easily create fake data for their tests without having to worry\nabout all the pre-existing complex interactions of other fields/models. Factory packages also usually have the concept\nof traits (term may vary across languages/packages), which are a way of toggling several attributes on a model, e.g. we\ncould have a trait that sets how far along on-boarding a service member is and set the fields accordingly. This would\nalso make it easier to test different states for the data."),(0,o.kt)("p",null,"One thing to note is that none of the fake data that will be generated by the changes outlined in this ADR should make\nit into any of the ATO environments. This data will strictly be for testing and is meant to be used in local and non-ATO\nenvironments. If needed, we should be able to point at the sources that are used for generating the data though, e.g.\nthe list of names a given package chooses from when selecting a random name."),(0,o.kt)("h2",{id:"pros-and-cons-of-the-alternatives"},"Pros and Cons of the Alternatives"),(0,o.kt)("h3",{id:"option-1-create-factories-on-the-fe-using-a-package-replace-the-factories-on-the-be-with-a-package-and-use-fake-data-generators-for-both-the-be-and-fe"},"Option 1: Create factories on the FE (using a package), replace the factories on the BE with a package, and use fake data generators for both the BE and FE"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"+")," If there was a good library out there for ",(0,o.kt)("inlineCode",{parentName:"li"},"go"),", it would mean we wouldn't have to worry as much about having\nimplemented the factories correctly and consistently.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"See ",(0,o.kt)("a",{parentName:"li",href:"#problem-statement"},"problem statement")," for example with hard-coded data."),(0,o.kt)("li",{parentName:"ul"},"Another example of a problem a package could hopefully solve is the consistency of something like our ",(0,o.kt)("inlineCode",{parentName:"li"},"Stub"),"\nattribute which isn't properly passed to all other factories in our current implementation."))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"-")," There don't really seem to be any big ",(0,o.kt)("inlineCode",{parentName:"li"},"go")," packages for creating factories, most revolve around just generating\nfake data for a ",(0,o.kt)("inlineCode",{parentName:"li"},"struct"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"-")," Most work to implement since we'd have to start over with the BE factories.")),(0,o.kt)("p",null,"The rest of the pros/cons match the next option so see that one for more info."),(0,o.kt)("h3",{id:"option-2-create-factories-on-the-fe-using-a-package-and-use-fake-data-generators-for-both-the-be-and-fe"},"Option 2: Create factories on the FE (using a package) and use fake data generators for both the BE and FE"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"+")," Creating factories for the FE would free up devs from having to know exactly what an object should look like and\nallow them to focus on the part of an object that they are testing."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"+")," Using fake data generators for the FE factories would make it easier to generate realistic fake data for fields\nwithout having hard-coded data or having to pass in overrides every time how we do on the BE."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"+")," Refactoring our existing FE tests to use the new factories would serve as a test of our newly minted factories and\nmight even raise issues that we'd missed previously."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"+")," Using fake data generators for the BE ",(0,o.kt)("inlineCode",{parentName:"li"},"testdatagen")," functions would make them easier to re-use as often as needed\nwith less need for passing in overrides each time."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"-")," One argument against fake data generators is that if a test fails, you can't re-run the test with the same exact\ndata.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"This can be mitigated in part by ensuring our test results are recorded (which they are) and by setting our own\nseed value for the fake data generator (if the package we use allows that) to make it easier to get the same\ndata on subsequent re-runs."))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"-")," Would take work to set up the factories for the FE since we don't have any at all."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"-")," If we do want to replace the existing usages of fake objects in tests, it would take time to do these refactors.\nWe might opt to go with the the same update pattern we're using for ",(0,o.kt)("inlineCode",{parentName:"li"},"react-testing-library")," of only updating the\ntest if you are editing it for something else. The biggest downside there is that there's a possibility we won't\ncome back to it.")),(0,o.kt)("h3",{id:"option-3-start-using-fake-data-generators-for-the-befe-but-dont-implement-factories-for-fe"},"Option 3: Start using fake data generators for the BE/FE, but don't implement factories for FE"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"+")," Using fake data generators for the FE objects would make it easier to generate realistic fake data for fields\nwithout having hard-coded data."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"+")," Using fake data generators for the BE ",(0,o.kt)("inlineCode",{parentName:"li"},"testdatagen")," functions would make them easier to re-use as often as needed\nwith less need for passing in overrides each time."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"-")," Not using factories for the FE would still leave us with devs needing to have a deeper knowledge of how our\nobjects relate to each other and what the minimum data needed is in order to test what they're trying to focus on."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"-")," Measuring success for the FE is more ambiguous because we won't be replacing all the hard-coded data that exists\nwith the generated data since some of that hard-coded data is being used in the tests as is on purpose. Thus, seeing\nwhat needs to be updated vs left as is would be harder to do at a glance."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"-")," One argument against fake data generators is that if a test fails, you can't re-run the test with the same exact\ndata.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"This can be mitigated in part by ensuring our test results are recorded (which they are) and by setting our own\nseed value for the fake data generator (if the package we use allows that) to make it easier to get the same\ndata on subsequent re-runs.")))),(0,o.kt)("h3",{id:"option-4-create-factories-on-the-fe-but-dont-use-fake-data-generators-for-fe-or-be"},"Option 4: Create factories on the FE, but don't use fake data generators for FE or BE"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"+")," Creating factories for the FE would free up devs from having to know exactly what an object should look like and\nbe able to focus only on the part of an object that they are testing."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"-")," We are left with factories on the BE that need overrides (assertions) to be passed in every time you want\ndifferent data."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"-")," Having factories on the FE without a fake data generator leaves us with some of the same problems we have with the\n",(0,o.kt)("inlineCode",{parentName:"li"},"testdatagen")," functions on the backend right now. Namely that we would need to pass overrides in every time we want\nnew data instead of the hard-coded defaults.")),(0,o.kt)("h3",{id:"leave-things-as-they-are"},"Leave things as they are"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"+")," No extra work is needed right now."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"-")," We are left with factories on the BE that need overrides (assertions) to be passed in every time you want different data."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"-")," FE tests will continue using fake data that isn't realistic."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"-")," Not using factories for the FE would still leave us with devs needing to have a deeper knowledge of how our\nobjects relate to each other and what the minimum data needed is in order to test what they're trying to focus on.")),(0,o.kt)("h2",{id:"resources"},"Resources"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Some possibilities for ",(0,o.kt)("inlineCode",{parentName:"li"},"go")," fake data generators:",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/jaswdr/faker"},"jaswdr/faker")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/bxcodec/faker"},"bxcodec/faker")))),(0,o.kt)("li",{parentName:"ul"},"Possible ",(0,o.kt)("inlineCode",{parentName:"li"},"js")," libraries:",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Fake data generator: ",(0,o.kt)("a",{parentName:"li",href:"https://fakerjs.dev/"},"faker")),(0,o.kt)("li",{parentName:"ul"},"Factory tool (Called builders in this package): ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/jackfranklin/test-data-bot"},"test-data-bot")))),(0,o.kt)("li",{parentName:"ul"},"Article talking about ",(0,o.kt)("a",{parentName:"li",href:"https://www.codewithjason.com/why-use-factory-bot/"},"why using a factory bot can be good"),".",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"It's for ",(0,o.kt)("inlineCode",{parentName:"li"},"ruby"),", but the idea is applicable in other languages."))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://ustcdp3.slack.com/archives/CTQQJD3G8/p1646079626405239"},"Slack thread where we discussed faker and factories")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://dp3.atlassian.net/wiki/spaces/MT/pages/1663500318/2022-03-03+Front+End+Check-In"},"Front-end check-in notes where we discussed faker and factories")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://dp3.atlassian.net/wiki/spaces/MT/pages/1697611790/2022-03-24+Meeting+notes"},"Back-end check-in notes where we discussed this ADR a bit"))))}c.isMDXComponent=!0}}]);