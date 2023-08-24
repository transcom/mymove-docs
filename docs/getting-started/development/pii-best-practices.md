# PII Best Practices

Server side: any downloadable content passed to the client should by default have an inline content disposition (like PDFs).

Client side: before accessing any prod environment, fix your browser settings to display PDFs, not use an external app.

## More about content dispositions

An inline disposition tells the browser to display a file inline if it can. If you instead set an attachment disposition, the browser will download the file even when it is capable of displaying the data itself. If an engineer downloads PII instead of letting their browser display it, this will cause a security incident. So make sure content like PDFs are passed to the client with inline dispositions. You can read more in [the official Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition "MDN: Content-Disposition Headers").

## More about browser settings

Even if an inline disposition is set, most browsers still allow you to override that behavior and automatically download certain file types.

Before working with the prod environment, ensure you have changed your settings to display PDFs in the browser. In most browsers, you can find the relevant setting by searching "PDF" in the settings menu.
