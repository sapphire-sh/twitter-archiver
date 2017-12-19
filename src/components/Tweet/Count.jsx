import React from 'react';
import {
	PropTypes,
} from 'prop-types';

class Count extends React.Component {
	render() {
		const {
			reply,
			retweet,
			favorite,
		} = this.props.counts;

		if(retweet === 0 && favorite === 0) {
			return null;
		}

		return (
			<div className="ui attached segment">
				<div className="ui label">
					<i className="retweet icon"></i>{retweet}
				</div>
				<div className="ui label">
					<i className="star icon"></i>{favorite}
				</div>
			</div>
		);
	}
}

Count.propTypes = {
	'counts': PropTypes.shape({
		'reply': PropTypes.number.isRequired,
		'retweet': PropTypes.number.isRequired,
		'favorite': PropTypes.number.isRequired,
	}).isRequired,
};

export default Count;
