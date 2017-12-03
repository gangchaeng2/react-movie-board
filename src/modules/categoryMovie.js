import { createAction, handleActions } from 'redux-actions';

import * as cateMovieUtils from '../lib/movieJson/CateMovieList'

const GET_CATEGORY_MOVIE = 'GET_CATEGORY_MOVIE';

export const getCategoryMovie = createAction(GET_CATEGORY_MOVIE)

const initialState = {
    cateMovies: [],
    menu: ''
}

export default handleActions({
  [GET_CATEGORY_MOVIE]: (state, action) => {
      const category = action.payload;
      let cateMovies = [];
      let menu = category;

      switch(category) {
        case 'popularKoreaMoive':
            cateMovies = cateMovieUtils.getPopularKoreaMoiveList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        case 'popularWordMoive':
            cateMovies = cateMovieUtils.getPopularWorldMovieList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        case 'expertRecommendMovie':
            cateMovies = cateMovieUtils.getExpertRecommendMovieList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        case 'highRatingMovie':
            cateMovies = cateMovieUtils.getHigherRatingMovieList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        default:
            break;
      }

      return {
          cateMovies: cateMovies,
          menu: menu
      }
  }
}, initialState);
