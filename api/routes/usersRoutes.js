const { check, validationResult } = require('express-validator');
const router = require('express').Router();
const controller = require('../controllers/usersController');
const validator = require('../validators/userValidator');
const { tokenValidation } = require('../config/utils');

router.post('/login', validator.Autentication(), controller.Autentication);
router.post('/create', validator.Create(), controller.Create);
router.post('/create-or-login-google', validator.CreateOrLoginGoogle(), controller.CreateOrLoginGoogle);
router.post('/forgot-password', validator.ForgotPassword(), controller.ForgotPassword);
router.post('/change-password', validator.ChangePassword(), tokenValidation,  controller.ChangePassword);

module.exports = router;
