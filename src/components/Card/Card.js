import React, { Component } from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

export default class Card extends Component {
    render() {
        const { data } = this.props;
        const dataId = data.properties.url.match(/\d+/)[0];
        return (
            <div className="card">
                <h2 className="card-title">{data.properties.title}</h2>
                <p className="one-line-text">
                    <span className="bold-start">Director: </span>
                    {data.properties.director}
                </p>
                <p className="one-line-text">
                    <span className="bold-start">Producer: </span>
                    {data.properties.producer}
                </p>
                <p className="one-line-text">
                    <span className="bold-start">Release Date: </span>
                    {data.properties.release_date}
                </p>
                <Link to={`/film/${dataId}`}>More info..</Link>
            </div>
        );
    }
}
