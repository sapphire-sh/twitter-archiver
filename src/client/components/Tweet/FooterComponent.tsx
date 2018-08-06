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
	dateToString,
} from '../../../shared/helpers';

import {
	Segment,
	Label,
	Icon,
} from 'semantic-ui-react';

interface ComponentProps {
	tweet: Tweet;

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
		} = this.props;

		const {
			retweet_count,
			favorite_count,
		} = tweet;

		const tweetUrl = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

		return (
			<Segment className="tweet-footer">
				<div>
					<Icon name="sync" onClick={this.handleUpdateHistory(tweet.id_str)} />
					<Icon name="code" onClick={this.handlePrintJSON(tweet)} />
				</div>
				<div>
					<Label>
						<Icon name="retweet" />{retweet_count}
					</Label>
					<Label>
						<Icon name="star" />{favorite_count}
					</Label>
				</div>
				<div className="created_at">
					<a href={tweetUrl} target="_blank">
						{dateToString(new Date(tweet.created_at))}
					</a>
				</div>
				<div
					className="source"
					dangerouslySetInnerHTML={{
						'__html': tweet.source!,
					}}
				/>
			</Segment>
		);
	}
}
