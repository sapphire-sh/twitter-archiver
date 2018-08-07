import moment from 'moment';

export function dateToString(date: Date) {
	return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

export function dateToRelativeString(date: Date) {
	return moment(date).fromNow();
}
