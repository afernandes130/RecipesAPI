'use strict';
module.exports = function(app){
const user = require('../controllers/usersController');

app.route('/login')
    .post(user.Autentication);

 app.route('/login/create')
     .post(user.Create);
}; 