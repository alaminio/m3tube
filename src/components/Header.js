import React, { Component } from "react";
import { connect } from "react-redux";
import { updateQuery, searchYoutube } from "../actions/searchAction";

class Header extends Component {
  state = { searchQuery: "" };

  search = event => {
    this.setState({
      searchQuery: event.target.value
    });
  };

  submit = event => {
    event.preventDefault();
    this.props.searchSong(this.state.searchQuery);
    this.props.searchYoutube(this.state.searchQuery);
  };
  render() {
    return (
      <div className="Header" id="Header">
        <div>
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="text"
                value={this.state.searchQuery}
                onChange={this.search}
              />
            </div>
            <div className="control">
              <a href="/" className="button is-info" onClick={this.submit}>
                Search
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    q: state.query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchSong: query => dispatch(updateQuery(query)),
    searchYoutube: query => dispatch(searchYoutube(query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
