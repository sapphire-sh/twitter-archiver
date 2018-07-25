import React from 'react';

import {
	Tweet,
} from '../../shared/models';

interface ComponentProps {
	isFetchingTweets: boolean;
	tweets: Tweet[];
};

export class IndicatorComponent extends React.Component<ComponentProps> {
	render() {
		const {
			isFetchingTweets,
			tweets,
		} = this.props;

		if(tweets.length === 0) {
			if(isFetchingTweets) {
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
