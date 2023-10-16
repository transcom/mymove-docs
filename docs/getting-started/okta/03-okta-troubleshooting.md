# Okta Troubleshooting

:::info
These are some common issues that have happened when implementing Okta. If your question is not answered here, please let us know so we can investigate and determine if it needs to be added here.
:::

<table align="center">
    <tr>
        <td align="center"><b>I am getting an "Access Denied" error from Okta when trying to log into MilMove</b></td>
    </tr>
    <tr>
        <td align="center">It is likely that you are not assigned to the application in Okta, which means they are denying you access to that application when being redirected back. Please ensure that you are assigned to the appropriate group in Okta before attempting to sign in again.</td>
    </tr>
    <tr>
        <td align="center"><b>I am getting looped when trying to sign into MilMove</b></td>
    </tr>
    <tr>
        <td align="center">This is likely due to you having an existing session with Okta, but your session with MilMove expired. This can happen when you only have a couple authenticators and have used them both to log into Okta so you can't <em>reuse</em> them when authenticating again. Okta will not even let you sign in so they are immediately sending you back to the MilMove sign in page. You can go to the Okta Dashboard and sign out from Okta there and then try signing into MilMove again.</td>
    </tr>
    <tr>
        <td align="center"><b>Okta is saying I can't sign in</b></td>
    </tr>
    <tr>
        <td align="center">If you are an office user and your account was created from a CSV file import, then you "technically" can't sign into Okta with a typical username/password scenario. If you log into MilMove with your Smart Card then that is your <b>ONLY</b> authenticator. So if you are needing to log into the Okta dashboard for some reason, you will need to log in with your Smart Card.</td>
    </tr>
    <tr>
        <td align="center"><b>I deleted a user and imported them again, but Okta is saying they still exist</b></td>
    </tr>
    <tr>
        <td align="center">When deleting and recreating users, Okta's systems take about 5 minutes to "officially" delete the user. Wait about 5 minutes and try importing the user again and it should be successful.</td>
    </tr>
</table>
