import React from 'react';
import {
	PropTypes,
} from 'prop-types';

class Profile extends React.Component {
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

Profile.propTypes = {
	'user': PropTypes.object.isRequired,
	'isRetweet': PropTypes.bool.isRequired,
};

export default Profile;
