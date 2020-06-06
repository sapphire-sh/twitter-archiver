import {
	createSelector,
} from 'reselect';

import {
	State,
} from '~/client/reducers';

import {
	ModalType,
} from '~/client/actions';

function getState(state: State) {
	return state.modalState;
}

export const getModalType = createSelector([
	getState,
], (state): ModalType => {
	return state.modalType;
});

export const getModalContent = createSelector([
	getState,
	getModalType,
], (state, modalType): any | null => {
	if (modalType === ModalType.MODAL_IDLE) {
		return null;
	}
	return state.modalContent;
});
