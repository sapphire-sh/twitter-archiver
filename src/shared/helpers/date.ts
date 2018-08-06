import moment from 'moment';

export function dateToString(date: Date) {
	return moment(date).format('YYYY-MM-DD hh:mm:ss');
}

export function dateToRelativeString(date: Date) {
	return moment(date).fromNow();
}
