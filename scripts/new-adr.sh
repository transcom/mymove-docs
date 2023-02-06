#!/bin/bash

set -e

slug=$1

if [ -z  "${npm_lifecycle_event}" ]
then
  echo "This script must be invoked by \`npm run new-adr\` and not run directly."
  exit 1
fi

if [ -z "${slug}" ]
then
  echo "--slug'my-example-adr-name' needs to be passed in when running \`npm run new-adr\`"
  exit 1
fi

num_prefix=$(printf '%04d' "$(find docs/adrs -iname '*.md' | wc -l)")

new_adr_path="./docs/adrs/${num_prefix}-${slug}.md"

# NOTE: The number after `tail` below with a `+` plus-sign prefix is the same
# as the line number in the `docs/guides/adrs/template.md` file after the
# frontmatter.
cat << ADRHD > "${new_adr_path}"
---
title: '${num_prefix} A title for this ADR'
description: |
  A description for ADR ${num_prefix}
---
$(tail +6 ./docs/guides/adrs/template.md)
ADRHD

ls -fal "${new_adr_path}" && echo "File created successfully. Make sure you update the title and description as needed."
