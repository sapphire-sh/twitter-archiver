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

import '../styles/Menu.css';

interface ComponentProps {
	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
}

interface ComponentState {
	menuWidth: number;
}

export class MenuComponent extends React.Component<ComponentProps, ComponentState> {
	constructor(props: ComponentProps) {
		super(props);

		this.refreshTweets = this.refreshTweets.bind(this);

		this.state = {
			'menuWidth': 0,
		};
	}

	private refreshTweets() {
		this.props.invalidateTweets();
		this.props.fetchTweetsIfNeeded();
	}

	public componentDidMount() {
		const menu = document.querySelector<HTMLDivElement>('#menu');
		if(menu === null) {
			return;
		}

		const {
			parentElement,
		} = menu;
		if(parentElement === null) {
			return;
		}

		const {
			clientWidth,
		} = parentElement;

		const {
			paddingLeft,
			paddingRight,
		} = getComputedStyle(parentElement);

		if(paddingLeft === null || paddingRight === null) {
			return;
		}

		const horizontalPadding = parseInt(paddingLeft, 10) + parseInt(paddingRight, 10);

		this.setState({
			'menuWidth': clientWidth - horizontalPadding,
		});

		this.refreshTweets();
	}

	public render() {
		return (
			<Menu
				id="menu"
				style={{
					'width': this.state.menuWidth,
				}}
				vertical={true}
			>
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
