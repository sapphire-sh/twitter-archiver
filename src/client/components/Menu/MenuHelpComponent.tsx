import React from 'react';
import { Dropdown } from 'semantic-ui-react';

export class MenuHelpComponent extends React.Component {
  public render() {
    return (
      <Dropdown item={true} text={'help'}>
        <Dropdown.Menu>
          {/* <Dropdown.Header>{'help'}</Dropdown.Header> */}
          <Dropdown.Item>
            <span>{'github'}</span>
          </Dropdown.Item>
          <Dropdown.Item>
            <span>{'@sapphire_dev'}</span>
          </Dropdown.Item>
          <Dropdown.Item>
            <span>{'keyboard shortcuts'}</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
