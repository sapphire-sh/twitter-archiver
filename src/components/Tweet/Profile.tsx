import * as React from 'react';

import {
	User,
} from '../../models';

interface ProfileProps {
	user: User;
	isRetweet: boolean;
};

class Profile extends React.Component<ProfileProps> {
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

export default Profile;