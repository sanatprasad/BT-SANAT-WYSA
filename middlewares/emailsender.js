const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();
async function sendbookdetails(email, book) {
  if (!email || !book || !book.user || !book.name || !book.date) {
    console.log('Invalid email or book details');
    return;
  }
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    let title, htmlline;
    if (!book.submit) {
      title = 'Issue';
      htmlline = `<h3>Hello ${book.user}</h3><p>You are issuing ${book.name} on ${book.date}</p>`;
    } else {
      title = 'Submit';
      htmlline = `<h3>Hello ${book.user}</h3><p>You are submitting ${book.name} on ${book.date}</p>`;
    }
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Book ${title} Confirmation`,
      html: htmlline,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
  } catch (error) {
    console.log('Error sending email: ', error);
  }
}

module.exports = {
  sendbookdetails,
};