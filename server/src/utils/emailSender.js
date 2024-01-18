const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (recipientEmail, emailSubject, emailTemaplate) => {
  const params = {
    to: recipientEmail, 
    from: process.env.SENDGRID_VERIFIED_EMAIL,
    subject: emailSubject,
    html: emailTemaplate,
  }

  return sendgrid.send(params);
};

module.exports = {
  sendEmail
};