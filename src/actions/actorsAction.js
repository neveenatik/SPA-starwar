import {
    START_FETCH_ACTORS,
    ACTORS_FETCHED,
    FETCH_ACTORS_FAILED,
    SET_ACTIVE_TAB,
    SET_PAGE,
} from "../actions/constants";

import { fetchActors, updateActors, fetchSingleActor } from "../utils/endpoint";

export function actorsFetching(page) {
    return async (dispatch) => {
        dispatch({ type: START_FETCH_ACTORS });
        try {
            const actors = page ? await fetchActors(page) : await fetchActors();
            if (page) {
                dispatch({ type: SET_PAGE, payload: page });
            }
            const mappedResults = await Promise.all(
                actors.data.results.map(async (actor) => {
                    const actorDetails = await fetchSingleActor(actor.uid);

                    return {
                        ...actor,
                        ...actorDetails.data.result,
                    };
                })
            );
            dispatch({
                type: ACTORS_FETCHED,
                payload: { ...actors.data, results: mappedResults },
            });
        } catch (error) {
            dispatch({ type: FETCH_ACTORS_FAILED, payload: error });
        }
    };
}

export function setActiveTab(name) {
    return (dispatch) => {
        dispatch({ type: SET_ACTIVE_TAB, payload: name });
    };
}

export function searchActor(input) {
    return async (dispatch) => {
        dispatch({ type: START_FETCH_ACTORS });
        try {
            const actors = await updateActors(input);
            const mappedResults = await Promise.all(
                actors.data.result.map(async (actor, index) => {
                    const actorDetails = await fetchSingleActor(actor.uid);
                    return {
                        ...actor,
                        ...actorDetails.data.result,
                        name: actor.properties.name,
                        url: actor.properties.url,
                    };
                })
            );
            dispatch({
                type: ACTORS_FETCHED,
                payload: { results: mappedResults },
            });
            dispatch({ type: SET_PAGE, payload: 1 });
        } catch (error) {
            dispatch({ type: FETCH_ACTORS_FAILED, payload: error });
        }
    };
}
