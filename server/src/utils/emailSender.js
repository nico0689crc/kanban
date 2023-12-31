const AWS = require('aws-sdk');

const SES_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const sendEmail = (recipientEmail, name) => {
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
          Data: 'This is the body of my email!',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Hello, ${name}!`,
      }
    },
  };
  return AWS_SES.sendEmail(params).promise();
};


module.exports = {
  sendEmail
};