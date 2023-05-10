import { Action } from 'redux';
import { ModalType } from '../ModalActions';

export enum ModalKeys {
  INVALIDATE_MODAL = 'INVALIDATE_MODAL',
  OPEN_MODAL = 'OPEN_MODAL',
}

export interface InvalidateModalAction extends Action {
  type: ModalKeys.INVALIDATE_MODAL;
}

export interface OpenModalAction extends Action {
  type: ModalKeys.OPEN_MODAL;
  modalType: ModalType;
  modalContent: any;
}

export type ModalAction = InvalidateModalAction | OpenModalAction;
