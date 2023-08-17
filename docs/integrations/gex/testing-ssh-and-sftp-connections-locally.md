# How to Test a SSH and SFTP Connection Locally

SSH and SFTP is one of the ways that GEX connects to MilMove. The GEX servers can be connected to manually via SSH and SFTP, but that requires setting up a Bastion inside of the staging and production environment.

When doing development on an SSH or SFTP connection, it is much more convenient to be able to test locally. If you are looking to update the SSH or SFTP connection to GEX, testing locally provides an addtional assurance that the code for the connection is written correctly.

The following sets of steps are best done with a terminal window open in the MilMove project repository.

## Setting Up a SSH Server

1. Generate a key pair with `ssh-keygen -f ./tmp/test_key_pair -t ecdsa -b 521`
   :::note
   You may want to do this inside of the MilMove tmp folder since that gets gitignored. This helps avoid accidental commits of private keys.
   :::
2. Inside of the project's `.envrc.local`; set the following environment variables.

```shell
export GEX_SFTP_USER_ID=testu
export GEX_SFTP_PASSWORD=testp
export GEX_SFTP_IP_ADDRESS=localhost
export GEX_SFTP_PORT=2222
export SEND_TO_SYNCADA=true
export GEX_PRIVATE_KEY=$(<./tmp/test_key_pair)
export TEST_GEX_PUBLIC_KEY=$(<./tmp/test_key_pair.pub)
# export GEX_SFTP_HOST_KEY=$(docker exec sshd cat /etc/ssh/ssh_host_ecdsa_key.pub)
```

3. Run `direnv allow`
4. Run `make docker_local_ssh_server_with_key`
   :::note
   You can also use `make docker_local_ssh_server_with_password`, depending on if you want to test the SSH connection with a key or a password
   :::

5. Uncomment the `export GEX_SFTP_HOST_KEY...` line inside of the `.envrc.local`

## Testing the Connection

### Using the Build Tools

1. Run `direnv allow`
2. Run `make bin/milmove-tasks`
3. Run `milmove-tasks connect-to-gex-via-sftp`

### Testing the SSH Connection Manually

:::note
To exit from either the SFTP or SSH session, you can type and enter `exit` and you will be taken back to your original terminal session.
:::

1. Run `direnv allow`
2. Run `ssh -v -i ./tmp/test_key_pair -p 2222 testu@localhost`

### Testing the SFTP Connection Manually

:::note
To exit from either the SFTP or SSH session, you can type and enter `exit` and you will be taken back to your original terminal session.
:::

1. Run `direnv allow`
2. Run `sftp -v -P 2222 testu@localhost`
