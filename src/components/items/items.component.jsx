import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "../item/item.component";
import Pagination from "../pagination/pagination.component";
import style from "./items.module.css";

class Items extends Component {
  render() {
    return (
      <div id="Items">
        <div className={style.items}>
          {this.props.items.map(item => (
            <Item item={item} key={item.id.videoId} />
          ))}
        </div>
        <Pagination />
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { items: state.items };
};

export default connect(mapStateToProps)(Items);
