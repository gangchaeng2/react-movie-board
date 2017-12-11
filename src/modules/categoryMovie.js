import { createAction, handleActions } from 'redux-actions';

import * as cateMovieUtils from '../lib/movieJson/CateMovieList';
import * as cateMovieUtils2 from '../lib/movieJson/CateMovieList2';
import * as cateMovieUtils3 from '../lib/movieJson/CateMovieList3';
import * as cateMovieUtils4 from '../lib/movieJson/CateMovieList4';

const GET_CATEGORY_MOVIE = 'GET_CATEGORY_MOVIE';

export const getCategoryMovie = createAction(GET_CATEGORY_MOVIE);

const initialState = {
    cateMovies: [],
    menu: '',
    page: 1
};

export default handleActions({
  [GET_CATEGORY_MOVIE]: (state, action) => {
      const { category, page } = action.payload;
      let cateMovies = [];
      let menu = category;

      switch(category) {
        case 'popularKoreaMoive':
            cateMovies = cateMovieUtils2.getPopularKoreaMoiveList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        case 'popularWordMoive':
            cateMovies = cateMovieUtils2.getPopularWorldMovieList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        case 'expertRecommendMovie':
            cateMovies = cateMovieUtils2.getExpertRecommendMovieList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        case 'highRatingMovie':
            cateMovies = cateMovieUtils4.getHigherRatingMovieList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        case 'millionMoive':
            cateMovies = cateMovieUtils4.getMillionMovieList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        case 'noirMoive':
            cateMovies = cateMovieUtils4.getNoirMoiveList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        case 'superHeroMovie':
            cateMovies = cateMovieUtils3.getSuperHeroMovieList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        case 'comedyMoive':
            cateMovies = cateMovieUtils3.getComedyMovieList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        case 'sportsMoive':
            cateMovies = cateMovieUtils3.getSportsMovieList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        case 'thrillerMovie':
            cateMovies = cateMovieUtils3.getThrillerMovieList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        case 'criminalMoive':
            cateMovies = cateMovieUtils3.getCriminalMovieList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        case 'animationMoive':
            cateMovies = cateMovieUtils.getAnimationMoiveList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        case 'romanticMoive':
            cateMovies = cateMovieUtils.getRomanticMovieList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        case 'actionMoive':
            cateMovies = cateMovieUtils.getActionMovieList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        case 'warMovie':
            cateMovies = cateMovieUtils.getWarMovieList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        case 'fantasyMovie':
            cateMovies = cateMovieUtils.getFantasyMovieList();
            cateMovies = cateMovies[0].cards.slice(0, page * 10);
            // menu = category;
            break;
        default:
            break;
      }

      return {
          cateMovies: cateMovies,
          menu: menu,
          page: page
      }
  }
}, initialState);
