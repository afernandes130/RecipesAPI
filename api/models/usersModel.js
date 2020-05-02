'use strict';
var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const loginSchema =  new Schema({
    nickname : {type : String, require : true},
    email:{ type: String, require : true, unique: true},
    password : {type: String, require : true},
    status : {type : Boolean, require : true, default: true}
});
module.exports = mongoose.model('Users',loginSchema);