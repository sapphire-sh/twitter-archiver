'use strict';

var twit = require('twit');
var express = require('express');

var config = require('../config');
var sqlite = require('./lib/sqlite')();
var tweet = require('./lib/tweet')(new twit(config));

var app = express();

app.set('view engine', 'ejs');
app.use('/', express.static('public'));

app.use('/api', require('./router'));

app.listen(8016);
