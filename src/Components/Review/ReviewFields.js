import React, { Component } from "react";
import axios from "axios";

class ReviewField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: "",
      name: "",
      quan: "",
      date: ""
    };
  }


  fillOrder = async e => {
      e.preventDefault();
      const {order_item_id} = this.props
      console.log(order_item_id)
      await axios.put("/api/fill_order", {order_item_id})
  }

  unfillOrder = async e => {
      e.preventDefault()
      const {order_item_id} = this.props
      await axios.put("/api/unfill_order", {order_item_id})
  }

  render() {
    return (
      <div>
        {this.props.name}
        <button
        onClick={e => {
            this.fillOrder(e);
        }}
        >Filled</button>
      </div>
    );
  }
}

export default ReviewField;
