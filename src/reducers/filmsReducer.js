import {
    START_FETCH_ALL_FILMS,
    ALL_FILMS_FETCHED,
    FETCH_ALL_FILMS_FAILED,
    FETCH_FILM,
} from "../actions/constants";

const initialState = {
    data: [],
    count: 0,
    totalPages: 1,
    status: {
        loading: false,
        error: null,
    },
    selectedFilm: {},
};
const filmsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case START_FETCH_ALL_FILMS:
            return {
                ...state,
                status: {
                    loading: true,
                    error: null,
                },
            };
        case ALL_FILMS_FETCHED:
            return {
                ...state,
                data: payload.result,
                count: !state.count ? payload.result.length : state.count,
                totalPages: Math.ceil(payload.result.length / 10),
                status: {
                    loading: false,
                    error: null,
                },
            };
        case FETCH_ALL_FILMS_FAILED:
            return {
                ...state,
                status: {
                    loading: false,
                    error: payload,
                },
            };
        case FETCH_FILM:
            return {
                ...state,
                selectedFilm: payload,
                status: {
                    loading: false,
                    error: null,
                },
            };
        default:
            return state;
    }
};

export default filmsReducer;
