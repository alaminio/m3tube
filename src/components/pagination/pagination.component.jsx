import React, { Component } from "react";
import { connect } from "react-redux";
import { searchYoutube } from "../../redux/actions/search";

class Pagination extends Component {
  toNext = e => {
    e.preventDefault();
    this.props.searchYoutube(
      this.props.keyword,
      this.props.pagination.nextPageToken
    );
  };
  toPrev = e => {
    e.preventDefault();
    this.props.searchYoutube(
      this.props.keyword,
      this.props.pagination.prevPageToken
    );
  };

  render() {
    const { prevPageToken, nextPageToken } = this.props.pagination;
    const visible = Boolean(prevPageToken || nextPageToken);

    return (
      <nav
        className={
          visible
            ? "mt-8 flex items-center justify-center gap-3"
            : "hidden"
        }
        role="navigation"
        aria-label="pagination"
      >
        <button
          onClick={this.toPrev}
          disabled={!prevPageToken}
          className="btn min-w-[8rem]"
        >
          <i className="fas fa-chevron-left text-xs" aria-hidden="true"></i>
          <span>Previous</span>
        </button>
        <button
          onClick={this.toNext}
          disabled={!nextPageToken}
          className="btn min-w-[8rem]"
        >
          <span>Next</span>
          <i className="fas fa-chevron-right text-xs" aria-hidden="true"></i>
        </button>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  pagination: state.pagination,
  keyword: state.keyword
});

const mapDispatchToProps = dispatch => ({
  searchYoutube: (keyword, pageToken) =>
    dispatch(searchYoutube(keyword, pageToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
