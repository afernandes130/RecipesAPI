
const express = require('express');
const app = express();
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require("dotenv-safe").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,  useFindAndModify: false });

require('require-dir')('./api/models');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api',require('./api/routes'))
app.use(cors());

const port = process.env.PORT || 3000;
http.createServer(app).listen(port, () => {
    console.log(`Message RESTful API server started on: http://localhost:${port}`);
})