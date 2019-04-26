import axios from 'axios';

export function fetchAllFilms() {
    return axios.get('/films');
}