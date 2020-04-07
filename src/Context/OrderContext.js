import React, { useState } from "react";

export const OrderContext = React.createContext();

export const OrderProvider = (props) => {
  const [order, setOrder] = useState([]);
  console.log(order)
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {props.children}
    </OrderContext.Provider>
  );
};
