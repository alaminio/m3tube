import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { playItem, changePlayerStatus } from "../../redux/actions/player";

class SinglePage extends Component {
  componentDidMount() {
    this.props.playItem(this.props.match.params.videoId);
  }

  render() {
    const { videoId } = this.props.match.params;
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-brand-grad shadow-glow">
          <i className="fas fa-play text-2xl text-white"></i>
        </div>
        <h1 className="text-xl font-semibold text-white">Now playing</h1>
        <p className="mt-2 text-sm text-white/50">Video ID: {videoId}</p>
        <Link to="/" className="btn mt-6">
          <i className="fas fa-arrow-left text-xs"></i>
          <span>Back to search</span>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
  playerStatus: state.playerStatus,
  volume: state.volume
});

export default connect(mapStateToProps, { playItem, changePlayerStatus })(
  SinglePage
);
