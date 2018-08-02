import React from 'react';

import {
	updateHistory,
} from '../actions';

import {
	Tweet,
} from '../../shared/models';

import {
	IndicatorComponent,
	TweetComponent,
	RetweetComponent,
} from '../components';

import '../styles/Tweets.css';

interface ComponentProps {
	isFetchingTweets: boolean;
	tweets: Tweet[];

	updateHistory: typeof updateHistory;
}

export class TweetsComponent extends React.Component<ComponentProps> {
	constructor(props: ComponentProps) {
		super(props);

		this.handleUpdateHistory = this.handleUpdateHistory.bind(this);
	}

	private handleUpdateHistory(id: string) {
		return () => {
			this.props.updateHistory(id);
		};
	}

	private handlePrintJSON(tweet: Tweet) {
		return () => {
			console.log(tweet);
		};
	}

	public componentDidUpdate() {
		window.scrollTo(0, 0);
	}

	public render() {
		const tweets = this.props.tweets;

		return (
			<div>
				<IndicatorComponent {...this.props} />
				{
					tweets.map((tweet) => {
						let component;
						if(tweet.retweeted_status === undefined) {
							component = (
								<TweetComponent tweet={tweet} />
							);
						}
						else {
							component = (
								<RetweetComponent tweet={tweet} />
							);
						}

						return (
							<div key={tweet.id_str} className="ui segment attached">
								{component}
								<div
									className="ui button"
									onClick={this.handleUpdateHistory(tweet.id_str)}
								>
									{tweet.id_str}
								</div>
								<div
									className="ui button"
									onClick={this.handlePrintJSON(tweet)}
								>
									json
								</div>
							</div>
						);
					})
				}
			</div>
		);
	}
}
