import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';
import { Map } from 'immutable';

function searchMovieListByQuery(query) {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://watcha.net/search/movie.json?query=${query}&per=12`);
}

function getSimilarMovieByCode(code) {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://watcha.net/movie/similar/${code}?count=4`)
}

const SHOW = 'SHOW';
const HIDE = 'HIDE';
const GET_MOVIE_TMP = 'modalMovie/GET_MOVIE_TMP';
const GET_SIMILAR_MOVIE = 'modalMovie/GET_SIMILAR_MOVIE';

export const show = createAction(SHOW);
export const hide = createAction(HIDE);
export const searchMovieTmp = createAction(GET_MOVIE_TMP, searchMovieListByQuery);
export const getSimilarMovieList = createAction(GET_SIMILAR_MOVIE, getSimilarMovieByCode);

const initialState = Map({
    open: false,
    item: {},
    similarMovieList: []
});

export default handleActions({
    [SHOW]: (state, action) => {
        const { item } = action.payload;
        return state.set('open', true)
                    .set('item', item);
    },
    [HIDE]: (state, action) => state.set('open', false),
    ...pender({
        type: GET_MOVIE_TMP,
        onSuccess: (state, action) => {
            const item = action.payload.data.cards[0].items[0].item;
            return state.set('open', true)
                        .set('item', item);

        }
    }),
    ...pender({
        type: GET_SIMILAR_MOVIE,
        onSuccess: (state, action) => {
            const similarMovieList = action.payload.data.data;
            return state.set('open', true)
                        .set('item', state.toJS().item)
                        .set('similarMovieList', similarMovieList);

        }
    })
}, initialState);
