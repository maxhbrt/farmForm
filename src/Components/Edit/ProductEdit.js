import React, { Component } from "react";
import "./ProductEdit.css";
import { TiDelete } from "react-icons/ti";
import axios from "axios";

class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      unit: "",
      price: 0,
      avail: 0
    };
  }

  addToEdit = async (user_id, name, unit, price, avail) => {
    const addedEdit = await axios.post("/api/post_edit", {
      user_id,
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
              value={name}
              onChange={e => {
                this.setState({
                  name: e.target.value
                });
              }}
            ></input>
          </div>
          <div className="fields">
            <h1>Unit</h1>
            <input
              type="text"
              value={unit}
              onChange={e => {
                this.setState({
                  unit: e.target.value
                });
              }}
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
                type="number"
                value={price}
                onChange={e => {
                  this.setState({
                    price: e.target.value
                  });
                }}
              ></input>
            </div>
          </div>
          <div className="fields">
            <h1>Available</h1>
            <input
              className="price"
              type="number"
              value={avail}
              onChange={e => {
                this.setState({
                  avail: e.target.value
                });
              }}
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
