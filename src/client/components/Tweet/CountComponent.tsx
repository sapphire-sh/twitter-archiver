import React from 'react';

import {
	Segment,
	Label,
	Icon,
} from 'semantic-ui-react';

interface ComponentProps {
	counts: {
		reply: number;
		retweet: number;
		favorite: number;
	};
}

export class CountComponent extends React.Component<ComponentProps> {
	public render() {
		const {
			counts,
		} = this.props;

		const {
			retweet,
			favorite,
		} = counts;

		if(retweet === 0 && favorite === 0) {
			return null;
		}

		return (
			<Segment>
				<Label>
					<Icon name="retweet" />{retweet}
				</Label>
				<Label>
					<Icon name="star" />{favorite}
				</Label>
			</Segment>
		);
	}
}
