import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { playVideo } from "../actions/PlaySongActions";

class Song extends Component {
  playThisSong = event => {
    event.preventDefault();
    this.props.playVideo(this.props.song.id.videoId);
  };
  render() {
    const createdAt = moment(this.props.song.snippet.publishedAt).fromNow();
    return (
      <div className="Song" id="Song">
        <div className="box">
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img
                  src={this.props.song.snippet.thumbnails.default.url}
                  alt={this.props.song.snippet.title}
                />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{createdAt}</strong>&nbsp;
                  <small>{this.props.song.snippet.channelTitle}</small>
                  <br />
                  {this.props.song.snippet.title}
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <a
                    href="/"
                    className="level-item"
                    aria-label="reply"
                    onClick={this.playThisSong}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-play" aria-hidden="true"></i>
                    </span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    playVideo: videoId => {
      dispatch(playVideo(videoId));
    }
  };
};
export default connect(null, mapDispatchToProps)(Song);
