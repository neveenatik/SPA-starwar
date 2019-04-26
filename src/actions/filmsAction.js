import {
    START_FETCH_ALL_FILMS,
    ALL_FILMS_FETCHED,
    FETCH_ALL_FILMS_FAILED
} from './constants';

import {fetchAllFilms} from '../utils/endpoint';

export const filmsFetching = () => {
    return async (dispatch) => {
        dispatch({type: START_FETCH_ALL_FILMS});
        try {
            const films = await fetchAllFilms();
            console.log(films.data);
            dispatch({type: ALL_FILMS_FETCHED, payload: films.data });
        } catch (error) {
            dispatch({type: FETCH_ALL_FILMS_FAILED, payload: error});
        }
    }
}

