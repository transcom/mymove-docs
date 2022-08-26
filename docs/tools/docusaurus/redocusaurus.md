---
sidebar_position: 2
---

# Redocusaurus

:::tip Why do I need to read this?

This documentation is helpful for anyone editing documentation related to the
Swagger API definitions. It is helpful to understand those concepts first before
diving into this documentation.

:::

:::info Need help? Ask in Slack.

This documentation leverages multiple projects that could lead to confusing
error messages and warnings. For help, please reach out in
[#wg-documentation][slack-wg-documentation]🔒 if you get stuck.

[slack-wg-documentation]: https://ustcdp3.slack.com/archives/C027BDJ4678

:::

## What is Redocusaurus?

[Redocusaurus][gh-redocusaurus] is a preset for Docusaurus. See [the packages
documentation][redocusaurus-docs] for more general information about
Redocusaurus. The purpose of this documentation is to help MilMove developers
understand how the preset is integrated into Docusaurus and how to work with it
locally.

[redocusaurus-docs]: https://github.com/rohit-gohri/redocusaurus/tree/main/packages/redocusaurus
[gh-redocusaurus]: https://github.com/rohit-gohri/redocusaurus

## Redocusaurus configuration

The presets for Docusaurus are set in the `docusaurus.config.js` file in the
`transcom/mymove-docs` repository. See [the official Docusaurus
documentation][doc-preset] on using presets for more general information.

[doc-preset]: https://docusaurus.io/docs/presets

:::note How Docusaurus consumes Swagger documentation

The way `transcom/mymove-docs` uses this is by leveraging the raw GitHub URLs
for the Yaml files found in `transcom/mymove`. This means the API documentation
is in sync with the default branch for the `transcom/mymove` repository. This
means that until your Swagger file changes are merged into the default branch of
`transcom/mymove` you cannot view the changes in the `transcom/mymove-docs`
repository.

:::

You can see this in the `./docusaurus.config.js` file under the `presets` named
`redocusaurus`.

## Working with local changes to Swagger files

To view changes to the Swagger documentation locally with Docusaurus, you need
to have both repositories cloned on your machine. While you will be working with
two repositories, the actual commits associated with these changes will happen
in the `transcom/mymove` repository and not in the `trancom/mymove-docs`
repository.

### The two repositories

- https://github.com/transcom/mymove
- https://github.com/transcom/mymove-docs

### Updating the Docusaurus configuration

Once you have these repositories cloned locally, you will need to edit the
`documentation.config.js` file to leverage the `spec:` property instead of the
`specUrl` property.

The Git patch below shows what these changes would look like locally. The main
thing to consider here is the location of the Swagger specification. In the
example below, it is relative to the `transcom/mymove-docs` repository.

```diff title="Updates to specification paths" {9,10,14,15}
diff --git a/docusaurus.config.js b/docusaurus.config.js
index 697ffef..30fdcc4 100644
--- a/docusaurus.config.js
+++ b/docusaurus.config.js
@@ -144,11 +144,11 @@ module.exports = {
       {
         specs: [
           {
-            specUrl: 'https://raw.githubusercontent.com/transcom/mymove/master/swagger/prime.yaml',
+            spec: '../mymove/swagger/prime.yaml',
             routePath: '/api/prime',
           },
           {
-            specUrl: 'https://raw.githubusercontent.com/transcom/mymove/master/swagger/support.yaml',
+            spec: '../mymove/swagger/support.yaml',
             routePath: '/api/support',
           },
         ],
```

### Viewing changes in local Docusaurus

Now that you have updated the `docusaurus.config.js` with the changes mentioned
above, you will need to edit Swagger files found in `transcom/mymove` under
`swagger-def/` and then run the `make swagger_generate` command in order for
them to show up in Docusaurus.

You will have to repeat this section for every change to the Swagger files. Make
sure you have the `transcom/mymove-docs` server running locally. Whenever there
are changes to the `trancom/mymove/swagger/*.yaml` files mentioned above,
Docusaurus will helpfully reload the page. Because of interconnectedness of
different technology, you may have to run the `make swagger_generate` command
more than once if the changes aren't being reflected in your local Docusaurus
API page.

## Undoing local configuration for Redocusaurus

If the only changes that were made to `docusaurus.config.js` are related to the
Redocusaurus, you can easily discard these changes using the following Git
command in the terminal. Please make sure you do this after you've committed
changes in `transcom/mymove` which are related to the Swagger documentation.

```sh
git checkout -- docusaurus.config.js
```
