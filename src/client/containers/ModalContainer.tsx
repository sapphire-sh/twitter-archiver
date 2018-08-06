import React from 'react';

import {
	bindActionCreators,
	Dispatch,
	AnyAction,
} from 'redux';

import {
	connect,
} from 'react-redux';

import {
	invalidateModal,
	ModalType,
} from '../actions';

import {
	State,
} from '../reducers';

import {
	getModalType,
	getModalContent,
} from '../selectors';

import '../styles/Modal.scss';

interface ComponentProps {
	modalType: ModalType;
	modalContent: any;

	invalidateModal: typeof invalidateModal;
}

class ModalComponent extends React.Component<ComponentProps> {
	constructor(props: ComponentProps) {
		super(props);

		this.handleClose = this.handleClose.bind(this);
	}

	private handleClose() {
		console.log(1);
		this.props.invalidateModal();
	}

	public componentDidUpdate(prevProps: ComponentProps) {
		const prevModalType = prevProps.modalType;
		const currModalType = this.props.modalType;

		if(prevModalType !== currModalType) {
			if(prevModalType === ModalType.MODAL_IDLE) {
				document.body.classList.add('no-scroll');
			}
			if(currModalType === ModalType.MODAL_IDLE) {
				document.body.classList.remove('no-scroll');
			}
		}
	}

	public render() {
		const {
			modalType,
			modalContent,
		} = this.props;

		if(modalType === ModalType.MODAL_IDLE) {
			return null;
		}

		return (
			<div id="modal">
				<div id="modal_background" onClick={this.handleClose} />
				<div id="modal_content">
					{(() => {
						switch(modalType) {
						case ModalType.MODAL_JSON:
							return (
								<pre>{JSON.stringify(modalContent, null, 1)}</pre>
							);
						case ModalType.MODAL_IMAGE:
							return (
								<img src={modalContent.url} />
							);
						}
					})()}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state: State) {
	return {
		'modalType': getModalType(state),
		'modalContent': getModalContent(state),
	};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
	return bindActionCreators({
		'invalidateModal': invalidateModal,
	}, dispatch);
}

export const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
