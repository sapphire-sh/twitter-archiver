'use strict';

var _ = require('underscore');

var helper = require('./helper');

var Tweet = function(twit) {
	if(this instanceof Tweet) {
		var self = this;

		self.twit = twit;
		self.list = [];
		self.users = {
			blocked: [],
			muted: []
		};

//		self._start();
//		self._update();
//		setInterval(self._update.bind(self), 15 * 60 * 1000);
	}
	else {
		return new Tweet(twit);
	}
};

Tweet.prototype._update = function() {
	var self = this;

	self.twit.get('blocks/ids', function(err, res) {
		self.users.blocked = _.map(res.ids, function(id) {
			return id.toString();
		});
	});

	self.twit.get('mutes/users/ids', function(err, res) {
		self.users.muted = _.map(res.ids, function(id) {
			return id.toString();
		});
	});
};

Tweet.prototype._start = function() {
	var self = this;

	var stream = self.twit.stream('user');
	stream.on('tweet', function(data) {
		self.list.push(data);
	});

	setInterval(function() {
		self._insert(self.list);
		self.list = [];
	}, 60 * 1000);
	// setInterval(function() {
	// 	self.twit.get('statuses/home_timeline', {
	// 		count: 200
	// 	}, function(err, res) {
	// 		if(err) {
	// 			console.log(err);
	// 		}
	// 		else {
	// 			self._insert(res);
	// 		}
	// 	});
	// }, 60 * 1000);
};

Tweet.prototype._insert = function(list) {
	var self = this;

	var knex;
	var date;
	list.reduce(function(prev, curr) {
		return prev.then(function() {
			return new Promise(function(resolve, reject) {
				var curr_date = helper.date.format(curr.created_at);
				if(date !== curr_date) {
					if(knex !== undefined) {
						knex.destroy();
					}
					knex = require('knex')({
						client: 'sqlite3',
						connection: {
							filename: helper.path.db() + curr_date + '.db'
						}
					});
				}
				knex('tweet')
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
};

module.exports = Tweet;
