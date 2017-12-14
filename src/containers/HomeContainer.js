import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import * as boxOfficeMovieActions from '../modules/boxOffice';
import * as movieDetailActions from '../modules/movieDetail';
import * as categoryMovieActions from '../modules/categoryMovie';
import * as viewSelectorActions from '../modules/viewSelector';

import Home from '../components/molecules/Home/Home';

class HomeContainer extends Component {
    // Open Modal
    handleOpen = async (title, code) => {
        const { movieDetailActions } = this.props;

        await movieDetailActions.searchMovieTmp(title)
        .then(function(res) {
            movieDetailActions.getSimilarMovieList(code);
        });
    }

    getCateMovieList = (category, page) => {
        if(category === undefined || category === '') {
           category = 'popularKoreaMoive';
        }
        page = 2;
        const { categoryMovieActions } = this.props;
        categoryMovieActions.getCategoryMovie({category, page});
    }

    getBoxOfficeList = () => {
        const { boxOfficeMovieActions } = this.props;
        boxOfficeMovieActions.getBoxOfficeHome();
        // boxOfficeMovieActions.getBoxOffice(10);
    }

    showAllCategory = () => {
        const { viewSelectorActions } = this.props;
        viewSelectorActions.setView('category');
        $(window).scrollTop(0);
    }

    componentDidMount() {
        $(window).unbind();
        $( window ).scroll( function() {
            console.log($( window ).scrollTop());
          if ( $( window ).scrollTop() > 500 ) {
            $( '.footer-main' ).fadeIn();
          } else {
            $( '.footer-main' ).fadeOut();
          }
        } );;
        this.getBoxOfficeList();
        this.getCateMovieList();
    }

    render() {
        const { boxOfficeList, menu, cateMovieList, modal } = this.props;
        const { loadingStatus } = modal.toJS();
        const { getCateMovieList, handleOpen, showAllCategory } = this;

        return(
            <Home
                boxOfficeList={boxOfficeList}
                menu={menu}
                cateMovieList={cateMovieList}
                getCateMovieList={getCateMovieList}
                handleOpen={handleOpen}
                loadingStatus={loadingStatus}
                showAllCategory={showAllCategory}
            />
        );
    }
}

export default connect(
    (state) => ({
        boxOfficeList: state.boxOffice.boxOfficeListHome,
        cateMovieList: state.categoryMovie.cateMovies,
        menu: state.categoryMovie.menu,
        modal: state.movieDetail
    }),
    (dispatch) => ({
        categoryMovieActions: bindActionCreators(categoryMovieActions, dispatch),
        movieDetailActions: bindActionCreators(movieDetailActions, dispatch),
        boxOfficeMovieActions: bindActionCreators(boxOfficeMovieActions, dispatch),
        viewSelectorActions: bindActionCreators(viewSelectorActions, dispatch)
    })
)(HomeContainer);
