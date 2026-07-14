import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSearchQuery, searchYoutube } from "../../redux/actions/search";
import { showNotification } from "../../redux/actions/notifications";

class HeaderSearch extends Component {
  updateSearchQuery = e => {
    this.props.updateSearchQuery(e.target.value);
  };

  submit = e => {
    e.preventDefault();
    this.search();
  };

  search = () => {
    if (this.props.keyword.length < 1) {
      this.props.showNotification({
        type: "warning",
        message: "Please enter a keyword to search"
      });
      return;
    }
    this.props.searchYoutube(this.props.keyword);
  };

  render() {
    return (
      <form onSubmit={this.submit} className="relative w-full max-w-2xl">
        <i
          className="fas fa-search pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
          aria-hidden="true"
        ></i>
        <input
          type="search"
          placeholder="Search YouTube…"
          value={this.props.keyword}
          onChange={this.updateSearchQuery}
          aria-label="Search YouTube"
          className="h-11 w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-24 text-sm text-white placeholder:text-white/40 outline-none transition-colors duration-150 focus:border-brand-500 focus:bg-white/10 focus:ring-4 focus:ring-brand-500/25"
        />
        <button
          type="submit"
          className="btn btn-primary absolute right-1 top-1/2 h-9 -translate-y-1/2 px-4"
        >
          Search
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({ keyword: state.keyword });

export default connect(mapStateToProps, {
  updateSearchQuery,
  searchYoutube,
  showNotification
})(HeaderSearch);
