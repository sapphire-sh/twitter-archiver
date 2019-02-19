import React from 'react';

import {
	invalidateTweets,
	fetchTweetsIfNeeded,
} from '~/client/actions';

import {
	Menu,
	Icon,
} from 'semantic-ui-react';

interface ComponentProps {
	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
}

export class MenuForceRefreshComponent extends React.Component<ComponentProps> {
	constructor(props: ComponentProps) {
		super(props);

		this.handleRefreshTweets = this.handleRefreshTweets.bind(this);
	}

	private handleRefreshTweets() {
		this.props.invalidateTweets();
		this.props.fetchTweetsIfNeeded();
	}

	public render() {
		return (
			<Menu.Item onClick={this.handleRefreshTweets}>
				<Menu.Menu>
					<Menu.Item>
						<Icon name="exchange" />
						<span>{'force refresh'}</span>
					</Menu.Item>
				</Menu.Menu>
			</Menu.Item>
		);
	}
}
