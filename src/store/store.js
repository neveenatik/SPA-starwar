import { createStore, applyMiddleware } from 'redux';
import filmsReducer from '../reducers/filmsReducer';
import thunk from 'redux-thunk';

const store= createStore(filmsReducer, applyMiddleware(thunk));

export default store;
