# Prerequisites

## Tools Needed

Make sure you have the following tools installed on your computer:

- [Homebrew](https://brew.sh/)
- [Git](https://github.com/git-guides/install-git)
- [Go](https://go.dev/doc/install)
  - You can verify that you've installed Go by typing the following command: `go version`

## Git Configuration

Once you have Git installed, set the global configurations to use your work email when making commits to our repositories:

```bash
git config --global user.email "trussel@truss.works"
git config --global user.name "Trusty Trussel"
```

Next, set up SSH by following the [official GitHub instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) so you can connect to GitHub without supplying credentials at each visit.

## AWS Services

This project uses AWS services which means you'll need an account to work with parts of it. AWS credentials are managed via `aws-vault`. Once you have received AWS credentials (which are provided by the infrastructure team), follow these instructions to [finish setting up AWS](https://dp3.atlassian.net/wiki/spaces/MT/pages/1250066433/0029+AWS+Organization+Authentication).
