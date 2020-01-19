import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className="Footer" id="Footer">
        <footer className="footer">
          <div className="container">
            <div className="columns">
              <div className="column">
                Made with <i className="fas fa-heart"></i> by MD AL AMIN
              </div>
              <div className="column">
                <p className="is-pulled-right">Powerd by youtube API v3</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
