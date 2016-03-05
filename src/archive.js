'use strict';

var twit = require('twit');
var express = require('express');

var config = require('../config');
var tweet = require('./lib/tweet')(new twit(config));

var app = express();

app.use(require('morgan')(':date[iso] :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));

app.set('view engine', 'ejs');
app.use('/static', express.static('public'));
app.use('/', require('./lib/router'));

app.listen(8016);
