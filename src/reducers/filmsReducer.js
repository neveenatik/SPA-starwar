import {
    START_FETCH_ALL_FILMS,
    ALL_FILMS_FETCHED,
    FETCH_ALL_FILMS_FAILED
} from '../actions/constants';

const initialState = {
    data: [],
    count: 0,
    next: null,
    previous: null,
    status: {
        loading: false,
        error: null
    }
}
const filmsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case START_FETCH_ALL_FILMS:
            return {
                ...state,
                status: {
                    loading: true,
                    error: null
                }
            }
            case ALL_FILMS_FETCHED:
            return {
                data: payload.results,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
                status: {
                    loading: false,
                    error: null
                }
            } 
            case FETCH_ALL_FILMS_FAILED:
            return {
                ...state,
                status: {
                    loading: false,
                    error: payload
                }
            }     
        default:
            return state;
    }
}

export default filmsReducer;