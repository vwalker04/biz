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
  try {
    // Parse request body
    const body = JSON.parse(event.body);

    // Validate required fields
    if (!body.name || !body.message) {
      console.error("Name or message was not provided");
      callback(null, buildResponse("Bad request 💀", 400));
      return;
    }

    // Validate reCAPTCHA
    if (!body["g-recaptcha-response"]) {
      console.error("reCAPTCHA was null");
      callback(null, buildResponse("reCAPTCHA verification required", 400));
      return; 
    }

    // Verify reCAPTCHA token
    const verifyResult = await axios.post(reCaptchaUrl, {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: body["g-recaptcha-response"]
    });

    // Send email if verification succeeded
    if (verifyResult.status === 200) {
      await AWSEmailService.sendEmail(body, context);
      callback(null, buildResponse("Success 🙌🏾", 200));
    } else {
      console.error("reCAPTCHA verification failed", verifyResult.status);
      callback(null, buildResponse("reCAPTCHA failed to authenticate 💀", 403));
    }
    
  } catch (error) {
    // Log and handle errors
    console.error("Error processing request:", error);
    callback(null, buildResponse("Server error", 500));
  }
};