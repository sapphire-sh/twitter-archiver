const API_URL = '/api';

export enum RequestType {
	FETCH_TWEETS = 10001,
	UPDATE_HISTORY = 20001,
	FETCH_FOLLOWING_USERS = 30001,
	FETCH_FOLLOWER_USERS,
	FETCH_MUTED_USERS,
	FETCH_BLOCKED_USERS,
	SEARCH = 40001,
}

enum RequestMethod {
	GET = 1,
	POST,
}

function getURL(requestType: RequestType): string {
	switch (requestType) {
	case RequestType.FETCH_TWEETS:
		return `${API_URL}/tweets`;
	case RequestType.UPDATE_HISTORY:
		return `${API_URL}/history`;
	case RequestType.FETCH_FOLLOWING_USERS:
		return `${API_URL}/users/following`;
	case RequestType.FETCH_FOLLOWER_USERS:
		return `${API_URL}/users/follower`;
	case RequestType.FETCH_MUTED_USERS:
		return `${API_URL}/users/muted`;
	case RequestType.FETCH_BLOCKED_USERS:
		return `${API_URL}/users/blocked`;
	case RequestType.SEARCH:
		return `${API_URL}/search`;
	}
}

function getMethod(requestType: RequestType): RequestMethod {
	switch (requestType) {
	case RequestType.FETCH_TWEETS:
	case RequestType.FETCH_FOLLOWING_USERS:
	case RequestType.FETCH_FOLLOWER_USERS:
	case RequestType.FETCH_MUTED_USERS:
	case RequestType.FETCH_BLOCKED_USERS:
	case RequestType.SEARCH:
		return RequestMethod.GET;
	case RequestType.UPDATE_HISTORY:
		return RequestMethod.POST;
	}
}

function getQuery(params: any): string {
	const query = Object.keys(params).map((e) => {
		return `${e}=${params[e]}`;
	}).join('&');

	if (query === undefined) {
		return '';
	}
	return `?${query}`;
}

export async function sendRequest(requestType: RequestType, params: any = {}) {
	const url = getURL(requestType);
	const method = getMethod(requestType);

	let response: Response | null = null;
	switch (method) {
	case RequestMethod.GET:
		const query = getQuery(params);

		response = await fetch(`${url}${query}`, {
			'credentials': 'include',
		});
		break;
	case RequestMethod.POST:
		response = await fetch(url, {
			'method': 'post',
			'headers': {
				'Content-Type': 'application/json',
			},
			'credentials': 'include',
			'body': JSON.stringify(params),
		});
		break;
	}
	if (response === null) {
		return;
	}
	return response.json();
}
