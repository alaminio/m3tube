import React, { Component } from "react";

export default class Danger extends Component {
  hideNotification = event => {
    event.preventDefault();
  };
  render() {
    return (
      <div className="notification is-danger">
        <button className="delete" onClick={this.hideNotification}></button>
        {this.props.message}
      </div>
    );
  }
}
