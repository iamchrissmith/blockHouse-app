const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config();

const db = require('./config/db');

const port = process.env.PORT || 8080;

mongoose.connect(db.url);

app.use(bodyParser.json());

app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

require('./app/routes')(router);

router.use('/', express.static('app', {redirect:false}));

app.use('/', router);

app.listen(port);

console.log('Server Running on ' + port);

exports = module.exports = app;