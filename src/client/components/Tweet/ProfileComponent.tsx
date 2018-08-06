import React from 'react';

import {
	Tweet,
} from '../../../shared/models';

import {
	dateToString,
	dateToRelativeString,
} from '../../../shared/helpers';

import {
	Label,
	Button,
} from 'semantic-ui-react';

interface ComponentProps {
	tweet: Tweet;
}

export class ProfileComponent extends React.Component<ComponentProps> {
	public render() {
		const {
			tweet,
		} = this.props;

		const {
			id_str,
			user,
			source,
			created_at,
		} = tweet;

		const {
			screen_name,
			name,
			profile_image_url_https,
			profile_link_color,
		} = user;

		const tweetUrl = `https://twitter.com/${screen_name}/status/${id_str}`;

		const date = new Date(created_at);

		return (
			<div className="tweet-profile">
				<a
					href={`https://twitter.com/${screen_name}`}
					target="_blank"
				>
					<Label
						image={true}
						ribbon={true}
						style={{
							'color': '#ffffff',
							'backgroundColor': `#${profile_link_color}`,
						}}
					>
						<img src={profile_image_url_https} />
						{name}
						<div className="detail">@{screen_name}</div>
					</Label>
				</a>
				<Button.Group size="mini">
					<Button basic={true} color="grey">
						<div
							className="source"
							dangerouslySetInnerHTML={{
								'__html': source,
							}}
						/>
					</Button>
					<Button animated="vertical" basic={true} color="grey">
						<Button.Content hidden={true}>
							<a href={tweetUrl} target="_blank">{dateToRelativeString(date)}</a>
						</Button.Content>
						<Button.Content visible={true}>
							{dateToString(date)}
						</Button.Content>
					</Button>
				</Button.Group>
			</div>
		);
	}
}
