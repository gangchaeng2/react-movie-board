import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Container from './components/templates/Container';

import SearchResultContainer from './containers/SearchResultContainer';
import ModalContainer from './containers/ModalContainer';
import BoxOfficeContainer from './containers/BoxOfficeContainer';
import CategoryContainer from './containers/CategoryContainer';
import HeaderContainer from './containers/HeaderContainer';

import styled from 'styled-components';

const Wrapper = styled.div`
    width: 105rem;
    margin: 0 auto;
    margin-top: 20px;
`;

class App extends Component {
    render() {
        const { view } = this.props;

        return (
            <div>
              <Helmet>
                  <title>BigShine - MovieProject</title>
              </Helmet>
              <HeaderContainer />
              <Wrapper>
                  <Container visible={view === 'search'}>
                      <SearchResultContainer />
                  </Container>
                  <Container visible={view === 'box office'}>
                      <BoxOfficeContainer />
                  </Container>
                  <Container visible={view === 'category'}>
                      <CategoryContainer />
                  </Container>
                  <ModalContainer />
              </Wrapper>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        view: state.viewSelector.get('view')
    })
)(App);
