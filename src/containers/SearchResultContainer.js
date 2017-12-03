import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as modalMovieActions from '../modules/modalMovie';

import SearchResult from '../components/molecules/SearchResult/SearchResult';

class SearchResultContainer extends Component {
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
        const { items } = this.props;
        const { handleOpen } = this;

        return (
            <SearchResult
                movieList={items}
                handleOpen={handleOpen}
            />
        );
    }
}

export default connect(
    (state) => ({
        items: state.searchMovie.items
    }),
    (dispatch) => ({
        modalMovieActions: bindActionCreators(modalMovieActions, dispatch)
    })
)(SearchResultContainer);
