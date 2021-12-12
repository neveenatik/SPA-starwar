import React, { Component } from "react";
import "./Card.scss";
import { Link } from "react-router-dom";
import avatar from "../../assets/profile-avatar.png";

export default class ActorCard extends Component {
    render() {
        const { data } = this.props;
        console.log(data);
        return (
            <div className="card media">
                <div className="info">
                    <div className="media-container">
                        <img className="avatar" src={avatar} alt="avatar" />
                    </div>
                    <div className="info-content">
                        <p className="bold-start">{data.name}</p>
                        <p>Born in {data.properties.birth_year}</p>
                        <p>Height: {data.properties.height} CM</p>
                        <p>{data.properties.gender}</p>
                    </div>
                </div>
                <div className="movies-list">
                    <p className="bold-start">Movies</p>
                    {data.films.map((film) => {
                        const dataId = film.uid;
                        return (
                            <Link
                                key={dataId}
                                className="list-item"
                                to={`/film/${dataId}`}
                            >
                                {film.properties.title}
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    }
}
