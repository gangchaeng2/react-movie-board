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
        case 'millionMoive':
            cateMovies = cateMovieUtils.getMillionMovieList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        case 'noirMoive':
            cateMovies = cateMovieUtils.getNoirMoiveList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        case 'superHeroMovie':
            cateMovies = cateMovieUtils.getSuperHeroMovieList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        case 'comedyMoive':
            cateMovies = cateMovieUtils.getComedyMovieList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        case 'sportsMoive':
            cateMovies = cateMovieUtils.getSportsMovieList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        case 'thrillerMovie':
            cateMovies = cateMovieUtils.getThrillerMovieList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        case 'criminalMoive':
            cateMovies = cateMovieUtils.getCriminalMovieList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        case 'animationMoive':
            cateMovies = cateMovieUtils.getAnimationMoiveList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        case 'romanticMoive':
            cateMovies = cateMovieUtils.getRomanticMovieList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        case 'actionMoive':
            cateMovies = cateMovieUtils.getActionMovieList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        case 'warMovie':
            cateMovies = cateMovieUtils.getWarMovieList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        case 'fantasyMovie':
            cateMovies = cateMovieUtils.getFantasyMovieList();
            cateMovies = cateMovies[0].cards;
            // menu = category;
            break;
        case 'popularKoreaMoiveMore':
            cateMovies = cateMovieUtils.getTestMore();
            cateMovies = cateMovies[0].cards;
        default:
            break;
      }

      return {
          cateMovies: cateMovies,
          menu: menu
      }
  }
}, initialState);
