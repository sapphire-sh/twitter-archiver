import React from 'react';

import {
	Menu,
} from 'semantic-ui-react';

export class MenuHelpComponent extends React.Component {
	public render() {
		return (
			<Menu.Item>
				<Menu.Header>{'help'}</Menu.Header>
				<Menu.Menu>
					<Menu.Item>
						<span>{'github'}</span>
					</Menu.Item>
					<Menu.Item>
						<span>{'@sapphire_dev'}</span>
					</Menu.Item>
					<Menu.Item>
						<span>{'keyboard shortcuts'}</span>
					</Menu.Item>
				</Menu.Menu>
			</Menu.Item>
		);
	}
}
