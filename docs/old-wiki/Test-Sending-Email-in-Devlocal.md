If you would like to test sending emails via AWS's Simple Email Service (SES) in your devlocal environment to be able to test the same codepaths as prod, follow the steps listed below. 

## Caveats
* devlocal uses the @devlocal.dp3.us domain for sending emails via SES. Staging and production environments use the move.mil domain.
* This method talks about on the PPM workflow as a simple way to send an email, additional methods via HHG would be welcome additions to this doc.

## Steps
1. Run the server specifying the GovCloud region and enabling SES environment variables against the `transcom-gov-dev` AWS account

```
EMAIL_BACKEND=ses AWS_REGION=us-gov-west-1  aws-vault exec transcom-gov-dev -- make server_run
```

You should see a log line specifying that SES is enabled as an email backend

```
2020-12-02T17:49:31.005Z	INFO	notifications/notification_sender.go:72	Using ses email backend	{"git_branch": "mk-mb-5060-devlocal-ses-govcloud", "git_commit": "118560ccfa4665a65f9a566e76a6ae7c06c43c8e", "region": "us-gov-west-1", "domain": "devlocal.dp3.us"}
```

2. Run the client server

```
make client_run
```

3. Run Create a new user with a PPM move
Go to http://milmovelocal:3000/devlocal-auth/login and click "Create a new milmove User". From there fill out all the forms with fake data. When you get to the "Your Contact Info" page, put in a valid email in the "Personal email" field. When you've completed a move you should receive a confirmation email sent to the email address you specify here. 

4. Select PPM for the move type
When you get to the "How do you want to move your belongings?", select "Do it yourself". 

5. Sign and Complete
Once you sign and complete the move, you should see an email with a subject along the lines of "Thank you for submitting your move details"



 


