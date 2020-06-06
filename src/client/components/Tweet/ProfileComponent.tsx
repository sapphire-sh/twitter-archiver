import React from 'react';

import {
	User,
} from '~/shared/models';

import {
	Label,
	Icon,
} from 'semantic-ui-react';

interface ComponentProps {
	user: User;
}

export class ProfileComponent extends React.Component<ComponentProps> {
	public render() {
		const {
			user,
		} = this.props;

		const {
			screen_name,
			name,
			profile_image_url_https,
			profile_link_color,
			// protected,
			verified,
			translator_type,
		} = user as any;

		return (
			<Label
				className="tweet-profile"
				as="a"
				image={true}
				href={`https://twitter.com/${screen_name}`}
				target="_blank"
				style={{
					'backgroundColor': `#${profile_link_color}`,
				}}
			>
				<img src={profile_image_url_https} />
				<span className="tweet-profile-name">{name}</span>
				<div className="detail">@{screen_name}</div>
				{(() => {
					if (user.protected === true) {
						return (
							<Icon name="lock" color="grey" />
						);
					}
					return null;
				})()}
				{(() => {
					if (verified === true) {
						return (
							<Icon name="check" color="blue" />
						);
					}
					return null;
				})()}
				{(() => {
					switch (translator_type) {
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
		);
	}
}
