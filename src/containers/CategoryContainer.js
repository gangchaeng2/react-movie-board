import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import * as movieDetailActions from '../modules/movieDetail';
import * as categoryMovieActions from '../modules/categoryMovie';

import CategoryMoiveList from '../components/molecules/CategoryMovieList/CategoryMovieList';

class CategoryContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingState: false
        };
    }
    // 모달 열기
    handleOpen = async (title, code) => {
        const { movieDetailActions } = this.props;

        await movieDetailActions.searchMovieTmp(title).then(function(res){
            movieDetailActions.getSimilarMovieList(code);
        });
    }

    getCateMovieList = (category, page) => {
        if(category === undefined || category === '') {
           category = 'popularKoreaMoive';
        }
        page = 1;
        const { categoryMovieActions } = this.props;
        categoryMovieActions.getCategoryMovie({category, page});
    }

    doPaging = () => {
        let { menu, page, categoryMovieActions } = this.props;
        let category = menu;

        if(page < 6) {
            page = page + 1;
        } else {
            return;
        }

        categoryMovieActions.getCategoryMovie({category, page});
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
        const { cateMovieList, menu, modal } = this.props;
        const { loadingStatus } = modal.toJS();
        const { handleOpen, getCateMovieList } = this;

        return (
            <div>
              <CategoryMoiveList
                  handleOpen={handleOpen}
                  cateMovieList={cateMovieList}
                  getCateMovieList={getCateMovieList}
                  menu={menu}
                  loadingStatus={loadingStatus}
              />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        cateMovieList: state.categoryMovie.cateMovies,
        menu: state.categoryMovie.menu,
        page: state.categoryMovie.page,
        modal: state.movieDetail
    }),
    (dispatch) => ({
        categoryMovieActions: bindActionCreators(categoryMovieActions, dispatch),
        movieDetailActions: bindActionCreators(movieDetailActions, dispatch),
    })
)(CategoryContainer);
