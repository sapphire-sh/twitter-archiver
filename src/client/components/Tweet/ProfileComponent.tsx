import React from 'react';

import {
	User,
} from '../../../shared/models';

interface ComponentProps {
	user: User;
	isRetweet: boolean;
};

export class ProfileComponent extends React.Component<ComponentProps> {
	render() {
		const user = this.props.user;

		return (
			<a style={{
				'marginBottom': this.props.isRetweet ? '4px' : '',
				'color': '#ffffff',
				'backgroundColor': `#${user.profile_link_color}`,
			}} href={ `https://twitter.com/${user.screen_name}` } target="_blank" className="ui ribbon image label">
				<img src={ user.profile_image_url_https } />
				{ user.name }
				<div className="detail">@{ user.screen_name }</div>
			</a>
		);
	}
}
