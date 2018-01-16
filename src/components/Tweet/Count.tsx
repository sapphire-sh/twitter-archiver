import * as React from 'react';

interface CountProps {
	counts: {
		reply: number;
		retweet: number;
		favorite: number;
	};
}

class Count extends React.Component<CountProps> {
	render() {
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
					<i className="retweet icon"></i>{retweet}
				</div>
				<div className="ui label">
					<i className="star icon"></i>{favorite}
				</div>
			</div>
		);
	}
}

export default Count;
