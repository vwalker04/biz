const AWSEmailService = require('./AWS/AWSEmailService');
const axios = require('axios');

const reCaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";

function buildResponse(message, statusCode) {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://www.avlabels.com',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      message: message,
      statusCode: statusCode
    })
  };
}

module.exports.staticSiteMailer = async (event, context, callback) => {

  const body = JSON.parse(event.body);
  let verifyResult;

  if (body["g-recaptcha-response"] == null) {
    console.error("reCAPTCHA was null");
  } else {
    verifyResult = await axios.post(reCaptchaUrl, {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: body["g-recaptcha-response"]
    });

    if (verifyResult.status === 200) {
      if (!body.message) { // TODO: Add other validation here.
        callback(null, buildResponse("Bad request 🤖", 400));
      }
      AWSEmailService.sendEmail(body, context);
      callback(null, buildResponse("Success 🙌🏾", 200))
    } else {
      callback(null, buildResponse("reCAPTCHA failed to authenticate. 💀", 500));
    }
  }
}