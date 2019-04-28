import axios from 'axios';

export function fetchAllFilms(page) {
    if(page) {
        return axios.get(`/api/films/?page=${page}`);
    }
    return axios.get(`/api/films`);
}

export function updateFilms(input) {
    return axios.get(`/api/films?search=${input}`);
}

export function fetchSingleFilm(id) {
    return axios.get(`/api/films/${id}`);
}

export function fetchActors(page) {
    if(page) {
        axios.get(`/api/people/?page=${page}`);
    }
    return axios.get(`/api/people`);
}

export function updateActors(input) {
    return axios.get(`/api/people?search=${input}`);
}