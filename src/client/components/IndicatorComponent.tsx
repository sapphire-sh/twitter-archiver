import React from 'react';

import '../styles/IndicatorComponent.scss';

interface ComponentProps {
	isSocketConnected: boolean;
}

interface ComponentState {
	state: boolean;
}

export class IndicatorComponent extends React.Component<ComponentProps, ComponentState> {
	constructor(props: ComponentProps) {
		super(props);
	}

	public render() {
		const {
			isSocketConnected,
		} = this.props;

		return (
			<div id="indicator">
				<div id="indicator_connected" className={`indicators ${isSocketConnected ? 'active' : ''}`} />
				<div id="indicator_disconnected" className={`indicators ${isSocketConnected ? '' : 'active'}`} />
			</div>
		);
	}
}
