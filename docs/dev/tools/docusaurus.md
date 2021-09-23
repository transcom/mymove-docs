---
title: Docusaurus
---
# Using Docusaurus 

Docusaurus is our doc framework of choice bladi blah blah. Note that to modify any part of the repo, you must be a member of the transcom github organization.

## Edit a page

When you're browsing the docs and you come across a page you'd like to edit, scroll down to the very bottom and click the "**Edit this page**" button.

![Edit this page](/img/docusaurus/edit_this_page.png)

This should take you to the edit screen in GitHub for this particular markdown file. In this screen, you can edit the page however you please (common things to do link todo), and then preview your changes using the "**Preview**" tab at the top of the text box. Note there are some quirks about previewing your work in GitHub:

* Embedded images will not be shown in GitHub, but you will see them in the Docusaurus site.
* The front matter will be visible at the top of the page in GitHub, but this will not show up in Docusaurus.

![Preview the page](/img/docusaurus/preview_page.png)

You can also rename a file in GitHub. Keep in mind that this filename will be in the url for that page (unless otherwise specified in the front matter), so it should be lowercase and separated by hyphens (also known as `kebab-case`).

![Edit a filename](/img/docusaurus/edit_filename.png)

Once you are done, scroll down to the bottom and save your changes. You can write a description about what you changed as well, which is optional but encouraged.

![Commit changes](/img/docusaurus/commit_changes.png)

## Add a page

The file structure in our GitHub repo determines where your new page will show up in the deployed Docusaurus site. Therefore, you should first figure out what section your page belongs to and navigate to that directory in GitHub.

[file structure]

Once you're in the directory for your new page, click on the "**Add file**" dropdown near the top right. Select the "**Create new file**" option.

![Create new page](/img/docusaurus/create_new_page.png)

:::tip Uploading Files

You can also write a markdown document on your computer and upload it using the "**Upload files**" option. If you have a markdown editor that you're comfortable with, or if you only want to add the document once it's fully complete, this might be the option for you.
:::

Add your content. This process is the same as editing a page (link). Once you are done, scroll down to the bottom and commit your changes.

## Delete a page

Before you delete a page, first ask yourself: "Am I sure this content needs to be fully removed, or could it be useful somewhere else?" If you could envision the document being useful in Confluence, or by providing historical insight, consider [moving it](#move-a-page) to the **[Vault](../../vault/index.md)** instead. This folder is intended to hold archived, experimental, and misplaced documentation. It will be reviewed periodically and moved or deleted later, if deemed necessary. 

If you are confident that this page can be truly deleted, first locate the markdown file in GitHub. While viewing the file, click the button near the top right corner that looks like a trashcan. 

![Delete a page](/img/docusaurus/delete_page.png)

On the following screen, scroll down to the bottom and commit the deletion just like you would any other change.

## Move a page

Moving a page in GitHub is trickier than any other functionality. To do this in the browser, you would need to:

* Copy all the contents of the page in the old location.
* Create a new page in the desired location, paste in the contents, and save.
* Go back to the old page and delete it.

This is kind of a pain. I would recommend checking the repo out and moving files locally on your machine, if that is something you're comfortable with doing. Some instructions for how to get set up are in the [README for this repo](https://github.com/transcom/mymove-docs#running-locally-on-macos).

## `git` basics