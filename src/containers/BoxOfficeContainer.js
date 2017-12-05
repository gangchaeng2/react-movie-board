import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import BoxOfficeList from '../components/molecules/BoxOfficeList/BoxOfficeList';

import * as modalMovieActions from '../modules/modalMovie';
import * as boxOfficeMovieActions from '../modules/boxOffice';

class BoxOfficeContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            loadingState: false
        };
    }

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

    componentDidMount() {
        this.getBoxOfficeList();

        $(window).scroll(() => {
            // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
            if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
                if(!this.state.loadingState){
                    console.log("LOAD NOW");
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
        });
    }

    componentWillUnMount() {
        // STOPS THE loadMemoLoop
        clearTimeout(this.memoLoaderTimeoutId);

        // REMOVE WINDOWS SCROLL LISTENER
        $(window).unbind();
    }


    render() {
        const { handleOpen } = this;
        const { boxOfficeList } = this.props;

        return (
            <BoxOfficeList
                boxOfficeList={boxOfficeList}
                handleOpen={handleOpen}
            />
        );
    }
}

export default connect(
    (state) => ({
        boxOfficeList: state.boxOffice.boxOfficeList
    }),
    (dispatch) => ({
        modalMovieActions: bindActionCreators(modalMovieActions, dispatch),
        boxOfficeMovieActions: bindActionCreators(boxOfficeMovieActions, dispatch)
    })
)(BoxOfficeContainer);
