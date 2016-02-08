'use strict';

function date(d, p) {
	function pad(n) {
		return n < 10 ? '0' + n : n
	}
	if(typeof d !== 'object' || d.constructor.name !== 'Date') {
		d = new Date();
	}
	var str = d.getFullYear();
	str += '-' + pad(d.getMonth() + 1);
	str += '-' + pad(d.getDate());
	
	if(p === true) {
		str += '/' + pad(d.getHours());
	}
	
	return str;
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

var users = {
    blocked: [],
    muted: []
};

(function(fn) {
    fn();
    setInterval(fn, 15 * 60 * 1000);
})(function() {
    tw.get('blocks/ids', function(err, res) {
    	users.blocked = res.ids;
    });

    tw.get('mutes/users/ids', function(err, res) {
        users.muted = res.ids;
    });
});

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

app.get('/view/:date/:hour', function(req, res) {
	var now = new Date(req.params.date);
	now.setHours(req.params.hour);
	var prev = new Date(now.getTime());
	var next = new Date(now.getTime());
	prev.setHours(prev.getHours() - 1);
	next.setHours(next.getHours() + 1);
	
	require('knex')({
		client: 'sqlite3',
		connection: {
			filename: './db/tweet-' + date(now) + '.sqlite'
		}
	})(table_name)
	.where('created_at', '>=', now.getTime())
	.andWhere('created_at', '<', next.getTime())
	.orderBy('id', 'asc')
	.then(function(rows) {
		var tweets = _.map(rows, function(row) {
			return JSON.parse(row.data);
		});
		
		tweets = _.reject(tweets, function(tweet) {
			return _.contains(users.blocked, tweet.user.id);
		});
		
		tweets = _.reject(tweets, function(tweet) {
			return _.contains(users.muted, tweet.user.id);
		});
		
		res.render('pages/index', {
			url: {
				prev: date(prev, true),
				next: date(next, true)
			},
			tweets: tweets
		});
	});
});

app.listen(8015);

