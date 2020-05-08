'use strict';
const user = require('../controllers/usersController');
const { check, validationResult } = require('express-validator');
const router = require('express').Router();

    router.post('/login',[
        check('email')
            .exists().withMessage('E-mail field is requerid')
            .isEmail().withMessage('Invalid e-mail'),
        check('password')
            .exists().withMessage('Password field is requerid')
        ],(req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            else{
                user.Autentication(req, res)
            }
        });

    router.post('/create', [
        check('nickname')
            .exists().withMessage('NickName field is requerid'),
        check('email')
            .exists().withMessage('E-mail field is requerid')
            .isEmail().withMessage('Invalid e-mail'),
        check('password')
            .exists().withMessage('Password field is requerid')], 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        else{
            user.Create(req, res)
        }
    });

    router.post('/forgotpassword',[
        check('email')
            .exists().withMessage('E-mail field is requerid')
            .isEmail().withMessage('Invalid e-mail')
        ], (req, res) => {
            user.ForgotPassword(req, res)
        }
    )

module.exports = router
