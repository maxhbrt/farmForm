import React, { useState, useContext } from "react";
import "./OrderField.css";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OrderContext } from "../../Context/OrderContext";

function OrderField(props) {
  const [edit, setEdit] = useState(true);

  const [quan, setQuan] = useState("");

  const [order, setOrder] = useContext(OrderContext);

  const addOrder = (e) => {
    if (!quan || quan == 0) {
      setEdit(true);
    } else if (props.avail < quan) {
      toast(
        `There is only ${props.avail} ${props.unit} of ${props.name} left...`,
        {
          type: "error",
        }
      );
      setQuan("");
    }
    const order = {
      name: props.name,
      price: props.price,
      item_id: props.item,
      quan: quan,
      client: props.client_id,
    };
    setOrder((curr) => [...curr, order]);
    setEdit(false);
  };

  const removeFromOrder = (e) => {
    setOrder(
      order.filter(function (item) {
        return item.item_id !== props.item;
      })
    );
  };

  const handleQuan = (e) => {
    setQuan(e.target.value);
  };

  return (
    <>
      <div className={edit ? "order-bar" : "order-bar-edit"}>
        <ToastContainer />
        <div className="farm-title">{props.farmName}</div>
        <div className="order-details">
          <h3>{props.name}</h3>
          <h3>{props.price}</h3>
          <h3>{props.unit}</h3>
          {edit ? (
            <input
              type="text"
              name="quan"
              value={quan}
              onChange={handleQuan}
              className="quan-input"
            />
          ) : (
            <h3>{quan}</h3>
          )}
          {edit ? (
            <div className="add-button" style={{ color: "green" }}>
              <IoIosAddCircle
                onClick={(e) => {
                  addOrder();
                }}
                size={32}
              />
            </div>
          ) : (
            <div className="add-button" style={{ color: "black" }}>
              <FaEdit
                onClick={() => {
                  removeFromOrder();
                  setEdit(true);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderField;
