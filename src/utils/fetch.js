export function fetchGet(url) {
	return fetch(url)
	.then((res) => {
		return res.json();
	});
}

export function fetchPost(url, body) {
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
