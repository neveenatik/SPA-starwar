import React, {Component} from 'react';
import { connect } from 'react-redux';
import {filmsFetching, searchFilm} from '../../../actions/filmsAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Card from '../../Card/Card';
import './Home.scss';


class Home extends Component {
    state = {
        userInput: ""
    }

    componentDidMount() {
        this.props.filmsFetching();
    }

    inputChangeHandler = (e) => {
        this.setState({userInput: e.target.value});
    }

    searchClickHandler = () => {
        this.props.searchFilm(this.state.userInput);
    }

    filterFilms = (input) => this.props.films.filter(film => film.title.match(input))

    renderFilms = () => this.props.films.map((film, i) => <Card key={i} film={film} />);

    render() {
        return (
        <div className='container'>
        <h1 className='header'>STAR WARS</h1>
            <div className="search-input">
            <input placeholder='Enter a movie name' type="text" onChange={this.inputChangeHandler}/>
            <button className='search-button' onClick={this.searchClickHandler} ><FontAwesomeIcon icon={faSearch} /></button>
            </div>
            {this.props.status.loading ? 
            <FontAwesomeIcon className='loading' icon={faCircleNotch} />
            :
            <div className='cards-list'>
            {this.renderFilms()}
            </div>
        }
        </div>
        );
    }
}

const mapStateToProps = state => ({
    films: state.data,
    status: state.status
});

export default connect(mapStateToProps, {
    filmsFetching,
    searchFilm
})(Home);

