import React, { Component } from 'react'

export default class Card extends Component {
  render() {
      const { film } = this.props;
    return (
      <div className="card">
        <h2 className="film-title">{film.title}</h2>
        <p>Director: {film.director}</p>
        <p>Producer: {film.producer}</p>
        <p>Release Date: {film.release_date}</p>
      </div>
    )
  }
}
