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
	MenuItem,
	MenuItemType,
} from '../../shared/models';

import {
	State,
} from '../reducers';

import {
	getMutedUsers,
	getBlockedUsers,
} from '../selectors';

import {
	MenuItemComponent,
} from '../components';

import {
	Menu,
} from 'semantic-ui-react';

import '../styles/Menu.scss';

interface ComponentProps {
	mutedUsers: User[];
	blockedUsers: User[];

	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
	openModal: typeof openModal;
}

interface ComponentState {
	menuItems: MenuItem[];
}

class MenuComponent extends React.Component<ComponentProps, ComponentState> {
	constructor(props: ComponentProps) {
		super(props);

		this.state = {
			'menuItems': [],
		};
	}

	public componentDidMount() {
		this.setState({
			'menuItems': [
				{
					'type': MenuItemType.MENU_ITEM_PROFILE,
				},
				{
					'type': MenuItemType.MENU_ITEM_RELATIONS,
				},
				{
					'type': MenuItemType.MENU_ITEM_SEARCH,
				},
				{
					'type': MenuItemType.MENU_ITEM_FILTERS,
				},
				{
					'type': MenuItemType.MENU_ITEM_STATS,
				},
				{
					'type': MenuItemType.MENU_ITEM_HELP,
				},
				{
					'type': MenuItemType.MENU_ITEM_FORCE_REFRESH,
				},
				{
					'type': MenuItemType.MENU_ITEM_AUTO_SCROLL,
				},
			],
		});
	}

	public render() {
		const {
			menuItems,
		} = this.state;

		return (
			<Menu
				id="menu"
				size="tiny"
				vertical={true}
			>
				{menuItems.map((menuItem, i) => {
					return (
						<MenuItemComponent key={i} {...this.props} {...menuItem} />
					);
				})}
			</Menu>
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
