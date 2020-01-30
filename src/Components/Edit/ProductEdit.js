import React, { Component } from "react";
import "./ProductEdit.css";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { GiSaveArrow } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      unit: "",
      price: "",
      avail: "",
      edit: true,
      items: []
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeInput = () => {
    this.setState({
      edit: false
    });
  };

  trueInput = () => {
    this.setState({
      edit: true
    });
  };

  addToEdit = async e => {
    // e.preventDefault();
    var { name, unit, price, avail } = this.state;
    price = price * 1;
    avail = avail * 1;
    const addedEdit = await axios.post("/api/post_edit", {
      name,
      unit,
      price,
      avail
    });
    this.setState({
      items: addedEdit.data
    });
    console.log(this.state.items);
  };

  deleteFromEdit = async item_id => {
    const deletedEdit = await axios.delete(`/api/delete_from_edit/${item_id}`);
    this.setState({
      items: deletedEdit.data
    });
  };

  saveAndAdd = e => {
    this.addToEdit();
    this.changeInput();
  };

  render() {
    const { name, unit, price, avail } = this.state;
    return (
      <div className="edit-bar">
        <div className="left">
          <div className="fields">
            <h1>Product</h1>
            {!this.state.edit ? (
              <h2>{this.state.name}</h2>
            ) : (
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.onChange}
              ></input>
            )}
          </div>
          <div className="fields">
            <h1>Unit</h1>
            {!this.state.edit ? (
              <h2>{this.state.unit}</h2>
            ) : (
              <input
                type="text"
                name="unit"
                value={unit}
                onChange={this.onChange}
              ></input>
            )}
          </div>
        </div>
        <div className="right">
          <div className="fields">
            <h1>Price Per Unit</h1>
            <div>
              $
              {!this.state.edit ? (
                <h2>{this.state.price}</h2>
              ) : (
                <input
                  className="price"
                  type="text"
                  name="price"
                  value={price}
                  onChange={this.onChange}
                ></input>
              )}
            </div>
          </div>
          <div className="fields">
            <h1>Available</h1>
            {!this.state.edit ? (
              <h2>{this.state.avail}</h2>
            ) : (
              <input
                className="price"
                type="text"
                name="avail"
                value={avail}
                onChange={this.onChange}
              ></input>
            )}
          </div>
        </div>
        <div style={{ color: "red" }} className="trash">
          {this.state.edit ? (
            <div style={{ color: "green" }} className="add">
              <GiSaveArrow onClick={this.saveAndAdd} size={35} />
            </div>
          ) : null}
          {!this.state.edit ? (
            <div style={{ color: "black" }}>
              <FaEdit onClick={this.trueInput} size={35} />
            </div>
          ) : null}
          <TiDelete onClick={this.deleteFromEdit} size={40} />
        </div>
      </div>
    );
  }
}

export default ProductEdit;
