const mongoose = require('mongoose');

const uri = 'mongodb+srv://usrrecipes:C@5s-S0lut!0n5@cars-solutions-a0r3v.mongodb.net/test?retryWrites=true&w=majority';

module.exports = mongoose.connect(uri, { useNewUrlParser: true });
