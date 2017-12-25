import React from 'react';
import {
	Link,
} from 'react-router-dom';
import {
	PropTypes,
} from 'prop-types';
import {
	connect,
} from 'react-redux';

import {
	invalidateDate,
	updateDate,
	invalidateTweets,
	fetchTweetsIfNeeded,
} from '../actions';

import {
	dateToString,
} from '../utils/date';

class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.handleClickPrev = this.handleClickPrev.bind(this);
		this.handleClickNext = this.handleClickNext.bind(this);
	}

	handleClickPrev(e) {
		this.handleClick('prev');
	}

	handleClickNext(e) {
		this.handleClick('next');
	}

	handleClick(type) {
		const dispatch = this.props.dispatch;

		let timestamp = this.props.date.getTime();

		switch(type) {
		case 'prev':
			timestamp -= 3600 * 1000;
			break;
		case 'next':
			timestamp += 3600 * 1000;
			break;
		default:
			console.log('invalid type');
			return;
		}

		const date = new Date(timestamp);

		dispatch(invalidateDate());
		dispatch(updateDate(date));
		dispatch(invalidateTweets());
		dispatch(fetchTweetsIfNeeded(date));

		window.scroll(0, 0);
	}

	render() {
		return (
			<div className="ui two buttons">
				<Link to={ `/i/${dateToString(new Date(this.props.date.getTime() - 3600 * 1000)).replace(/ /g, '/').substr(0, 13)}` } onClick={ this.handleClickPrev } className="ui labeled icon button">
					<i className="left chevron icon"></i>
					Prev
				</Link>
				<Link to={ `/i/${dateToString(new Date(this.props.date.getTime() + 3600 * 1000)).replace(/ /g, '/').substr(0, 13)}` } onClick={ this.handleClickNext } className="ui right labeled icon button">
					Next
					<i className="right chevron icon"></i>
				</Link>
			</div>
		);
	}
}

Navigation.propTypes = {
	'date': PropTypes.object.isRequired,
	'dispatch': PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return {
		'date': state.date.date,
	};
}

export default connect(mapStateToProps)(Navigation);
