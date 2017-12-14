import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import BoxOfficeList from '../components/molecules/BoxOfficeList/BoxOfficeList';

import * as movieDetailActions from '../modules/movieDetail';
import * as boxOfficeMovieActions from '../modules/boxOffice';

class BoxOfficeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingState: false
        };
    }

    getBoxOfficeList = (cnt, nowPage) => {
        const { boxOfficeMovieActions } = this.props;
        const showCnt = cnt;
        const goPage = nowPage;
        boxOfficeMovieActions.getBoxOffice({showCnt, goPage});
    }

    // Open Modal
    handleOpen = async (title, code) => {
        const { movieDetailActions } = this.props;

        await movieDetailActions.searchMovieTmp(title)
        .then(function(res) {
            movieDetailActions.getSimilarMovieList(code);
        });
    }

    doPaging = () => {
        const { boxOfficeMovieActions, page } = this.props;
        let showCnt = 0;
        const goPage = page + 1;
        
        if(page < 8) {
            showCnt = goPage * 10;
        } else {
            return;
        }

        boxOfficeMovieActions.getBoxOffice({showCnt, goPage});
    }

    componentWillMount() {
        this.getBoxOfficeList(10, 1);
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
        page: state.boxOffice.page,
        modal: state.movieDetail
    }),
    (dispatch) => ({
        movieDetailActions: bindActionCreators(movieDetailActions, dispatch),
        boxOfficeMovieActions: bindActionCreators(boxOfficeMovieActions, dispatch)
    })
)(BoxOfficeContainer);
