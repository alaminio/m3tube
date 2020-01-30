import React, { Component } from "react";
import { connect } from "react-redux";
import style from "../styles/player.module.css";
import {
  setPlayerObj,
  changePlayerStatus,
  playItem,
  changePlayerMuteStatus,
  changePlayerVolume
} from "../actions/player";
import {
  loadVideoById,
  pauseVideo,
  playVideo,
  muteVideo,
  unMuteVideo,
  setVolume
} from "../helpers";

class Player extends Component {
  state = { hidePlayer: false, clearView: false, playInBackGround: false };

  componentDidMount = () => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "//www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = this.loadVideo;

      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      this.loadVideo();
    }
  };

  loadVideo = () => {
    this.player = new window.YT.Player("m3tube-player", {
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange
      },
      playerVars: {
        origin: window.location.href,
        controls: 0,
        loop: 1,
        modestbranding: 1,
        disablekb: 1
      }
    });
  };

  onPlayerReady = event => {
    this.props.setPlayerObj(this.player);
    if (this.props.playingNow) {
      loadVideoById(this.player, this.props.playingNow);
    }
  };

  onPlayerStateChange = event => {
    this.props.changePlayerStatus(event.data);
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.playerStatus !== this.props.playerStatus &&
      this.props.player
    ) {
      if (this.props.playerStatus === 2) {
        // pause player
        pauseVideo(this.props.player);
      } else {
        // unknown player
        playVideo(this.props.player);
      }
    }

    if (prevProps.playingNow !== this.props.playingNow) {
      loadVideoById(this.player, this.props.playingNow);
    }
  }

  showPlayer = e => {
    e.preventDefault();
    this.setState({ hidePlayer: false });
  };
  hidePlayer = e => {
    e.preventDefault();
    this.setState({ hidePlayer: true });
  };

  playItem = e => {
    e.preventDefault();
    this.props.playItem(this.props.playingNow);
    this.props.changePlayerStatus(1);
  };

  pauseItem = e => {
    e.preventDefault();
    pauseVideo(this.props.player);
  };

  muteVideo = e => {
    e.preventDefault();
    muteVideo(this.props.player);
    this.props.changePlayerMuteStatus(true);
  };

  unMuteVideo = e => {
    e.preventDefault();
    unMuteVideo(this.props.player);
    this.props.changePlayerMuteStatus(false);
  };

  changePlayerVolume = e => {
    this.props.changePlayerVolume(e.target.value);
    setVolume(this.props.player, e.target.value);
  };

  blurPlayer = e => {
    e.preventDefault();
    this.setState({ clearView: false });
  };

  clearPlayer = e => {
    e.preventDefault();
    this.setState({ clearView: true });
  };

  playInBackGround = e => {
    e.preventDefault();
    this.setState({ playInBackGround: true });
  };

  getPlayerParentClass = () => {
    if (this.state.playInBackGround) {
      return "Player is-hidden";
    }
    if (this.props.items.length === 0) {
      return `Player ${style.emptySpace}`;
    }
    return "Player";
  };

  getPlayerChildClass = () => {
    var className = `card ${style.playerMargin}`;
    if (this.props.playingNow === null) {
      return className + ` ${style.hide}`;
    }
    return className;
  };

  render() {
    const playPause =
      this.props.playerStatus === 2 ? (
        <a href="/" className="card-footer-item" onClick={this.playItem}>
          Play
        </a>
      ) : (
        <a href="/" className="card-footer-item" onClick={this.pauseItem}>
          Pause
        </a>
      );
    let playerClass = this.state.hidePlayer
      ? `content ${style.center} ${style.hide}`
      : `content ${style.center}`;

    if (!this.state.clearView) {
      playerClass = `${playerClass} ${style.cloudPlayer}`;
    }

    return (
      <div className={this.getPlayerParentClass()}>
        <div className={this.getPlayerChildClass()}>
          <header className="card-header">
            <p className="card-header-title">M3Player</p>
            <a
              href="/"
              className="card-header-icon"
              aria-label="Play In Background"
              onClick={this.playInBackGround}
            >
              <span className="icon">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div className="card-content">
            <div className={playerClass}>
              <div id="m3tube-player"></div>
            </div>
          </div>
          <footer className="card-footer">
            {playPause}

            {this.props.isMuted ? (
              <a
                href="/"
                className="card-footer-item"
                onClick={this.unMuteVideo}
              >
                Unmute
              </a>
            ) : (
              <a href="/" className="card-footer-item" onClick={this.muteVideo}>
                Mute
              </a>
            )}

            {this.state.hidePlayer ? (
              <a
                href="/"
                className="card-footer-item"
                onClick={this.showPlayer}
              >
                Show
              </a>
            ) : (
              <a
                href="/"
                className="card-footer-item"
                onClick={this.hidePlayer}
              >
                Hide
              </a>
            )}

            {this.state.clearView ? (
              <a
                href="/"
                className="card-footer-item"
                onClick={this.blurPlayer}
              >
                Blur
              </a>
            ) : (
              <a
                href="/"
                className="card-footer-item"
                onClick={this.clearPlayer}
              >
                Clear
              </a>
            )}

            <div className="card-footer-item">
              <input
                type="range"
                step="1"
                min="0"
                max="100"
                value={this.props.volume}
                onChange={this.changePlayerVolume}
              />
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.player,
    playingNow: state.playingNow,
    playerStatus: state.playerStatus,
    items: state.items,
    isMuted: state.isMuted,
    volume: state.volume
  };
};

export default connect(mapStateToProps, {
  setPlayerObj,
  changePlayerStatus,
  playItem,
  changePlayerMuteStatus,
  changePlayerVolume
})(Player);
