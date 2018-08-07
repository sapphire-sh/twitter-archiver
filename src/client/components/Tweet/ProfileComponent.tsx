import React from 'react';

import {
	updateHistoryIfNeeded,
} from '../../actions';

import {
	Tweet,
} from '../../../shared/models';

import {
	dateToString,
} from '../../../shared/helpers';

import {
	Label,
	Button,
	Icon,
} from 'semantic-ui-react';

interface ComponentProps {
	tweet: Tweet;
	isRetweet: boolean;
	isQuote: boolean;

	updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
}

export class ProfileComponent extends React.Component<ComponentProps> {
	constructor(props: ComponentProps) {
		super(props);

		this.handleUpdateHistory = this.handleUpdateHistory.bind(this);
	}

	private handleUpdateHistory(id: string) {
		return () => {
			this.props.updateHistoryIfNeeded(id);
		};
	}

	public render() {
		const {
			tweet,
			isRetweet,
			isQuote,
		} = this.props;

		const {
			id_str,
			user,
			source,
			created_at,
		} = tweet;

		const {
			screen_name,
			name,
			profile_image_url_https,
			profile_link_color,
			// protected,
			verified,
			translator_type,
		} = user as any;

		const date = new Date(created_at);

		return (
			<div className="tweet-profile">
				<Label
					className="tweet-profile-label"
					as="a"
					image={true}
					ribbon={isQuote || isRetweet ? false : true}
					href={`https://twitter.com/${screen_name}`}
					target="_blank"
					style={{
						'backgroundColor': `#${profile_link_color}`,
					}}
				>
					<img src={profile_image_url_https} />
					<span className="tweet-profile-label-name">{name}</span>
					<div className="detail">@{screen_name}</div>
					{(() => {
						if(user.protected === true) {
							return (
								<Icon name="lock" color="grey" />
							);
						}
						return null;
					})()}
					{(() => {
						if(verified === true) {
							return (
								<Icon name="check" color="blue" />
							);
						}
						return null;
					})()}
					{(() => {
						switch(translator_type) {
						case 'badged':
							return (
								<Icon name="globe" color="blue" />
							);
						case 'moderator':
							return (
								<Icon name="globe" color="orange" />
							);
						case 'regular':
						default:
							return null;
						}
					})()}
				</Label>
				<Button.Group size="tiny">
					<Button basic={true} color="blue">
						<div
							className="source"
							dangerouslySetInnerHTML={{
								'__html': source,
							}}
						/>
					</Button>
					<Button
						as="a"
						basic={true}
						color="blue"
						href={`https://twitter.com/${screen_name}/status/${id_str}`}
						target="_blank"
					>
						{dateToString(date)}
					</Button>
					{(() => {
						if(isRetweet === true) {
							return null;
						}
						if(isQuote === true) {
							return null;
						}
						return (
							<Button color="blue" onClick={this.handleUpdateHistory(tweet.id_str)}>
								<Icon name="sync" />
								{'mark as read'}
							</Button>
						);
					})()}
				</Button.Group>
			</div>
		);
	}
}
