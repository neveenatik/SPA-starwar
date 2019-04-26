import React, {Component} from 'react';
import { connect } from 'react-redux';
import {filmsFetching, searchFilm} from '../../../actions/filmsAction';
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
            <div className="search-input">
            <input placeholder='Enter a movie name' type="text" onChange={this.inputChangeHandler}/>
            <input type="button" value="Search" onClick={this.searchClickHandler} />
            </div>
            <div className='cards-list'>
            {this.renderFilms()}
            </div>
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

