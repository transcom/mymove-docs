---
sidebar_position: 2
---

# Acceptance testing notifications

Acceptance testing notifications involves four steps
1. Creating a subscription for an event
2. Start the server and webhook-client
3. Creating a notification for that event
4. Checking that the notification was sent to the Prime

This needs to be done in devlocal and not on staging as we are unable to get the webhook-client on staging until we have infra support.

## 1. Creating a subscription for an event

Subscriptions are store in the `webhook_subscriptions` table.

Currently we have no endpoint to access these. Instead, we just add them into the database.

:::note
We do not have any subscriptions live on staging
:::

### Inserting a subscription using SQL

Here's the SQL to insert a subscription for a `PaymentRequest.Update` event.
```sql {5}
INSERT INTO public.webhook_subscriptions
(id,subscriber_id,status,event_key,callback_url,created_at,updated_at)
VALUES
('5cd33db4-9441-4d2d-bd7c-f9efd9ce310c','5db13bb4-6d29-4bdb-bc81-262f4513ecf6',
'ACTIVE','PaymentRequest.Update','https://primelocal:9443/support/v1/webhook-notify',
'2020-08-24 18:31:29.171','2020-08-24 18:31:29.171');
```

You can use `psql-dev` to do the insertion. On the command prompt in the MilMove
repo, call `psql-dev` to start a prompt on the Postgres database.

```sh
>_ psql-dev
psql (12.1, server 12.2 (Debian 12.2-2.pgdg100+1))
Type "help" for help.
```

Then paste the SQL command from above, you should see the following response:

```sh
dev_db=<paste command here>
INSERT 0 1
```

If you do not, you may need to get the right subscriber ID from your db, with the name "Prime McPrime Contractor"

Once you are successful in adding the subscription, use `\q` to exit the `psql-dev` prompt.

## 2. Start the server and webhook-client

Start the MilMove server with `make server_run`

Start the webhook client in a separate terminal with the following:

```sh
webhook-client webhook-notify --period 20 --insecure
```

:::info Troubleshooting
If you do not have `webhook-client` in your `$PATH`, you will need to run the
following make commands to create the needed binary.

```sh title="Check if webhook-client is in your $PATH"
which webhook-client
```

```sh title="Remove and build webhook-client binary"
rm -rvf bin/webhook-client && make bin/webhook-client
```
:::

The client will run and check every 20 seconds for new notifications to send.
When it finds a pending notification, and an active subscription, it will send
it to the server.

At first, it may not find any notifications, and you should see the following
every 20s:

```sh
2020-08-25T21:43:17.175Z	DEBUG	webhook/webhook.go:146	Notification Check:	{"Num notifications found": 0}
```

## 3. Creating a notification for that event

To create a notification, you will use an endpoint that has the trigger added. For example, the above subscription was for "PaymentRequest.Update". That can be triggered by the `updatePaymentRequestStatus` endpoint.

Using Postman, send an update to that endpoint. Set the status to
`'SENT_TO_GEX'`.

```sh {7} title="Sample request"
PATCH /support/v1/payment-requests/a2c34dba-015f-4f96-a38b-0c0b9272e208/status HTTP/1.1
Host: https://primelocal:9443
Content-Type: application/json
If-Match: MjAyMC0wOC0yNVQxODo1MToxMi42ODgwODha

{
	"status": "SENT_TO_GEX",
	"rejectionReason": ""
}
```
Be sure to use the proper etag which you can get from the `ListMTOPaymentRequests` endpoint.

If your notification was successful, you should see an entry in the server log:

```sh
2020-08-25T18:51:12.742Z	INFO	event/notification.go:145	event.NotificationEventHandler: Notification created and stored.
```

## 4. Checking that the notification was sent to the Prime

Once the notification is created, check the client to see that it sends it successfully!

```sh {3}
2020-08-25T21:44:57.173Z	DEBUG	webhook/webhook.go:146	Notification Check:	{"Num notifications found": 1}
2020-08-25T21:44:57.177Z	DEBUG	webhook/webhook.go:161	Subscription Check!	{"Num subscriptions found": 1}
2020-08-25T21:44:57.192Z	INFO	webhook/webhook.go:125	Notification successfully sent:	{"Status": "200 OK", "Body": "{\"id\":\"0586dde3-df69-4b1e-8cc5-49bc83764600\",\"triggeredAt\":\"0001-01-01T00:00:00.000Z\"}\n"}
```

