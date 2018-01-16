import * as React from 'react';
import {
	Link,
} from 'react-router-dom';
import {
	Dispatch,
} from 'redux';
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
	State,
} from '../reducers';

import {
	dateToString,
} from '../utils/date';

enum NavigationTypes {
	PREV = 'prev',
	NEXT = 'next',
};

interface NavigationProps {
	dispatch: Dispatch<State>;
	date: Date;
}

class Navigation extends React.Component<NavigationProps> {
	constructor(props: NavigationProps) {
		super(props);

		this.handleClickPrev = this.handleClickPrev.bind(this);
		this.handleClickNext = this.handleClickNext.bind(this);
	}

	handleClickPrev() {
		this.handleClick(NavigationTypes.PREV);
	}

	handleClickNext() {
		this.handleClick(NavigationTypes.NEXT);
	}

	handleClick(type: NavigationTypes) {
		const dispatch = this.props.dispatch;

		let timestamp = this.props.date.getTime();

		switch(type) {
		case NavigationTypes.PREV:
			timestamp -= 3600 * 1000;
			break;
		case NavigationTypes.NEXT:
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
		dispatch(fetchTweetsIfNeeded());

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

function mapStateToProps(state: State) {
	return {
		'date': state.date.date,
	};
}

function mapDispatchToProps(dispatch: Dispatch<State>) {
	return {
		'dispatch': dispatch,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
