import React, { Component } from "react";
import { connect } from "react-redux";
import Song from "./Song";
import Pagination from "./Pagination";

class Songs extends Component {
  render() {
    const songs = this.props.songs.map((song, key) => {
      if (song.id.kind !== "youtube#video") {
        return "";
      }
      return <Song song={song} key={key} />;
    });
    return (
      <div>
        <div className="Songs" id="Songs">
          {songs}
        </div>
        <div>
          <Pagination />
          <br />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songs
  };
};
export default connect(mapStateToProps)(Songs);
