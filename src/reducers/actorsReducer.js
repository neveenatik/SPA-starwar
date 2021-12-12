import {
    START_FETCH_ACTORS,
    ACTORS_FETCHED,
    FETCH_ACTORS_FAILED,
    SET_ACTIVE_TAB,
    SET_PAGE,
} from "../actions/constants";

const initialState = {
    data: [],
    count: 0,
    totalPages: 1,
    status: {
        loading: false,
        error: null,
    },
    activeTab: "Movies",
    activePage: 1,
};
const actorsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case START_FETCH_ACTORS:
            return {
                ...state,
                status: {
                    loading: true,
                    error: null,
                },
            };
        case ACTORS_FETCHED:
            console.log("**", payload.count, payload);
            return {
                ...state,
                data: payload.results,
                count: payload.total_records,
                totalPages: payload.total_pages,
                status: {
                    loading: false,
                    error: null,
                },
            };
        case FETCH_ACTORS_FAILED:
            return {
                ...state,
                status: {
                    loading: false,
                    error: payload,
                },
            };
        case SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: payload,
            };
        case SET_PAGE:
            return {
                ...state,
                activePage: payload,
            };
        default:
            return state;
    }
};

export default actorsReducer;
