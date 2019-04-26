import axios from 'axios';

export function fetchAllFilms() {
    return axios.get(`/api/films`);
}

export function updateFilms(input) {
    return axios.get(`/api/films?search=${input}`);
}

export function fetchSingleFilm(id) {
    return axios.get(`/api/films/${id}`);
}