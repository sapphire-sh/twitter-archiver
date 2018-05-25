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

import Navigation from '../components/Navigation';
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
				<Navigation />

				<h4 className="ui top attached block header">{3}</h4>
				<Tweets />
				<div onClick={ this.refreshTweets } className="ui attached button">refresh</div>
				<h4 className="ui bottom attached block header">{2}</h4>

				<Navigation />
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
