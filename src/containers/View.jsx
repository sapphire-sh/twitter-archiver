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
} from '../utils/date';

class View extends React.Component {
	constructor(props) {
		super(props);

		const {
			date,
			hour,
		} = this.props.match.params;

		this.state = {
			'date': new Date(`${date} ${hour}:00:00`),
		};

		this.refreshTweets = this.refreshTweets.bind(this);
	}

	componentWillMount() {
		this.refreshTweets();
	}

	refreshTweets() {
		const dispatch = this.props.dispatch;
		const date = this.state.date;

		dispatch(invalidateDate());
		dispatch(updateDate(date));
		dispatch(invalidateTweets());
		dispatch(fetchTweetsIfNeeded(date));
	}

	render() {
		return (
			<div className="container">
				<Navigation />

				<h4 className="ui top attached block header">{ dateToString(this.state.date) }</h4>
				<Tweets />
				<div onClick={ this.refreshTweets } className="ui attached button">refresh</div>
				<h4 className="ui bottom attached block header">{ dateToString(new Date(this.state.date.getTime() + 3600 * 1000)) }</h4>

				<Navigation />
			</div>
		);
	}
}

View.propTypes = {
	'match': PropTypes.object.isRequired,
	'dispatch': PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return {
		'date': state.date.date,
	};
}

export default connect(mapStateToProps)(View);
