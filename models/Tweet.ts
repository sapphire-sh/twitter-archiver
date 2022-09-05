import Twit from 'twit';

export type Tweet = Twit.Twitter.Status;
export type User = Twit.Twitter.User;
export interface Entities extends Twit.Twitter.Entities {
	media: MediaEntity[];
}
export interface MediaEntity extends Twit.Twitter.MediaEntity {
	video_info: any;
}
