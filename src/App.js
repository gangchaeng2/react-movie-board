import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import StickyHeader from 'react-sticky-header';

import Container from './components/templates/Container';
import { HeaderContainer, HomeContainer, SearchResultContainer, CategoryContainer, BoxOfficeContainer, MovieDetailContainer }  from './containers';
import Footer from './components/molecules/Footer/Footer';

import 'react-sticky-header/styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';

const Wrapper = styled.div`
    max-width: 80%;
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
                header={ <HeaderContainer /> }
              />

              <Helmet>
                  <title>BigShine - MovieProject</title>
              </Helmet>

              <Wrapper>
                  <Container visible={view === 'home'}>
                      <HomeContainer />
                  </Container>
                  <Container visible={view === 'search'}>
                      <SearchResultContainer />
                  </Container>
                  <Container visible={view === 'box office'}>
                      <BoxOfficeContainer />
                  </Container>
                  <Container visible={view === 'category'}>
                      <CategoryContainer />
                  </Container>
              </Wrapper>
              <MovieDetailContainer />
              <Footer />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        view: state.viewSelector.get('view')
    })
)(App);
