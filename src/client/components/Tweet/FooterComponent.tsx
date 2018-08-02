import React from 'react';

import {
	Tweet,
} from '../../../shared/models';

import {
	dateToString,
} from '../../../shared/helpers';

import {
	Segment,
} from 'semantic-ui-react';

interface ComponentProps {
	tweet: Tweet;
}

export class FooterComponent extends React.Component<ComponentProps> {
	public render() {
		const {
			tweet,
		} = this.props;

		const tweetUrl = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

		return (
			<Segment
				style={{
					'display': 'flex',
					'justifyContent': 'space-between',
				}}
			>
				<div className="created_at">
					<a href={tweetUrl} target="_blank">
						{dateToString(new Date(tweet.created_at))}
					</a>
				</div>
				<div
					className="source"
					dangerouslySetInnerHTML={{
						'__html': tweet.source!,
					}}
				/>
			</Segment>
		);
	}
}
