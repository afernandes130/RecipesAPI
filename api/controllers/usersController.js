'use strict';
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose'), Users = mongoose.model('Users');


    exports.Autentication = function (req, res, next) {
        var query = Users.findOne({email: req.body.email, password: req.body.password})
        query.exec()
            .then((response) => {
                const token = jwt.sign({response}, process.env.SECRETAPI, {expiresIn: 300});
                res.status(200).send({auth:true, msg:"Access OK", token: token});
            })
            .catch((error) => {
                res.status(500).send(error);
            })
    };


    exports.Create = function(req, res,next) {
        var newUser = new Message(req.body);
        newUser.save(function(err, msg) {
        if (err)
            res.status(500).send(err);
        res.status(200).json(msg);
        });

 };