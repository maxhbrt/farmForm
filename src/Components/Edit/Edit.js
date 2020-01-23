import React, { Component } from "react";
import "./Edit.css";
import Roots from "./roots-logo.png";
import ProductEdit from "./ProductEdit";
import { MdAddCircle } from "react-icons/md";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: []
    };
  }
  handleAnotherBar = () => {
    const { bars } = this.state;
    this.setState({
      bars: bars.concat(<ProductEdit>{bars.length}</ProductEdit>)
    });
  };

  render() {
    return (
      <div className="edit-form">
        <div className="head">
          <img className="logo" src={Roots} />
        </div>
        <ProductEdit />
        {[...this.state.bars]}
        <div style={{ color: "green" }} className="add">
          <MdAddCircle onClick={this.handleAnotherBar} size={40} />
        </div>
        <div className="footer">
          <button>SAVE</button>
          <button  className="reset">RESET</button>
        </div>
      </div>
    );
  }
}

export default Edit;
