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
      items: 0,
      delete: false
    };

  }

  componentWillMount = () => {
    
    
    this.mapProps();
  }

  mapProps = () => {
    this.setState(
      {
        items: this.props.items,
        name: this.props.name,
        unit: this.props.unit,
        price: this.props.price,
        avail: this.props.avail
      },
      () => {
        // this.editMap();
        if (this.state.name || this.state.unit || this.state.price || this.state.avail) {
          this.setState({
            edit: false
          });
        }else{
          this.setState({
            edit: true
          });
        }
      }
    );
  };

  editMap = () => {
    
    if (!this.state.name === "") {
      this.setState({
        edit: false
      });
    }
    console.log(this.state.edit);
    console.log(this.state.name);
  };

  // handleMap = () => {
  //    this.mapProps(() => this.editMap())

  // }

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
    e.preventDefault();
    var { name, unit, price, avail } = this.state;
    if (name === "" || unit === "" || price === "" || avail === "") {
      this.setState({
        edit: true
      })
    } else {
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
      console.log(this.state.items[0].item_id);
    }
  };

  deleteFromEdit = async e => {
    e.preventDefault();
    
    if (this.state.items.length == false) {
      this.setState({
        delete: true
      });
    } else {
      const item_id = this.state.items;
      console.log(item_id);
      const deletedEdit = await axios.delete(
        `/api/delete_from_edit/${item_id}/`
      );
      this.setState({
        items: 0
      });
    }
    this.setState({
      delete: true
    });
  };

  saveAndAdd = e => {
    this.addToEdit(e);
    var { name, unit, price, avail } = this.state;
    if (! name || !unit || !price || !avail ) {
      this.setState({
        edit:true
      })
    } else {
      this.changeInput();
    }
  };

  render() {
    const { name, unit, price, avail } = this.state;
    return (
      <>
        {!this.state.delete ? (
          <div className="edit-bar">
            <div className="left">
              <div className="fields">
                <h1>Product</h1>
                {this.state.edit ? (

                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                  ></input>




                  ) : (
                    <h2>{this.state.name}</h2>
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
                  {!this.state.edit ? (
                    <h2>${this.state.price}</h2>
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
                  <GiSaveArrow
                    onClick={e => {
                      this.saveAndAdd(e);
                    }}
                    size={35}
                  />
                </div>
              ) : null}
              {!this.state.edit ? (
                <div style={{ color: "black" }}>
                  <FaEdit onClick={this.trueInput} size={30} />
                </div>
              ) : null}
              <TiDelete
                onClick={e => {
                  this.deleteFromEdit(e);
                }}
                size={40}
              />
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default ProductEdit;
