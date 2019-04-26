import React, { Component } from 'react';
import './Card.scss';
import {Link} from 'react-router-dom'

export default class Card extends Component {
  render() {
      const { film } = this.props;
      const filmId = film.url.match(/\d+/);
      console.log(film)
    return (
      <div className="card">
        <h2 className="film-title">{film.title}</h2>
        <p>Director: {film.director}</p>
        <p>Producer: {film.producer}</p>
        <p>Release Date: {film.release_date}</p>
      <Link to={`/film/${filmId}`}>More info.. </Link>
      </div>
    )
  }
}
