import * as React from 'react';
import {
	Dispatch,
} from 'redux';
import {
	connect,
} from 'react-redux';

import {
	invalidateTweets,
	fetchTweetsIfNeeded,
} from '../actions';

import {
	State,
} from '../reducers';

enum NavigationTypes {
	PREV = 'prev',
	NEXT = 'next',
};

interface NavigationProps {
	dispatch: Dispatch<State>;
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

		dispatch(invalidateTweets());
		dispatch(fetchTweetsIfNeeded());

		window.scroll(0, 0);
	}

	render() {
		return (
			<div className="ui two buttons">
				<div onClick={ this.handleClickPrev } className="ui labeled icon button">
					<i className="left chevron icon"></i>
					Prev
				</div>
				<div onClick={ this.handleClickNext } className="ui right labeled icon button">
					Next
					<i className="right chevron icon"></i>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state: State) {
	return {};
}

function mapDispatchToProps(dispatch: Dispatch<State>) {
	return {
		'dispatch': dispatch,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
