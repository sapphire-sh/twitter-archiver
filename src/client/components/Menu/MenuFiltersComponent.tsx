import React from 'react';

import {
	openModal,
	ModalType,
} from '~/client/actions';

import {
	User,
} from '~/shared/models';

import {
	Menu,
} from 'semantic-ui-react';

interface ComponentProps {
	mutedUsers: User[];
	blockedUsers: User[];

	openModal: typeof openModal;
}

export class MenuFiltersComponent extends React.Component<ComponentProps> {
	constructor(props: ComponentProps) {
		super(props);

		this.handleClick_MutedUsers = this.handleClick_MutedUsers.bind(this);
		this.handleClick_BlockedUsers = this.handleClick_BlockedUsers.bind(this);
	}
	private handleClick_MutedUsers() {
		const {
			mutedUsers,
		} = this.props;

		this.props.openModal(ModalType.MODAL_MUTED_USERS, mutedUsers);
	}

	private handleClick_BlockedUsers() {
		const {
			blockedUsers,
		} = this.props;

		this.props.openModal(ModalType.MODAL_BLOCKED_USERS, blockedUsers);
	}

	public render() {
		return (
			<Menu.Item>
				<Menu.Header>{'filters'}</Menu.Header>
				<Menu.Menu>
					<Menu.Item>
						<span>{'muted keywords'}</span>
					</Menu.Item>
					<Menu.Item onClick={this.handleClick_MutedUsers}>
						<span>{'muted users'}</span>
					</Menu.Item>
					<Menu.Item onClick={this.handleClick_BlockedUsers}>
						<span>{'blocked users'}</span>
					</Menu.Item>
				</Menu.Menu>
			</Menu.Item>
		);
	}
}
