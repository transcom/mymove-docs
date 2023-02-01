# Deploy App Client TLS

## Configuration

```yaml reference
https://github.com/transcom/mymove/blob/7914158b070c8a733cc94a8cf3e4c4747855ea26/.circleci/config.yml#L1747-L1765
```

## Extra Notes

The `deploy-app-client-tls-steps` does two separate commit checks at different times. The first check occurs before anything is deployed to AWS and makes use of `scripts/compare-deployed-commit`. The second check happens after the deploy and uses `scripts/check-deployed-commit`. Both scripts make use of our tls certificates.
