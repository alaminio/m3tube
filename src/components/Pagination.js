import React, { Component } from "react";
import { connect } from "react-redux";
import { searchYoutube } from "../actions/searchAction";

class PrevPage extends Component {
  render() {
    return (
      <a href="/" className="pagination-previous" onClick={this.props.onClick}>
        Previous
      </a>
    );
  }
}

class NextPage extends Component {
  render() {
    return (
      <a href="/" className="pagination-next" onClick={this.props.onClick}>
        Next page
      </a>
    );
  }
}

class Pagination extends Component {
  changeToNextPage = event => {
    event.preventDefault();
    this.props.searchYoutube(
      this.props.query,
      this.props.pagination.nextPageToken
    );
  };
  changeToPrevPage = event => {
    event.preventDefault();
    this.props.searchYoutube(
      this.props.query,
      this.props.pagination.prevPageToken
    );
  };

  render() {
    let prevPage = "";
    if (this.props.pagination.prevPageToken) {
      prevPage = <PrevPage onClick={this.changeToPrevPage} />;
    }
    let nextPage = "";
    if (this.props.pagination.nextPageToken) {
      nextPage = <NextPage onClick={this.changeToNextPage} />;
    }
    return (
      <nav className="pagination" role="navigation" aria-label="pagination">
        {prevPage}
        {nextPage}
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    pagination: state.pagination,
    query: state.query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchYoutube: (query, pageToken) =>
      dispatch(searchYoutube(query, pageToken))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
