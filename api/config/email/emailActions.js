require('dotenv-safe').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.HOSTSMTP,
  port: process.env.PORTSMTP,
  secure: process.env.SECURETLS,
  auth: {
    user: process.env.USERSMTP,
    pass: process.env.PASSWORDSMTP,
  },
});

module.exports = {
  forgotPassword(user, password) {
    return transporter.sendMail({
      from: process.env.USERSMTP, // sender address
      to: user.email, // list of receivers
      subject: 'Recuperação de senha', // Subject line
      html: `
                <b>Olá ${user.nickname} </b>
                <br>
                Nova senha: ${password}`,
    });
  },
};
