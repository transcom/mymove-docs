"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[9207],{32319:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>h});var n=a(87462),s=(a(67294),a(3905));a(95657);const i={sidebar_position:9},r="Writing Playwright Tests for MilMove",o={unversionedId:"frontend/testing/writing-playwright-tests-for-milmove",id:"frontend/testing/writing-playwright-tests-for-milmove",title:"Writing Playwright Tests for MilMove",description:"This guide covers how MilMove writes tests for Playwright. You should",source:"@site/docs/frontend/testing/writing-playwright-tests-for-milmove.md",sourceDirName:"frontend/testing",slug:"/frontend/testing/writing-playwright-tests-for-milmove",permalink:"/mymove-docs/docs/frontend/testing/writing-playwright-tests-for-milmove",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/frontend/testing/writing-playwright-tests-for-milmove.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9},sidebar:"frontendSidebar",previous:{title:"Using factories to generate data for front-end tests",permalink:"/mymove-docs/docs/frontend/testing/using-factories-to-generate-data-for-frontend-tests"}},l={},h=[{value:"Best Practices / Things to Know",id:"best-practices--things-to-know",level:2},{value:"No seed data",id:"no-seed-data",level:3},{value:"Always (always!) ensure your test runs independently",id:"always-always-ensure-your-test-runs-independently",level:3},{value:"Test data growth can (eventually) cause test failures",id:"test-data-growth-can-eventually-cause-test-failures",level:3},{value:"Use Playwright fixtures",id:"use-playwright-fixtures",level:3},{value:"Wait for the page to load",id:"wait-for-the-page-to-load",level:3},{value:"Prefer user-facing attributes instead of css selectors",id:"prefer-user-facing-attributes-instead-of-css-selectors",level:3},{value:"Avoid force clicking at (almost) all costs",id:"avoid-force-clicking-at-almost-all-costs",level:3},{value:"Use async assertions",id:"use-async-assertions",level:3},{value:"Accessing Traces in CircleCI",id:"accessing-traces-in-circleci",level:3},{value:"Complete Archive",id:"complete-archive",level:4},{value:"Individual Trace",id:"individual-trace",level:4},{value:"Playwright Workers",id:"playwright-workers",level:3},{value:"Testharness in the Support API",id:"testharness-in-the-support-api",level:2},{value:"Adding a new testharness endpoint",id:"adding-a-new-testharness-endpoint",level:3},{value:"How the testharness works in the backend",id:"how-the-testharness-works-in-the-backend",level:3}],d={toc:h};function c(e){let{components:t,...a}=e;return(0,s.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"writing-playwright-tests-for-milmove"},"Writing Playwright Tests for MilMove"),(0,s.kt)("p",null,"This guide covers how MilMove writes tests for Playwright. You should\nprobably familarize yourself with the ",(0,s.kt)("a",{parentName:"p",href:"https://playwright.dev/docs/writing-tests"},"Playwright docs on writing\ntests"),". Some of the best\npractices below merely reinforces information from that doc."),(0,s.kt)("p",null,"You can almost certainly use some of the knowledge from ",(0,s.kt)("a",{parentName:"p",href:"/mymove-docs/docs/frontend/testing/writing-tests-using-react-testing-library-and-jest"},"Writing Tests using React Testing Library and Jest"),"."),(0,s.kt)("h2",{id:"best-practices--things-to-know"},"Best Practices / Things to Know"),(0,s.kt)("h3",{id:"no-seed-data"},"No seed data"),(0,s.kt)("p",null,"Unlike our old cypress testing strategy of running a command to load\nseed data with hard coded ids that tests can reference, with\nPlaywright, if a test needs test data in the database, it should create\nit using the testharness in the support api. See below for more\ndetails."),(0,s.kt)("p",null,"You should be able to run any Playwright test after a ",(0,s.kt)("inlineCode",{parentName:"p"},"make\ndb_dev_reset db_dev_migrate")," or after ",(0,s.kt)("inlineCode",{parentName:"p"},"make db_dev_truncate"),"."),(0,s.kt)("h3",{id:"always-always-ensure-your-test-runs-independently"},"Always (always!) ensure your test runs independently"),(0,s.kt)("p",null,"When adding a test, you should ensure it can run on its own without\nany other test. Never have one test depend on another test having run.\nThat's how we get flaky tests!"),(0,s.kt)("h3",{id:"test-data-growth-can-eventually-cause-test-failures"},"Test data growth can (eventually) cause test failures"),(0,s.kt)("p",null,"The majority of the time, Playwright tests will be run on an empty\ndatabase. If you are developing locally and run the tests many times,\neach test run will create its own data, causing more and more entries\n(e.g. moves) in the database. Having many moves in the database may\ncause some tests to fail because they are expecting their newly\ncreated data to show up on the first page of a paginated result, but\nthe data the test is looking for may instead be on the second or third\npage of results."),(0,s.kt)("p",null,"While it's not ideal for tests to depend on that behavior, sometimes\nthe effort to make the test more robust is not worth the gain."),(0,s.kt)("p",null,"If you start getting failures for tests that used to pass, try ",(0,s.kt)("inlineCode",{parentName:"p"},"make\ndb_dev_truncate"),"."),(0,s.kt)("h3",{id:"use-playwright-fixtures"},"Use Playwright fixtures"),(0,s.kt)("p",null,"To quote from the ",(0,s.kt)("a",{parentName:"p",href:"https://playwright.dev/docs/test-fixtures"},"Playwright documentation on\nfixtures")),(0,s.kt)("blockquote",null,(0,s.kt)("p",{parentName:"blockquote"},"Playwright Test is based on the concept of test fixtures. Test\nfixtures are used to establish environment for each test, giving the\ntest everything it needs and nothing else. Test fixtures are\nisolated between tests.")),(0,s.kt)("p",null,"We put all of our fixtures in ",(0,s.kt)("inlineCode",{parentName:"p"},"playwright/tests/utils"),". If you find\nyou have a common helper function that you want to reuse, please\nconsider adding it to a fixture in that directory. That allows others\nto more easily discover and reuse your helper."),(0,s.kt)("h3",{id:"wait-for-the-page-to-load"},"Wait for the page to load"),(0,s.kt)("p",null,"After performing an action which results in data on the page changing,\nuse async assertions (see below) to wait for the page to be in the\nappropriate state. As much as possible, avoid tying your test to\nimplementation details about the ",(0,s.kt)("a",{parentName:"p",href:"https://playwright.dev/docs/network#network-events"},"network\nevents")," and\ninstead use async assertions (see below) to wait until the data you\nneed is visible on the page before proceeding."),(0,s.kt)("p",null,"See more at the ",(0,s.kt)("a",{parentName:"p",href:"https://playwright.dev/docs/navigations"},"Playwright docs for navigation")),(0,s.kt)("h3",{id:"prefer-user-facing-attributes-instead-of-css-selectors"},"Prefer user-facing attributes instead of css selectors"),(0,s.kt)("p",null,"Quoting from the ",(0,s.kt)("a",{parentName:"p",href:"https://playwright.dev/docs/locators#locating-elements"},"Playwright docs on\nlocators")),(0,s.kt)("blockquote",null,(0,s.kt)("p",{parentName:"blockquote"},"Playwright comes with multiple built-in locators. To make tests\nresilient, we recommend prioritizing user-facing attributes and\nexplicit contracts such as page.getByRole().")),(0,s.kt)("h3",{id:"avoid-force-clicking-at-almost-all-costs"},"Avoid force clicking at (almost) all costs"),(0,s.kt)("p",null,"Force clicking bypasses the\n",(0,s.kt)("a",{parentName:"p",href:"https://playwright.dev/docs/actionability"},"actionability")," checks and\nincreases the chances of flaky tests."),(0,s.kt)("p",null,"Instead of using a locator for the ",(0,s.kt)("inlineCode",{parentName:"p"},"input"),", try clicking on the\nassociated text or parent element. The experience with Playwright so\nfar on MilMove is that if you need to force click, it's probably a\nsmell that there's something wrong with how the page is working (e.g.\na component with a label of the empty string instead of\n",(0,s.kt)("inlineCode",{parentName:"p"},"&nbsp;")," )."),(0,s.kt)("h3",{id:"use-async-assertions"},"Use async assertions"),(0,s.kt)("p",null,"This is referenced in the ",(0,s.kt)("a",{parentName:"p",href:"https://playwright.dev/docs/writing-tests#assertions"},"Playwright assertions\ndocs")," and will\nbe expounded upon here."),(0,s.kt)("p",null,"Instead of doing"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},"  const editCount = await page.getByText('Edit').count();\n  expect(editCount).toEqual(2);\n")),(0,s.kt)("p",null,"Use the async assertions which will wait until the condition is met,\nwhich makes tests much less flaky!"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},"  await expect(page.getByText('Edit')).toHaveCount(2);\n")),(0,s.kt)("h3",{id:"accessing-traces-in-circleci"},"Accessing Traces in CircleCI"),(0,s.kt)("p",null,"We run Playwright in ",(0,s.kt)("a",{parentName:"p",href:"https://circleci.com/docs/parallelism-faster-jobs/"},"CircleCI using parallelism so the job completes\nfaster"),". This\nmeans that if there is a test failure, you need to figure out which\nparallel run failed. That run will be red in CircleCI. You can then go\nto the ",(0,s.kt)("inlineCode",{parentName:"p"},"Artifacts")," tab and then find the artifacts for that run."),(0,s.kt)("p",null,"Unfortunately, ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/microsoft/playwright/issues/18108"},"Playwright traces do not load in\nCircleCI"),". We\nhave two workarounds."),(0,s.kt)("h4",{id:"complete-archive"},"Complete Archive"),(0,s.kt)("p",null,"The first is that we zip up the entire playwright run (for that\nparticular parallel run) in ",(0,s.kt)("inlineCode",{parentName:"p"},"complete-playwright-report.zip"),". Download\nthat zip file and unzip it (unless you are using Safari, which will unzip\nit for you automatically). Then you can ",(0,s.kt)("a",{parentName:"p",href:"https://playwright.dev/docs/ci-intro#viewing-the-html-report"},"view the report"),"."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"yarn playwright show-report path/to/report-folder\n")),(0,s.kt)("h4",{id:"individual-trace"},"Individual Trace"),(0,s.kt)("p",null,"The complete report is a bit large, so you could also download the\ntrace for just a failing run and view that."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"yarn playwright show-trace path/to/trace.zip\n")),(0,s.kt)("p",null,"Please note that if you use Safari to download the trace file, it will\nautomatically unzip it for you, which then confuses Playwright.\nDownload it with another browser like Chrome or zip it back up"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"(cd ~/Downloads && zip -r trace.zip randomhextracegoeshere) && playwright show-trace ~/Downloads/trace.zip\n")),(0,s.kt)("h3",{id:"playwright-workers"},"Playwright Workers"),(0,s.kt)("p",null,"By default ",(0,s.kt)("a",{parentName:"p",href:"https://playwright.dev/docs/test-parallel#worker-processes"},"Playwright runs tests in\nparallel"),".\nOn you local dev machine, it guesses how many workers to use based on\nyour CPU. It shows that at the beginning of the run, with something\nlike ",(0,s.kt)("inlineCode",{parentName:"p"},"Running 16 tests using 5 workers"),"."),(0,s.kt)("p",null,"If you find you are having test failures locally, try ",(0,s.kt)("a",{parentName:"p",href:"https://playwright.dev/docs/test-parallel#limit-workers"},"limiting\nworkers")," by\nusing the ",(0,s.kt)("inlineCode",{parentName:"p"},"--workers")," flag."),(0,s.kt)("h2",{id:"testharness-in-the-support-api"},"Testharness in the Support API"),(0,s.kt)("p",null,"To make it easy for a test to create the data it needs on demand, a\ntestharness in the support API has been created on the backend. The\n",(0,s.kt)("inlineCode",{parentName:"p"},"utils/testharness.js")," has all of the methods."),(0,s.kt)("p",null,"If you need to create a new method, make sure you do not hard code\nobject IDs so that the same test can be run in the same database\nmultiple times in a row without error."),(0,s.kt)("h3",{id:"adding-a-new-testharness-endpoint"},"Adding a new testharness endpoint"),(0,s.kt)("p",null,"Ideally you would be re-using/creating a function like we have in\n",(0,s.kt)("a",{parentName:"p",href:"https://github.com/transcom/mymove/blob/main/pkg/testdatagen/scenario/shared.go"},"testdatagen/scenario/shared.go"),".\nAgain, make sure any objects you build do not have hardcoded IDs so\nthat multiple instances can be created."),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},"Add a new function in the ",(0,s.kt)("a",{parentName:"li",href:"https://github.com/transcom/mymove/tree/cf5ad992f2f3a833651d79efc49d92dc6b018d8d/pkg/testdatagen/testharness"},"testdatagen/testharness\npackage")),(0,s.kt)("li",{parentName:"ol"},"Add a new entry to the ",(0,s.kt)("a",{parentName:"li",href:"https://github.com/transcom/mymove/blob/cf5ad992f2f3a833651d79efc49d92dc6b018d8d/pkg/testdatagen/testharness/dispatch.go#L15"},"actionDispatcher\nmap"),"\ncalling your new function"),(0,s.kt)("li",{parentName:"ol"},"Add a new function to ",(0,s.kt)("a",{parentName:"li",href:"https://github.com/transcom/mymove/blob/cf5ad992f2f3a833651d79efc49d92dc6b018d8d/playwright/tests/utils/testharness.js"},"testharness.js"))),(0,s.kt)("h3",{id:"how-the-testharness-works-in-the-backend"},"How the testharness works in the backend"),(0,s.kt)("p",null,"If devlocal auth is enabled (",(0,s.kt)("inlineCode",{parentName:"p"},"DEVLOCAL_AUTH=true"),"), the ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/transcom/mymove/blob/8fd35682409c0b4fc8ab14b9a8b6db957e1efb2d/pkg/handlers/routing/routing_init.go#L403-L408"},"testharness\nhandler is added under path\n",(0,s.kt)("inlineCode",{parentName:"a"},"/testharness")),".\nNote that the testharness is unauthenticated so that e.g. users can be\ncreated. "),(0,s.kt)("p",null,"The ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/transcom/mymove/blob/cf5ad992f2f3a833651d79efc49d92dc6b018d8d/pkg/handlers/testharnessapi/api.go#L32"},"testharness handler calls\ntestharness.Dispatch")),(0,s.kt)("p",null,"Then the dispatcher uses the ",(0,s.kt)("inlineCode",{parentName:"p"},"actionDispatcher")," map as described\nabove."))}c.isMDXComponent=!0}}]);