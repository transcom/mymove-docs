"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[1552],{10384:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>g,frontMatter:()=>o,metadata:()=>r,toc:()=>d});var a=n(45072),i=(n(11504),n(95788));n(10880);const o={sidebar_position:2},s="Getting Started",r={unversionedId:"backend/guides/service-objects/getting-started",id:"backend/guides/service-objects/getting-started",title:"Getting Started",description:"These docs will go through the process of creating a new set of service objects, but the info in each section should",source:"@site/docs/backend/guides/service-objects/getting-started.md",sourceDirName:"backend/guides/service-objects",slug:"/backend/guides/service-objects/getting-started",permalink:"/mymove-docs/docs/backend/guides/service-objects/getting-started",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/backend/guides/service-objects/getting-started.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"backendSidebar",previous:{title:"Overview",permalink:"/mymove-docs/docs/backend/guides/service-objects/overview"},next:{title:"Structure",permalink:"/mymove-docs/docs/backend/guides/service-objects/structure"}},c={},d=[{value:"Fictional Models",id:"fictional-models",level:2},{value:"Creating Service Objects",id:"creating-service-objects",level:2}],l={toc:d},p="wrapper";function g(e){let{components:t,...n}=e;return(0,i.yg)(p,(0,a.c)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"getting-started"},"Getting Started"),(0,i.yg)("p",null,"These docs will go through the process of creating a new set of service objects, but the info in each section should\nbe applicable whether you're creating a new service object or editing an existing one. "),(0,i.yg)("p",null,"The docs will be using fictional models and associated service objects to make it less likely that there will be\ndrift between what you see here and what is in the ",(0,i.yg)("inlineCode",{parentName:"p"},"mymove")," codebase (since none of the code here will actually be\nin the codebase)."),(0,i.yg)("h2",{id:"fictional-models"},"Fictional Models"),(0,i.yg)("p",null,"For reference, here are the fictional models we'll be working with. They come from our\n",(0,i.yg)("a",{parentName:"p",href:"/docs/backend/setup/database-migrations"},"docs on db migrations")," so if you'd like to follow along, you can get the\ncorresponding migrations from those docs."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-go",metastring:'title="pkg/models/pet.go"',title:'"pkg/models/pet.go"'},'package models\n\nimport (\n    "time"\n\n    "github.com/gofrs/uuid"\n\n    "github.com/transcom/mymove/pkg/unit"\n)\n\ntype PetType string\n\nconst (\n    // PetTypeCat captures the enum value "CAT"\n    PetTypeCat PetType = "CAT"\n    // PetTypeDog captures the enum value "DOG"\n    PetTypeDog PetType = "DOG"\n    // PetTypeFish captures the enum value "FISH"\n    PetTypeFish PetType = "FISH"\n    // PetTypeGuineaPig captures the enum value "GUINEA_PIG"\n    PetTypeGuineaPig PetType = "GUINEA_PIG"\n    // PetTypeHamster captures the enum value "HAMSTER"\n    PetTypeHamster PetType = "HAMSTER"\n    // PetTypeOther captures the enum value "OTHER"\n    PetTypeOther PetType = "OTHER"\n    // PetTypeRat captures the enum value "RAT"\n    PetTypeRat PetType = "RAT"\n    // PetTypeSnake captures the enum value "SNAKE"\n    PetTypeSnake PetType = "SNAKE"\n    // PetTypeTurtle captures the enum value "TURTLE"\n    PetTypeTurtle PetType = "TURTLE"\n)\n\n// Pet contains all the information relevant to a pet...\ntype Pet struct {\n    ID        uuid.UUID   `json:"id" db:"id"`\n    CreatedAt time.Time   `json:"created_at" db:"created_at"`\n    UpdatedAt time.Time   `json:"updated_at" db:"updated_at"`\n    Type      PetType     `json:"type" db:"type"`\n    Name      string      `json:"name" db:"name"`\n    Birthday  *time.Time  `json:"birthday" db:"birthday"`\n    GotchaDay *time.Time  `json:"gotcha_day" db:"gotcha_day"`\n    Bio       *string     `json:"bio" db:"bio"`\n    Weight    *unit.Pound `json:"weight" db:"weight"`\n    Cat       *Cat        `has_one:"cats" fk_id:"pet_id"`\n}\n\n// Pets is a list of Pets\ntype Pets []Pet\n')),(0,i.yg)("p",null,"and "),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-go",metastring:'title="pkg/models/cat.go"',title:'"pkg/models/cat.go"'},'package models\n\nimport (\n    "time"\n\n    "github.com/gofrs/uuid"\n)\n\n// Cat contains all the information relevant to a cat...\ntype Cat struct {\n    ID                       uuid.UUID `json:"id" db:"id"`\n    PetID                    uuid.UUID `json:"pet_id" db:"pet_id"`\n    Pet                      Pet       `belongs_to:"pets" fk_id:"pet_id"`\n    CreatedAt                time.Time `json:"created_at" db:"created_at"`\n    UpdatedAt                time.Time `json:"updated_at" db:"updated_at"`\n    LikesCatnip              *bool     `json:"likes_catnip" db:"likes_catnip"`\n    FavoriteCatnipBrand      *string   `json:"favorite_catnip_brand" db:"favorite_catnip_brand"`\n    FavoriteCatScratcherType *string   `json:"favorite_cat_scratcher_type" db:"favorite_cat_scratcher_type"`\n}\n\n// Cats is a list of Cats\ntype Cats []Cat\n')),(0,i.yg)("h2",{id:"creating-service-objects"},"Creating Service Objects"),(0,i.yg)("p",null,"Now that we have our model, we can start creating our new service objects."),(0,i.yg)("p",null,"We'll be creating a service object to create pets, and one to update pets. Once we start thinking about our ",(0,i.yg)("inlineCode",{parentName:"p"},"Cat"),"\nmodel though, we'll find the need to introduce a set of orchestrator service objects. This is because when we create\na ",(0,i.yg)("inlineCode",{parentName:"p"},"Cat"),", we'll want a corresponding ",(0,i.yg)("inlineCode",{parentName:"p"},"Pet")," to be created first and when we update a ",(0,i.yg)("inlineCode",{parentName:"p"},"Cat"),", there may be changes to\nthe ",(0,i.yg)("inlineCode",{parentName:"p"},"Pet")," too. The orchestrators will serve to make sure things are called when needed and in the right order."),(0,i.yg)("p",null,"We'll go through the following:"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("a",{parentName:"li",href:"structure"},"Learn about service object file structure")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("a",{parentName:"li",href:"set-up-service-subpackage-and-interface"},"Set up service subpackage and interface")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("a",{parentName:"li",href:"validation"},"Set up validation pattern")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("a",{parentName:"li",href:"implementation"},"Implement the service objects")," "),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("a",{parentName:"li",href:"usage"},"Using service objects"))))}g.isMDXComponent=!0}}]);