import * as React from 'react';
import {
	Dispatch,
	connect,
} from 'react-redux';
import {
	withRouter,
	RouteComponentProps,
} from 'react-router-dom';

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

interface ViewProps extends RouteComponentProps<{
	date: string;
	hour: string;
}> {
	dispatch: Dispatch<State>;
	date: Date;
}

class View extends React.Component<ViewProps> {
	constructor(props: ViewProps) {
		super(props);

		const {
			date,
			hour,
		} = this.props.match.params;

		const dispatch = this.props.dispatch;

		dispatch(invalidateDate());
		dispatch(updateDate(new Date(`${date} ${hour}:00:00`)));

		this.refreshTweets = this.refreshTweets.bind(this);
	}

	componentWillMount() {
		this.refreshTweets();
	}

	refreshTweets() {
		const dispatch = this.props.dispatch;

		dispatch(invalidateTweets());
		dispatch(fetchTweetsIfNeeded());
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

function mapDispatchToProps(dispatch: Dispatch<State>) {
	return {
		'dispatch': dispatch,
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(View));
