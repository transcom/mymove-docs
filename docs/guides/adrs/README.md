---
title: ✍️  Welcome to writing ADRs
---

Architecture Decision Records or **ADRs** are the way engineers
communicate changes throughout the MilMove project. The term architecture can be
read loosely as the more important words are decision records. To get started,
take a look at [the ADR template](./template.md) and then copy it into
`docs/adrs/` to make your own.

## Creating ADRs using this repository

For convenience, ADRs can be created using [the Template found in this
guide](./template.md). You can also create a new ADR file automatically with
`npm-run` scripts. Run the following command and set name to the dashed name of
your ADR and the script will create an ADR file for you.

```bash
npm run new-adr --slug="my-short-and-brief-adr"
```

This command will create a new file for your ADR with placeholder title and
description. Make sure you keep these values and the name of the file up to date
as other ADRs may be added to the repository in the time it takes for your ADR
to get peer-reviewed and approved.

## Required file names

ADRs live in the `docs/adrs/` folder. They are automatically generated into
cards on [the ADR landing page](/docs/adrs/). This is done by having the files
in that directory follow a specific naming convention which includes a
four-digit number prefix before the name of your file. You may prefix your file
with any available four-digit number. You have to collaborate with others if
multiple ADRs are being written at the same time.

While your ADR is being drafted and reviewed, you may not have a number
associated with your ADR yet. It's okay to use the following prefix of `00XX-`
to show that your ADR is in a Draft or Review state.

:::note
When working in this new way, make sure you number the ADR before your work is
merged into the default branch. Don't leave the `00XX-` prefix or a repeated
number if other ADRs share the same number prefix.
:::

## Required Front Matter

ADRs have a couple of specific features that are required to have them render
properly in our Documentation Portal. These affect the layout, order, and
metadata for the ADR.

The first thing an ADR must have is a Front Matter section. This section
contains a `title:` and an optional `description:` property.

```yaml title="A simple Front Matter with just a title."
---
title: 0101 My decision to write an ADR
---
```

```yaml {3} title="A more complicated Front Matter with a multi-line description."
---
title: 0102 My slightly complex and ambitious ADR
description: |
    This is a very long description for my 0102 ADR. It's about two or three
    sentences. Depending on how you write it.
---
```

:::info
Notice the `description:` property highlighted above uses a `|` pipe character.
This allows for multi-line description text blocks.
:::

The added bonus of adding a description to your ADR's Front Matter is that this
description shows up on the generated index page for all the ADRs and can be
used to describe helpful information before clicking into an ADR. If a
`description:` property doesn't exist, the generated card will include a summary
of the first 8 words or so.
