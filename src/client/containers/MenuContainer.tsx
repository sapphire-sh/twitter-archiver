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
	invalidateTweets,
	fetchTweetsIfNeeded,
	openModal,
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

import {
	MenuAutoScrollComponent,
	MenuFiltersComponent,
	MenuForceRefreshComponent,
	// MenuHelpComponent,
	MenuProfileComponent,
	// MenuRelationsComponent,
	MenuStatsComponent,
} from '../components';

import {
	Menu,
} from 'semantic-ui-react';

import '../styles/MenuContainer.scss';

interface ComponentProps {
	mutedUsers: User[];
	blockedUsers: User[];

	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
	openModal: typeof openModal;
}

class MenuComponent extends React.Component<ComponentProps> {
	public render() {
		return (
			<div id="menu">
				<Menu
					size="tiny"
					vertical={true}
					fluid={true}
				>
					<MenuProfileComponent {...this.props} />
					{/* <MenuRelationsComponent {...this.props} /> */}
					<MenuFiltersComponent {...this.props} />
					<MenuStatsComponent {...this.props} />
					{/* <MenuHelpComponent {...this.props} /> */}
					<MenuForceRefreshComponent {...this.props} />
					<MenuAutoScrollComponent {...this.props} />
				</Menu>
			</div>
		);
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
		'invalidateTweets': invalidateTweets,
		'fetchTweetsIfNeeded': fetchTweetsIfNeeded,
		'openModal': openModal,
	}, dispatch);
}

export const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
