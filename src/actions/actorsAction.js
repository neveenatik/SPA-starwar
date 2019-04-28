import {
    START_FETCH_ACTORS,
    ACTORS_FETCHED,
    FETCH_ACTORS_FAILED,
    SET_ACTIVE_TAB,
    SET_PAGE
} from '../actions/constants';

import {fetchActors, updateActors, fetchSingleFilm} from '../utils/endpoint'

export function actorsFetching(page) {
    return async (dispatch) => {
        dispatch({type: START_FETCH_ACTORS});
        try {
            const actors = page ? await fetchActors(page) : await fetchActors();
            if(page) {
                dispatch({type: SET_PAGE, payload: page})
            }
            const mappedData = await Promise.all(actors.data.results.map(async(actor) => {
                const films = await Promise.all(actor.films.map(async(url) => {
                    const film = await fetchSingleFilm(url.match(/\d+/)[0]);
                    return film.data;
                }));
                return {
                    ...actor,
                    films: films
                }
            }));
            dispatch({type: ACTORS_FETCHED, payload: {...actors.data, results: mappedData}});
            console.log(page);
        } catch (error) {
            dispatch({type: FETCH_ACTORS_FAILED, payload: error});
        }
    }
}

export function setActiveTab(name) {
    return (dispatch) => {
        dispatch({type: SET_ACTIVE_TAB, payload: name});
    }
}

export function searchActor(input) {
    return async(dispatch) => {
        dispatch({type: START_FETCH_ACTORS});
        try {
            const actors = await updateActors(input);
            const mappedData = actors.data.results.map(actor => {
                const films = [];
                actor.films.forEach(async(url) => {
                    const film = await fetchSingleFilm(url.match(/\d+/)[0]);
                    films.push(film);
                });
                return {
                    ...actor,
                    films: films
                }
            })
            dispatch({type: ACTORS_FETCHED, payload: {...actors.data, results: mappedData}});
            dispatch({type: SET_PAGE, payload: 1})
        } catch (error) {
            dispatch({type: FETCH_ACTORS_FAILED, payload: error});
        }
    }
}
