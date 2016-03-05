'use strict';

var fs = require('fs');

var _ = require('underscore');

var helper = require('./helper');

var Database = function() {
	if (this instanceof Database) {
		var self = this;

		self._initialize();
		setInterval(self._initialize.bind(self), 24 * 60 * 60 * 1000);
	}
	else {
		return new Database();
	}
};

Database.prototype._initialize = function() {
	var self = this;

	try {
		fs.statSync(helper.path.data());
	}
	catch (err) {
		if (err.code === 'ENOENT') {
			fs.mkdirSync(helper.path.data());
		}
	}

	try {
		fs.statSync(helper.path.db());
	}
	catch (err) {
		if (err.code === 'ENOENT') {
			fs.mkdirSync(helper.path.db());
		}
	}

	try {
		fs.statSync(helper.path.index());
	}
	catch(err) {
		if (err.code === 'ENOENT') {
			fs.mkdirSync(helper.path.index());
		}
	}

	self._createDatabase();
	fs.readdir(helper.path.db(), (err, files) => {
		_.each(files, (file) => {
			if(file.match(/\.db$/)) {
				var knex = require('knex')({
					client: 'sqlite3',
					connection: {
						filename: helper.path.db() + file
					}
				});
				knex('tweet')
				.count('id as count')
				.then((rows) => {
					if(rows[0]['count'] !== 0) {
						self._createIndex(file);
					}
				});
			}
		});
	});
};

Database.prototype._createDatabase = function() {
	var self = this;

	_(10).times(function(i) {
		var date = helper.date.format(i);
		try {
			fs.statSync(helper.path.db() + date + '.db');
		}
		catch(err) {
			var knex = require('knex')({
				client : 'sqlite3',
				connection : {
					filename : helper.path.db() + date + '.db'
				}
			});
			knex.schema.createTable('tweet', function(table) {
				table.string('id', 20).notNullable().unique();
				table.text('data').notNullable();
				table.timestamp('created_at').notNullable();
			}).then(function() {
				knex.destroy();
			});
		}
	});
};

Database.prototype._createIndex = function(file) {
	var self = this;
	
	var name = file.split('.')[0];

	var knex = require('knex')({
		client : 'sqlite3',
		connection : {
			filename : helper.path.db() + file
		}
	});
	
	var promises = [];
	_(24).times(function(i) {
		var date = new Date(name);
		date.setHours(i);
		var promise = knex('tweet')
		.count('id as count')
		.where('created_at', '>=', date.getTime())
		.andWhere('created_at', '<', date.getTime() + 60 * 60 * 1000);
		promises.push(promise);
	});
	
	Promise.all(promises).then(function(values) {
		var count = _.map(values, (value) => {
			return value[0]['count'];
		});
		fs.writeFile(helper.path.index() + name + '.json', JSON.stringify(count));
	});
};

module.exports = Database;
