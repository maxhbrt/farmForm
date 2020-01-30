import React, { Component } from "react";
import "./Edit.css";
import Roots from "./roots-logo.png";
import ProductEdit from "./ProductEdit";
import { MdAddCircle } from "react-icons/md";
import axios from 'axios';
import { withRouter } from "react-router-dom";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: [],
     
    };
  }





  handleAnotherBar = (e) => {
    // e.preventDefault();
    const { bars } = this.state;
    this.setState({
      bars: bars.concat(<ProductEdit
      handleAnotherBar={this.handleAnotherBar}
      >{bars.length}</ProductEdit>)
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
        <ProductEdit 
        handleAnotherBar={this.handleAnotherBar}
     
        />
        {[...this.state.bars] }
        <div style={{ color: "green" }} className="add">
            <MdAddCircle onClick={this.handleAnotherBar} size={35} />
          </div>
        <div className="footer">
          <button
          onClick={() => {
            
          }}
          >SAVE</button>
          <button className="reset">RESET</button>
          <button
          onClick={() => {
            axios.delete("/auth/logout").then(() => {
              {this.props.history.push('/')}
            })
          }}
          >LOGOUT</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Edit);
