import React from 'react';

import {
	updateHistoryIfNeeded,
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
	isRetweet: boolean;
	isQuote: boolean;

	updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
	openModal: typeof openModal;
}

export class FooterComponent extends React.Component<ComponentProps> {
	constructor(props: ComponentProps) {
		super(props);

		this.handleUpdateHistory = this.handleUpdateHistory.bind(this);
		this.handlePrintJSON = this.handlePrintJSON.bind(this);
	}

	private handleUpdateHistory(id: string) {
		return () => {
			this.props.updateHistoryIfNeeded(id);
		};
	}

	private handlePrintJSON(tweet: Tweet) {
		return () => {
			this.props.openModal(ModalType.MODAL_JSON, tweet);
		};
	}

	public render() {
		const {
			tweet,
			isRetweet,
			isQuote,
		} = this.props;

		const {
			retweet_count,
			favorite_count,
			quote_count,
			reply_count,
		} = tweet as any;

		return (
			<Button.Group attached="bottom" size="tiny">
				{(() => {
					if(isRetweet === true) {
						return null;
					}
					if(isQuote === true) {
						return null;
					}
					return (
						<Button basic={true} color="blue" onClick={this.handleUpdateHistory(tweet.id_str)}>
							<Icon name="sync" />
						</Button>
					);
				})()}
				<Button basic={true} color="blue">
					<Icon name="reply" />
					<span>{reply_count === undefined ? -1 : reply_count}</span>
				</Button>
				<Button basic={true} color="blue" disabled={isRetweet || isQuote}>
					<Icon name="retweet" />
					<span>{retweet_count}</span>
				</Button>
				<Button basic={true} color="blue" disabled={isRetweet || isQuote}>
					<Icon name="star" />
					<span>{favorite_count}</span>
				</Button>
				<Button basic={true} color="blue">
					<Icon name="quote left" />
					<span>{quote_count === undefined ? -1 : quote_count}</span>
				</Button>
				<Button basic={true} color="blue" onClick={this.handlePrintJSON(tweet)}>
					<Icon name="code" />
				</Button>
			</Button.Group>
		);
	}
}
