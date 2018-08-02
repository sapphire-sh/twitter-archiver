import React from 'react';

import {
	User,
} from '../../../shared/models';

interface ComponentProps {
	user: User;
	isRetweet: boolean;
}

export class ProfileComponent extends React.Component<ComponentProps> {
	public render() {
		const user = this.props.user;

		return (
			<a
				className="ui ribbon image label"
				style={{
					'marginBottom': this.props.isRetweet ? '4px' : '',
					'color': '#ffffff',
					'backgroundColor': `#${user.profile_link_color}`,
				}}
				href={`https://twitter.com/${user.screen_name}`}
				target="_blank"
			>
				<img src={user.profile_image_url_https} />
				{user.name}
				<div className="detail">@{user.screen_name}</div>
			</a>
		);
	}
}
