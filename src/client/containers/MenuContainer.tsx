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
	Menu,
} from 'semantic-ui-react';

import {
	invalidateTweets,
	fetchTweetsIfNeeded,
} from '../actions';

import {
	State,
} from '../reducers';

import {
	getQueueCount,
} from '../selectors';

import {
	Icon,
	Input,
} from 'semantic-ui-react';

import '../styles/Menu.scss';

interface ComponentProps {
	queueCount: number;

	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
}

interface ComponentState {
	menuWidth: number;
	autoScroll: boolean;
	tick: number;
	position: number;
}

class MenuComponent extends React.Component<ComponentProps, ComponentState> {
	constructor(props: ComponentProps) {
		super(props);

		this.handleScroll = this.handleScroll.bind(this);
		this.handleRefreshTweets = this.handleRefreshTweets.bind(this);
		this.handleAutoScroll = this.handleAutoScroll.bind(this);

		this.state = {
			'menuWidth': 0,
			'autoScroll': false,
			'tick': null,
			'position': window.scrollY,
		};
	}

	private handleScroll(e: WheelEvent | KeyboardEvent) {
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

	private handleRefreshTweets() {
		this.props.invalidateTweets();
		this.props.fetchTweetsIfNeeded();
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
			'tick': window.setInterval(() => {
				const {
					autoScroll,
				} = this.state;

				if(autoScroll === false) {
					return;
				}

				window.scroll(0, document.body.scrollHeight);
			}, 1000),
		});

		this.handleRefreshTweets();
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
			queueCount,
		} = this.props;

		const {
			autoScroll,
		} = this.state;

		return (
			<Menu
				id="menu"
				size="tiny"
				style={{
					'width': this.state.menuWidth,
				}}
				vertical={true}
			>
				<Menu.Item>
					<Menu.Header>profile</Menu.Header>

					<Menu.Menu>
						<Menu.Item>
							<span>username</span>
						</Menu.Item>
						<Menu.Item>
							<span>@screen_name</span>
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>

				<Menu.Item>
					<Menu.Header>search</Menu.Header>

					<Menu.Menu>
						<Menu.Item>
							<Input placeholder="search" size="small" />
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>

				<Menu.Item>
					<Menu.Header>filter</Menu.Header>

					<Menu.Menu>
						<Menu.Item>
							<span>muted keywords</span>
						</Menu.Item>
						<Menu.Item>
							<span>muted users</span>
						</Menu.Item>
						<Menu.Item>
							<span>blocked users</span>
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>

				<Menu.Item>
					<Menu.Header>stats</Menu.Header>

					<Menu.Menu>
						<Menu.Item name="queue-count">
							<span>queue count: {queueCount}</span>
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>

				<Menu.Item>
					<Menu.Header>help</Menu.Header>

					<Menu.Menu>
						<Menu.Item>
							<span>keyboard shortcuts</span>
						</Menu.Item>
						<Menu.Item>
							<span>github</span>
						</Menu.Item>
						<Menu.Item>
							<span>@sapphire_dev</span>
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>

				<Menu.Item onClick={this.handleRefreshTweets}>
					<Menu.Menu>
						<Menu.Item>
							<Icon name="exchange" />
							<span>force refresh</span>
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>

				<Menu.Item active={autoScroll} onClick={this.handleAutoScroll}>
					<Menu.Menu>
						<Menu.Item>
							<Icon name="angle double down" />
							<span>auto scroll</span>
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>
			</Menu>
		);
	}
}

function mapStateToProps(state: State) {
	return {
		'queueCount': getQueueCount(state),
	};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
	return bindActionCreators({
		'invalidateTweets': invalidateTweets,
		'fetchTweetsIfNeeded': fetchTweetsIfNeeded,
	}, dispatch);
}

export const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
