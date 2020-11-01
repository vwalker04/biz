const AWSEmailService = require('./AWS/AWSEmailService');
const axios = require('axios');

const reCaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";

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
      AWSEmailService.sendEmail(body, context);

      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://www.avlabels.com',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ 
          message: 'Success from server 🎉',
          statusCode: 200
        })
      };

      callback(null, response);
    } else {
      console.warn("reCAPTCHA failed");
    }
  }
};