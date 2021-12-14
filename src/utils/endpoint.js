import axios from "axios";

export function fetchAllFilms(page) {
    if (page) {
        return axios.get(
            `https://www.swapi.tech/api/films/?page=${page}&limit=10`
        );
    }
    return axios.get(`https://www.swapi.tech/api/films`);
}

export function updateFilms(input) {
    return axios.get(`https://www.swapi.tech/api/films?search=${input}`);
}

export function fetchSingleFilm(id) {
    return axios.get(`https://www.swapi.tech/api/films/${id}`);
}

export function fetchActors(page) {
    if (page) {
        return axios.get(
            `https://www.swapi.tech/api/people/?page=${page}&limit=10`
        );
    }
    return axios.get(`https://www.swapi.tech/api/people`);
}

export function fetchSingleActor(id) {
    return axios.get(`https://www.swapi.tech/api/people/${id}`);
}

export function updateActors(input) {
    return axios.get(`https://www.swapi.tech/api/people/?name=${input}`);
}
