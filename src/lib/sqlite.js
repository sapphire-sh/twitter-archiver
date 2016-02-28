'use strict';

var fs = require('fs');

var _ = require('underscore');

var helper = require('./helper');

var SQLite = function() {
	if(this instanceof SQLite) {
		var self = this;
		
		self._initialize();
		setInterval(self._initialize, 24 * 60 * 60 * 1000);
	}
	else {
		return new SQLite();
	}
};

SQLite.prototype._initialize = function() {
	var self = this;
	
	fs.stat(helper.path.db(), function(err, stats) {
		if(err && err.code === 'ENOENT') {
			fs.mkdirSync(helper.path.db());
		}
		_.range(10).reduce(function(prev, curr) {
			return prev.then(function() {
				var date = helper.date.format(curr);
				return new Promise(function(resolve, reject) {
					fs.stat(helper.path.db() + date + '.db', function(err, stats) {
						if(err) {
							var knex = require('knex')({
								client: 'sqlite3',
								connection: {
									filename: helper.path.db() + date + '.db'
								}
							});
							knex.schema.createTable('tweet', function(table) {
								table.string('id', 20).notNullable().unique();
								table.text('data').notNullable();
								table.timestamp('created_at').notNullable();
							})
							.then(function() {
								knex.destroy();
								resolve();
							});
						}
						else {
							resolve();
						}
					});
				});
			})
		}, Promise.resolve());
	});
};

module.exports = SQLite;
