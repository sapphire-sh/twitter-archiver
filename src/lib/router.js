'use strict';

var fs = require('fs');

var router = require('express').Router();
var _ = require('underscore');

var helper = require('./helper');

router.get('/data/js/tweets/:datetime', function(req, res) {
	var datetime = req.params.datetime.split('.')[0];
	var tokens = datetime.split('.')[0].split('_');

	var date = new Date();
	date.setYear(parseInt(tokens[0]));
	date.setMonth(parseInt(tokens[1]) - 1);
	date.setDate(parseInt(tokens[2]));
	date.setHours(parseInt(tokens[3]));
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);

	var knex = require('knex')({
		client: 'sqlite3',
		connection: {
			filename: helper.path.db() + helper.date.format(date) + '.db'
		}
	});
	knex('tweet')
	.where('created_at', '>=', date.getTime())
	.andWhere('created_at', '<', date.getTime() + 60 * 60 * 1000)
	.limit(10)
	.orderBy('id', 'asc')
	.then(function(rows) {
		res.write('Grailbird.data.tweets_' + datetime + ' = [\n');
		rows.forEach(function(row) {
			res.write(row.data + ',\n');
		});
		res.write(']');
		res.end();
	});
});

router.get('/data/js/tweet_index.js', function(req, res) {
	fs.readdir(helper.path.db(), function(err, files) {
		if(!err) {
			res.write('var tweet_index = [\n');
			var databases = _.filter(files, function(file) {
				return file.match(/\.db$/);
			});
			databases.reduce(function(prev, curr) {
				console.log(prev + '1 ' + curr);
				return prev.then(function() {
				console.log(prev + '2 ' + curr);
					return new Promise(function(resolve, reject) {
				console.log(prev + '3 ' + curr);
						var date = new Date(curr.split('.')[0]);
						var knex = require('knex')({
							client: 'sqlite3',
							connection: {
								filename: helper.path.db() + curr
							}
						});
						knex('tweet').count('id as num')
						.then(function(rows) {
							var num = rows[0]['num'];
							if(num === 0) {
								reject();
							}
							else {
								res.write(num);
								resolve();
							}
						});
					});
				});
			}, Promise.resolve())
			.then(function() {
				res.write(']');
				res.end();
			});
		}
	});
});

router.get('/tweets', function(req, res) {
	var knex = require('knex')({
		client: 'sqlite3',
		connection: {
			filename: helper.path.db() + helper.date.format(new Date()) + '.db'
		}
	});
	knex('tweet')
	.where('created_at', '>=', now.getTime())
	.andWhere('created_at', '<', next.getTime())
	.orderBy('id', 'desc')
	.then(function(rows) {
		var tweets = _.map(rows, function(tweet) {
			return JSON.parse(tweet.data);
		});
		res.json(tweets);
	});
});

router.get('/view/:date/:hour', function(req, res) {
	var now = new Date(req.params.date);
	now.setHours(req.params.hour);
	var prev = new Date(now.getTime());
	var next = new Date(now.getTime());
	prev.setHours(prev.getHours() - 1);
	next.setHours(next.getHours() + 1);

	var k = require('knex')({
		client: 'sqlite3',
		connection: {
			filename: helper.path.db() + helper.date.format(now) + '.db'
		}
	});
	k('tweet')
	.where('created_at', '>=', now.getTime())
	.andWhere('created_at', '<', next.getTime())
	.orderBy('id', 'asc')
	.then(function(rows) {
		var tweets = _.map(rows, function(row) {
			return JSON.parse(row.data);
		});

		// tweets = _.reject(tweets, function(tweet) {
			// var flag = false;
			// flag |= _.contains(users.blocked, tweet.user.id_str);
			// flag |= _.contains(users.muted, tweet.user.id_str);
			// if(tweet.retweeted_status !== undefined) {
				// flag |= _.contains(users.blocked, tweet.retweeted_status.user.id_str);
				// flag |= _.contains(users.muted, tweet.retweeted_status.user.id_str);
			// }
			// return flag;
		// });

		res.render('pages/index', {
			url: {
				prev: helper.date.format(prev, true),
				next: helper.date.format(next, true)
			},
			tweets: tweets
		});
	})
	.finally(function() {
		k.destroy();
	});
});

module.exports = router;