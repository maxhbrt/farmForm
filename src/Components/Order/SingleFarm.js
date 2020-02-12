import React, { Component } from "react";
import axios from "axios";
import OrderField from "./OrderField";
import "./SingleFarm.css";

class SingleFarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: []
    };
  }
  componentDidMount() {
    this.getInventory();

  }

  getInventory = () => {
    for (let i = 0; i < this.props.inventory.length; i++) {
      if (this.props.inventory[i].farm_name === this.props.farmName) {
        this.state.inventory.push(this.props.inventory[i]);
      }
    }
  };

  render() {
    return (
      <div className="single-farm">
        <div>{this.props.farmName}</div>
      </div>
    );
  }
}
export default SingleFarm;
