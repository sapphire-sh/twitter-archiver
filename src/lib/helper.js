'use strict';

var path = require('path');

exports.date = {
	format: function(d, p) {
		function pad(n) {
			return n < 10 ? '0' + n : n;
		}
		
		var date;
		if(typeof d === 'object' && d.constructor.name === 'Date') {
			date = new Date(d);
		}
		else {
			date = new Date();
			if(typeof d === 'number') {
				date.setTime(date.getTime() + d * 24 * 60 * 60 * 1000);
			}
		}
		
		var str = date.getFullYear();
		str += '-' + pad(date.getMonth() + 1);
		str += '-' + pad(date.getDate());
		
		if(p === true) {
			str += '/' + pad(date.getHours());
		}
		
		return str;
	}
};

exports.path = {
	data: function() {
		return path.join(__dirname, '/../../data/');
	},
	db: function() {
		return path.join(__dirname, '/../../data/db/');
	},
	index: function() {
		return path.join(__dirname, '/../../data/index/');
	}
};
