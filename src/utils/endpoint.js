import axios from "axios";

export function fetchAllFilms(page) {
    if (page) {
        return axios.get(`/films/?page=${page}&limit=10`);
    }
    return axios.get(`/films`);
}

export function updateFilms(input) {
    return axios.get(`/films?search=${input}`);
}

export function fetchSingleFilm(id) {
    return axios.get(`/films/${id}`);
}

export function fetchActors(page) {
    if (page) {
        return axios.get(`/people/?page=${page}&limit=10`);
    }
    return axios.get(`/people`);
}

export function fetchSingleActor(id) {
    return axios.get(`/people/${id}`);
}

export function updateActors(input) {
    return axios.get(`/people?search=${input}`);
}
