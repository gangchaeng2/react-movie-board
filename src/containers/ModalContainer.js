import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as modalMovieActions from '../modules/modalMovie';

import MovieDetail from '../components/molecules/MovieDetail/MovieDetail';
import * as utils from '../lib/utils';

class ModalContainer extends Component {
    // 모달 열기
    handleOpen = async (title, code) => {
        const { modalMovieActions } = this.props;
        await modalMovieActions.searchMovieTmp(title).then(function(res){
            modalMovieActions.getSimilarMovieList(code);
        });
    }

    // 모달 닫기
    handleHide = () => {
        const { modalMovieActions } = this.props;
        modalMovieActions.hide();
    }

    render() {
        const { modal } = this.props;
        const { open, item, similarMovieList } = modal.toJS();

        return (
            <div>
                <MovieDetail
                    open={open}
                    movieInfo={item}
                    similarMovies={similarMovieList}
                    handleHide={this.handleHide}
                    handleOpen={this.handleOpen}
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        modal: state.modalMovie
    }),
    (dispatch) => ({
        modalMovieActions: bindActionCreators(modalMovieActions, dispatch)
    })
)(ModalContainer);
