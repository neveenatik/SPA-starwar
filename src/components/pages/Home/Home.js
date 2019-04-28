import React, {Component} from 'react';
import { connect } from 'react-redux';
import {filmsFetching, searchFilm} from '../../../actions/filmsAction';
import {actorsFetching, searchActor, setActiveTab} from '../../../actions/actorsAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Card from '../../Card/Card';
import Pagination from '../../Pagination/Pagination';
import './Home.scss';


class Home extends Component {
    state = {
        userInput: "",
    }

    componentDidMount() {
        this.props.filmsFetching()
        this.props.actorsFetching();
    }

    inputChangeHandler = (e) => {
        this.setState({userInput: e.target.value});
    }

    searchClickHandler = () => {
        this.props.activeTab === 'Movies' ?
        this.props.searchFilm(this.state.userInput)
        : this.props.searchActor(this.state.userInput);
    }

    setTab = (e) => {
        this.props.setActiveTab(e.target.innerText);
    }

    filterFilms = (input) => this.props.films.filter(film => film.title.match(input))

    renderFilms = () => this.props.films.map((film, i) => <Card key={i} data={film} isFilm />);
    renderActors = () => this.props.actors.map((actor, i) => <Card key={i} data={actor} />);

    render() {
        const inputPlaceHolder = this.props.activeTab === 'Movies' ?
         'Enter a movie name' : 'Enter an actor name';
        return (
        <div className='container'>
            <h1 className='header'>STAR WARS</h1>
        <div className='tabs'>
            <button className={`tab ${this.props.activeTab === 'Movies' ? "active" : ''}`} onClick={this.setTab}>Movies</button>
            <button className={`tab ${this.props.activeTab === 'Actors' ? "active" : ''}`} onClick={this.setTab}>Actors</button>
        </div>
            <div className="search-input">
            <input placeholder={inputPlaceHolder} type="text" onChange={this.inputChangeHandler}/>
            <button className='search-button' onClick={this.searchClickHandler} ><FontAwesomeIcon icon={faSearch} /></button>
            </div>
            {this.props.activeTab === 'Movies' ?
                this.props.statusFilms.loading ? 
                <FontAwesomeIcon className='loading' icon={faCircleNotch} />
                :
                <div className='cards-list'>
                {this.renderFilms()}
                <Pagination totalPages={this.props.filmsPages} items={this.props.films} count={this.props.filmsCount}/>
                </div>
            : this.props.statusActors.loading || this.props.statusFilms.loading ? 
                <FontAwesomeIcon className='loading' icon={faCircleNotch} />
                :
                <div className='cards-list'>
                {this.renderActors()}
                <Pagination totalPages={this.props.actorsPages} items={this.props.actors} count={this.props.actorsCount}/>
                </div>
            }
        </div>
        );
    }
}

const mapStateToProps = state => ({
    films: state.films.data,
    statusFilms: state.films.status,
    filmsCount: state.films.count,
    actors: state.actors.data,
    statusActors: state.actors.status,
    actorsCount: state.actors.count,
    activeTab: state.actors.activeTab,
    filmsPages: state.films.totalPages,
    actorsPages: state.actors.totalPages
});

export default connect(mapStateToProps, {
    filmsFetching,
    searchFilm,
    actorsFetching,
    searchActor,
    setActiveTab,
})(Home);

