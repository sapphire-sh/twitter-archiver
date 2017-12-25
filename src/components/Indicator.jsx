import React from 'react';
import {
	connect,
} from 'react-redux';
import {
	PropTypes,
} from 'prop-types';

import {
	dateToString,
} from '../utils/date';

class Indicator extends React.Component {
	render() {
		if(this.props.tweets.length === 0) {
			if(this.props.isFetching) {
				return (
					<div className="ui segment attached">loading...</div>
				);
			}
			else {
				return (
					<div className="ui segment attached">none</div>
				);
			}
		}
		else {
			return null;
		}
	}
}

Indicator.propTypes = {
	'isFetching': PropTypes.bool.isRequired,
	'tweets': PropTypes.array.isRequired,
};

function mapStateToProps(state) {
	let tweets = state.tweets.tweets[dateToString(state.date.date).substr(0, 13)];

	if(tweets === undefined) {
		tweets = [];
	}

	return {
		'isFetching': state.tweets.isFetching,
		'tweets': tweets,
	};
}

export default connect(mapStateToProps)(Indicator);
