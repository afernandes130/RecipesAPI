'use strict';
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const emailaction = require('../config/email/emailActions');
var generator = require('generate-password');
const {tokenGenerate} = require('../config/utils')

exports.Autentication =  async function (req, res) {
    const user = await Users.findOne({ email: req.body.email })
    try {
        if (user === null ) {
            return res.status(401).json({ auth: false, msg: "Access invalid" });
        }
        const result = await bcrypt.compare(req.body.password, user.password)
        if (result) {
            const token = tokenGenerate(user)
            res.status(200).json({ auth: true, msg: "Access OK", token: token });
        }
        else {
            res.status(401).json({ auth: false, msg: "Access invalid" });
        }
    }
    catch(error){
        res.status(500).json({errorMessage: error.message});
    }
}

exports.Create = async function (req, res, next) {
    const user = new Users(req.body)
    user.password = await encryptPassword(req.body.password)
    try{
        await user.save();
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json(error)
    }
};

exports.ForgotPassword = async (req, res) => {
    const user = await Users.findOne({ email: req.body.email })
    try {
        const password = generator.generate({length: 8, numbers: true});
        const encryptPass = await encryptPassword(password)
        if (user != null ) {
            Users.findOneAndUpdate({ email: req.body.email }, {tempPassword: encryptPass , changePassword: true},).exec()
            emailaction.forgotPassword(user, password)
        }
        res.status(200).json({isValid: true,msg: "Informações para recuperação de senha foram enviadas para o email cadastrado"})
    }
    catch(error){
        res.status(500).json({errorMessage: error.message});
    }
}

exports.ChangePassword = async (req, res, next) =>{
    try{
        const user = await Users.findOne({ email: req.body.email });
            if (req.body.type == 1) {
                if (user.changePassword) {
                    const matchPassword = await bcrypt.compare(req.body.oldpassword , user.tempPassword)
                    if ( matchPassword ) {
                        await updatePassword(user, req.body.newpassword)
                        res.status(200).json({isValid: true, msg: "Password changed successfully"})
                    }
                    else {
                        res.status(200).json({isValid: true, msg: "Password do not match"})
                    }
                }
                else{
                    res.status(500).json({isValid: true, msg: "User not request change password"})
                }
            }
            else if (req.body.type == 2) {
                await updatePassword(user, req.body.newpassword)
                res.status(200).json({isValid: true, msg: "Password changed successfully"})
            }
            else {
                res.status(500).json({isValid: true, msg: "Type is not known"})
            }
    }
    catch(error) {
        res.status(500).json({errorMessage: error.message});
    }
}

async function updatePassword(user, newPassword) {
    const password = await encryptPassword(newPassword)
    const now = Date.now()
    await Users.findOneAndUpdate({ email: user.email}, {password: password , changePassword: false, modifiedOn: now, tempPassword: null })
}

async function encryptPassword(password) {
    return await bcrypt.hash(password, 10);
}
