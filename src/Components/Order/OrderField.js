import React, { Component } from "react";
import "./OrderField.css";
import { IoIosAddCircle } from "react-icons/io";

class OrderField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0
    };
  }

  render() {
    return (
      <div className="order-bar">
        <div className="farm-title">{this.props.farmName}</div>
        <div className="order-details">
          <h3>{this.props.name}</h3>
          <h3>{this.props.price}</h3>
          <h3>{this.props.unit}</h3>
              <input className="quan-input"/>
          <div className="add-button" style={{color: 'green'}}>
            <IoIosAddCircle size={32} />
          </div>
        </div>
      </div>
    );
  }
}

export default OrderField;
