import React, { useContext } from "react";
import axios from "axios";

import { OrderContext } from "../../Context/OrderContext";

function ReviewOrder(props) {
  const [order, setOrder] = useContext(OrderContext);


 const addOrder = () => {
   axios.post("/api/addOrder", {order})
 }

 return(
   <>
   <div>{order}</div>
   <button
   onClick={addOrder()}
   >Place Order</button>
   </>

 )
}




export default ReviewOrder;
