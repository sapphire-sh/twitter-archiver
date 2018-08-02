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

import {
	Segment,
	Button,
} from 'semantic-ui-react';

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
		const {
			tweets,
		} = this.props;

		return (
			<div>
				<Segment.Group>
					<IndicatorComponent {...this.props} />
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
