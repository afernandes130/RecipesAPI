const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const Users = mongoose.model('Users');
const generator = require('generate-password');
const emailaction = require('../config/email/emailActions');
const { tokenGenerate } = require('../config/utils');

async function encryptPassword(password) {
  return bcrypt.hash(password, 10);
}

async function updatePassword(user, newPassword) {
  const password = await encryptPassword(newPassword);
  const now = Date.now();
  await Users.findOneAndUpdate(
    { email: user.email },
    {
      password,
      changePassword: false,
      modifiedOn: now,
      tempPassword: null,
    },
  );
}

exports.Autentication = async function authentication(req, res) {
  const user = await Users.findOne({ email: req.body.email });
  try {
    if (user === null) {
      res.status(401).json({ auth: false, msg: 'Access invalid' });
      return;
    }
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      const token = tokenGenerate(user);
      res.status(200).json({ auth: true, msg: 'Access OK', token });
    } else {
      res.status(401).json({ auth: false, msg: 'Access invalid' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

exports.Create = async function create(req, res) {
  const user = new Users(req.body);
  user.password = await encryptPassword(req.body.password);
  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.ForgotPassword = async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  try {
    const password = generator.generate({ length: 8, numbers: true });
    const encryptPass = await encryptPassword(password);
    if (user != null) {
      Users.findOneAndUpdate(
        { email: req.body.email },
        { tempPassword: encryptPass, changePassword: true },
      ).exec();
      emailaction.forgotPassword(user, password);
    }
    res.status(200).json({ isValid: true, msg: 'Informações para recuperação de senha foram enviadas para o email cadastrado' });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

exports.ChangePassword = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (req.body.type === 1) {
      if (user.changePassword) {
        const matchPassword = await bcrypt.compare(req.body.oldpassword, user.tempPassword);
        if (matchPassword) {
          await updatePassword(user, req.body.newpassword);
          res.status(200).json({ isValid: true, msg: 'Password changed successfully' });
        } else {
          res.status(200).json({ isValid: true, msg: 'Password do not match' });
        }
      } else {
        res.status(500).json({ isValid: true, msg: 'User not request change password' });
      }
    } else if (req.body.type === 2) {
      await updatePassword(user, req.body.newpassword);
      res.status(200).json({ isValid: true, msg: 'Password changed successfully' });
    } else {
      res.status(500).json({ isValid: true, msg: 'Type is not known' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
