import React, { Component } from "react";
import { connect } from "react-redux";

class Player extends Component {
  state = { hidePlayer: false, stopPlayer: false, clearVideo: false };

  togglePlayer = event => {
    event.preventDefault();
    this.setState({ hidePlayer: !this.state.hidePlayer });
  };

  stopPlayer = event => {
    event.preventDefault();
    this.setState({ stopPlayer: true });
  };

  showClearVideo = event => {
    event.preventDefault();
    this.setState({ clearVideo: !this.state.clearVideo });
  };

  getSnapshotBeforeUpdate = (prevProps, prevState) => {
    return prevProps.play !== this.props.play;
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (snapshot) {
      this.setState({ stopPlayer: false });
    }
  };

  render() {
    if (!this.props.play || this.state.stopPlayer) {
      return <div>&nbsp;</div>;
    }

    let playerClassName = "";
    if (this.state.hidePlayer) {
      playerClassName = "hide";
    }

    if (this.state.clearVideo) {
      playerClassName += " opacity1";
    }

    const embedUrl = `https://www.youtube.com/embed/${this.props.play}`;

    return (
      <div className="Player" id="Player">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Playing: {embedUrl}</p>
          </header>
          <div className="card-content">
            <div className="content">
              <div id="video-placeholder" className={playerClassName}>
                <iframe
                  title="m3tube"
                  width="640"
                  height="360"
                  src={embedUrl}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <footer className="card-footer">
            <a
              href="/"
              className="card-footer-item"
              onClick={this.togglePlayer}
            >
              <span className="icon is-small">
                <i className="fas fa-toggle-on" aria-hidden="true"></i>
              </span>
            </a>
            <a
              href="/"
              className="card-footer-item"
              onClick={this.showClearVideo}
            >
              <span className="icon is-small">
                <i className="fas fa-cloud" aria-hidden="true"></i>
              </span>
            </a>
            <a href="/" className="card-footer-item" onClick={this.stopPlayer}>
              <span className="icon is-small">
                <i className="fas fa-stop" aria-hidden="true"></i>
              </span>
            </a>
          </footer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    play: state.play
  };
};
export default connect(mapStateToProps)(Player);
