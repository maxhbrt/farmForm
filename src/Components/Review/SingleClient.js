import React, { Component } from "react";
import ReviewFields from "./ReviewFields";

class SingleClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: ""
    };
  }

  render() {
    return (
      <div>
        <div>{this.props.businessName}</div>
        <ReviewFields
          order_item_id={this.props.order_item_id}
          name={this.props.name}
          quan={this.props.quan}
          unit={this.props.unit}
          price={this.props.price}
          filled={this.props.filled}
        />
      </div>
    );
  }
}

export default SingleClient;
