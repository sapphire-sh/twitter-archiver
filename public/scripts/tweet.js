var Tweet = React.createClass({
	rawMarkup: function() {
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return { __html: rawMarkup };
	},
	render: function() {
		var tweet = this.props.tweet;
		var user = tweet.user;
		return (
			<div className="tweet">
				<a href={"https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str} target="_blank" className="user">{tweet.created_at}
					<img src={user.profile_image_url_https} className="user-profile_image" />
					<strong>{user.name}</strong>
					<span>@{user.screen_name}</span>
				</a>
				<div className="text">
					<span dangerouslySetInnerHTML={this.rawMarkup()} />
				</div>
				<div>
					<div className="created_at">
						<a href={"https://twitter.com/" + user.screen_name + "/status/" + tweet.id_str} target="_blank">{tweet.created_at}</a>
					</div>
					<div className="source" dangerouslySetInnerHTML={{__html: tweet.source.replace('<a', '<a target="_blank" ')}} />
					<div className="clear" />
				</div>
			</div>
		);
	}
});

var TweetBox = React.createClass({
	loadTweetsFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadTweetsFromServer();
	},
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="col s12">
						<TweetList data={this.state.data} />
					</div>
				</div>
			</div>
		);
	}
});

var TweetList = React.createClass({
	render: function() {
		var tweetNodes = this.props.data.map(function(tweet) {
			var retweetNode;
			if(tweet.retweeted_status !== undefined) {
				var divStyle = {
					margin: '2px 0'
				};
				retweetNode = (
					<div>
						<span>RT by <a href={"https://twitter.com/" + tweet.user.screen_name} target="_blank"><strong>{tweet.user.name}</strong> (@{tweet.user.screen_name})</a></span>
						<div style={divStyle}>
							<div className="created_at">
								<a href={"https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str} target="_blank">{tweet.created_at}</a>
							</div>
							<div className="source" dangerouslySetInnerHTML={{__html: tweet.source.replace('<a', '<a target="_blank" ')}} />
							<div className="clear" />
						</div>
					</div>
				);
				tweet = tweet.retweeted_status;
			}
			return (
				<div className="collection-item" key={tweet.id}>
					{retweetNode}
					<Tweet tweet={tweet}>
						{tweet.text}
					</Tweet>
				</div>
			);
		});
		return (
			<div className="collection">
				{tweetNodes}
			</div>
		);
	}
});

ReactDOM.render(
	<TweetBox url="/api/tweets" />,
	document.getElementById('content')
);
