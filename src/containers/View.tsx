import React from 'react';

import {
	bindActionCreators,
} from 'redux';
import {
	Dispatch,
	connect,
} from 'react-redux';

import {
	invalidateTweets,
	fetchTweetsIfNeeded,
} from '../actions';

import {
	State,
} from '../reducers';

import Tweets from '../components/Tweets';

interface ViewProps {
	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
}

class View extends React.Component<ViewProps> {
	constructor(props: ViewProps) {
		super(props);

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
				<Tweets />
				<div onClick={ this.refreshTweets } className="ui attached button">refresh</div>
			</div>
		);
	}
}

function mapStateToProps(state: State) {
	return {};
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
	return bindActionCreators({
		invalidateTweets,
		fetchTweetsIfNeeded,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
