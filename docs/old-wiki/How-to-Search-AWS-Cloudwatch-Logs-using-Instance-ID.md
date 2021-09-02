If you have received an error from one of the APIs with an `instance` value, this guide is for you.

## What is the Instance ID
The instance id is a UUID added to logging to connect all logs associated with a single request/response. It makes it easier to find the logs that were generated in the course of your error.

## How to use Cloudwatch to find the logs

### Login to AWS
1. Clone the [transcom-infrasec-gov](https://github.com/transcom/transcom-infrasec-gov) repo
2. `cd transcom-gov-logs`
3. `direnv allow`

Login to aws environment of choice:

* exp : `aws-vault login transcom-gov-milmove-exp`
* stg : `aws-vault login transcom-gov-milmove-stg`
* prd : `aws-vault login transcom-gov-milmove-prd`

Enter your OTP for the entry with `@transcom-gov-id-base` in the name. This should automatically launch a browser tab landing you on the AWS Management Console.

### Open Cloudwatch Insights
In Find Services, look for [Cloudwatch](https://console.amazonaws-us-gov.com/cloudwatch/home?region=us-gov-west-1#) and click on it.

In the sidebar on the left, click on [Insights](https://console.amazonaws-us-gov.com/cloudwatch/home?region=us-gov-west-1#logsV2:logs-insights).

![](/img/cloudwatch_insights.png)

### Create your filter

The first thing you need to do is select a log group. The **logs from different apps go into different log groups**.

*  For prime or other mTLS apis, add `ecs-tasks-app-client-tls-stg` to your log groups.

*  For non-mTLS apps, like Milmove or Office generated requests, add `ecs-tasks-app-stg`.

The search field defaults to the following, comments are added here to explain the syntax.
```
fields @timestamp, @message #show these fields
| sort @timestamp desc      #sort by timestamp
| limit 20                  #get first 20 results
```

The results are also **time-limited** in the top left corner, defaulting to 1hr

![](/img/cloudwatch_time_filter.png)

To find the logs related to your issue, select the appropriate time period, and add a filter to your search.

  The **instance ID corresponds to milmove_trace_id**. Add a filter for it.

  In the fields line, you can add `msg, error,` after timestamp to help pull out useful fields from the @message field.

```
fields @timestamp, msg, error, @message
| filter milmove_trace_id like "649cfade-8090-4e0a-b4fe-9e97b00c1649"
| sort @timestamp desc
| limit 20
```

### Run the query
Hit Run Query and wait for the results.

You should see all the logs associated with that instance ID. Some may be info, some errors.

![](/img/cloudwatch_logs.png)

### Check the Details for more info and stacktrace

If you click on a log, you can see the details UI. In addition to the msg and error, you may have access to a full stacktrace, depending on the error.

One thing to note is that the stacktrace is truncated in the table, but you can copy the full stacktrace from the text box.

![](/img/cloudwatch_detail_ui.png)

## Commandline Search

There is also a commandline tool called ecs-service-logs for searching the logs. Here is the command to search for the instance ID.

```
brew tap trussworks/tap
brew install ecs-service-logs

aws-vault exec transcom-gov-milmove-stg -- ecs-service-logs show -s app-client-tls -e stg 'milmove_trace_id=649cfade-8090-4e0a-b4fe-9e97b00c1649' | jq .
```

## IP Logging

Occasionally, you might need to log your outbound IP address in ecs tasks. To do this, import `pkg/cli/logging`, then add `GetOutBoundIP(logger)` to where you need to log the external IP.

The filter to find this in the logs is `{ $.source_address = * }` in the `app/app-tasks` log group.
