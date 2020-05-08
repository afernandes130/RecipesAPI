
const express = require('express');
const app = express();
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./api/models/usersModel');
require("dotenv-safe").config();

const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

require('./api/routes')(app)


http.createServer(app).listen(port, () => {
    console.log(`Message RESTful API server started on: http://localhost:${port}`);
})