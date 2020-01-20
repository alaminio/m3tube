import React, { Component } from "react";
import { connect } from "react-redux";
import { HIDE_ERROR } from "../../config/constants";

class Danger extends Component {
  hideNotification = event => {
    event.preventDefault();
    this.props.removeErrorMessage();
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

const mapDispatchToProps = dispatch => {
  return {
    removeErrorMessage: () => {
      dispatch({ type: HIDE_ERROR });
    }
  };
};
export default connect(null, mapDispatchToProps)(Danger);
