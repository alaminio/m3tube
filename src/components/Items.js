import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "./Item";
import Pagination from "./Pagination";
import style from "../styles/items.module.css";

class Items extends Component {
  render() {
    return (
      <div id="Items">
        <div className={style.items}>
          {this.props.items.map((item, index) => (
            <Item item={item} key={index} />
          ))}
        </div>
        <Pagination />
        <br />
      </div>
    );
  }
}

const mapSteteToProps = state => {
  return { items: state.items };
};

export default connect(mapSteteToProps)(Items);
