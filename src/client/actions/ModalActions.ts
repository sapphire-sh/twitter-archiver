import { InvalidateModalAction, ModalKeys, OpenModalAction } from './types/ModalActionTypes';

export enum ModalType {
  MODAL_IDLE = -1,
  MODAL_JSON = 1,
  MODAL_IMAGE,
  MODAL_MUTED_USERS,
  MODAL_BLOCKED_USERS,
}

export function invalidateModal(): InvalidateModalAction {
  return {
    type: ModalKeys.INVALIDATE_MODAL,
  };
}

export function openModal(type: ModalType, content: any): OpenModalAction {
  return {
    type: ModalKeys.OPEN_MODAL,
    modalType: type,
    modalContent: content,
  };
}
