import React, { Component } from "react";
import { connect } from "react-redux";
import { filmsFetching, searchFilm } from "../../../actions/filmsAction";
import {
    actorsFetching,
    searchActor,
    setActiveTab,
} from "../../../actions/actorsAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Card from "../../Card/Card";
import ActorCard from "../../Card/ActorCard";
import Pagination from "../../Pagination/Pagination";
import "./Home.scss";
import { debounce } from "lodash";

class Home extends Component {
    state = {
        userInput: "",
        suggestions: [],
        activeSelection: 0,
        isActive: false,
    };

    componentDidMount() {
        this.props.filmsFetching();
    }

    setTab = (e) => {
        this.props.setActiveTab(e.target.innerText);
        if (this.props.activeTab !== e.target.innerText) {
            if (e.target.innerText === "Actors" && !this.props.actors.length) {
                this.props.actorsFetching();
            }

            if (e.target.innerText === "Movies" && !this.props.films.length) {
                this.props.filmsFetching();
            }
        }
    };

    inputChangeHandler = (e) => {
        const suggestions =
            this.props.activeTab === "Movies"
                ? this.filterFilms(e.target.value)
                : this.filterActors(e.target.value);
        this.setState({
            userInput: e.target.value,
            suggestions: suggestions,
            isActive: true,
        });
    };

    filterFilms = (input) =>
        this.props.films.filter(
            (film) =>
                !film.properties.title
                    .toLowerCase()
                    .includes(input.toLowerCase())
        );
    filterActors = (input) =>
        this.props.actors.filter(
            (actor) => !actor.name.toLowerCase().includes(input.toLowerCase())
        );

    selectionHandler = (e) => {
        this.setState({
            isActive: false,
            userInput: e.target.innerText,
            suggestions: [],
            activeSelection: 0,
        });
    };

    onBlur = debounce(() => {
        this.setState({ isActive: false });
        if (
            !this.state.userInput &&
            this.props.filmsCount !== this.props.films.length &&
            this.props.activeTab === "Movies"
        ) {
            this.props.filmsFetching();
        } else if (!this.state.userInput && this.props.activeTab === "Actors") {
            this.props.actorsFetching();
        }
    }, 300);

    onKeyDown = (e) => {
        const { suggestions, activeSelection } = this.state;
        //user press enter
        if (e.keyCode === 13) {
            /*if  there is a dropdown suggestions set state
            otherwise trigger searchHandler
            */
            if (suggestions.length) {
                const userInput =
                    this.props.activeTab === "Movies"
                        ? suggestions[activeSelection].properties.title
                        : suggestions[activeSelection].name;
                this.setState({
                    isActive: false,
                    userInput: userInput,
                    suggestions: [],
                });
            } else {
                this.searchClickHandler();
            }
        }
        //user press up arrow
        if (e.keyCode === 38) {
            if (activeSelection === 0) return;
            this.setState({ activeSelection: activeSelection - 1 });
        }
        //user press down arrow
        if (e.keyCode === 40) {
            if (activeSelection === suggestions.length - 1) return;
            this.setState({ activeSelection: activeSelection + 1 });
        }
    };

    searchClickHandler = () => {
        this.props.activeTab === "Movies"
            ? this.props.searchFilm(this.state.userInput)
            : this.props.searchActor(this.state.userInput);
    };

    renderFilms = () => {
        return this.props.films.map((film, i) => <Card key={i} data={film} />);
    };
    renderActors = () => {
        return this.props.actors.map((actor, i) => {
            const films = this.props.films.filter((film) =>
                film.properties.characters.includes(actor.url)
            );
            return <ActorCard key={i} data={{ ...actor, films }} />;
        });
    };

    render() {
        const inputPlaceHolder =
            this.props.activeTab === "Movies"
                ? "Enter a movie name"
                : "Enter an actor name";
        return (
            <div className="container">
                <h1 className="header">STAR WARS</h1>
                <div className="tabs">
                    <button
                        className={`tab ${
                            this.props.activeTab === "Movies" ? "active" : ""
                        }`}
                        onClick={this.setTab}
                    >
                        Movies
                    </button>
                    <button
                        className={`tab ${
                            this.props.activeTab === "Actors" ? "active" : ""
                        }`}
                        onClick={this.setTab}
                    >
                        Actors
                    </button>
                </div>
                <div className="search-input">
                    <input
                        placeholder={inputPlaceHolder}
                        type="text"
                        value={this.state.userInput}
                        autoComplete="off"
                        onBlur={this.onBlur}
                        onChange={this.inputChangeHandler}
                        onKeyDown={this.onKeyDown}
                    />
                    <button
                        className="search-button"
                        onClick={this.searchClickHandler}
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    {this.state.isActive && this.state.suggestions.length ? (
                        <ul className="suggestions">
                            {this.state.suggestions.map((suggestion, i) => (
                                <li
                                    key={i}
                                    className={
                                        i === this.state.activeSelection
                                            ? "active-selection"
                                            : ""
                                    }
                                    onClick={this.selectionHandler}
                                >
                                    {this.props.activeTab === "Movies"
                                        ? suggestion.properties.title
                                        : suggestion.name}
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
                {this.props.activeTab === "Movies" ? (
                    this.props.statusFilms.loading ? (
                        <FontAwesomeIcon
                            className="loading"
                            icon={faCircleNotch}
                        />
                    ) : (
                        <div className="cards-list">
                            {this.renderFilms()}
                            <Pagination
                                totalPages={this.props.filmsPages}
                                items={this.props.films}
                                count={this.props.filmsCount}
                            />
                        </div>
                    )
                ) : this.props.statusActors.loading ||
                  this.props.statusFilms.loading ? (
                    <FontAwesomeIcon className="loading" icon={faCircleNotch} />
                ) : (
                    <div className="cards-list">
                        {this.renderActors()}
                        <Pagination
                            totalPages={this.props.actorsPages}
                            items={this.props.actors}
                            count={this.props.actorsCount}
                        />
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    films: state.films.data,
    statusFilms: state.films.status,
    filmsCount: state.films.count,
    actors: state.actors.data,
    statusActors: state.actors.status,
    actorsCount: state.actors.count,
    activeTab: state.actors.activeTab,
    filmsPages: state.films.totalPages,
    actorsPages: state.actors.totalPages,
});

export default connect(mapStateToProps, {
    filmsFetching,
    searchFilm,
    actorsFetching,
    searchActor,
    setActiveTab,
})(Home);
