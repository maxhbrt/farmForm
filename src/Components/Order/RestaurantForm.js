import React, { Component } from "react";
import axios from "axios";
import SingleFarm from "./SingleFarm";
import "./RestaurantForm.css";
import { FaThList } from "react-icons/fa";

class RestaurantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      farms: []
    };
  }

  componentDidMount = () => {
    this.getInventory();
    console.log(this.state.farms);
  };

  getInventory = () => {
    axios.get("/api/get_order_items").then(response => {
      this.setState(
        {
          inventory: response.data
        },
        () => {
          for (let i = 0; i < this.state.inventory.length; i++) {
            if (!this.state.farms.includes(this.state.inventory[i].farm_name)) {
              this.state.farms.push(this.state.inventory[i].farm_name);
            }
          }
        }
      );
    });
  };

  render() {
    var { farms, inventory } = this.state;
    var farmProps = [];
    const singleFarmSections = inventory.map(farm => {
      if (farmProps.includes(farm.farm_name)) {
      } else {
        farmProps.push(farm.farm_name);

        return <SingleFarm farmName={farm.farm_name} 
                inventory={inventory}
        />;
      }
    });

    return (
      <div className="order-form">
        <div className="head">
          <h1>Order Form</h1>
        </div>

        <>{singleFarmSections}</>
        <div className="footer">
          <button>Review Order</button>
        </div>
      </div>
    );
  }
}

export default RestaurantForm;
