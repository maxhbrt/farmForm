import React, { Component } from "react";
import ReviewFields from "./ReviewFields";

class SingleClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: "",
      orders: []
    };
    this.getOrders()
  }

  componentDidMount(){
    setTimeout(() => {
    console.log(this.state.orders)
    }, 2000);
  }

  getOrders = () => {
    for(let i =0; i < this.props.orders.length; i++){
      if(this.props.orders[i].business_name == this.props.businessName){
        this.state.orders.push(this.props.orders[i])
      }
    }
  }

  render() {
    const {orders }= this.state
    const singleReviewItem = orders.map(item => {
      return(
        <ReviewFields
        name={item.name}
        />
      )
    })
    return (
      <div>
        <div>{this.props.businessName}</div>
       
    <div>{singleReviewItem}</div>
      </div>
    );
  }
}

export default SingleClient;
