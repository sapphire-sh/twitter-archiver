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
		const tweet = this.props.tweet;

		const entities = this.getEntities(tweet);

		return (
			<div className="tweet">
				<ProfileComponent user={tweet.user} isRetweet={false} />
				<div className="ui segments">
					<div className="ui top attached segment">
						<TextComponent text={tweet.text!} entities={entities} />
						{(() => {
							if(tweet.quoted_status === undefined) {
								return null;
							}
							return (
								<TweetComponent tweet={tweet.quoted_status} />
							);
						})()}
					</div>
					<MediaComponent entities={entities} />
					<CountComponent
						counts={{
							'reply': 0,
							'retweet': (tweet as any).retweet_count,
							'favorite': (tweet as any).favorite_count,
						}}
					/>
					<FooterComponent tweet={tweet} />
				</div>
			</div>
		);
	}
}
