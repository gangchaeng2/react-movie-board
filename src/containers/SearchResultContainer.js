import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as modalMovieActions from '../modules/modalMovie';
import * as searchMovieActions from '../modules/searchMovie';

import SearchResult from '../components/molecules/SearchResult/SearchResult';

class SearchResultContainer extends Component {
    doPaging = async (action) => {
        const { query, page, searchMovieActions } = this.props;
        const goPage = action === 'next' ? page + 1 : page -1;
        searchMovieActions.setPage(goPage);
        await searchMovieActions.searchMovie(query, goPage);
    }

    // 모달 열기
    handleOpen = async (title, code) => {
        const { items, modalMovieActions } = this.props;
        modalMovieActions.getSimilarMovieList(code);
        // 검색결과 중 코드값이 일치하는 것을 찾는다.
        const movieDetail = items.filter(function(movies){
            return movies.item.code === code;
        });
        const movieInfo = movieDetail[0].item;

        // modal 세팅
        modalMovieActions.show({
            item: movieInfo
        });
    }

    render() {
        const { items, query, loadingStatus, page, totalCnt, modal } = this.props;
        const infoLoadingStatus = modal.toJS().loadingStatus;
        const { handleOpen, doPaging } = this;

        return (
            <SearchResult
                movieList={items}
                handleOpen={handleOpen}
                query={query}
                loadingStatus={loadingStatus}
                doPaging={doPaging}
                page={page}
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
        modal: state.modalMovie
    }),
    (dispatch) => ({
        modalMovieActions: bindActionCreators(modalMovieActions, dispatch),
        searchMovieActions: bindActionCreators(searchMovieActions, dispatch)
    })
)(SearchResultContainer);
