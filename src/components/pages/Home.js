import React, {Component} from 'react';
import { connect } from 'react-redux';
import {filmsFetching} from '../../actions/filmsAction';
import Card from '../Card';


class Home extends Component {
    componentDidMount() {
        this.props.fetchFilms();
    }

    renderFilms = () => this.props.films.map((film, i) => <Card key={i} film={film} />);

    render() {
        console.log(this.props);
        return (
        <div className='container'>
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
    fetchFilms: filmsFetching
})(Home);

