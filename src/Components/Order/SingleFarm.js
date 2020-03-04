import React, { Component } from "react";
import axios from "axios";
import OrderField from "./OrderField";
import "./SingleFarm.css";
import { FaCheckCircle } from "react-icons/fa";

class SingleFarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      review: this.props.review
    };
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
    const { inventory, review } = this.state;
    const singleOrderItem = inventory.map(item => {
      return (
        <>
          <OrderField
            review={this.props.review}
            user_id={item.user_id}
            client_id={this.props.clientInfo}
            business_name={this.props.business_name}
            item={item.item_id * 1}
            name={item.name}
            unit={item.unit}
            price={item.price}
            avail={item.avail}
          />
        </>
      );
    });

    return (
      <>
        <h1>{this.props.farmName}</h1>
        <div className="single-farm">{singleOrderItem}</div>
      </>
    );
  }
}
export default SingleFarm;
