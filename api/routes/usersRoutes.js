'use strict';
const user = require('../controllers/usersController');
const { check, body, validationResult } = require('express-validator');
const router = require('express').Router();
const {tokenValidation} = require('../config/utils')

router.post('/login',
    [check('email','E-mail field is requerid').exists().notEmpty(),
    check('email','Invalid e-mail').isEmail(),
    check('password','Password field is requerid').notEmpty()],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }   
        else{
            user.Autentication(req, res)
        }
    });

router.post('/create',
    [check('nickname','NickName field is requerid').notEmpty(),
    check('email','E-mail field is requerid').exists().notEmpty(),
    check('email','Invalid e-mail').isEmail(),
    check('password','Password field is requerid').notEmpty()], 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else{
            user.Create(req, res)
        }
    });

router.post('/forgotpassword',
    [check('email','E-mail field is requerid').exists().notEmpty(),
    check('email','Invalid e-mail').isEmail()],
    tokenValidation,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else{
            user.ForgotPassword(req, res)
        }
    });

    router.post('/changepassword',
    [check('email','E-mail field is requerid').exists().notEmpty(),
    check('email','Invalid e-mail').isEmail(),
    check('newpassword','Password field is requerid').notEmpty(),
    check('type','Type field is requerid').notEmpty()],
    tokenValidation,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else{
            user.ChangePassword(req, res)
        }
    });

module.exports = router
