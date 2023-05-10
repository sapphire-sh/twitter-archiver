import React from 'react';
import { Menu } from 'semantic-ui-react';

export class MenuStatsComponent extends React.Component {
  public render() {
    return (
      <Menu.Item>
        <Menu.Header>{'stats'}</Menu.Header>
        <Menu.Menu>
          <Menu.Item>
            <span>{'queue count'}</span>
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    );
  }
}
