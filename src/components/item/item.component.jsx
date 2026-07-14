import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fromNow } from "../../config/moment-bn";
import { playItem, changePlayerStatus } from "../../redux/actions/player";
import { playVideo, pauseVideo, setVolume } from "../../helpers";

class Item extends Component {
  handlePlay = e => {
    e.preventDefault();
    e.stopPropagation();
    const { player, volume, item, playItem } = this.props;
    if (this.isSelected()) {
      playVideo(player);
    } else {
      playItem(item.id.videoId);
      setVolume(player, volume);
    }
  };

  handlePause = e => {
    e.preventDefault();
    e.stopPropagation();
    pauseVideo(this.props.player);
  };

  isPlayingNow = () => {
    return this.props.playerStatus === 1 && this.isSelected();
  };

  isSelected = () => {
    return this.props.item.id.videoId === this.props.playingNow;
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
    const thumb = (thumbnails.high || thumbnails.medium || thumbnails.default)
      .url;
    const selected = this.isSelected();
    const playing = this.isPlayingNow();

    return (
      <article
        className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 ${
          selected
            ? "border-brand-500/40 bg-white/[0.06] shadow-glow"
            : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
        }`}
      >
        <div className="relative aspect-video overflow-hidden bg-black/40">
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
          <button
            onClick={playing ? this.handlePause : this.handlePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus:opacity-100"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-grad text-white shadow-glow">
              <i
                className={`fas ${playing ? "fa-pause" : "fa-play"} text-lg`}
                aria-hidden="true"
              ></i>
            </span>
          </button>
          {selected && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
              {playing ? "Playing" : "Selected"}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
            {title}
          </h3>
          <p className="mt-1.5 text-xs text-white/50">
            {channelTitle} • {fromNow(publishedAt)}
          </p>
          {selected && description && (
            <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-white/60">
              {description}
            </p>
          )}
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={playing ? this.handlePause : this.handlePlay}
              className="btn h-9 px-4 text-xs"
            >
              <i
                className={`fas ${playing ? "fa-pause" : "fa-play"}`}
                aria-hidden="true"
              ></i>
              <span>{playing ? "Pause" : "Play"}</span>
            </button>
            <Link
              to={`/${videoId}`}
              className="icon-btn h-9 w-9"
              aria-label="Open video page"
            >
              <i className="fas fa-external-link-alt text-xs" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </article>
    );
  }
}

const mapStateToProps = state => ({
  playingNow: state.playingNow,
  player: state.player,
  playerStatus: state.playerStatus,
  volume: state.volume
});

export default connect(mapStateToProps, { playItem, changePlayerStatus })(Item);
