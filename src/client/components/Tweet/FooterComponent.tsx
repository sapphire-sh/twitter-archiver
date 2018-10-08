import React from 'react';

import {
	openModal,
	ModalType,
} from '../../actions';

import {
	Tweet,
} from '../../../shared/models';

import {
	Button,
	Icon,
} from 'semantic-ui-react';

interface ComponentProps {
	tweet: Tweet;

	openModal: typeof openModal;
}

export class FooterComponent extends React.Component<ComponentProps> {
	constructor(props: ComponentProps) {
		super(props);

		this.handlePrintJSON = this.handlePrintJSON.bind(this);
	}

	private handlePrintJSON(tweet: Tweet) {
		return () => {
			this.props.openModal(ModalType.MODAL_JSON, tweet);
		};
	}

	public render() {
		const {
			tweet,
		} = this.props;

		const {
			retweet_count,
			favorite_count,
		} = tweet;

		return (
			<Button.Group fluid={true} size="tiny">
				<Button basic={true} color="grey">
					<Icon name="retweet" />
					<span>{retweet_count}</span>
				</Button>
				<Button basic={true} color="grey">
					<Icon name="star" />
					<span>{favorite_count}</span>
				</Button>
				<Button basic={true} color="grey" onClick={this.handlePrintJSON(tweet)}>
					<Icon name="code" />
				</Button>
			</Button.Group>
		);
	}
}
