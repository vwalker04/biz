'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES();
const axios = require('axios');

const reCaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";
const adamsEmail = "vwalker04@yahoo.com";
const vaughnEmail = "vaughn@avlabels.com";
const sourceEmail = "contact@avlabels.com";

function sendEmail(formData, context, callback) {

  SES.sendEmail(constructSESEmail(formData), context.done);

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://www.avlabels.com',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Credentials': true,
    },
  })
}

function constructSESEmail(formData) {
  const emailBody = {
    Destination: {
      CcAddresses: [
        // Optional CC Addresses here
      ],
      ToAddresses: [
        `${vaughnEmail}`,
        `${adamsEmail}`
      ]
    },
    Source: `${sourceEmail}`,
    ReplyToAddresses: [formData.reply_to],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<b><u>Message</u></b><br/>
          ${formData.message}<br/><br/>
          <b><u>Sender Name:</u></b> ${formData.name}<br/>
          <b><u>Sender Email:</u></b> ${formData.reply_to}<br/>
          <b><u>Sender Phone No.:</u></b> ${formData.phone}<br/>`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: '📨 New message from AVLabels.com'
      }
    }
  }
  return emailBody;
}

module.exports.staticSiteMailer = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  let verifyResult;

  if (body["g-recaptcha-response"] == null) {
    console.warn("No reCAPTCHA supplied.")
  } else {
    verifyResult = await axios.post(reCaptchaUrl, {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: body["g-recaptcha-response"]
    });

    if (verifyResult.status === 200) {
      sendEmail(body, context, callback);
    } else {
      console.warn("reCAPTCHA failed");
    }
  }
};