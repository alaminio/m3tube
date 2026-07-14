import React, { Component } from "react";
import { connect } from "react-redux";
import { hideNotification } from "../../redux/actions/notifications";

const variantStyle = {
  info: "border-iris-500/30 bg-iris-500/10 text-iris-400",
  warning: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  danger: "border-brand-500/40 bg-brand-500/10 text-brand-400"
};

class Alerts extends Component {
  hide = e => {
    e.preventDefault();
    this.props.hideNotification();
  };

  render() {
    const { type, message } = this.props.message;
    const visible = Boolean(type && message);
    const cls = variantStyle[type] || variantStyle.info;

    return (
      <div
        aria-hidden={!visible}
        className={
          visible
            ? `mb-6 flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 backdrop-blur-xl animate-fade-in ${cls}`
            : "hidden"
        }
        role="status"
      >
        <div className="flex items-start gap-3 text-sm">
          <i
            className={`fas ${
              type === "danger"
                ? "fa-exclamation-triangle"
                : type === "warning"
                ? "fa-exclamation-circle"
                : "fa-info-circle"
            } mt-0.5`}
            aria-hidden="true"
          ></i>
          <span>{message}</span>
        </div>
        <button
          onClick={this.hide}
          aria-label="Dismiss"
          className="text-current opacity-70 hover:opacity-100"
        >
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({ message: state.message });

export default connect(mapStateToProps, { hideNotification })(Alerts);
