const AWS = require('aws-sdk');
const SES = new AWS.SES();

function createSESRequest(data) {
    console.log(`Sending email to ${process.env.ADAMS_EMAIL} and ${process.env.VAUGHNS_EMAIL} with data`, data);

    return {
        Destination: {
            CcAddresses: [
                // Optional CC Addresses here
                // `${process.env.VAUGHN_PERSONAL_EMAIL}`,
                // `${process.env.ADAM_PERSONAL_EMAIL}`
            ],
            ToAddresses: [
                `${process.env.ADAMS_EMAIL}`,
                `${process.env.VAUGHNS_EMAIL}`
            ]
        },
        Source: `${process.env.CONTACT_EMAIL}`,
        ReplyToAddresses: [data.reply_to],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<b><u>Message</u></b><br/>
              ${data.message}<br/><br/>
              <b><u>Sender Name:</u></b> ${data.name}<br/>
              <b><u>Sender Email:</u></b> ${data.reply_to}<br/>
              <b><u>Sender Phone No.:</u></b> ${data.phone}<br/>`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `📨 from ${data.name} | AVLabels website`
            }
        }
    };
}

module.exports.sendEmail = (data, context) => {
    const request = createSESRequest(data);
    SES.sendEmail(request, context.done)
}