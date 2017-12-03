import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const SET_VIEW = 'SET_VIEW';

export const setView = createAction(SET_VIEW);

const initialState = Map({
    view: 'search'
});

export default handleActions({
    [SET_VIEW]: (state, action) => {
        return state.set('view', action.payload);
    }
}, initialState);
