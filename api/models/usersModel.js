const mongoose = require('mongoose');

const { Schema } = mongoose;
const loginSchema = new Schema({
  nickname: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  tempPassword: { type: String, default: null },
  status: { type: Boolean, require: true, default: true },
  changePassword: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
});





module.exports = mongoose.model('Users', loginSchema);
