import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Player from "../Player";
import { playVideo } from "../../actions/PlaySongActions";

class ViewPage extends Component {
  constructor(props) {
    super(props);
    if (!this.props.match.params.videoID) {
      console.error("video id not found");
      return;
    }
    this.props.playVideo(this.props.match.params.videoID);
  }

  componentWillUnmount = () => {
    this.props.playVideo(false);
  };

  render() {
    const player = this.props.play ? <Player /> : "";

    return (
      <div className="container">
        <div>
          <Link to="/">
            <span className="icon">
              <i className="fas fa-home"></i>
            </span>
          </Link>
        </div>
        {player}
        <Footer />
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

const mapStateToProps = state => {
  return {
    play: state.play
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewPage);
