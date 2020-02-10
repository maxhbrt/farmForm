import React, { Component } from "react";
import "./Edit.css";
import Roots from "./roots-logo.png";
import ProductEdit from "./ProductEdit";
import { MdAddCircle } from "react-icons/md";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { syncLoader, PulseLoader } from "react-spinners";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: [],
      display: true,
      items: [],
      isLoading: true,
      reset: false
    };
  }

  componentWillMount() {
    this.getAllEdit();
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 2000);
  }

  handleAnotherBar = e => {
    const { bars } = this.state;
    this.setState({
      bars: bars.concat(
        <ProductEdit handleAnotherBar={this.handleAnotherBar}>
          {bars.length}
        </ProductEdit>
      )
    });
    this.setState({
      display: true,
      reset: false
    });
  };

  getAllEdit = () => {
    axios.get("/api/get_edit").then(response => {
      this.setState({ items: response.data });
      this.setState({
        reset: false
      });
    });
  };

  deleteAllEdit = () => {
    const { bars } = this.state;
    axios.delete(`/api/delete_all_edit`);
    this.setState({
      bars: []
    });
    this.setState({
      display: false,
      reset: true
    });
  };

  render() {
    var { items } = this.state;
    if (this.state.reset) {
      items = [];
    }
    const savedItems = items.map(item => {
      return (
        <>
          <ProductEdit
            item={item.item_id}
            name={item.name}
            unit={item.unit}
            price={item.price}
            avail={item.avail}
          />
        </>
      );
    });
    return (
      <div className="edit-form">
        <div className="head">
          <img className="logo" src={Roots} />
        </div>
        {this.state.isLoading ? (
          <div className="loader">
            <PulseLoader size={50} />
          </div>
        ) : (
          <>
            {savedItems}
            {[...this.state.bars]}
            <div style={{ color: "green" }} className="add">
              <MdAddCircle onClick={this.handleAnotherBar} size={35} />
            </div>
          </>
        )}
        <div className="footer">
          <button className="reset" onClick={this.deleteAllEdit}>
            RESET
          </button>
          <button
            onClick={() => {
              axios.delete("/auth/logout").then(() => {
                {
                  this.props.history.push("/");
                }
              });
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Edit);
