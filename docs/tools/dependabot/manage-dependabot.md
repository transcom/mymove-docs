---
sidebar_position: 1
---

# How to Manage Dependabot

[Dependabot](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/about-dependabot-version-updates), now rolled into GitHub security, is used to monitor the repository dependencies as well as security vulnerabilities, and update them with automatic
pull requests against the `master` branch in the repo. The configuration is done via a file named
`.github/dependabot.yml` in the top level of the repository. Read more about [dependabot configuration](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates) in the
docs.  Once enabled, [dependabot status](https://github.com/transcom/mymove/network/updates) and [security alerts](https://github.com/transcom/mymove/security/dependabot) can be accessed under the "Insights" and "Security" tabs of the mymove GitHub repo page.

## Security

We use dependabot as part of our security measures. It ensures that the repository dependencies are up-to-date and
that any security vulnerabilities are caught as soon as new versions are published. Dependabot will even
add security release information in the text of the PR.

## Organization Level Settings

Some Dependabot settings, such as [sharing a secret](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/managing-encrypted-secrets-for-dependabot#adding-an-organization-secret-for-dependabot) that Dependabot could use to access a private repo, are set at the Transcom organization level.  You'll need a GitHub admin to access the Transcom organization settings and modify things affecting all repositories within.
