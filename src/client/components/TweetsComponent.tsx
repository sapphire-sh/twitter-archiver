import React from 'react';

import {
	updateHistoryIfNeeded,
} from '../actions';

import {
	Tweet,
} from '../../shared/models';

import {
	PlaceholderComponent,
	TweetComponent,
	RetweetComponent,
} from '../components';

import {
	Segment,
	Button,
} from 'semantic-ui-react';

import '../styles/Tweets.scss';

interface ComponentProps {
	isFetchingTweets: boolean;
	tweets: Tweet[];

	updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
}

export class TweetsComponent extends React.Component<ComponentProps> {
	constructor(props: ComponentProps) {
		super(props);

		this.handleUpdateHistory = this.handleUpdateHistory.bind(this);
	}

	private handleUpdateHistory(id: string) {
		return () => {
			this.props.updateHistoryIfNeeded(id);
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
		const {
			tweets,
		} = this.props;

		return (
			<div>
				<Segment.Group>
					<PlaceholderComponent {...this.props} />
					{tweets.map((tweet) => {
						return (
							<Segment key={tweet.id_str}>
								{(() => {
									if(tweet.retweeted_status === undefined) {
										return (
											<TweetComponent tweet={tweet} />
										);
									}
									return (
										<RetweetComponent tweet={tweet} />
									);
								})()}
								<Button onClick={this.handleUpdateHistory(tweet.id_str)}>
									{tweet.id_str}
								</Button>
								<Button onClick={this.handlePrintJSON(tweet)}>
									json
								</Button>
							</Segment>
						);
					})}
				</Segment.Group>
			</div>
		);
	}
}
