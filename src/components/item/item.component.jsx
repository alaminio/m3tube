import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import style from "./item.module.css";
import { playItem, changePlayerStatus } from "../../redux/actions/player";
import { playVideo, pauseVideo, setVolume } from "../../helpers";

const PlayButton = props => {
  return (
    <a href="/" className="level-item" onClick={props.playItem}>
      <span className="icon is-small">
        <i className="fas fa-play" aria-hidden="true"></i>
      </span>
    </a>
  );
};

const PauseButton = props => {
  return (
    <a href="/" className="level-item" onClick={props.pauseItem}>
      <span className="icon is-small">
        <i className="fas fa-pause" aria-hidden="true"></i>
      </span>
    </a>
  );
};

class Item extends Component {
  playItem = e => {
    e.preventDefault();
    if (this.props.item.id.videoId === this.props.playingNow) {
      playVideo(this.props.player);
    } else {
      this.props.playItem(this.props.item.id.videoId);
      setVolume(this.props.player, this.props.volume);
    }
  };
  pauseItem = e => {
    e.preventDefault();
    pauseVideo(this.props.player);
  };

  isPlayingNow = () => {
    return (
      this.props.playerStatus === 1 &&
      this.props.item.id.videoId === this.props.playingNow
    );
  };

  render() {
    const createdAt = moment(this.props.item.snippet.publishedAt).fromNow();
    const playPauseBtn = this.isPlayingNow() ? (
      <PauseButton pauseItem={this.pauseItem} />
    ) : (
      <PlayButton playItem={this.playItem} />
    );

    let boxClass = "box";
    if (this.props.item.id.videoId === this.props.playingNow) {
      boxClass = `box ${style.active}`;
    }

    return (
      <div className={style.item}>
        <div className={boxClass}>
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img
                  src={this.props.item.snippet.thumbnails.default.url}
                  alt={this.props.item.snippet.title}
                />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{createdAt}</strong>&nbsp;
                  <small>{this.props.item.snippet.channelTitle}</small>
                  <br />
                  {this.props.item.snippet.title}
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">{playPauseBtn}</div>
                <div className="level-right">
                  <Link to={`/${this.props.item.id.videoId}`}>
                    <i className="fas fa-eye"></i>
                  </Link>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playingNow: state.playingNow,
    player: state.player,
    playerStatus: state.playerStatus,
    volume: state.volume
  };
};

export default connect(mapStateToProps, { playItem, changePlayerStatus })(Item);
