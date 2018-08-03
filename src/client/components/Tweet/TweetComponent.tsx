import React from 'react';

import {
	Tweet,
} from '../../../shared/models';

import {
	ProfileComponent,
	TextComponent,
	CountComponent,
	MediaComponent,
	FooterComponent,
} from '../../components';

import {
	Segment,
} from 'semantic-ui-react';

interface ComponentProps {
	tweet: Tweet;
}

export class TweetComponent extends React.Component<ComponentProps> {
	private getExtendedTweet(tweet: Tweet) {
		return (tweet as any).extended_tweet;
	}

	private getText(tweet: Tweet) {
		const extendedTweet = this.getExtendedTweet(tweet);
		if(extendedTweet === undefined) {
			return tweet.text;
		}
		return extendedTweet.full_text;
	}

	private getEntities(tweet: Tweet) {
		const extendedTweet = this.getExtendedTweet(tweet);
		if(extendedTweet === undefined) {
			if((tweet as any).extended_entities === undefined) {
				return tweet.entities;
			}
			return (tweet as any).extended_entities;
		}
		else {
			if(extendedTweet.extended_entities === undefined) {
				return tweet.entities;
			}
			return extendedTweet.extended_entities;
		}
	}

	public render() {
		const {
			tweet,
		} = this.props;

		const {
			user,
			quoted_status,
			retweet_count,
			favorite_count,
		} = tweet;

		const text = this.getText(tweet);
		const entities = this.getEntities(tweet);

		return (
			<div className="tweet">
				<ProfileComponent user={user} isRetweet={false} />
				<Segment.Group>
					<Segment>
						<TextComponent text={text!} entities={entities} />
						{(() => {
							if(quoted_status === undefined) {
								return null;
							}
							return (
								<TweetComponent tweet={quoted_status} />
							);
						})()}
					</Segment>
					<MediaComponent entities={entities} />
					<CountComponent
						counts={{
							'reply': 0,
							'retweet': retweet_count,
							'favorite': favorite_count!,
						}}
					/>
					<FooterComponent tweet={tweet} />
				</Segment.Group>
			</div>
		);
	}
}
