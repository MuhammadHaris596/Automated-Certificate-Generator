const  nodemailer = require('nodemailer') 
const generateCertificate = require('./generatePdf')

require('dotenv').config()

async function sendCertificateByEmail(name, email) {
  const pdfBytes = await generateCertificate(name);

  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'jawedharis55@gmail.com',
      pass: process.env.GOOGLE_PASSWORD, 
    },
  });

  await transporter.sendMail({
    from: 'jawedharis55@gmail.com',
    to: email,
    subject: 'Completion of Internship',
    text: 'Congratulations! Please find your certificate attached.',
    attachments: [
      {
        filename: `${name}-certificate.pdf`,
        content: pdfBytes, 
      },
    ],
  });

  console.log('Certificate sent to', email);
}


module.exports = sendCertificateByEmail