import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import StickyHeader from 'react-sticky-header';

import Container from './components/templates/Container';

import SearchResultContainer from './containers/SearchResultContainer';
import ModalContainer from './containers/ModalContainer';
import BoxOfficeContainer from './containers/BoxOfficeContainer';
import CategoryContainer from './containers/CategoryContainer';
import HeaderContainer from './containers/HeaderContainer';

import 'react-sticky-header/styles.css';

import styled from 'styled-components';

const Wrapper = styled.div`
    width: 90%;
    margin: 0 auto;
    margin-top: 8rem;
}
`;

class App extends Component {
    render() {
        const { view } = this.props;

        return (
            <div>
              <StickyHeader
                header={
                  <HeaderContainer />
                }
              >
              </StickyHeader>

              <Helmet>
                  <title>BigShine - MovieProject</title>
              </Helmet>

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
