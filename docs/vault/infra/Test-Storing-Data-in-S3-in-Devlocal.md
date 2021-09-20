If you would like to test uploading docs to S3 in AWS in your devlocal environment to be able to test the same codepaths as prod, follow the steps listed below. 

## Caveats
* devlocal uses the `transcom-gov-dev` account. Staging and production environments use the `transcom-gov-milmove-stg` and `transcom-gov-milmove-prd` respectively.
* This method describes uploading orders as a simple workflow to test S3 upload. Additional methods would be a welcome addition to this doc.

## Steps
1. Setting the storage environment variable to use S3 instead of local

In your `.envrc` file uncomment the following line:

```
export STORAGE_BACKEND=s3
```

Reload your environment to pickup the new value:

```
direnv allow
```

2. Run the server against the `transcom-gov-dev` AWS account

```
aws-vault exec transcom-gov-dev -- make server_run
```

You should see a log line specifying that S3 is enabled as the storage backend

```
2020-12-10T14:58:32.769Z	INFO	storage/storage.go:92	Using s3 storage backend	{"git_branch": "rek-mb-5464-add-instructions", "git_commit": "a874a9fff05c80ff88972487b47cb4b05df4a605", "bucket": "transcom-gov-dev-app-devlocal-us-gov-west-1", "region": "us-gov-west-1", "key": "rebecca.kilberg.truss"}
```

3. Run the client server

```
make client_run
```

3. Navigate to the Orders page.
Go to http://milmovelocal:3000/devlocal-auth/login and click "Create a new milmove User". From there fill out all the forms with fake data. When you get to the "Orders" page, upload a doc in the Uploads section. You should get an "Upload complete" message overlaying your document. 



 


