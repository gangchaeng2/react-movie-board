import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as modalMovieActions from '../modules/modalMovie';
import * as categoryMovieActions from '../modules/categoryMovie';

import CategoryMoiveList from '../components/molecules/CategoryMovieList/CategoryMovieList';

class CategoryContainer extends Component {
    // 모달 열기
    handleOpen = async (title, code) => {
        const { modalMovieActions } = this.props;

        await modalMovieActions.searchMovieTmp(title).then(function(res){
            modalMovieActions.getSimilarMovieList(code);
        });
    }

    getCateMovieList = (category) => {
        if(category === undefined || category === '') {
           category = 'popularKoreaMoive';
        }
        const { categoryMovieActions } = this.props;
        categoryMovieActions.getCategoryMovie(category);
    }

    componentDidMount() {
        const { menu } = this.props;
        this.getCateMovieList(menu);
    }

    render() {
        const { cateMovieList, menu } = this.props;
        const { handleOpen, getCateMovieList } = this;

        return (
            <div>
              <CategoryMoiveList
                  handleOpen={handleOpen}
                  cateMovieList={cateMovieList}
                  getCateMovieList={getCateMovieList}
                  menu={menu}
              />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        cateMovieList: state.categoryMovie.cateMovies,
        menu: state.categoryMovie.menu
    }),
    (dispatch) => ({
        categoryMovieActions: bindActionCreators(categoryMovieActions, dispatch),
        modalMovieActions: bindActionCreators(modalMovieActions, dispatch),
    })
)(CategoryContainer);
