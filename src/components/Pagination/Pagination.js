import React, { Component } from 'react';
import {connect} from 'react-redux';
import {filmsFetching} from '../../actions/filmsAction';
import {actorsFetching  } from '../../actions/actorsAction';
import './Pagination.scss';

class Pagination extends Component {
    getPerPage = (e) => {
        e.preventDefault();
        this.props.activeTab === 'Movies' ?
        this.props.filmsFetching(e.target.innerText)
        : this.props.actorsFetching(e.target.innerText);
    }
  render() {
      const pagesList = [];
      for(let i = 1; i <= this.props.totalPages; i++) {
          const className = parseInt(this.props.activePage) === i ? 'active' : '';
          const page = <button className={className} key={i} onClick={this.getPerPage}>{i}</button>;
          pagesList.push(page);
      }
    return (
      <div className='pagination'>
        <div>
        {pagesList}
        </div>
        <div className='pagination-info'>showing item {(this.props.activePage - 1) * 10 + 1} - {(this.props.activePage - 1) * 10 + this.props.items.length} of {this.props.count} items</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    activeTab: state.actors.activeTab,
    activePage: state.actors.activePage
});

export default connect(mapStateToProps, {
    filmsFetching,
    actorsFetching
})(Pagination);
