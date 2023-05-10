import React from 'react';
import { Menu } from 'semantic-ui-react';

export class MenuRelationsComponent extends React.Component {
  public render() {
    return (
      <Menu.Item>
        <Menu.Header>{'relations'}</Menu.Header>
        <Menu.Menu>
          <Menu.Item>
            <span>{'followings'}</span>
          </Menu.Item>
          <Menu.Item>
            <span>{'followers'}</span>
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    );
  }
}
