import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import { Menu } from 'semantic-ui-react';
import { fetchTweetsIfNeeded, invalidateTweets, openModal } from '~/client/actions';
import {
  MenuAutoScrollComponent,
  MenuFiltersComponent,
  MenuForceRefreshComponent,
  // MenuHelpComponent,
  MenuProfileComponent,
  // MenuRelationsComponent,
  MenuStatsComponent,
} from '~/client/components';
import { State } from '~/client/reducers';
import { getBlockedUsers, getMutedUsers } from '~/client/selectors';
import '~/client/styles/MenuContainer.scss';
import { User } from '~/shared/models';

interface ComponentProps {
  mutedUsers: User[];
  blockedUsers: User[];

  invalidateTweets: typeof invalidateTweets;
  fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
  openModal: typeof openModal;
}

class MenuComponent extends React.Component<ComponentProps> {
  public render() {
    return (
      <div id="menu">
        <Menu size="tiny" vertical={true} fluid={true}>
          <MenuProfileComponent {...this.props} />
          {/* <MenuRelationsComponent {...this.props} /> */}
          <MenuFiltersComponent {...this.props} />
          <MenuStatsComponent {...this.props} />
          {/* <MenuHelpComponent {...this.props} /> */}
          <MenuForceRefreshComponent {...this.props} />
          <MenuAutoScrollComponent {...this.props} />
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    mutedUsers: getMutedUsers(state),
    blockedUsers: getBlockedUsers(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return bindActionCreators(
    {
      invalidateTweets,
      fetchTweetsIfNeeded,
      openModal,
    },
    dispatch
  );
}

export const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
