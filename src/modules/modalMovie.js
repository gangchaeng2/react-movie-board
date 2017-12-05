import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';
import { Map } from 'immutable';

function searchMovieListByQuery(query) {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://watcha.net/search/movie.json?query=${query}&per=1`);
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
    similarMovieList: [],
    loadingStatus: false
});

export default handleActions({
    [SHOW]: (state, action) => {
        const { item } = action.payload;
        return state.set('open', false)
                    .set('item', item)
                    .set('loadingStatus', true);
    },
    [HIDE]: (state, action) => state.set('open', false),
    ...pender({
        type: GET_MOVIE_TMP,
        onPending: (state, action) => {
            return state.set('open', false)
                        .set('item', state.toJS().item)
                        .set('loadingStatus', true);
        },
        onSuccess: (state, action) => {
            const item = action.payload.data.cards[0].items[0].item;
            return state.set('open', false)
                        .set('item', item)
                        .set('loadingStatus', true);
        }
    }),
    ...pender({
        type: GET_SIMILAR_MOVIE,
        onSuccess: (state, action) => {
            const similarMovieList = action.payload.data.data;
            return state.set('open', true)
                        .set('item', state.toJS().item)
                        .set('loadingStatus', false)
                        .set('similarMovieList', similarMovieList);
        }
    })
}, initialState);
