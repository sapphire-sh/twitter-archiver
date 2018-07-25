import React from 'react';

import {
	Menu,
} from 'semantic-ui-react'

import {
	invalidateTweets,
	fetchTweetsIfNeeded,
} from '../actions';

interface ComponentProps {
	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
}

export class MenuComponent extends React.Component<ComponentProps> {
	constructor(props: ComponentProps) {
		super(props);

		this.refreshTweets = this.refreshTweets.bind(this);
	}

	componentWillMount() {
		this.refreshTweets();
	}

	private refreshTweets() {
		this.props.invalidateTweets();
		this.props.fetchTweetsIfNeeded();
	}

	render() {
		return (
			<Menu fluid vertical>
				<Menu.Item>
					<Menu.Header>Products</Menu.Header>

					<Menu.Menu>
						<Menu.Item
							name='enterprise'
						/>
						<Menu.Item
							name='consumer'
						/>
					</Menu.Menu>
				</Menu.Item>

				<Menu.Item>
					<Menu.Header>CMS Solutions</Menu.Header>

					<Menu.Menu>
						<Menu.Item
							name='rails'
						/>
						<Menu.Item
							name='python'
						/>
						<Menu.Item name='php' />
					</Menu.Menu>
				</Menu.Item>

				<Menu.Item>
					<Menu.Header>Hosting</Menu.Header>

					<Menu.Menu>
						<Menu.Item
							name='shared'
						/>
						<Menu.Item
							name='dedicated'
						/>
					</Menu.Menu>
				</Menu.Item>

				<Menu.Item>
					<Menu.Header>Support</Menu.Header>

					<Menu.Menu>
						<Menu.Item name='email'>
							E-mail Support
					</Menu.Item>

						<Menu.Item name='faq'>
							FAQs
					</Menu.Item>
					</Menu.Menu>
				</Menu.Item>
				
				<Menu.Item>
					<Menu.Menu>
						<Menu.Item name="refresh">
							<div onClick={this.refreshTweets} className="ui attached button">refresh</div>
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>
			</Menu>
		);
	}
}