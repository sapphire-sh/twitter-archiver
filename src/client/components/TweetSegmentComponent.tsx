import React from 'react';

import {
	updateHistoryIfNeeded,
	openModal,
	ModalType,
} from '../actions';

import {
	Tweet,
} from '../../shared/models';

import {
	TweetComponent,
	RetweetComponent,
} from '../components';

import {
	Segment,
	Button,
} from 'semantic-ui-react';

import '../styles/TweetSegment.scss';

interface ComponentProps {
	tweet: Tweet;

	updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
	openModal: typeof openModal;
}

export class TweetSegmentComponent extends React.Component<ComponentProps> {
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
			console.log(tweet);
			this.props.openModal(ModalType.MODAL_JSON, tweet);
		};
	}

	public render() {
		const {
			tweet,
		} = this.props;

		return (
			<Segment key={tweet.id_str} className="tweet-segment">
				{(() => {
					if(tweet.retweeted_status === undefined) {
						return (
							<TweetComponent tweet={tweet} />
						);
					}
					return (
						<RetweetComponent tweet={tweet} />
					);
				})()}
				<Button onClick={this.handleUpdateHistory(tweet.id_str)}>
					{tweet.id_str}
				</Button>
				<Button onClick={this.handlePrintJSON(tweet)}>
					json
				</Button>
			</Segment>
		);
	}
}
