"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[9474],{45128:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>i,contentTitle:()=>s,default:()=>y,frontMatter:()=>t,metadata:()=>d,toc:()=>r});var a=n(58168),l=(n(96540),n(15680));n(41873);const t={},s="Using Modals",d={unversionedId:"frontend/guides/using-modals",id:"frontend/guides/using-modals",title:"Using Modals",description:"History",source:"@site/docs/frontend/guides/using-modals.md",sourceDirName:"frontend/guides",slug:"/frontend/guides/using-modals",permalink:"/mymove-docs/docs/frontend/guides/using-modals",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/frontend/guides/using-modals.md",tags:[],version:"current",frontMatter:{},sidebar:"frontendSidebar",previous:{title:"How to Track New Events in Move History",permalink:"/mymove-docs/docs/frontend/guides/how-to-add-move-history-events"},next:{title:"Front-end / React Guide",permalink:"/mymove-docs/docs/frontend/testing/frontend"}},i={},r=[{value:"History",id:"history",level:2},{value:"Using Modal",id:"using-modal",level:2},{value:"MyModal Example",id:"mymodal-example",level:3},{value:"Using MyModal Example",id:"using-mymodal-example",level:3},{value:"Testing MyModal",id:"testing-mymodal",level:3},{value:"Storybook MyModal",id:"storybook-mymodal",level:3},{value:"Resources",id:"resources",level:2}],m={toc:r},M="wrapper";function y(e){let{components:o,...n}=e;return(0,l.yg)(M,(0,a.A)({},m,n,{components:o,mdxType:"MDXLayout"}),(0,l.yg)("h1",{id:"using-modals"},"Using Modals"),(0,l.yg)("h2",{id:"history"},"History"),(0,l.yg)("p",null,"In a previous era, ",(0,l.yg)("inlineCode",{parentName:"p"},"src/components/Modal/Modal.jsx")," would import from React USWDS's modal.\nHowever, React USWDS decided to no longer support modals.\nAs a result, MilMove copied all the code from React USWDS' modal and placed it into ",(0,l.yg)("inlineCode",{parentName:"p"},"src/components/MigratedModal/MigratedModal.jsx"),"."),(0,l.yg)("h2",{id:"using-modal"},"Using Modal"),(0,l.yg)("p",null,(0,l.yg)("inlineCode",{parentName:"p"},"src/components/Modal/Modal.jsx")," should be used, and ",(0,l.yg)("strong",{parentName:"p"},"not")," ",(0,l.yg)("inlineCode",{parentName:"p"},"src/components/MigratedModal/MigratedModal.jsx"),".\nAt no point in time should folks be importing from ",(0,l.yg)("inlineCode",{parentName:"p"},"MigratedModal"),"."),(0,l.yg)("h3",{id:"mymodal-example"},"MyModal Example"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-js"},'import styles from "./MyModal.module.scss";\n\nimport Modal, {\n  ModalActions,\n  ModalClose,\n  ModalTitle,\n  connectModal,\n} from "components/Modal/Modal";\n\n// MyModal should also be exported by itself so that you can import it as is\n// without the overlay and the modal container. This is useful for both testing\n// and storybook.\nexport const MyModal = ({ onClose }) => {\n  return (\n    <Modal className={styles.whateverStylesYouWant}>\n      <ModalClose handleClick={() => onClose()} />\n      <ModalTitle>\n        <h4>My Modal</h4>\n      </ModalTitle>\n      My Modal Content\n      <ModalActions>\n        {/*There is usually another action button, but it has been left out of\n        this example since I wanted to highlight is how this button passes a\n        function that calls onClose as the onClick handler.*/}\n        <Button type="button" secondary onClick={() => onClose()}>\n          Back\n        </Button>\n      </ModalActions>\n    </Modal>\n  );\n};\n\nMyModal.propTypes = {\n  onCLose: PropTypes.func.isRequired,\n};\n\n// It is important to have this display name so that connectModal knows how to\n// re-export the modal. This modal will then be imported as ConnectedMyModal.\nMyModal.displayName = "MyModal";\n\nexport default connectModal(MyModal);\n')),(0,l.yg)("h3",{id:"using-mymodal-example"},"Using MyModal Example"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-js"},"import React, {useState} from 'React';\n\nimport ConnectedMyModal from './MyModal'\n\nconst ComponentThatUsesMyModal = () => {\n  const [myModalIsVisible, setMyModalIsVisible] = useState(false);\n\n  const handleOpenMyModal = () => {\n    setMyModalIsVisible(true)\n  }\n\n  const handleCloseMyModal = () => {\n    setMyModalIsVisible(false)\n  }\n\n  return (\n    <>\n      <Button type=\"button\" onClick={() => handleOpenMyModal()}>\n      {/* The isOpen prop is passed down through Modal to Migrated modal and\n      determines whether to return the modal component or return null.*/}\n      <ConnectedMyModal isOpen={myModalIsVisible} onClose={handleCLoseMyModal}/>\n    </>\n  )\n}\n")),(0,l.yg)("h3",{id:"testing-mymodal"},"Testing MyModal"),(0,l.yg)("p",null,"Imports for testing MyModal should work as follows."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-js"},'import { MyModal } from "./MyModal";\n')),(0,l.yg)("h3",{id:"storybook-mymodal"},"Storybook MyModal"),(0,l.yg)("p",null,"Imports for MyModal in Storybook should work as follows."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-js"},'import { MyModal } from "./MyModal";\n')),(0,l.yg)("h2",{id:"resources"},"Resources"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("a",{parentName:"li",href:"https://github.com/transcom/mymove/blob/main/src/components/EulaModal/index.jsx"},(0,l.yg)("inlineCode",{parentName:"a"},"EulaModal"))," is a live example of how this all works inside MilMove."),(0,l.yg)("li",{parentName:"ul"},(0,l.yg)("a",{parentName:"li",href:"https://github.com/transcom/mymove/blob/main/src/pages/SignIn/SignIn.jsx"},(0,l.yg)("inlineCode",{parentName:"a"},"SignIn"))," demonstrates how ",(0,l.yg)("inlineCode",{parentName:"li"},"EulaModal")," gets used.")))}y.isMDXComponent=!0}}]);