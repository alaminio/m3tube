import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fromNow } from "../../config/moment-bn";
import style from "./item.module.css";
import { playItem, changePlayerStatus } from "../../redux/actions/player";
import { playVideo, pauseVideo, setVolume } from "../../helpers";

const LevelItem = ({ children, onClickHandle }) => (
  <a href="/" className="level-item" onClick={onClickHandle}>
    <span className="icon is-small">{children}</span>
  </a>
);

const PlayButton = ({ onClickHandle }) => (
  <LevelItem onClickHandle={onClickHandle}>
    <i className="fas fa-play" aria-hidden="true"></i>
  </LevelItem>
);

const PauseButton = ({ onClickHandle }) => (
  <LevelItem onClickHandle={onClickHandle}>
    <i className="fas fa-pause" aria-hidden="true"></i>
  </LevelItem>
);

class Item extends Component {
  playItem = e => {
    e.preventDefault();

    const { player, volume, item, playItem } = this.props;

    if (this.selectedItem()) {
      playVideo(player);
    } else {
      playItem(item.id.videoId);
      setVolume(player, volume);
    }
  };

  pauseItem = e => {
    e.preventDefault();
    const { player } = this.props;
    pauseVideo(player);
  };

  isPlayingNow = () => {
    const { playerStatus } = this.props;
    return playerStatus === 1 && this.selectedItem();
  };

  selectedItem = () => {
    const { playingNow, item } = this.props;
    return item.id.videoId === playingNow;
  };

  render() {
    const {
      title,
      publishedAt,
      thumbnails,
      channelTitle,
      description
    } = this.props.item.snippet;

    const { videoId } = this.props.item.id;

    return (
      <div className={style.item}>
        <div className={this.selectedItem() ? `box ${style.active}` : "box"}>
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src={thumbnails.default.url} alt={title} />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{fromNow(publishedAt)}</strong>
                  &nbsp;
                  <small>{channelTitle}</small>
                  <br />
                  {title}
                </p>
                {this.selectedItem() && <p>{description}</p>}
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  {this.isPlayingNow() ? (
                    <PauseButton onClickHandle={this.pauseItem} />
                  ) : (
                    <PlayButton onClickHandle={this.playItem} />
                  )}
                </div>
                <div className="level-right">
                  <Link to={`/${videoId}`}>
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
