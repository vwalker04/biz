const AWSClient = require('./AWSEmailClient');

const adamsEmail = "adam@avlabels.com";
const vaughnEmail = "vaughn@avlabels.com";
const sourceEmail = "contact@avlabels.com";

function createSESRequest(data) {
    const request = {
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
            Data: '📨 New message from AVLabels.com'
          }
        }
      }
      return request;
}

module.exports.sendEmail = (data, context) => {
    const request = createSESRequest(data);
    AWSClient.sendEmail(request, context)
}