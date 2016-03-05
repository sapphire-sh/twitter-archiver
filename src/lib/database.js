'use strict';

var fs = require('fs');

var _ = require('underscore');

var helper = require('./helper');

var Database = function() {
	if (this instanceof Database) {
		var self = this;

		self.date = helper.date.format(new Date());
		
		self._initialize();
		setInterval(self._createDatabase.bind(self), 24 * 60 * 60 * 1000);
		setInterval(self._updateIndex.bind(self), 60 * 1000);
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
						self._createIndex(file.split('.')[0]);
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

Database.prototype._createIndex = function(date) {
	var self = this;

	var knex = require('knex')({
		client : 'sqlite3',
		connection : {
			filename : helper.path.db() + date + '.db'
		}
	});
	
	var promises = [];
	_(24).times(function(i) {
		var d = new Date(date);
		d.setHours(i);
		var promise = knex('tweet')
		.count('id as count')
		.where('created_at', '>=', d.getTime())
		.andWhere('created_at', '<', d.getTime() + 60 * 60 * 1000);
		promises.push(promise);
	});
	
	Promise.all(promises).then(function(values) {
		var count = _.map(values, (value) => {
			return value[0]['count'];
		});
		fs.writeFile(helper.path.index() + date + '.json', JSON.stringify(count));
	});
};

Database.prototype._updateIndex = function() {
	var self = this;
	
	var date = helper.date.format(new Date());
	
	self._createIndex(self.date);
	if(self.date !== date) {
		self.data = date;
		self._createIndex(self.date);
	}
};

module.exports = Database;
