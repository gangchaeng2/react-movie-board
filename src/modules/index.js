import { combineReducers } from 'redux';
import searchMovie from './searchMovie';
import modalMovie from './modalMovie';
import viewSelector from './viewSelector';
import boxOffice from './boxOffice';
import categoryMovie from './categoryMovie';

import { penderReducer } from 'redux-pender';

export default combineReducers({
    searchMovie,
    modalMovie,
    viewSelector,
    boxOffice,
    categoryMovie,
    pender: penderReducer
});
