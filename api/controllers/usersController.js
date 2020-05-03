'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Users = mongoose.model('Users');


exports.Autentication = function (req, res, next) {
    var query = Users.findOne({ email: req.body.email })
    query.exec()
        .then((user) => {
            if (user === null ) {
                res.status(401).json({ auth: false, msg: "Access invalid" });
            }
            bcrypt.compare(req.body.password, user.password, (_, result) => {
                if (result) {
                    const token = jwt.sign({ user }, process.env.SECRETAPI, { expiresIn: 300 });
                    res.status(200).json({ auth: true, msg: "Access OK", token: token });
                }
                else {
                    res.status(401).json({ auth: false, msg: "Access invalid" });
                }

            })
        })
        .catch((error) => {
            res.status(500).json({errorMessage: error.message});
        })
}

exports.Create = function (req, res, next) {
    bcrypt.hash(req.body.password, 10, function (err, token) {
        const newUser = new Users(req.body)
        newUser.password = token;
        newUser.save()
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    })
};