import React, { Component } from "react";
import { connect } from "react-redux";
import YoutubePlayer from "./YoutubePlayer";

class Player extends Component {
  state = {
    hidePlayer: false,
    stopPlayer: false,
    clearVideo: false,
    playerStatus: "play",
    muteStatus: "unmute"
  };

  togglePlayer = event => {
    event.preventDefault();
    this.setState({ hidePlayer: !this.state.hidePlayer });
  };

  stopPlayer = event => {
    event.preventDefault();
    this.setState({ stopPlayer: true });
    this.setState({ playerStatus: "stop" });
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

  pauseVideo = event => {
    event.preventDefault();
    this.setState({ playerStatus: "pause" });
  };

  playVideo = event => {
    event.preventDefault();
    this.setState({ playerStatus: "play" });
  };

  muteUnmutePlayer = event => {
    event.preventDefault();
    const muteStatus = this.state.muteStatus === "unmute" ? "mute" : "unmute";
    this.setState({ muteStatus: muteStatus });
  };

  playerStatus = event => {
    event.preventDefault();
    if (this.state.playerStatus === "pause") {
      this.setState({ playerStatus: "play" });
    } else {
      this.setState({ playerStatus: "pause" });
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

    const playStatus = this.state.playerStatus !== "play" ? "Play" : "Pause";
    const toggleText = this.state.hidePlayer ? "Show" : "Hide";
    const clearViewtext = this.state.clearVideo
      ? "Background View"
      : "Clear View";
    const muteUnmuteText = this.state.muteStatus === "mute" ? "Unmute" : "Mute";

    return (
      <div className="Player" id="Player">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">M3Player</p>
          </header>
          <div className="card-content">
            <div className="content">
              <div id="video-placeholder" className={playerClassName}>
                <YoutubePlayer
                  id={this.props.play}
                  status={this.state.playerStatus}
                  mute={this.state.muteStatus}
                />
              </div>
            </div>
          </div>
          <footer className="card-footer">
            <a
              href="/"
              className="card-footer-item"
              onClick={this.togglePlayer}
            >
              {toggleText}
            </a>
            <a
              href="/"
              className="card-footer-item"
              onClick={this.muteUnmutePlayer}
            >
              {muteUnmuteText}
            </a>
            <a
              href="/"
              className="card-footer-item"
              onClick={this.showClearVideo}
            >
              {clearViewtext}
            </a>
            <a href="/" className="card-footer-item" onClick={this.stopPlayer}>
              <span className="icon is-small">
                <i className="fas fa-stop" aria-hidden="true"></i>
              </span>
            </a>
            <a
              href="/"
              className="card-footer-item"
              onClick={this.playerStatus}
            >
              {playStatus}
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
