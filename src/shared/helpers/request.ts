const API_URL = '/api';

export enum RequestType {
	FETCH_TWEETS = 10001,
	UPDATE_HISTORY = 20001,
	FETCH_FOLLOWING_USERS = 30001,
	FETCH_FOLLOWER_USERS,
}

enum RequestMethod {
	GET = 1,
	POST,
}

function getURL(requestType: RequestType): string {
	switch(requestType) {
	case RequestType.FETCH_TWEETS:
		return `${API_URL}/tweets`;
	case RequestType.UPDATE_HISTORY:
		return `${API_URL}/history`;
	case RequestType.FETCH_FOLLOWING_USERS:
		return `${API_URL}/users/following`;
	case RequestType.FETCH_FOLLOWER_USERS:
		return `${API_URL}/users/follower`;
	}
}

function getMethod(requestType: RequestType): RequestMethod {
	switch(requestType) {
	case RequestType.FETCH_TWEETS:
	case RequestType.FETCH_FOLLOWING_USERS:
	case RequestType.FETCH_FOLLOWER_USERS:
		return RequestMethod.GET;
	case RequestType.UPDATE_HISTORY:
		return RequestMethod.POST;
	}
}

export function sendRequest(requestType: RequestType, params: {} = {}) {
	const url = getURL(requestType);
	const method = getMethod(requestType);

	switch(method) {
	case RequestMethod.GET:
		return fetch(url, {
			'credentials': 'include',
		}).then((res) => {
			return res.json();
		});
	case RequestMethod.POST:
		return fetch(url, {
			'method': 'post',
			'headers': {
				'Content-Type': 'application/json',
			},
			'credentials': 'include',
			'body': JSON.stringify(params),
		}).then((res) => {
			return res.json();
		});
	}
}
