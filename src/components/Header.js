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
    this.searchAction();
  };

  inputKeyDown = event => {
    if (event.key === "Enter") {
      this.searchAction();
    }
  };

  searchAction = () => {
    if (this.state.searchQuery.length < 1) {
      console.error("Nothing to search");
      return;
    }
    this.props.searchSong(this.state.searchQuery);
    this.props.searchYoutube(this.state.searchQuery);
  };

  render() {
    return (
      <div className="Header" id="Header">
        <div className="columns">
          <div className="column">
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={this.state.searchQuery}
                  onChange={this.search}
                  onKeyDown={this.inputKeyDown}
                />
              </div>
              <div className="control">
                <a href="/" className="button is-info" onClick={this.submit}>
                  Search
                </a>
              </div>
            </div>
          </div>
          <div className="column">
            <ul className="menu">
              <li>m3tube&nbsp;&nbsp;</li>
              <li className="github">
                <a
                  target="_blank"
                  href="https://github.com/m3alamin/m3tube"
                  title="View Code On Github"
                  rel="noopener noreferrer"
                >
                  <i className="far fa-eye"></i> <i className="fas fa-code"></i>{" "}
                  On
                  <i className="fab fa-github"></i>
                </a>
              </li>
            </ul>
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
