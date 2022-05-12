Here are some potential CAC reader errors and their solutions.

# CAC Errors

# 1. No matching slot found

   When running a client like `prime-api-client` you may get an error as follows
   ```
   2020/08/21 21:26:09 No matching slot found
   exit status 1
   ```
   This means the script cannot find your card. Check that your card reader and card are properly plugged in. You can run this tool to see what is plugged in.
   ```
   >  pkcs11-tool --list-token-slots
   Available slots:
   No slots.
   ```
   If your card IS plugged in, you should see
   ```
   >  pkcs11-tool --list-token-slots
   Available slots:
   Slot 0 (0x0): Generic Smart Card Reader Interface
      token label        : LASTNAME.FIRSTNAME.MIDDLE.NUM...
      token manufacturer : piv_II
      token model        : PKCS#15 emulated
      token flags        : login required, token initialized, PIN initialized
      hardware version   : 0.0
      firmware version   : 0.0
      serial num         : hexadecimalserial
      pin min/max        : 4/8
   ```

# 2. No matching slot found when card IS plugged in

   Sometimes you might see that error even if your card is plugged in.
   That can happen if you have more than one smartcard-like object plugged in, like a **Yubikey**.

   This may show up as the following error too:
   ```
   Ensure CAC reader and card inserted: pkcs11: the token has no such object
   ```

   That's because the script defaults to picking one of the slots, and gets confused by the Yubikey, instead of checking all of them to find your CAC.

   You *should* be able to see the Yubikey slot information when you run this tool.
   ```
   >  pkcs11-tool --list-token-slots
   Slot 0 (0x0): Generic Smart Card Reader Interface
      ...
   Slot 1 (0x4): Yubico YubiKey OTP+FIDO+CCID
      ...
   ```

   To solve this you can do either of the following

   a) Remove the Yubikey when using the client and your CAC card.

   b) Tell the client to select which token to use.

   To select the token in the client you use the `--token-label` argument.

   The token label is the one listed in your slot info in the format `LASTNAME.FIRSTNAME.MIDDLE.NUM...` and yes, the three periods are included.

   So you need to pass that into the client as follows

   ```
   go run ./cmd/prime-api-client --tokenlabel LASTNAME.FIRSTNAME.MIDDLE.NUM... --cac --hostname api.stg.move.mil --port 443 fetch-mto-updates
   ```

   I just save the above as an alias (minus the fetch-mto-updates) to reuse whenever I need to hit staging.

# 3. Cannot sign Adobe PDF documents with CAC

   i. In adobe acrobat, go to Preferences > Signatures > Creation and Appearance > More.

   ii. Set default signing to CAdES-Equivalent and make sure CryptoTokenKit support is enabled.

   iii. Then (again in Preferences > Signatures Dialog) under Identities and Trusted Certificates > More >PKCS#11 Modules. Choose attach module and put in the path to pkcs.

      On my computer it was `/usr/local/lib/opensc-pkcs11.so`

   iv. Then Refresh, in the left sidebar you should have a new entry called OpenSC smartcard, with your card listed under that. You can then Log in with your PIN.

# 4. Using the prime-api-client results in a cert authority error

If you are getting certificate authority error like the one below when trying to execute commands against staging using the `prime-api-client` then you need to ensure that you are trusting the DOD Root Certs in your Keychain and have loaded all the DOD certs in your keychain as well. For details on adding them properly see [Using-your-CAC-in-Browsers-on-MacOS](../dev/tools/CAC/Using-your-CAC-in-Browsers-on-MacOS.md)

```sh
2020/09/23 16:13:40 Get operation to https://api.stg.move.mil:443/prime/v1/move-task-orders failed, check if server is running : x509: certificate signed by unknown authority
```

# 5. Using the prime-api-client results in a 401 unauthorized

If you are getting a 401 or 403 when making prime api calls to staging this means your certificate is not authorized in staging. This will happen when you get a new cac or renewed one as it will have new certs. See [Using mTLS with your CAC](../dev/tools/CAC/use-mtls-with-cac.md) for details to create the migration for a new cac for the first time or replace your old cac cert
