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
    forgotPassword(user, password) {
       return  transporter.sendMail({
            from: process.env.USERSMTP, // sender address
            to: user.email, // list of receivers
            subject: "Recuperação de senha", // Subject line
            html: `
                <b>Olá ${user.nickname} </b>
                <br>
                Nova senha: ${password}` // html body
        })
    }
 }


 