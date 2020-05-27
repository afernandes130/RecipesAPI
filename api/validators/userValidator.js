
const { check, validationResult } = require('express-validator');

exports.Autentication = function () {
    return [
        check('email', 'E-mail field is requerid').exists().notEmpty(),
        check('email', 'Invalid e-mail').isEmail(),
        check('password', 'Password field is requerid').notEmpty()
    ];
}
exports.Create = function () {
    return [
        check('nickname', 'NickName field is requerid').notEmpty(),
        check('email', 'E-mail field is requerid').exists().notEmpty(),
        check('email', 'Invalid e-mail').isEmail(),
        check('password', 'Password field is requerid').notEmpty()
    ];
}
exports.CreateOrLoginGoogle = function () {
  return [
      check('name', 'Name field is requerid').notEmpty(),
      check('email', 'E-mail field is requerid').exists().notEmpty(),
      check('email', 'Invalid e-mail').isEmail(),
      check('id', 'Id field is requerid').notEmpty()
  ];
}
exports.ForgotPassword = function () {
    return [
        check('email', 'E-mail field is requerid').exists().notEmpty(),
        check('email', 'Invalid e-mail').isEmail()
    ];
}
exports.ChangePassword = function () {
    return [
        check('email', 'E-mail field is requerid').exists().notEmpty(),
        check('email', 'Invalid e-mail').isEmail(),
        check('newpassword', 'Password field is requerid').notEmpty(),
        check('type', 'Type field is requerid').notEmpty()
    ];
}


exports.IsValidRequest = function (req, res)  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return false;
    }

    return true;
}