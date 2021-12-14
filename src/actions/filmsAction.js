import {
    START_FETCH_ALL_FILMS,
    ALL_FILMS_FETCHED,
    FETCH_ALL_FILMS_FAILED,
    FETCH_FILM,
    SET_PAGE,
} from "./constants";

import { fetchAllFilms, updateFilms, fetchSingleFilm } from "../utils/endpoint";

export const filmsFetching = (page) => {
    return async (dispatch) => {
        dispatch({ type: START_FETCH_ALL_FILMS });
        try {
            const films = page
                ? await fetchAllFilms(page)
                : await fetchAllFilms();
            dispatch({ type: ALL_FILMS_FETCHED, payload: films.data });
            if (page) {
                dispatch({ type: SET_PAGE, payload: page });
            }
        } catch (error) {
            dispatch({ type: FETCH_ALL_FILMS_FAILED, payload: error });
        }
    };
};

export const searchFilm = (input) => {
    return async (dispatch) => {
        dispatch({ type: START_FETCH_ALL_FILMS });
        try {
            const searchResults = await updateFilms(input);
            dispatch({
                type: ALL_FILMS_FETCHED,
                payload: searchResults.data,
            });
            dispatch({ type: SET_PAGE, payload: 1 });
        } catch (error) {
            dispatch({ type: FETCH_ALL_FILMS_FAILED, payload: error });
        }
    };
};

export const fetchFilm = (id) => {
    return async (dispatch) => {
        dispatch({ type: START_FETCH_ALL_FILMS });
        try {
            const film = await fetchSingleFilm(id);
            dispatch({ type: FETCH_FILM, payload: film.data });
        } catch (error) {
            dispatch({ type: FETCH_ALL_FILMS_FAILED, payload: error });
        }
    };
};
