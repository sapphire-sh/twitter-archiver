'use strict';

function date(d) {
	function pad(n) {
		return n < 10 ? '0'+n : n
	}
	if(typeof d !== 'object' || d.constructor.name !== 'Date') {
		d = new Date();
	}
    return d.getFullYear().toString().slice(-2) + pad(d.getMonth()+1) + pad(d.getDate());
}

var prev_date = date();

var knex = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: './db/tweet-' + prev_date + '.sqlite'
	}
});
var config = require('./config.js');
var twit = require('twit');
var tw = new twit(config);

var table_name = 'tweet';

knex.schema.hasTable(table_name)
.then(function(exists) {
	if(!exists) {
		knex.schema.createTableIfNotExists(table_name, function(table) {
			table.string('id', 20).notNullable().unique();
			table.text('data').notNullable();
			table.timestamp('created_at').defaultTo(knex.fn.now());
		}).return();
	}
});
var curr_date;
var stream = tw.stream('user');
stream.on('tweet', function(data) {
	curr_date = date(new Date(data.created_at));
	console.log(curr_date);
	if(prev_date === curr_date) {
		insert(data);
	}
	else {
		knex.destroy(function() {
			knex = require('knex')({
				client: 'sqlite3',
				connection: {
					filename: './db/tweet-' + curr_date + '.sqlite'
				}
			});
			knex.schema.createTableIfNotExists(table_name, function(table) {
				table.string('id', 20).notNullable().unique();
				table.text('data').notNullable();
				table.timestamp('created_at').defaultTo(knex.fn.now());
			}).then(function() {
				prev_date = curr_date;
				insert(data);
			});
		});
	}
});

function insert(data) {
	knex(table_name)
	.insert({
		id: data.id_str,
		data: JSON.stringify(data),
		created_at: new Date(data.created_at)
	}).return();
}

var _ = require('underscore');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use('/', express.static('public'));

app.get('/api/tweets', function(req, res) {
	knex(table_name)
	.orderBy('id', 'asc')
	.then(function(rows) {
		res.json(rows);
	});
});

app.get('/view/:id', function(req, res) {
	var k = require('knex')({
		client: 'sqlite3',
		connection: {
			filename: './db/tweet-' + req.params.id + '.sqlite'
		}
	});
	knex(table_name)
	.orderBy('id', 'asc')
	.then(function(rows) {
		res.render('pages/index', {
			id: req.params.id,
			tweets: rows
		});
	});
});

app.listen(8015);
