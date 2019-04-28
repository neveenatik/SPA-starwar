import { createStore, combineReducers, applyMiddleware } from 'redux';
import filmsReducer from '../reducers/filmsReducer';
import actorsReducer from '../reducers/actorsReducer';
import thunk from 'redux-thunk';

const store= createStore(
    combineReducers(
        {
            films: filmsReducer,
            actors: actorsReducer
        }), applyMiddleware(thunk));

export default store;
