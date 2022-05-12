This document will describe how to setup your browser to allow using your CAC for logging into various DOD sites.

# Step 1 - Import all the DOD Certs

Install all the DOD certs following the directions [here in these external docs](https://militarycac.com/macnotes.htm#DoD_certificates)

_NOTE there is a different workaround for Firefox than listed on that link so no need to go to Step 5a_

# Step 2 - Enable Firefox to use Apple Keychain for certs

For Firefox you need to add all the certs to it as well, since it has it's own cert store, or you can enable the following.

If you need to import them into Firefox the steps in [these external docs](https://militarycac.com/macnotes.htm#Firefox_users) will help

* Open the `about:config` page in a Firefox tab
* Accept the warning about changes
* Find `security.enterprise_roots.enabled`, using the search bar
* Set to `true` by clicking the toggle button or double clicking the preference

This should allow Firefox to use the certs in the Mac OS keychain you added in the first step of this doc.

# Step 3 - Add CAC decoding library to Firefox

To use the CAC in Firefox you need to point it at the PKCS11.so file so it can decode the certs.

* Open Firefox Preferences
* Click on *Privacy & Security*
* Click on *Security Devices*
* Click *Load*
* Fill in Module Name as `CAC`
* Fill in Module filename as `/usr/local/lib/opensc-pkcs11.so`
  * *NOTE* this comes as part of the opensc tools installed via brew I have `opensc: stable 0.20.0` installed currently
* Click on *Ok*
* Click on *Ok*

# Done

After completing these steps you should have all the DOD certs available to your browsers and Chrome, Safari, and Firefox should be able to read your CAC, assuming it's in the reader and the reader is plugged in.

# References

* [External DOD Cert import instructions](https://militarycac.com/macnotes.htm)
* [CAC For Firefox](https://www.ndu.edu/Incoming-Students/Cybersecurity-Compliance/CAC-for-Firefox/)
  * This page is out of date, but the instructions informed me enough to correct them which I documented above
