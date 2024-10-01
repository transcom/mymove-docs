# Okta Emails & VTL

Okta sends out several kinds of emails (activation code, password reset, etc), but since MilMove contains different categories of users (customer, office, admin) we needed to use <strong>Velocity Template Language</strong> in the email templates to generate different emails for each kind of user.

:::info Velocity Template Language
VTL is a scripting language used by Apache Velocity Engine, which is mostly used to create dynamic output types based off of variables and logic.
Okta implements it in their email templates, and you can find [more information here on how Okta implements it here.](https://help.okta.com/en-us/content/topics/settings/velocity-variables.htm)
:::

## Email Templates in Okta:
1. Sign into Okta Admin
2. In the sidebar: Customizations -> Brands
3. Select the `test-milmove` (non-prod) or `milmove` (prod) brand
4. Select the `Emails` tab
5. Select your email template that you want to edit

## VTL - An Example:
```
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<div style="background-color: ${brand.theme.secondaryColor}; margin: 0">
    <table style="font-family: 'Proxima Nova', 'Century Gothic', Arial, Verdana, sans-serif; font-size: 14px; color: #5e5e5e; width:98%; max-width: 600px; float: none; margin: 0 auto;" border="0" cellpadding="0" cellspacing="0" valign="top" align="left">
        <tr align="middle"><td style="padding-top: 30px; padding-bottom: 32px;"><img src="${brand.theme.logo}" height="37"></td></tr>
        <tr bgcolor="#ffffff"><td>
            <table bgcolor="#ffffff" style="width: 100%; line-height: 20px; padding: 32px; border: 1px solid; border-color: #f0f0f0;" cellpadding="0">
                <tr>
                    <td style="color: #5e5e5e; font-size: 22px; line-height: 22px;">
                        Welcome to MilMove!
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 24px; vertical-align: bottom;">
                        Hi $!{StringTool.escapeHtml($!{user.profile.firstName})},
                    </td>
                </tr>
                    #foreach($groupId in $user.groups.ids)
                        #if($groupId == "groupId" || $groupId == "groupId" || $groupId == "groupId")
                            <tr>
                                <td style="padding-top: 24px">
                                    Your request for a MilMove account has been approved and an account has been created.
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-top: 12px">
                                    Click this link to activate your account "(<span style="margin: 0 4px;">
                                    <a href="${activationLink}" style="background-color: #007bff; color: #ffffff; padding: 5px 8px; text-decoration: none; border-radius: 3px; background-color: ${brand.theme.primaryColor}; border-color: ${brand.theme.primaryColor};">Activate Okta Account</a>
                                    </span>)". After your account is activated, you will access MilMove using <a href="https://my.move.mil/">https://my.move.mil/</a>.
                                </td>
                            </tr>
                            #break
                        #elseif($groupId == "groupId" || $groupId == "groupId" || $groupId == "groupId" || $groupId == "groupId")
                            <tr>
                                <td style="padding-top: 24px">
                                    Your request for a MilMove account has been approved and an account has been created.
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-top: 24px">
                                    You may proceed to MilMove using <a href="https://office.move.mil/">https://office.move.mil/</a>.
                                </td>
                            </tr>
                            #break
                        #else
                            <tr>
                                <td style="padding-top: 24px">
                                    Your request for a MilMove account has been approved and an account has been created.
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-top: 24px">
                                    Please visit <a href="https://move.mil/">https://move.mil/</a> for further assistance.
                                </td>
                            </tr>
                            #break
                        #end
                    #end
            </table>
        </td></tr>
        <tr>
            <td>
                <table style="width: 100%; line-height: 20px; padding: 32px;" cellpadding="0">
                    <tr>
                        <td style="font-size: 12px; padding-top: 24px; color: #999;">
                            This email was automatically sent by someone using <a href="https://www.okta.com" style="color:#616161">Okta's service</a>. Replies are not monitored or answered. Okta has no visibility over who receives these emails, and is not responsible for, and disclaims any and all liability associated with, this email's content. <br/>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
</body>
</html>
```
- In the Okta profile, we have access to the `${user.groups.ids}` variable
- This returns an array of all of the groups that the user is a part of (ex. `[groupId1, groupId2]`)
- with VTL, we are able to perform `forEach` and dynamically send the correct activation email based on the groups the user is assigned to