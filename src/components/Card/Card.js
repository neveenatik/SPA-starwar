import React, { Component } from 'react';
import './Card.scss';
import {Link} from 'react-router-dom';
import avatar from '../../assets/profile-avatar.png'

export default class Card extends Component {
  render() {
      const { data, isFilm } = this.props;
      const dataId = data.url.match(/\d+/)[0];
    return  isFilm ? 
      (<div className="card">
        <h2 className="card-title">{data.title}</h2>
        <p className='one-line-text'><span className='bold-start'>Director: </span>{data.director}</p>
        <p className='one-line-text'><span className='bold-start'>Producer: </span>{data.producer}</p>
        <p className='one-line-text'><span className='bold-start'>Release Date: </span>{data.release_date}</p>
      <Link to={`/film/${dataId}`}>More info..</Link>
      </div>)
      :
      (<div className="card media">
      <div className='info'>
        <div className='media-container'>
          <img className='avatar' src={avatar} alt='avatar' />
        </div>
        <div className='info-content'>
        <p className='bold-start'>{data.name}</p>
        <p>Born in {data.birth_year}</p>
        <p>Height: {data.height} CM</p>
        <p>{data.gender}</p>
        </div>
      </div>
      <div className='movies-list'>
      <p className='bold-start'>Movies</p>
      {data.films.map(film => {
        const dataId = film.url.match(/\d+/)[0];
        return<Link key={dataId} className='list-item' to={`/film/${dataId}`}>{film.title}</Link>
      })}
      </div>
      </div>);
  }
}