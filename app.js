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
    	users.blocked = _.map(res.ids, function(id) {
    		return id.toString();
    	});
    });

    tw.get('mutes/users/ids', function(err, res) {
        users.muted = _.map(res.ids, function(id) {
        	return id.toString();
        });
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

setInterval(function() {
	tw.get('statuses/home_timeline', {
		count: 200
	}, function(err, res) {
		if(err) {
			console.log(err);
		}
		else {
			res.reduce(function(prev, curr) {
				return prev.then(function() {
					return new Promise(function(resolve, reject) {
						knex(table_name)
						.insert({
							id: curr.id_str,
							data: JSON.stringify(curr),
							created_at: new Date(curr.created_at)
						})
						.catch(function(err) {})
						.finally(function() {
							resolve();
						});
					});
				});
			}, Promise.resolve());
		}
	});
}, 60 * 1000);

function insert(data) {
	knex(table_name)
	.insert({
		id: data.id_str,
		data: JSON.stringify(data),
		created_at: new Date(data.created_at)
	}).return();
}

var _ = require('underscore');
var http = require('http');
var auth = require('basic-auth');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use('/', express.static('public'));

app.use(function(req, res, next) {
	var credentials = auth(req);
	
console.log(credentials);
	if(credentials === undefined || credentials.name !== 'sapphire' || credentials.pass !== 'sapphire') {
		res.setHeader('WWW-Authenticate', 'Basic realm=Authorization Required');
		res.sendStatus(401);
	}
	else {
		next();
	}
});

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
	
	var k = require('knex')({
		client: 'sqlite3',
		connection: {
			filename: './db/tweet-' + date(now) + '.sqlite'
		}
	});
	k(table_name)
	.where('created_at', '>=', now.getTime())
	.andWhere('created_at', '<', next.getTime())
	.orderBy('id', 'asc')
	.then(function(rows) {
		var tweets = _.map(rows, function(row) {
			return JSON.parse(row.data);
		});
		
		tweets = _.reject(tweets, function(tweet) {
			var flag = false;
			flag |= _.contains(users.blocked, tweet.user.id_str);
			flag |= _.contains(users.muted, tweet.user.id_str);
			if(tweet.retweeted_status !== undefined) {
				flag |= _.contains(users.blocked, tweet.retweeted_status.user.id_str);
				flag |= _.contains(users.muted, tweet.retweeted_status.user.id_str);
			}
			return flag;
		});
		
		res.render('pages/index', {
			url: {
				prev: date(prev, true),
				next: date(next, true)
			},
			tweets: tweets
		});
	})
	.finally(function() {
		k.destroy();
	});
});

app.get('/list', function(req, res) {
	knex(table_name)
	.limit(100)
	.orderBy('id', 'desc')
	.then(function(rows) {
		res.json(rows);
	});
});

app.listen(8015);

