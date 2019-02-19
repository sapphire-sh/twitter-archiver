import React from 'react';

import {
	NavLink,
} from 'react-router-dom';

import {
	Menu,
} from 'semantic-ui-react';

import '~/client/styles/NavigationComponent.scss';

export class NavigationComponent extends React.Component {
	public render() {
		return (
			<div id="navigation">
				<Menu
					size="tiny"
				>
					<Menu.Item>
						<NavLink to="/">main</NavLink>
					</Menu.Item>
					<Menu.Item>
						<NavLink to="/search">search</NavLink>
					</Menu.Item>
				</Menu>
			</div>
		);
	}
}
