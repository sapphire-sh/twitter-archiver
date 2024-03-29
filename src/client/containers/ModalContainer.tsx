import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { invalidateModal, ModalType } from '~/client/actions';
import { State } from '~/client/reducers';
import { getModalContent, getModalType } from '~/client/selectors';
import '~/client/styles/ModalComponent.scss';
import { User } from '~/shared/models';

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

    if (prevModalType !== currModalType) {
      if (prevModalType === ModalType.MODAL_IDLE) {
        document.body.classList.add('no-scroll');
      }
      if (currModalType === ModalType.MODAL_IDLE) {
        document.body.classList.remove('no-scroll');
      }
    }
  }

  public render() {
    const { modalType, modalContent } = this.props;

    if (modalType === ModalType.MODAL_IDLE) {
      return null;
    }

    return (
      <div id="modal">
        <div id="modal_background" onClick={this.handleClose} />
        <div id="modal_content">
          {(() => {
            switch (modalType) {
              case ModalType.MODAL_JSON:
                return <pre>{JSON.stringify(modalContent, null, 1)}</pre>;
              case ModalType.MODAL_IMAGE:
                return <img src={modalContent.url} />;
              case ModalType.MODAL_MUTED_USERS:
              case ModalType.MODAL_BLOCKED_USERS:
                const users: User[] = modalContent;

                return (
                  <React.Fragment>
                    {users.map((user, i) => {
                      return <div key={i}>{user.screen_name}</div>;
                    })}
                  </React.Fragment>
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
    modalType: getModalType(state),
    modalContent: getModalContent(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return bindActionCreators(
    {
      invalidateModal,
    },
    dispatch
  );
}

export const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
