import React from 'react';

import {
	updateHistoryIfNeeded,
} from '~/client/actions';

import {
	Tweet,
} from '~/shared/models';

import {
	dateToString,
} from '~/shared/helpers';

import {
	ProfileComponent,
} from '~/client/components';

import {
	Button,
	Icon,
} from 'semantic-ui-react';

interface ComponentProps {
	tweet: Tweet;
	isRetweet: boolean;
	isQuote: boolean;

	updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
}

export class HeaderComponent extends React.Component<ComponentProps> {
	constructor(props: ComponentProps) {
		super(props);

		this.handleUpdateHistory = this.handleUpdateHistory.bind(this);
	}

	private handleUpdateHistory(id: string) {
		return () => {
			this.props.updateHistoryIfNeeded(id);
		};
	}

	public render() {
		const {
			tweet,
			isRetweet,
			isQuote,
		} = this.props;

		const {
			id_str,
			user,
			source,
			created_at,
		} = tweet;

		const {
			screen_name,
		} = user;

		const date = new Date(created_at);

		return (
			<div className="tweet-header">
				<ProfileComponent {...this.props} user={user} />
				<Button.Group size="tiny">
					<Button basic={true} color="blue">
						<div
							className="source"
							dangerouslySetInnerHTML={{
								'__html': source === undefined ? '' : source,
							}}
						/>
					</Button>
					<Button
						as="a"
						basic={true}
						color="blue"
						href={`https://twitter.com/${screen_name}/status/${id_str}`}
						target="_blank"
					>
						{dateToString(date)}
					</Button>
					{(() => {
						if (isRetweet === true) {
							return null;
						}
						if (isQuote === true) {
							return null;
						}
						return (
							<Button color="blue" onClick={this.handleUpdateHistory(tweet.id_str)}>
								<Icon name="sync" />
								{'mark as read'}
							</Button>
						);
					})()}
				</Button.Group>
			</div>
		);
	}
}
