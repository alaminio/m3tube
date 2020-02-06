import React, { Component } from "react";
import { connect } from "react-redux";
import { searchYoutube } from "../../redux/actions/search";

function PaginationButton({ className, onClick, children }) {
  return (
    <a href="/" className={className} onClick={onClick}>
      {children}
    </a>
  );
}

class Pagination extends Component {
  changeToNextPage = event => {
    event.preventDefault();
    this.props.searchYoutube(
      this.props.keyword,
      this.props.pagination.nextPageToken
    );
  };
  changeToPrevPage = event => {
    event.preventDefault();
    this.props.searchYoutube(
      this.props.keyword,
      this.props.pagination.prevPageToken
    );
  };

  render() {
    let prevPage = <div>&nbsp;</div>;
    if (this.props.pagination.prevPageToken) {
      prevPage = (
        <PaginationButton
          onClick={this.changeToPrevPage}
          className="pagination-previous"
        >
          Previous Page
        </PaginationButton>
      );
    }
    let nextPage = <div>&nbsp;</div>;
    if (this.props.pagination.nextPageToken) {
      nextPage = (
        <PaginationButton
          onClick={this.changeToNextPage}
          className="pagination-previous"
        >
          Next Page
        </PaginationButton>
      );
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
    keyword: state.keyword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchYoutube: (keyword, pageToken) =>
      dispatch(searchYoutube(keyword, pageToken))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
