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
    this.getInventory()
  }
//   componentWillMount() {

//     this.getInventory();

//   }

  getInventory = () => {
    for (let i = 0; i < this.props.inventory.length; i++) {
      if (this.props.inventory[i].farm_name === this.props.farmName) {
        this.state.inventory.push(this.props.inventory[i]);
      }
    }
  };

  render() {
   const {inventory} = this.state
    const singleOrderItem = inventory.map(item => {
        return(
            <OrderField
            item={item.item_id}
            name={item.name}
            unit={item.unit}
            price={item.price}
            /> 
        )
    })

    return (
      <div className="single-farm">
          
        {singleOrderItem}
      </div>
    );
  }
}
export default SingleFarm;
