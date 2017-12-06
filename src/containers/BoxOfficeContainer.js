import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BoxOfficeList from '../components/molecules/BoxOfficeList/BoxOfficeList';

import * as modalMovieActions from '../modules/modalMovie';
import * as boxOfficeMovieActions from '../modules/boxOffice';

class BoxOfficeContainer extends Component {
    getBoxOfficeList = () => {
        const { boxOfficeMovieActions } = this.props;
        boxOfficeMovieActions.getBoxOffice();
    }

    // Open Modal
    handleOpen = async (title, code) => {
        const { modalMovieActions } = this.props;

        await modalMovieActions.searchMovieTmp(title)
        .then(function(res) {
            modalMovieActions.getSimilarMovieList(code);
        });
    }

    render() {
        const { boxOfficeList, modal } = this.props;
        const { loadingStatus } = modal.toJS();
        const { handleOpen } = this;

        return (
            <BoxOfficeList
                boxOfficeList={boxOfficeList}
                handleOpen={handleOpen}
                loadingStatus={loadingStatus}
            />
        );
    }
}

export default connect(
    (state) => ({
        boxOfficeList: state.boxOffice.boxOfficeList,
        modal: state.modalMovie
    }),
    (dispatch) => ({
        modalMovieActions: bindActionCreators(modalMovieActions, dispatch),
        boxOfficeMovieActions: bindActionCreators(boxOfficeMovieActions, dispatch)
    })
)(BoxOfficeContainer);
