import React from 'react';

import {
	Menu,
} from 'semantic-ui-react';

import {
	invalidateTweets,
	fetchTweetsIfNeeded,
} from '../actions';

import {
	Button,
} from 'semantic-ui-react';

interface ComponentProps {
	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
}

export class MenuComponent extends React.Component<ComponentProps> {
	constructor(props: ComponentProps) {
		super(props);

		this.refreshTweets = this.refreshTweets.bind(this);
	}

	private refreshTweets() {
		this.props.invalidateTweets();
		this.props.fetchTweetsIfNeeded();
	}

	public componentWillMount() {
		this.refreshTweets();
	}

	public render() {
		return (
			<Menu fluid={true} vertical={true}>
				<Menu.Item>
					<Menu.Header>Products</Menu.Header>

					<Menu.Menu>
						<Menu.Item name="enterprise" />
						<Menu.Item name="consumer" />
					</Menu.Menu>
				</Menu.Item>

				<Menu.Item>
					<Menu.Header>CMS Solutions</Menu.Header>

					<Menu.Menu>
						<Menu.Item name="rails" />
						<Menu.Item name="python" />
						<Menu.Item name="php" />
					</Menu.Menu>
				</Menu.Item>

				<Menu.Item>
					<Menu.Header>Hosting</Menu.Header>

					<Menu.Menu>
						<Menu.Item name="shared" />
						<Menu.Item name="dedicated" />
					</Menu.Menu>
				</Menu.Item>

				<Menu.Item>
					<Menu.Header>Support</Menu.Header>

					<Menu.Menu>
						<Menu.Item name="email">
							E-mail Support
						</Menu.Item>

						<Menu.Item name="faq">
							FAQs
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>

				<Menu.Item>
					<Menu.Menu>
						<Menu.Item name="refresh">
							<Button onClick={this.refreshTweets}>refresh</Button>
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>
			</Menu>
		);
	}
}
