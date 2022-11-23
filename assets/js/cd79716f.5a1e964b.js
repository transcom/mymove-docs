"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[9186],{42905:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var a=o(87462),n=(o(67294),o(3905));o(16758);const i={},s="Happo",r={unversionedId:"tools/cicd/happo",id:"tools/cicd/happo",title:"Happo",description:"There is more information on Happo and how it's used in",source:"@site/docs/tools/cicd/happo.md",sourceDirName:"tools/cicd",slug:"/tools/cicd/happo",permalink:"/mymove-docs/docs/tools/cicd/happo",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/tools/cicd/happo.md",tags:[],version:"current",frontMatter:{},sidebar:"toolsSidebar",previous:{title:"GitHub Actions",permalink:"/mymove-docs/docs/tools/cicd/github_actions"},next:{title:"Integration Test Failures",permalink:"/mymove-docs/docs/tools/cicd/integration_test_failures"}},p={},c=[{value:"What to do with Happo Errors",id:"what-to-do-with-happo-errors",level:2},{value:"False Errors",id:"false-errors",level:2},{value:"Interactive Stories",id:"interactive-stories",level:2}],l={toc:c};function d(e){let{components:t,...o}=e;return(0,n.kt)("wrapper",(0,a.Z)({},l,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"happo"},"Happo"),(0,n.kt)("admonition",{title:"More Happo documentation",type:"info"},(0,n.kt)("p",{parentName:"admonition"},"There is ",(0,n.kt)("a",{parentName:"p",href:"/mymove-docs/docs/frontend/testing/frontend",title:"More Happo documentation"},"more information on Happo")," and how it's used in\nour Storybook Testing Frontend Testing section.")),(0,n.kt)("p",null,"Happo is a UI diff checker tool that helps compare the UI pages from branches to master. When styling changes have been made, Happo notifies that a diff has occured and asks a reviewer to review the Happo changes before allowing the PR to be merged in."),(0,n.kt)("h2",{id:"what-to-do-with-happo-errors"},"What to do with Happo Errors"),(0,n.kt)("p",null,"When your CI/CD build has begun, you can view the status of the Happo under the CI/CD pipeline"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/84801109/141024060-32ff4825-b2b5-47e4-a281-682f6371a2d2.png",alt:"image"})),(0,n.kt)("p",null,"If the Happo check has failed, you must review the changes. You will see a list of diffs that will need to be reviewed/resolved before the Happo check can be approved."),(0,n.kt)("p",null,"For example, you may have changed title content like this:"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/84801109/141023978-2dd94167-93fe-4add-9e4e-c739fece0006.png",alt:"image"})),(0,n.kt)("p",null,"After reviewing this, you may ",(0,n.kt)("inlineCode",{parentName:"p"},"accept")," or ",(0,n.kt)("inlineCode",{parentName:"p"},"reject")," the changes. When it is accepted, the CI/CD Happo step will be approved."),(0,n.kt)("h2",{id:"false-errors"},"False Errors"),(0,n.kt)("p",null,"Occasionally, Happo misinterprets a diff when one has not actually occured."),(0,n.kt)("p",null,"When pushing to Happo, you may notice that some diff checking are barely off by pixels.  You can ignore these types of diff errors. An example of this can be shown in the below image"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/84801109/141023587-28176a4a-0fc2-4510-ba09-29b9fb4f0634.png",alt:"image"})),(0,n.kt)("p",null,"In this picture, the change is negligible, and nothing significant about the page. You can click ",(0,n.kt)("inlineCode",{parentName:"p"},"review"),", then ",(0,n.kt)("inlineCode",{parentName:"p"},"accept")," to pass the Happo check."),(0,n.kt)("h2",{id:"interactive-stories"},"Interactive Stories"),(0,n.kt)("p",null,"Storybook stories can be created with ",(0,n.kt)("a",{parentName:"p",href:"https://storybook.js.org/docs/react/writing-stories/play-function"},(0,n.kt)("inlineCode",{parentName:"a"},"play")," functions"),", which allow for Testing Library-style commands that interact with page elements, and execute immediately after a story renders. These functions can be used to get components into a specific state. While they can be useful for developers and designers, ",(0,n.kt)("strong",{parentName:"p"},"Happo generally has issues displaying stories with these functions"),". If you create a story with a ",(0,n.kt)("inlineCode",{parentName:"p"},"play")," function, turn off Happo for it using ",(0,n.kt)("inlineCode",{parentName:"p"},"happo: false")," in a ",(0,n.kt)("inlineCode",{parentName:"p"},"parameters")," property."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-jsx"},"ErrorDatesAndLocation.play = async ({ canvasElement }) => {\n  const canvas = within(canvasElement);\n\n  await expect(canvas.getByRole('button', { name: 'Save & Continue' })).toBeEnabled();\n\n  await userEvent.click(canvas.getByRole('button', { name: 'Save & Continue' }));\n};\n\nErrorDatesAndLocation.parameters = {\n  happo: false,\n};\n")))}d.isMDXComponent=!0}}]);