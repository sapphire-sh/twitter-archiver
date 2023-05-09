import React from 'react';

import {
	connect,
} from 'react-redux';

import {
	StatsContainer,
	TimelineContainer,
} from '~/client/containers';

import '~/client/styles/MainContainer.scss';

class MainComponent extends React.Component {
	public render() {
		return (
			<>
				<StatsContainer />
				<TimelineContainer />
			</>
		);
	}
}

export const MainContainer = connect()(MainComponent);
