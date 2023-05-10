import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import { fetchBlockedUsersIfNeeded, fetchMutedUsersIfNeeded } from '~/client/actions';
import { State } from '~/client/reducers';
import { getBlockedUsers, getMutedUsers } from '~/client/selectors';
import { User } from '~/shared/models';

interface ComponentProps {
  mutedUsers: User[];
  blockedUsers: User[];

  fetchMutedUsersIfNeeded: typeof fetchMutedUsersIfNeeded;
  fetchBlockedUsersIfNeeded: typeof fetchBlockedUsersIfNeeded;
}

class FilterComponent extends React.Component<ComponentProps> {
  public componentDidMount() {
    this.props.fetchMutedUsersIfNeeded();
    this.props.fetchBlockedUsersIfNeeded();
  }

  public render() {
    const { mutedUsers, blockedUsers } = this.props;

    console.log(`${mutedUsers.length} ${blockedUsers.length}`);

    return null;
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
      fetchMutedUsersIfNeeded,
      fetchBlockedUsersIfNeeded,
    },
    dispatch
  );
}

export const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
