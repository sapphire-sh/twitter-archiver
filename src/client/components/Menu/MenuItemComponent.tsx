import React from 'react';

import {
	invalidateTweets,
	fetchTweetsIfNeeded,
} from '../../actions';

import {
	MenuItem,
	MenuItemType,
} from '../../../shared/models';

import {
	Menu,
	Input,
	Icon,
} from 'semantic-ui-react';

interface ComponentProps extends MenuItem {
	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
}

interface ComponentState {
	tick: number;
	autoScroll: boolean;
}

export class MenuItemComponent extends React.Component<ComponentProps, ComponentState> {
	constructor(props: ComponentProps) {
		super(props);

		this.handleRefreshTweets = this.handleRefreshTweets.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.handleAutoScroll = this.handleAutoScroll.bind(this);

		this.state = {
			'autoScroll': false,
			'tick': null,
		};
	}

	private handleRefreshTweets() {
		this.props.invalidateTweets();
		this.props.fetchTweetsIfNeeded();
	}

	private handleScroll(e: WheelEvent | KeyboardEvent) {
		const {
			autoScroll,
		} = this.state;

		if(autoScroll === false) {
			return;
		}

		if(e instanceof WheelEvent) {
			this.setState({
				'autoScroll': false,
			});
			return;
		}
		if(e instanceof KeyboardEvent) {
			switch(e.keyCode) {
			case 32: // space
			case 33: // page up
			case 34: // page down
			case 38: // arrow up
			case 40: // arrow down
				this.setState({
					'autoScroll': false,
				});
				return;
			}
		}
	}

	private handleAutoScroll() {
		const {
			autoScroll,
		} = this.state;

		this.setState({
			'autoScroll': autoScroll === false,
		});
	}

	public componentDidMount() {
		window.addEventListener('wheel', this.handleScroll);
		window.addEventListener('keydown', this.handleScroll);
	}

	public componentDidUpdate(prevProps: ComponentProps, prevState: ComponentState) {
		const {
			tick,
			autoScroll,
		} = this.state;

		if(prevState.autoScroll !== autoScroll) {
			if(tick !== null) {
				window.clearInterval(tick);
			}

			if(autoScroll === true) {
				this.setState({
					'tick': window.setInterval(() => {
						window.scroll(0, document.body.scrollHeight);
					}, 500),
				});
			}
		}
	}

	public componentWillUnmount() {
		const {
			tick,
		} = this.state;

		if(tick !== null) {
			window.clearInterval(tick);
		}

		window.removeEventListener('wheel', this.handleScroll);
		window.removeEventListener('keydown', this.handleScroll);
	}

	public render() {
		const {
			type,
		} = this.props;

		switch(type) {
		case MenuItemType.MENU_ITEM_PROFILE:
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
		case MenuItemType.MENU_ITEM_RELATIONS:
			return (
				<Menu.Item>
					<Menu.Header>{'relations'}</Menu.Header>
					<Menu.Menu>
						<Menu.Item>
							<span>{'followings'}</span>
						</Menu.Item>
						<Menu.Item>
							<span>{'followers'}</span>
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>
			);
		case MenuItemType.MENU_ITEM_SEARCH:
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
		case MenuItemType.MENU_ITEM_FILTERS:
			return (
				<Menu.Item>
					<Menu.Header>{'filters'}</Menu.Header>
					<Menu.Menu>
						<Menu.Item>
							<span>{'muted keywords'}</span>
						</Menu.Item>
						<Menu.Item>
							<span>{'muted users'}</span>
						</Menu.Item>
						<Menu.Item>
							<span>{'blocked users'}</span>
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>
			);
		case MenuItemType.MENU_ITEM_STATS:
			return (
				<Menu.Item>
					<Menu.Header>{'stats'}</Menu.Header>
					<Menu.Menu>
						<Menu.Item>
							<span>{'queue count'}</span>
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>
			);
		case MenuItemType.MENU_ITEM_HELP:
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
		case MenuItemType.MENU_ITEM_FORCE_REFRESH:
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
		case MenuItemType.MENU_ITEM_AUTO_SCROLL:
			const {
				autoScroll,
			} = this.state;

			return (
				<Menu.Item active={autoScroll} onClick={this.handleAutoScroll}>
					<Menu.Menu>
						<Menu.Item>
							<Icon name="angle double down" />
							<span>{'auto scroll'}</span>
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>
			);
		}
	}
}
