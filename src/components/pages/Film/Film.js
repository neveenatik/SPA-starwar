import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchFilm} from '../../../actions/filmsAction';
import {Link} from 'react-router-dom';

import './Film.scss';

class Film extends Component {
    componentDidMount() {
        this.props.fetchFilm(this.props.match.params.id);
    }
  render() {
      const film = this.props.film;
    return (
      <div className='container'>
        <Link to='/'>Back to movies search</Link>
        {
            this.props.status.loading ? 
            <div className='loading'> loading </div> 
            : 
        <div className='details'>
        <h2 className="film-title">{film.title}</h2>
        <p><span className='bold-start'>Director: </span>{film.director}</p>
        <p><span className='bold-start'>Producer: </span>{film.producer}</p>
        <p><span className='bold-start'>Release Date: </span>{film.release_date}</p>
        <p className='bold-start'>Opening crawl:</p>
        <p>"{film.opening_crawl}"</p>
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
    film: state.selectedFilm,
    status: state.status
})

export default connect(
    mapStateToProps, 
    {fetchFilm}
)(Film);