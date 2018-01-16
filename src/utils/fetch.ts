export function fetchGet(url: string) {
	return fetch(url, {
		'credentials': 'include',
	})
	.then((res) => {
		return res.json();
	});
}

export function fetchPost(url: string, body: object) {
	return fetch(url, {
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json',
		},
		'credentials': 'include',
		'body': JSON.stringify(body),
	})
	.then((res) => {
		return res.json();
	});
}

export default {
	'get': fetchGet,
	'post': fetchPost,
};
