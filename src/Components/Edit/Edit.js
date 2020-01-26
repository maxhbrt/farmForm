import React, { Component } from "react";
import "./Edit.css";
import Roots from "./roots-logo.png";
import ProductEdit from "./ProductEdit";
import { MdAddCircle } from "react-icons/md";
import axios from 'axios';

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

  handleReset = () => {
    this.setState({
      bars: []
    })
  }

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
          <button onClick={this.handleReset} className="reset">RESET</button>
          <button
          onClick={() => {
            axios.delete("/auth/logout").then(() => {
              {this.props.history.push('/register')}
            })
          }}
          >LOGOUT</button>
        </div>
      </div>
    );
  }
}

export default Edit;
