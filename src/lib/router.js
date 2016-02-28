'use strict';

var router = require('express').Router();
var _ = require('underscore');

var helper = require('./helper');

router.get('/tweets', function(req, res) {
	var knex = require('knex')({
		client: 'sqlite3',
		connection: {
			filename: helper.path.db() + helper.date.format(new Date()) + '.db'
		}
	});
	knex('tweet')
	.limit(10)
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
