'use strict';

export function dateToString(date) {
	const year = date.getFullYear();
	const month = `0${date.getMonth() + 1}`.substr(-2);
	const day = `0${date.getDate()}`.substr(-2);
	const hours = `0${date.getHours()}`.substr(-2);
	const minutes = `0${date.getMinutes()}`.substr(-2);
	const seconds = `0${date.getSeconds()}`.substr(-2);

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
