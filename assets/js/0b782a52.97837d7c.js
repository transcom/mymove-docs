"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[4928],{33691:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var s=n(87462),a=(n(67294),n(3905));n(61839);const i={sidebar_position:8},o="Interacting with the database in Go server tests",r={unversionedId:"backend/testing/interacting-with-the-db-in-go-server-tests",id:"backend/testing/interacting-with-the-db-in-go-server-tests",title:"Interacting with the database in Go server tests",description:"Background",source:"@site/docs/backend/testing/interacting-with-the-db-in-go-server-tests.md",sourceDirName:"backend/testing",slug:"/backend/testing/interacting-with-the-db-in-go-server-tests",permalink:"/mymove-docs/docs/backend/testing/interacting-with-the-db-in-go-server-tests",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/backend/testing/interacting-with-the-db-in-go-server-tests.md",tags:[],version:"current",sidebarPosition:8,frontMatter:{sidebar_position:8},sidebar:"backendSidebar",previous:{title:"How to write fast tests",permalink:"/mymove-docs/docs/backend/testing/how-to-write-fast-tests"},next:{title:"Running server tests inside a transaction",permalink:"/mymove-docs/docs/backend/testing/running-server-tests-inside-a-transaction"}},l={},c=[{value:"Background",id:"background",level:2},{value:"Cleaning the DB in between tests",id:"cleaning-the-db-in-between-tests",level:3},{value:"Testing associations on models",id:"testing-associations-on-models",level:3}],d={toc:c};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,s.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"interacting-with-the-database-in-go-server-tests"},"Interacting with the database in Go server tests"),(0,a.kt)("h2",{id:"background"},"Background"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"mymove")," repo uses the DB in some particular ways that might be surprising to folks who are new to Golang. Here are some things to be aware of that might trip you up if you have a background in Rails, RSpec, and ActiveRecord."),(0,a.kt)("h3",{id:"cleaning-the-db-in-between-tests"},"Cleaning the DB in between tests"),(0,a.kt)("p",null,"When writing tests that interact with the database, we want to start with a clean slate at the beginning of each test so that data from one test doesn't affect data in another test. Ideally, every test would be run inside a transaction, and the DB would automatically roll back to a clean state. This is how RSpec and Rails system tests work, as an example of industry best practices. The way MilMove is currently configured, we have to truncate the DB manually, which is one of the reasons our server tests are slow."),(0,a.kt)("p",null,"In order to allow tests from multiple packages to run in parallel (which is one way to speed up the tests), we have to create a separate copy of the DB for each package. This happens in ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/transcom/mymove/blob/master/pkg/testingsuite/pop_suite.go"},"pop_suite.go")," and was introduced in ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/transcom/mymove/pull/1776"},"this PR"),". In order to take advantage of this, a package must define test setup functions in a separate file that defines the test suite ",(0,a.kt)("inlineCode",{parentName:"p"},"type"),", and that other tests in the same package can use. For example, the test setup for the ",(0,a.kt)("inlineCode",{parentName:"p"},"move")," service in ",(0,a.kt)("inlineCode",{parentName:"p"},"pkg/services/move")," is in ",(0,a.kt)("inlineCode",{parentName:"p"},"pkg/services/move/move_services_test.go"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-golang"},'package move\n\nimport (\n    "testing"\n\n    "github.com/stretchr/testify/suite"\n    "go.uber.org/zap"\n\n    "github.com/transcom/mymove/pkg/testingsuite"\n)\n\ntype MoveServiceSuite struct {\n    testingsuite.PopTestSuite\n    logger Logger\n}\n\nfunc TestMoveServiceSuite(t *testing.T) {\n    ts := &MoveServiceSuite{\n        PopTestSuite: testingsuite.NewPopTestSuite(testingsuite.CurrentPackage()),\n    logger:       zap.NewNop(), // Use a no-op logger during testing\n    }\n    suite.Run(t, ts)\n    ts.PopTestSuite.TearDown()\n}\n')),(0,a.kt)("p",null,"Other tests within this package will then use the ",(0,a.kt)("inlineCode",{parentName:"p"},"MoveServiceSuite")," type, such as in ",(0,a.kt)("inlineCode",{parentName:"p"},"pkg/services/move/move_list_fetcher_test.go"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-golang"},"func (suite *MoveServiceSuite) TestFetchMoveList() {\n  ...\n}\n")),(0,a.kt)("p",null,"Note that with this config, the DB will ",(0,a.kt)("strong",{parentName:"p"},"not")," get truncated in between tests, which can lead to confusion, and wasted time debugging. In this case, ",(0,a.kt)("inlineCode",{parentName:"p"},"move_list_fetcher_test.go")," is the only test in this package, and it only has one function, so the lack of truncation isn't a problem. For now. Save yourself the trouble, and add a ",(0,a.kt)("inlineCode",{parentName:"p"},"SetupTest")," function to truncate the DB in between tests. Most tests already have this function, but if you're adding a new service, you'll need to add it:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-golang"},"func (suite *MoveServiceSuite) SetupTest() {\n    err := suite.TruncateAll()\n    suite.FatalNoError(err)\n}\n")),(0,a.kt)("p",null,"Another very important note is that the DB will only be truncated in between functions in tests. It will ",(0,a.kt)("strong",{parentName:"p"},"not")," be truncated in between subtests within the same function. Coming from RSpec, this was surprising to me and has tripped me up several times. Here is an example of subtests that begin with ",(0,a.kt)("inlineCode",{parentName:"p"},"suite.T().Run"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-golang"},'func (suite *MoveOrderServiceSuite) TestListMoves() {\n    // Create a Move without a shipment to test that only Orders with shipments\n    // are displayed to the TOO\n    testdatagen.MakeDefaultMove(suite.DB())\n\n    expectedMove := testdatagen.MakeHHGMoveWithShipment(suite.DB(), testdatagen.Assertions{})\n\n    officeUser := testdatagen.MakeDefaultOfficeUser(suite.DB())\n\n    moveOrderFetcher := NewMoveOrderFetcher(suite.DB())\n\n    suite.T().Run("returns moves", func(t *testing.T) {\n      moves, _, err := moveOrderFetcher.ListMoveOrders(officeUser.ID, &services.ListMoveOrderParams{PerPage: swag.Int64(1), Page: swag.Int64(1)})\n\n      suite.FatalNoError(err)\n      suite.Len(moves, 1)\n    })\n\n    suite.T().Run("returns moves filtered by GBLOC", func(t *testing.T) {\n      // This move is outside of the office user\'s GBLOC, and should not be returned\n      testdatagen.MakeHHGMoveWithShipment(suite.DB(), testdatagen.Assertions{\n        TransportationOffice: models.TransportationOffice{\n          Gbloc: "AGFM",\n        },\n      })\n\n      moves, _, err := moveOrderFetcher.ListMoveOrders(officeUser.ID, &services.ListMoveOrderParams{PerPage: swag.Int64(1), Page: swag.Int64(1)})\n\n      suite.FatalNoError(err)\n      suite.Equal(1, len(moves))\n    })\n}\n')),(0,a.kt)("p",null,"In the test above, the second subtest keeps in mind that the data from the previous subtest still exists in the DB, and adjusts the expected payload length accordingly. Subtests allow for more expressive test descriptions, so their use is encouraged, but if there are more than 2 subtests that depend on the DB, it's best to avoid confusion and clear the DB manually by calling ",(0,a.kt)("inlineCode",{parentName:"p"},"suite.TruncateAll()")," at the beginning of each subtest after the first one."),(0,a.kt)("h3",{id:"testing-associations-on-models"},"Testing associations on models"),(0,a.kt)("p",null,"If you're writing an integration test that verifies that a model was created, and you also want to check attributes on associations, you have to load the associations manually. Pop, unlike ActiveRecord, does not automatically load associations."),(0,a.kt)("p",null,"For example, let's say we want to verify that service items were created in the DB, and then iterate through them to make sure the ",(0,a.kt)("inlineCode",{parentName:"p"},"Code")," in the ",(0,a.kt)("inlineCode",{parentName:"p"},"ReService")," association was properly created. If we do it like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-golang"},'var expectedReServiceCodes []models.ReServiceCode\nexpectedReServiceCodes = append(expectedReServiceCodes,\n  models.ReServiceCodeDLH,\n  models.ReServiceCodeFSC,\n  models.ReServiceCodeDOP,\n  models.ReServiceCodeDDP,\n  models.ReServiceCodeDPK,\n  models.ReServiceCodeDUPK,\n)\n\nerr = suite.DB().Where("mto_shipment_id = ?", shipmentForAutoApprove.ID).All(&serviceItems)\n\nfor i := range serviceItems {\n   suite.Equal(expectedReServiceCodes[i], serviceItems[i].ReService.Code)\n}\n')),(0,a.kt)("p",null,"the test will fail by saying that the actual Code is an empty string, which is misleading because it makes it sound like it was able to fetch the associated ReService."),(0,a.kt)("p",null,"The solution is to load the association first. There are two ways to do this:"),(0,a.kt)("p",null,"Using ",(0,a.kt)("inlineCode",{parentName:"p"},"Eager")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"EagerPreload"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-golang"},'err = suite.DB().EagerPreload("ReService").Where("mto_shipment_id = ?", shipmentForAutoApprove.ID).All(&serviceItems)\n')),(0,a.kt)("p",null,"Or by using Pop's ",(0,a.kt)("inlineCode",{parentName:"p"},"Load")," function. You can either Load them all:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-golang"},'err = suite.DB().Where("mto_shipment_id = ?", shipmentForAutoApprove.ID).All(&serviceItems)\nsuite.DB().Load(&serviceItems)\n')),(0,a.kt)("p",null,"Or just the one(s) you want:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-golang"},'err = suite.DB().Where("mto_shipment_id = ?", shipmentForAutoApprove.ID).All(&serviceItems)\nsuite.DB().Load(&serviceItems, "ReService")\n')))}u.isMDXComponent=!0}}]);