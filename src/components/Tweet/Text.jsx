import React from 'react';
import {
	PropTypes,
} from 'prop-types';

import twitter from 'twitter-text';

class Text extends React.Component {
	render() {
		const {
			text,
			entities,
		} = this.props;

		return (
			<div className="text">
				<div dangerouslySetInnerHTML={{
					'__html': twitter.autoLink(text, {
						'urlEntities': entities.urls,
					}).replace(/\n/g, '<br />'),
				}} />
			</div>
		);
	}
}

Text.propTypes = {
	'text': PropTypes.string.isRequired,
	'entities': PropTypes.object,
};

export default Text;
