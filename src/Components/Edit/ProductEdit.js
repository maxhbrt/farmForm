import React, { Component } from "react";
import "./ProductEdit.css";
import { TiDelete } from "react-icons/ti";
import axios from 'axios';


class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      unit: "",
      price: "" ,
      avail: "" 
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  }

  addToEdit = async ( e ) => {
    // e.preventDefault();
    var { name, unit, price, avail} = this.state;
    price = price*1
    avail = avail*1
    await axios.post("/api/post_edit", {
     
      name,
      unit,
      price,
      avail
    });
  };


  render() {
    const { name, unit, price, avail } = this.state;
    return (
      <div className="edit-bar">
        <div className="left">
          <div className="fields">
            <h1>Product</h1>
            <input
              type="text"
              name = "name"
              value={name}
              onChange={ this.onChange }
            ></input>
          </div>
          <div className="fields">
            <h1>Unit</h1>
            <input
              type="text"
              name="unit"
              value={unit}
              onChange={this.onChange}
            ></input>
          </div>
        </div>
        <div className="right">
          <div className="fields">
            <h1>Price Per Unit</h1>
            <div>
              $
              <input
                className="price"
                type="text"
                name="price"
                value={price}
                onChange={this.onChange}
              ></input>
            </div>
          </div>
          <div className="fields">
            <h1>Available</h1>
            <input
              className="price"
              type="text"
              name="avail"
              value={avail}
              onChange={this.onChange}
            ></input>
          </div>
        </div>
        <div style={{ color: "red" }} className="trash">
          <TiDelete size={40} />
        </div>
      </div>
    );
  }
}

export default ProductEdit;
