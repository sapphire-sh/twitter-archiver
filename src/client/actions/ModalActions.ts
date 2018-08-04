import {
	ModalKeys,
	InvalidateModalAction,
	OpenModalAction,
} from './types/ModalActionTypes';

export enum ModalType {
	MODAL_IDLE = -1,
	MODAL_JSON = 1,
}

export function invalidateModal(): InvalidateModalAction {
	return {
		'type': ModalKeys.INVALIDATE_MODAL,
	};
}

export function openModal(type: ModalType, content: {}): OpenModalAction {
	return {
		'type': ModalKeys.OPEN_MODAL,
		'modalType': type,
		'modalContent': content,
	};
}
