import * as React from 'react';
import {
	connect,
} from 'react-redux';

import {
	Tweet,
} from '../../shared/models';

import {
	State,
} from '../reducers';

interface IndicatorProps {
	isFetching: boolean;
	tweets: Tweet[];
};

class Indicator extends React.Component<IndicatorProps> {
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

function mapStateToProps(state: State) {
	return {
		'isFetching': state.tweet.isFetching,
		'tweets': state.tweet.tweets,
	};
}

export default connect(mapStateToProps)(Indicator);
