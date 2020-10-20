'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES();

function sendEmail(formData, callback) {
  const emailParams = {
    Destination: {
      CcAddresses: [
        // 'vwalk04@gmail.com',
        /* more CC email addresses */
      ],
      ToAddresses: [
        'vaughn@avlabels.com',
        'adam@avlabels.com'
        /* more To email addresses */
      ]
    },
    Source: 'contact@avlabels.com', /* required */
    ReplyToAddresses: [formData.reply_to],
    Message: {
      Body: {
         Text: {
          Charset: "UTF-8",
          Data: `Message: ${formData.message}\n\nSender Name: ${formData.name}\nSender Email: ${formData.reply_to}\nPhone No: ${formData.phone}`
         }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: '📢 New message from AVLabels.com'
      }
    }
  }

  SES.sendEmail(emailParams, callback);
}

module.exports.staticSiteMailer = (event, context, callback) => {
  const formData = JSON.parse(event.body);

  sendEmail(formData, function(err, data) {
    const response = {
      statusCode: err ? 500 : 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : 'https://www.avlabels.com',
        'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Credentials' : true,
      },
      body: JSON.stringify({
        message: err ? err.message : data,
      }),
    };

    callback(null, response);
  });

};