"use strict";(self.webpackChunkmymove_docs=self.webpackChunkmymove_docs||[]).push([[9607],{20183:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var n=i(87462),a=(i(67294),i(3905));i(8209);const r={sidebar_position:2},o="DoD Certificates",l={unversionedId:"about/security/dod-certs",id:"about/security/dod-certs",title:"DoD Certificates",description:"MilMove has two kinds of server certificates. The first is a normal, commercially-signed cert stored in AWS Certificate Manager (ACM). We use these certificates for the user-facing properties like . The other kind of certificate is signed by DISA, and we use those for communications (inbound and outbound) with other DoD entities.",source:"@site/docs/about/security/dod-certs.md",sourceDirName:"about/security",slug:"/about/security/dod-certs",permalink:"/mymove-docs/docs/about/security/dod-certs",draft:!1,editUrl:"https://github.com/transcom/mymove-docs/edit/main/docs/about/security/dod-certs.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"aboutSidebar",previous:{title:"Welcome to the MilMove Wiki!",permalink:"/mymove-docs/docs/about/"},next:{title:"DMDC Identity Web Services",permalink:"/mymove-docs/docs/about/security/dmdc-identity-web-services"}},s={},c=[{value:"Current Certificates",id:"current-certificates",level:2},{value:"Getting a certificate signed by DISA: create a Certificate Signing Request",id:"getting-a-certificate-signed-by-disa-create-a-certificate-signing-request",level:2},{value:"CSR Config File",id:"csr-config-file",level:3},{value:"New Certificate",id:"new-certificate",level:3},{value:"Renew Certificate",id:"renew-certificate",level:3},{value:"Checking the CSR",id:"checking-the-csr",level:3},{value:"Submitting the CSR",id:"submitting-the-csr",level:2},{value:"Choosing a Certificate Authority",id:"choosing-a-certificate-authority",level:3},{value:"Get Request Numbers",id:"get-request-numbers",level:3},{value:"Getting the PKI RA to approve your CSR(s)",id:"getting-the-pki-ra-to-approve-your-csrs",level:3},{value:"Fill out AF RA 2842-2",id:"fill-out-af-ra-2842-2",level:3},{value:"Submit the form to the RA",id:"submit-the-form-to-the-ra",level:3},{value:"Download the signed certificates",id:"download-the-signed-certificates",level:3},{value:"Reviewing and Verifying certificates",id:"reviewing-and-verifying-certificates",level:2},{value:"Reviewing x.509 certificates",id:"reviewing-x509-certificates",level:3},{value:"Reviewing CA certificate chain in PKCS#7 format",id:"reviewing-ca-certificate-chain-in-pkcs7-format",level:3}],m={toc:c},d="wrapper";function u(e){let{components:t,...i}=e;return(0,a.kt)(d,(0,n.Z)({},m,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"dod-certificates"},"DoD Certificates"),(0,a.kt)("p",null,"MilMove has two kinds of server certificates. The first is a normal, commercially-signed cert stored in AWS Certificate Manager (ACM). We use these certificates for the user-facing properties like ",(0,a.kt)("a",{parentName:"p",href:"https://my.move.mil/"},"https://my.move.mil/"),". The other kind of certificate is signed by DISA, and we use those for communications (inbound and outbound) with other DoD entities."),(0,a.kt)("p",null,"As of this writing, our DoD certificates expire in ",(0,a.kt)("strong",{parentName:"p"},"September of 2021.")," These certificates will need to be renewed before then."),(0,a.kt)("h2",{id:"current-certificates"},"Current Certificates"),(0,a.kt)("p",null,"Here are the current DoD-signed certificates and how they are used:"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Subject"),(0,a.kt)("th",{parentName:"tr",align:null},"X509v3 Alternative Names"),(0,a.kt)("th",{parentName:"tr",align:null},"Environment"),(0,a.kt)("th",{parentName:"tr",align:null},"CA"),(0,a.kt)("th",{parentName:"tr",align:null},"Expires"),(0,a.kt)("th",{parentName:"tr",align:null},"Inbound"),(0,a.kt)("th",{parentName:"tr",align:null},"Outbound"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"C=US, O=U.S. Government, OU=DoD, OU=PKI, OU=USTRANSCOM, CN=my.move.mil"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"my.move.mil, api.move.mil, dps.move.mil, gex.move.mil, office.move.mil, orders.move.mil")),(0,a.kt)("td",{parentName:"tr",align:null},"prod"),(0,a.kt)("td",{parentName:"tr",align:null},"DOD SW CA-54"),(0,a.kt)("td",{parentName:"tr",align:null},"Sep 13 14:14:27 2021 GMT"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"https://orders.move.mil"},"https://orders.move.mil")),(0,a.kt)("td",{parentName:"tr",align:null},"DMDC Identity Web Services (prod)")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"C=US, O=U.S. Government, OU=DoD, OU=PKI, OU=USTRANSCOM, CN=my.stg.move.mil"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"my.stg.move.mil, api.stg.move.mil, dps.stg.move.mil, gex.stg.move.mil, office.stg.move.mil, orders.stg.move.mil")),(0,a.kt)("td",{parentName:"tr",align:null},"stg"),(0,a.kt)("td",{parentName:"tr",align:null},"DOD SW CA-54"),(0,a.kt)("td",{parentName:"tr",align:null},"Sep 13 14:20:04 2021 GMT"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"https://orders.stg.move.mil"},"https://orders.stg.move.mil")),(0,a.kt)("td",{parentName:"tr",align:null},"DMDC Identity Web Services (Contractor Test)")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"C=US, O=U.S. Government, OU=DoD, OU=PKI, OU=USTRANSCOM, CN=my.exp.move.mil"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"my.exp.move.mil, api.exp.move.mil, dps.exp.move.mil, gex.exp.move.mil, office.exp.move.mil, orders.exp.move.mil")),(0,a.kt)("td",{parentName:"tr",align:null},"exp"),(0,a.kt)("td",{parentName:"tr",align:null},"DOD SW CA-54"),(0,a.kt)("td",{parentName:"tr",align:null},"Sep 13 14:22:14 2021 GMT"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"https://orders.exp.move.mil"},"https://orders.exp.move.mil")),(0,a.kt)("td",{parentName:"tr",align:null},"DMDC Identity Web Services (Contractor Test)")))),(0,a.kt)("h2",{id:"getting-a-certificate-signed-by-disa-create-a-certificate-signing-request"},"Getting a certificate signed by DISA: create a Certificate Signing Request"),(0,a.kt)("p",null,"Generate a Certificate Signing Request (CSR) for each certificate you wish to register or renew."),(0,a.kt)("h3",{id:"csr-config-file"},"CSR Config File"),(0,a.kt)("p",null,"The easiest way to do this with OpenSSL is to create a configuration file with the certificate details and feed that to the OpenSSL command. For example, here is the config file I made for the production my.move.mil CSR:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ini"},"[req]\ndefault_bits = 2048\nprompt = no\ndefault_md = sha256\nreq_extensions = req_ext\ndistinguished_name = dn\n\n[ dn ]\nC=US\nST=IL\nL=Belleville\nO=USTRANSCOM\nOU=USTRANSCOM\nemailAddress=dp3-integrations@truss.works\nCN = my.move.mil\n\n[ req_ext ]\nsubjectAltName = @alt_names\n\n[ alt_names ]\nDNS.1 = my.move.mil\nDNS.2 = api.move.mil\nDNS.3 = dps.move.mil\nDNS.4 = gex.move.mil\nDNS.5 = office.move.mil\nDNS.6 = orders.move.mil\n")),(0,a.kt)("p",null,"Absent other guidance, I used the same C, ST, L, O, and OU values as the cert presented by ",(0,a.kt)("a",{parentName:"p",href:"https://www.ustranscom.mil/"},"https://www.ustranscom.mil/"),"."),(0,a.kt)("p",null,"Note the alternate names - this file covers a lot of FQDNs, even ones where we won't present the DoD-signed cert as a server. I did this both to preserve flexibility, and to ensure that when MilMove connects to other DoD entities using this cert, validation has the greatest chance of succeeding. If you don't need alternate names or other extensions, delete the ",(0,a.kt)("inlineCode",{parentName:"p"},"[ req_ext ]")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"[ alt_names ]")," sections, along with the line ",(0,a.kt)("inlineCode",{parentName:"p"},"req_extensions = req_ext")," in the ",(0,a.kt)("inlineCode",{parentName:"p"},"[req]")," section."),(0,a.kt)("h3",{id:"new-certificate"},"New Certificate"),(0,a.kt)("p",null,"The command to generate the CSR with a new private key (no passphrase) is"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"openssl req -nodes -new -config <config file path> -keyout <CommonNameHere>.key -out <CommonNameHere>.csr")),(0,a.kt)("h3",{id:"renew-certificate"},"Renew Certificate"),(0,a.kt)("p",null,"To renew a certificate, you probably want to reuse the existing private key. In that case, the command is"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"openssl req -new -config <config file path> -key <CommonNameHere>.key -out <CommonNameHere>.csr")),(0,a.kt)("p",null,"NOTE: do not trust openssl\u2019s ",(0,a.kt)("inlineCode",{parentName:"p"},"-x509toreq")," option. It strips the alternative names and the e-mail address from the certificate. It\u2019s just a convenience option anyway; use the config file input to be certain you\u2019re getting exactly the certificate you want."),(0,a.kt)("h3",{id:"checking-the-csr"},"Checking the CSR"),(0,a.kt)("p",null,"To double-check that the CSR contains the right information, the command is"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"openssl req -text -noout -verify -in <csr filename>")),(0,a.kt)("h2",{id:"submitting-the-csr"},"Submitting the CSR"),(0,a.kt)("h3",{id:"choosing-a-certificate-authority"},"Choosing a Certificate Authority"),(0,a.kt)("p",null,"For our purposes, you want the most recent (i.e., highest numbered) DOD SW-CA."),(0,a.kt)("h3",{id:"get-request-numbers"},"Get Request Numbers"),(0,a.kt)("p",null,"Using either Google Chrome or Microsoft Edge (NOT Internet Explorer) on a NIPR machine, fill in the web form at the desired CA\u2019s website; for DOD SW CA-54, that\u2019s ",(0,a.kt)("a",{parentName:"p",href:"https://ee-sw-ca-54.csd.disa.mil/ca/ee/ca"},"https://ee-sw-ca-54.csd.disa.mil/ca/ee/ca"),'. You will need a NIPR account associated with your CAC. On the "2048-bit SSL Server Enrollment Form," you can paste the contents of the CSR file you generated. You will also need to enter the same certificate details, like the CN and alternate names, into the other fields.'),(0,a.kt)("p",null,"For each CSR you submit, you will get a Request Number. Make a note of that, because the PKI RA will need it to approve your request."),(0,a.kt)("h3",{id:"getting-the-pki-ra-to-approve-your-csrs"},"Getting the PKI RA to approve your CSR(s)"),(0,a.kt)("p",null,"Now that DISA has your CSR, you need to contact the appropriate Registration Authority for your system to approve your request. As of this writing, the appropriate RA for USTRANSCOM is the Air Force PKI RA."),(0,a.kt)("p",null,"Air Force PKI Help Desk: ",(0,a.kt)("a",{parentName:"p",href:"https://intelshare.intelink.gov/sites/usaf-pki/"},"https://intelshare.intelink.gov/sites/usaf-pki/")," ",(0,a.kt)("a",{parentName:"p",href:"mailto:afpki.ra@us.af.mil"},"afpki.ra@us.af.mil")),(0,a.kt)("h3",{id:"fill-out-af-ra-2842-2"},"Fill out AF RA 2842-2"),(0,a.kt)("p",null,"Fill out the form AF RA 2842-2 using Adobe Acrobat Reader DC. (Do not use non-Adobe PDF products for this, you will have a bad time.) The form is available from the ",(0,a.kt)("a",{parentName:"p",href:"https://intelshare.intelink.gov/sites/usaf-pki/"},"AF PKI site on Intelink"),"."),(0,a.kt)("p",null,"Some guidance on filling out this form:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"CERTIFICATE INFORMATION",(0,a.kt)("ol",{parentName:"li"},(0,a.kt)("li",{parentName:"ol"},"The CERTIFICATE TYPE is \u201cApplication Server\u201d."),(0,a.kt)("li",{parentName:"ol"},"If you are doing multiple CSRs, the \u201cCERTIFICATE COMMON NAME (CN) / Fully Qualified Domain Name\u201d is \u201cMultiple Device Request\u201d."),(0,a.kt)("li",{parentName:"ol"},"For the REQUEST INFORMATION OR ALT LOGIN TOKEN DETAILS, select the same CA that you submitted the CSR to."),(0,a.kt)("li",{parentName:"ol"},"Enter the DEVICE INFORMATION Type / OS / Application, e.g., \u201cApplication Server / Alpine Linux 3.7 / MilMove\u201d."))),(0,a.kt)("li",{parentName:"ol"},"CERTIFICATE ACCEPTED BY - should be the same person who sent the CSR to DISA. Because you will be digitally signing the form, you can leave 2.e and 2.f blank."),(0,a.kt)("li",{parentName:"ol"},"Leave section 3 blank."),(0,a.kt)("li",{parentName:"ol"},"On the second page, fill in the CN, CA, and Request number for each CSR. You don\u2019t need to worry about the alternate names, just the CNs.")),(0,a.kt)("p",null,"Once you have filled out all of the other fields, digitally sign the PDF in section 2.h with your CAC."),(0,a.kt)("h3",{id:"submit-the-form-to-the-ra"},"Submit the form to the RA"),(0,a.kt)("p",null,"Send a digitally signed e-mail (using Outlook on a NIPR machine, or with Mail.app) to ",(0,a.kt)("a",{parentName:"p",href:"mailto:afpki.ra@us.af.mil."},"afpki.ra@us.af.mil.")," Attach the completed and digitally signed 2842-2 form. The AF RA expects applicants to be on AFNET, so you will need to justify why you are using the PDF process instead of the automated Windows-based process. Here\u2019s what worked for me:"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"I am reaching out on behalf of MilMove to complete the CSR process. I have attached the signed AF RA 2842-2 form detailing the certificates that we need and acknowledging my responsibilities."),(0,a.kt)("p",{parentName:"blockquote"},"MilMove is not able to use the LTMA MMP template for obtaining certificates. MilMove is not internal to AFNET or to USTRANSCOM's network and does not run on Windows.")),(0,a.kt)("h3",{id:"download-the-signed-certificates"},"Download the signed certificates"),(0,a.kt)("p",null,"Assuming the PKI RA accepts your submission, you will get a notification email including instructions on how to download your signed certificates. In short, in Chrome or Edge go back to the CA\u2019s website on NIPR (e.g., ",(0,a.kt)("a",{parentName:"p",href:"https://ee-id-sw-ca-54.csd.disa.mil/ca/ee/ca/"},"https://ee-id-sw-ca-54.csd.disa.mil/ca/ee/ca/"),"), click \u201cRetrieval\u201d, and enter the Request numbers from before."),(0,a.kt)("h2",{id:"reviewing-and-verifying-certificates"},"Reviewing and Verifying certificates"),(0,a.kt)("h3",{id:"reviewing-x509-certificates"},"Reviewing x.509 certificates"),(0,a.kt)("p",null,"To check a Base64-encoded x.509 certificate:"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"openssl x509 -text -noout -in <x509 certificate>.cer")),(0,a.kt)("h3",{id:"reviewing-ca-certificate-chain-in-pkcs7-format"},"Reviewing CA certificate chain in PKCS#7 format"),(0,a.kt)("p",null,"To check a Base64-encoded PKCS#7 format certificate chain:"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"openssl pkcs7 -text -print_certs -noout -in <cert chain>.p7b")))}u.isMDXComponent=!0}}]);