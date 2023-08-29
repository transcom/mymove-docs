---
sidebar_position: 4
---

# How to view a move or payment request in the office app as a TOO or TIO

## Background

When a TOO or TIO signs in to the Office app, they see a list of moves with non-PPM shipments or payment requests, respectively. This list is filtered by default to only show moves/payment requests that have the same GBLOC as the transportation office that the TOO/TIO is assigned to. GBLOC stands for `Government Bill of Lading Office Code`, and represents a geographical area. GBLOCs are identified by 4 characters, such as `LKNQ`.

In database terms, this means the `gbloc` of the `office_user`'s `transportation_office` must match the `gbloc` of the `order`'s `origin_duty_station`'s `transportation_office`.

If you don't have the app working locally, there is a [mapping on the Google Drive](https://docs.google.com/spreadsheets/d/1jMdHFmDbZP1CvIPQ_NYq0Fpht_svKGFRiykOgnpUZ5c/edit#gid=856605341) that shows which duty stations correspond to each transportation office GBLOC.

If you do have the app working locally, you can use the following scripts to match transportation offices to duty stations:

```shell
scripts/ds-for-gbloc "Scott AFB"
```
This will return all duty stations with the same GBLOC as Scott AFB

```shell
scripts/to-for-gbloc "Scott AFB"
```
This will return all transportation offices with the same GBLOC as Scott AFB

## When creating a move manually

If you are participating in a slice demo for Transcom, or if you are testing the end-to-end flow of the app, the origin duty station you select for the service member must match the TOO/TIO's transportation office. Here's how you find out which duty station to pick:

1. If you haven't already, create an office user with your work email (the same email you used to create a login.gov account) via the [admin](https://admin.stg.move.mil) site, and give yourself both the TOO and TIO roles.
2. Sign in to the [admin](https://admin.stg.move.mil) site
3. Look yourself up in the office users list
4. Make a note of the name of the Transportation Office
5. From the command line, within the `mymove` repo, run this script (or use this [spreadsheet](https://docs.google.com/spreadsheets/d/1jMdHFmDbZP1CvIPQ_NYq0Fpht_svKGFRiykOgnpUZ5c/edit#gid=856605341)):
```sh
scripts/ds-for-gbloc "name of your transportation office"
```
For example, if your Transportation Office is `Scott AFB`, you would run this:
```sh
scripts/ds-for-gbloc "Scott AFB"
```
This will list all the duty stations with the same GBLOC as `Scott AFB`. As a service member, you can select any of the duty stations listed by the script as your origin duty station.  A move must have at least one non-PPM shipment (HHG Longhaul, HHG Shorthaul, NTS, or NTS Release) for the move to appear in the queue when you sign in as a TOO.

### Exception!
There is a special case where the above won't work. If a service member chooses `Marine Corps` as their "Branch of service", then the TOO/TIO won't see the moves/payment requests unless their GBLOC is "USMC". Currently, the only transportation office with that GBLOC is `Camp LeJeune (USMC)`. So, to test Marines moves, you will need to create a new office user with that specific transportation office. If you need to change an office user's transportation office after creating them, you can do so from the admin interface.

## When using the pre-populated development data

To skip the manual process of creating a new move and creating an office user, you can populate the development database with data using this command locally from the `mymove` repo:
```sh
make db_dev_e2e_populate
```
Once it's done, follow these steps:
1. Run `make server_run`
2. In a separate terminal tab or window, run `make office_client_run`
3. When the browser launches and the site appears (it can take a minute or so), click on `Local Sign In` in the top right
4. Click on the `Login` button next to `too_tio_role@office.mil (PPM office)` or `too_tio_role_usmc@office.mil (PPM office)` (for Marines moves)
5. You should now see some moves
6. To switch to the TIO role, click on `Change user role` in the top left, and click on `Select transportation_invoicing_officer`. You should now see some payment requests

## How to create a new office user locally

1. Run `make server_run`
2. In a separate terminal tab or window, run `make admin_client_run`
3. Click on `Local Sign In` in the top right
4. Click on `Login` next to any admin user listed
5. Click on Office users in the left sidebar if it's not already selected
6. Click on `+ CREATE` in the top right
7. Fill out your details, making sure to use the same email as the one you used to create a login.gov account in the [sandbox server](https://idp.int.identitysandbox.gov/sign_up/enter_email)
8. Select both the `Transportation Ordering Officer` and `Transportation Invoicing Officer` roles
9. Select any Transportation office, or `Camp LeJeune (USMC)` if you want to test moves where the service member's branch of service is `Marine Corps`.
