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
	Icon,
} from 'semantic-ui-react';

interface ComponentProps {
	tweet: Tweet;
	isRetweet: boolean;
	isQuote: boolean;
}

interface ComponentState {
	tick: number;
	key: number;
	keyGenerator: ReturnType<typeof generateKey>;
}

function* generateKey() {
	let i = 0;

	while(true) {
		i += 1;
		if(i <= 60) {
			yield i;
			continue;
		}
		yield 60 + Math.floor(i / 60);
	}
}

export class ProfileComponent extends React.Component<ComponentProps, ComponentState> {
	constructor(props: ComponentProps) {
		super(props);

		this.state = {
			'tick': null,
			'keyGenerator': generateKey(),
			'key': 0,
		};
	}

	public componentDidMount() {
		const {
			keyGenerator,
		} = this.state;

		this.setState({
			'tick': window.setInterval(() => {
				this.setState({
					'key': keyGenerator.next().value,
				});
			}, 1000),
		});
	}

	public shouldComponentUpdate(nextProps: ComponentProps, nextState: ComponentState) {
		return this.state.key !== nextState.key;
	}

	public componentWillUnmount() {
		const {
			tick,
		} = this.state;

		if(tick !== null) {
			window.clearInterval(tick);
		}
	}

	public render() {
		const {
			tweet,
			isRetweet,
			isQuote,
		} = this.props;

		const {
			key,
		} = this.state;

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
			// protected,
			verified,
			translator_type,
		} = user as any;

		const tweetUrl = `https://twitter.com/${screen_name}/status/${id_str}`;

		const date = new Date(created_at);

		return (
			<div className="tweet-profile">
				<Label
					as="a"
					image={true}
					ribbon={isQuote || isRetweet ? false : true}
					basic={true}
					href={`https://twitter.com/${screen_name}`}
					target="_blank"
					style={{
						'border': `1px solid #${profile_link_color}`,
					}}
				>
					<img src={profile_image_url_https} />
					<span>{name}</span>
					<span>@{screen_name}</span>
					{(() => {
						if(user.protected === true) {
							return (
								<Icon name="lock" color="grey" />
							);
						}
						return null;
					})()}
					{(() => {
						if(verified === true) {
							return (
								<Icon name="check" color="blue" />
							);
						}
						return null;
					})()}
					{(() => {
						switch(translator_type) {
						case 'badged':
							return (
								<Icon name="globe" color="blue" />
							);
						case 'moderator':
							return (
								<Icon name="globe" color="orange" />
							);
						case 'regular':
						default:
							return null;
						}
					})()}
				</Label>
				<Button.Group size="mini">
					<Button basic={true} color="blue">
						<div
							className="source"
							dangerouslySetInnerHTML={{
								'__html': source,
							}}
						/>
					</Button>
					<Button animated="vertical" basic={true} color="blue">
						<Button.Content hidden={true}>
							<a key={key} href={tweetUrl} target="_blank">{dateToRelativeString(date)}</a>
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
