import React from 'react';

import {
	Dispatch,
	bindActionCreators,
	AnyAction,
} from 'redux';

import {
	connect,
} from 'react-redux';

import {
	fetchMutedUsersIfNeeded,
	fetchBlockedUsersIfNeeded,
} from '../actions';

import {
	User,
} from '../../shared/models';

import {
	State,
} from '../reducers';

import {
	getMutedUsers,
	getBlockedUsers,
} from '../selectors';

interface ComponentProps {
	mutedUsers: User[];
	blockedUsers: User[];

	fetchMutedUsersIfNeeded: typeof fetchMutedUsersIfNeeded;
	fetchBlockedUsersIfNeeded: typeof fetchBlockedUsersIfNeeded;
}

class FilterComponent extends React.Component<ComponentProps> {
	public componentDidMount() {
		this.props.fetchMutedUsersIfNeeded();
		this.props.fetchBlockedUsersIfNeeded();
	}

	public render() {
		const {
			mutedUsers,
			blockedUsers,
		} = this.props;

		console.log(`${mutedUsers.length} ${blockedUsers.length}`);

		return null;
	}
}

function mapStateToProps(state: State) {
	return {
		'mutedUsers': getMutedUsers(state),
		'blockedUsers': getBlockedUsers(state),
	};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
	return bindActionCreators({
		'fetchMutedUsersIfNeeded': fetchMutedUsersIfNeeded,
		'fetchBlockedUsersIfNeeded': fetchBlockedUsersIfNeeded,
	}, dispatch);
}

export const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
