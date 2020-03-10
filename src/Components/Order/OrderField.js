import React, { Component } from "react";
import "./OrderField.css";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Review from "./Review";

class OrderField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quan: "",
      edit: true,
      avail: "",
      none: false,
      order_item_id: "",
      order_item: "",
      ogQuan: "",
      review: this.props.review
    };
  }

  componentDidMount() {
    this.setAvail();
  }

  onChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state.quan);
  };

  setAvail = () => {
    this.setState(
      {
        avail: this.props.avail
      },
      () => {
        if (this.state.avail > 0) {
          this.setState({
            none: true
          });
        }
      }
    );
  };

  addOrder = async e => {
    // e.preventDefault();
    const { quan } = this.state;
    const { item_id, client_id, user_id } = this.props;

    const aPromise = await axios.post("/api/add_order", {
      quan,
      item_id,
      client_id,
      user_id
    });
  };

  addOrder = async e => {
    console.log(this.props.avail);
    e.preventDefault();
    var item_id = this.props.item;
    var { unit, name, client_id, user_id } = this.props;
    var { quan } = this.state;
    var avail = this.state.avail.toString();
    console.log(avail);

    if (!this.state.quan || this.state.quan == 0) {
      this.setState({
        edit: true
      });
      console.log(this.state.edit);
    } else if (this.state.avail < this.state.quan) {
      toast(`There is only ${avail} ${unit} of ${name} left...`, {
        type: "error"
      });
    } else if (this.state.order_item_id) {
      const { order_item_id, ogQuan } = this.state;
      var quan = this.state.quan * 1;
      console.log(ogQuan);
      const item_id = this.props.item;
      await axios.put("/api/edit_quan", {
        quan,
        order_item_id,
        item_id,
        ogQuan
      });
      this.setState({
        edit: false,
        ogQuan: this.state.quan * 1
      });
    } else {
      const addedOrder = await axios
        .post("/api/add_order", {
          quan,
          item_id,
          client_id,
          user_id
        })
        .then(response => {
          console.log(response.data);
          this.setState({
            order_item: response.data,
            order_item_id: response.data[0].order_item_id
          });
        });
      this.setState({
        edit: false,

        ogQuan: this.state.quan * 1,

        avail: (avail - quan) * 1
      });
    }
  };

  editQuan = e => {
    e.preventDefault();

    this.setState({
      edit: true
    });
  };

  handleClick = e => {
    e.preventDefault();

    this.addOrder(e);
  };

  render() {
    var { avail, quan, none, order_item } = this.state;

    return (
      <>
        {quan && this.props.review ? (
          <Review quan={quan} unit={this.props.unit} name={this.props.name} />
        ) : !quan && this.props.review ? null : (
          <div className={this.state.edit ? "order-bar" : "order-bar-edit"}>
            <ToastContainer />
            <div className="farm-title">{this.props.farmName}</div>
            <div className="order-details">
              <h3>{this.props.name}</h3>
              <h3>{this.props.price}</h3>
              <h3>{this.props.unit}</h3>
              {this.state.edit ? (
                <input
                  type="text"
                  name="quan"
                  value={quan}
                  onChange={this.onChange}
                  className="quan-input"
                />
              ) : (
                <h3>{quan}</h3>
              )}
              {this.state.edit ? (
                <div className="add-button" style={{ color: "green" }}>
                  <IoIosAddCircle
                    onClick={e => {
                      this.handleClick(e);
                    }}
                    size={32}
                  />
                </div>
              ) : (
                <div className="add-button" style={{ color: "black" }}>
                  <FaEdit
                    onClick={e => {
                      this.editQuan(e);
                    }}
                    size={32}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default OrderField;
