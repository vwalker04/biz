# AWS
[Lambda](https://us-east-2.console.aws.amazon.com/lambda/home?region=us-east-2#/functions/static-site-mailer-dev-staticSiteMailer?tab=configure)
for handling contact form submissions that broadcast emails to subscribed parties.

[Amplify](https://us-east-2.console.aws.amazon.com/amplify/home?region=us-east-2#/d38yu0uon6qj7k)
for handling continuous delivery and web app hosting.

Guide for setting up Serverless and AWS SES setup can be found [here](https://www.smashingmagazine.com/2018/05/building-serverless-contact-form-static-website/)

Requirements: `yarn and serverless`

When running the following commands, make sure you're in the `serverless-contact-form` directory.

Deploy: `npm run deploy` or `yarn sls deploy --verbose`

**Note**: Ensure you deploy when you make changes to files within the `serverless-contact-form` directory. Look to automate this step in CI.

Make sure you have `aws` CLI installed and if not logged in you may need to run `aws configure`.

Test locally: `yarn sls invoke local --function staticSiteMailer --path data.json`