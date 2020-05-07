'use strict'
require("dotenv-safe").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: process.env.HOSTSMTP,
    port: process.env.PORTSMTP,
    secure: process.env.SECURETLS, // true for 465, false for other ports
    auth: {
        user: process.env.USERSMTP, // generated ethereal user
        pass: process.env.PASSWORDSMTP // generated ethereal password
    }
    }); 

 module.exports = {
    forgotPassword(emails) {
       return  transporter.sendMail({
            from: process.env.USERSMTP, // sender address
            to: emails, // list of receivers
            subject: "Recuperação de senha", // Subject line
            html: "<b>CORPO DA MENSAGEM</b>" // html body
        })
    }
 }


 