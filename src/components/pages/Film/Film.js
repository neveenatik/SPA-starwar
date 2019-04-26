import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchFilm} from '../../../actions/filmsAction';
import {Link} from 'react-router-dom';

class Film extends Component {
    componentDidMount() {
        fetchFilm(this.props.match.params.id);
    }
  render() {
      const film = this.props.film;
    return (
      <div>
        <Link to='/'>Back to movies search</Link>
        <h2 className="film-title">{film.title}</h2>
        <p><span className='bold-start'>Director: </span>{film.director}</p>
        <p><span className='bold-start'>Producer: </span>{film.producer}</p>
        <p><span className='bold-start'>Release Date: </span>{film.release_date}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    film: state.selectedFilm
})

export default connect(mapStateToProps, {fetchFilm})(Film);