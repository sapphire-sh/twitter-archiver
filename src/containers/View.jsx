import React from 'react';
import {
	connect,
} from 'react-redux';
import {
	PropTypes,
} from 'prop-types';

import {
	invalidateDate,
	updateDate,
	invalidateTweets,
	fetchTweetsIfNeeded,
} from '../actions';

import Navigation from '../components/Navigation';
import Tweets from '../components/Tweets';

import {
	dateToString,
} from '../utils';

class View extends React.Component {
	componentWillMount() {
		const date = new Date(`${this.props.match.params.date} ${this.props.match.params.hour}:00:00`);

		const {
			dispatch,
		} = this.props;

		dispatch(invalidateDate());
		dispatch(updateDate(date));
		dispatch(invalidateTweets());
		dispatch(fetchTweetsIfNeeded(date));
	}

	render() {
		let tweets;
		if(this.props.tweets.length === 0) {
			if(this.props.isFetching) {
				tweets = (
					<div className="attached ui segment">loading...</div>
				);
			}
			else {
				tweets = (
					<div className="attached ui segment">none</div>
				);
			}
		}
		else {
			tweets = (
				<Tweets style={{
					'opacity': this.props.isFetching ? 0.5 : 1,
				}} tweets={this.props.tweets} />
			);
		}

		return (
			<div className="container">
				<Navigation />

				<h4 className="ui top attached block header">{ dateToString(this.props.date) }</h4>
				{ tweets }
				<h4 className="ui bottom attached block header">{ dateToString(new Date(this.props.date.getTime() + 3600 * 1000)) }</h4>

				<Navigation />
			</div>
		);
	}
}

View.propTypes = {
	'match': PropTypes.object.isRequired,
	'dispatch': PropTypes.func.isRequired,
	'tweets': PropTypes.array.isRequired,
	'isFetching': PropTypes.bool.isRequired,
	'date': PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	let tweets = state.tweets.tweets[dateToString(state.date.date).substr(0, 13)];

	if(tweets === undefined) {
		tweets = [];
	}

	return {
		'date': state.date.date,
		'isFetching': state.tweets.isFetching,
		'tweets': tweets,
	};
}

export default connect(mapStateToProps)(View);
