import mongoose from 'mongoose';

let tweetSchema = new mongoose.Schema({
	'id': {
		'type': String,
		'required': true,
		'unique': true,
	},
	'data': {
		'type': mongoose.Schema.Types.Mixed,
		'required': true,
	},
	'created_at': {
		'type': Date,
		'required': true,
	},
});

let Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;
