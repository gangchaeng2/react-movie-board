import { createAction, handleActions } from 'redux-actions';

import * as boxOffice from '../lib/movieJson/boxOffice';

const GET_BOX_OFFICE = 'GET_BOX_OFFICE';
const GET_BOX_OFFICE_HOME = 'GET_BOX_OFFICE_HOME';

export const getBoxOffice = createAction(GET_BOX_OFFICE);
export const getBoxOfficeHome = createAction(GET_BOX_OFFICE_HOME);

const initialState = {
    boxOfficeList: [],
    boxOfficeListHome: [],
    page: 1
}

export default handleActions({
    [GET_BOX_OFFICE]: (state, action) => {
        const { showCnt, goPage } = action.payload;

        let movieList = boxOffice.getHomeBoxOfficeList();
        movieList = movieList[0].cards.slice(0, showCnt);

        return {
            boxOfficeList: movieList,
            boxOfficeListHome: state.boxOfficeListHome,
            page: goPage
        }
    },
    [GET_BOX_OFFICE_HOME]: (state, action) => {
        let movieListHome = boxOffice.getHomeBoxOfficeList();
        movieListHome = movieListHome[0].cards.slice(0, 20);

        return {
            boxOfficeList: state.boxOfficeList,
            boxOfficeListHome: movieListHome
        }
    }
}, initialState);
