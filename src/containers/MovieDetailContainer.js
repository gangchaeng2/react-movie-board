import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as movieDetailActions from '../modules/movieDetail';

import MovieDetail from '../components/molecules/MovieDetail/MovieDetail';

class MovieDetailContainer extends Component {
    // 모달 열기
    handleOpen = async (title, code) => {
        const { movieDetailActions } = this.props;
        await movieDetailActions.searchMovieTmp(title).then(function(res){
            movieDetailActions.getSimilarMovieList(code);
        });
    }

    // 모달 닫기
    handleHide = () => {
        const { movieDetailActions } = this.props;
        movieDetailActions.hide();
    }

    render() {
        const { modal } = this.props;
        const { handleOpen, handleHide } = this;
        const { open, item, similarMovieList, loadingStatus } = modal.toJS();

        return (
            <div>
                <MovieDetail
                    open={open}
                    movieInfo={item}
                    similarMovies={similarMovieList}
                    handleHide={handleHide}
                    handleOpen={handleOpen}
                    loadingStatus={loadingStatus}
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        modal: state.movieDetail
    }),
    (dispatch) => ({
        movieDetailActions: bindActionCreators(movieDetailActions, dispatch)
    })
)(MovieDetailContainer);
