import { ModalType } from '~/client/actions';
import { ModalAction, ModalKeys } from '~/client/actions/types';

export interface ModalState {
  modalType: ModalType;
  modalContent: any;
}

const initialState: ModalState = {
  modalType: ModalType.MODAL_IDLE,
  modalContent: null,
};

export function modal(state = initialState, action: ModalAction): ModalState {
  switch (action.type) {
    case ModalKeys.INVALIDATE_MODAL:
      return {
        ...initialState,
      };
    case ModalKeys.OPEN_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        modalContent: action.modalContent,
      };
    default:
      return state;
  }
}
