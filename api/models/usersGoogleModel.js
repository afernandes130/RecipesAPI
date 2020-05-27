const mongoose = require('mongoose');

const { Schema } = mongoose;
const loginGoogleSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  id: { type: String, require: true },
  photo: { type: String, require: false },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UsersGoogle', loginGoogleSchema);