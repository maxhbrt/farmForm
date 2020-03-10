import React, { Component } from "react";
import axios from "axios";
import SingleClient from "./SingleClient";

class ReviewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders = async e => {
    const orders = await axios.get("/api/get_order").then(response => {
      console.log(response);
      this.setState({
        orders: response.data
      });
    });
  };

  clearAllOrders = async e => {
    e.preventDefault();
    const clearedOrders = await axios.delete("/api/clear_all_orders")
    this.setState({
      orders:[]
    })
  }

  render() {
    var orderProps = [];
    const singleOrderSections = this.state.orders.map(order => {
      if (orderProps.includes(order.client_id)) {
      } else {
        orderProps.push(order.client_id);

        return <SingleClient businessName={order.business_name} 
        order_item_id={order.order_item_id}
        filled={order.filled}
        name={order.name}
        quan={order.quan}
        unit={order.unit}
        price={order.price}
        
        />;
      }
    });

    return( 
    <>
    <div>{singleOrderSections}</div>
    <div>
      <button
      onClick={e => {
        this.clearAllOrders(e)
      }}
      >Clear all orders</button>
    </div>
      </>
    )
  }
}

export default ReviewOrder;
