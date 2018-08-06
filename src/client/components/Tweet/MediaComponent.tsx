import React from 'react';

import {
	openModal,
	ModalType,
} from '../../actions';

import {
	Entities,
	MediaEntity,
} from '../../../shared/models';

import {
	Image,
} from 'semantic-ui-react';

interface ComponentProps {
	id: string;
	entities: Entities;

	openModal: typeof openModal;
}

export class MediaComponent extends React.Component<ComponentProps> {
	constructor(props: ComponentProps) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	private handleClick(medium: MediaEntity) {
		return () => {
			this.props.openModal(ModalType.MODAL_IMAGE, {
				'url': medium.media_url_https,
			});
		};
	}

	public render() {
		const {
			id,
			entities,
		} = this.props;

		return (
			<Image.Group
				size="small"
				style={{
					'display': 'flex',
					'justifyContent': 'space-between',
					'alignItems': 'center',
					'flexWrap': 'wrap',
				}}
			>
				{entities.media.map((medium) => {
					switch(medium.type) {
					case 'video':
						return (
							<iframe
								key={medium.id_str}
								style={{
									'margin': '0 auto',
								}}
								src={`https://twitter.com/i/videos/${id}`}
							/>
						);
					case 'photo':
					default:
						return (
							<Image
								key={medium.id_str}
								style={{
									'margin': '0 auto',
								}}
								src={medium.media_url_https}
								rounded={true}
								onClick={this.handleClick(medium)}
							/>
						);
					}
				})}
			</Image.Group>
		);
	}
}
