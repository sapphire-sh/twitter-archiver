import React from 'react';

import {
	bindActionCreators,
} from 'redux';
import {
	Dispatch,
	connect,
} from 'react-redux';

import {
	invalidateDate,
	updateDate,
	invalidateTweets,
	fetchTweetsIfNeeded,
} from '../actions';

import {
	State,
} from '../reducers';

import Navigation from '../components/Navigation';
import Tweets from '../components/Tweets';

import {
	dateToString,
} from '../utils/date';

interface ViewProps {
	date: Date;

	invalidateDate: typeof invalidateDate;
	updateDate: typeof updateDate;
	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
}

class View extends React.Component<ViewProps> {
	constructor(props: ViewProps) {
		super(props);

		this.props.invalidateDate();

		this.refreshTweets = this.refreshTweets.bind(this);
	}

	componentWillMount() {
		this.refreshTweets();
	}

	refreshTweets() {
		this.props.invalidateTweets();
		this.props.fetchTweetsIfNeeded();
	}

	render() {
		return (
			<div className="container">
				<Navigation />

				<h4 className="ui top attached block header">{ dateToString(this.props.date) }</h4>
				<Tweets />
				<div onClick={ this.refreshTweets } className="ui attached button">refresh</div>
				<h4 className="ui bottom attached block header">{ dateToString(new Date(this.props.date.getTime() + 3600 * 1000)) }</h4>

				<Navigation />
			</div>
		);
	}
}

function mapStateToProps(state: State) {
	return {
		'date': state.date.date,
	};
}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators({
		invalidateDate,
		updateDate,
		invalidateTweets,
		fetchTweetsIfNeeded,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
