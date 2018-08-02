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
	private getEntities(tweet: Tweet) {
		const extendedTweet = (tweet as any).extended_tweet;
		if(extendedTweet !== undefined) {
			tweet.text = extendedTweet.full_text;
			tweet.entities = extendedTweet.entities;
			(tweet as any).extended_entities = extendedTweet.extended_entities;
		}

		return Object.assign({}, tweet.entities, (tweet as any).extended_entities);
	}

	public render() {
		const {
			tweet,
		} = this.props;

		const {
			user,
			text,
			quoted_status,
			retweet_count,
			favorite_count,
		} = tweet;

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
