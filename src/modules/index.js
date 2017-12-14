import { combineReducers } from 'redux';
import searchMovie from './searchMovie';
import movieDetail from './movieDetail';
import viewSelector from './viewSelector';
import boxOffice from './boxOffice';
import categoryMovie from './categoryMovie';

import { penderReducer } from 'redux-pender';

export default combineReducers({
    searchMovie,
    movieDetail,
    viewSelector,
    boxOffice,
    categoryMovie,
    pender: penderReducer
});
