import React from 'react';

import {
	bindActionCreators,
	Dispatch,
	AnyAction,
} from 'redux';

import {
	connect,
} from 'react-redux';

import {
	fetchStats,
} from '~/client/actions';

import {
	State,
} from '~/client/reducers';

import {
	getLastTweet,
} from '~/client/selectors';

import {
	Tweet,
} from '~/shared/models';

import {
	Segment,
} from 'semantic-ui-react';

interface ComponentProps {
	lastTweet: Tweet | null;

	fetchStats: typeof fetchStats;
}

interface ComponentState {
	timerId: number | undefined;
}

class StatsComponent extends React.Component<ComponentProps, ComponentState> {
	constructor(props: ComponentProps) {
		super(props);

		this.state = {
			'timerId': undefined,
		}
	}

	public componentDidMount() {
		this.setState({
			'timerId': window.setInterval(() => {
				this.props.fetchStats()
			}, 10000)
		})
	}

	public componentWillUnmount() {
		window.clearInterval(this.state.timerId);
	}

	public render() {
		const { lastTweet } = this.props;

		if (lastTweet === null) {
			return (
				<Segment.Group size="tiny">
					<Segment>
						<div>loading...</div>
					</Segment>
				</Segment.Group>
			);
		}

		const tweetUrl = `https://twitter.com/${lastTweet.user.screen_name}/status/${lastTweet.id_str}`;

		return (
			<Segment.Group size="tiny">
				<Segment>
					<div>
						<a href={tweetUrl} target="_blank">{tweetUrl}</a>
					</div>
					<div>{new Date(lastTweet.created_at).toString()}</div>
				</Segment>
			</Segment.Group>
		);
	}
}

function mapStateToProps(state: State) {
	return {
		'lastTweet': getLastTweet(state),
	};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
	return bindActionCreators({
		fetchStats,
	}, dispatch);
}

export const StatsContainer = connect(mapStateToProps, mapDispatchToProps)(StatsComponent);
