const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./api/models/msgModel');
require('./api/models/usersModel');


require("dotenv-safe").config();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/msgRoutes');
var routes = require('./api/routes/usersRoutes');
routes(app);

app.listen(port);
console.log('Message RESTful API server started on: ' + port);