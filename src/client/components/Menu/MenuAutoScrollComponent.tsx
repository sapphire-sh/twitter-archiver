import React from 'react';

import {
	Menu,
	Icon,
} from 'semantic-ui-react';

interface ComponentState {
	tick: number | null;
	autoScroll: boolean;
}

export class MenuAutoScrollComponent extends React.Component<{}, ComponentState> {
	constructor(props: {}) {
		super(props);

		this.handleScroll = this.handleScroll.bind(this);
		this.handleAutoScroll = this.handleAutoScroll.bind(this);

		this.state = {
			'autoScroll': false,
			'tick': null,
		};
	}

	public componentDidMount() {
		window.addEventListener('wheel', this.handleScroll);
		window.addEventListener('keydown', this.handleScroll);
	}

	public componentDidUpdate(prevProps: {}, prevState: ComponentState) {
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

	public render() {
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
