import {
	Tweet,
} from '../../shared/models';

const API_URL = '/api';

export enum RequestType {
	FETCH_TWEET = 10000,
}

enum RequestMethod {
	GET = 1,
	POST,
};

function getURL(requestType: RequestType): string {
	switch(requestType) {
	case RequestType.FETCH_TWEET:
		return `${API_URL}/tweets`;
	}
}

function getMethod(requestType: RequestType): RequestMethod {
	switch(requestType) {
	case RequestType.FETCH_TWEET:
		return RequestMethod.GET;
	}
}

// function getReturnType(requestType: RequestType) {
// 	switch(requestType) {
// 	case RequestType.FETCH_TWEET:
// 		return Tweet[];
// 	}
// }

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
