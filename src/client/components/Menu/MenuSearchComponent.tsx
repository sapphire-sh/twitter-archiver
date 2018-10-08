import React from 'react';

import {
	Menu,
	Input,
} from 'semantic-ui-react';

export class MenuSearchComponent extends React.Component {
	public render() {
		return (
			<Menu.Item>
				<Menu.Header>{'search'}</Menu.Header>

				<Menu.Menu>
					<Menu.Item>
						<Input placeholder="search" size="small" />
					</Menu.Item>
				</Menu.Menu>
			</Menu.Item>
		);
	}
}
