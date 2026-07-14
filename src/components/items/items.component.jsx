import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "../item/item.component";
import Pagination from "../pagination/pagination.component";

class Items extends Component {
  render() {
    const items = this.props.items || [];
    const empty = items.length === 0;

    return (
      <div>
        <div className={empty ? "grid place-items-center py-24 text-center" : "hidden"}>
          <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-brand-grad shadow-glow">
            <i className="fas fa-music text-2xl text-white" aria-hidden="true"></i>
          </div>
          <h2 className="text-xl font-semibold text-white">
            Find something to play
          </h2>
          <p className="mt-2 max-w-sm text-sm text-white/50">
            Search YouTube above to browse videos. Play them here, blur the
            screen, and enjoy the music.
          </p>
        </div>

        <div
          className={
            empty
              ? "hidden"
              : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {items.map(item => (
            <Item item={item} key={item.id.videoId} />
          ))}
        </div>
        <Pagination />
      </div>
    );
  }
}

const mapStateToProps = state => ({ items: state.items });

export default connect(mapStateToProps)(Items);
