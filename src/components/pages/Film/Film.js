import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import {fetchFilm} from '../../../actions/filmsAction';

import './Film.scss';

class Film extends Component {
    componentDidMount() {
        this.props.fetchFilm(this.props.match.params.id);
    }
  render() {
      const {film} = this.props;
    return (
      <div className='container'>
        <Link className='back-link' to='/'><FontAwesomeIcon className='icon' icon={faArrowLeft}/> Back to movies search</Link>
        {
            this.props.status.loading ? 
            <FontAwesomeIcon className='loading' icon={faCircleNotch} />
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
    film: state.films.selectedFilm,
    status: state.films.status
})

export default connect(
    mapStateToProps, 
    {fetchFilm}
)(Film);