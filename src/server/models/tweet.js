'use strict';

export default function(sequelize, DataTypes) {
	let tweet = sequelize.define('tweet', {
		id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		timestamp: DataTypes.BIGINT,
		data: DataTypes.STRING
	});

	return tweet;
}
