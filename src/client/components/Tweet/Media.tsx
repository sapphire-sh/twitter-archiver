import * as React from 'react';

import {
	Entities,
} from '../../../shared/models';

interface MediaProps {
	entities: Entities;
};

class Media extends React.Component<MediaProps> {
	render() {
		const entities = this.props.entities;

		if(entities === undefined) {
			return null;
		}

		if(entities.media === undefined) {
			return null;
		}

		return (
			<div className="ui attached segment small images" style={{
				'display': 'flex',
				'justifyContent': 'space-between',
				'alignItems': 'center',
				'flexWrap': 'wrap',
			}}>
				{
					entities.media.map((medium) => {
						return (
							<img key={ medium.id_str } style={{
								'margin': '0 auto',
							}} className="ui rounded image" src={ medium.media_url_https } />
						);
					})
				}
			</div>
		);
	}
}

export default Media;
