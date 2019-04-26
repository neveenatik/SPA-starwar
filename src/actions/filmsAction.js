import {
    START_FETCH_ALL_FILMS,
    ALL_FILMS_FETCHED,
    FETCH_ALL_FILMS_FAILED,
    UPDATE_FILMS,
    FETCH_FILM
} from './constants';

import {fetchAllFilms, updateFilms, fetchSingleFilm} from '../utils/endpoint';

export const filmsFetching = () => {
    return async (dispatch) => {
        dispatch({type: START_FETCH_ALL_FILMS});
        try {
            const films = await fetchAllFilms();
            dispatch({type: ALL_FILMS_FETCHED, payload: films.data });
        } catch (error) {
            dispatch({type: FETCH_ALL_FILMS_FAILED, payload: error});
        }
    }
}

export const searchFilm = (input) => {
    return async (dispatch) => {
        dispatch({type: START_FETCH_ALL_FILMS});
        try {
            const searchResults = await updateFilms(input);
            console.log(searchResults);
            dispatch({type: UPDATE_FILMS, payload: searchResults.data})
        } catch (error) {
            dispatch({type: FETCH_ALL_FILMS_FAILED, payload: error});
        }
    }
}

export const fetchFilm = (id) => {
    return async (dispatch) => {
        dispatch({type: START_FETCH_ALL_FILMS});
        try {
            const film = await fetchSingleFilm(id);
            dispatch({type: FETCH_FILM, payload: film.data})
        } catch (error) {
            dispatch({type: FETCH_ALL_FILMS_FAILED, payload: error});
        }
    }
}

