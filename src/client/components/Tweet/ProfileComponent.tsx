import React from 'react';

import {
	User,
} from '../../../shared/models';

import {
	Label,
} from 'semantic-ui-react';

interface ComponentProps {
	user: User;
	isRetweet: boolean;
}

export class ProfileComponent extends React.Component<ComponentProps> {
	public render() {
		const {
			user,
			isRetweet,
		} = this.props;

		const {
			screen_name,
			name,
			profile_image_url_https,
			profile_link_color,
		} = user;

		return (
			<a
				href={`https://twitter.com/${screen_name}`}
				target="_blank"
			>
				<Label
					image={true}
					ribbon={true}
					style={{
						'marginBottom': isRetweet ? '4px' : '',
						'color': '#ffffff',
						'backgroundColor': `#${profile_link_color}`,
					}}
				>
					<img src={profile_image_url_https} />
					{name}
					<div className="detail">@{screen_name}</div>
				</Label>
			</a>
		);
	}
}
