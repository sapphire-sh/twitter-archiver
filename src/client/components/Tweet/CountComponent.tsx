import React from 'react';

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
			retweet,
			favorite,
		} = this.props.counts;

		if(retweet === 0 && favorite === 0) {
			return null;
		}

		return (
			<div className="ui attached segment">
				<div className="ui label">
					<i className="retweet icon" />{retweet}
				</div>
				<div className="ui label">
					<i className="star icon" />{favorite}
				</div>
			</div>
		);
	}
}
