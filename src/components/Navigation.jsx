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
} from '../utils';

class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.handleClickPrev = this.handleClickPrev.bind(this);
		this.handleClickNext = this.handleClickNext.bind(this);
	}

	handleClickPrev(e) {
		const {
			date,
			dispatch,
		} = this.props;

		const prev = new Date(date.getTime() - 3600 * 1000);

		this.handleClick(prev);
	}

	handleClickNext(e) {
		const {
			date,
			dispatch,
		} = this.props;

		const next = new Date(date.getTime() + 3600 * 1000);

		this.handleClick(next);
	}

	handleClick(e) {
		const {
			date,
			dispatch,
		} = this.props;

		dispatch(invalidateDate());
		dispatch(updateDate(e));
		dispatch(invalidateTweets());
		dispatch(fetchTweetsIfNeeded(e));

		window.scroll(0, 0);
	}

	render() {
		return (
			<div className="ui two buttons">
				<Link to={ `/v/${dateToString(new Date(this.props.date.getTime() - 3600 * 1000)).replace(/ /g, '/').substr(0, 13)}` } onClick={ this.handleClickPrev } className="ui labeled icon button">
					<i className="left chevron icon"></i>
					Prev
				</Link>
				<Link to={ `/v/${dateToString(new Date(this.props.date.getTime() + 3600 * 1000)).replace(/ /g, '/').substr(0, 13)}` } onClick={ this.handleClickNext } className="ui right labeled icon button">
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
