'use strict';

var twit = require('twit');
var express = require('express');

var config = require('../config');
var database = require('./lib/database')();
var tweet = require('./lib/tweet')(new twit(config));

var app = express();

app.set('view engine', 'ejs');
app.use('/static', express.static('public'));
app.use('/', require('./lib/router'));

app.listen(8016);
