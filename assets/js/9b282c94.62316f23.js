"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[2160],{50544:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var n=a(45072),i=(a(11504),a(95788));a(10880);const o={},r="Database",l={unversionedId:"getting-started/development/database",id:"getting-started/development/database",title:"Database",description:"Read Querying the Database Safely to prevent SQL injections!",source:"@site/docs/getting-started/development/database.md",sourceDirName:"getting-started/development",slug:"/getting-started/development/database",permalink:"/mymove-docs/docs/getting-started/development/database",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/getting-started/development/database.md",tags:[],version:"current",frontMatter:{},sidebar:"gettingStartedSidebar",previous:{title:"Creating Alternative Users with the Same Email Address",permalink:"/mymove-docs/docs/getting-started/development/creating-alternative-users-with-the-same-email-address"},next:{title:"Documentation",permalink:"/mymove-docs/docs/getting-started/development/documentation"}},s={},d=[{value:"Dev DB Commands",id:"dev-db-commands",level:2},{value:"Test DB Commands",id:"test-db-commands",level:2},{value:"Migrations",id:"migrations",level:2}],m={toc:d},g="wrapper";function p(e){let{components:t,...a}=e;return(0,i.yg)(g,(0,n.c)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"database"},"Database"),(0,i.yg)("admonition",{type:"caution"},(0,i.yg)("p",{parentName:"admonition"},"Read ",(0,i.yg)("a",{parentName:"p",href:"https://transcom.github.io/mymove-docs/docs/dev/contributing/backend/Backend-Programming-Guide/#querying-the-database-safely"},"Querying the Database Safely")," to prevent SQL injections!")),(0,i.yg)("p",null,"A few commands exist for starting and stopping the DB docker container:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_run"),": Starts the DB docker container if one doesn't already exist"),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_destroy"),": Stops and removes the DB docker container")),(0,i.yg)("h2",{id:"dev-db-commands"},"Dev DB Commands"),(0,i.yg)("p",null,"There are a few handy targets in the Makefile to help you interact with the dev\ndatabase. During your day-to-day, the only one you will typically need regularly\nis ",(0,i.yg)("inlineCode",{parentName:"p"},"make db_dev_e2e_populate"),". The others are for reference, or if something\ngoes wrong."),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_dev_e2e_populate"),": Populates the dev DB with data to facilitate\nverification of your work when using the app locally. It seeds the DB with various\nservice members at different stages of the onboarding process, various office\nusers, moves, payment requests, etc. The data is defined in the ",(0,i.yg)("inlineCode",{parentName:"li"},"devseed.go")," file."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_dev_run"),": Initializes a new database if it does not exist and runs it,\nor starts the previously initialized Docker container if it has been stopped.\nYou typically only need this after a computer restart, or if you manually quit\nDocker or otherwise stopped the DB."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_dev_create"),": Waits to connect to the DB and will create a DB if one\ndoesn't already exist (this is automatically run as part of ",(0,i.yg)("inlineCode",{parentName:"li"},"db_dev_run"),")."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_dev_fresh"),": Destroys your database container, runs the DB, and\napplies the migrations. Useful if you want to start from scratch when the DB is\nnot working properly. This runs ",(0,i.yg)("inlineCode",{parentName:"li"},"db_dev_reset")," and ",(0,i.yg)("inlineCode",{parentName:"li"},"db_dev_migrate"),"."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_dev_migrate_standalone"),": Applies database migrations against your\nrunning database container but will not check for server dependencies first.")),(0,i.yg)("h2",{id:"test-db-commands"},"Test DB Commands"),(0,i.yg)("p",null,"These commands are available for the Test DB. You will rarely need to use these\nindividually since the commands to run tests already set up the test DB properly.\nOne exception is ",(0,i.yg)("inlineCode",{parentName:"p"},"make db_test_run"),", which you'll need to run after restarting\nyour computer."),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_test_run")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_test_create")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_test_reset")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_test_migrate")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_test_migrate_standalone")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_test_e2e_backup")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_test_e2e_restore")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_test_e2e_cleanup"))),(0,i.yg)("p",null,"The test DB commands all talk to the DB over localhost. But in a docker-only environment (like CircleCI) you may not be able to use those commands, which is why ",(0,i.yg)("inlineCode",{parentName:"p"},"*_docker")," versions exist for all of them:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_test_run_docker")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_test_create_docker")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_test_reset_docker")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"make db_test_migrate_docker"))),(0,i.yg)("h2",{id:"migrations"},"Migrations"),(0,i.yg)("p",null,"To add new regular and/or secure migrations, see the ",(0,i.yg)("a",{parentName:"p",href:"https://transcom.github.io/mymove-docs/docs/dev/contributing/database/Database-Migrations"},"database development guide")),(0,i.yg)("p",null,"Running migrations in local development:"),(0,i.yg)("p",null,"Use ",(0,i.yg)("inlineCode",{parentName:"p"},"make db_dev_migrate")," to run migrations against your local dev environment."),(0,i.yg)("p",null,"Running migrations on Staging / Production:"),(0,i.yg)("p",null,"Migrations are run automatically by CircleCI as part of the standard deploy process."),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},"CircleCI builds and registers a container."),(0,i.yg)("li",{parentName:"ol"},"CircleCI deploys this container to ECS and runs it as a one-off 'task'."),(0,i.yg)("li",{parentName:"ol"},"The container downloads and execute migrations against the environment's database."),(0,i.yg)("li",{parentName:"ol"},"If migrations fail, CircleCI fails the deploy."),(0,i.yg)("li",{parentName:"ol"},"If migrations pass, CircleCI continues with the deploy.")))}p.isMDXComponent=!0}}]);