# Utilizing the GitHub Workflow for designing a Slice Demo Postman Collection:
<!-- Table of Contents auto-generated with `bin/generate-md-toc.sh` -->

<!-- toc -->

* [Slice Demo Prep Basics: Playing the Prime](#slice-demo-prep-basics-playing-the-prime)
* [Getting Started](#getting-started)
    * [Creating a Collection from scratch](#creating-a-collection-from-scratch)
        * [Setting up with Index.js](#setting-up-with-indexjs)


Regenerate with "pre-commit run -a markdown-toc"

<!-- tocstop -->
## Slice Demo Prep Basics: Playing the Prime:
During the slice demo there will be various points of handoff from the TOO/TIO to the Prime and vice versa. When playing the prime, we recommend developing visuals that are split up into 2 sections:
#### Handoff from TOO -> Prime
    Visual 1: Prime receives a notification of a move. Prime updates the move details. Prime performs another action (e.g. creates a service item)
#### Handoff from Prime --> TOO 
After the Prime creates the Service Item(or Reweigh Reques/SIT Extension/ or another action), there is a verbal handoff to the TOO. Nothing technical happens.
#### Handoff TOO --> Prime
The TOO reviews the Service Item and approves them and there is a verbal handoff to the Prime to show how a payment request is created and proof od service is uploaded
    
    Visual 2: Prime creates a payment request and uploads proof of service.
#### Handoff from Prime to TOO/TIO
After the prime uploads the proof of service, they submit the payment request ID to teh TIO and do a verbal handoff to teh TOO.
## Getting Started:
We have created a repo in GitHub with postman collections from previous slice demos. This means you can get a copy of all of them the way you would clone any other repo on GitHub: 

1. Clone the `prime_api_deliverable` repo: `git clone git@github.com:transcom/prime_api_deliverable.git`
2. Navigate to the `postman` folder, where you will find previous slice demo collections (e.g. 202108-slice-demo)
3. Copy over contents from a previous collection or create a new collection from scratch.

If you have never set up postman before checkout our instructions for [setting up postman](https://transcom.github.io/mymove-docs/docs/dev/tools/Postman/Setting-Up-Postman).
### Creating a Collection from scratch:
Once you have cloned the `prime_api_deliverable` repo, feel free to create a new branch if someone is reviewing your script or just start working directly in master. 
Open the file in your favorite text editor. Under the postman folder, create a new folder for our slice demo collection.
Our naming convention for each slice demo folder is going to be: YYYYMM-slice-demo.

If your slice demo is happening in September 2021, for example, you will create a folder called `202109-slice-demo`. In this folder create 4 more empty folders:
* `payloads` - feeds the requests folder
* `requests` - this folder contains node JS files that postman uses to build the collection.
* `templates` - this folder contains HTML and node JS code to add visualizations that will benefit the audience during the demo.
* `events` - this folder contains node JS files that contain the objects that feed into the templates folder for the visualizations.

#### Setting up with Index.js:
The `index.js` file is where you will store all of the elements that tell postman to create a colleciton for you.
Outside of these folders you will add a top level file called `index.js`, where we will add our path and fs requirements requirements for node.

    const fs = require('fs'); // fs stands for file system
    const path = require('path'); // internal library for node js that allows you to use path names
   
Following these two requirements must create your collection constant and a path for your collection:

    const Collection = require('postman-collection').Collection; // make sure to npm install so that you can use this library
    const fileName = path.basename(__dirname + '.postman_collection.json');
    const savePath = path.join(process.cwd(), '/collections');
    const filePath = `${savePath}/${fileName}`;
    
In the code above, the constant `filePath` knows to store your new colleciton in your current working directory's `collection` folder. 
Index.js does a lot for us. But the main purpose is to generate the JSON for postman to understand.

//TODO: Share code snipet of file write.stringigy() to show how it stringfies the js code into JSON
    
Next build your collection. In this case we will build a collection with two requests:

    var myCollection;
    // Create a collection having two requests
    myCollection = new Collection({
        info: {
            name: "2021 Sept Prime Demo",
            description: `
                ### Get Move endpoint
                We give this request a move code and it returns a move.
            `,
        },
        variable: {
            moveID: {
                id: "moveID", 
                value: "", 
                type: "string",
            },
            baseUrl: {
                id: "baseUrl", 
                value: "https://api.stg.move.mil/prime/v1", 
                type: "string",
            },
            getMoveTaskOrderTemplate: {
                id: "getMoveTaskOrderTemplate", 
                value: "", 
                type: "string",
            },
        }, 
    });
    myCollection.items.add([]);
    
    fs.writeFileSync(
        filePath,
        JSON.stringify(myCollection, null, 2)
      );
      
      if (fs.existsSync(filePath)) {
        console.log(`💾 The Postman Collection has been saved at ${filePath}`);
      }

run `npm run build_202109-slice-demo` so that you can use this new collection.

#### Setting up the Payloads folder:
The Payloads folder feeds objects to the request folder. This is where we will create reusable objects that we pass to the requests. Examples of this include:
updating a shipment with the actual pickup date, actual weight, and estimated weight, updating a reweigh weight, scheduleing a pickup date, etc.

Each action will have it's own JS file and as more collections are added, we can begin making the payloads folder a top level folder so that payloads can be used across collections.

For now, create a payload folder for your new collection. Each file should contain one object. For example if you have a folder called `update-shipment-with-actual-pickup-date.js`, it'll contain an update to the pickup date:
    
       var addDays = require('../../utils/addDays');
       
       const payload = {
         actualPickupDate: addDays(17),
       };
       
       module.exports = payload;
       
If you've used postman before, you'll notice that request and response bodies are JSON files in postman, however our payloads are JavaScript files. JavaScript provides us with a few advantages.
Firstly, it allows the developer to leave comments within the payload file. Second, we can import utils to use in our code. Lastly, we can also use template tags when we are using JS files. 

In a different folder, our JS code gets assembles into a JSON collection string that is outputted to a file for postman to generate our collection. 
#### Setting up the Requests folder:
TODO: Note how all the files are similar and that we may want to take out teh repetitive parts and find a way to pass in a new item every time.
TODO: Show code snipet of the item variable.
#### Setting up the Templates folder:
In the `templates` folder we will create a file called `test.js`. This file will set up variables for the view and environment variables that will be used in our collection.
This file is also where we will create a test script that will toggle between different views as we run through the demo.

If you've created demo scripts in postman in the past, you may have used the `Test` tab to add your HTML and JS that generated the visuals during the demo. 
This `test.js` file is essentially our test script and it will populate that tab once your collection is imported.
#### Setting up the Events folder: