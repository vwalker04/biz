Guide for setting up Serverless and AWS SES setup can be found [here](https://www.smashingmagazine.com/2018/05/building-serverless-contact-form-static-website/)

Deploy: `yarn sls deploy --verbose`

Test locally: `yarn sls invoke local --function staticSiteMailer --path data.json`