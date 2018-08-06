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
						<Button onClick={this.handleUpdateHistory(tweet.id_str)} animated="vertical" basic={true} color="blue">
							<Button.Content hidden={true}>read</Button.Content>
							<Button.Content visible={true}>
								<Icon name="sync" />
							</Button.Content>
						</Button>
					);
				})()}
				<Button animated="vertical" basic={true} color="blue">
					<Button.Content hidden={true}>reply</Button.Content>
					<Button.Content visible={true}>
						<Icon name="reply" />
						<span>{reply_count === undefined ? -1 : reply_count}</span>
					</Button.Content>
				</Button>
				<Button animated="vertical" basic={true} color="blue" disabled={isRetweet || isQuote}>
					<Button.Content hidden={true}>retweet</Button.Content>
					<Button.Content visible={true}>
						<Icon name="retweet" />
						<span>{retweet_count}</span>
					</Button.Content>
				</Button>
				<Button animated="vertical" basic={true} color="blue" disabled={isRetweet || isQuote}>
					<Button.Content hidden={true}>favorite</Button.Content>
					<Button.Content visible={true}>
						<Icon name="star" />
						<span>{favorite_count}</span>
					</Button.Content>
				</Button>
				<Button animated="vertical" basic={true} color="blue">
					<Button.Content hidden={true}>quote</Button.Content>
					<Button.Content visible={true}>
						<Icon name="quote left" />
						<span>{quote_count === undefined ? -1 : quote_count}</span>
					</Button.Content>
				</Button>
				<Button onClick={this.handlePrintJSON(tweet)} animated="vertical" basic={true} color="blue">
					<Button.Content hidden={true}>json</Button.Content>
					<Button.Content visible={true}>
						<Icon name="code" />
					</Button.Content>
				</Button>
			</Button.Group>
		);
	}
}
