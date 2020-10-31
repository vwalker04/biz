const AWS = require('aws-sdk');
const SES = new AWS.SES();

module.exports.sendEmail = (emailData, context) => {
    SES.sendEmail(emailData, context.done)
}