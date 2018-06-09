import * as React from 'react';

import twitter from 'twitter-text';

import {
	Entities,
} from '../../../shared/models';

interface TextProps {
	text: string;
	entities: Entities;
};

class Text extends React.Component<TextProps> {
	render() {
		const {
			text,
			entities,
		} = this.props;

		return (
			<div className="text">
				<div dangerouslySetInnerHTML={{
					'__html': twitter.autoLink(text, {
						'urlEntities': entities.urls,
					}).replace(/\n/g, '<br />'),
				}} />
			</div>
		);
	}
}

export default Text;
