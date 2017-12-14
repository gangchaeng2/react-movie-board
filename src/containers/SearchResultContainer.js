import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import * as movieDetailActions from '../modules/movieDetail';
import * as searchMovieActions from '../modules/searchMovie';

import SearchResult from '../components/molecules/SearchResult/SearchResult';

class SearchResultContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingState: false
        };
    }

    doPaging = async () => {
        const { query, page, searchMovieActions, loadMore } = this.props;

        if(loadMore) {
            const goPage = page + 1;
            searchMovieActions.setPage(goPage);
            await searchMovieActions.searchMovie(query, goPage);
        }
    }

    // 모달 열기
    handleOpen = async (title, code) => {
        const { items, movieDetailActions } = this.props;
        movieDetailActions.getSimilarMovieList(code);
        // 검색결과 중 코드값이 일치하는 것을 찾는다.
        const movieDetail = items.filter(function(movies){
            return movies.item.code === code;
        });
        const movieInfo = movieDetail[0].item;

        // modal 세팅
        movieDetailActions.show({
            item: movieInfo
        });
    }

    componentDidMount() {
        $(window).unbind();
        $(window).scroll(() => {
            // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
            if($(document).height() - $(window).height() - $(window).scrollTop() < 20) {
                $( '.footer-main' ).fadeIn();
                if(!this.state.loadingState) {
                    this.doPaging();
                    this.setState({
                        loadingState: true
                    });
                }
            } else {
                if(this.state.loadingState){
                    this.setState({
                        loadingState: false
                    });
                }
            }
            if($(window).scrollTop() === 0) {
                $( '.footer-main' ).fadeOut();
            }
        });
    }

    componentWillUnMount() {
        // REMOVE WINDOWS SCROLL LISTENER
        $(window).unbind();
    }

    render() {
        const { items, query, loadingStatus, totalCnt, modal } = this.props;
        const infoLoadingStatus = modal.toJS().loadingStatus;
        const { handleOpen } = this;

        return (
            <SearchResult
                movieList={items}
                handleOpen={handleOpen}
                query={query}
                loadingStatus={loadingStatus}
                totalCnt={totalCnt}
                infoLoadingStatus={infoLoadingStatus}
            />
        );
    }
}

export default connect(
    (state) => ({
        items: state.searchMovie.items,
        query: state.searchMovie.query,
        page: state.searchMovie.page,
        loadingStatus: state.searchMovie.loadingStatus,
        totalCnt: state.searchMovie.totalCnt,
        loadMore: state.searchMovie.loadMore,
        modal: state.movieDetail
    }),
    (dispatch) => ({
        movieDetailActions: bindActionCreators(movieDetailActions, dispatch),
        searchMovieActions: bindActionCreators(searchMovieActions, dispatch)
    })
)(SearchResultContainer);
