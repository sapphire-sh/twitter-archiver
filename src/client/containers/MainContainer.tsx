import React from 'react';

import {
	connect,
} from 'react-redux';

import {
	TimelineContainer,
} from '../containers';

import '../styles/MainContainer.scss';

class MainComponent extends React.Component {
	public render() {
		return (
			<TimelineContainer />
		);
	}
}

export const MainContainer = connect()(MainComponent);
