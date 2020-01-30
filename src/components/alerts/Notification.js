import React, { Component } from "react";
import { connect } from "react-redux";
import { hideNotification } from "../../actions/notifications";

class Notification extends Component {
  hideNotification = e => {
    e.preventDefault();
    this.props.hideNotification();
  };
  render() {
    const { type, message } = this.props.message;
    let notificationClass = "is-hidden";
    if (type) {
      notificationClass = `is-${type}`;
    }
    return (
      <div className={`notification ${notificationClass}`}>
        <button className="delete" onClick={this.hideNotification}></button>
        {message}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.message
  };
};

export default connect(mapStateToProps, { hideNotification })(Notification);
