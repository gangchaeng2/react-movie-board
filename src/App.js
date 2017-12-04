import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import StickyHeader from 'react-sticky-header';

import Container from './components/templates/Container';

import SearchResultContainer from './containers/SearchResultContainer';
import ModalContainer from './containers/ModalContainer';
import BoxOfficeContainer from './containers/BoxOfficeContainer';
import CategoryContainer from './containers/CategoryContainer';
import HeaderContainer from './containers/HeaderContainer';

import * as modalMovieActions from './modules/modalMovie';

import MovieCarousel from './components/molecules/BoxOfficeList/MovieCarousel';

import 'react-sticky-header/styles.css';

import styled from 'styled-components';

const Wrapper = styled.div`
    width: 90%;
    margin: 0 auto;
    margin-top: 8rem;
}
`;

const CarouselDiv = styled.div`
    margin-top: 7rem;
}
`;

class App extends Component {
    // Open Modal
    handleOpen = async (title, code) => {
        const { modalMovieActions } = this.props;

        await modalMovieActions.searchMovieTmp(title).
        then(function(res) {
            modalMovieActions.getSimilarMovieList(code);
        });
    }

    render() {
        const { view, boxOfficeList, handleOpen } = this.props;

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

              <CarouselDiv>
                <Container visible={view === 'box office'}>
                  <MovieCarousel
                      boxOfficeList={boxOfficeList}
                      handleOpen={this.handleOpen}
                  />
                </Container>
              </CarouselDiv>

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
        view: state.viewSelector.get('view'),
        boxOfficeList: state.boxOffice.boxOfficeList
    }),
    (dispatch) => ({
        modalMovieActions: bindActionCreators(modalMovieActions, dispatch)
    })
)(App);
