import React from 'react';

import {
	Menu,
} from 'semantic-ui-react';

export class MenuProfileComponent extends React.Component {
	public render() {
		return (
			<Menu.Item>
				<Menu.Header>{'profile'}</Menu.Header>
				<Menu.Menu>
					<Menu.Item>
						<span>{'username'}</span>
					</Menu.Item>
					<Menu.Item>
						<span>{'@screen_name'}</span>
					</Menu.Item>
				</Menu.Menu>
			</Menu.Item>
		);
	}
}
