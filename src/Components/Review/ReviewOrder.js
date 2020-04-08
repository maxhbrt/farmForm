import React, { useContext } from "react";
import "./ReviewOrder.css";
import axios from "axios";

import { OrderContext } from "../../Context/OrderContext";

function ReviewOrder(props) {
  const [order, setOrder] = useContext(OrderContext);
  var quan = [];
  var item_id = [];
  var client_id = [];

  function addOrder(callback) {
    for (let i = 0; i < order.length; i++) {
      quan.push(order[i].quan * 1);
      item_id.push(order[i].item_id * 1);
      client_id.push(order[i].client * 1);
    }
    setTimeout(() => { 
      callback();
  }, 3000);
    
  }

  function postOrder() {
    console.log(item_id)
    console.log(quan)
    console.log(client_id)
    axios.post("/api/add_order", { item_id, quan, client_id });
  }

  function runPost() {
    addOrder(postOrder);
  };

  const orderReview = order.map((item) => {
    return (
      <div className="review-container">
        <div>{item.name}</div>
        <div>{item.price}</div>
        <div>{item.quan}</div>
      </div>
    );
  });

  return (
    <>
      <div>{orderReview}</div>
      <button onClick={() => runPost()}>Place Order</button>
    </>
  );
}

export default ReviewOrder;
