"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[5657],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var i=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=i.createContext({}),c=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=c(e.components);return i.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=c(n),d=a,h=m["".concat(l,".").concat(d)]||m[d]||u[d]||r;return n?i.createElement(h,s(s({ref:t},p),{},{components:n})):i.createElement(h,s({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,s=new Array(r);s[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:a,s[1]=o;for(var c=2;c<r;c++)s[c]=n[c];return i.createElement.apply(null,s)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},63559:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return m}});var i=n(87462),a=n(63366),r=(n(67294),n(3905)),s=["components"],o={sidebar_position:11},l="Testing best practices",c={unversionedId:"backend/testing/testing-best-practices",id:"backend/testing/testing-best-practices",isDocsHomePage:!1,title:"Testing best practices",description:"General guidelines",source:"@site/docs/backend/testing/testing-best-practices.md",sourceDirName:"backend/testing",slug:"/backend/testing/testing-best-practices",permalink:"/mymove-docs/docs/backend/testing/testing-best-practices",editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/backend/testing/testing-best-practices.md",tags:[],version:"current",sidebarPosition:11,frontMatter:{sidebar_position:11},sidebar:"backendSidebar",previous:{title:"Test data generation",permalink:"/mymove-docs/docs/backend/testing/test-data-generation"},next:{title:"Testing payment requests",permalink:"/mymove-docs/docs/backend/testing/testing-payment-requests-for-domestic-sit-service-items"}},p=[{value:"General guidelines",id:"general-guidelines",children:[]},{value:"Examples of tests that will pass when they should fail",id:"examples-of-tests-that-will-pass-when-they-should-fail",children:[{value:"Using NotEqual",id:"using-notequal",children:[]},{value:"Not checking the length of an array before iterating through it",id:"not-checking-the-length-of-an-array-before-iterating-through-it",children:[]}]}],u={toc:p};function m(e){var t=e.components,n=(0,a.Z)(e,s);return(0,r.kt)("wrapper",(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"testing-best-practices"},"Testing best practices"),(0,r.kt)("h2",{id:"general-guidelines"},"General guidelines"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Be explicit when verifying values"),(0,r.kt)("li",{parentName:"ul"},"Avoid ",(0,r.kt)("inlineCode",{parentName:"li"},"NotEqual")," or ",(0,r.kt)("inlineCode",{parentName:"li"},"NotNil")," tests because they can lead to a false sense of security. Prefer testing for specific values with ",(0,r.kt)("inlineCode",{parentName:"li"},"Equal")," or ",(0,r.kt)("inlineCode",{parentName:"li"},"Nil"),"."),(0,r.kt)("li",{parentName:"ul"},"Before iterating through a range, make sure that the range is not empty first."),(0,r.kt)("li",{parentName:"ul"},"When verifying an expected error, you ",(0,r.kt)("strong",{parentName:"li"},"must")," check the type of the error, and if necessary, the contents of the error message. ",(0,r.kt)("inlineCode",{parentName:"li"},"suite.Error(err)")," or ",(0,r.kt)("inlineCode",{parentName:"li"},"suite.NotNil(err)")," is not enough because they can result in false positives of false negatives."),(0,r.kt)("li",{parentName:"ul"},"Do not write a huge setup with subtests that reference variables several lines above the subtest. Create a separate setup for each test for readability."),(0,r.kt)("li",{parentName:"ul"},"Subtests must be able to run in isolation. You can verify this with Goland, which makes it easy to run individual subtests."),(0,r.kt)("li",{parentName:"ul"},"Avoid ",(0,r.kt)("inlineCode",{parentName:"li"},"mock.anything"),". Part of mocking is to ensure that the object that is mocked has been called with the right arguments. If a handler is supposed to call a service object with a specific model ID, then if you use ",(0,r.kt)("inlineCode",{parentName:"li"},"mock.anything")," in the test and you introduce a bug in the handler where it passes in the wrong ID, the test will still pass. If you find it hard to avoid using ",(0,r.kt)("inlineCode",{parentName:"li"},"mock.anything"),", it's most likely a sign the code under test is not designed properly."),(0,r.kt)("li",{parentName:"ul"},"Always validate ",(0,r.kt)("inlineCode",{parentName:"li"},"Params")," in handlers using ",(0,r.kt)("inlineCode",{parentName:"li"},"suite.NoError(params.Body.Validate(strfmt.Default))"))),(0,r.kt)("h2",{id:"examples-of-tests-that-will-pass-when-they-should-fail"},"Examples of tests that will pass when they should fail"),(0,r.kt)("h3",{id:"using-notequal"},"Using NotEqual"),(0,r.kt)("p",null,"This test below is supposed to verify that if a service item has an existing ",(0,r.kt)("inlineCode",{parentName:"p"},"RejectionReason"),", and if the service item is approved, it should no longer have a ",(0,r.kt)("inlineCode",{parentName:"p"},"RejectionReason"),". The way the test is making that verification is by asserting that the updated service item's ",(0,r.kt)("inlineCode",{parentName:"p"},"RejectionReason")," is not equal to the one it had at the beginning of the test. This is not a valid test because if the code changed to set the ",(0,r.kt)("inlineCode",{parentName:"p"},"RejectionReason")," to any value that is not the original one, the test would pass, but we expect it to fail. Instead, we should assert that the ",(0,r.kt)("inlineCode",{parentName:"p"},"RejectionReason")," is ",(0,r.kt)("inlineCode",{parentName:"p"},"nil"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-golang"},'func (suite *HandlerSuite) TestUpdateMTOServiceItemStatusHandlerApproveSuccess() {\n    mtoServiceItem := suite.createServiceItem()\n    mtoServiceItem.Status = models.MTOServiceItemStatusApproved\n    reason := "should not update reason"\n    mtoServiceItem.RejectionReason = &reason\n\n    request := httptest.NewRequest("PATCH", "/service-items/{mtoServiceItemID}/status", nil)\n    params := mtoserviceitemop.UpdateMTOServiceItemStatusParams{\n    HTTPRequest:      request,\n    MtoServiceItemID: mtoServiceItem.ID.String(),\n    Body:             payloads.MTOServiceItem(&mtoServiceItem),\n    IfMatch:          etag.GenerateEtag(mtoServiceItem.UpdatedAt),\n    }\n\n    // rest of handler boilerplate goes here\n\n    suite.NotEqual(mtoServiceItemPayload.RejectionReason, reason)\n}\n')),(0,r.kt)("p",null,"There is another issue with the test above. Can you spot it?"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"RejectionReason")," is not being saved to the database, and so it will always be ",(0,r.kt)("inlineCode",{parentName:"p"},"nil")," in the payload. If you comment out the code in the service that sets the ",(0,r.kt)("inlineCode",{parentName:"p"},"RejectionReason")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"nil"),", the test will still pass, which is not good. Here is what the test should look like:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-golang"},'func (suite *HandlerSuite) TestUpdateMTOServiceItemStatusHandlerApproveSuccess() {\n    mtoServiceItem := suite.createServiceItem()\n    reason := "should not update reason"\n    mtoServiceItem.RejectionReason = &reason\n    suite.MustSave(&mtoServiceItem)\n    mtoServiceItem.Status = models.MTOServiceItemStatusApproved\n\n    request := httptest.NewRequest("PATCH", "/service-items/{mtoServiceItemID}/status", nil)\n    params := mtoserviceitemop.UpdateMTOServiceItemStatusParams{\n    HTTPRequest:      request,\n    MtoServiceItemID: mtoServiceItem.ID.String(),\n    Body:             payloads.MTOServiceItem(&mtoServiceItem),\n    IfMatch:          etag.GenerateEtag(mtoServiceItem.UpdatedAt),\n    }\n\n    // rest of handler boilerplate goes here\n\n    suite.Nil(mtoServiceItemPayload.RejectionReason)\n}\n')),(0,r.kt)("h3",{id:"not-checking-the-length-of-an-array-before-iterating-through-it"},"Not checking the length of an array before iterating through it"),(0,r.kt)("p",null,"In this test below, if the ",(0,r.kt)("inlineCode",{parentName:"p"},"UpdateMTOShipmentStatus")," function is refactored and\nstops returning service items, the test will still pass. If\nthe ",(0,r.kt)("inlineCode",{parentName:"p"},"serviceItems")," array is empty, the code inside the ",(0,r.kt)("inlineCode",{parentName:"p"},"for")," loop will\nnot be executed."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-golang"},'suite.T().Run("Create approved service items when the mtoShipment is approved", func(t *testing.T) {\n    shipmentForAutoApproveEtag := etag.GenerateEtag(shipmentForAutoApprove.UpdatedAt)\n    serviceItems := models.MTOServiceItems{}\n\n    _, err := updater.UpdateMTOShipmentStatus(shipmentForAutoApprove.ID, status, nil, shipmentForAutoApproveEtag)\n    suite.NoError(err)\n\n    err = suite.DB().Where("mto_shipment_id = ?", shipmentForAutoApprove.ID).All(&serviceItems)\n    suite.NoError(err)\n\n    // If we\'ve gotten the shipment updated and fetched it without error then we can inspect the\n    // service items created as a side effect to see if they are approved.\n    for _, serviceItem := range serviceItems {\n        suite.Equal(models.MTOServiceItemStatusApproved, serviceItem.Status)\n    }\n}\n')),(0,r.kt)("p",null,"To make this test more robust, first make sure the ",(0,r.kt)("inlineCode",{parentName:"p"},"serviceItems")," array contains the expected amount of items:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-golang"},"suite.Equal(6, len(serviceItems))\n")))}m.isMDXComponent=!0}}]);