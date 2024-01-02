const AWS = require('aws-sdk');

const SES_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const sendEmail = (recipientEmail, emailSubject, emailTemaplate) => {
  let params = {
    Source: process.env.AWS_VERIFIED_EMAIL,
    Destination: {
      ToAddresses: [
        recipientEmail
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: emailTemaplate,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: emailSubject,
      }
    },
  };
  return AWS_SES.sendEmail(params).promise();
};

module.exports = {
  sendEmail
};