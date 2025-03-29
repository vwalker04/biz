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
    if (body.name === undefined || body.message === undefined) {
      return buildResponse("Bad request: missing required fields 🤖", 400);
    }
    
    // Validate reCAPTCHA
    if (!body["g-recaptcha-response"]) {
      console.error("reCAPTCHA token missing");
      return buildResponse("reCAPTCHA verification required", 400);
    }
    
    // Verify reCAPTCHA token
    const verifyResult = await axios.post(reCaptchaUrl, {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: body["g-recaptcha-response"]
    });
    
    // Check reCAPTCHA verification result
    if (verifyResult.data.success !== true) {
      console.error("reCAPTCHA verification failed", verifyResult.data);
      return buildResponse("reCAPTCHA verification failed 💀", 403);
    }
    
    // Send email
    await AWSEmailService.sendEmail(body, context);
    
    // Return success response
    return buildResponse("Email sent successfully 🙌🏾", 200);
    
  } catch (error) {
    // Log and handle errors
    console.error("Error processing request:", error);
    return buildResponse(`Server error: ${error.message}`, 500);
  }
};