import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { IndicatorComponent, NavigationComponent } from '~/client/components';
import { MainContainer, ModalContainer, SearchContainer, SocketContainer } from '~/client/containers';
import '~/client/styles/AppContainer.scss';
import { State } from '../reducers';
import { getIsSocketConnected } from '../selectors';

interface ComponentProps {
  isSocketConnected: boolean;
}

class AppComponent extends React.Component<ComponentProps> {
  public componentDidMount() {
    window.scroll(0, 0);
  }

  public render() {
    return (
      <HashRouter
      // history={history}
      >
        <React.Fragment>
          <IndicatorComponent {...this.props} />
          <Container>
            {/* <Grid>
              <Grid.Column width={4}>
                <MenuContainer />
              </Grid.Column>

              <Grid.Column id="component_b" width={12}> */}
            <NavigationComponent />
            <Routes>
              <Route path="/" element={<MainContainer />} />
              <Route path="/search" element={<SearchContainer />} />
            </Routes>
            {/* </Grid.Column>
            </Grid> */}
          </Container>

          <ModalContainer />
          <SocketContainer />
        </React.Fragment>
      </HashRouter>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    isSocketConnected: getIsSocketConnected(state),
  };
}

export const AppContainer = connect(mapStateToProps)(AppComponent);
