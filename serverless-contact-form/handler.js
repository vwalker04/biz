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
         Html: {
          Charset: "UTF-8",
          Data: `<b><u>Message:</u></b><br>
          ${formData.message}<br><br>
          <b><u>Sender Name:</u></b> ${formData.name}<br>
          <b><u>Sender Email:</u></b> ${formData.reply_to}<br>
          <b><u>Phone No:</u></b> ${formData.phone}<br>`
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