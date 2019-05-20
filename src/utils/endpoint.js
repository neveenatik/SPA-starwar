import axios from 'axios';

export function fetchAllFilms(page) {
    if(page) {
        return axios.get(`https://swapi.co/api/films/?page=${page}`);
    }
    return axios.get(`https://swapi.co/api/films`);
}

export function updateFilms(input) {
    return axios.get(`https://swapi.co/api/films?search=${input}`);
}

export function fetchSingleFilm(id) {
    return axios.get(`https://swapi.co/api/films/${id}`);
}

export function fetchActors(page) {
    if(page) {
        return axios.get(`https://swapi.co/api/people/?page=${page}`);
    }
    return axios.get(`https://swapi.co/api/people`);
}

export function updateActors(input) {
    return axios.get(`https://swapi.co/api/people?search=${input}`);
}