import React, { Component } from "react";
import "./OrderField.css";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

class OrderField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quan: "" * 1,
      edit: true,
      avail: "",
      none: false
    };
    this.setAvail();
  }


  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  setAvail =() => {
    this.setState({
      avail: this.props.avail
    }, () => {
      if(this.state.avail > 0){
        this.setState({
          none: true
        })
      }
    })
  }

  addOrder = async e => {
    e.preventDefault();
    var item_id = this.props.item
    var {business_name, unit, name} = this.props
    var {quan, avail} = this.state
   
    if (!quan){
      this.setState({
        edit: true
      })
    }else if(avail < quan)
    {toast(`There is only ${avail} ${unit} of ${name} left...`, {type: "error"})}else
      {const addedOrder = await axios.post("/api/add_order", {quan, item_id, business_name})
      this.setState({
        edit: false,
        avail: (avail - quan) * 1
      })
      console.log(avail)
    }
  }

  handleClick = e => {
    e.preventDefault();
    this.addOrder(e)
  }

  render() {
    var{avail, quan, none} = this.state
    return (
      <div className="order-bar">
        <div className="farm-title">{this.props.farmName}</div>
        <div className="order-details">
          <h3>{this.props.name}</h3>
          <h3>{this.props.price}</h3>
          <h3>{this.props.unit}</h3>
              <input 
              type="text"
              name="quan"
              value={quan}
              onChange={this.onChange}
              
              className="quan-input"/>
          <div className="add-button" style={{color: 'white'}}>
            <IoIosAddCircle 
            onClick={e => {
              this.handleClick(e)
            }}
            size={32} />
          </div>
        </div>
      </div>
    );
  }
}

export default OrderField;
