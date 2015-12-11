'use strict';

var fs = require('fs');
var knex = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: './tweet.sqlite'
	}
});
var config = require('./config.js');
var twit = require('twit');
var tw = new twit(config);

var table_name = 'tweet';

knex.schema.createTableIfNotExists(table_name, function(table) {
	table.increments();
	table.string('data').notNullable();
	table.timestamp('created_at').defaultTo(knex.fn.now());
}).return();

var stream = tw.stream('user');
stream.on('tweet', function(data) {
	knex(table_name)
	.insert({
		data: JSON.stringify(data)
	}).return();
});

