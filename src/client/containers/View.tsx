import React from 'react';

import {
	bindActionCreators,
	AnyAction,
} from 'redux';
import {
	Dispatch,
	connect,
} from 'react-redux';

import {
	invalidateTweets,
	fetchTweetsIfNeeded,
} from '../actions';

import {
	State,
} from '../reducers';

import Tweets from '../components/Tweets';

import {
	Grid,
	Menu,
} from 'semantic-ui-react'

interface ViewProps {
	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
}

class View extends React.Component<ViewProps> {
	constructor(props: ViewProps) {
		super(props);

		this.refreshTweets = this.refreshTweets.bind(this);
	}

	componentWillMount() {
		this.refreshTweets();
	}

	refreshTweets() {
		this.props.invalidateTweets();
		this.props.fetchTweetsIfNeeded();
	}

	render() {
		return (
			<Grid>
				<Grid.Column width={4}>
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
					</Menu>
				</Grid.Column>

				<Grid.Column stretched width={12}>
					<Tweets />
					<div onClick={this.refreshTweets} className="ui attached button">refresh</div>
				</Grid.Column>
			</Grid>
		);
	}
}

function mapStateToProps(state: State) {
	return {};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
	return bindActionCreators({
		invalidateTweets,
		fetchTweetsIfNeeded,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
