import { createAction, handleActions } from 'redux-actions';

import * as boxOffice from '../lib/movieJson/boxOffice';

const GET_BOX_OFFICE = 'GET_BOX_OFFICE';

export const getBoxOffice = createAction(GET_BOX_OFFICE);

const initialState = {
    boxOfficeList: [],
    boxOfficeListHome: []
}

export default handleActions({
    [GET_BOX_OFFICE]: (state, action) => {
        const movieList = boxOffice.getBoxOiffceList();
        const movieListHome = boxOffice.getHomeBoxOfficeList();

        return {
            boxOfficeList: movieList[0].cards,
            boxOfficeListHome: movieListHome[0].cards
        }
    }
}, initialState);
